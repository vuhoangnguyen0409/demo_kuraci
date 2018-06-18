$(function() {
  //resize window
  $(window).on('load resize', function() {
    var win_w = $(window).width();
    if (468 < win_w && win_w < 768) {
      $('body').removeClass('sp');
      $('body').addClass('tbl');
    } else if (win_w < 468) {
      $('body').removeClass('tbl');
      $('body').addClass('sp');
    } else {
      $('body').removeClass('tbl sp');
      $('.box').removeAttr('style');
    }
  });

  $(window).on('load', function() {
    var tbl = $('body').hasClass('tbl');
    var sp = $('body').hasClass('sp');
    if ( !(tbl) && !(sp) ) {
      var body = $('body')
      var move_up = $('.move_up')
      var bg_white = $('.bg_white');
      var message_wrap = $('#message_wrap');
      var visual = $("#visual")
      var visualSize = {
        w: visual.width(),
        y: visual.height()
      }
      var headerH2 = $("#head_area h2");
      var headerH2Img = $("img", headerH2)
      var headerH2Size = {
        w: headerH2.width(),
        y: headerH2.height()
      }
      var headerH2ImgSize = {
        w: headerH2Img.width(),
        h: headerH2Img.height()
      }
      var headerH2Copy = $(".h2_copy");
      var headerH2CopyMasks = [];
      var headerKeyVisual = $("#key_visual");
      var headerNavi = $("header");
      var entryBtn = $("#entry li");
      var headerH2mask;
      //sections
      var message_wrap = $('#message_wrap');
      var interview_wrap = $('#interview_wrap');
      // add mask for h2copy
      headerH2Copy.css("position", "relative");
      var h2CopyH = 52;
      var h2CopyW = 551;
      headerH2CopyMasks = [];
      for (var maskN = 0; maskN < 2; maskN++) {
        var h2CopyMask = $("<div>");
        h2CopyMask.css({
          "width": h2CopyW,
          "height": Math.ceil(h2CopyH / 2),
          "position": "absolute",
          "right": 0,
          "background-color": "#000"
        });

        if (maskN == 0) {
          h2CopyMask.css("top", 0);
        } else {
          h2CopyMask.css("bottom", 0);
        }
        headerH2Copy.append(h2CopyMask);
        headerH2CopyMasks.push(h2CopyMask);
      }
      // css set
      body.css({
        'height':'100vh'
      })
      // TweenMax set
      TweenMax.set(bg_white, {
        xPercent: -100
      });
      TweenMax.set(headerNavi, {
        yPercent: -100
      });
      TweenMax.set(headerH2, {
        x: -200,
        y: 150
      });
      TweenMax.set(message_wrap, {
        y: 500,
        opacity: 0
      });
      // add mask for img key_visual
      headerKeyVisualMask = $("<img>");
      headerKeyVisualMask.attr("src", "img/maskblack_left.png");
      headerKeyVisualMask.css({
        "position": "absolute",
        "top": 0,
        "left": 0
      });
      headerKeyVisual.append(headerKeyVisualMask);
      // TweenMax to
      entryBtn.css("opacity", 0);
      TweenMax.to(headerH2, 1.5, {
        x: 0,
        ease: Power2.easeOut,
        onComplete: openeing1,
        delay: 2
      });
    	TweenMax.to(bg_white, 1, {
    		xPercent: 0,
    		delay: 2
    	});

      function openeing1() {
        TweenMax.to(headerH2, 1, {
          y: 0,
          ease: Power2.easeInOut,
          onComplete: opening2,
        });
      }

      function opening2() {
        TweenMax.to(headerH2, 1, {
          y: 0,
          ease: Power2.easeInOut,
          onComplete: opening3
        });
      }

      function opening3() {
        TweenMax.to(headerNavi, 1, {
          yPercent: 0,
          ease: Power2.easeOut,
          onComplete: opening4
        });
      }

      function opening4() {
        TweenMax.to(headerKeyVisual, 1, {
          opacity: 1,
          delay: 0.5
        });
        TweenMax.staggerTo(entryBtn, 1, {
          opacity: 1,
          ease: Power2.easeOut,
          delay: 0.25
        }, 0.25);
        TweenMax.to(headerKeyVisualMask, 1.5, {
          xPercent: -100,
          ease: Power2.easeOut,
          onComplete: opening5
        });
        TweenMax.staggerTo(headerH2CopyMasks, 1.5, {
          xPercent: 100,
          ease: Power2.easeOut,
          delay: 1
        }, 0.25);
      }

      function opening5() {
        for (var n = 0; n < headerH2CopyMasks.length; n++) {
          headerH2CopyMasks[n].remove();
        }
        TweenMax.to(headerKeyVisualMask, 2.5, {
          xPercent: -100,
          ease: Power2.easeOut,
        });
        TweenMax.to(message_wrap, 1, {
          y: 0,
          opacity: 1
        });
        body.css({
          'height':'auto'
        })
      }
      //
    }
  });
  //----------------------------------------------------------------
  imgReplace(769, 'img'); // width, class
  // nav
  $('.tlg_btn').on('click', function(){
    $(this).next().slideToggle();
    $(this).toggleClass('fixed');
  });
  $('a[href^="#"]').on('click', function(e) {
    //e.preventDefault();
    var target = this.hash;
    //alert(target);
    $target = $(target);
    $('html, body').stop().animate({
      //'scrollTop': $target.offset().top - headerHeight
      'scrollTop': $target.offset().top - 0
    }, 1200, 'swing');
    return false;
  });
  /* animation inview */
  var $animation_elements = $('.animate');
  var $window = $(window);

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop(); //window top
    var window_bottom_position = (window_top_position + window_height); //window bottom

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top; // element top
      var element_bottom_position = (element_top_position + element_height); // element bottom

      //check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('animated zoomIn');
      } else {
        //$element.removeClass('animated zoomIn');
      }
    });
  }
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');

})// end ready
////////////////////////////////// imgReplace pc_sp
var imgReplace = function(widthReplace, objectReplace) {
  var $setElem = $(objectReplace),
    replaceWidth = widthReplace;
  $setElem.each(function() {
    var $this = $(this);

    function imgSize() {
      var windowWidth = parseInt(window.innerWidth || document.documentElement.clientWidth);
      if (windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace('_sp', '_pc'));
      } else if (windowWidth < replaceWidth) {
        $this.attr('src', $this.attr('src').replace('_pc', '_sp'));
      }
    }
    $(window).resize(function() {
      imgSize();
    });
    imgSize();
  });
};
