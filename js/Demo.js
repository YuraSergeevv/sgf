jQuery(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    $('#back-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800, function () {
            $('body,html').stop();
        });

        return false;
    });


    var menu = jQuery('.mainmenu');

    menu.first("li").addClass('first');
    menu.last("li").addClass('last');
    menu.find(">li:nth-child(odd)").addClass('odd');

    var leftCol = jQuery('#left');

    if (leftCol.text().trim() == '') {
        leftCol.hide();
        jQuery('#right').css({ margin: 0, 'padding-left': '12px' });
    }

    $('.calc>span').click(function () {
        var calc = $('.calc');

        var width = calc.width();
        var height = calc.height();

        var audio = '/upload/translate_tts.mp3';

        $("#player").src = audio;

        calc
                .animate({ width: width - 20, height: height - 20 }, 200)
                .animate({ width: width, height: height, bottom: 200, right: 500 }, 200)
                .animate({ bottom: 0, right: 600 })
                .animate({ bottom: 150, right: 400 })
                .animate({ bottom: 0 }, 200)
                .animate({ bottom: 100, right: 600 })
                .animate({ bottom: 0 }, 150)
                .animate({ bottom: 50, right: 300 })
                .animate({ bottom: 0 }, 100)
                .animate({ bottom: 25, right: 800 })
                .animate({ bottom: 0, right: -50 })
                .animate({ right: 40 }, 350)
                .animate({ right: -30 }, 300)
                .animate({ right: 20 }, 250)
                .animate({ right: -10 }, 200)
                .animate({ right: 7 }, 150)
                .animate({ right: -7 }, 100)
                .animate({ right: 5 }, 50)
                .animate({ right: -5 }, 40)
                .animate({ right: 0 }, 30);
    });
});