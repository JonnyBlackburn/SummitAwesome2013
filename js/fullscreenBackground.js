/*
    Fullscreen background is a small jQuery plugin that allows you to create fullscreen background.

    Author:     Gaya Kessler
    Date:       04-25-2012
    URL:        http://www.gayadesign.com
*/

(function ($) {
    var parentElement = "";
    var optionsArr = {
        selector: "img",
        fillOnResize: true,
        defaultCss: true
    };

    var gifArray = new Array(
        "img/backgrounds/background1.gif",
        "img/backgrounds/background2.gif",
        "img/backgrounds/background3.gif",
        "img/backgrounds/background4.gif",
        "img/backgrounds/background5.gif",
        "img/backgrounds/background6.gif"
    );

    var pngArray = new Array(
        "img/backgrounds/background1_sm.png",
        "img/backgrounds/background2_sm.png",
        "img/backgrounds/background3_sm.png",
        "img/backgrounds/background4_sm.png",
        "img/backgrounds/background5_sm.png",
        "img/backgrounds/background6_sm.png"
    );

    var threshold = 650;

    var imageIndex = Math.floor(Math.random()*($(window).width() < threshold ? pngArray.length : gifArray.length));

    $.fn.fullscreenBackground = function (options) {
        if(options) { $.extend(optionsArr, options ); };

        $("#bckgrnd").attr("src", $(window).width() < threshold ? pngArray[imageIndex] : gifArray[imageIndex]);

        this.each(function () {
            parentElement = this;

            if (optionsArr.defaultCss == true) {
                $("html,body").css({
                    width: "100%",
                    height: "100%"
                });

                $(parentElement).css({
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    zIndex: 1
                });
            }

            if (optionsArr.fillOnResize == true) {
                $(window).resize(function () {
                    fillBg(optionsArr.selector, parentElement);
                });
            }

            fillBg(optionsArr.selector, parentElement);
        });
    };

    function fillBg(selector, parentobj) {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        $(selector, parentobj).each(function () {
            var imgHeight = $(this).attr("height");
            var imgWidth = $(this).attr("width");
            var imgSrc = $(this).attr("src");

            var newWidth = windowWidth;
            var newHeight = (windowWidth / imgWidth) * imgHeight;
            var topMargin = ((newHeight - windowHeight) / 2) * -1;
            var leftMargin = 0;

            if (newHeight < windowHeight) {
                var newWidth = (windowHeight / imgHeight) * imgWidth;
                var newHeight = windowHeight;
                var topMargin = 0;
                var leftMargin = ((newWidth - windowWidth) / 2) * -1;
            }

            windowWidth < threshold ? $(this).attr("src", pngArray[imageIndex]) : $(this).attr("src", gifArray[imageIndex]);

            $(this).css({
                height: newHeight + "px",
                width: newWidth + "px",
                marginLeft: leftMargin + "px",
                marginTop: topMargin + "px",
                display: "block"
            });
        });
    }
})(jQuery);