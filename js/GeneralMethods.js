if (typeof (jQuery) != 'undefined') {
    jQuery(function () {
        jQuery.fn.exists = function () { return this.length > 0; };

        if (typeof (jQuery.fn.dialog) != 'undefined') {

            initAlertDialog();

            initConfirmDialog();

            initPromptDialog();
        }
    });
}

// replace the alert window
function initAlertDialog()
{
    var alrt = '#alrt';

    if (!$(alrt).exists())
        $(document.body).append("<div style='display:none' id='alrt'><p></p></div>");

    $(alrt).dialog(
                {
                    autoOpen: false,
                    modal: true,
                    show: 'fade',
                    speed: '200',
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                });

                window.alert = function (mess) {

                    mess = replace(mess, '\n', '<br/>');

                    $(alrt + ' p').html(mess);
                    $(alrt).dialog('open');
                };
}

var lcallback = function() {};
var lcallbacksender = null;
var isp = false;

// replace the confirm dialog
function initConfirmDialog() {
    var cnfrm = '#cnfrm';

    if (!$(cnfrm).exists())
        $(document.body).append("<div style='display:none' id='cnfrm'><p></p></div>");

    $(cnfrm).dialog(
                {
                    autoOpen: false,
                    modal: true,
                    show: 'fade',
                    speed: '200',
                    buttons: {
                        "Да": function () {
                            $(this).dialog("close");

                            if (lcallback) {
                                isp = true;

                                lcallback(lcallbacksender);

                                isp = false;
                            }
                        },

                        "Нет": function () {
                            $(this).dialog("close");
                            return false;
                        }
                    }
                });

    window.confirm = function (mess, callback, sender) {

        //console.log(arguments[0]);

        if (mess == "")
            return false;

        if (!isp) {
            lcallback = callback;
            lcallbacksender = sender; // arguments.callee.caller - not all browsers send valid arguments (

            $(cnfrm + ' p').html(mess);
            $(cnfrm).dialog('open');

            return false;
        }
    };
}


// replace the confirm dialog
function initPromptDialog() {
    var prmt = '#prmt';

    if (!$(prmt).exists())
        $(document.body).append("<div style='display:none' id='prmt'><p><input type='text' /></p></div>");

    $(prmt).dialog(
                {
                    autoOpen: false,
                    modal: true,
                    show: 'fade',
                    speed: '200',
                    buttons: {
                        "Ввести": function () {
                            $(this).dialog("close");

                            if (lcallback) {
                                isp = true;

                                lcallback($(prmt + ' p input').val());

                                isp = false;
                            }
                        },

                        "Отмена": function () {
                            $(this).dialog("close");
                            return false;
                        }
                    }
                });

    window.prompt = function (sMessage, sDefaultValue, callback) {
        lcallback = callback;

        $(prmt + ' p input').val(sDefaultValue);
        $(prmt).dialog('option', { "title": sMessage }); add_beginRequest(BeginRequestHandler);
        $(prmt).dialog('open');

        return null;
    };
}


window.addEventListener("load", function load(event) {
    window.removeEventListener("load", load, false); //remove listener, no longer needed  

    // add_beginRequest(BeginRequestHandler);

    add_endRequest(EndRequestHandler);

}, false);

function add_beginRequest(func) {
    // Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(func);
}

function add_endRequest(func) {
    // Sys.WebForms.PageRequestManager.getInstance().add_endRequest(func);
}

function BeginRequestHandler(sender, args) {
    if (typeof (jQuery) != 'undefined')
        $('#preloader').fadeIn();
    else
        document.getElementById('preloader').style.display = '';
}

function EndRequestHandler(sender, args) {
    if (typeof (jQuery) != 'undefined')
        $('#preloader').fadeOut(200);
    else
        document.getElementById('preloader').style.display = 'none';
}


function replace(str, find, rep) {
    if (!str)
        return str;

    try
    {
        while (str.indexOf(find) != -1) {
            str = str.replace(find, rep);
        }
    }
    catch (ex) { }

    return str;
}

function shoot() {
    $('#inav')
                .animate({ top: "-20px" }, 350)
                .animate({ top: "0px", height: "16px" }, 300)
                .animate({ top: "-10px", height: "32px" }, 250)
                .animate({ top: "0px", height: "24px" }, 200)
                .animate({ top: "-5px", height: "32px" }, 150)
                .animate({ top: "0px", height: "32px" }, 100);

    setTimeout('shoot()', 30000);
}

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
        }, 800);
        return false;
    });

    setTimeout('shoot();', 5000);
});

$(function () {
    $(".mbtn").click(function () {
        $("#preloader").show();

        //if (this.getAttribute('href').indexOf('MessageToCompany') != -1)
        window.location.href = this.getAttribute("href");
        //else
        //    $.get(this.getAttribute("href"), function (data) {
        //        $('#mcnt').html("");
        //
        //        var headHtml = data.split('<head id="')[1].split("</head>")[0];
        //
        //        headHtml = headHtml.substr(headHtml.indexOf('>'));
        //
        //        $('head').html(headHtml);
        //        $(document.body).html(data.split('body style="margin: 0px;">')[1].split("</body>")[0]);
        //    });
    });
});

$(function () {
    $('.top_menu, .top_menu_first, .top_menu_sel').hover(function () {
        var item = $(this);

        item.find('.menu').fadeIn(200);

        if (item.hasClass("top_menu_sel"))
            item.attr("sel", "sel");
        else
            item.addClass("top_menu_sel");
    },
        function () {
            var item = $(this);

            item.find('.menu').fadeOut(100);

            if (item.attr("sel") != "sel")
                item.removeClass("top_menu_sel");
        });

    // if (typeof (Sys) != "undefined")
    // {
    //     Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(initWatermark);

    //     Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(checkRequiredFields);
    // }
});

function checkRequiredFields(sender, args)
{
    if (args._postBackElement.tagName == "INPUT" && args._postBackElement.getAttribute('type') == 'text')
        return;

    var isCancel = false;

    var errorFields = '';

    $('input.required').each(function () {
        if (this.value == this.getAttribute('wm') || this.value == '') {
            isCancel = true;
            $(this).addClass('error');

            var reqtext = this.getAttribute("reqt");

            if (reqtext == null || reqtext == '')
                reqtext = this.getAttribute('wm');

            errorFields += "<br />" + reqtext;
        }
        else
            $(this).removeClass('error');
    });

    if (isCancel)
        alert("<b>Заполнены не все поля:</b>" + errorFields);

    args.set_cancel(isCancel);
}

function initWatermark() {
    try {
        $.watermark.options = {
            className: 'watermark'
        };

        $('input, textarea').each(function() {
            var wm = this.getAttribute("wm");

            if (wm) {
                $(this).watermark(wm);
                this.setAttribute('title', wm);
            }
        });
    }
    catch(ex)
    {
        ;
    }
}