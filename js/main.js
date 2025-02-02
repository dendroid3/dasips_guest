(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // WhatsApp button
    $('.whatsapp-button').click(function () {
        window.open('https://wa.me/254746753874', '_blank');
    });

    // Call button
    $('.call-button').click(function () {
        window.open('tel:+254746753874', '_blank');
    });

    // Enable Subject field
    $('#name').on('input', function () {
        const name = $('#name').val();
        if (name.length > 0) {
            $('#subject').prop('disabled', false);
        } else {
            $('#subject').prop('disabled', true);
        }
    });

    // Enable Message field
    $('#subject').on('input', function () {
        const subject = $('#subject').val();
        if (subject.length > 0) {
            $('#message').prop('disabled', false);
        } else {
            $('#message').prop('disabled', true);
        }
    });

    // Enable Send button
    $('#message').on('input', function () {
        const message = $('#message').val();
        if (message.length > 0) {
            $('#contact-us-submit-button').prop('disabled', false);
        } else {
            $('#contact-us-submit-button').prop('disabled', true);
        }
    });

    // Contact form
    $('#contact-form').submit(function (e) {
        const name = $('#name').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        const whatsappMessage = `Hello, I am ${name}.\nI a write  to inquire on the subject of ${subject}\n\n${message}\n\nLooking forward to your reply.\n\nKind Regards.`;
        const urlencodedText = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/254705715099?text=${urlencodedText}`, '_blank');

    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

