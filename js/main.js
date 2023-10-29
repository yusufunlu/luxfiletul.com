//////////////////////////////////
// Script Configuration
//////////////////////////////////

// Enables smooth scroll when user clicks on links
var enableSmoothScroll = true;
var smoothScrollAnimationDuration = 500;

// Enables smooth scroll when user fires wheel event
var enableSmoothWheelScroll = true;
var smoothWheelScrollAnimationDuration = 600;
var smoothWheelScrollDistance = 100;
var smoothWheelScrollVelocityMultiplier = 3;

// Gallery animation parameters
var galleryThumbnailHoverOpacity = 0.7;
var galleryThumbnailHoverAnimationDuration = 200;
var galleryShowImageAnimationDuration = 600;
var galleryHideImageAnimationDuration = 0;

// Contact form animation parameters
var contactFormAnimationDuration = 400;

//////////////////////////////////
// Smooth scroll when user clicks on links
//////////////////////////////////
if(enableSmoothScroll)
{
    var scrollOffset = $("body").attr("data-offset");
    $('.smoothscroll').click(function(){
        var hash = window.location.hash;
        var url = "";
        if(hash != "")
        {
            url = window.location.href.replace(window.location.hash, $.attr(this, 'href'));
        }
        else
        {
            url = window.location.href + $.attr(this, 'href');
        }

        history.pushState(undefined, undefined, url);

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - scrollOffset + 5
        }, smoothScrollAnimationDuration);
        return false;
    });
}

//////////////////////////////////
// Smooth scroll when user fires wheel event
//////////////////////////////////
if(enableSmoothWheelScroll)
{
    var $window = $(window);
    var scrollTime = smoothWheelScrollAnimationDuration/1000;
    var scrollDistance = smoothWheelScrollDistance;
    var lastScrollTarget = 0;
    var scrollAnimationExists = false;

    $window.on("mousewheel DOMMouseScroll", function(event){

        event.preventDefault();

        var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        var scrollTop = $window.scrollTop();

        var velocity = parseInt(delta*scrollDistance);
        if(scrollAnimationExists)
        {
            velocity *= smoothWheelScrollVelocityMultiplier;
        }

        var finalScroll = scrollTop - velocity;

        // save animation parameters
        scrollAnimationExists = true;
        lastScrollTarget = finalScroll;

        TweenMax.to($window, scrollTime, {
                scrollTo : { y: finalScroll, autoKill:true },
                ease: Power1.easeOut,
                overwrite: 5,
                onComplete: function() { scrollAnimationExists = false; }
            });


    });
}

//////////////////////////////////
// Animate.css helper function
//////////////////////////////////
function animate(element, animation) {
    element.addClass(animation);
    var wait = window.setTimeout( function(){
            element.removeClass(animation)}, 1300
    );
}

//////////////////////////////////
// Navbar focus animation
//////////////////////////////////
$('#navbar-list').on('activate.bs.scrollspy', function () {
    animate($('#navbar-list .active a'), 'flipInX');
});

//////////////////////////////////
// Add service item link hover animation
//////////////////////////////////
var animatedGroupHoverOn = function() {
    var targetId = $.attr(this, 'data-item');
    var targetGroupId = $.attr(this, 'data-group');
    if(targetId != undefined && targetGroupId != undefined)
    {
        $(targetGroupId).hide();
        $(targetId).show();
        animate($(targetId), 'fadeInLeft');
    }
};

var animatedGroupHoverOff = function() {
    var targetId = $.attr(this, 'data-item');
    var targetGroupId = $.attr(this, 'data-group');
    if(targetId != undefined && targetGroupId != undefined)
    {
        $(targetGroupId).hide();
        $(targetId).show();
    }
}

$('.container .service-item').hover(animatedGroupHoverOn, animatedGroupHoverOff);
$('.skill').hover(animatedGroupHoverOn, animatedGroupHoverOff);

//////////////////////////////////
// Initialize portfolio gallery
//////////////////////////////////
var lastShownPicture = undefined;
var switchGalleryPicture = function()
{
    lastShownPicture = $(this);
    showGalleryImage(lastShownPicture);
}

var showNextGalleryPicture = function()
{
    if(lastShownPicture == undefined)
    {
        return;
    }

    var nextShownPicture = lastShownPicture.next();
    if(nextShownPicture.attr("class") == undefined)
    {
        $('#gallery-modal').modal('toggle');
    }
    else
    {
        lastShownPicture = nextShownPicture;
        showGalleryImage(lastShownPicture);
    }
}

var showGalleryImage = function(galleryElement)
{
    var image_src = galleryElement.attr('gallery-src');
    var title = galleryElement.attr('gallery-title');
    var text = galleryElement.attr('gallery-text');
    $('#gallery-image').fadeOut(galleryHideImageAnimationDuration, function(){
        $('#gallery-image').attr("src", image_src);
        $('#gallery-title').html(title);
        $('#gallery-text').html(text);
        $('#gallery-image').fadeIn(galleryShowImageAnimationDuration);
    });
}

$('.gallery-thumbnail').click(switchGalleryPicture);
$('#gallery-image').click(showNextGalleryPicture);

//////////////////////////////////
// Portfolio gallery thumbnail hover animation
//////////////////////////////////
var galleryThumbnailHoverOn = function()
{
    $(this).find(".gallery-thumbnail-overlay-container").animate({opacity: galleryThumbnailHoverOpacity}, galleryThumbnailHoverAnimationDuration);
};

var galleryThumbnailHoverOff = function()
{
    $(this).find(".gallery-thumbnail-overlay-container").animate({opacity: 0.0}, galleryThumbnailHoverAnimationDuration);
};

$('.gallery-thumbnail').hover(galleryThumbnailHoverOn, galleryThumbnailHoverOff);

//////////////////////////////////
// Contact Form Submit Button
//////////////////////////////////
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

var submitContactForm = function()
{
    var sender_name = $('#contact-sender').val();
    var sender_email = $('#contact-email').val();
    var sender_message = $('#contact-message').val();

    if(!isValidEmailAddress(sender_email) ||
        sender_name.length == 0 ||
        sender_message.length == 0)
    {
        $('#contact-form-alert').show(contactFormAnimationDuration);
        return;
    }
    else
    {
        $('#contact-form-alert').hide(contactFormAnimationDuration);
    }

    // hide contact form and show loading division
    $('#contact-form').hide(contactFormAnimationDuration);
    $('#contact-status-loading').show(contactFormAnimationDuration);

    var showSuccessMessage = function()
    {
        $('#contact-status-loading').hide(contactFormAnimationDuration);
        $('#contact-status-success').show(contactFormAnimationDuration);
    };

    var showFailMessage = function()
    {
        $('#contact-status-loading').hide(contactFormAnimationDuration);
        $('#contact-status-fail').show(contactFormAnimationDuration);
    };

    $.ajax({
        type: "POST",
        url: "contact.php?t=" + (new Date()).getTime(),
        data: {name: sender_name, mail: sender_email, message: sender_message}
    }).done(function(response) {
		alert(response);
        /*var result = $.parseJSON(response);
        if(result.status == 1)
        {
            showSuccessMessage();
        }
        else
        {
            showFailMessage();
        }*/
    })
    .fail(function() {
        showFailMessage();
    });
};

var resetContactForm = function()
{
    $('#contact-form').show(contactFormAnimationDuration);
    $('#contact-status-success').hide(contactFormAnimationDuration);
    $('#contact-status-fail').hide(contactFormAnimationDuration);
    $('#contact-status-loading').hide(contactFormAnimationDuration);
};

//////////////////////////////////
// Bootstrap modal scroll jump fix.
// https://github.com/twbs/bootstrap/issues/9855
//////////////////////////////////
(function (e) {
    var $winWidth = e(window).width();
    e(document).on('show.bs.modal', function () {
        if($winWidth < e(window).width()){
            e('body.modal-open,.navbar-fixed-top,.navbar-fixed-bottom').css('marginRight',e(window).width()-$winWidth)
        }
    });
    e(document).on('hidden.bs.modal', function () {
        e('body,.navbar-fixed-top,.navbar-fixed-bottom').css('marginRight',0)
    });
})(jQuery);
