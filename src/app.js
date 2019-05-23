import '../src/app.scss';
import 'bootstrap';
import 'slick-carousel';
import '@fancyapps/fancybox';
import noUiSlider from 'nouislider';
import 'owl.carousel';
import 'jquery';
import '@chenfengyuan/datepicker';
import '@chenfengyuan/datepicker/i18n/datepicker.ru-RU.js';
import 'magnific-popup';
import 'bootstrap-select';

$(document).ready(function() {
  $('.navbar__toggle-button').on('click', function() {
    $('#mySidenav, #main').toggleClass('slide');
  });

  fixedheader();

  $(window).on('scroll', fixedheader);

  var offsetheader = $('.header-full').offset().top;

  function fixedheader() {
    if( $(window).scrollTop() > offsetheader ) {
        $('.header-full').addClass('header-fixed');
        $('#main').css('padding-top', $('.header-full').height()+'px');
    } else {
        $('.header-full').removeClass('header-fixed');
        $('#main').css('padding-top', 0);
    }
  }

  $('.about-company__slider-images').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="svg/next.svg"></button>',
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Prev" type="button" style=""><img src="svg/prev.svg"></button>'
  });

  $('.passport__documentation').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="svg/next.svg"></button>',
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Prev" type="button" style=""><img src="svg/prev.svg"></button>',
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 590,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  });

  $('[data-fancybox="gallery"]').fancybox();

  $('#startDate').datepicker({
    format: 'dd.mm.yy',
    language: 'ru-RU',
    autoHide: 'true',
    filter: function(date, view) {
      if($('#endDate').val()) {
        if (new Date($('#endDate').datepicker('getDate')) <= date) {
          return false;
        }
      }
    }
  });

  $('#endDate').datepicker({
    format: 'dd.mm.yy',
    language: 'ru-RU',
    autoHide: 'true',
    filter: function(date, view) {
      if($('#startDate').val()) {
        if (new Date($('#startDate').datepicker('getDate')) >= date) {
          return false;
        }
      }
    }
  });

  $('.autos__delivery.owl-carousel').owlCarousel({
    nav: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
  });

  $('.autos__auto.owl-carousel').owlCarousel({
    nav: true,
    responsive:{
        0:{
            items:1
        }
    }
  });

  $('.selectpicker').selectpicker();

  if(document.getElementById('calc__range')) {
    var calc__range = document.getElementById('calc__range');

    noUiSlider.create(calc__range, {
      start: 10000,
      step: 10,
      connect: [true, false],
      range: {
          'min': 100,
          'max': 16000
      }
    });

    calc__range.noUiSlider.on('update', function (values, handle) {
      $('.calc__liter-count').val(values[handle]);
      let fuel = $('.selectpicker.calc__fuel').val();
      change_price(values[handle] * parseInt(fuel))
    });

    $('.selectpicker.calc__fuel').change(function (e) {
      $('.calc__total-liter-price').text($(this).val());
      $('.calc__liter-count').val(calc__range.noUiSlider.get());
      change_price(parseInt(calc__range.noUiSlider.get() * parseInt($(this).val())))
    });

    function change_price (sum) {
      if (sum > 0) {
        $('.calc__total-price').text(sum);
      } else {
        $('.calc__total-price').text(0);
      }
    }
  }

  $('.popup').magnificPopup({type:'inline'});

  $("#phone-number, #phone-number2").keypress(function (e) {
       if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
           return false;
       }
       var curchr = this.value.length;
       var curval = $(this).val();
       if (curchr == 1 && e.which != 8 && e.which != 0) {
           $(this).val(curval + " (");
       } else if (curchr == 6 && e.which != 8 && e.which != 0) {
           $(this).val(curval + ") ");
       } else if (curchr == 11 && e.which != 8 && e.which != 0) {
           $(this).val(curval + "-");
       } else if (curchr == 14 && e.which != 8 && e.which != 0) {
           $(this).val(curval + "-");
       }
       $(this).attr('maxlength', '17');
   });
});
