$(document).ready(function() {
    $(".user-bar__toggle").click(function(d) {
        d.preventDefault();
        $(this).parent(".user-bar__drop").toggleClass("user-bar__drop_open").siblings(".user-bar__drop").removeClass("user-bar__drop_open")
    });
    $(".slick-arrow").click(function (d) {
        d.preventDefault();
    });
    $(document).click(function(d) {
        if ($(d.target).closest(".user-bar__drop").length) {
            return
        }
        $(".user-bar__drop").removeClass("user-bar__drop_open");
        d.stopPropagation()
    });
    $(".cart-amount__btn_plus").click(function() {
        var d = $(this).siblings(".cart-amount__control").val();
        d++;
        var f = d;
        var e = $(this).siblings(".cart-amount__control").val(f)
    });
    $(".cart-amount__btn_minus").click(function() {
        var d = $(this).siblings(".cart-amount__control").val();
        d--;
        var e = d;
        if (e <= 0) {
            return false
        }
        var f = $(this).siblings(".cart-amount__control").val(e)
    });
    //$(".nav-toggle").click(function() {
    //    $(".slide-nav").addClass("slide-nav_open")
    //});
    $(".slide-overlay, .slide-nav__head").click(function() {
        $(".slide-nav").removeClass("slide-nav_open")
    });
    $(".accordion__item_open").find(".accordion__body").css("display", "block");
    $(".accordion__head").click(function() {
        $(this).parents(".accordion__item").find(".accordion__body").slideToggle("");
        $(this).parents(".accordion__item").toggleClass("accordion__item_open")
    });
    $(".product-color__btn").click(function() {
        $(this).addClass("product-color__btn_active").siblings().removeClass("product-color__btn_active")
    });
    $(".product-size__btn").click(function() {
        $(this).addClass("product-size__btn_active").siblings().removeClass("product-size__btn_active")
    });
    $("#more_btn").click(function() {
        $(this).text("Загрузка...");
        var d = {
            action: "product_catalog",
            query: true_product,
            page: current_page_product
        };
        $.ajax({
            url: ajaxurl,
            data: d,
            type: "POST",
            success: function(e) {
                if (e) {
                    $("#more_btn").text("Показать еще").parents(".load-wrap").find(".section-list").append(e);
                    current_page_product++;
                    if (current_page_product == max_pages_product) {
                        $("#more_btn").parents(".more").remove()
                    }
                } else {
                    $("#more_btn").parents(".more").remove()
                }
            }
        })
    });
    $("#more_sale_btn").click(function() {
        $(this).text("Загрузка...");
        var d = {
            action: "product_catalog",
            query: true_product_sale,
            page: current_page_product_sale
        };
        $.ajax({
            url: ajaxurl,
            data: d,
            type: "POST",
            success: function(e) {
                if (e) {
                    $("#more_sale_btn").text("Показать еще").parents(".load-wrap").find(".section-list").append(e);
                    current_page_product_sale++;
                    if (current_page_product_sale == max_pages_product_sale) {
                        $("#more_sale_btn").parents(".more").remove()
                    }
                } else {
                    $("#more_sale_btn").parents(".more").remove()
                }
            }
        })
    });
    /*$(".scroll-link").on("click", function(d) {
        d.preventDefault();
        var e = $(this),
            f = e.attr("href");
        $("html, body").animate({
            scrollTop: $(f).offset().top - 50
        }, 750)
    });*/
    $(".category-list__item.category-list__show__more .category-list__link.category-list__show__more__link").on("click", function() {
        $(this).parent().remove()
    });
    var c = $("#price_min").val();
    var b = $("#price_max").val();
    // var a = $(".header").offset().top;
    $(".header + .header-hreplacer").css("height", $(".header").outerHeight());
    $(document).on("scroll", function() {
        var d = $(this).scrollTop();
        var f = $("body").hasClass("admin-bar") ? 32 : 0;
        var e = d + f > a;
        $(".header").toggleClass("fixed", e);
        $("#back-top").toggleClass("visible", e);
        $(".header + .header-hreplacer").toggleClass("show", e)
    });
    $("#price_min").change(function() {
        var d = $("#price_min").val();
        $(".slider-range").slider("values", 0, d)
    });
    $("#price_max").change(function() {
        var d = $("#price_max").val();
        $(".slider-range").slider("values", 1, d)
    });
    $("#filter").submit(function() {
        var d = $("#filter");
        $.ajax({
            url: d.attr("action"),
            data: d.serialize(),
            type: d.attr("method"),
            beforeSend: function(e) {
                d.find("button").text("Загружаю...")
            },
            success: function(e) {
                d.find("button").text("Применить фильтр");
                $("#response").html(e)
            }
        });
        return false
    });
    $('#filter [name="categoryfilter"]').change(function() {
        var d = $(this).val();
        $("#subcat_" + d).css("display", "block").attr("disabled", false).siblings("select").css("display", "none").attr("disabled", true)
    });
    // Новые скрипты
    $('#back-top').click(function(){
    	$('html, body').animate({scrollTop: 0},500);
    	return false;
    });

    if(window.innerWidth < 993) {
    	$('.page_table__table tbody td').each(function(){
	    	$(this).prepend($(this).parents('table').find('thead tr td').eq($(this).index()).html() + ': ');
	    });
    }
});


// Новое
$('.structure_page__table__collapse').click(function(){
    
    if(window.innerWidth > 993) {
        if($(this).parents('tr').next().hasClass('inner_table__wrapper')) {
            $(this).toggleClass('active').parents('tr').toggleClass('not_bordered').next().slideToggle(300);
        }
    }
    if(window.innerWidth < 993) {
        if($(this).parents('tr').next().hasClass('inner_table__wrapper')) {
            $(this).toggleClass('active').parents('tr').toggleClass('not_bordered').next().toggleClass('d-block');
        }
    }
});
if(window.innerWidth < 993) {
    $('.structure_page__table > table > tbody > tr:not(.inner_table__wrapper) > td').each(function(){
        text = $(this).parents('table').find('thead tr td').eq($(this).index()).html();
        $(this).prepend(text + ': ');
    });
    $('.inner_table td').each(function(){
        text = $(this).parents('table').find('thead tr td').eq($(this).index()).html();
        $(this).prepend(text + ': ');
    });
}

// попап
$('.js-btn-popup').click(function (e) {
    e.preventDefault();
    var index_btn_popup = $(this).attr('href');

    $.each($('.js-popup'), function (i, elem) {
        var index_popup = $(elem).attr('data-id-popup');
        index_btn_popup === index_popup ? $(elem).fadeIn(300) : $(elem).fadeOut(300);
    });
});

function close_popup() {
    $('.js-popup').fadeOut(300);
}

$('.js-popup__close').click(close_popup);

$('.js-popup').click(function (e) {
    var popup = $('.js-popup__wrapp');
    if (!popup.is(e.target) && popup.has(e.target).length === 0)
        $('.js-popup').fadeOut(300);
});
// end попап

/*$('.js-item-lang').click(function () {
    let ths = $(this);
    $('.img-lang').attr('src', ths.attr('data-img'))
});*/