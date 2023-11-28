(function ($) {
  "user strict";
  // Preloader Js
  $(window).on('load', function () {
      //alert("This can run");
      $('.preloader').fadeOut(1000);
      var img = $('.bg_img');
      img.css('background-image', function () {
        var bg = ('url(' + $(this).data('background') + ')');
        return bg;
      });
      // filter functions
      var $grid = $(".grid-area");
      var filterFns = {};
      $grid.isotope({
        itemSelector: '.grid-item',
        masonry: {
          columnWidth: 0,
        }
      });
      // bind filter button click
      $('ul.filter').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
          filter: filterValue
        });
      });
      // change is-checked class on buttons
      $('ul.filter').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'li', function () {
          $buttonGroup.find('.active').removeClass('active');
          $(this).addClass('active');
        });
      });
      $('ul.tab-submenu').each(function(i) {
          console.log(' !!!localStorage.get/2/!!! ');
          var storage = localStorage.getItem('tabsub');
          if (storage) {
            $('ul.tab-submenu li').eq(storage).click();
          }
        });
      $('ul.tab-menu').each(function(i) {
          console.log(' !!!localStorage.get/3/!!! ');
          var storage = localStorage.getItem('tabmenu');
          if (storage) {
              /*if(document.querySelectorAll('ul.tab-menu li').length){
                  console.log("-sss")
                 $('ul.tab-menu li').eq(storage).click();
              } else {
                  console.log("sss")
                  localStorage.removeItem('tabmenu');
              }*/
          }
        });
  });
  $(document).ready(function () {
    // Nice Select
    $('.select-bar').niceSelect();
    // Lightcase
    $('.video-popup').magnificPopup({
        type: 'iframe',
    });
    $("body").each(function () {
      $(this).find(".img-pop").magnificPopup({
          type: "image",
          gallery: {
              enabled: false
          }
        });
      });
    // Wow js active
    new WOW().init();
    //Faq
    $('.faq-wrapper .faq-title').on('click', function (e) {
      var element = $(this).parent('.faq-item');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('.faq-content').removeClass('open');
        element.find('.faq-content').slideUp(300, "swing");
      } else {
        element.addClass('open');
        element.children('.faq-content').slideDown(300, "swing");
        element.siblings('.faq-item').children('.faq-content').slideUp(300, "swing");
        element.siblings('.faq-item').removeClass('open');
        element.siblings('.faq-item').find('.faq-title, .faq-title-two').removeClass('open');
        element.siblings('.faq-item').find('.faq-content').slideUp(300, "swing");
      }
    });

    //MenuBar
    $('.header-bar').on('click', function () {
        $(".menu").toggleClass("active");
        $(".header-bar").toggleClass("active");
        $('.overlay').toggleClass('active');
    });
    $('.overlay').on('click', function () {
        $(".menu").removeClass("active");
        $(".header-bar").removeClass("active");
        $('.overlay').removeClass('active');
    });
    //Menu Dropdown Icon Adding
    $("ul>li>.submenu").parent("li").addClass("menu-item-has-children");
    // drop down menu width overflow problem fix
    $('ul').parent('li').hover(function () {
      var menu = $(this).find("ul");
      var menupos = $(menu).offset();
      if (menupos.left + menu.width() > $(window).width()) {
        var newpos = -$(menu).width();
        menu.css({
          left: newpos
        });
      }
    });
    $('.menu li a').on('click', function (e) {
      var element = $(this).parent('li');
      if (element.hasClass('open')) {
        element.removeClass('open');
        element.find('li').removeClass('open');
        element.find('ul').slideUp(300, "swing");
      } else {
        element.addClass('open');
        element.children('ul').slideDown(300, "swing");
        element.siblings('li').children('ul').slideUp(300, "swing");
        element.siblings('li').removeClass('open');
        element.siblings('li').find('li').removeClass('open');
        element.siblings('li').find('ul').slideUp(300, "swing");
      }
    })
    // Scroll To Top
    var scrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        scrollTop.removeClass("active");
      } else {
        scrollTop.addClass("active");
      }
    });
    //Click event to scroll to top
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
    // Header Sticky Here
    var headerOne = $(".header-section");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 1) {
        headerOne.removeClass("header-active");
      } else {
        headerOne.addClass("header-active");
      }
    });
    $('.window-warning .lay').on('click', function() {
      $('.window-warning').addClass('inActive');
    })
    $('.seat-plan-wrapper li .movie-schedule .item').on('click', function() {
      $('.window-warning').removeClass('inActive');
    })
    //Tab Section
    $('.tab ul.tab-menu li').on('click', function (g) {
      var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
      tab.find('li').siblings('li.tab-label-main').removeClass('active');
      $(this).closest('li').addClass('active');
      tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').fadeOut(500, function(){
        tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').removeClass('active');
      });
      tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn(500, function(){
        tab.find('.tab-area').find('div.tab-item:eq(' + index + ')').addClass('active');
      });
      localStorage.setItem('tabmenu', index);
      g.preventDefault();
    });
    $('.tabsub ul.tab-submenu li').on('click', function (g) {
      var tab = $(this).closest('.tabsub'),
        index = $(this).closest('li').index();
      tab.find('li').siblings('li').removeClass('active');
      $(this).closest('li').addClass('active');

      tab.find('.tab-area').find('div.tabsub-item').not('div.tabsub-item:eq(' + index + ')').stop( true, true ).fadeOut(50, function(){
        tab.find('.tab-area').find('div.tabsub-item').not('div.tabsub-item:eq(' + index + ')').removeClass('active');
      });
      tab.find('.tab-area').find('div.tabsub-item:eq(' + index + ')').stop( true, true ).fadeIn(3800, function(){
        tab.find('.tab-area').find('div.tabsub-item:eq(' + index + ')').addClass('active');
      });

      var nav = tab.find('.item-mode').find('div.navigation');
      if(nav.css('display') === 'none' && index == 1 ){
         nav.css({ display: "flex" });
      }else{
         nav.css({ display: "none" });
      }
      localStorage.setItem('tabsub', index);
      g.preventDefault();
    });
    $('.search-tab ul.tab-menu li').on('click', function (k) {
      var search_tab = $(this).closest('.search-tab'),
        searchIndex = $(this).closest('li').index();
        search_tab.find('li').siblings('li').removeClass('active');
      $(this).closest('li').addClass('active');
      search_tab.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + searchIndex + ')').hide(10);
      search_tab.find('.tab-area').find('div.tab-item:eq(' + searchIndex + ')').show(10);
      k.preventDefault();
    });
    $('.tabTwo ul.tab-menu li').on('click', function (g) {
      var tabTwo = $(this).closest('.tabTwo'),
        index = $(this).closest('li').index();
      tabTwo.find('li').siblings('li').removeClass('active');
      $(this).closest('li').addClass('active');
      tabTwo.find('.tab-area').find('div.tab-item').not('div.tab-item:eq(' + index + ')').fadeOut(10);
      tabTwo.find('.tab-area').find('div.tab-item:eq(' + index + ')').fadeIn(10);
      g.preventDefault();
    });
    //Turn-Arrow
    $(".flaticon-turn-arrow-svg").on('click', function(v){
     var castItem = $(this).closest('.cast-item');
     var character = castItem.find('.character');
     var actor = castItem.find('.actor');
     if(character.css('display') === 'block'){
        character.css({ display: "none" });
        actor.css({ display: "block" });
    }else{
        character.css({ display: "block" });
        actor.css({ display: "none" });
    }
    v.preventDefault();
    });
    //Odometer
    $(".counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    $('.social-icons li a').on('mouseover', function(e) {
      var social = $(this).parent('li');
      if(social.children('a').hasClass('active')) {
        social.siblings('li').children('a').removeClass('active');
        $(this).addClass('active');
      } else {
        social.siblings('li').children('a').removeClass('active');
        $(this).addClass('active');
      }
    });
    $('.tab-slider').owlCarousel({
      loop:true,
      responsiveClass:true,
      nav:false,
      dots:false,
      margin: 30,
      autoplay:true,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:1,
          },
          576:{
              items:2,
          },
          768:{
              items:2,
          },
          992:{
              items:3,
          },
          1200:{
              items:4,
          }
      }
    })
    $('.sponsor-slider').owlCarousel({
      loop: true,
      responsiveClass: true,
      nav: false,
      dots: false,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 1500,
      autoplayHoverPause: true,
      responsive:{
          0:{
              items:1,
          },
          500:{
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:4,
          },
          1200:{
              items:5,
          }
      }
    })
    $('.casting-slider').owlCarousel({
      loop:false,
      responsiveClass:true,
      nav:false,
      dots:true,
      margin: 100,
      autoplay:false,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:1,
          },
          320:{
              items:2,
          },
          450:{
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:3,
          },
          1200:{
              items:4,
          }
      },
      onInitialized: function(event){
      console.log('!!!!!onInitialized!!!!!!!afterwards method '+ event.page.index + event.page.count + event.relatedTarget.items().length + event.page.size + event.item.count);
      if (event.item.count > event.page.size) {
        //$('.cast-prev-movie').show();
        $('.cast-next').show();
        $('.cast-prev').addClass('disabled');
      } else {
        $('.cast-next').hide();
        $('.cast-prev').hide();
      }
    }
    });
    var owlCasting = $('.casting-slider');
    owlCasting.owlCarousel();
    // Go to the next item
    $('.cast-next').on('click', function() {
        owlCasting.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.cast-prev').on('click', function() {
        owlCasting.trigger('prev.owl.carousel', [300]);
    })
    owlCasting.on('changed.owl.carousel', function(event) {
        $('.cast-next').removeClass('disabled');
        $('.cast-prev').removeClass('disabled');
        if (event.item.index == 0 ) {
          $('.cast-prev').addClass('disabled');
        }
        if (event.page.index+1 == event.page.count) {
          $('.cast-next').addClass('disabled');
        }
    });
    $('.casting-slider-two').owlCarousel({
      loop:($(".owl-carousel .cast-item").length > 4) ? true: false,
      responsiveClass:true,
      nav:false,
      dots:false,
      margin: 100,
      autoplay:false,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:2,
              margin: 50,
          },
          361:{
              items:2,
              margin: 60,
          },
          400:{
              items:2,
          },
          450:{
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:3,
          },
          1200:{
              items:4,
          }
      },
      onInitialized: function(event){
      console.log('!!!!!onInitialized!!!!!!!afterwards method '+ event.page.index + event.page.count + event.relatedTarget.items().length + event.page.size + event.item.count);
      if (event.item.count > event.page.size) {
      } else {
        $('.cast-next-2').hide();
        $('.cast-prev-2').hide();
      }
    }
    });
    var owlTT = $('.casting-slider-two');
    owlTT.owlCarousel();
    $('.video-title-slider').owlCarousel({
      loop: false,
      rewind: true,
      responsiveClass:true,
      nav:true,
      dots:false,
      margin: 10,
      /*autoplay:false,
      autoplayTimeout:2000,
      autoplayHoverPause:false,*/
      responsive:{
          0:{
              items:1,
          },
          320:{
              items:2,
          },
          450:{
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:3,
          },
          1200:{
              items:4,
          }
      },
      onInitialized: function(event){
        if (event.item.count > event.page.size) {
            $('.video-title-slider .owl-nav').show();
            //$('.owl-next').show();
            //$('.owl-prev').hide();
          } else {
            $('.video-title-slider .owl-nav').hide();
          }
       /* var carousel = event.target.data('owl.carousel');
        carousel.settings.loop = false; //don't know if both are necessary
        carousel.options.loop = false;*/
        //loop:($(".owl-carousel .it").length > owlVT.data('owl.carousel').options.items) ? true: false,

    }
    });
    var owlVT = $('.video-title-slider');
    owlVT.owlCarousel();
    $('.franchise-videogame-slider').owlCarousel({
      loop:false,
      responsiveClass:true,
      nav:false,
      dots:false,
      margin: 30,
      autoplay:false,
      autoplayTimeout:2000,
      autoplayHoverPause:false,
      responsive:{
          0:{
              items:2,
          },
          450:{
              items:3,
          },
          768:{
              items:3,
          },
          992:{
              items:3,
          },
          1200:{
              items:8,
              margin: 35,
          }
      },
      onInitialized: function(event){
            console.log('!!!!!onInitialized!!!!!!!afterwards method '+ event.page.index + event.page.count + event.relatedTarget.items().length + event.page.size + event.item.count);

      if (event.item.count > event.page.size) {
        $('.cast-next-franchise').show();
        $('.cast-prev-franchise').addClass('disabled');
      } else {
        $('.cast-next-franchise').hide();
        $('.cast-prev-franchise').hide();
      }
    }
    });
    var owlFVG = $('.franchise-videogame-slider');
    owlFVG.owlCarousel();
    $('.cast-next-franchise').on('click', function() {
        owlFVG.trigger('next.owl.carousel');
    })
    $('.cast-prev-franchise').on('click', function() {
        owlFVG.trigger('prev.owl.carousel', [300]);
    })
    owlFVG.on('changed.owl.carousel', function(event) {
        console.log("changed"+ event.item.index);
        $('.cast-next-franchise').removeClass('disabled');
        $('.cast-prev-franchise').removeClass('disabled');
        if (event.item.index == 0 ) {
          $('.cast-prev-franchise').addClass('disabled');
        }
        if (event.item.index == event.item.count - event.page.size) {
          $('.cast-next-franchise').addClass('disabled');
        }
    });
    $.fancybox.defaults.btnTpl.change = '<button data-fancybox-change class="fancybox-button fancybox-button--change" title="Change"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN""http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg version="1.0" xmlns="http://www.w3.org/2000/svg"width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"fill="#000000" stroke="none"><path d="M457 538 l-45 -63 34 -3 34 -3 0 -104 c0 -118 2 -115 -88 -115 -107 0 -192 -12 -192 -26 0 -11 34 -14 170 -14 l170 0 0 130 0 130 35 0 35 0 -47 65 c-26 36 -50 65 -54 65 -4 0 -27 -28 -52 -62z"/><path d="M100 300 l0 -130 -36 0 -35 0 45 -63 c24 -34 49 -62 55 -62 6 0 31 28 56 63 l45 62 -35 0 -35 0 0 104 c0 120 -4 116 103 116 108 0 177 10 177 26 0 11 -33 14 -170 14 l-170 0 0 -130z"/></g></svg></button>';
    $('.owl-item:not(.cloned) .it a[data-fancybox="video-gallery"]').fancybox({
        selector : '.owl-item:not(.cloned) .it a[data-fancybox="video-gallery"]',
        backFocus: false,
        thumbs : {
            autoStart : true,
            axis      : 'y'
        },
        /*        fullScreen : {
            autoStart: true
	    },*/
/*        helpers : {
    title : { type : 'inside' }
   },
   beforeLoad: function() {
    this.title = $(this.element).attr('caption');
   },*/
        buttons : [
        'thumbs',
        'change',
        'close'
      ],
      beforeShow: function() {
         screenOrientationMobile.changeOrientation("landscape");
         this.title =  $(this.element).data("caption");
                 console.log("????")
         newElemsFBСhange.length = 0;
         document.querySelector("#fancybox-thumbs1 .fancybox-thumbs__list").innerHTML = " ";
        /*const item = document.querySelector(".fancybox-container");
        if(item.classList.contains('fancybox-show-thumbs')) {
          document.getElementById('fancybox-thumbs1').style.display = 'block';
        }*/
    },
    afterLoad: function(instance, current) {
            console.log(current.opts.$orig.attr("data-source"))
            //console.log($(".fancybox-inner .slide-title").data("game"));
            $('.fancybox-inner .fancybox-content').attr("data-source", current.opts.$orig.attr("data-source"));
            $('.fancybox-inner .fancybox-content').attr("data-sourceid", current.opts.$orig.attr("data-sourceid"));
    },
    onInit:function() {
      var $container = $('.fancybox-container');
      /*$container.isotope({
                    containerStyle: {
                    },
                    });*/
      //var $container =document.getElementById('fancybox-container-1')
      var elems = [];
      var $elem = $('<div id="fancybox-thumbs1" style="display: none;" class="fancybox-thumbs-y"><div class="fancybox-thumbs__list"></div></div>');
      elems.push( $elem[0] );
      /*$container.isotope('insert', elems)
      $container.isotope('layout');
      //$container.insertAdjacentHTML( 'afterbegin', $elem[0] );*/
      const item = document.querySelector(".fancybox-container");
      item.append($elem[0]);
    },
     beforeClose: function() {

        document.getElementById('fancybox-thumbs1').style.display = 'none';
    },
    afterClose: function() {
        screenOrientationMobile.unlockOrientation();
    }
    });
     $('body').on('click', '[data-fancybox-thumbs]', function() {
      const item = document.querySelector(".fancybox-container");
      console.log(item.classList.contains('fancybox-show-thumbs'));
      if(item.classList.contains('fancybox-show-thumbs')) {
        document.getElementById('fancybox-thumbs1').style.display = 'none';
      } else {
        document.getElementById('fancybox-thumbs1').style.display = 'none';
      }
    });
    var newElemsFBСhange = []; //or Bollean
    $('body').on('click', '[data-fancybox-change]', function(e) {
      const item = document.querySelector(".fancybox-container");
      if(item.classList.contains('fancybox-show-thumbs')) {
        if(document.getElementById('fancybox-thumbs1').style.display == 'none') {
            document.getElementById('fancybox-thumbs1').style.display = 'block';
            var $elem = $('<a  class="ctx_video_change active" href="javascript:;" tabindex="0" data-index="0" style="background-image:url(http://s.gamer-info.com/vd/2/6/7/1/26719_small_170_wide.jpg)" class="fancybox-thumbs-active"></a><a class="ctx_video_change" href="javascript:;" tabindex="0" data-index="1" style="background-image:url(https://lipsum.app/id/28/200x150)" class=""></a><a class="ctx_video_change" href="javascript:;" tabindex="0" data-index="2" style="background-image:url(http://s.gamer-info.com/vd/2/6/7/2/26722_small_170_wide.jpg)"></a>');
            const item = document.querySelector(".fancybox-thumbs__list");
            if(newElemsFBСhange.length == 0) {
                /*$.each($elem, function (index, e) {
                    newElemsFBСhange.push(e);
                    item.append(e);
                })*/
                FCRendering()
            }
        } else {
            document.getElementById('fancybox-thumbs1').style.display = 'none';
        }
      }
    });
    function FCRendering() {
                var game = $('.fancybox-content').data("mediaid");
                $.ajax({
                    method: 'GET',
                    url: '../../../game/video/get/',
                    data: {
                        'game': game,
                    },
                    success: function (data) {
                        if (data.success === true) {
                            console.log(data.data)
                            const item = document.querySelector(".fancybox-thumbs__list");
                            $.each(JSON.parse(data.data), function (index, data) {
                                var $elem = $(`<div style="display: grid; /*grid-template-areas: 'image content';*/"><div style="font-size: 15px;">dsssa</div><a  class="ctx_video_change active" href="javascript:;"\
                                tabindex="0" data-url="${data.url}" data-name="${data.name}" data-index="0" style="background-image:url(http://s.gamer-info.com/vd/2/6/7/1/26719_small_170_wide.jpg); max-width: inherit;" class="fancybox-thumbs-active"></a></div>`);
                                newElemsFBСhange.push($elem[0]);
                                item.append($elem[0]);
                                 //let $elem = $(`${data.results}`);
                                 //item.replaceChildren($elem[0]);
                            })
                        } else {

                       }
                    }
                })
            };
    $('body').on('click','.ctx_video_change', function(){
        console.log("jhh");
        $(this).siblings(".active").removeClass("active");
        $(this).addClass('active');
        $(".fancybox-iframe").attr("src","https://www.youtube-nocookie.com/embed/IbH5BRPgXIw?autoplay=1&autohide=1&fs=1&rel=0&hd=1&wmode=transparent&enablejsapi=1&html5=1");
    });
    // Go to the next item
    $('.cast-next-2').on('click', function() {
        owlTT.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.cast-prev-2').on('click', function() {
        owlTT.trigger('prev.owl.carousel', [300]);
    })

    $('.details-photos').owlCarousel({
      loop:false,
      navRewind: false,
      dots: true,
      responsiveClass:true,
      autoplay: false,
      margin: 28,
      nav:false,
      responsive:{
          0:{
              items:3,
          },
          450:{
              items:3,
          },
          480:{
              items:3,
          },
          540:{
              items:3,
          },
          577:{
              items:4,
          },
          768:{
              items:4
          },
          992:{
              items:4,
          },
          1200:{
              items:5,
          }
      },
      onInitialized: function(event){
      console.log('!!!!!onInitialized!!!!!!!afterwards method '+ event.page.index + event.page.count + event.relatedTarget.items().length + event.page.size + event.item.count);
      if (event.item.count > event.page.size) {
        //$('.cast-prev-movie').show();
        $('.cast-next-movie').show();
        $('.cast-prev-movie').addClass('disabled');
      } else {
        $('.cast-next-movie').hide();
        $('.cast-prev-movie').hide();
      }
    }
    });
    var owlTTd = $('.details-photos');
    owlTTd.owlCarousel();
    $('.cast-next-movie').on('click', function() {
        owlTTd.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.cast-prev-movie').on('click', function() {
        owlTTd.trigger('prev.owl.carousel', [300]);
    })
    owlTTd.on('changed.owl.carousel', function(event) {
        console.log("changed"+ event.page.index + event.page.count);
        $('.cast-next-movie').removeClass('disabled');
        $('.cast-prev-movie').removeClass('disabled');
        if (event.item.index == 0 ) {
          $('.cast-prev-movie').addClass('disabled');
        }
        if (event.page.index+1 == event.page.count) {
          $('.cast-next-movie').addClass('disabled');
        }
    });


    // Owl Carousel
          var owl = $(".carousel-section");
           $(".carousel-section").owlCarousel({
            loop: false,
            rewind: true,
            margin: -10,
            nav: true,
            responsive:{
                  0:{
                      items:2,
                  },
                  576:{
                      items:2,
                  },
                  768:{
                      items:3,
                  },
                  992:{
                      items:3,
                  },
                  1200:{
                      items:4,
                      margin: -40,
                  }
              },
            onInitialize: function (event) {
                //if ($('.owl-carousel.carousel-section .item').length <= 1) {
                //   this.settings.loop = false;
                //}
            }

            //loop:($(".owl-carousel.carousel-section .item").length > owl.data('owl.carousel').settings.items) ? true: false,


            //loop: $('.owl-carousel.carousel-section .item').length > 1 ? true:false,

          });

    var owl = $(".carousel-section");
    owl.owlCarousel();

    var book = 0;
    $(".seat-free img").on('click', function(e) {
      if(book == 0) {
        $(this).attr("src","./assets/images/movie/seat01-free.png");
        book = 1;
      }
      else if(book == 1) {
        $(this).attr("src","./assets/images/movie/seat01-booked.png");
        book = 0;
      }
    });
    var bookTwo = 1;
    $(".seat-free-two img").on('click', function(e) {
      if(bookTwo == 0) {
        $(this).attr("src","./assets/images/movie/seat02-free.png");
        bookTwo = 1;
      }
      else if(bookTwo == 1) {
        $(this).attr("src","./assets/images/movie/seat02-booked.png");
        bookTwo = 0;
      }
    });
    // shop cart + - start here
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });
    //Speaker Slider
    $('.speaker-slider').owlCarousel({
      loop:true,
      responsiveClass:true,
      nav:false,
      dots:false,
      margin: 30,
      autoplay:true,
      autoplayTimeout:2000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:1,
          },
          576:{
              items:2,
          },
          768:{
              items:3,
          },
          992:{
              items:3,
          },
          1200:{
              items:4,
          }
      }
    });
    var owlT = $('.speaker-slider');
    owlT.owlCarousel();
    // Go to the next item
    $('.speaker-next').on('click', function() {
        owlT.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.speaker-prev').on('click', function() {
        owlT.trigger('prev.owl.carousel', [300]);
    })
    //Client SLider
    $('.client-slider').owlCarousel({
      loop:true,
      nav:false,
      dots: true,
      items:1,
      autoplay:true,
      autoplayTimeout:2500,
      autoplayHoverPause:true,
    })
    //Count Down JAva Script
    $('.countdown').countdown({
      date: '10/15/2022 05:00:00',
      offset: +2,
      day: 'Day',
      days: 'Days'
    },
    function () {
        /*alert('Done!');*/
    });
    //Widget Slider
    $('.widget-slider').owlCarousel({
      loop:true,
      nav:false,
      dots: false,
      items:1,
      autoplay:true,
      autoplayTimeout:2500,
      autoplayHoverPause:true,
      margin: 30,
    });
    var owlBela = $('.widget-slider');
    owlBela.owlCarousel();
    // Go to the next item
    $('.widget-next').on('click', function() {
        owlBela.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.widget-prev').on('click', function() {
        owlBela.trigger('prev.owl.carousel', [300]);
    })
    $('.blog-slider').owlCarousel({
      loop:true,
      nav:false,
      dots: false,
      items:1,
      autoplay:true,
      autoplayTimeout:2500,
      autoplayHoverPause:true,
    });
    var owlB = $('.blog-slider');
    owlB.owlCarousel();
    // Go to the next item
    $('.blog-next').on('click', function() {
        owlB.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('.blog-prev').on('click', function() {
        owlB.trigger('prev.owl.carousel', [300]);
    })


  });
})(jQuery);
