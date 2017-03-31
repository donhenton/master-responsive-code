


$(function () {
    //Set up the click behavior
    $(".label-trigger").click(function () {
        //Toggle the class .active on the hamburger icon
        var trMenu = "215px";
        var trBlock = '210px';
        if ($(this).hasClass('active'))
        {
            trMenu = "10px";
            trBlock = '0px';
        }
        
        $(this).toggleClass("active");
        $(this).animate({
           
            left: trMenu
        }, 200, function () {
            // Animation complete.
        });
        
        $('.main-container').animate({
           
            left: trBlock
        }, 200, function () {
            // Animation complete.
        });
        
    });
});
$(window).resize(function () {
    //console.log($(window).width());
    var w = $(window).width();
    if (w > 640)
    {
        $(".label-trigger").removeClass('active');
        $('#nav-trigger').attr('checked', false);
    }

});