(window.theme = {}),
  (window.theme.fn = {
    getOptions(e) {
      if ("object" == typeof e) return e;
      if ("string" != typeof e) return {};
      try {
        return JSON.parse(e.replace(/'/g, '"').replace(";", ""));
      } catch (e) {
        return {};
      }
    },
    execPluginFunction(e, t) {
      var i = Array.prototype.slice.call(arguments, 2),
        a = e.split("."),
        e = a.pop();
      for (let e = 0; e < a.length; e++) t = t[a[e]];
      return t[e](...i);
    },
    intObs(e, i, t, a) {
      e = document.querySelectorAll(e);
      let s = { rootMargin: "0px 0px 200px 0px" },
        o =
          (Object.keys(t).length && (s = $.extend(s, t)),
          new IntersectionObserver((e) => {
            for (var t of e)
              0 < t.intersectionRatio &&
                ("string" == typeof i
                  ? Function("return " + i)()
                  : i.call($(t.target)),
                a || o.unobserve(t.target));
          }, s));
      $(e).each(function () {
        o.observe($(this)[0]);
      });
    },
    intObsInit(e, s) {
      e = document.querySelectorAll(e);
      let o = new IntersectionObserver(
        (e) => {
          for (var t of e)
            if (0 < t.intersectionRatio) {
              var i = $(t.target);
              let e;
              var a = theme.fn.getOptions(i.data("plugin-options"));
              a && (e = a),
                theme.fn.execPluginFunction(s, i, e),
                o.unobserve(t.target);
            }
        },
        { rootMargin: "200px" }
      );
      $(e).each(function () {
        o.observe($(this)[0]);
      });
    },
    dynIntObsInit(e, o, i) {
      e = document.querySelectorAll(e);
      $(e).each(function () {
        let a = $(this),
          e;
        var t = theme.fn.getOptions(a.data("plugin-options"));
        t && (e = t);
        let s = theme.fn.mergeOptions(i, e);
        t = { rootMargin: theme.fn.getRootMargin(o, s), threshold: 0 };
        if (s.forceInit) theme.fn.execPluginFunction(o, a, s);
        else {
          let i = new IntersectionObserver((e) => {
            for (var t of e)
              0 < t.intersectionRatio &&
                (theme.fn.execPluginFunction(o, a, s), i.unobserve(t.target));
          }, t);
          i.observe(a[0]);
        }
      });
    },
    getRootMargin(e, { accY: t }) {
      switch (e) {
        case "themePluginCounter":
        case "themePluginAnimate":
        case "themePluginIcon":
        case "themePluginRandomImages":
          return t ? `0px 0px ${t}px 0px` : "0px 0px 200px 0px";
        default:
          return "0px 0px 200px 0px";
      }
    },
    mergeOptions(e, t) {
      var i,
        a = {};
      for (i in e) a[i] = e[i];
      for (i in t) a[i] = t[i];
      return a;
    },
    execOnceTroughEvent(e, t, i) {
      let a = this.formatDataName(t);
      return (
        $(e).on(t, function () {
          $(this).data(a) ||
            (i.call($(this)), $(this).data(a, !0), $(this).off(t));
        }),
        this
      );
    },
    execOnceTroughWindowEvent(e, t, i) {
      let a = this.formatDataName(t);
      return (
        $(e).on(t, function () {
          $(this).data(a) || (i(), $(this).data(a, !0), $(this).off(t));
        }),
        this
      );
    },
    formatDataName(e) {
      return (e = e.replace(".", ""));
    },
    isElementInView(e) {
      return e[0].getBoundingClientRect().top <= window.innerHeight / 3;
    },
    getScripts(e, t) {
      e = $.map(e, (e) => $.getScript((t || "") + e));
      return (
        e.push(
          $.Deferred(({ resolve: e }) => {
            $(e);
          })
        ),
        $.when(...e)
      );
    },
    showErrorMessage(e, t) {
      $(".modalThemeErrorMessage").remove(),
        $("body").append(
          '<div class="modal fade" id="modalThemeErrorMessage" aria-hidden="true" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' +
            e +
            '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
            t +
            '</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button></div></div></div></div>'
        );
      e = document.getElementById("modalThemeErrorMessage");
      (e = bootstrap.Modal.getOrCreateInstance(e)).show();
    },
  }),
  ((o = {}, d) => {
    try {
      "file://" === location.origin &&
        (d("[data-icon]").length || d("iframe").length) &&
        o.fn.showErrorMessage(
          "Local Environment Warning",
          "SVG Objects, Icons, YouTube and Vimeo Videos might not show correctly on local environment. For better result, please preview on a server."
        );
    } catch (e) {}
    d.extend({
      browserSelector() {
        (e = navigator.userAgent || navigator.vendor || window.opera),
          ((jQuery.browser = jQuery.browser || {}).mobile =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
              e
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              e.substr(0, 4)
            ));
        var e = "ontouchstart" in window || navigator.msMaxTouchPoints;
        let t = navigator.userAgent,
          i = t.toLowerCase(),
          a = (e) => i.includes(e),
          s = "gecko",
          o = "webkit",
          n = "opera",
          r = document.documentElement,
          l = [
            !/opera|webtv/i.test(i) && /msie\s(\d)/.test(i)
              ? "ie ie" + parseFloat(navigator.appVersion.split("MSIE")[1])
              : a("firefox/2")
              ? "gecko ff2"
              : a("firefox/3.5")
              ? "gecko ff3 ff3_5"
              : a("firefox/3")
              ? "gecko ff3"
              : a("gecko/")
              ? s
              : a("opera")
              ? n +
                (/version\/(\d+)/.test(i)
                  ? " opera" + RegExp.jQuery1
                  : /opera(\s|\/)(\d+)/.test(i)
                  ? " opera" + RegExp.jQuery2
                  : "")
              : a("konqueror")
              ? "konqueror"
              : a("chrome")
              ? o + " chrome"
              : a("iron")
              ? o + " iron"
              : a("applewebkit/")
              ? o +
                " safari" +
                (/version\/(\d+)/.test(i) ? " safari" + RegExp.jQuery1 : "")
              : a("mozilla/")
              ? s
              : "",
            a("j2me")
              ? "mobile"
              : a("iphone")
              ? "iphone"
              : a("ipod")
              ? "ipod"
              : a("mac") || a("darwin")
              ? "mac"
              : a("webtv")
              ? "webtv"
              : a("win")
              ? "win"
              : a("freebsd")
              ? "freebsd"
              : a("x11") || a("linux")
              ? "linux"
              : "",
            "js",
          ];
        (c = l.join(" ")),
          d.browser.mobile && (c += " mobile"),
          e && (c += " touch"),
          (r.className += " " + c),
          /Edge/.test(navigator.userAgent) &&
            d("html").removeClass("chrome").addClass("edge"),
          d("body").hasClass("dark") && d("html").addClass("dark"),
          d("body").hasClass("boxed") && d("html").addClass("boxed");
      },
    }),
      d.browserSelector(),
      /iPad|iPhone|iPod/.test(navigator.platform) &&
        d(document).ready((e) => {
          e(".thumb-info").attr("onclick", "return true");
        }),
      d('a[data-bs-toggle="tab"]').length &&
        (d('a[data-bs-toggle="tab"]').on(
          "shown.bs.tab",
          function ({ target: e }) {
            e = d(d(e).attr("href"));
            e.length && e.find(".owl-carousel").trigger("refresh.owl.carousel"),
              d(this)
                .parents(".nav-tabs")
                .find(".active")
                .removeClass("active"),
              d(this).addClass("active").parent().addClass("active");
          }
        ),
        window.location.hash) &&
        d(window).on("load", () => {
          "*" !== window.location.hash &&
            d(window.location.hash).get(0) &&
            new bootstrap.Tab(
              d(
                'a.nav-link[href="' +
                  window.location.hash +
                  '"]:not([data-hash])'
              )[0]
            ).show();
        }),
      d("html").hasClass("disable-onload-scroll") ||
        !window.location.hash ||
        ["#*"].includes(window.location.hash) ||
        (window.scrollTo(0, 0),
        d(window).on("load", () => {
          setTimeout(() => {
            var e = window.location.hash;
            let t = d(window).width() < 768 ? 180 : 90;
            d(e).length &&
              (d("a[href$='" + window.location.hash + "']").is(
                "[data-hash-offset]"
              )
                ? (t = parseInt(
                    d("a[href$='" + window.location.hash + "']")
                      .first()
                      .attr("data-hash-offset")
                  ))
                : d("html").is("[data-hash-offset]") &&
                  (t = parseInt(d("html").attr("data-hash-offset"))),
              isNaN(t) && (t = 0),
              d("body").addClass("scrolling"),
              d("html, body").animate(
                { scrollTop: d(e).offset().top - t },
                600,
                "easeOutQuad",
                () => {
                  d("body").removeClass("scrolling");
                }
              ));
          }, 1);
        })),
      d.fn.extend({
        textRotator(a) {
          a = d.extend({ fadeSpeed: 500, pauseSpeed: 100, child: null }, a);
          return this.each(function () {
            let t = a,
              i = d(this);
            var e;
            d(i.children(), i).each(function () {
              d(this).hide();
            }),
              (e = t.child || d(i).children(":first")),
              d(e).fadeIn(t.fadeSpeed, () => {
                d(e)
                  .delay(t.pauseSpeed)
                  .fadeOut(t.fadeSpeed, function () {
                    let e = d(this).next();
                    0 == e.length && (e = d(i).children(":first")),
                      d(i).textRotator({
                        child: e,
                        fadeSpeed: t.fadeSpeed,
                        pauseSpeed: t.pauseSpeed,
                      });
                  });
              });
          });
        },
      });
    var i = {
      $wrapper: d(".notice-top-bar"),
      $closeBtn: d(".notice-top-bar-close"),
      $header: d("#header"),
      $body: d(".body"),
      init() {
        return (
          d.cookie("portoNoticeTopBarClose")
            ? (this.$wrapper
                .parent()
                .prepend("\x3c!-- Notice Top Bar removed by cookie --\x3e"),
              this.$wrapper.remove())
            : this.build().events(),
          this
        );
      },
      build() {
        let e = this;
        return (
          d(window).on("load", () => {
            setTimeout(() => {
              e.$body.css({
                "margin-top": e.$wrapper.outerHeight(),
                transition: "ease margin 300ms",
              }),
                d("#noticeTopBarContent").textRotator({
                  fadeSpeed: 500,
                  pauseSpeed: 5e3,
                }),
                ["absolute", "fixed"].includes(e.$header.css("position")) &&
                  e.$header.css({
                    top: e.$wrapper.outerHeight(),
                    transition: "ease top 300ms",
                  }),
                d(window).trigger("notice.top.bar.opened");
            }, 1e3);
          }),
          this
        );
      },
      events() {
        let t = this;
        return (
          t.$closeBtn.on("click", (e) => {
            e.preventDefault(),
              t.$body.animate({ "margin-top": 0 }, 300, () => {
                t.$wrapper.remove(), t.saveCookie();
              }),
              ["absolute", "fixed"].includes(t.$header.css("position")) &&
                t.$header.animate({ top: 0 }, 300),
              t.$header.hasClass("header-effect-shrink") &&
                t.$header.find(".header-body").animate({ top: 0 }, 300),
              d(window).trigger("notice.top.bar.closed");
          }),
          this
        );
      },
      checkCookie() {
        return !!d.cookie("portoNoticeTopBarClose");
      },
      saveCookie() {
        return d.cookie("portoNoticeTopBarClose", !0), this;
      },
    };
    function e() {
      var e = d(document).scrollTop();
      (pageHeight = d(document).height() - d(window).height()),
        (progress = (100 * e) / pageHeight),
        d(".progress-reading .progress-bar").width(parseInt(progress) + "%");
    }
    if (
      (d(".notice-top-bar").length && i.init(),
      d(".image-hotspot").length &&
        d(".image-hotspot")
          .append('<span class="ring"></span>')
          .append('<span class="circle"></span>'),
      d(".progress-reading").length &&
        (d(document).on("scroll ready", () => {
          e();
        }),
        d(document).ready(() => {
          d(window).afterResize(() => {
            e();
          });
        })),
      d("body[data-plugin-page-transition]").length)
    ) {
      let i = !1;
      d(document).on("click", "a", function (e) {
        i = d(this);
      }),
        d(window).on("beforeunload", (e) => {
          var t;
          "object" != typeof i ||
            0 == (t = i.attr("href")).indexOf("mailto:") ||
            0 == t.indexOf("tel:") ||
            i.data("rm-from-transition") ||
            d("body").addClass("page-transition-active");
        }),
        d(window).on("pageshow", ({ persisted: e, originalEvent: t }) => {
          (e || t.persisted) &&
            (d("html").hasClass("safari") && window.location.reload(),
            d("body").removeClass("page-transition-active"));
        });
    }
    function t() {
      d(window).width() < 1950
        ? d(".shape-divider svg[preserveAspectRatio]").each(function () {
            d(this).parent().hasClass("shape-divider-horizontal-animation")
              ? d(this).attr("preserveAspectRatio", "none")
              : d(this).attr("preserveAspectRatio", "xMinYMin");
          })
        : d(".shape-divider svg[preserveAspectRatio]").each(function () {
            d(this).attr("preserveAspectRatio", "none");
          });
    }
    d("[data-clone-element]").length &&
      d("[data-clone-element]").each(function () {
        var t = d(this),
          i = t.html(),
          a = t.attr("data-clone-element");
        for (let e = 0; e < a; e++) t.html(t.html() + i);
      }),
      d("[data-clone-element-to]").length &&
        d("[data-clone-element-to]").each(function () {
          var e = d(this),
            t = e.html(),
            e = d(e.attr("data-clone-element-to"));
          e.html(e.html() + t);
        }),
      d(".thumb-info-floating-caption").each(function () {
        d(this)
          .addClass("thumb-info-floating-element-wrapper")
          .append(
            '<span class="thumb-info-floating-element thumb-info-floating-caption-title d-none">' +
              d(this).data("title") +
              "</span>"
          ),
          d(this).data("type") &&
            d(".thumb-info-floating-caption-title", d(this))
              .append(
                '<div class="thumb-info-floating-caption-type">' +
                  d(this).data("type") +
                  "</div>"
              )
              .css({ "padding-bottom": 22 }),
          d(this).hasClass("thumb-info-floating-caption-clean") &&
            d(".thumb-info-floating-element", d(this)).addClass(
              "bg-transparent"
            );
      }),
      d(".thumb-info-floating-element-wrapper").length &&
        ("undefined" != typeof gsap
          ? d(".thumb-info-floating-element-wrapper")
              .on("mouseenter", function ({ clientX: e, clientY: t }) {
                d(this).data("offset") || d(this).data("offset", 0);
                let i = parseInt(d(this).data("offset"));
                d(".thumb-info-floating-element-clone").remove(),
                  d(".thumb-info-floating-element", d(this))
                    .clone()
                    .addClass(
                      "thumb-info-floating-element-clone p-fixed p-events-none"
                    )
                    .attr("style", "transform: scale(0.1);")
                    .removeClass("d-none")
                    .appendTo("body"),
                  d(".thumb-info-floating-element-clone")
                    .css({ left: e + i, top: t + i })
                    .fadeIn(300),
                  gsap.to(".thumb-info-floating-element-clone", 0.5, {
                    css: { scaleX: 1, scaleY: 1 },
                  }),
                  d(document)
                    .off("mousemove")
                    .on("mousemove", ({ clientX: e, clientY: t }) => {
                      gsap.to(".thumb-info-floating-element-clone", 0.5, {
                        css: { left: e + i, top: t + i },
                      });
                    });
              })
              .on("mouseout", () => {
                gsap.to(".thumb-info-floating-element-clone", 0.5, {
                  css: { scaleX: 0.5, scaleY: 0.5, opacity: 0 },
                });
              })
          : o.fn.showErrorMessage(
              "Failed to Load File",
              "Failed to load: GSAP - Include the following file(s): (vendor/gsap/gsap.min.js)"
            )),
      d(window).on("load", () => {
        d(".thumb-info-wrapper-direction-aware").each(function () {
          d(this).hoverdir({
            speed: 300,
            easing: "ease",
            hoverDelay: 0,
            inverse: !1,
            hoverElem: ".thumb-info-wrapper-overlay",
          });
        });
      }),
      d(".thumb-info-container-full-img").each(function () {
        let t = d(this);
        d("[data-full-width-img-src]", t).each(function () {
          var e = "img" + Math.floor(1e4 * Math.random());
          d(this).attr("data-rel", e),
            t.append(
              '<div style="background-image: url(' +
                d(this).attr("data-full-width-img-src") +
                ');" id="' +
                e +
                '" class="thumb-info-container-full-img-large opacity-0"></div>'
            );
        }),
          d(".thumb-info", t).on("mouseenter", function (e) {
            d(".thumb-info-container-full-img-large").removeClass("active"),
              d("#" + d(this).attr("data-rel")).addClass("active");
          });
      }),
      d("[data-toggle-text-click]").on("click", function () {
        d(this).text(function (e, t) {
          return t === d(this).attr("data-toggle-text-click")
            ? d(this).attr("data-toggle-text-click-alt")
            : d(this).attr("data-toggle-text-click");
        });
      }),
      d("[data-toggle-class]").on("click", function (e) {
        e.preventDefault(), d(this).toggleClass(d(this).data("toggle-class"));
      }),
      d(".shape-divider").length &&
        (t(),
        d(window).on("resize", () => {
          t();
        })),
      d(".shape-divider-horizontal-animation").length &&
        o.fn.intObs(
          ".shape-divider-horizontal-animation",
          function () {
            for (let e = 0; e <= 1; e++) {
              var t = d(this).find("svg:nth-child(1)").clone();
              d(this).append(t);
            }
            d(this).addClass("start");
          },
          {}
        ),
      d("[data-content-switcher]").on("change", function (e, t) {
        var i = d(this).is(":checked") ? "1" : "2",
          a = d(this).attr("data-content-switcher-content-id"),
          a =
            (d("[data-content-switcher-id=" + a + "]")
              .addClass("initialized")
              .removeClass("active"),
            d(
              "[data-content-switcher-id=" +
                a +
                "][data-content-switcher-rel=" +
                i +
                "]"
            ));
        a.addClass("active"), a.parent().css("height", a.height());
      }),
      d("[data-content-switcher]").trigger("change");
    var a,
      s = d(window);
    if (
      (s.on("resize dynamic.height.resize", () => {
        d("[data-dynamic-height]").each(function () {
          var e = d(this),
            t = JSON.parse(
              e.data("dynamic-height").replace(/'/g, '"').replace(";", "")
            );
          s.width() < 576 && e.height(t[4]),
            575 < s.width() && s.width() < 768 && e.height(t[3]),
            767 < s.width() && s.width() < 992 && e.height(t[2]),
            991 < s.width() && s.width() < 1200 && e.height(t[1]),
            1199 < s.width() && e.height(t[0]);
        });
      }),
      s.width() < 992 && s.trigger("dynamic.height.resize"),
      d("[data-trigger-play-video]").length &&
        o.fn.execOnceTroughEvent(
          "[data-trigger-play-video]",
          "mouseover.trigger.play.video",
          function () {
            let t = d(d(this).data("trigger-play-video"));
            d(this).on("click", function (e) {
              e.preventDefault(),
                "yes" == d(this).data("trigger-play-video-remove")
                  ? d(this).animate({ opacity: 0 }, 300, function () {
                      t[0].play(), d(this).remove();
                    })
                  : setTimeout(() => {
                      t[0].play();
                    }, 300);
            });
          }
        ),
      d("video[data-auto-play]").length &&
        d(window).on("load", () => {
          d("video[data-auto-play]").each(function () {
            let e = d(this);
            setTimeout(() => {
              d("#" + e.attr("id")).length &&
                ("yes" ==
                d('[data-trigger-play-video="#' + e.attr("id") + '"]').data(
                  "trigger-play-video-remove"
                )
                  ? d(
                      '[data-trigger-play-video="#' + e.attr("id") + '"]'
                    ).animate({ opacity: 0 }, 300, () => {
                      e[0].play(),
                        d(
                          '[data-trigger-play-video="#' + e.attr("id") + '"]'
                        ).remove();
                    })
                  : setTimeout(() => {
                      e[0].play();
                    }, 300));
            }, 100);
          });
        }),
      d("[data-remove-min-height]").length &&
        d(window).on("load", () => {
          d("[data-remove-min-height]").each(function () {
            d(this).css({ "min-height": 0 });
          });
        }),
      document.addEventListener("lazybeforeunveil", ({ target: e }) => {
        var t = e.getAttribute("data-bg-src");
        t && (e.style.backgroundImage = "url(" + t + ")");
      }),
      d("[data-title-border]").length)
    ) {
      let e = d('<span class="page-header-title-border"></span>'),
        t = d("[data-title-border]"),
        i = d(window),
        a =
          (t.before(e),
          () => {
            e.width(t.width());
          });
      i.afterResize(() => {
        a();
      }),
        a(),
        e.addClass("visible");
    }
    if (
      ((a = jQuery),
      (i = {
        $wrapper: a(".footer-reveal"),
        init() {
          this.build(), this.events();
        },
        build() {
          var e = this.$wrapper.outerHeight(!0);
          a(window).height() - a(".header-body").height() < e
            ? (a("#footer").removeClass("footer-reveal"),
              a("body").css("margin-bottom", 0))
            : (a("#footer").addClass("footer-reveal"),
              a("body").css("margin-bottom", e));
        },
        events() {
          let e = this,
            t = a(window);
          t.on("load", () => {
            t.afterResize(() => {
              e.build();
            });
          });
        },
      }),
      a(".footer-reveal").length && i.init(),
      d("[data-reinit-plugin]").length &&
        d("[data-reinit-plugin]").on("click", function (e) {
          e.preventDefault();
          let t = d(this).data("reinit-plugin"),
            i = d(this).data("reinit-plugin-function"),
            a = d(this).data("reinit-plugin-element"),
            s = o.fn.getOptions(d(this).data("reinit-plugin-options"));
          d(a).data(t).destroy(),
            setTimeout(() => {
              o.fn.execPluginFunction(i, d(a), s);
            }, 1e3);
        }),
      d("[data-copy-to-clipboard]").length &&
        o.fn.intObs(
          "[data-copy-to-clipboard]",
          function () {
            let a = d(this);
            a.wrap(
              '<div class="copy-to-clipboard-wrapper position-relative"></div>'
            );
            var e = d(
              '<a href="#" class="btn btn-primary btn-px-2 py-1 text-0 position-absolute top-8 right-8">COPY</a>'
            );
            a.parent().prepend(e),
              e.on("click", function (e) {
                e.preventDefault();
                let t = d(this),
                  i = d(
                    '<textarea class="d-block opacity-0" style="height: 0;">'
                  );
                t.parent().append(i),
                  i.val(a.text()),
                  i[0].select(),
                  i[0].setSelectionRange(0, 99999),
                  document.execCommand("copy"),
                  t.addClass("copied"),
                  setTimeout(() => {
                    t.removeClass("copied");
                  }, 1e3),
                  i.remove();
              });
          },
          { rootMargin: "0px 0px 0px 0px" }
        ),
      d(".marquee").length &&
        d.isFunction(d.fn.marquee) &&
        d(".marquee").marquee({
          duration: 5e3,
          gap: 0,
          delayBeforeStart: 0,
          direction: "left",
          duplicated: !0,
        }),
      d(".style-switcher-open-loader").length)
    ) {
      i = new URLSearchParams(window.location.search);
      let s = !1,
        e =
          (d(".style-switcher-open-loader").on("click", function (e) {
            e.preventDefault();
            d(this).addClass("style-switcher-open-loader-loading");
            var e = d(this).data("base-path"),
              t = d(this).data("skin-src"),
              i = document.createElement("script"),
              a =
                ((i.src =
                  e + "master/style-switcher/style.switcher.localstorage.js"),
                document.createElement("script"));
            (a.src = e + "master/style-switcher/style.switcher.js"),
              (a.id = "styleSwitcherScript"),
              a.setAttribute("data-base-path", e),
              a.setAttribute("data-skin-src", t),
              (a.onload = () => {
                setTimeout(() => {
                  !(function e() {
                    d(".style-switcher-open").length
                      ? (d(".style-switcher-open").trigger("click"),
                        s &&
                          setTimeout(() => {
                            d(".style-switcher-open").trigger("click");
                          }, 2e3))
                      : window.setTimeout(e, 100);
                  })();
                }, 500);
              }),
              document.body.appendChild(i),
              document.body.appendChild(a);
          }),
          d("html").data("style-switcher-options")),
        t = !1;
      e &&
        ((e = e.replace(/'/g, '"')),
        JSON.parse(e).showSwitcher && (t = !0),
        JSON.parse(e).hideStyleSwitcherAfterShow) &&
        (s = !0),
        i.has("showStyleSwitcher") && (t = !0),
        i.has("hideStyleSwitcherAfterShow") && (s = !0),
        t && d(".style-switcher-open-loader").trigger("click");
    }
  }).apply(this, [window.theme, jQuery]);
try {
  window.location !== window.parent.location &&
    $(window).on("load", () => {
      ($el = $("<a />")
        .addClass("remove-envato-frame")
        .attr({ href: window.location.href, target: "_parent" })
        .text("Remove Frame")),
        $("body").append($el);
    });
} catch (e) {
  console.log(e);
}
((s = {}, o) => {
  let i = "__animate";
  class a {
    constructor(e, t) {
      return this.initialize(e, t);
    }
    initialize(e, t) {
      return (
        e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
        this
      );
    }
    setData() {
      return this.$el.data(i, this), this;
    }
    setOptions(e) {
      return (
        (this.options = o.extend(!0, {}, a.defaults, e, { wrapper: this.$el })),
        this
      );
    }
    build() {
      let e = this;
      var t;
      return (
        e.options.flagClassOnly
          ? ((t = e.options.wrapper.attr("data-appear-animation-delay")
              ? e.options.wrapper.attr("data-appear-animation-delay")
              : e.options.delay),
            e.options.wrapper.css({
              "animation-delay": t + "ms",
              "transition-delay": t + "ms",
            }),
            e.options.wrapper.addClass(
              e.options.wrapper.attr("data-appear-animation")
            ))
          : o("body").hasClass("loading-overlay-showing")
          ? o(window).on("loading.overlay.ready", () => {
              e.animate();
            })
          : e.animate(),
        this
      );
    }
    animate() {
      let e = this,
        t = this.options.wrapper;
      this.options.duration;
      var i = t.offset().top,
        a = o(window).scrollTop();
      return (
        t.data("appear-animation-svg")
          ? t.find("[data-appear-animation]").each(function () {
              var e = o(this);
              let t;
              var i = s.fn.getOptions(e.data("plugin-options"));
              i && (t = i), e.themePluginAnimate(t);
            })
          : e.options.firstLoadNoAnim
          ? (t.removeClass("appear-animation"),
            t.closest(".owl-carousel").get(0) &&
              setTimeout(() => {
                t.closest(".owl-carousel").on("change.owl.carousel", () => {
                  (e.options.firstLoadNoAnim = !1),
                    t.removeData("__animate"),
                    t.themePluginAnimate(e.options);
                });
              }, 500))
          : (t.addClass("appear-animation animated"),
            (!o("html").hasClass("no-csstransitions") &&
              o(window).width() > e.options.minWindowWidth &&
              a <= i) ||
            1 == e.options.forceAnimation
              ? ((a = t.attr("data-appear-animation-delay")
                  ? t.attr("data-appear-animation-delay")
                  : e.options.delay),
                "750ms" !=
                  (i = t.attr("data-appear-animation-duration")
                    ? t.attr("data-appear-animation-duration")
                    : e.options.duration) && t.css("animation-duration", i),
                t.css("animation-delay", a + "ms"),
                t.addClass(
                  t.attr("data-appear-animation") + " appear-animation-visible"
                ),
                t.trigger("animation:show"))
              : t.addClass("appear-animation-visible")),
        this
      );
    }
  }
  (a.defaults = {
    accX: 0,
    accY: -80,
    delay: 100,
    duration: "750ms",
    minWindowWidth: 0,
    forceAnimation: !1,
    flagClassOnly: !1,
  }),
    o.extend(s, { PluginAnimate: a }),
    (o.fn.themePluginAnimate = function (t) {
      return this.map(function () {
        var e = o(this);
        return e.data(i) ? e.data(i) : new a(e, t);
      });
    });
}).apply(this, [window.theme, jQuery]),
  ((t = {}, a) => {
    let i = "__animatedContent";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) ||
            ((this.$el = e),
            (this.initialText = e.text()),
            this.setData().setOptions(t).build().events()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = a.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let s = this;
        if (!(a(window).width() < s.options.minWindowWidth))
          if (s.options.firstLoadNoAnim)
            s.$el.css({ visibility: "visible" }),
              s.$el.closest(".owl-carousel").get(0) &&
                setTimeout(() => {
                  s.$el
                    .closest(".owl-carousel")
                    .on("change.owl.carousel", () => {
                      (s.options.firstLoadNoAnim = !1), s.build();
                    });
                }, 500);
          else if ((s.setMinHeight(), "letter" == s.options.contentType)) {
            s.$el.addClass("initialized");
            let a = s.$el.text().split("");
            if ((s.$el.text(""), "typeWriter" == s.options.animationName)) {
              s.$el.append(
                '<span class="letters-wrapper"></span><span class="typeWriter"></pre>'
              );
              let i = 0;
              setTimeout(() => {
                let t = () => {
                  var e = setTimeout(() => {
                    var e = a[i];
                    s.$el
                      .find(".letters-wrapper")
                      .append(
                        '<span class="letter ' +
                          (s.options.letterClass
                            ? s.options.letterClass + " "
                            : "") +
                          '">' +
                          e +
                          "</span>"
                      ),
                      i++,
                      t();
                  }, s.options.animationSpeed);
                  i >= a.length && clearTimeout(e);
                };
                t();
              }, s.options.startDelay);
            } else
              setTimeout(() => {
                for (let e = 0; e < a.length; e++) {
                  var t = a[e];
                  s.$el.append(
                    '<span class="animated-letters-wrapper ' +
                      s.options.wrapperClass +
                      '"><span class="animated-letters-item letter ' +
                      (s.options.letterClass
                        ? s.options.letterClass + " "
                        : "") +
                      s.options.animationName +
                      ' animated" style="animation-delay: ' +
                      e * s.options.animationSpeed +
                      'ms;">' +
                      (" " == t ? "&nbsp;" : t) +
                      "</span></span>"
                  );
                }
              }, s.options.startDelay);
          } else if ("word" == s.options.contentType) {
            var e = s.$el.text().split(" ");
            let i = s.options.startDelay;
            s.$el.empty(),
              a.each(e, (e, t) => {
                s.$el.append(
                  a(
                    '<span class="animated-words-wrapper ' +
                      s.options.wrapperClass +
                      '">'
                  ).html(
                    '<span class="animated-words-item ' +
                      s.options.wordClass +
                      ' appear-animation" data-appear-animation="' +
                      s.options.animationName +
                      '" data-appear-animation-delay="' +
                      i +
                      '">' +
                      t +
                      "&nbsp;</span>"
                  )
                ),
                  (i += s.options.animationSpeed);
              }),
              a.isFunction(a.fn.themePluginAnimate) &&
                a(".animated-words-item[data-appear-animation]").length &&
                t.fn.dynIntObsInit(
                  ".animated-words-item[data-appear-animation]",
                  "themePluginAnimate",
                  t.PluginAnimate.defaults
                ),
              s.$el.addClass("initialized");
          }
        return this;
      }
      setMinHeight() {
        var e = this;
        return (
          e.$el.closest(".owl-carousel").get(0)
            ? (e.$el.closest(".owl-carousel").addClass("d-block"),
              e.$el.css("min-height", e.$el.height()),
              e.$el.closest(".owl-carousel").removeClass("d-block"))
            : e.$el.css("min-height", e.$el.height()),
          this
        );
      }
      destroy() {
        return this.$el.html(this.initialText).css("min-height", ""), this;
      }
      events() {
        let e = this;
        return (
          e.$el.on("animated.letters.destroy", () => {
            e.destroy();
          }),
          e.$el.on("animated.letters.initialize", () => {
            e.build();
          }),
          this
        );
      }
    }
    (s.defaults = {
      contentType: "letter",
      animationName: "fadeIn",
      animationSpeed: 50,
      startDelay: 500,
      minWindowWidth: 768,
      letterClass: "",
      wordClass: "",
      wrapperClass: "",
    }),
      a.extend(t, { PluginAnimatedContent: s }),
      (a.fn.themePluginAnimatedContent = function (t) {
        return this.map(function () {
          var e = a(this);
          return e.data(i) ? e.data(i) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__beforeafter";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (this.$el = e), this.setData().setOptions(t).build(), this;
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (i.isFunction(i.fn.twentytwenty)) {
          let e = this;
          e.options.wrapper.waitForImages(() => {
            e.options.wrapper.twentytwenty(e.options);
          });
        } else
          e.fn.showErrorMessage(
            "Failed to Load File",
            "Failed to load: twentytwenty - Include the following file(s): (vendor/twentytwenty/css/twentytwenty.css, vendor/twentytwenty/js/jquery.event.move.js, vendor/twentytwenty/js/jquery.twentytwenty.js)"
          );
        return this;
      }
    }
    (s.defaults = {
      forceInit: !0,
      default_offset_pct: 0.5,
      orientation: "horizontal",
      before_label: "Before",
      after_label: "After",
      no_overlay: !1,
      move_slider_on_hover: !1,
      move_with_handle_only: !0,
      click_to_move: !1,
    }),
      i.extend(e, { PluginBeforeAfter: s }),
      (i.fn.themePluginBeforeAfter = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((a = {}, s) => {
    let i = "__carouselLight";
    class o {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) ||
            ((this.$el = e),
            (this.clickFlag = !0),
            this.setData()
              .setOptions(t)
              .build()
              .owlNav()
              .owlDots()
              .autoPlay()
              .events()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = s.extend(!0, {}, o.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        return (
          this.$el
            .css("opacity", 1)
            .find(".owl-item:first-child")
            .addClass("active"),
          this.$el.trigger("initialized.owl.carousel"),
          this.carouselNavigate(),
          this
        );
      }
      changeSlide(e) {
        let t = this,
          i = t.$el.find(".owl-item.active");
        t.$el.find(".owl-item.active").addClass("removing"),
          i.removeClass("fadeIn").addClass("fadeOut animated"),
          setTimeout(() => {
            setTimeout(() => {
              i.removeClass("active");
            }, 400),
              e
                .addClass("active")
                .removeClass("fadeOut")
                .addClass("fadeIn animated");
          }, 200),
          t.$el
            .find(".owl-dot")
            .removeClass("active")
            .eq(e.index())
            .addClass("active"),
          t.$el.trigger({
            type: "change.owl.carousel",
            nextSlideIndex: e.index(),
            prevSlideIndex: i.index(),
          }),
          setTimeout(() => {
            t.$el.trigger({
              type: "changed.owl.carousel",
              nextSlideIndex: e.index(),
              prevSlideIndex: i.index(),
            });
          }, 500);
      }
      owlNav() {
        let t = this,
          e = t.$el.find(".owl-next"),
          i = t.$el.find(".owl-prev");
        return (
          i.on("click", (e) => {
            if (
              (e.preventDefault(),
              t.options.disableAutoPlayOnClick &&
                window.clearInterval(t.autoPlayInterval),
              t.avoidMultipleClicks())
            )
              return !1;
            t.owlPrev();
          }),
          e.on("click", (e) => {
            if (
              (e.preventDefault(),
              t.options.disableAutoPlayOnClick &&
                window.clearInterval(t.autoPlayInterval),
              t.avoidMultipleClicks())
            )
              return !1;
            t.owlNext();
          }),
          this
        );
      }
      owlDots() {
        let t = this,
          e = t.$el.find(".owl-dot");
        return (
          e.on("click", function (e) {
            return (
              ($this = s(this)),
              e.preventDefault(),
              t.options.disableAutoPlayOnClick &&
                window.clearInterval(t.autoPlayInterval),
              !t.avoidMultipleClicks() &&
                ((e = s(this).index()), !$this.hasClass("active")) &&
                void t.changeSlide(t.$el.find(".owl-item").eq(e))
            );
          }),
          this
        );
      }
      owlPrev() {
        var e = this;
        e.$el.find(".owl-item.active").prev().get(0)
          ? e.changeSlide(e.$el.find(".owl-item.active").prev())
          : e.changeSlide(e.$el.find(".owl-item:last-child"));
      }
      owlNext() {
        var e = this;
        e.$el.find(".owl-item.active").next().get(0)
          ? e.changeSlide(e.$el.find(".owl-item.active").next())
          : e.changeSlide(e.$el.find(".owl-item").eq(0));
      }
      avoidMultipleClicks() {
        let e = this;
        return (
          !e.clickFlag ||
          (e.clickFlag &&
            ((e.clickFlag = !1),
            setTimeout(() => {
              e.clickFlag = !0;
            }, 1e3)),
          !1)
        );
      }
      autoPlay() {
        let e = this;
        this.options.wrapper;
        return (
          e.options.autoplay &&
            (e.autoPlayInterval = window.setInterval(() => {
              e.owlNext();
            }, e.options.autoplayTimeout)),
          this
        );
      }
      carouselNavigate() {
        let a = this,
          t = this.options.wrapper;
        t;
        return (
          s("[data-carousel-navigate]").get(0) &&
            (s('[data-carousel-navigate-id="#' + t.attr("id") + '"]').each(
              function () {
                let e = s(this),
                  t = s(e.data("carousel-navigate-id")).get(0),
                  i = e.data("carousel-navigate-to");
                t &&
                  e.on("click", () => {
                    a.options.disableAutoPlayOnClick &&
                      window.clearInterval(a.autoPlayInterval),
                      a.changeSlide(
                        a.$el.find(".owl-item").eq(parseInt(i) - 1)
                      );
                  });
              }
            ),
            t.on("change.owl.carousel", (e) => {
              s(
                '[data-carousel-navigate-id="#' + t.attr("id") + '"]'
              ).removeClass("active");
            }),
            t.on("changed.owl.carousel", ({ nextSlideIndex: e }) => {
              s(
                '[data-carousel-navigate-id="#' +
                  t.attr("id") +
                  '"][data-carousel-navigate-to="' +
                  (e + 1) +
                  '"]'
              ).addClass("active");
            })),
          this
        );
      }
      events() {
        let n = this;
        n.$el.on("change.owl.carousel", (e) => {
          n.$el
            .find(
              "[data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]"
            )
            .addClass("invisible"),
            n.$el
              .find("[data-plugin-animated-letters]")
              .trigger("animated.letters.destroy"),
            n.$el
              .find(".owl-item:not(.active) [data-carousel-onchange-show]")
              .removeClass("d-none");
        }),
          n.$el.on("changed.owl.carousel", (e) => {
            setTimeout(() => {
              n.$el.find(".owl-item.cloned [data-appear-animation]").get(0) &&
                n.$el
                  .find(".owl-item.cloned [data-appear-animation]")
                  .each(function () {
                    var e = s(this);
                    let t;
                    var i = a.fn.getOptions(e.data("plugin-options"));
                    i && (t = i), e.themePluginAnimate(t);
                  }),
                n.$el
                  .find(
                    ".owl-item.active [data-appear-animation]:not(.background-image-wrapper), [data-plugin-animated-letters]"
                  )
                  .removeClass("invisible"),
                n.$el
                  .find(".owl-item.active [data-plugin-animated-letters]")
                  .trigger("animated.letters.initialize"),
                n.$el
                  .find(
                    ".owl-item.cloned.active [data-plugin-video-background]"
                  )
                  .trigger("video.background.initialize");
            }, 500);
          }),
          n.options.swipeEvents &&
            n.$el.swipe({
              swipe(e, t, i, a, s, o) {
                switch (t) {
                  case "right":
                    n.owlPrev();
                    break;
                  case "left":
                    n.owlNext();
                }
              },
              allowPageScroll: "vertical",
            });
      }
    }
    (o.defaults = {
      autoplay: !0,
      autoplayTimeout: 7e3,
      disableAutoPlayOnClick: !0,
      swipeEvents: !0,
    }),
      s.extend(a, { PluginCarouselLight: o }),
      (s.fn.themePluginCarouselLight = function (t) {
        return this.map(function () {
          var e = s(this);
          return e.data(i) ? e.data(i) : new o(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((s = {}, o) => {
    let a = "__carousel";
    class i {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(t, i) {
        if (!t.data(a))
          if ((this.$el = t).find("[data-icon]").get(0)) {
            let e = this;
            o(window).on("icon.rendered", function () {
              if (t.data(a)) return this;
              setTimeout(() => {
                e.setData().setOptions(i).build();
              }, 1e3);
            });
          } else this.setData().setOptions(i).build();
        return this;
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = o.extend(!0, {}, i.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (o.isFunction(o.fn.owlCarousel)) {
          let e = this,
            a = this.options.wrapper;
          if (
            (a.addClass("owl-theme"),
            a.addClass("owl-loading"),
            "rtl" == o("html").attr("dir") &&
              (this.options = o.extend(!0, {}, this.options, { rtl: !0 })),
            1 == this.options.items && (this.options.responsive = {}),
            4 < this.options.items &&
              (this.options = o.extend(!0, {}, this.options, {
                responsive: { 1199: { items: this.options.items } },
              })),
            this.options.autoHeight)
          ) {
            let e = [];
            a.find(".owl-item").each(function () {
              o(this).hasClass("active") && e.push(o(this).height());
            }),
              o(window).afterResize(() => {
                a.find(".owl-stage-outer").height(Math.max.apply(null, e));
              }),
              o(window).on("load", () => {
                a.find(".owl-stage-outer").height(Math.max.apply(null, e));
              });
          }
          var t, i;
          a
            .owlCarousel(this.options)
            .addClass("owl-carousel-init animated fadeIn"),
            setTimeout(() => {
              a.removeClass("animated fadeIn");
            }, 1e3),
            a.closest(".owl-carousel-wrapper").get(0) &&
              setTimeout(() => {
                a.closest(".owl-carousel-wrapper").css({ height: "" });
              }, 500),
            a.prev().hasClass("owl-carousel-loader") && a.prev().remove(),
            e.navigationOffsets(),
            a.hasClass("nav-outside") &&
              (o(window).on("owl.carousel.nav.outside", () => {
                o(window).width() < 992
                  ? ((e.options.stagePadding = 40), a.addClass("stage-margin"))
                  : ((e.options.stagePadding = 0),
                    a.removeClass("stage-margin")),
                  a.owlCarousel("destroy").owlCarousel(e.options),
                  e.navigationOffsets();
              }),
              o(window).on("load", () => {
                o(window).afterResize(() => {
                  o(window).trigger("owl.carousel.nav.outside");
                });
              }),
              o(window).trigger("owl.carousel.nav.outside")),
            a.hasClass("nav-svg-arrows-1") &&
              a
                .find(".owl-next, .owl-prev")
                .append(
                  '<svg version="1.1" viewBox="0 0 15.698 8.706" width="17" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon stroke="#212121" stroke-width="0.1" fill="#212121" points="11.354,0 10.646,0.706 13.786,3.853 0,3.853 0,4.853 13.786,4.853 10.646,8 11.354,8.706 15.698,4.353 "/></svg>'
                ),
            a.attr("data-sync") &&
              a.on(
                "change.owl.carousel",
                ({ namespace: e, property: t, relatedTarget: i }) => {
                  e &&
                    "position" === t.name &&
                    ((e = i.relative(t.value, !0)),
                    o(a.data("sync")).owlCarousel("to", e, 300, !0));
                }
              ),
            a.hasClass("carousel-center-active-item") &&
              ((t = a.find(".owl-item.active")),
              (i = Math.floor((a.find(".owl-item.active").length - 1) / 2)),
              t.eq(i).addClass("current"),
              a.on("change.owl.carousel", (e) => {
                a.find(".owl-item").removeClass("current"),
                  setTimeout(() => {
                    var e = a.find(".owl-item.active"),
                      t = Math.floor(
                        (a.find(".owl-item.active").length - 1) / 2
                      );
                    e.eq(t).addClass("current");
                  }, 100);
              }),
              a.trigger("refresh.owl.carousel")),
            (e.options.animateIn || e.options.animateOut) &&
              (a.on("change.owl.carousel", (e) => {
                a
                  .find(
                    "[data-appear-animation], [data-plugin-animated-letters]"
                  )
                  .addClass("d-none"),
                  a
                    .find("[data-plugin-animated-letters]")
                    .trigger("animated.letters.destroy"),
                  a
                    .find(
                      ".owl-item:not(.active) [data-carousel-onchange-show]"
                    )
                    .removeClass("d-none");
              }),
              a.on("changed.owl.carousel", (e) => {
                setTimeout(() => {
                  a.find("[data-appear-animation]").each(function () {
                    var e = o(this);
                    let t;
                    var i = s.fn.getOptions(e.data("plugin-options"));
                    i && (t = i), e.themePluginAnimate(t);
                  }),
                    a
                      .find(
                        ".owl-item.active [data-appear-animation], [data-plugin-animated-letters]"
                      )
                      .removeClass("d-none"),
                    a
                      .find(".owl-item.active [data-plugin-animated-letters]")
                      .trigger("animated.letters.initialize"),
                    a
                      .find(
                        ".owl-item.cloned.active [data-plugin-video-background]"
                      )
                      .trigger("video.background.initialize");
                }, 10);
              })),
            a.find("[data-icon]").length &&
              a.on("change.owl.carousel drag.owl.carousel", () => {
                a.find(".owl-item.cloned [data-icon]").each(function () {
                  var e = o(this);
                  let t;
                  var i = s.fn.getOptions(e.data("plugin-options"));
                  i && (t = i), e.themePluginIcon(t);
                });
              }),
            a.find("[data-plugin-video-background]").get(0) &&
              o(window).resize(),
            a.removeClass("owl-loading"),
            a.css("height", "auto"),
            e.carouselNavigate(),
            e.options.refresh && a.owlCarousel("refresh");
        }
        return this;
      }
      navigationOffsets() {
        var e = this,
          t = this.options.wrapper,
          i = "none" != t.find(".owl-nav").css("transform"),
          a = "none" != t.find(".owl-dots").css("transform");
        return (
          e.options.navHorizontalOffset &&
            !e.options.navVerticalOffset &&
            (i
              ? t.find(".owl-nav").css({ left: e.options.navHorizontalOffset })
              : t.find(".owl-nav").css({
                  transform:
                    "translate3d(" + e.options.navHorizontalOffset + ", 0, 0)",
                })),
          e.options.navVerticalOffset &&
            !e.options.navHorizontalOffset &&
            (i
              ? t.find(".owl-nav").css({
                  top: "calc( 50% - " + e.options.navVerticalOffset + " )",
                })
              : t.find(".owl-nav").css({
                  transform:
                    "translate3d(0, " + e.options.navVerticalOffset + ", 0)",
                })),
          e.options.navVerticalOffset &&
            e.options.navHorizontalOffset &&
            (i
              ? t.find(".owl-nav").css({
                  top: "calc( 50% - " + e.options.navVerticalOffset + " )",
                  left: e.options.navHorizontalOffset,
                })
              : t.find(".owl-nav").css({
                  transform:
                    "translate3d(" +
                    e.options.navHorizontalOffset +
                    ", " +
                    e.options.navVerticalOffset +
                    ", 0)",
                })),
          e.options.dotsHorizontalOffset &&
            !e.options.dotsVerticalOffset &&
            t.find(".owl-dots").css({
              transform:
                "translate3d(" + e.options.dotsHorizontalOffset + ", 0, 0)",
            }),
          e.options.dotsVerticalOffset &&
            !e.options.dotsHorizontalOffset &&
            (a
              ? t.find(".owl-dots").css({
                  top: "calc( 50% - " + e.options.dotsVerticalOffset + " )",
                })
              : t.find(".owl-dots").css({
                  transform:
                    "translate3d(0, " + e.options.dotsVerticalOffset + ", 0)",
                })),
          e.options.dotsVerticalOffset &&
            e.options.dotsHorizontalOffset &&
            t.find(".owl-dots").css({
              transform:
                "translate3d(" +
                e.options.dotsHorizontalOffset +
                ", " +
                e.options.dotsVerticalOffset +
                ", 0)",
            }),
          this
        );
      }
      carouselNavigate() {
        let t = this.options.wrapper,
          a = t.data("owl.carousel");
        return (
          o("[data-carousel-navigate]").get(0) &&
            (o('[data-carousel-navigate-id="#' + t.attr("id") + '"]').each(
              function () {
                let e = o(this),
                  t = o(e.data("carousel-navigate-id")).get(0),
                  i = e.data("carousel-navigate-to");
                t &&
                  e.on("click", () => {
                    a.to(parseInt(i) - 1);
                  });
              }
            ),
            t.on("change.owl.carousel", () => {
              o(
                '[data-carousel-navigate-id="#' + t.attr("id") + '"]'
              ).removeClass("active");
            }),
            t.on("changed.owl.carousel", ({ item: e }) => {
              o(
                '[data-carousel-navigate-id="#' +
                  t.attr("id") +
                  '"][data-carousel-navigate-to="' +
                  (e.index + 1) +
                  '"]'
              ).addClass("active");
            })),
          this
        );
      }
    }
    (i.defaults = {
      loop: !0,
      responsive: {
        0: { items: 1 },
        479: { items: 1 },
        768: { items: 2 },
        979: { items: 3 },
        1199: { items: 4 },
      },
      navText: [],
      refresh: !1,
    }),
      o.extend(s, { PluginCarousel: i }),
      (o.fn.themePluginCarousel = function (t) {
        return this.map(function () {
          var e = o(this);
          return e.data(a) ? e.data(a) : new i(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__chartCircular";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (i.isFunction(i.fn.easyPieChart)) {
          let e = this.options.wrapper,
            t = e.attr("data-percent") ? e.attr("data-percent") : 0,
            a = e.find(".percent");
          i.extend(!0, this.options, {
            onStep(e, t, i) {
              a.html(parseInt(i));
            },
          }),
            e.attr("data-percent", 0),
            e.easyPieChart(this.options),
            setTimeout(() => {
              e.data("easyPieChart").update(t), e.attr("data-percent", t);
            }, this.options.delay);
        }
        return this;
      }
    }
    (s.defaults = {
      accX: 0,
      accY: -150,
      delay: 1,
      barColor: "#0088CC",
      trackColor: "#f2f2f2",
      scaleColor: !1,
      scaleLength: 5,
      lineCap: "round",
      lineWidth: 13,
      size: 175,
      rotate: 0,
      animate: { duration: 2500, enabled: !0 },
    }),
      i.extend(e, { PluginChartCircular: s }),
      (i.fn.themePluginChartCircular = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, s) => {
    let i = "__countdown";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = s.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (s.isFunction(s.fn.countTo)) {
          let t = this,
            e = this.options.wrapper,
            i = t.options.numberClass ? " " + t.options.numberClass : "",
            a = t.options.wrapperClass ? " " + t.options.wrapperClass : "";
          t.options.uppercase
            ? e.countdown(t.options.date).on("update.countdown", function (e) {
                s(this).html(
                  e.strftime(
                    t.options.insertHTMLbefore +
                      '<span class="days' +
                      a +
                      '"><span class="' +
                      i +
                      '">%D</span> ' +
                      t.options.textDay +
                      '</span> <span class="hours' +
                      a +
                      '"><span class="' +
                      i +
                      '">%H</span> ' +
                      t.options.textHour +
                      '</span> <span class="minutes' +
                      a +
                      '"><span class="' +
                      i +
                      '">%M</span> ' +
                      t.options.textMin +
                      '</span> <span class="seconds' +
                      a +
                      '"><span class="' +
                      i +
                      '">%S</span> ' +
                      t.options.textSec +
                      "</span> " +
                      t.options.insertHTMLafter
                  )
                );
              })
            : e.countdown(t.options.date).on("update.countdown", function (e) {
                s(this).html(
                  e.strftime(
                    t.options.insertHTMLbefore +
                      '<span class="days' +
                      a +
                      '"><span class="' +
                      i +
                      '">%D</span> ' +
                      t.options.textDay +
                      '</span> <span class="hours' +
                      a +
                      '"><span class="' +
                      i +
                      '">%H</span> ' +
                      t.options.textHour +
                      '</span> <span class="minutes' +
                      a +
                      '"><span class="' +
                      i +
                      '">%M</span> ' +
                      t.options.textMin +
                      '</span> <span class="seconds' +
                      a +
                      '"><span class="' +
                      i +
                      '">%S</span> ' +
                      t.options.textSec +
                      "</span> " +
                      t.options.insertHTMLafter
                  )
                );
              });
        }
        return this;
      }
    }
    (a.defaults = {
      date: "2030/06/10 12:00:00",
      textDay: "DAYS",
      textHour: "HRS",
      textMin: "MIN",
      textSec: "SEC",
      uppercase: !0,
      numberClass: "",
      wrapperClass: "",
      insertHTMLbefore: "",
      insertHTMLafter: "",
    }),
      s.extend(e, { PluginCountdown: a }),
      (s.fn.themePluginCountdown = function (t) {
        return this.map(function () {
          var e = s(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, a) => {
    let i = "__counter";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = a.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (a.isFunction(a.fn.countTo)) {
          let t = this,
            i = this.options.wrapper;
          t.options.comma &&
            (t.options.formatter = (e, { decimals: t }) =>
              e.toFixed(t).toString().replace(".", ",")),
            a.extend(t.options, {
              onComplete() {
                var e;
                i.data("append") &&
                  (t.options.appendWrapper
                    ? ((e = a(t.options.appendWrapper)).append(
                        i.data("append")
                      ),
                      i.html(i.html() + e[0].outerHTML))
                    : i.html(i.html() + i.data("append"))),
                  i.data("prepend") &&
                    (t.options.prependWrapper
                      ? ((e = a(t.options.prependWrapper)).append(
                          i.data("prepend")
                        ),
                        i.html(i.html() + e[0].outerHTML))
                      : i.html(i.data("prepend") + i.html()));
              },
            }),
            i.countTo(t.options);
        }
        return this;
      }
    }
    (s.defaults = {
      accX: 0,
      accY: 0,
      appendWrapper: !1,
      prependWrapper: !1,
      speed: 3e3,
      refreshInterval: 100,
      decimals: 0,
      comma: !1,
      onUpdate: null,
      onComplete: null,
    }),
      a.extend(e, { PluginCounter: s }),
      (a.fn.themePluginCounter = function (t) {
        return this.map(function () {
          var e = a(this);
          return e.data(i) ? e.data(i) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, n) => {
    let i = "__cursorEffect";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) ||
            ((this.$el = e), this.setData().setOptions(t).build().events()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = n.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this,
          t =
            ((e.clientX = -100),
            (e.clientY = -100),
            e.options.hideMouseCursor && e.$el.addClass("hide-mouse-cursor"),
            document.createElement("DIV")),
          i = ((t.className = "cursor-outer"), document.createElement("DIV"));
        if (
          ((i.className = "cursor-inner"),
          e.options.cursorOuterColor &&
            (t.style = "border-color: " + e.options.cursorOuterColor + ";"),
          e.options.cursorInnerColor &&
            (i.style = "background-color: " + e.options.cursorInnerColor + ";"),
          e.options.size)
        )
          switch (e.options.size) {
            case "small":
              e.$el.addClass("cursor-effect-size-small");
              break;
            case "big":
              e.$el.addClass("cursor-effect-size-big");
          }
        e.options.style && e.$el.addClass(e.options.style),
          document.body.prepend(t),
          document.body.prepend(i);
        let a = () => {
          (t.style.transform =
            "translate(" + e.clientX + "px, " + e.clientY + "px)"),
            (i.style.transform =
              "translate(" + e.clientX + "px, " + e.clientY + "px)"),
            (e.loopInside = requestAnimationFrame(a));
        };
        return (e.loop = requestAnimationFrame(a)), this;
      }
      events() {
        let a = this,
          s = n(".cursor-outer"),
          o = n(".cursor-inner"),
          t = s[0].getBoundingClientRect(),
          i = s.css("border-radius");
        return (
          document.addEventListener(
            "mousemove",
            ({ clientX: e, clientY: t }) => {
              a.isStuck || ((a.clientX = e - 20), (a.clientY = t - 20)),
                s.removeClass("opacity-0");
            }
          ),
          (a.isStuck = !1),
          n("[data-cursor-effect-hover]").on("mouseenter", function (e) {
            s.addClass("cursor-outer-hover"), o.addClass("cursor-inner-hover");
            var t = n(this).data("cursor-effect-hover-color");
            switch (
              (s.addClass("cursor-color-" + t),
              o.addClass("cursor-color-" + t),
              n(this).data("cursor-effect-hover"))
            ) {
              case "fit":
                var i = n(this)[0].getBoundingClientRect();
                (a.clientX = i.x),
                  (a.clientY = i.y),
                  s
                    .css({
                      width: i.width,
                      height: i.height,
                      "border-radius": n(this).css("border-radius"),
                    })
                    .addClass("cursor-outer-fit"),
                  o.addClass("opacity-0"),
                  (a.isStuck = !0);
                break;
              case "plus":
                o.addClass("cursor-inner-plus");
            }
          }),
          n("[data-cursor-effect-hover]").on("mouseleave", function () {
            s.removeClass("cursor-outer-hover"),
              o.removeClass("cursor-inner-hover");
            var e = n(this).data("cursor-effect-hover-color");
            switch (
              (s.removeClass("cursor-color-" + e),
              o.removeClass("cursor-color-" + e),
              n(this).data("cursor-effect-hover"))
            ) {
              case "fit":
                s
                  .css({ width: t.width, height: t.height, "border-radius": i })
                  .removeClass("cursor-outer-fit"),
                  o.removeClass("opacity-0"),
                  (a.isStuck = !1);
                break;
              case "plus":
                o.removeClass("cursor-inner-plus");
            }
          }),
          n(window).on("scroll", () => {
            s.hasClass("cursor-outer-fit") &&
              s.addClass("opacity-0").removeClass("cursor-outer-fit");
          }),
          this
        );
      }
      destroy() {
        var e = this;
        e.$el.removeClass(
          "hide-mouse-cursor cursor-effect-size-small cursor-effect-size-big cursor-effect-style-square"
        ),
          cancelAnimationFrame(e.loop),
          cancelAnimationFrame(e.loopInside),
          document.querySelector(".cursor-outer").remove(),
          document.querySelector(".cursor-inner").remove(),
          e.$el.removeData(i, e);
      }
    }
    (a.defaults = {}),
      n.extend(e, { PluginCursorEffect: a }),
      (n.fn.themePluginCursorEffect = function (t) {
        return this.map(function () {
          var e = n(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((s = {}, o) => {
    let i = "__floatElement";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = o.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this;
        var t = this.options.wrapper,
          i = o(window);
        let a;
        return (
          t.data("plugin-float-element-svg")
            ? t.find("[data-plugin-float-element]").each(function () {
                var e = o(this);
                let t;
                var i = s.fn.getOptions(e.data("plugin-options"));
                i && (t = i), e.themePluginFloatElement(t);
              })
            : (e.options.style && t.attr("style", e.options.style),
              i.width() > e.options.minWindowWidth &&
                ((a =
                  "none" == e.options.startPos
                    ? ""
                    : "top" == e.options.startPos
                    ? (t.css({ top: 0 }), "")
                    : (t.css({ bottom: 0 }), "-")),
                e.options.transition &&
                  t.css({
                    transition:
                      "ease-out transform " +
                      e.options.transitionDuration +
                      "ms " +
                      e.options.transitionDelay +
                      "ms",
                  }),
                e.movement(a),
                i.on("scroll", () => {
                  e.movement(a);
                }))),
          this
        );
      }
      movement(e) {
        var t = this.options.wrapper,
          i = o(window),
          a = i.scrollTop(),
          s = t.offset().top,
          s = ((this.options.isInsideSVG ? 2 : 100) * (s - a)) / i.height();
        t.visible(!0) &&
          (this.options.horizontal
            ? t.css({
                transform:
                  "translate3d(" + e + s / this.options.speed + "%, 0, 0)",
              })
            : t.css({
                transform:
                  "translate3d(0, " + e + s / this.options.speed + "%, 0)",
              }));
      }
    }
    (a.defaults = {
      startPos: "top",
      speed: 3,
      horizontal: !1,
      isInsideSVG: !1,
      transition: !1,
      transitionDelay: 0,
      transitionDuration: 500,
      minWindowWidth: 991,
    }),
      o.extend(s, { PluginFloatElement: a }),
      (o.fn.themePluginFloatElement = function (t) {
        return this.map(function () {
          var e = o(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((s = {}, o) => {
    let i = "__gdpr";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          (this.$el = e), this.setData().setOptions(t).build().events(), this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = o.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this;
        if (
          (o.cookie("porto-privacy-bar") ||
            setTimeout(() => {
              e.options.wrapper.addClass("show");
            }, e.options.cookieBarShowDelay),
          o.cookie("porto-gdpr-preferences"))
        ) {
          var t = o.cookie("porto-gdpr-preferences").split(",");
          for (let e = 0; e < t.length; e++)
            o('input[value="' + t[e] + '"]').get(0) &&
              o('input[value="' + t[e] + '"]').is(":checkbox") &&
              o('input[value="' + t[e] + '"]').prop("checked", !0);
        }
        return this;
      }
      events() {
        let a = this;
        return (
          a.options.wrapper.find(".gdpr-agree-trigger").on("click", (e) => {
            e.preventDefault(),
              o(".gdpr-preferences-form")
                .find(".gdpr-input")
                .each(function () {
                  (o(this).is(":checkbox") || o(this).is(":hidden")) &&
                    o(this).prop("checked", !0);
                }),
              o(".gdpr-preferences-form").trigger("submit").removeClass("show"),
              a.removeCookieBar();
          }),
          a.options.wrapper
            .find(".gdpr-preferences-trigger")
            .on("click", (e) => {
              e.preventDefault(), o(".gdpr-preferences-popup").addClass("show");
            }),
          o(".gdpr-close-popup").on("click", (e) => {
            e.preventDefault(),
              o(".gdpr-preferences-popup").removeClass("show");
          }),
          o(".gdpr-preferences-popup").on("click", ({ target: e }) => {
            o(e).closest(".gdpr-preferences-popup-content").get(0) ||
              o(".gdpr-preferences-popup").removeClass("show");
          }),
          o(".gdpr-preferences-form").on("submit", function (e) {
            e.preventDefault();
            let t = o(this),
              i = (t.find('button[type="submit"]').text("SAVING..."), []);
            t.find(".gdpr-input").each(function () {
              ((o(this).is(":checkbox") && o(this).is(":checked")) ||
                o(this).is(":hidden")) &&
                i.push(o(this).val());
            }),
              o.cookie("porto-privacy-bar", !0, { expires: a.options.expires }),
              setTimeout(() => {
                t
                  .find('button[type="submit"]')
                  .text("SAVED!")
                  .removeClass("btn-primary")
                  .addClass("btn-success"),
                  setTimeout(() => {
                    o(".gdpr-preferences-popup").removeClass("show"),
                      a.removeCookieBar(),
                      t
                        .find('button[type="submit"]')
                        .text("SAVE PREFERENCES")
                        .removeClass("btn-success")
                        .addClass("btn-primary"),
                      o.cookie("porto-gdpr-preferences")
                        ? (o.cookie("porto-gdpr-preferences", i, {
                            expires: a.options.expires,
                          }),
                          location.reload())
                        : (o.cookie("porto-gdpr-preferences", i, {
                            expires: a.options.expires,
                          }),
                          o.isFunction(o.fn.themePluginGDPRWrapper) &&
                            o("[data-plugin-gdpr-wrapper]").length &&
                            o(() => {
                              o("[data-plugin-gdpr-wrapper]:not(.manual)").each(
                                function () {
                                  var e = o(this);
                                  let t;
                                  e.removeData("__gdprwrapper");
                                  var i = s.fn.getOptions(
                                    e.data("plugin-options")
                                  );
                                  i && (t = i), e.themePluginGDPRWrapper(t);
                                }
                              );
                            }));
                  }, 500);
              }, 1e3);
          }),
          o(".gdpr-reset-cookies").on("click", (e) => {
            e.preventDefault(), a.clearCookies(), location.reload();
          }),
          o(".gdpr-open-preferences").on("click", (e) => {
            e.preventDefault(),
              o(".gdpr-preferences-popup").toggleClass("show");
          }),
          this
        );
      }
      removeCookieBar() {
        let e = this;
        return (
          e.options.wrapper.addClass("removing").on("transitionend", () => {
            setTimeout(() => {
              e.options.wrapper.removeClass("show removing");
            }, 500);
          }),
          this
        );
      }
      clearCookies() {
        return (
          o.removeCookie("porto-privacy-bar"),
          o.removeCookie("porto-gdpr-preferences"),
          this
        );
      }
    }
    (a.defaults = { cookieBarShowDelay: 3e3, expires: 365 }),
      o.extend(s, { PluginGDPR: a }),
      (o.fn.themePluginGDPR = function (t) {
        return this.map(function () {
          var e = o(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__gdprwrapper";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (this.$el = e), this.setData().setOptions(t).build(), this;
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let t = this;
        return (
          i.cookie("porto-gdpr-preferences") &&
          i.cookie("porto-gdpr-preferences").includes(t.options.checkCookie)
            ? i.ajax({
                url: t.options.ajaxURL,
                cache: !1,
                complete({ responseText: e }) {
                  setTimeout(() => {
                    t.options.wrapper.html(e).addClass("show");
                  }, 1e3);
                },
              })
            : t.options.wrapper.addClass("show"),
          this
        );
      }
    }
    (s.defaults = {}),
      i.extend(e, { PluginGDPRWrapper: s }),
      (i.fn.themePluginGDPRWrapper = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__hoverEffect";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        var e = this;
        return (
          e.$el.hasClass("hover-effect-3d") && (e.options.effect = "3d"),
          "magnetic" == e.options.effect && e.magnetic(),
          "3d" == e.options.effect && e.hover3d(),
          this
        );
      }
      magnetic() {
        let a = this;
        return (
          a.$el.mousemove(function ({ clientX: e, clientY: t }) {
            var i = this.getBoundingClientRect(),
              e = e - i.left - i.width / 2,
              t = t - i.top - i.height / 2;
            this.style.transform =
              "translate(" +
              e * a.options.magneticMx +
              "px, " +
              t * a.options.magneticMx +
              "px)";
          }),
          a.$el.mouseleave(function (e) {
            this.style.transform = "translate3d(0px, 0px, 0px)";
          }),
          this
        );
      }
      hover3d() {
        return (
          i.isFunction(i.fn.hover3d) &&
            this.$el.hover3d({
              selector: this.options.selector,
              sensitivity: this.options.sensitivity,
            }),
          this
        );
      }
    }
    (s.defaults = {
      effect: "magnetic",
      magneticMx: 0.15,
      magneticMy: 0.3,
      magneticDeg: 12,
      selector: ".thumb-info, .hover-effect-3d-wrapper",
      sensitivity: 20,
    }),
      i.extend(e, { PluginHoverEffect: s }),
      (i.fn.themePluginHoverEffect = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, h) => {
    let i = "__icon";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = h.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let n = this,
          r = this.options.wrapper,
          l = n.options.color,
          d = r.offset().top,
          p = h(window).scrollTop(),
          c = n.options.animated && !n.options.strokeBased ? 200 : 100;
        var e;
        if ("file:" !== window.location.protocol)
          return (
            n.options.duration && (c = n.options.duration),
            "svg" == (e = r.attr("src")).split(".").pop()
              ? h.get({
                  url: e,
                  success(e, t, { responseText: i }) {
                    let a = n.options.fadeIn
                        ? h(
                            '<div class="animated-icon animated fadeIn">' +
                              i +
                              "</div>"
                          )
                        : h(
                            '<div class="animated-icon animated">' +
                              i +
                              "</div>"
                          ),
                      s = "icon_" + Math.floor(26 * Math.random()) + Date.now();
                    if (
                      (a.find("svg").attr("id", s),
                      a.find("svg").attr(
                        "data-filename",
                        r
                          .attr("src")
                          .split(/(\\|\/)/g)
                          .pop()
                      ),
                      r.attr("width") &&
                        a
                          .find("svg")
                          .attr("width", r.attr("width"))
                          .attr("height", r.attr("width")),
                      r.attr("height") &&
                        a.find("svg").attr("height", r.attr("height")),
                      n.options.svgViewBox &&
                        a.find("svg").attr("viewBox", n.options.svgViewBox),
                      r.replaceWith(a),
                      n.options.extraClass && a.addClass(n.options.extraClass),
                      n.options.removeClassAfterInit &&
                        a.removeClass(n.options.removeClassAfterInit),
                      n.options.onlySVG)
                    )
                      return h(window).trigger("icon.rendered"), this;
                    r = a;
                    let o = new Vivus(s, {
                      start: "manual",
                      type: "sync",
                      selfDestroy: !0,
                      duration: c,
                      onReady({ el: e }) {
                        var t = document.createElementNS(
                          "http://www.w3.org/2000/svg",
                          "style"
                        );
                        ((n.options.animated && !n.options.strokeBased) ||
                          (!n.options.animated &&
                            l &&
                            !n.options.strokeBased)) &&
                          ((t.textContent =
                            "#" +
                            s +
                            " path, #" +
                            s +
                            " line, #" +
                            s +
                            " rect, #" +
                            s +
                            " circle, #" +
                            s +
                            " polyline { fill: " +
                            l +
                            "; stroke: " +
                            l +
                            "; stroke-width: 0.1px; fill-opacity: 0; transition: ease fill-opacity 300ms;" +
                            (n.options.svgStyle || "") +
                            " } .finished path { fill-opacity: 1; }"),
                          e.appendChild(t)),
                          ((n.options.animated && n.options.strokeBased) ||
                            (!n.options.animated &&
                              l &&
                              n.options.strokeBased)) &&
                            ((t.textContent =
                              "#" +
                              s +
                              " path, #" +
                              s +
                              " line, #" +
                              s +
                              " rect, #" +
                              s +
                              " circle, #" +
                              s +
                              " polyline { stroke: " +
                              l +
                              "; " +
                              (n.options.svgStyle || "") +
                              "}"),
                            e.appendChild(t)),
                          h.event.trigger("theme.plugin.icon.svg.ready");
                      },
                    });
                    n.options.animated ||
                      (setTimeout(() => {
                        o.finish();
                      }, 10),
                      r.css({ opacity: 1 })),
                      n.options.animated && 767 < h(window).width()
                        ? ((r.visible(!0) || d < p) &&
                            n.startIconAnimation(o, r),
                          h(window).on("scroll", () => {
                            r.visible(!0) && n.startIconAnimation(o, r);
                          }))
                        : (r.css({ opacity: 1 }),
                          o.finish(),
                          h(window).on("theme.plugin.icon.svg.ready", () => {
                            setTimeout(() => {
                              o.el.setAttribute("class", "finished"),
                                o.finish();
                            }, 300);
                          })),
                      h(window).trigger("icon.rendered");
                  },
                })
              : r.removeAttr("data-icon"),
            this
          );
        r.css({ opacity: 1, width: r.attr("width") }),
          n.options.extraClass && r.addClass(n.options.extraClass),
          0 < n.options.extraClass.indexOf("-color-light") &&
            r.css({ filter: "invert(1)" }),
          h(window).trigger("icon.rendered");
      }
      startIconAnimation(e, t) {
        h({ to: 0 }).animate(
          { to: 1 },
          this.options.strokeBased
            ? this.options.delay
            : this.options.delay + 300,
          () => {
            t.css({ opacity: 1 });
          }
        ),
          h({ to: 0 }).animate({ to: 1 }, this.options.delay, () => {
            e.play(1),
              setTimeout(() => {
                e.el.setAttribute("class", "finished");
              }, 5 * e.duration);
          });
      }
    }
    (a.defaults = {
      color: "#2388ED",
      animated: !1,
      delay: 300,
      onlySVG: !1,
      removeClassAfterInit: !1,
      fadeIn: !0,
      accY: 0,
    }),
      h.extend(e, { PluginIcon: a }),
      (h.fn.themePluginIcon = function (t) {
        return this.map(function () {
          var e = h(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__inviewportstyle";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (this.options = i.extend(!0, {}, s.defaults, e, {})), this;
      }
      build() {
        let e = this,
          t = e.$el.get(0);
        return (
          e.$el.css(e.options.style),
          "function" == typeof window.IntersectionObserver &&
            observeElementInViewport.observeElementInViewport(
              t,
              () => {
                e.$el.css(e.options.styleIn),
                  e.$el
                    .addClass(e.options.classIn)
                    .removeClass(e.options.classOut);
              },
              () => {
                e.$el.css(e.options.styleOut),
                  e.$el
                    .addClass(e.options.classOut)
                    .removeClass(e.options.classIn);
              },
              {
                viewport: e.options.viewport,
                threshold: e.options.threshold,
                modTop: e.options.modTop,
                modBottom: e.options.modBottom,
              }
            ),
          this
        );
      }
    }
    (s.defaults = {
      viewport: window,
      threshold: [0],
      modTop: "-200px",
      modBottom: "-200px",
      style: { transition: "all 1s ease-in-out" },
      styleIn: "",
      styleOut: "",
      classIn: "",
      classOut: "",
    }),
      i.extend(e, { PluginInViewportStyle: s }),
      (i.fn.themePluginInViewportStyle = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__lightbox";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        return (
          i.isFunction(i.fn.magnificPopup) &&
            this.options.wrapper.magnificPopup(this.options),
          this
        );
      }
    }
    (s.defaults = {
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      gallery: {
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: "%curr% of %total%",
      },
      image: { tError: '<a href="%url%">The image</a> could not be loaded.' },
      ajax: { tError: '<a href="%url%">The content</a> could not be loaded.' },
      callbacks: {
        open() {
          i("html").addClass("lightbox-opened");
        },
        close() {
          i("html").removeClass("lightbox-opened");
        },
      },
    }),
      i.extend(e, { PluginLightbox: s }),
      (i.fn.themePluginLightbox = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((i = {}, s) => {
    function o(e, t, i) {
      return this.initialize(e, t, i);
    }
    let t = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
        "</div>",
      ].join(""),
      a = [
        '<div class="loading-overlay loading-overlay-percentage">',
        '<div class="page-loader-progress-wrapper"><span class="page-loader-progress">0</span><span class="page-loader-progress-symbol">%</span></div>',
        "</div>",
      ].join(""),
      n = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-thecube"><div class="cssload-cube cssload-c1"></div><div class="cssload-cube cssload-c2"></div><div class="cssload-cube cssload-c4"></div><div class="cssload-cube cssload-c3"></div></div></div>',
        "</div>",
      ].join(""),
      r = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><span class="cssload-cube-progress"><span class="cssload-cube-progress-inner"></span></span></div>',
        "</div>",
      ].join(""),
      l = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-float-rings-loader"><div class="cssload-float-rings-inner cssload-one"></div><div class="cssload-float-rings-inner cssload-two"></div><div class="cssload-float-rings-inner cssload-three"></div></div></div>',
        "</div>",
      ].join(""),
      d = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-float-bars-container"><ul class="cssload-float-bars-flex-container"><li><span class="cssload-float-bars-loading"></span></li></div></div></div>',
        "</div>",
      ].join(""),
      p = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-speeding-wheel-container"><div class="cssload-speeding-wheel"></div></div></div>',
        "</div>",
      ].join(""),
      c = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-zenith-container"><div class="cssload-zenith"></div></div></div>',
        "</div>",
      ].join(""),
      h = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="cssload-spinning-square-loading"></div></div>',
        "</div>",
      ].join(""),
      u = [
        '<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="wrapper-pulse"><div class="cssload-pulse-loader"></div></div></div>',
        "</div>",
      ].join("");
    (o.prototype = {
      options: {
        css: {},
        hideDelay: 500,
        progressMinTimeout: 0,
        effect: "default",
      },
      initialize(e, t, i) {
        (this.$wrapper = e),
          this.setVars()
            .setOptions(t, i)
            .build()
            .events()
            .dynamicShowHideEvents(),
          this.$wrapper.data("loadingOverlay", this);
      },
      setVars() {
        return (
          (this.$overlay = this.$wrapper.find(".loading-overlay")),
          (this.pageStatus = null),
          (this.progress = null),
          (this.animationInterval = 33),
          this
        );
      },
      setOptions(e, t) {
        return (
          this.$overlay.get(0) || this.matchProperties(),
          (this.options = t
            ? s.extend(!0, {}, this.options, e)
            : s.extend(
                !0,
                {},
                this.options,
                e,
                i.fn.getOptions(this.$wrapper.data("plugin-options"))
              )),
          (this.loaderClass = this.getLoaderClass(
            this.options.css.backgroundColor
          )),
          this
        );
      },
      build() {
        let e = this;
        if (!this.$overlay.closest(document.documentElement).get(0)) {
          if (this.$cachedOverlay) this.$overlay = this.$cachedOverlay.clone();
          else {
            switch (e.options.effect) {
              case "percentageProgress1":
                this.$overlay = s(a).clone();
                break;
              case "percentageProgress2":
                (this.$overlay = s(a).clone()),
                  this.$overlay
                    .addClass("loading-overlay-percentage-effect-2")
                    .prepend(
                      '<div class="loading-overlay-background-layer"></div>'
                    );
                break;
              case "cubes":
                this.$overlay = s(n).clone();
                break;
              case "cubeProgress":
                this.$overlay = s(r).clone();
                break;
              case "floatRings":
                this.$overlay = s(l).clone();
                break;
              case "floatBars":
                this.$overlay = s(d).clone();
                break;
              case "speedingWheel":
                this.$overlay = s(p).clone();
                break;
              case "zenith":
                this.$overlay = s(c).clone();
                break;
              case "spinningSquare":
                this.$overlay = s(h).clone();
                break;
              case "pulse":
                this.$overlay = s(u).clone();
                break;
              default:
                this.$overlay = s(t).clone();
            }
            this.options.css &&
              (this.$overlay.css(this.options.css),
              this.$overlay.find(".loader").addClass(this.loaderClass));
          }
          this.$wrapper.prepend(this.$overlay);
        }
        return (
          this.$cachedOverlay || (this.$cachedOverlay = this.$overlay.clone()),
          ["percentageProgress1", "percentageProgress2"].includes(
            e.options.effect
          ) &&
            (e.updateProgress(), e.options.isDynamicHideShow) &&
            setTimeout(() => {
              (e.progress = "complete"),
                s(".page-loader-progress").text(100),
                ["percentageProgress2"].includes(e.options.effect) &&
                  s(".loading-overlay-background-layer").css({ width: "100%" });
            }, 2800),
          this
        );
      },
      events() {
        let t = this;
        return (
          this.options.startShowing && t.show(),
          (this.$wrapper.is("body") || this.options.hideOnWindowLoad) &&
            s(window).on("load error", () => {
              setTimeout(() => {
                t.hide();
              }, t.options.progressMinTimeout);
            }),
          this.options.listenOn &&
            s(this.options.listenOn)
              .on("loading-overlay:show beforeSend.ic", (e) => {
                e.stopPropagation(), t.show();
              })
              .on("loading-overlay:hide complete.ic", (e) => {
                e.stopPropagation(), t.hide();
              }),
          this.$wrapper
            .on(
              "loading-overlay:show beforeSend.ic",
              (e) =>
                e.target === t.$wrapper.get(0) &&
                (e.stopPropagation(), t.show(), !0)
            )
            .on(
              "loading-overlay:hide complete.ic",
              (e) =>
                e.target === t.$wrapper.get(0) &&
                (e.stopPropagation(), t.hide(), !0)
            ),
          ["percentageProgress1", "percentageProgress2"].includes(
            t.options.effect
          ) &&
            s(window).on("load", () => {
              setTimeout(() => {
                (t.pageStatus = "complete"),
                  s(".page-loader-progress").text(100),
                  ["percentageProgress2"].includes(t.options.effect) &&
                    s(".loading-overlay-background-layer").css({
                      width: "100%",
                    });
              }, t.options.progressMinTimeout);
            }),
          this
        );
      },
      show() {
        this.build(),
          (this.position = this.$wrapper.css("position").toLowerCase()),
          ("relative" == this.position &&
            "absolute" == this.position &&
            "fixed" == this.position) ||
            this.$wrapper.css({ position: "relative" }),
          this.$wrapper.addClass("loading-overlay-showing");
      },
      hide() {
        let e = this;
        setTimeout(function () {
          e.$wrapper.removeClass("loading-overlay-showing"),
            ("relative" == this.position &&
              "absolute" == this.position &&
              "fixed" == this.position) ||
              e.$wrapper.css({ position: "" }),
            s(window).trigger("loading.overlay.ready");
        }, e.options.hideDelay);
      },
      updateProgress() {
        let e = this,
          t = () => {
            "complete" == e.pageStatus
              ? (s(".page-loader-progress").text(100),
                setTimeout(() => {
                  s(".page-loader-progress").addClass("d-none");
                }, 700))
              : (null == e.progress && (e.progress = 1),
                (e.progress = e.progress + 1),
                0 <= e.progress && e.progress <= 30
                  ? ((e.animationInterval += 1),
                    s(".page-loader-progress").text(e.progress))
                  : 30 < e.progress && e.progress <= 60
                  ? ((e.animationInterval += 2),
                    s(".page-loader-progress").text(e.progress))
                  : 60 < e.progress && e.progress <= 80
                  ? ((e.animationInterval += 40),
                    s(".page-loader-progress").text(e.progress))
                  : 80 < e.progress && e.progress <= 90
                  ? ((e.animationInterval += 80),
                    s(".page-loader-progress").text(e.progress))
                  : 90 < e.progress && e.progress <= 95
                  ? ((e.animationInterval += 150),
                    s(".page-loader-progress").text(e.progress))
                  : 95 < e.progress && e.progress <= 99
                  ? ((e.animationInterval += 400),
                    s(".page-loader-progress").text(e.progress))
                  : 100 <= e.progress && s(".page-loader-progress").text(99),
                ["percentageProgress2"].includes(e.options.effect) &&
                  s(".loading-overlay-background-layer").css({
                    width: e.progress + "%",
                  }),
                (self.loopInside = setTimeout(t, e.animationInterval)));
          };
        return t(), this;
      },
      matchProperties() {
        let e, t, i;
        for (
          t = (i = ["backgroundColor", "borderRadius"]).length, e = 0;
          e < t;
          e++
        ) {
          var a = {};
          (a[i[e]] = this.$wrapper.css(i[e])), s.extend(this.options.css, a);
        }
      },
      getLoaderClass(e) {
        return !e ||
          "transparent" === e ||
          "inherit" === e ||
          ((e = ((e) => {
            let t, i;
            return (
              3 ===
                (t = e.includes("#")
                  ? e.replace("#", "")
                  : ((i = e.match(/\d+/g)),
                    ("0" + parseInt(i[0], 10).toString(16)).slice(-2) +
                      ("0" + parseInt(i[1], 10).toString(16)).slice(-2) +
                      ("0" + parseInt(i[2], 10).toString(16)).slice(-2)))
                  .length && (t += t),
              t
            );
          })(e)),
          128 <=
            (299 * parseInt(e.substr(0, 2), 16) +
              587 * parseInt(e.substr(2, 2), 16) +
              114 * parseInt(e.substr(4, 2), 16)) /
              1e3)
          ? "black"
          : "white";
      },
      dynamicShowHide(e) {
        return (
          s("body").removeData("loadingOverlay"),
          s(".loading-overlay").remove(),
          "" != e &&
            (s("body").loadingOverlay(
              { effect: e || "pulse", isDynamicHideShow: !0 },
              !0
            ),
            s("body").data("loadingOverlay").show(),
            setTimeout(() => {
              s("body").data("loadingOverlay").hide();
            }, 3e3)),
          this
        );
      },
      dynamicShowHideEvents() {
        let t = this;
        return (
          s(document)
            .off("click.loading-overlay-button")
            .on(
              "click.loading-overlay-button",
              ".loading-overlay-button",
              function (e) {
                e.preventDefault(), t.dynamicShowHide(s(this).data("effect"));
              }
            ),
          s(document)
            .off("change.loading-overlay-select")
            .on(
              "change.loading-overlay-select",
              ".loading-overlay-select",
              function () {
                t.dynamicShowHide(s(this).val());
              }
            ),
          this
        );
      },
    }),
      s.extend(i, { LoadingOverlay: o }),
      (s.fn.loadingOverlay = function (i, a) {
        return this.each(function () {
          var e = s(this),
            t = e.data("loadingOverlay");
          return (
            t ||
            ((t = i || e.data("loading-overlay-options") || {}), new o(e, t, a))
          );
        });
      }),
      s("[data-loading-overlay]").loadingOverlay();
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, a) => {
    let i = "__masonry";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = a.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (a.isFunction(a.fn.isotope)) {
          let i = this;
          a(window);
          (i.$loader = !1),
            i.options.wrapper.parents(".masonry-loader").get(0) &&
              ((i.$loader = i.options.wrapper.parents(".masonry-loader")),
              i.createLoader()),
            i.options.wrapper.one("layoutComplete", (e, t) => {
              i.removeLoader();
            }),
            i.options.wrapper.waitForImages(() => {
              i.options.wrapper.isotope(i.options);
            }),
            a(window).on("resize", () => {
              setTimeout(() => {
                i.options.wrapper.isotope("layout");
              }, 300);
            }),
            setTimeout(() => {
              i.removeLoader();
            }, 3e3);
        }
        return this;
      }
      createLoader() {
        var e = [
          '<div class="bounce-loader">',
          '<div class="bounce1"></div>',
          '<div class="bounce2"></div>',
          '<div class="bounce3"></div>',
          "</div>",
        ].join("");
        return this.$loader.append(e), this;
      }
      removeLoader() {
        let e = this;
        e.$loader &&
          (e.$loader.removeClass("masonry-loader-showing"),
          setTimeout(() => {
            e.$loader.addClass("masonry-loader-loaded");
          }, 300));
      }
    }
    (s.defaults = {}),
      a.extend(e, { PluginMasonry: s }),
      (a.fn.themePluginMasonry = function (t) {
        return this.map(function () {
          var e = a(this);
          return e.data(i) ? e.data(i) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__matchHeight";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        return (
          i.isFunction(i.fn.matchHeight) &&
            this.options.wrapper.matchHeight(this.options),
          this
        );
      }
    }
    (s.defaults = { byRow: !0, property: "height", target: null, remove: !1 }),
      i.extend(e, { PluginMatchHeight: s }),
      (i.fn.themePluginMatchHeight = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, d) => {
    let i = "__parallax";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = d.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let r = this,
          i = d(window),
          a,
          s,
          o,
          n,
          l;
        if (r.options.mouseParallax)
          return (
            i.mousemove(({ clientX: i, clientY: a }) => {
              d(".parallax-mouse-object", r.options.wrapper).each(function () {
                var e = d(this).attr("data-value"),
                  t = (i * e) / 250,
                  e = (a * e) / 250;
                d(this).css(
                  "transform",
                  "translateX(" + t + "px) translateY(" + e + "px)"
                );
              });
            }),
            this
          );
        var e;
        if (
          !(
            r.options.scrollableParallax &&
            d(window).width() > r.options.scrollableParallaxMinWidth
          )
        )
          return (
            (n = r.options.fadeIn
              ? d('<div class="parallax-background fadeIn animated"></div>')
              : d('<div class="parallax-background"></div>')).css({
              "background-image":
                "url(" + r.options.wrapper.data("image-src") + ")",
              "background-size": "cover",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: r.options.parallaxHeight,
            }),
            r.options.parallaxScale &&
              n.css({ transition: "transform 500ms ease-out" }),
            r.options.wrapper.prepend(n),
            r.options.wrapper.css({ position: "relative", overflow: "hidden" }),
            (e = () => {
              i.on("scroll resize", () => {
                if (
                  ((a = r.options.wrapper.offset()),
                  (s =
                    -(i.scrollTop() - (a.top - 100)) / (r.options.speed + 2)),
                  (o = s < 0 ? Math.abs(s) : -Math.abs(s)),
                  (l = d('html[dir="rtl"]').get(0) ? " rotateY(180deg)" : ""),
                  (a = r.options.wrapper.offset()),
                  (s =
                    -(i.scrollTop() - (a.top - 100)) / (r.options.speed + 2)),
                  (o = s < 0 ? Math.abs(s) : -Math.abs(s)),
                  (l = d('html[dir="rtl"]').get(0) ? " rotateY(180deg)" : ""),
                  r.options.parallaxScale)
                ) {
                  var e = i.scrollTop(),
                    t = r.options.wrapper.offset().top,
                    t = Math.abs(
                      (t - e - i.height()) / (r.options.startOffset || 7)
                    ),
                    e = (parseInt(100 <= t ? 100 : t) / 100) * 50;
                  r.options.parallaxScaleInvert
                    ? n.css({
                        transform:
                          "scale(1." +
                          String(50 - e).padStart(2, "0") +
                          ", 1." +
                          String(50 - e).padStart(2, "0") +
                          ")",
                      })
                    : n.css({
                        transform:
                          "scale(1." +
                          String(e).padStart(2, "0") +
                          ", 1." +
                          String(e).padStart(2, "0") +
                          ")",
                      });
                } else {
                  "bottom" == r.options.parallaxDirection &&
                    (r.options.offset = 250);
                  let e = o - 50 + r.options.offset;
                  "bottom" == r.options.parallaxDirection &&
                    (e = e < 0 ? Math.abs(e) : -Math.abs(e)),
                    n.css({
                      transform: "translate3d(0, " + e + "px, 0)" + l,
                      "background-position-x": r.options.horizontalPosition,
                    });
                }
              }),
                i.trigger("scroll");
            }),
            !d.browser.mobile || 1 == r.options.enableOnMobile
              ? e()
              : r.options.wrapper.addClass("parallax-disabled"),
            this
          );
        {
          let n = r.options.wrapper.find(".scrollable-parallax-wrapper");
          if (n.get(0)) {
            let s =
                d(window).scrollTop() >
                r.options.wrapper.offset().top + d(window).outerHeight()
                  ? r.options.cssValueEnd
                  : r.options.cssValueStart,
              o = r.options.cssValueUnit || "";
            n.css({
              "background-image":
                "url(" + r.options.wrapper.data("image-src") + ")",
              "background-size": "cover",
              "background-position": "center",
              "background-attachment": "fixed",
              transition:
                "ease " +
                r.options.cssProperty +
                " " +
                r.options.transitionDuration,
              width: s + "%",
            }),
              d(window).on("scroll", (e) => {
                var t, i, a;
                r.options.wrapper.visible(!0) &&
                  ((a = (t = d(window)).scrollTop()),
                  (i = r.options.wrapper.offset().top),
                  (i = Math.abs(
                    (i - a - t.height()) / (r.options.startOffset || 7)
                  )),
                  (s =
                    (s =
                      i <= r.options.cssValueEnd && s <= r.options.cssValueEnd
                        ? r.options.cssValueStart + i
                        : s) > r.options.cssValueEnd
                      ? r.options.cssValueEnd
                      : s) < r.options.cssValueStart &&
                    (s = r.options.cssValueStart),
                  ((a = {})[r.options.cssProperty] = s + o),
                  n.css(a));
              });
          }
        }
      }
    }
    (a.defaults = {
      speed: 1.5,
      horizontalPosition: "50%",
      offset: 0,
      parallaxDirection: "top",
      parallaxHeight: "180%",
      parallaxScale: !1,
      parallaxScaleInvert: !1,
      scrollableParallax: !1,
      scrollableParallaxMinWidth: 991,
      startOffset: 7,
      transitionDuration: "200ms",
      cssProperty: "width",
      cssValueStart: 40,
      cssValueEnd: 100,
      cssValueUnit: "vw",
      mouseParallax: !1,
      enableOnMobile: !0,
    }),
      d.extend(e, { PluginParallax: a }),
      (d.fn.themePluginParallax = function (t) {
        return this.map(function () {
          var e = d(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__progressBar";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this.options.wrapper;
        var t = e.attr("data-appear-animation-delay")
          ? e.attr("data-appear-animation-delay")
          : this.options.delay;
        return (
          e.addClass(e.attr("data-appear-animation")),
          setTimeout(() => {
            e.animate(
              { width: e.attr("data-appear-progress-animation") },
              1500,
              "easeOutQuad",
              () => {
                e.find(".progress-bar-tooltip").animate(
                  { opacity: 1 },
                  500,
                  "easeOutQuad"
                );
              }
            );
          }, t),
          this
        );
      }
    }
    (s.defaults = { accX: 0, accY: -50, delay: 1 }),
      i.extend(e, { PluginProgressBar: s }),
      (i.fn.themePluginProgressBar = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, n) => {
    let i = "__randomimages";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          (this.$el = e),
          (this.st = ""),
          (this.times = 0),
          (this.perImageIndex = 0),
          (!e.is("img") || void 0 !== t.imagesListURL) &&
            (this.setData().setOptions(t).build(), this)
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = n.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this;
        return (
          !(n(window).width() < e.options.minWindowWidth) &&
          (e.$el.is("img")
            ? ((e.isInsideLightbox = !!e.$el.closest(".lightbox").length),
              e.isInsideLightbox &&
                e.options.lightboxImagesListURL &&
                e.options.lightboxImagesListURL.push(
                  e.$el.closest(".lightbox").attr("href")
                ),
              e.options.imagesListURL.push(e.$el.attr("src")),
              (e.lastIndex = e.options.imagesListURL.length - 1),
              0 == e.options.random &&
                n(".plugin-random-images").each(function (e) {
                  e == n(".plugin-random-images").length - 1 &&
                    n(this).addClass("the-last");
                }),
              setTimeout(
                () => {
                  e.recursiveTimeout(
                    e.perImageTag,
                    null == e.options.delay ? 3e3 : e.options.delay
                  );
                },
                null == e.options.delay ? 300 : e.options.delay / 3
              ))
            : setTimeout(
                e.recursiveTimeout(
                  e.perWrapper,
                  e.options.delay || getPerWrapperHighDelay(),
                  !1
                ),
                300
              ),
          e.options.stopAfterFewSeconds &&
            setTimeout(() => {
              clearTimeout(e.st);
            }, e.options.stopAfterFewSeconds),
          this)
        );
      }
      perImageTag() {
        let e = this,
          t = e.options.random
            ? Math.floor(Math.random() * e.options.imagesListURL.length)
            : e.lastIndex;
        if ("" !== e.lastIndex && e.lastIndex == t)
          if (e.options.random)
            for (; t == e.lastIndex; )
              t = Math.floor(Math.random() * e.options.imagesListURL.length);
          else -1 == (t -= 1) && (t = e.options.imagesListURL.length - 1);
        return (
          e.$el.addClass("animated"),
          e.$el.removeClass(e.options.animateIn).addClass(e.options.animateOut),
          setTimeout(() => {
            e.$el
              .attr("src", e.options.imagesListURL[t])
              .removeClass(e.options.animateOut)
              .addClass(e.options.animateIn),
              e.isInsideLightbox &&
                e.options.lightboxImagesListURL &&
                e.$el
                  .closest(".lightbox")
                  .attr("href", e.options.lightboxImagesListURL[t]);
          }, 1e3),
          (e.lastIndex = t),
          e.times++,
          (e.perImageIndex = t),
          this
        );
      }
      getPerWrapperHighDelay() {
        var e = this.$el;
        let t = 0;
        return (
          e.find("img").each(function () {
            var e = n(this);
            e.data("rimage-delay") &&
              parseInt(e.data("rimage-delay")) > t &&
              (t = parseInt(e.data("rimage-delay")));
          }),
          t
        );
      }
      perWrapper() {
        let o = this,
          e = o.$el;
        return (
          (o.options.imagesListURL = []),
          e.find("img").each(function () {
            var e = n(this);
            o.options.imagesListURL.push(e.attr("src"));
          }),
          (o.options.imagesListURL = o.shuffle(o.options.imagesListURL)),
          e.find("img").each(function (e) {
            let t = n(this),
              i = t.data("rimage-animate-in")
                ? t.data("rimage-animate-in")
                : o.options.animateIn,
              a = t.data("rimage-animate-out")
                ? t.data("rimage-animate-out")
                : o.options.animateOut,
              s = t.data("rimage-delay") ? t.data("rimage-delay") : 2e3;
            t.addClass("animated"),
              setTimeout(() => {
                t.removeClass(i).addClass(a);
              }, s / 2),
              setTimeout(() => {
                t.attr("src", o.options.imagesListURL[e])
                  .removeClass(a)
                  .addClass(i);
              }, s);
          }),
          o.times++,
          this
        );
      }
      recursiveTimeout(e, t) {
        let i = this,
          a = () => {
            null !== e && e.call(i),
              (i.st = setTimeout(a, null == t ? 1e3 : t)),
              0 == i.options.random &&
                (i.$el.hasClass("the-last")
                  ? n(".plugin-random-images").trigger("rimages.start")
                  : clearTimeout(i.st)),
              i.options.stopAtImageIndex &&
                parseInt(i.options.stopAtImageIndex) == i.perImageIndex &&
                clearTimeout(i.st),
              i.options.stopAfterXTimes == i.times && clearTimeout(i.st);
          };
        a(),
          i.$el.on("rimages.start", () => {
            clearTimeout(i.st), (i.st = setTimeout(a, null == t ? 1e3 : t));
          });
      }
      shuffle(t) {
        for (let e = t.length - 1; 0 < e; e--) {
          var i = Math.floor(Math.random() * (e + 1)),
            a = t[e];
          (t[e] = t[i]), (t[i] = a);
        }
        return t;
      }
    }
    (a.defaults = {
      minWindowWidth: 0,
      random: !0,
      imagesListURL: null,
      lightboxImagesListURL: null,
      delay: null,
      animateIn: "fadeIn",
      animateOut: "fadeOut",
      stopAtImageIndex: !1,
      stopAfterFewSeconds: !1,
      stopAfterXTimes: !1,
      accY: 0,
    }),
      n.extend(e, { PluginRandomImages: a }),
      (n.fn.themePluginRandomImages = function (t) {
        return this.map(function () {
          var e = n(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, a) => {
    let i = "__readmore";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          (this.$el = e),
          this.setData().setOptions(t).build().events(),
          this.options.startOpened &&
            this.options.wrapper
              .find(".readmore-button-wrapper > a")
              .trigger("click"),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = a.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        var e = this;
        e.options.wrapper.addClass("position-relative"),
          e.options.wrapper.append('<div class="readmore-overlay"></div>');
        let t =
          "linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, " +
          e.options.overlayColor +
          " 100%)";
        switch (
          (a("html").hasClass("safari") &&
            (t =
              "-webkit-linear-gradient(top, rgba(2, 0, 36, 0) 0%, " +
              e.options.overlayColor +
              " 100%)"),
          e.options.wrapper.find(".readmore-overlay").css({
            background: t,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: e.options.overlayHeight,
            "z-index": 1,
          }),
          e.options.wrapper
            .find(".readmore-button-wrapper")
            .removeClass("d-none")
            .css({
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              "z-index": 2,
            }),
          e.options.wrapper
            .find(".readmore-button-wrapper > a")
            .html(e.options.buttonOpenLabel),
          e.options.wrapper.css({
            height: e.options.maxHeight,
            "overflow-y": "hidden",
          }),
          e.options.align)
        ) {
          case "center":
            e.options.wrapper
              .find(".readmore-button-wrapper")
              .addClass("text-center");
            break;
          case "end":
            e.options.wrapper
              .find(".readmore-button-wrapper")
              .addClass("text-end");
            break;
          default:
            e.options.wrapper
              .find(".readmore-button-wrapper")
              .addClass("text-start");
        }
        return this;
      }
      events() {
        let i = this;
        return (
          (i.readMore = () => {
            i.options.wrapper
              .find(".readmore-button-wrapper > a:not(.readless)")
              .on("click", function (e) {
                e.preventDefault();
                let t = a(this);
                setTimeout(() => {
                  i.options.wrapper.animate(
                    { height: i.options.wrapper[0].scrollHeight },
                    () => {
                      i.options.enableToggle || t.fadeOut(),
                        t
                          .html(i.options.buttonCloseLabel)
                          .addClass("readless")
                          .off("click"),
                        i.readLess(),
                        i.options.wrapper.find(".readmore-overlay").fadeOut(),
                        i.options.wrapper.css({
                          "max-height": "none",
                          overflow: "visible",
                        }),
                        i.options.wrapper
                          .find(".readmore-button-wrapper")
                          .animate({ bottom: -20 });
                    }
                  );
                }, 200);
              });
          }),
          (i.readLess = () => {
            i.options.wrapper
              .find(".readmore-button-wrapper > a.readless")
              .on("click", function (e) {
                e.preventDefault();
                let t = a(this);
                i.options.wrapper
                  .find(".readmore-button-wrapper")
                  .animate({ bottom: 0 }),
                  i.options.wrapper.find(".readmore-overlay").fadeIn(),
                  setTimeout(() => {
                    i.options.wrapper
                      .height(i.options.wrapper[0].scrollHeight)
                      .animate({ height: i.options.maxHeight }, () => {
                        t
                          .html(i.options.buttonOpenLabel)
                          .removeClass("readless")
                          .off("click"),
                          i.readMore(),
                          i.options.wrapper.css({ overflow: "hidden" });
                      });
                  }, 200);
              });
          }),
          i.readMore(),
          this
        );
      }
    }
    (s.defaults = {
      buttonOpenLabel:
        'Read More <i class="fas fa-chevron-down text-2 ms-1"></i>',
      buttonCloseLabel:
        'Read Less <i class="fas fa-chevron-up text-2 ms-1"></i>',
      enableToggle: !0,
      maxHeight: 110,
      overlayColor: "#FFF",
      overlayHeight: 100,
      startOpened: !1,
      align: "left",
    }),
      a.extend(e, { PluginReadMore: s }),
      (a.fn.themePluginReadMore = function (t) {
        return this.map(function () {
          var e = a(this);
          return e.data(i) ? e.data(i) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__revolution";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(a) ||
            ((this.$el = e), this.setData().setOptions(t).build().events()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        return (
          i.isFunction(i.fn.revolution) &&
            (1 == this.options.wrapper.find("> ul > li").length &&
              (this.options.wrapper.addClass("slider-single-slide"),
              i.extend(this.options.navigation, { bullets: { enable: !1 } })),
            "fullscreen" == this.options.sliderLayout &&
              this.options.wrapper
                .closest(".slider-container")
                .addClass("fullscreen-slider"),
            this.options.wrapper.revolution(this.options),
            this.options.addOnTypewriter.enable &&
              RsTypewriterAddOn(i, this.options.wrapper),
            this.options.addOnWhiteboard.enable &&
              this.options.wrapper.rsWhiteBoard(),
            this.options.addOnParticles.enable &&
              RsParticlesAddOn(this.options.wrapper),
            this.options.addOnCountdown.enable &&
              tp_countdown(
                this.options.wrapper,
                this.options.addOnCountdown.targetdate,
                this.options.addOnCountdown.slidechanges
              ),
            this.options.addOnSlicey.enable &&
              this.options.wrapper.revSliderSlicey(),
            this.options.addOnFilmstrip.enable &&
              RsFilmstripAddOn(
                i,
                this.options.wrapper,
                "../vendor/rs-plugin/revolution-addons/filmstrip/",
                !1
              ),
            this.options.addOnBeforeAfter.enable &&
              RevSliderBeforeAfter(
                i,
                this.options.wrapper,
                this.options.addOnBeforeAfter.options
              ),
            this.options.addOnPanorama.enable &&
              RsAddonPanorama(i, this.options.wrapper),
            this.options.addOnRevealer.enable &&
              RsRevealerAddOn(
                i,
                this.options.wrapper,
                this.options.revealer.spinnerHtml
              ),
            this.options.addOnDuotone.enable &&
              RsAddonDuotone(
                i,
                this.options.wrapper,
                !0,
                "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                "1000"
              ),
            this.options.addOnBubblemorph.enable &&
              BubbleMorphAddOn(i, this.options.wrapper, !1),
            this.options.addOnDistortion.enable) &&
            RsLiquideffectAddOn(i, this.options.wrapper),
          this
        );
      }
      events() {
        return this;
      }
    }
    (s.defaults = {
      sliderType: "standard",
      sliderLayout: "fullwidth",
      delay: 9e3,
      gridwidth: 1170,
      gridheight: 500,
      spinner: "spinner3",
      disableProgressBar: "on",
      parallax: { type: "off", bgparallax: "off" },
      navigation: {
        keyboardNavigation: "off",
        keyboard_direction: "horizontal",
        mouseScrollNavigation: "off",
        onHoverStop: "off",
        touch: {
          touchenabled: "on",
          swipe_threshold: 75,
          swipe_min_touches: 1,
          swipe_direction: "horizontal",
          drag_block_vertical: !1,
        },
        arrows: {
          enable: !0,
          hide_onmobile: !1,
          hide_under: 0,
          hide_onleave: !0,
          hide_delay: 200,
          hide_delay_mobile: 1200,
          left: {
            h_align: "left",
            v_align: "center",
            h_offset: 30,
            v_offset: 0,
          },
          right: {
            h_align: "right",
            v_align: "center",
            h_offset: 30,
            v_offset: 0,
          },
        },
      },
      addOnTypewriter: { enable: !1 },
      addOnWhiteboard: { enable: !1 },
      whiteboard: {
        movehand: {
          src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/hand_point_right.png",
          width: 400,
          height: 1e3,
          handtype: "right",
          transform: { transformX: 50, transformY: 50 },
          jittering: {
            distance: "80",
            distance_horizontal: "100",
            repeat: "5",
            offset: "10",
            offset_horizontal: "0",
          },
          rotation: { angle: "10", repeat: "3" },
        },
        writehand: {
          src: "../vendor/rs-plugin/revolution-addons/whiteboard/assets/images/write_right_angle.png",
          width: 572,
          height: 691,
          handtype: "right",
          transform: { transformX: 50, transformY: 50 },
          jittering: {
            distance: "80",
            distance_horizontal: "100",
            repeat: "5",
            offset: "10",
            offset_horizontal: "0",
          },
          rotation: { angle: "10", repeat: "3" },
        },
      },
      addOnParticles: { enable: !1 },
      particles: {
        startSlide: "first",
        endSlide: "last",
        zIndex: "1",
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#ffffff", opacity: 1 },
            image: { src: "" },
          },
          opacity: {
            value: 0.5,
            random: !0,
            min: 0.25,
            anim: { enable: !1, speed: 3, opacity_min: 0, sync: !1 },
          },
          size: {
            value: 2,
            random: !1,
            min: 30,
            anim: { enable: !1, speed: 40, size_min: 1, sync: !1 },
          },
          line_linked: {
            enable: !0,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: !0,
            speed: 6,
            direction: "none",
            random: !0,
            min_speed: 6,
            straight: !1,
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onhover: { enable: !1, mode: "repulse" },
            onclick: { enable: !1, mode: "repulse" },
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            bubble: { distance: 400, size: 40, opacity: 0.4 },
            repulse: { distance: 200 },
          },
        },
      },
      addOnCountdown: {
        enable: !1,
        targetdate: new Date().getTime() + 864e6,
        slidechanges: [{ days: 0, hours: 0, minutes: 0, seconds: 0, slide: 2 }],
      },
      addOnSlicey: { enable: !1 },
      addOnFilmstrip: { enable: !1 },
      addOnBeforeAfter: {
        enable: !1,
        options: {
          cursor: "move",
          carousel: !1,
          arrowStyles: {
            leftIcon: "fa-icon-caret-left",
            rightIcon: "fa-icon-caret-right",
            topIcon: "fa-icon-caret-up",
            bottomIcon: "fa-icon-caret-down",
            size: "35",
            color: "#ffffff",
            spacing: "10",
            bgColor: "transparent",
            padding: "0",
            borderRadius: "0",
          },
          dividerStyles: { width: "1", color: "rgba(255, 255, 255, 0.5)" },
        },
      },
      addOnPanorama: { enable: !1 },
      addOnRevealer: { enable: !1 },
      revealer: {
        direction: "open_horizontal",
        color: "#ffffff",
        duration: "1500",
        delay: "0",
        easing: "Power2.easeInOut",
        overlay_enabled: !0,
        overlay_color: "#000000",
        overlay_duration: "1500",
        overlay_delay: "0",
        overlay_easing: "Power2.easeInOut",
        spinner: "1",
        spinnerColor: "#006dd2",
        spinnerHtml:
          "<div class='rsaddon-revealer-spinner rsaddon-revealer-spinner-1'><div class='rsaddon-revealer-1'><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span><span style='background: {{color}}'></span></div></div />",
      },
      addOnDuotone: { enable: !1 },
      addOnBubblemorph: { enable: !1 },
      addOnDistortion: { enable: !1 },
    }),
      i.extend(e, { PluginRevolutionSlider: s }),
      (i.fn.themePluginRevolutionSlider = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, d) => {
    let i = "__scrollSpy";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          null != document.querySelector(t.target) &&
          ((this.$el = e), this.setData().setOptions(t), this.build(), this)
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = d.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let i =
            null != document.querySelector(this.options.target) &&
            document.querySelector(this.options.target),
          a =
            "#header" == i || ".wrapper-spy" == i
              ? i.querySelectorAll(".header-nav .nav > li a")
              : i.querySelectorAll(".nav > li a"),
          n = Object.keys(a).map((e, t) => a[e].hash);
        (n = n.filter((e) => "" != e)), (this.sectionIDs = n);
        for (let t = 0; t < n.length; t++) {
          let e = "-20% 0px -79.9% 0px";
          if (d(n[t]).data("spy-offset")) {
            let s = d(n[t]).data("spy-offset"),
              o = parseInt(s) < 0;
            e = e
              .split(" ")
              .map((t, i) => {
                if (0 < t.indexOf("%")) {
                  var a = parseInt(t.replace("%", ""));
                  let e = 0;
                  switch (i) {
                    case 0:
                      e = o ? a - s : Math.abs(a) + s;
                      break;
                    case 2:
                      e = o ? a + s : Math.abs(a) - s;
                  }
                  return o ? (e += "%") : (e = "-" + e + "%"), e;
                }
                return t;
              })
              .join(" ");
          }
          var s = n[t];
          this.scrollSpyIntObs(
            s,
            function () {
              var e = d(this);
              ("#header" == i || ".wrapper-spy" == i
                ? (d("#header .header-nav .nav > li a").removeClass("active"),
                  d('#header .header-nav .nav > li a[href="#' + e[0].id + '"]'))
                : (d(i).find(".nav > li a").removeClass("active"),
                  d(i).find('.nav > li a[href="#' + e[0].id + '"]'))
              ).addClass("active");
            },
            { rootMargin: e, threshold: 0 },
            !0,
            t,
            !0
          );
        }
        return this;
      }
      scrollSpyIntObs(e, i, t, a, s, o) {
        let n = this;
        e = document.querySelectorAll(e);
        let r = { rootMargin: "0px 0px 200px 0px" },
          l =
            (Object.keys(t).length && (r = d.extend(r, t)),
            new IntersectionObserver((e) => {
              for (var t of e)
                0 < t.intersectionRatio
                  ? ("string" == typeof i
                      ? Function("return " + i)()
                      : i.call(d(t.target)),
                    a || l.unobserve(t.target))
                  : (0 == o &&
                      s == n.sectionIDs.length - 1 &&
                      (d("#header .header-nav .nav > li a").removeClass(
                        "active"
                      ),
                      d(
                        '#header .header-nav .nav > li a[href="#' +
                          t.target.id +
                          '"]'
                      )
                        .parent()
                        .prev()
                        .find("a")
                        .addClass("active")),
                    (o = !1));
            }, r));
        return (
          d(e).each(function () {
            l.observe(d(this)[0]);
          }),
          this
        );
      }
    }
    (a.defaults = { target: "#header" }),
      d.extend(e, { PluginScrollSpy: a }),
      (d.fn.themePluginScrollSpy = function (t) {
        return this.map(function () {
          var e = d(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    i.extend(e, {
      PluginScrollToTop: {
        defaults: {
          wrapper: i("body"),
          offset: 150,
          buttonClass: "scroll-to-top",
          buttonAriaLabel: "Scroll To Top",
          iconClass: "fas fa-chevron-up",
          delay: 1e3,
          visibleMobile: !1,
          label: !1,
          easing: "easeOutBack",
        },
        initialize(e) {
          if (
            ((initialized = !0), !i("body[data-plugin-section-scroll]").get(0))
          )
            return this.setOptions(e).build().events(), this;
        },
        setOptions(e) {
          return (this.options = i.extend(!0, {}, this.defaults, e)), this;
        },
        build() {
          var e = this,
            t = i("<a />")
              .addClass(e.options.buttonClass)
              .attr({ href: "#", "aria-label": e.options.buttonAriaLabel })
              .append(i("<i />").addClass(e.options.iconClass));
          return (
            e.options.visibleMobile || t.addClass("hidden-mobile"),
            e.options.label && t.append(i("<span />").html(e.options.label)),
            this.options.wrapper.append(t),
            (this.$el = t),
            this
          );
        },
        events() {
          let t = this,
            e = !1;
          return (
            t.$el.on(
              "click",
              (e) => (
                e.preventDefault(),
                i("html").animate(
                  { scrollTop: 0 },
                  t.options.delay,
                  t.options.easing
                ),
                !1
              )
            ),
            i(window).scroll(() => {
              e ||
                ((e = !0),
                (e =
                  (i(window).scrollTop() > t.options.offset
                    ? t.$el.stop(!0, !0).addClass("visible")
                    : t.$el.stop(!0, !0).removeClass("visible"),
                  !1)));
            }),
            this
          );
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__scrollable";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      static updateModals() {
        s.updateBootstrapModal();
      }
      static updateBootstrapModal() {
        var e = void 0 !== i.fn.modal;
        if (
          !(
            e &&
            void 0 !== i.fn.modal.Constructor &&
            void 0 !== i.fn.modal.Constructor.prototype &&
            void 0 !== i.fn.modal.Constructor.prototype.enforceFocus
          )
        )
          return !1;
        let t = i.fn.modal.Constructor.prototype.enforceFocus;
        i.fn.modal.Constructor.prototype.enforceFocus = function () {
          t.apply(this);
          var e = this.$element.find(".scrollable");
          e &&
            (i.isFunction(i.fn.themePluginScrollable) &&
              e.themePluginScrollable(),
            i.isFunction(i.fn.nanoScroller)) &&
            e.nanoScroller();
        };
      }
      initialize(e, t) {
        return (
          e.data(a) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        return this.options.wrapper.nanoScroller(this.options), this;
      }
    }
    (s.defaults = {
      contentClass: "scrollable-content",
      paneClass: "scrollable-pane",
      sliderClass: "scrollable-slider",
      alwaysVisible: !0,
      preventPageScrolling: !0,
    }),
      i.extend(e, { PluginScrollable: s }),
      (i.fn.themePluginScrollable = function (t) {
        return this.each(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      }),
      i(() => {
        s.updateModals();
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, d) => {
    let i = "__sectionScroll";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) ||
            ((this.$el = e), this.setData().setOptions(t).build().events()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = d.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let o = this,
          n =
            (this.options.wrapper,
            d("html").hasClass("side-header-overlay-full-screen")
              ? (o.$header = d(".sticky-wrapper"))
              : (o.$header = d("#header")),
            o.updateSectionsHeight(),
            d(this.options.targetClass).wrap(
              '<div class="section-wrapper"></div>'
            ),
            d(".section-wrapper").each(function () {
              d(this).height(d(this).find(".section-scroll").outerHeight());
            }),
            d(".section-wrapper").first().addClass("active"),
            !1),
          r = !1,
          l = "",
          t = 0,
          i,
          e =
            (d(window).on("touchstart", ({ changedTouches: e }) => {
              t = e[0].screenY;
            }),
            "onwheel" in document
              ? "wheel"
              : void 0 !== document.onmousewheel
              ? "mousewheel"
              : "DOMMouseScroll");
        return (
          d(window).width() < 992 &&
            d("html").hasClass("touch") &&
            (e =
              "onwheel" in document
                ? "wheel touchend"
                : void 0 !== document.onmousewheel
                ? "mousewheel touchend"
                : "DOMMouseScroll touchend"),
          d(window).width() < 992 &&
            (d("html").removeClass("overflow-hidden"),
            d(window).on("scroll", () => {
              let t = 0;
              d(".section-scroll").each(function () {
                var e;
                d(this).offset().top <= d(window).scrollTop() + 50 &&
                  ((e = d(".section-wrapper").eq(t).find(".section-scroll")),
                  d(".section-scroll-dots-navigation > ul > li").removeClass(
                    "active"
                  ),
                  d(".section-scroll-dots-navigation > ul > li")
                    .eq(t)
                    .addClass("active"),
                  d(window).trigger({
                    type: "section.scroll.mobile.change.header.color",
                    currentSection: e,
                  })),
                  t++;
              });
            }),
            d(window).on(
              "section.scroll.mobile.change.header.color",
              ({ currentSection: e }) => {
                void 0 !== e &&
                  ((e = e.data("section-scroll-header-color")),
                  d("#header .header-nav")
                    .removeClass("header-nav-light-text header-nav-dark-text")
                    .addClass("header-nav-" + e + "-text"),
                  d("#header .header-nav-features")
                    .removeClass(
                      "header-nav-features-dark header-nav-features-light"
                    )
                    .addClass("header-nav-features-" + e),
                  d("#header .header-social-icons")
                    .removeClass(
                      "social-icons-icon-dark social-icons-icon-light"
                    )
                    .addClass("social-icons-icon-" + e),
                  o.options.changeHeaderLogo &&
                    null != e &&
                    ("light" == e
                      ? d("#header .header-logo img").attr(
                          "src",
                          o.options.headerLogoLight
                        )
                      : "dark" == e &&
                        d("#header .header-logo img").attr(
                          "src",
                          o.options.headerLogoDark
                        )),
                  o.$header.css({ opacity: 1 }));
              }
            )),
          d(window).on(e, ({ target: a, originalEvent: e }) => {
            if (
              !(
                d(window).width() < 992 ||
                (d(window).width() < 992 &&
                  d("html").hasClass("touch") &&
                  (d(a).closest(".section-scroll-dots-navigation").get(0) ||
                    d(a).closest(".header-body").get(0) ||
                    d(a).closest(".owl-carousel").get(0))) ||
                d("html.side-header-overlay-full-screen.side-header-hide").get(
                  0
                )
              )
            ) {
              a = null == e.wheelDelta ? 0 < e.deltaY : e.wheelDelta < 0;
              if (
                !(
                  d(window).width() < 992 &&
                  d("html").hasClass("touch") &&
                  ((i = event.changedTouches[0].screenY) <= t && (l = "up"),
                  i >= t && (l = "down"),
                  i == t)
                )
              ) {
                let e = d(".section-wrapper")
                    .eq(o.getCurrentIndex())
                    .find(".section-scroll"),
                  t = o.getNextSection(a, l),
                  i;
                if (
                  ((i =
                    o.getCurrentIndex() == d(".section-wrapper").length - 1
                      ? d(document).height()
                      : t.offset().top),
                  d(window).width() < 992 &&
                    d("html").hasClass("touch") &&
                    setTimeout(() => {
                      d(".section-wrapper")
                        .eq(o.getCurrentIndex())
                        .find(".section-scroll")
                        .hasClass("section-scroll-scrollable")
                        ? d("html").removeClass("overflow-hidden")
                        : d("html").addClass("overflow-hidden");
                    }, 1200),
                  !e.hasClass("section-scroll-scrollable") || n || r)
                ) {
                  if (!n && !r) {
                    if (a || "up" == l) {
                      if (
                        o.getCurrentIndex() ==
                        d(".section-wrapper").length - 1
                      )
                        return !1;
                      o.changeSectionActiveState(t),
                        setTimeout(() => {
                          o.moveTo(t.offset().top);
                        }, 150);
                    } else {
                      if (0 == o.getCurrentIndex()) return !1;
                      o.changeSectionActiveState(t),
                        t.height() > d(window).height()
                          ? o.moveTo(e.offset().top - d(window).height())
                          : setTimeout(() => {
                              o.moveTo(t.offset().top);
                            }, 150);
                    }
                    o.changeDotsActiveState(),
                      o.$header.css({
                        opacity: 0,
                        transition: "ease opacity 500ms",
                      }),
                      t.css({
                        position: "relative",
                        opacity: 1,
                        "z-index": 1,
                        transform: "translate3d(0,0,0) scale(1)",
                      }),
                      e.css({
                        position: "fixed",
                        width: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        "z-index": 0,
                        transform: "translate3d(0,0,-10px) scale(0.7)",
                        transition: "ease transform 600ms, ease opacity 600ms",
                      }),
                      setTimeout(() => {
                        e.css({
                          position: "relative",
                          opacity: 1,
                          transform: "translate3d(0,0,-10px) scale(1)",
                        }),
                          d(window).trigger(
                            "section.scroll.change.header.color"
                          ),
                          setTimeout(() => {
                            n = !1;
                          }, 500);
                      }, 1e3),
                      (n = !0);
                  }
                } else {
                  if (a || "up" == l) {
                    if (d(window).scrollTop() + d(window).height() >= i) {
                      if (
                        ((n = !0),
                        setTimeout(() => {
                          d(window).trigger(
                            "section.scroll.change.header.color"
                          ),
                            setTimeout(() => {
                              n = !1;
                            }, 500);
                        }, 1e3),
                        o.getCurrentIndex() == d(".section-wrapper").length - 1)
                      )
                        return !1;
                      o.moveTo(e.offset().top + e.outerHeight()),
                        o.changeSectionActiveState(t),
                        o.$header.css({
                          opacity: 0,
                          transition: "ease opacity 500ms",
                        });
                    }
                    if (!d("html").hasClass("touch"))
                      for (var s = 1; s < 100; s++)
                        if (
                          (d("body, html").scrollTop(d(window).scrollTop() + 1),
                          d(window).scrollTop() + d(window).height() >= i)
                        ) {
                          (r = !0),
                            setTimeout(() => {
                              d(window).trigger(
                                "section.scroll.change.header.color"
                              ),
                                (r = !1);
                            }, 500);
                          break;
                        }
                  } else {
                    if (d(window).scrollTop() <= e.offset().top) {
                      if (
                        ((n = !0),
                        setTimeout(() => {
                          d(window).trigger(
                            "section.scroll.change.header.color"
                          ),
                            setTimeout(() => {
                              n = !1;
                            }, 500);
                        }, 1e3),
                        0 == o.getCurrentIndex())
                      )
                        return !1;
                      o.moveTo(e.offset().top - d(window).height()),
                        o.changeSectionActiveState(t),
                        o.$header.css({
                          opacity: 0,
                          transition: "ease opacity 500ms",
                        });
                    }
                    if (!d("html").hasClass("touch"))
                      for (s = 1; s < 100; s++)
                        if (
                          (d("body, html").scrollTop(d(window).scrollTop() - 1),
                          d(window).scrollTop() <= e.offset().top)
                        ) {
                          (r = !0),
                            setTimeout(() => {
                              d(window).trigger(
                                "section.scroll.change.header.color"
                              ),
                                (r = !1);
                            }, 500);
                          break;
                        }
                  }
                  o.changeDotsActiveState();
                }
              }
            }
          }),
          this.options.dotsNav && o.dotsNavigation(),
          setTimeout(() => {
            if (d(window.location.hash).get(0))
              o.moveTo(d(window.location.hash).parent().offset().top),
                o.changeSectionActiveState(d(window.location.hash));
            else {
              var t = window.location.hash;
              let e = t.replace("#", "");
              t || (e = 1),
                o.moveTo(
                  d(".section-wrapper")
                    .eq(e - 1)
                    .offset().top
                ),
                o.changeSectionActiveState(
                  d(".section-wrapper")
                    .eq(e - 1)
                    .find(".section-scroll")
                );
            }
            o.changeDotsActiveState(),
              o.updateHash(!0),
              d(window).trigger("section.scroll.ready"),
              d(window).trigger("section.scroll.change.header.color");
          }, 500),
          this
        );
      }
      updateSectionsHeight() {
        return (
          d(".section-scroll").css({ height: "" }),
          d(".section-scroll").each(function () {
            d(this).outerHeight() < d(window).height() + 3
              ? d(this).css({ height: "100vh" })
              : d(this).addClass("section-scroll-scrollable");
          }),
          d(".section-wrapper").each(function () {
            d(this).height(d(this).find(".section-scroll").outerHeight());
          }),
          this
        );
      }
      updateHash(e) {
        return (
          window.location.hash
            ? e ||
              ((e = (e = d(".section-wrapper")
                .eq(this.getCurrentIndex())
                .find(".section-scroll")).attr("id")
                ? e.attr("id")
                : e.parent().index() + 1),
              (window.location.hash = e))
            : (window.location.hash = 1),
          this
        );
      }
      getCurrentIndex() {
        return d(".section-wrapper.active").index();
      }
      moveTo(e, t) {
        let i = this;
        return (
          d("body, html").animate({ scrollTop: e }, 1e3, "easeOutQuint"),
          setTimeout(() => {
            i.updateHash();
          }, 500),
          this
        );
      }
      getNextSection(e, t) {
        let i = "";
        return (i = (
          e || "up" == t
            ? d(".section-wrapper").eq(this.getCurrentIndex() + 1)
            : d(".section-wrapper").eq(this.getCurrentIndex() - 1)
        ).find(".section-scroll"));
      }
      changeSectionActiveState(e) {
        return (
          d(".section-wrapper").removeClass("active"),
          e.parent().addClass("active"),
          this
        );
      }
      changeDotsActiveState() {
        return (
          d(".section-scroll-dots-navigation > ul > li").removeClass("active"),
          d(".section-scroll-dots-navigation > ul > li")
            .eq(this.getCurrentIndex())
            .addClass("active"),
          this
        );
      }
      dotsNavigation() {
        let i = this;
        var t = d(
            '<div class="section-scroll-dots-navigation"><ul class="list list-unstyled"></ul></div>'
          ),
          a = i.getCurrentIndex();
        i.options.dotsClass && t.addClass(i.options.dotsClass);
        for (let e = 0; e < d(".section-scroll").length; e++) {
          var s = d(".section-wrapper")
            .eq(e)
            .find(".section-scroll")
            .data("section-scroll-title");
          t.find("> ul").append(
            "<li" +
              (a == e ? ' class="active"' : "") +
              '><a href="#' +
              e +
              '" data-nav-id="' +
              e +
              '"><span>' +
              s +
              "</span></a></li>"
          );
        }
        return (
          d(".body").append(t),
          t.find("a[data-nav-id]").on("click touchstart", function (e) {
            e.preventDefault();
            let t = d(this);
            d(".section-scroll").css({
              opacity: 0,
              transition: "ease opacity 300ms",
            }),
              i.$header.css({ opacity: 0, transition: "ease opacity 500ms" }),
              setTimeout(() => {
                i.moveTo(
                  d(".section-wrapper").eq(t.data("nav-id")).offset().top
                ),
                  d(".section-wrapper").removeClass("active"),
                  d(".section-wrapper").eq(t.data("nav-id")).addClass("active"),
                  d(".section-wrapper")
                    .eq(i.getCurrentIndex())
                    .find(".section-scroll")
                    .css({ opacity: 1 }),
                  setTimeout(() => {
                    d(".section-scroll").css({ opacity: 1 }),
                      d(window).trigger("section.scroll.change.header.color");
                  }, 500),
                  991 < d(window).width() && i.changeDotsActiveState();
              }, 500);
          }),
          this
        );
      }
      events() {
        let t = this;
        return (
          d(window).on("section.scroll.ready", () => {
            d(window).scrollTop(0);
          }),
          d(window).on("section.scroll.change.header.color", () => {
            var e = d(".section-wrapper")
              .eq(t.getCurrentIndex())
              .find(".section-scroll")
              .data("section-scroll-header-color");
            d("#header .header-nav")
              .removeClass("header-nav-light-text header-nav-dark-text")
              .addClass("header-nav-" + e + "-text"),
              d("#header .header-nav-features")
                .removeClass(
                  "header-nav-features-dark header-nav-features-light"
                )
                .addClass("header-nav-features-" + e),
              d("#header .header-social-icons")
                .removeClass("social-icons-icon-dark social-icons-icon-light")
                .addClass("social-icons-icon-" + e),
              t.options.changeHeaderLogo &&
                null != e &&
                ("light" == e
                  ? d("#header .header-logo img").attr(
                      "src",
                      t.options.headerLogoLight
                    )
                  : "dark" == e &&
                    d("#header .header-logo img").attr(
                      "src",
                      t.options.headerLogoDark
                    )),
              t.$header.css({ opacity: 1 });
          }),
          d(document).ready(() => {
            d(window).afterResize(() => {
              t.updateSectionsHeight(),
                d(window).width() < 992 &&
                  d("html").removeClass("overflow-hidden");
            });
          }),
          this
        );
      }
    }
    (a.defaults = {
      targetClass: ".section",
      dotsNav: !0,
      changeHeaderLogo: !0,
      headerLogoDark: "img/logo-default-slim.png",
      headerLogoLight: "img/logo-default-slim-dark.png",
    }),
      d.extend(e, { PluginSectionScroll: a }),
      (d.fn.themePluginSectionScroll = function (t) {
        return this.map(function () {
          var e = d(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, s) => {
    let i = "__sort";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = s.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (s.isFunction(s.fn.isotope)) {
          let i = this,
            e = this.options.wrapper,
            t = s(
              '.sort-destination[data-sort-id="' + e.attr("data-sort-id") + '"]'
            );
          s(window);
          t.get(0) &&
            ((i.$source = e),
            (i.$destination = t),
            (i.$loader = !1),
            i.setParagraphHeight(t),
            i.$destination.parents(".sort-destination-loader").get(0) &&
              ((i.$loader = i.$destination.parents(".sort-destination-loader")),
              i.createLoader()),
            t.attr("data-filter", "*"),
            t.one("layoutComplete", (e, t) => {
              i.removeLoader(),
                s("[data-plugin-sticky]").length &&
                  setTimeout(() => {
                    s("[data-plugin-sticky]").each(function () {
                      s(this).data("__sticky").build(),
                        s(window).trigger("resize");
                    });
                  }, 500);
            }),
            s("#" + i.options.filterFieldId).length &&
              s("#" + i.options.filterFieldId).keyup(function () {
                (i.options.filterFieldText = s(this).val()),
                  i.setFilter(i.options.filter);
              }),
            t.waitForImages(() => {
              t.isotope(i.options), i.events();
            }),
            setTimeout(() => {
              i.removeLoader();
            }, 3e3));
        }
        return this;
      }
      events() {
        let t = this,
          i,
          e = s(window);
        return (
          t.$source.find("a").click(function (e) {
            return (
              e.preventDefault(),
              (i = s(this).parent().data("option-value")),
              t.setFilter(i),
              e.originalEvent && t.$source.trigger("filtered"),
              this
            );
          }),
          t.$destination.trigger("filtered"),
          t.$source.trigger("filtered"),
          t.options.useHash && t.hashEvents(),
          e.on("resize sort.resize", () => {
            setTimeout(() => {
              t.$destination.isotope("layout");
            }, 300);
          }),
          setTimeout(() => {
            e.trigger("sort.resize");
          }, 300),
          this
        );
      }
      setFilter(e) {
        let i = this;
        let t = e;
        return (
          i.$source.find(".active").removeClass("active"),
          i.$source
            .find(
              'li[data-option-value="' +
                e +
                '"], li[data-option-value="' +
                e +
                '"] > a'
            )
            .addClass("active"),
          (i.options.filter = t),
          i.$destination.attr("data-current-page") &&
            (t =
              t +
              "[data-page-rel=" +
              i.$destination.attr("data-current-page") +
              "]"),
          "" != i.options.filterFieldText &&
            (t =
              t +
              "[data-sort-search*=" +
              i.options.filterFieldText.toLowerCase() +
              "]"),
          i.$destination
            .attr("data-filter", e)
            .isotope({ filter: t })
            .one("arrangeComplete", (e, t) => {
              !i.options.useHash ||
                ("" == window.location.hash &&
                  "*" == i.options.filter.replace(".", "")) ||
                (window.location.hash = i.options.filter.replace(".", "")),
                s(window).trigger("scroll");
            })
            .trigger("filtered"),
          this
        );
      }
      hashEvents() {
        let t = this,
          i,
          a,
          e = "." + location.hash.replace("#", "");
        return (
          "." != (e = s(location.hash).length ? "." : e) &&
            ".*" != e &&
            t.setFilter(e),
          s(window).on("hashchange", (e) => {
            (a = "." + location.hash.replace("#", "")),
              (i = "." == a || ".*" == a ? "*" : a),
              t.setFilter(i);
          }),
          this
        );
      }
      setParagraphHeight() {
        let e = 0;
        var t = s("span.thumb-info-caption p", this.$destination);
        return (
          t.each(function () {
            s(this).height() > e && (e = s(this).height() + 10);
          }),
          t.height(e),
          this
        );
      }
      createLoader() {
        var e = [
          '<div class="bounce-loader">',
          '<div class="bounce1"></div>',
          '<div class="bounce2"></div>',
          '<div class="bounce3"></div>',
          "</div>",
        ].join("");
        return this.$loader.append(e), this;
      }
      removeLoader() {
        let e = this;
        e.$loader &&
          (e.$loader.removeClass("sort-destination-loader-showing"),
          setTimeout(() => {
            e.$loader.addClass("sort-destination-loader-loaded");
          }, 300));
      }
    }
    (a.defaults = {
      useHash: !0,
      itemSelector: ".isotope-item",
      layoutMode: "masonry",
      filter: "*",
      filterFieldId: !1,
      filterFieldText: "",
      hiddenStyle: { opacity: 0 },
      visibleStyle: { opacity: 1 },
      stagger: 30,
      isOriginLeft: "rtl" != s("html").attr("dir"),
    }),
      s.extend(e, { PluginSort: a }),
      (s.fn.themePluginSort = function (t) {
        return this.map(function () {
          var e = s(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    let a = "__starrating";
    class s {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (this.$el = e), this.setData().setOptions(t).build(), this;
      }
      setData() {
        return this.$el.data(a, this), this;
      }
      setOptions(e) {
        return (
          (this.options = i.extend(!0, {}, s.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        var e;
        return (
          i.isFunction(i.fn.rating) &&
            ((e = this).options.wrapper.rating(e.options),
            e.options.wrapper
              .parents(".rating-container")
              .addClass("rating-" + e.options.color),
            e.options.extraClass) &&
            e.options.wrapper
              .parents(".rating-container")
              .addClass(e.options.extraClass),
          this
        );
      }
    }
    (s.defaults = {
      theme: "krajee-fas",
      color: "primary",
      showClear: !1,
      showCaption: !1,
    }),
      i.extend(e, { PluginStarRating: s }),
      (i.fn.themePluginStarRating = function (t) {
        return this.map(function () {
          var e = i(this);
          return e.data(a) ? e.data(a) : new s(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, r) => {
    let i = "__sticky";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) ||
            ((this.$el = e), this.setData().setOptions(t).build().events()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = r.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        if (r.isFunction(r.fn.pin)) {
          let e = this,
            t = r(window);
          if (
            (e.options.wrapper.pin(e.options),
            e.options.wrapper.hasClass("sticky-wrapper-transparent") &&
              e.options.wrapper.parent().addClass("position-absolute w-100"),
            t.afterResize(() => {
              e.options.wrapper.removeAttr("style").removeData("pin"),
                e.options.wrapper.pin(e.options),
                t.trigger("scroll");
            }),
            e.options.wrapper.find("img").attr("data-change-src"))
          ) {
            let t = e.options.wrapper.find("img"),
              i = t.attr("src"),
              a = t.attr("data-change-src");
            e.changeLogoSrc = (e) => {
              e ? t.attr("src", a) : t.attr("src", i);
            };
          }
        }
        return this;
      }
      events() {
        let e = this,
          t = r(window),
          i = e.options.wrapper.find("img"),
          a = e.options.wrapper.hasClass("sticky-wrapper-effect-1")
            ? "sticky-effect-active"
            : "sticky-active",
          s = !0,
          o = !1,
          n =
            (t.on("scroll sticky.effect.active", () => {
              e.options.wrapper.hasClass(a)
                ? s &&
                  (i.attr("data-change-src") && e.changeLogoSrc(!0),
                  (s = !1),
                  (o = !0))
                : o &&
                  (i.attr("data-change-src") && e.changeLogoSrc(!1),
                  (o = !1),
                  (s = !0));
            }),
            !1);
        e.options.stickyStartEffectAt &&
          (e.options.stickyStartEffectAt < t.scrollTop() &&
            (e.options.wrapper.addClass("sticky-effect-active"),
            t.trigger("sticky.effect.active")),
          t.on("scroll", () => {
            e.options.stickyStartEffectAt < t.scrollTop()
              ? (e.options.wrapper.addClass("sticky-effect-active"),
                (n = !0),
                t.trigger("sticky.effect.active"))
              : (n &&
                  (e.options.wrapper
                    .find(".sticky-body")
                    .addClass("position-fixed"),
                  (n = !1)),
                0 == t.scrollTop() &&
                  e.options.wrapper
                    .find(".sticky-body")
                    .removeClass("position-fixed"),
                e.options.wrapper.removeClass("sticky-effect-active"));
          })),
          r('[data-bs-toggle="collapse"]').get(0) &&
            r('[data-bs-toggle="collapse"]').on("click", () => {
              setTimeout(() => {
                e.build(), r(window).trigger("scroll");
              }, 1e3);
            }),
          document.addEventListener("visibilitychange", () => {
            r(window).trigger("resize");
          }),
          setInterval(() => {
            r(window).trigger("resize");
          }, 1e3);
      }
    }
    (a.defaults = { minWidth: 991, activeClass: "sticky-active" }),
      r.extend(e, { PluginSticky: a }),
      (r.fn.themePluginSticky = function (t) {
        return this.map(function () {
          var e = r(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, p) => {
    let i = "__toggle";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          e.data(i) || ((this.$el = e), this.setData().setOptions(t).build()),
          this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = p.extend(!0, {}, a.defaults, e, {
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let e = this;
        var t = this.options.wrapper.find("> .toggle");
        let i = null;
        return (
          t.each(function () {
            (i = p(this)).hasClass("active") &&
              (i.find("> p").addClass("preview-active"),
              i.find("> .toggle-content").slideDown(e.options.duration)),
              e.events(i);
          }),
          e.options.isAccordion &&
            (e.options.duration = e.options.duration / 2),
          this
        );
      }
      events(e) {
        let n = this,
          r,
          l = 0,
          d = null;
        e.find("> label, > .toggle-title").click(function ({
          originalEvent: e,
        }) {
          var t = p(this),
            i = t.parent(),
            a = t.parents(".toggle");
          let s = null,
            o = null;
          (n.options.isAccordion &&
            void 0 !== e &&
            (o = a.find(
              ".toggle.active > label, .toggle.active > .toggle-title"
            ))[0] == t[0]) ||
            (i.toggleClass("active"),
            i.find("> p").get(0) &&
              ((s = i.find("> p")),
              (r = s.css("height")),
              s.css("height", "auto"),
              (l = s.css("height")),
              s.css("height", r)),
            (d = i.find("> .toggle-content")),
            i.hasClass("active")
              ? (p(s).animate({ height: l }, n.options.duration, function () {
                  p(this).addClass("preview-active");
                }),
                d.slideDown(n.options.duration, () => {
                  o && o.trigger("click");
                }))
              : (p(s).animate({ height: 0 }, n.options.duration, function () {
                  p(this).removeClass("preview-active");
                }),
                d.slideUp(n.options.duration)));
        });
      }
    }
    (a.defaults = { duration: 350, isAccordion: !1 }),
      p.extend(e, { PluginToggle: a }),
      (p.fn.themePluginToggle = function (t) {
        return this.map(function () {
          var e = p(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, i) => {
    i.extend(e, {
      PluginValidation: {
        defaults: {
          formClass: "needs-validation",
          validator: {
            highlight(e) {
              i(e)
                .addClass("is-invalid")
                .removeClass("is-valid")
                .parent()
                .removeClass("has-success")
                .addClass("has-danger");
            },
            success(e, t) {
              i(t)
                .removeClass("is-invalid")
                .addClass("is-valid")
                .parent()
                .removeClass("has-danger")
                .addClass("has-success")
                .find("label.error")
                .remove();
            },
            errorPlacement(e, t) {
              "radio" == t.attr("type") || "checkbox" == t.attr("type")
                ? e.appendTo(t.parent().parent())
                : e.insertAfter(t);
            },
          },
        },
        initialize(e) {
          return (initialized = !0), this.setOptions(e).build(), this;
        },
        setOptions(e) {
          return (this.options = i.extend(!0, {}, this.defaults, e)), this;
        },
        build() {
          return (
            i.isFunction(i.validator) &&
              (this.setMessageGroups(),
              i.validator.setDefaults(this.options.validator),
              i("." + this.options.formClass).validate()),
            this
          );
        },
        setMessageGroups() {
          i(
            ".checkbox-group[data-msg-required], .radio-group[data-msg-required]"
          ).each(function () {
            var e = i(this).data("msg-required");
            i(this).find("input").attr("data-msg-required", e);
          });
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((e = {}, s) => {
    let i = "__videobackground";
    class a {
      constructor(e, t) {
        return this.initialize(e, t);
      }
      initialize(e, t) {
        return (
          (this.$el = e), this.setData().setOptions(t).build().events(), this
        );
      }
      setData() {
        return this.$el.data(i, this), this;
      }
      setOptions(e) {
        return (
          (this.options = s.extend(!0, {}, a.defaults, e, {
            path: this.$el.data("video-path"),
            wrapper: this.$el,
          })),
          this
        );
      }
      build() {
        let a = this;
        if (s.isFunction(s.fn.vide) && this.options.path) {
          var e;
          this.options.overlay &&
            ((e = this.options.overlayClass),
            this.options.wrapper.prepend(s("<div />").addClass(e))),
            this.options.wrapper
              .vide(this.options.path, this.options)
              .first()
              .css("z-index", 0),
            a.changePoster(),
            a.options.wrapper.closest(".owl-carousel").get(0) &&
              a.options.wrapper
                .closest(".owl-carousel")
                .on("initialized.owl.carousel", () => {
                  s(".owl-item.cloned")
                    .find("[data-plugin-video-background] .vide-video-wrapper")
                    .remove(),
                    s(".owl-item.cloned")
                      .find("[data-plugin-video-background]")
                      .vide(a.options.path, a.options)
                      .first()
                      .css("z-index", 0),
                    a.changePoster(a.options.wrapper.closest(".owl-carousel"));
                });
          let i = a.options.wrapper.find(".video-background-play");
          if (i.get(0)) {
            let t = a.options.wrapper.find(".video-background-play-wrapper");
            a.options.wrapper
              .find(".video-background-play")
              .on("click", (e) => {
                e.preventDefault(),
                  t.get(0)
                    ? t.animate({ opacity: 0 }, 300, () => {
                        t.parent().height(t.outerHeight()), t.remove();
                      })
                    : i.animate({ opacity: 0 }, 300, () => {
                        i.remove();
                      }),
                  setTimeout(() => {
                    a.options.wrapper.find("video")[0].play();
                  }, 500);
              });
          }
          s(window).trigger("vide.video.inserted.on.dom");
        }
        return this;
      }
      changePoster(e) {
        var t = this;
        return (
          e && t.options.changePoster
            ? e
                .find(
                  ".owl-item [data-plugin-video-background] .vide-video-wrapper"
                )
                .css({
                  "background-image": "url(" + t.options.changePoster + ")",
                })
            : t.options.changePoster &&
              t.options.wrapper.find(".vide-video-wrapper").css({
                "background-image": "url(" + t.options.changePoster + ")",
              }),
          this
        );
      }
      events() {
        let e = this;
        return (
          e.options.wrapper.on("video.background.initialize", () => {
            e.build();
          }),
          this
        );
      }
    }
    (a.defaults = {
      overlay: !1,
      volume: 1,
      playbackRate: 1,
      muted: !0,
      loop: !0,
      autoplay: !0,
      position: "50% 50%",
      posterType: "detect",
      className: "vide-video-wrapper",
    }),
      s.extend(e, { PluginVideoBackground: a }),
      (s.fn.themePluginVideoBackground = function (t) {
        return this.map(function () {
          var e = s(this);
          return e.data(i) ? e.data(i) : new a(e, t);
        });
      });
  }).apply(this, [window.theme, jQuery]),
  ((t = {}, i) => {
    let a = !1;
    i.extend(t, {
      Account: {
        defaults: { wrapper: i("#headerAccount") },
        initialize(e, t) {
          return (
            a ||
              ((a = !0),
              (this.$wrapper = e || this.defaults.wrapper),
              this.setOptions(t).events()),
            this
          );
        },
        setOptions(e) {
          return (
            (this.options = i.extend(
              !0,
              {},
              this.defaults,
              e,
              t.fn.getOptions(this.$wrapper.data("plugin-options"))
            )),
            this
          );
        },
        events() {
          let t = this;
          i(window).on("load", () => {
            i(document).ready(() => {
              setTimeout(() => {
                t.$wrapper.find("input").on("focus", () => {
                  t.$wrapper.addClass("open"),
                    i(document).mouseup(({ target: e }) => {
                      t.$wrapper.is(e) ||
                        0 !== t.$wrapper.has(e).length ||
                        t.$wrapper.removeClass("open");
                    });
                });
              }, 1500);
            });
          }),
            i("#headerSignUp").on("click", (e) => {
              e.preventDefault(),
                t.$wrapper
                  .addClass("signup")
                  .removeClass("signin")
                  .removeClass("recover"),
                t.$wrapper.find(".signup-form input:first").focus();
            }),
            i("#headerSignIn").on("click", (e) => {
              e.preventDefault(),
                t.$wrapper
                  .addClass("signin")
                  .removeClass("signup")
                  .removeClass("recover"),
                t.$wrapper.find(".signin-form input:first").focus();
            }),
            i("#headerRecover").on("click", (e) => {
              e.preventDefault(),
                t.$wrapper
                  .addClass("recover")
                  .removeClass("signup")
                  .removeClass("signin"),
                t.$wrapper.find(".recover-form input:first").focus();
            }),
            i("#headerRecoverCancel").on("click", (e) => {
              e.preventDefault(),
                t.$wrapper
                  .addClass("signin")
                  .removeClass("signup")
                  .removeClass("recover"),
                t.$wrapper.find(".signin-form input:first").focus();
            });
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((t = {}, p) => {
    let a = !1;
    p.extend(t, {
      Nav: {
        defaults: {
          wrapper: p("#mainNav"),
          scrollDelay: 600,
          scrollAnimation: "easeOutQuad",
        },
        initialize(e, t) {
          return (
            a ||
              ((a = !0),
              (this.$wrapper = e || this.defaults.wrapper),
              this.setOptions(t).build().events()),
            this
          );
        },
        setOptions(e) {
          return (
            (this.options = p.extend(
              !0,
              {},
              this.defaults,
              e,
              t.fn.getOptions(this.$wrapper.data("plugin-options"))
            )),
            this
          );
        },
        build() {
          let t = this;
          var e = p("html"),
            a = p("#header"),
            s = p("#header .header-nav-main");
          let o;
          if (
            (t.$wrapper.find("a[data-thumb-preview]").length &&
              t.$wrapper.find("a[data-thumb-preview]").each(function () {
                (o = p("<span />")
                  .addClass("thumb-info thumb-info-preview")
                  .append(
                    p("<span />")
                      .addClass("thumb-info-wrapper")
                      .append(
                        p("<span />")
                          .addClass("thumb-info-image")
                          .css(
                            "background-image",
                            "url(" + p(this).data("thumb-preview") + ")"
                          )
                      )
                  )),
                  p(this).append(o);
              }),
            e.hasClass("side-header") ||
              e.hasClass("side-header-hamburguer-sidebar"))
          )
            (!e.hasClass("side-header-right") &&
              !e.hasClass("side-header-hamburguer-sidebar-right")) ||
              e.hasClass("side-header-right-no-reverse") ||
              a.find(".dropdown-submenu").addClass("dropdown-reverse");
          else {
            let e = !1;
            (t.checkReverse = () => {
              e ||
                (t.$wrapper
                  .find(".dropdown, .dropdown-submenu")
                  .removeClass("dropdown-reverse"),
                t.$wrapper
                  .find(
                    ".dropdown:not(.manual):not(.dropdown-mega), .dropdown-submenu:not(.manual)"
                  )
                  .each(function () {
                    p(this)
                      .find(".dropdown-menu")
                      .visible(!1, !0, "horizontal") ||
                      p(this).addClass("dropdown-reverse");
                  }),
                (e = !0));
            }),
              p(window).on("resize", () => {
                e = !1;
              }),
              a.on("mouseover", () => {
                t.checkReverse();
              });
          }
          if (
            (s.hasClass("header-nav-main-clone-items") &&
              s.find("nav > ul > li > a").each(function () {
                var e = p(this).parent(),
                  t = p(this).clone(),
                  i = p(this).clone(),
                  a = p('<span class="wrapper-items-cloned"></span>');
                p(this).addClass("item-original"),
                  i.addClass("item-two"),
                  e.prepend(a),
                  a.append(t).append(i);
              }),
            p("#header.header-floating-icons").length &&
              991 < p(window).width() &&
              {
                $menuFloating: p(
                  "#header.header-floating-icons .header-container > .header-row"
                ),
                build() {
                  this.init();
                },
                init() {
                  let i = this,
                    a;
                  p(window).scroll(function () {
                    var e =
                        (100 * p(window).scrollTop()) /
                        (p(document).height() - p(window).height()),
                      t = p(this).scrollTop();
                    (a = p(document).height() / p(window).height()),
                      i.$menuFloating.find(".header-column > .header-row").css({
                        transform:
                          "translateY( calc(" + e + "vh - " + t / a + "px) )",
                      });
                  });
                },
              }.build(),
            p(".header-nav-links-vertical-slide").length)
          ) {
            let e = {
              $mainNav: p("#mainNav"),
              $mainNavItem: p("#mainNav li"),
              build() {
                this.menuNav();
              },
              menuNav() {
                this.$mainNavItem.on("click", function (e) {
                  var t = p(this),
                    a = p(this).parent(),
                    s = p(this).find("ul").first(),
                    o = p(this).closest(".next-menu"),
                    n =
                      t.hasClass("dropdown") || t.hasClass("dropdown-submenu"),
                    t = t.hasClass("back-button"),
                    r =
                      s.find("> li").length * s.find("> li").outerHeight() -
                      s.outerHeight(),
                    l =
                      o.find("> li").length * o.find("> li").outerHeight() -
                      o.outerHeight();
                  if (n) {
                    for (
                      a.addClass("next-menu"),
                        s.addClass("visible"),
                        a.css({ overflow: "visible", "overflow-y": "visible" }),
                        0 < r &&
                          s.css({ overflow: "hidden", "overflow-y": "scroll" }),
                        i = 0;
                      i < s.find("> li").length;
                      i++
                    )
                      s.outerHeight() <
                        p(".header-row-side-header").outerHeight() - 100 &&
                        s.css({
                          height:
                            s.outerHeight() + s.find("> li").outerHeight(),
                        });
                    s.css({ "padding-top": r + "px" });
                  }
                  t &&
                    (a.parent().parent().removeClass("next-menu"),
                    a.removeClass("visible"),
                    0 < l) &&
                    o.css({ overflow: "hidden", "overflow-y": "scroll" }),
                    e.stopPropagation();
                });
              },
            };
            p(window).trigger("resize"),
              991 < p(window).width() && e.build(),
              p(document).ready(() => {
                p(window).afterResize(() => {
                  991 < p(window).width() && e.build();
                });
              });
          }
          if (
            (p(".header-nav-main-mobile-dark").length &&
              p(
                "#header:not(.header-transparent-dark-bottom-border):not(.header-transparent-light-bottom-border)"
              ).addClass("header-no-border-bottom"),
            991 < p(window).width())
          ) {
            let e = !1;
            a.find(".header-nav-main nav > ul > li > a").on(
              "focus",
              function () {
                991 < p(window).width() &&
                  (e ||
                    ((e = !0),
                    p(this).trigger("blur"),
                    t.focusMenuWithChildren()));
              }
            );
          }
          return this;
        },
        focusMenuWithChildren() {
          var e, t;
          let i;
          var a = document.querySelector(
            "html:not(.side-header):not(.side-header-hamburguer-sidebar):not(.side-header-overlay-full-screen) .header-nav-main > nav"
          );
          if (!a) return !1;
          for (e = a.getElementsByTagName("a"), i = 0, t = e.length; i < t; i++)
            e[i].addEventListener("focus", s, !0),
              e[i].addEventListener("blur", s, !0);
          function s() {
            let e = this;
            for (; !e.className.includes("header-nav-main"); )
              "li" === e.tagName.toLowerCase() &&
                (e.className.includes("accessibility-open")
                  ? (e.className = e.className.replace(
                      " accessibility-open",
                      ""
                    ))
                  : (e.className += " accessibility-open")),
                (e = e.parentElement);
          }
        },
        events() {
          let n = this,
            r = p("html"),
            i = p("#header"),
            l = p(window),
            a = p(".header-body").outerHeight(),
            e =
              ((i = i.hasClass("header") ? p(".header") : i)
                .find('a[href="#"]')
                .on("click", (e) => {
                  e.preventDefault();
                }),
              r.hasClass("side-header-hamburguer-sidebar")
                ? i
                    .find(".dropdown-toggle, .dropdown-submenu > a")
                    .append(
                      '<i class="fas fa-chevron-down fa-chevron-right"></i>'
                    )
                : i
                    .find(".dropdown-toggle, .dropdown-submenu > a")
                    .append('<i class="fas fa-chevron-down"></i>'),
              i
                .find(
                  '.dropdown-toggle[href="#"], .dropdown-submenu a[href="#"], .dropdown-toggle[href!="#"] .fa-chevron-down, .dropdown-submenu a[href!="#"] .fa-chevron-down'
                )
                .on("click", function (e) {
                  e.preventDefault(),
                    l.width() < 992 &&
                      (p(this).closest("li").toggleClass("open"),
                      (e =
                        i.hasClass("header-effect-shrink") &&
                        r.hasClass("sticky-header-active")
                          ? t.StickyHeader.options.stickyHeaderContainerHeight
                          : a),
                      p(".header-body").animate(
                        {
                          height:
                            p(".header-nav-main nav").outerHeight(!0) + e + 10,
                        },
                        0
                      ));
                }),
              i.find("li a.active").addClass("current-page-active"),
              i
                .find(
                  '.header-nav-click-to-open .dropdown-toggle[href="#"], .header-nav-click-to-open .dropdown-submenu a[href="#"], .header-nav-click-to-open .dropdown-toggle > i'
                )
                .on("click", function (e) {
                  if (
                    (!p("html").hasClass("side-header-hamburguer-sidebar") &&
                      991 < l.width() &&
                      (e.preventDefault(), e.stopPropagation()),
                    991 < l.width())
                  ) {
                    if (
                      (e.preventDefault(),
                      e.stopPropagation(),
                      i.find("li a.active").removeClass("active"),
                      ("I" == p(this).prop("tagName")
                        ? p(this).parent()
                        : p(this)
                      ).addClass("active"),
                      p(this).closest("li").hasClass("open"))
                    )
                      p(this).closest("li").removeClass("open"),
                        i.find("li a.active").removeClass("active"),
                        i.find("li a.current-page-active").addClass("active");
                    else {
                      let t = p(this).closest("li"),
                        e = !1;
                      "I" == p(this).prop("tagName") &&
                        (p("#header .dropdown.open").removeClass("open"),
                        p(
                          "#header .dropdown-menu .dropdown-submenu.open"
                        ).removeClass("open")),
                        p(this).parent().hasClass("dropdown-submenu") &&
                          (e = !0),
                        p(this)
                          .closest(".dropdown-menu")
                          .find(".dropdown-submenu.open")
                          .removeClass("open"),
                        p(this)
                          .parent(".dropdown")
                          .parent()
                          .find(".dropdown.open")
                          .removeClass("open"),
                        e ||
                          p(this)
                            .parent()
                            .find(".dropdown-submenu.open")
                            .removeClass("open"),
                        t.addClass("open"),
                        p(document)
                          .off("click.nav-click-to-open")
                          .on("click.nav-click-to-open", ({ target: e }) => {
                            t.is(e) ||
                              0 !== t.has(e).length ||
                              (t.removeClass("open"),
                              t.parents(".open").removeClass("open"),
                              i.find("li a.active").removeClass("active"),
                              i
                                .find("li a.current-page-active")
                                .addClass("active"));
                          });
                    }
                    l.trigger({
                      type: "resize",
                      from: "header-nav-click-to-open",
                    });
                  }
                }),
              i.find("[data-collapse-nav]").on("click", function (e) {
                p(this).parents(".collapse").removeClass("show");
              }),
              i.find(".header-nav-features-toggle").on("click", function (e) {
                e.preventDefault();
                let t = p(this).parent();
                p(this)
                  .siblings(".header-nav-features-dropdown")
                  .hasClass("show")
                  ? p(this)
                      .siblings(".header-nav-features-dropdown")
                      .removeClass("show")
                  : ((e = p(this).siblings(".header-nav-features-dropdown")),
                    p(".header-nav-features-dropdown.show").removeClass("show"),
                    e.addClass("show"),
                    p(document)
                      .off("click.header-nav-features-toggle")
                      .on(
                        "click.header-nav-features-toggle",
                        ({ target: e }) => {
                          t.is(e) ||
                            0 !== t.has(e).length ||
                            p(".header-nav-features-dropdown.show").removeClass(
                              "show"
                            );
                        }
                      ),
                    p(this).attr("data-focus") &&
                      p("#" + p(this).attr("data-focus")).focus());
              }),
              p(".hamburguer-btn:not(.side-panel-toggle)")),
            d = p(
              "#header.side-header, #header.side-header-overlay-full-screen"
            );
          if (
            (e.on("click", function () {
              "false" != p(this).attr("data-set-active") &&
                p(this).toggleClass("active"),
                d.toggleClass("side-header-hide"),
                r.toggleClass("side-header-hide"),
                l.trigger("resize");
            }),
            p(".toggle-side-header").on("click", () => {
              p(".hamburguer-btn-side-header.active").trigger("click");
            }),
            p(".hamburguer-close:not(.side-panel-toggle)").on("click", () => {
              p(
                ".hamburguer-btn:not(.hamburguer-btn-side-header-mobile-show)"
              ).trigger("click");
            }),
            p(".header-nav-main nav").on("show.bs.collapse", function () {
              p(this).removeClass("closed"),
                p("html").addClass("mobile-menu-opened"),
                p(".header-body").animate({
                  height:
                    p(".header-body").outerHeight() +
                    p(".header-nav-main nav").outerHeight(!0) +
                    10,
                }),
                p("#header").is(
                  ".header-bottom-slider, .header-below-slider"
                ) &&
                  !p("html").hasClass("sticky-header-active") &&
                  n.scrollToTarget(p("#header"), 0);
            }),
            p(".header-nav-main nav").on("hide.bs.collapse", function () {
              p(this).addClass("closed"),
                p("html").removeClass("mobile-menu-opened"),
                p(".header-body").animate(
                  {
                    height:
                      p(".header-body").outerHeight() -
                      p(".header-nav-main nav").outerHeight(!0),
                  },
                  function () {
                    p(this).height("auto");
                  }
                );
            }),
            l.on("stickyHeader.activate", () => {
              l.width() < 992 &&
                i.hasClass("header-effect-shrink") &&
                "true" == p(".header-btn-collapse-nav").attr("aria-expanded") &&
                p(".header-body").animate({
                  height:
                    p(".header-nav-main nav").outerHeight(!0) +
                    t.StickyHeader.options.stickyHeaderContainerHeight +
                    (p(".header-nav-bar").length
                      ? p(".header-nav-bar").outerHeight()
                      : 0),
                });
            }),
            l.on("stickyHeader.deactivate", () => {
              l.width() < 992 &&
                i.hasClass("header-effect-shrink") &&
                "true" == p(".header-btn-collapse-nav").attr("aria-expanded") &&
                p(".header-body").animate({
                  height: a + p(".header-nav-main nav").outerHeight(!0) + 10,
                });
            }),
            l.on("resize.removeOpen", ({ from: e }) => {
              "header-nav-click-to-open" != e &&
                setTimeout(() => {
                  991 < l.width() &&
                    i.find(".dropdown.open").removeClass("open");
                }, 100);
            }),
            p(document).ready(() => {
              if (991 < l.width()) {
                let t = !1;
                l.on("resize", ({ from: e }) => {
                  "header-nav-click-to-open" != e &&
                    (i.find(".dropdown.open").removeClass("open"),
                    l.width() < 992) &&
                    0 == t &&
                    ((a = p(".header-body").outerHeight()),
                    (t = !0),
                    setTimeout(() => {
                      t = !1;
                    }, 500));
                });
              }
            }),
            r.hasClass("side-header") &&
              (l.width() < 992 &&
                i.css({
                  height:
                    p(".header-body .header-container").outerHeight() +
                    (parseInt(p(".header-body").css("border-top-width")) +
                      parseInt(p(".header-body").css("border-bottom-width"))),
                }),
              p(document).ready(() => {
                l.afterResize(() => {
                  l.width() < 992
                    ? i.css({
                        height:
                          p(".header-body .header-container").outerHeight() +
                          (parseInt(p(".header-body").css("border-top-width")) +
                            parseInt(
                              p(".header-body").css("border-bottom-width")
                            )),
                      })
                    : i.css({ height: "" });
                });
              })),
            p("[data-hash]").length &&
              p("[data-hash]").on("mouseover", function () {
                let o = p(this);
                if (!o.data("__dataHashBinded")) {
                  let t = o.attr("href"),
                    i = o.is("[data-hash-offset]") ? o.data("hash-offset") : 0,
                    a = o.is("[data-hash-delay]") ? o.data("hash-delay") : 0,
                    s = !!o.is("[data-hash-force]");
                  var e = p(window).width();
                  o.is("[data-hash-offset-sm]") &&
                    576 < e &&
                    (i = o.data("hash-offset-sm")),
                    o.is("[data-hash-offset-md]") &&
                      768 < e &&
                      (i = o.data("hash-offset-md")),
                    o.is("[data-hash-offset-lg]") &&
                      992 < e &&
                      (i = o.data("hash-offset-lg")),
                    o.is("[data-hash-offset-xl]") &&
                      1200 < e &&
                      (i = o.data("hash-offset-xl")),
                    o.is("[data-hash-offset-xxl]") &&
                      1400 < e &&
                      (i = o.data("hash-offset-xxl")),
                    (t = p(t).length
                      ? t
                      : "#" + (t = t.split("#"))[1]).includes("#") &&
                      p(t).length &&
                      o.on("click", (e) => {
                        e.preventDefault(),
                          (p(e.target).is("i") && !s) ||
                            setTimeout(() => {
                              if (
                                (o.parents(".collapse.show").collapse("hide"),
                                d.addClass("side-header-hide"),
                                r.addClass("side-header-hide"),
                                l.trigger("resize"),
                                n.scrollToTarget(t, i),
                                o.data("hash-trigger-click"))
                              ) {
                                let e = p(o.data("hash-trigger-click")),
                                  t = o.data("hash-trigger-click-delay")
                                    ? o.data("hash-trigger-click-delay")
                                    : 0;
                                e.length &&
                                  setTimeout(() => {
                                    e.closest(".nav-tabs").length
                                      ? new bootstrap.Tab(e[0]).show()
                                      : e.trigger("click");
                                  }, t);
                              }
                            }, a);
                      }),
                    p(this).data("__dataHashBinded", !0);
                }
              }),
            p("#header.header-floating-icons").length &&
              p("#header.header-floating-icons [data-hash]")
                .off()
                .each(function () {
                  let t = p(this).attr("href"),
                    i = p(this).is("[data-hash-offset]")
                      ? p(this).data("hash-offset")
                      : 0;
                  p(t).length &&
                    p(this).on("click", (e) => {
                      e.preventDefault(),
                        p("html, body").animate(
                          { scrollTop: p(t).offset().top - i },
                          600,
                          "easeOutQuad",
                          () => {}
                        );
                    });
                }),
            p(".side-panel-toggle").length)
          ) {
            let s = p("html").attr("class");
            p(".side-panel-toggle").on("click", function (e) {
              var t = p(this).data("extra-class"),
                i = t ? 100 : 0,
                a = !!p(this).data("is-active") && p(this).data("is-active");
              if ((e.preventDefault(), a))
                return (
                  p("html").removeClass("side-panel-open"),
                  p(this).data("is-active", !1),
                  !1
                );
              t &&
                (p(".side-panel-wrapper").css("transition", "none"),
                p("html").removeClass().addClass(s).addClass(t)),
                setTimeout(() => {
                  p(".side-panel-wrapper").css("transition", ""),
                    p("html").toggleClass("side-panel-open");
                }, i),
                p(this).data("is-active", !0);
            }),
              p(document).on("click", ({ target: e }) => {
                p(e).closest(".side-panel-wrapper").length ||
                  p(e).hasClass("side-panel-toggle") ||
                  (p(
                    ".hamburguer-btn.side-panel-toggle:not(.side-panel-close)"
                  ).removeClass("active"),
                  p("html").removeClass("side-panel-open"),
                  p(".side-panel-toggle").data("is-active", !1));
              });
          }
          return n.offCanvasMenu(), this;
        },
        scrollToTarget(e, t) {
          let i = this,
            a = p(e).offset().top;
          return (
            p("body").addClass("scrolling"),
            p("html, body").animate(
              { scrollTop: p(e).offset().top - t },
              i.options.scrollDelay,
              i.options.scrollAnimation,
              () => {
                p("body").removeClass("scrolling"),
                  p(e).offset().top != a &&
                    p("html, body").animate(
                      { scrollTop: p(e).offset().top - t },
                      1,
                      i.options.scrollAnimation,
                      () => {}
                    );
              }
            ),
            this
          );
        },
        offCanvasMenu() {
          var e = p("#header .header-nav-main"),
            t = p(".offcanvas-nav");
          return (
            0 < t.length &&
              0 < (e = e.find("nav")).length &&
              (t.html(t.html() + e.html()),
              t
                .find("#mainNav")
                .removeAttr("id")
                .removeClass()
                .addClass("nav flex-column w-100"),
              t.find(".dropdown").removeClass().addClass("dropdown"),
              t
                .find(".dropdown-item:not(.dropdown-toggle)")
                .removeClass()
                .addClass("dropdown-item"),
              t
                .find(".dropdown-item.dropdown-toggle")
                .removeClass()
                .addClass("dropdown-item dropdown-toggle"),
              t
                .find(".nav-link:not(.dropdown-toggle)")
                .removeClass()
                .addClass("nav-link"),
              t
                .find(".nav-link.dropdown-toggle")
                .removeClass()
                .addClass("nav-link dropdown-toggle"),
              t.find(".dropdown-menu").removeClass().addClass("dropdown-menu"),
              t.find(".dropdown-toggle").each(function () {
                let t = p(this),
                  e = t.find("i");
                e.on("click", function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    t.parents("li").toggleClass("open");
                }),
                  "#" == t.attr("href") &&
                    t.on("click", function () {
                      e.trigger("click");
                    });
              })),
            this
          );
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((t = {}, o) => {
    let i = !1;
    o.extend(t, {
      Newsletter: {
        defaults: { wrapper: o("#newsletterForm") },
        initialize(e, t) {
          return (
            i ||
              ((i = !0),
              (this.$wrapper = e || this.defaults.wrapper),
              this.setOptions(t).build()),
            this
          );
        },
        setOptions(e) {
          return (
            (this.options = o.extend(
              !0,
              {},
              this.defaults,
              e,
              t.fn.getOptions(this.$wrapper.data("plugin-options"))
            )),
            this
          );
        },
        build() {
          if (o.isFunction(o.fn.validate)) {
            let t = this,
              i = t.$wrapper.find("#newsletterEmail"),
              a = o("#newsletterSuccess"),
              s = o("#newsletterError");
            t.$wrapper.validate({
              submitHandler(e) {
                o.ajax({
                  type: "POST",
                  url: t.$wrapper.attr("action"),
                  data: { email: i.val() },
                  dataType: "json",
                  success({ response: e, message: t }) {
                    "success" == e
                      ? (a.removeClass("d-none"),
                        s.addClass("d-none"),
                        i
                          .val("")
                          .blur()
                          .closest(".control-group")
                          .removeClass("success")
                          .removeClass("error"))
                      : (s.html(t),
                        s.removeClass("d-none"),
                        a.addClass("d-none"),
                        i
                          .blur()
                          .closest(".control-group")
                          .removeClass("success")
                          .addClass("error"));
                  },
                });
              },
              rules: { newsletterEmail: { required: !0, email: !0 } },
              errorPlacement(e, t) {},
            });
          }
          return this;
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((t = {}, a) => {
    let i = !1;
    a.extend(t, {
      Search: {
        defaults: { wrapper: a("#searchForm") },
        initialize(e, t) {
          return (
            i ||
              ((i = !0),
              (this.$wrapper = e || this.defaults.wrapper),
              this.setOptions(t).build()),
            this
          );
        },
        setOptions(e) {
          return (
            (this.options = a.extend(
              !0,
              {},
              this.defaults,
              e,
              t.fn.getOptions(this.$wrapper.data("plugin-options"))
            )),
            this
          );
        },
        build() {
          return (
            a.isFunction(a.fn.validate) &&
              (this.$wrapper.validate({ errorPlacement(e, t) {} }),
              t.fn.execOnceTroughEvent(
                "#header",
                "mouseover.search.reveal",
                () => {
                  a(".header-nav-features-search-reveal").each(function () {
                    let e = a(this),
                      t = a("#header"),
                      i = a("html");
                    e
                      .find(".header-nav-features-search-show-icon")
                      .on("click", () => {
                        e.addClass("show"),
                          t.addClass("search-show"),
                          i.addClass("search-show"),
                          a("#headerSearch").focus();
                      }),
                      e
                        .find(".header-nav-features-search-hide-icon")
                        .on("click", () => {
                          e.removeClass("show"),
                            t.removeClass("search-show"),
                            i.removeClass("search-show");
                        });
                  });
                }
              )),
            this
          );
        },
      },
    });
  }).apply(this, [window.theme, jQuery]),
  ((h = {}, u) => {
    let i = !1;
    u.extend(h, {
      StickyHeader: {
        defaults: {
          wrapper: u("#header"),
          headerBody: u("#header .header-body"),
          stickyEnabled: !0,
          stickyEnableOnBoxed: !0,
          stickyEnableOnMobile: !1,
          stickyStartAt: 0,
          stickyStartAtElement: !1,
          stickySetTop: 0,
          stickyEffect: "",
          stickyHeaderContainerHeight: !1,
          stickyChangeLogo: !1,
          stickyChangeLogoWrapper: !0,
          stickyForce: !1,
          stickyScrollUp: !1,
          stickyScrollValue: 0,
        },
        initialize(e, t) {
          return (
            i ||
              ((i = !0),
              (this.$wrapper = e || this.defaults.wrapper),
              this.$wrapper.hasClass("header") &&
                (this.$wrapper = u(".header[data-plugin-options]")),
              this.setOptions(t).build().events()),
            this
          );
        },
        setOptions(e) {
          return (
            (this.options = u.extend(
              !0,
              {},
              this.defaults,
              e,
              h.fn.getOptions(this.$wrapper.data("plugin-options"))
            )),
            this
          );
        },
        build() {
          if (u(window).width() < 992 && 0 == this.options.stickyEnableOnMobile)
            u("html").addClass("sticky-header-mobile-disabled");
          else if (
            !(
              (!this.options.stickyEnableOnBoxed &&
                u("html").hasClass("boxed")) ||
              (u("html").hasClass("side-header-hamburguer-sidebar") &&
                !this.options.stickyForce)
            ) &&
            this.options.stickyEnabled
          ) {
            let r = this,
              t =
                (r.options.wrapper.hasClass("header") &&
                  ((r.options.wrapper = u(".header")),
                  (r.options.headerBody = u(".header .header-body"))),
                u("html")),
              a = u(window),
              i = t.hasClass("side-header"),
              e = r.options.wrapper.find(".header-top").outerHeight(),
              s = r.options.wrapper.find(".header-container").outerHeight(),
              o;
            if (
              (t.addClass("sticky-header-enabled"),
              parseInt(r.options.stickySetTop) < 0 &&
                t.addClass("sticky-header-negative"),
              r.options.stickyScrollUp &&
                t.addClass("sticky-header-scroll-direction"),
              !u(".notice-top-bar").get(0) ||
                (1 != parseInt(r.options.stickySetTop) &&
                  "shrink" != r.options.stickyEffect) ||
                u(".body").on(
                  "transitionend webkitTransitionEnd oTransitionEnd",
                  () => {
                    setTimeout(() => {
                      t.hasClass("sticky-header-active") ||
                        r.options.headerBody.animate(
                          { top: u(".notice-top-bar").outerHeight() },
                          300,
                          () => {
                            t.hasClass("sticky-header-active") &&
                              r.options.headerBody.css("top", 0);
                          }
                        );
                    }, 0);
                  }
                ),
              r.options.stickyStartAtElement)
            ) {
              let e = u(r.options.stickyStartAtElement);
              u(window).on("scroll resize sticky.header.resize", () => {
                r.options.stickyStartAt = e.offset().top;
              }),
                u(window).trigger("sticky.header.resize");
            }
            (o = r.options.wrapper.find(".header-top").get(0) ? e + s : s),
              i ||
                (u(".header-logo-sticky-change").get(0)
                  ? a.on("stickyChangeLogo.loaded", () => {
                      r.options.wrapper.css(
                        "height",
                        r.options.headerBody.outerHeight()
                      );
                    })
                  : r.options.wrapper.css(
                      "height",
                      r.options.headerBody.outerHeight()
                    ),
                "shrink" == r.options.stickyEffect &&
                  (u(document).ready(() => {
                    a.scrollTop() >= r.options.stickyStartAt
                      ? r.options.wrapper
                          .find(".header-container")
                          .on(
                            "transitionend webkitTransitionEnd oTransitionEnd",
                            () => {
                              r.options.headerBody.css("position", "fixed");
                            }
                          )
                      : t.hasClass("boxed") ||
                        r.options.headerBody.css("position", "fixed");
                  }),
                  r.options.wrapper.find(".header-container").css("height", s),
                  r.options.wrapper.find(".header-top").css("height", e))),
              r.options.stickyHeaderContainerHeight &&
                r.options.wrapper
                  .find(".header-container")
                  .css(
                    "height",
                    r.options.wrapper.find(".header-container").outerHeight()
                  ),
              t.hasClass("boxed") &&
                "shrink" == r.options.stickyEffect &&
                r.boxedLayout();
            let n = !0,
              l = !1,
              d = r.options.stickyStartAt;
            if (
              ((r.checkStickyHeader = () => {
                var e = u(".notice-top-bar");
                e.get(0)
                  ? (r.options.stickyStartAt = e.data("sticky-start-at")
                      ? e.data("sticky-start-at")
                      : u(".notice-top-bar").outerHeight())
                  : t.hasClass("boxed")
                  ? (r.options.stickyStartAt = d + 25)
                  : (r.options.stickyStartAt = d),
                  991 < a.width() && t.hasClass("side-header")
                    ? (t.removeClass("sticky-header-active"), (n = !0))
                    : (a.scrollTop() >= parseInt(r.options.stickyStartAt)
                        ? n && (r.activateStickyHeader(), (n = !1), (l = !0))
                        : l && (r.deactivateStickyHeader(), (l = !1), (n = !0)),
                      r.options.stickyScrollUp &&
                        ((r.options.stickyScrollNewValue = window.pageYOffset),
                        r.options.stickyScrollValue -
                          r.options.stickyScrollNewValue <
                        0
                          ? t
                              .removeClass("sticky-header-scroll-up")
                              .addClass("sticky-header-scroll-down")
                          : 0 <
                              r.options.stickyScrollValue -
                                r.options.stickyScrollNewValue &&
                            t
                              .removeClass("sticky-header-scroll-down")
                              .addClass("sticky-header-scroll-up"),
                        (r.options.stickyScrollValue =
                          r.options.stickyScrollNewValue)));
              }),
              (r.activateStickyHeader = () => {
                if (a.width() < 992) {
                  if (0 == r.options.stickyEnableOnMobile)
                    return (
                      r.deactivateStickyHeader(),
                      r.options.headerBody.css({ position: "relative" }),
                      !1
                    );
                } else if (i) return void r.deactivateStickyHeader();
                var e;
                t.addClass("sticky-header-active"),
                  "reveal" == r.options.stickyEffect &&
                    (r.options.headerBody.css(
                      "top",
                      "-" + r.options.stickyStartAt + "px"
                    ),
                    r.options.headerBody.animate(
                      { top: r.options.stickySetTop },
                      400,
                      () => {}
                    )),
                  "shrink" == r.options.stickyEffect &&
                    (r.options.wrapper.find(".header-top").get(0) &&
                      r.options.wrapper.find(".header-top").css({
                        height: 0,
                        "min-height": 0,
                        overflow: "hidden",
                      }),
                    r.options.stickyHeaderContainerHeight
                      ? r.options.wrapper.find(".header-container").css({
                          height: r.options.stickyHeaderContainerHeight,
                          "min-height": 0,
                        })
                      : (r.options.wrapper
                          .find(".header-container")
                          .css({ height: (s / 3) * 2, "min-height": 0 }),
                        (e = s - (s / 3) * 2),
                        u(".main")
                          .css({
                            transform: "translate3d(0, -" + e + "px, 0)",
                            transition: "ease transform 300ms",
                          })
                          .addClass("has-sticky-header-transform"),
                        t.hasClass("boxed") &&
                          r.options.headerBody.css("position", "fixed"))),
                  r.options.headerBody.css("top", r.options.stickySetTop),
                  r.options.stickyChangeLogo && r.changeLogo(!0),
                  u("[data-sticky-header-style]").length &&
                    u("[data-sticky-header-style]").each(function () {
                      var e = u(this),
                        t = h.fn.getOptions(
                          e.data("sticky-header-style-active")
                        ),
                        i = h.fn.getOptions(e.data("sticky-header-style"));
                      a.width() > i.minResolution && e.css(t);
                    }),
                  u.event.trigger({ type: "stickyHeader.activate" });
              }),
              (r.deactivateStickyHeader = () => {
                if (
                  (t.removeClass("sticky-header-active"),
                  u(window).width() < 992 &&
                    0 == r.options.stickyEnableOnMobile)
                )
                  return !1;
                "shrink" == r.options.stickyEffect &&
                  ((!t.hasClass("boxed") ||
                    (r.options.headerBody.css("position", "absolute"),
                    a.scrollTop() > u(".body").offset().top)) &&
                    r.options.headerBody.css("position", "fixed"),
                  r.options.wrapper.find(".header-top").get(0) &&
                    (r.options.wrapper
                      .find(".header-top")
                      .css({ height: e, overflow: "visible" }),
                    r.options.wrapper.find(".header-top [data-icon]").length) &&
                    h.fn.intObsInit(
                      ".header-top [data-icon]:not(.svg-inline--fa)",
                      "themePluginIcon"
                    ),
                  r.options.wrapper
                    .find(".header-container")
                    .css({ height: s })),
                  r.options.headerBody.css("top", 0),
                  r.options.stickyChangeLogo && r.changeLogo(!1),
                  u("[data-sticky-header-style]").length &&
                    u("[data-sticky-header-style]").each(function () {
                      var e = u(this),
                        t = h.fn.getOptions(
                          e.data("sticky-header-style-deactive")
                        ),
                        i = h.fn.getOptions(e.data("sticky-header-style"));
                      a.width() > i.minResolution && e.css(t);
                    }),
                  u.event.trigger({ type: "stickyHeader.deactivate" });
              }),
              parseInt(r.options.stickyStartAt) <= 0 &&
                r.activateStickyHeader(),
              r.options.stickyChangeLogo)
            ) {
              let e = r.options.wrapper.find(".header-logo"),
                t = e.find("img"),
                i = t.attr("width"),
                a = t.attr("height"),
                s = parseInt(
                  t.attr("data-sticky-top") ? t.attr("data-sticky-top") : 0
                ),
                o = parseInt(
                  t.attr("data-sticky-width")
                    ? t.attr("data-sticky-width")
                    : "auto"
                ),
                n = parseInt(
                  t.attr("data-sticky-height")
                    ? t.attr("data-sticky-height")
                    : "auto"
                );
              r.options.stickyChangeLogoWrapper &&
                e.css({ width: t.outerWidth(!0), height: t.outerHeight(!0) }),
                (r.changeLogo = (e) => {
                  e
                    ? t.css({ top: s, width: o, height: n })
                    : t.css({ top: 0, width: i, height: a });
                }),
                u.event.trigger({ type: "stickyChangeLogo.loaded" });
            }
            let p,
              c = !1;
            r.checkSideHeader = () => {
              a.width() < 992 &&
                0 == c &&
                ((p = r.options.headerBody.height()), (c = !0)),
                0 == r.options.stickyStartAt &&
                  i &&
                  r.options.wrapper.css("min-height", 0),
                0 < r.options.stickyStartAt &&
                  i &&
                  a.width() < 992 &&
                  r.options.wrapper.css("min-height", p);
            };
          }
          return this;
        },
        events() {
          let e = this;
          return (
            (u(window).width() < 992 &&
              0 == this.options.stickyEnableOnMobile) ||
              (!this.options.stickyEnableOnBoxed &&
                u("body").hasClass("boxed")) ||
              (u("html").hasClass("side-header-hamburguer-sidebar") &&
                !this.options.stickyForce) ||
              !this.options.stickyEnabled ||
              (e.options.alwaysStickyEnabled
                ? e.activateStickyHeader()
                : u(window).on("scroll resize", () => {
                    u(window).width() < 992 &&
                    0 == e.options.stickyEnableOnMobile
                      ? (e.options.headerBody.css({ position: "" }),
                        "shrink" == e.options.stickyEffect &&
                          e.options.wrapper
                            .find(".header-top")
                            .css({ height: "" }),
                        e.deactivateStickyHeader())
                      : e.checkStickyHeader();
                  }),
              u(window).on("load resize", () => {
                e.checkSideHeader();
              }),
              u(window).on("layout.boxed", () => {
                e.boxedLayout();
              })),
            this
          );
        },
        boxedLayout() {
          let e = this,
            t = u(window);
          return (
            u("html").hasClass("boxed") &&
              "shrink" == e.options.stickyEffect &&
              (0 == parseInt(e.options.stickyStartAt) &&
                991 < t.width() &&
                (e.options.stickyStartAt = 30),
              e.options.headerBody.css({ position: "absolute", top: 0 }),
              t.on("scroll", () => {
                t.scrollTop() > u(".body").offset().top
                  ? e.options.headerBody.css({ position: "fixed", top: 0 })
                  : e.options.headerBody.css({ position: "absolute", top: 0 });
              })),
            this
          );
        },
      },
    });
  }).apply(this, [window.theme, jQuery]);