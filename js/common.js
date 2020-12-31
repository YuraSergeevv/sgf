$(document).ready(function() {

  /**
  * Вкладки
  */

  $('.tabs-nav').each(function() {
    $(this).find('.tabs-nav__item').each(function(i) {
      $(this).click(function(){
        $(this).addClass('tabs-nav__item_active').siblings().removeClass('tabs-nav__item_active')
          .closest('.tabs').find('.tabs-content').removeClass('tabs-content_active').eq(i).addClass('tabs-content_active');
      });
    });
  });


  /**
  * Свернуть/развернуть закза в таблице
  */

  $('.table-order__main').click(function() {
    $(this).parents('.table-order__row').toggleClass('table-order__row_open').find('.table-order__hidden').slideToggle('normal');
  });


  /**
  * Свернуть/азвернуть подробнее в аккордионе
  */

  $('.accordion__more').click(function() {
    $(this).toggleClass('accordion__more_active').siblings('.accordion__hide').slideToggle('normal');
  });


  /**
  * Слайдер
  */

  $('.product-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    prevArrow: '<button class="slick-prev"></button>',
    nextArrow: '<button class="slick-next"></button>',
  });
  
  /**
  * Выезжающее меню
  */

  $('#category-toggle').click(function() {
    $('.slide-nav_category').addClass('slide-nav_open');
    $('.slide-overlay').addClass('slide-overlay_active');
    return false;
  });

  $('#menu-toggle').click(function() {
    $('.slide-nav_menu').addClass('slide-nav_open');
    $('.slide-overlay').addClass('slide-overlay_active');
    return false;
  });

  $('.slide-overlay, .slide-nav__head').click(function() {
    $('.slide-nav').removeClass('slide-nav_open');
    $('.slide-overlay').removeClass('slide-overlay_active');
  });

    $('.article__more').click(function (d) {
        d.preventDefault();
        $(this).toggleClass('article__more_active').siblings('.article__hide').slideToggle('normal');
    });
	
	$('.skill__nav').each(function() {
    $(this).find('.skill__nav-item').each(function(i) {
      $(this).click(function(){
        $(this).addClass('skill__nav-item_active').siblings().removeClass('skill__nav-item_active')
          .closest('.skill').find('.skill__content').removeClass('skill__content_active').eq(i).addClass('skill__content_active');
      });
    });
  });


});