
document.body.style.transform = 'scale(1)';




$(function () {
    //Set up the click behavior
    $(".mobile-nav-switch").click(function () {
        var menuItem = $('.mobile-nav-menu');
        var disp = '70px';
        if (menuItem.hasClass('active'))
        {
            disp = '-190px';
        }

        $('.mobile-nav-menu').animate({

            top: disp
        }, 350, function () {
            $(this).toggleClass('active');
        });



    });




});







$(window).on("orientationchange", function () {

    var orientationChange = function ()
    {


        $(window).off('resize', orientationChange);
    }
    $(window).on('resize', orientationChange);


});





$(window).resize(function () {



});