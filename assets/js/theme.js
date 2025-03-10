(function ($) {
  "use strict";
  var theme = {
    /**
     * Theme's components/functions list
     * Comment out or delete the unnecessary component.
     * Some components have dependencies (plugins).
     * Do not forget to remove dependency from src/js/vendor/ and recompile it.
     */
    init: () => {
      theme.stickyHeader();
      theme.dropdownAnimation();
      theme.headerButtons();
      theme.progressBar();
      theme.pageProgress();
      theme.bsModal();
      theme.plyr();
    },
    /**
     * Sticky Header
     * Enables sticky behavior on navigation on page scroll
     * Requires assets/js/vendor/headhesive.min.js
     */
    stickyHeader: () => {
      if ($(".navbar").length) {
        var options = {
          offset: 350,
          offsetSide: "top",
          classes: {
            clone: "banner--clone fixed ",
            stick: "banner--stick",
            unstick: "banner--unstick",
          },
          onStick: function () {
            $($.SmartMenus.Bootstrap.init);
            var $language_dropdown = $(".navbar:not(.fixed) .language-select .dropdown-menu");
            $language_dropdown.removeClass("show");
          },
          onUnstick: function () {
            var $language_sticky_dropdown = $(".navbar.fixed .language-select .dropdown-menu");
            $language_sticky_dropdown.removeClass("show");
          },
        };
        var banner = new Headhesive(".navbar", options);
      }
    },
    /**
     * Dropdown Animation
     * Adds a custom animation to dropdown menus
     */
    dropdownAnimation: () => {
      $(".navbar .navbar-nav:not(.navbar-nav-other)")
        .bind({
          "show.smapi": function (e, menu) {
            $(menu).removeClass("hide-animation").addClass("show-animation");
          },
          "hide.smapi": function (e, menu) {
            $(menu).removeClass("show-animation").addClass("hide-animation");
          },
        })
        .on("animationend webkitAnimationEnd oanimationend MSAnimationEnd", "ul", function (e) {
          $(this).removeClass("show-animation hide-animation");
          e.stopPropagation();
        });
    },
    /**
     * Header Buttons
     * Open/close offcanvas menus on click of header buttons
     */
    headerButtons: () => {
      var $header_hamburger = $(".hamburger.animate");
      var $language_select = $(".language-select .dropdown-menu");
      var $navbar_offcanvas = $(".offcanvas-nav");
      var $navbar_offcanvas_toggle = $('[data-toggle="offcanvas-nav"]');
      var $navbar_offcanvas_close = $(".offcanvas-nav-close");
      var $info_offcanvas = $(".offcanvas-info");
      var $info_offcanvas_close = $(".offcanvas-info-close");
      var $info_offcanvas_toggle = $('[data-toggle="offcanvas-info"]');
      $header_hamburger.on("click", function () {
        $header_hamburger.toggleClass("active");
      });
      $navbar_offcanvas_toggle.on("click", function (e) {
        e.stopPropagation();
        $navbar_offcanvas.toggleClass("open");
      });
      $navbar_offcanvas.on("click", function (e) {
        e.stopPropagation();
      });
      $navbar_offcanvas_close.on("click", function (e) {
        $navbar_offcanvas.removeClass("open");
        $header_hamburger.removeClass("active");
      });
      $info_offcanvas_toggle.on("click", function (e) {
        e.stopPropagation();
        $info_offcanvas.toggleClass("open");
      });
      $info_offcanvas.on("click", function (e) {
        e.stopPropagation();
      });
      $(document).on("click", function () {
        $navbar_offcanvas.removeClass("open");
        $info_offcanvas.removeClass("open");
        $header_hamburger.removeClass("active");
      });
      $info_offcanvas_close.on("click", function (e) {
        $info_offcanvas.removeClass("open");
      });
      $(".onepage .navbar li a.scroll").on("click", function () {
        $navbar_offcanvas.removeClass("open");
        $header_hamburger.removeClass("active");
      });
    },

    /**
     * Progressbar
     * Enables animated progressbars
     * Requires assets/js/vendor/progressbar.min.js
     */
    progressBar: () => {
      var $pline = $(".progressbar.line");
      $pline.each(function (i) {
        var line = new ProgressBar.Line(this, {
          strokeWidth: 3,
          trailWidth: 3,
          duration: 3000,
          easing: "easeInOut",
          text: {
            style: {
              color: "inherit",
              position: "absolute",
              right: "0",
              top: "-30px",
              padding: 0,
              margin: 0,
              transform: null,
            },
            autoStyleContainer: false,
          },
          step: function (state, line, attachment) {
            line.setText(Math.round(line.value() * 100) + " %");
          },
        });
        var value = $(this).attr("data-value") / 100;
        $pline.waypoint(
          function () {
            line.animate(value);
          },
          {
            offset: "100%",
          }
        );
      });
    },
    /**
     * Page Progress
     * Shows page progress on the bottom right corner of the page
     */
    pageProgress: () => {
      if ($(".progress-wrap").length) {
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength) / height;
          progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on("scroll", function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery(".progress-wrap").addClass("active-progress");
          } else {
            jQuery(".progress-wrap").removeClass("active-progress");
          }
        });
        jQuery(".progress-wrap").on("click", function (event) {
          event.preventDefault();
          jQuery("html, body").animate(
            {
              scrollTop: 0,
            },
            duration
          );
          return false;
        });
      }
    },

    /**
     * Bootstrap Tooltips
     * Enables Bootstrap tooltips
     * Requires Poppers library
     */
    bsTooltips: () => {
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    },
    /**
     * Bootstrap Popovers
     * Enables Bootstrap popovers
     * Requires Poppers library
     */
    bsPopovers: () => {
      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
      });
    },

    plyr: () => {
      Plyr.setup(".player", { loadSprite: !0 });
    },
    /**
     * Bootstrap Modal
     * Enables Bootstrap modals and modal popup
     */
    bsModal: () => {
      var scr_size = window.innerWidth;
      var scr_avail = $("body").innerWidth();
      var pad_right = scr_size - scr_avail;
      var myModalEl = document.querySelectorAll(".modal");
      myModalEl.forEach((myModalEl) => {
        myModalEl.addEventListener("show.bs.modal", function (e) {
          $(".navbar.fixed").css("padding-right", pad_right);
          $(".progress-wrap").css("margin-right", pad_right);
        });
        myModalEl.addEventListener("hidden.bs.modal", function (e) {
          $(".navbar.fixed").css("padding-right", "");
          $(".progress-wrap").css("margin-right", "");
        });
      });
      if ($(".modal-popup").length > 0) {
        var myModalPopup = new bootstrap.Modal(document.querySelector(".modal-popup"));
        var myModalEl2 = document.querySelector(".modal-popup");
        setTimeout(function () {
          myModalPopup.show();
        }, 200);
      }
    },
  };
  /**
   * Init theme core
   */
  theme.init();
})(jQuery);
