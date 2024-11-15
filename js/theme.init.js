((a) => {
  void 0 !== theme.PluginScrollToTop && theme.PluginScrollToTop.initialize();
  [].slice
    .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .map(function (n) {
      return new bootstrap.Tooltip(n);
    }),
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      .map(function (n) {
        return new bootstrap.Popover(n);
      });
  if (
    (a.isFunction(a.validator) &&
      void 0 !== theme.PluginValidation &&
      theme.PluginValidation.initialize(),
    a.isFunction(a.fn.themePluginAnimate) &&
      a("[data-appear-animation]").length &&
      theme.fn.dynIntObsInit(
        "[data-appear-animation], [data-appear-animation-svg]",
        "themePluginAnimate",
        theme.PluginAnimate.defaults
      ),
    a.isFunction(a.fn.themePluginAnimatedContent) &&
      (theme.fn.intObsInit(
        "[data-plugin-animated-letters]:not(.manual), .animated-letters",
        "themePluginAnimatedContent"
      ),
      theme.fn.intObsInit(
        "[data-plugin-animated-words]:not(.manual), .animated-words",
        "themePluginAnimatedContent"
      )),
    a.isFunction(a.fn.themePluginBeforeAfter) &&
      a("[data-plugin-before-after]").length &&
      theme.fn.intObsInit(
        "[data-plugin-before-after]:not(.manual)",
        "themePluginBeforeAfter"
      ),
    a.isFunction(a.fn.themePluginCarouselLight) &&
      a(".owl-carousel-light").length &&
      theme.fn.intObsInit(".owl-carousel-light", "themePluginCarouselLight"),
    a.isFunction(a.fn.themePluginCarousel) &&
      a("[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)")
        .length &&
      theme.fn.intObsInit(
        "[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)",
        "themePluginCarousel"
      ),
    a.isFunction(a.fn.themePluginChartCircular) &&
      (a("[data-plugin-chart-circular]").length ||
        a(".circular-bar-chart").length) &&
      theme.fn.dynIntObsInit(
        "[data-plugin-chart-circular]:not(.manual), .circular-bar-chart:not(.manual)",
        "themePluginChartCircular",
        theme.PluginChartCircular.defaults
      ),
    a.isFunction(a.fn.themePluginCountdown) &&
      (a("[data-plugin-countdown]").length || a(".countdown").length) &&
      theme.fn.intObsInit(
        "[data-plugin-countdown]:not(.manual), .countdown",
        "themePluginCountdown"
      ),
    a.isFunction(a.fn.themePluginCounter) &&
      (a("[data-plugin-counter]").length || a(".counters [data-to]").length) &&
      theme.fn.dynIntObsInit(
        "[data-plugin-counter]:not(.manual), .counters [data-to]",
        "themePluginCounter",
        theme.PluginCounter.defaults
      ),
    a.isFunction(a.fn.themePluginCursorEffect) &&
      a("[data-plugin-cursor-effect]").length &&
      theme.fn.intObsInit(
        "[data-plugin-cursor-effect]:not(.manual)",
        "themePluginCursorEffect"
      ),
    a.isFunction(a.fn.themePluginFloatElement) &&
      a("[data-plugin-float-element]").length &&
      theme.fn.intObsInit(
        "[data-plugin-float-element], [data-plugin-float-element-svg]",
        "themePluginFloatElement"
      ),
    a.isFunction(a.fn.themePluginGDPR) &&
      a("[data-plugin-gdpr]").length &&
      a(() => {
        a("[data-plugin-gdpr]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginGDPR(t);
        });
      }),
    a.isFunction(a.fn.themePluginGDPRWrapper) &&
      a("[data-plugin-gdpr-wrapper]").length &&
      a(() => {
        a("[data-plugin-gdpr-wrapper]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginGDPRWrapper(t);
        });
      }),
    a.isFunction(a.fn.themePluginHoverEffect) &&
      a("[data-plugin-hover-effect], .hover-effect-3d").length &&
      theme.fn.intObsInit(
        "[data-plugin-hover-effect]:not(.manual), .hover-effect-3d:not(.manual)",
        "themePluginHoverEffect"
      ),
    a.isFunction(a.fn.themePluginIcon) &&
      a("[data-icon]").length &&
      theme.fn.dynIntObsInit(
        "[data-icon]:not(.svg-inline--fa)",
        "themePluginIcon",
        theme.PluginIcon.defaults
      ),
    a.isFunction(a.fn.themePluginInViewportStyle) &&
      a("[data-inviewport-style]").length &&
      a(() => {
        a("[data-inviewport-style]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginInViewportStyle(t);
        });
      }),
    a.isFunction(a.fn.themePluginLightbox) &&
      (a("[data-plugin-lightbox]").length || a(".lightbox").length) &&
      theme.fn.execOnceTroughEvent(
        "[data-plugin-lightbox]:not(.manual), .lightbox:not(.manual)",
        "mouseover.trigger.lightbox",
        function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginLightbox(t);
        }
      ),
    a.isFunction(a.fn.themePluginMasonry) &&
      a("[data-plugin-masonry]").length &&
      a(() => {
        a("[data-plugin-masonry]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginMasonry(t);
        });
      }),
    a("[data-masonry]").length)
  ) {
    let n = a("[data-masonry]");
    a(window).on("load", () => {
      setTimeout(() => {
        n.each(function () {
          a(this).masonry("layout");
        });
      }, 1);
    });
  }
  a.isFunction(a.fn.themePluginMatchHeight) &&
    a("[data-plugin-match-height]").length &&
    a(() => {
      a("[data-plugin-match-height]:not(.manual)").each(function () {
        var n = a(this);
        let t;
        var e = theme.fn.getOptions(n.data("plugin-options"));
        e && (t = e), n.themePluginMatchHeight(t);
      });
    }),
    a.isFunction(a.fn.themePluginParallax) &&
      a("[data-plugin-parallax]").length &&
      theme.fn.intObsInit(
        "[data-plugin-parallax]:not(.manual)",
        "themePluginParallax"
      ),
    a.isFunction(a.fn.themePluginProgressBar) &&
      (a("[data-plugin-progress-bar]") ||
        a("[data-appear-progress-animation]").length) &&
      theme.fn.dynIntObsInit(
        "[data-plugin-progress-bar]:not(.manual), [data-appear-progress-animation]",
        "themePluginProgressBar",
        theme.PluginProgressBar.defaults
      ),
    a.isFunction(a.fn.themePluginRandomImages) &&
      a("[data-plugin-random-images]").length &&
      theme.fn.dynIntObsInit(
        ".plugin-random-images",
        "themePluginRandomImages",
        theme.PluginRandomImages.defaults
      ),
    a.isFunction(a.fn.themePluginReadMore) &&
      a("[data-plugin-readmore]").length &&
      theme.fn.intObsInit(
        "[data-plugin-readmore]:not(.manual)",
        "themePluginReadMore"
      ),
    a.isFunction(a.fn.themePluginRevolutionSlider) &&
      (a("[data-plugin-revolution-slider]").length ||
        a(".slider-container .slider").length) &&
      a(() => {
        a(
          "[data-plugin-revolution-slider]:not(.manual), .slider-container .slider:not(.manual)"
        ).each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginRevolutionSlider(t);
        });
      }),
    a.isFunction(a.fn.themePluginScrollSpy) &&
      a("[data-plugin-scroll-spy]").length &&
      a(() => {
        a("[data-plugin-scroll-spy]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginScrollSpy(t);
        });
      }),
    a.isFunction(a.fn.nanoScroller) &&
      a("[data-plugin-scrollable]").length &&
      theme.fn.intObsInit("[data-plugin-scrollable]", "themePluginScrollable"),
    a.isFunction(a.fn.themePluginSectionScroll) &&
      a("[data-plugin-section-scroll]").length &&
      a(() => {
        a("[data-plugin-section-scroll]:not(.manual)").each(function () {
          var n = a(this);
          let t;
          var e = theme.fn.getOptions(n.data("plugin-options"));
          e && (t = e), n.themePluginSectionScroll(t);
        });
      }),
    a.isFunction(a.fn.themePluginSort) &&
      (a("[data-plugin-sort]").length || a(".sort-source").length) &&
      theme.fn.intObsInit(
        "[data-plugin-sort]:not(.manual), .sort-source:not(.manual)",
        "themePluginSort"
      ),
    a.isFunction(a.fn.themePluginStarRating) &&
      a("[data-plugin-star-rating]").length &&
      theme.fn.intObsInit(
        "[data-plugin-star-rating]:not(.manual)",
        "themePluginStarRating"
      ),
    a.isFunction(a.fn.themePluginSticky) &&
      a("[data-plugin-sticky]").length &&
      theme.fn.execOnceTroughWindowEvent(
        window,
        "scroll.trigger.sticky",
        () => {
          a("[data-plugin-sticky]:not(.manual)").each(function () {
            var n = a(this);
            let t;
            var e = theme.fn.getOptions(n.data("plugin-options"));
            e && (t = e), n.themePluginSticky(t);
          });
        }
      ),
    a.isFunction(a.fn.themePluginToggle) &&
      a("[data-plugin-toggle]").length &&
      theme.fn.intObsInit(
        "[data-plugin-toggle]:not(.manual)",
        "themePluginToggle"
      ),
    a.isFunction(a.fn.themePluginVideoBackground) &&
      a("[data-plugin-video-background]").length &&
      theme.fn.intObsInit(
        "[data-plugin-video-background]:not(.manual)",
        "themePluginVideoBackground"
      ),
    void 0 !== theme.StickyHeader && theme.StickyHeader.initialize(),
    void 0 !== theme.Nav && theme.Nav.initialize(),
    void 0 !== theme.Search &&
      (a("#searchForm").length ||
        a(".header-nav-features-search-reveal").length) &&
      theme.Search.initialize(),
    void 0 !== theme.Newsletter &&
      a("#newsletterForm").length &&
      theme.fn.intObs("#newsletterForm", "theme.Newsletter.initialize();", {}),
    void 0 !== theme.Account &&
      (a("#headerAccount").length ||
        a("#headerSignUp").length ||
        a("#headerSignIn").length ||
        a("#headerRecover").length ||
        a("#headerRecoverCancel").length) &&
      theme.Account.initialize();
}).apply(this, [jQuery]);
