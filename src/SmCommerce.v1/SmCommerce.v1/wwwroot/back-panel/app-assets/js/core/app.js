! function (i, r, f) {
    "use strict";
    var c = f("html"),
        d = f("body"),
        h = "#ea5455";
    if (f(i).on("load", function () {
        var e = !1;
        d.hasClass("menu-collapsed") && (e = !0), f("html").data("textdirection"), setTimeout(function () {
            c.removeClass("loading").addClass("loaded")
        }, 1200), f.app.menu.init(e);
        !1 === f.app.nav.initialized && f.app.nav.init({
            speed: 300
        }), Unison.on("change", function (e) {
            f.app.menu.change()
        }), f('[data-toggle="tooltip"]').tooltip({
            container: "body"
        }), 0 < f(".navbar-hide-on-scroll").length && (f(".navbar-hide-on-scroll.fixed-top").headroom({
            offset: 205,
            tolerance: 5,
            classes: {
                initial: "headroom",
                pinned: "headroom--pinned-top",
                unpinned: "headroom--unpinned-top"
            }
        }), f(".navbar-hide-on-scroll.fixed-bottom").headroom({
            offset: 205,
            tolerance: 5,
            classes: {
                initial: "headroom",
                pinned: "headroom--pinned-bottom",
                unpinned: "headroom--unpinned-bottom"
            }
        })), f('a[data-action="collapse"]').on("click", function (e) {
            e.preventDefault(), f(this).closest(".card").children(".card-content").collapse("toggle"), f(this).closest(".card").children(".card-header").css("padding-bottom", "1.5rem"), f(this).closest(".card").find('[data-action="collapse"]').toggleClass("rotate")
        }), f('a[data-action="expand"]').on("click", function (e) {
            e.preventDefault(), f(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-maximize icon-minimize"), f(this).closest(".card").toggleClass("card-fullscreen")
        }), f(".scrollable-container").each(function () {
            new PerfectScrollbar(f(this)[0], {
                wheelPropagation: !1
            })
        }), f('a[data-action="reload"]').on("click", function () {
            var e = f(this).closest(".card").find(".card-content");
            if (d.hasClass("dark-layout")) var a = "#10163a";
            else a = "#fff";
            e.block({
                message: '<div class="feather icon-refresh-cw icon-spin font-medium-2 text-primary"></div>',
                timeout: 2e3,
                overlayCSS: {
                    backgroundColor: a,
                    cursor: "wait"
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: "none"
                }
            })
        }), f('a[data-action="close"]').on("click", function () {
            f(this).closest(".card").removeClass().slideUp("fast")
        }), setTimeout(function () {
            f(".row.match-height").each(function () {
                f(this).find(".card").not(".card .card").matchHeight()
            })
        }, 500), f('.card .heading-elements a[data-action="collapse"]').on("click", function () {
            var e, a = f(this).closest(".card");
            0 < parseInt(a[0].style.height, 10) ? (e = a.css("height"), a.css("height", "").attr("data-height", e)) : a.data("height") && (e = a.data("height"), a.css("height", e).attr("data-height", ""))
        }), f(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active");
        var a = d.data("menu");
        "horizontal-menu" != a && !1 === e && f(".main-menu-content").find("li.active").parents("li").addClass("open"), "horizontal-menu" == a && (f(".main-menu-content").find("li.active").parents("li:not(.nav-item)").addClass("open"), f(".main-menu-content").find("li.active").closest("li.nav-item").addClass("sidebar-group-active open")), f(".heading-elements-toggle").on("click", function () {
            f(this).next(".heading-elements").toggleClass("visible")
        });
        var t = f(".chartjs"),
            s = t.children("canvas").attr("height"),
            n = f(".main-menu");
        if (t.css("height", s), d.hasClass("boxed-layout") && d.hasClass("vertical-overlay-menu")) {
            var i = n.width(),
                o = f(".app-content").position().left - i;
            d.hasClass("menu-flipped") ? n.css("right", o + "px") : n.css("left", o + "px")
        }
        f(".custom-file input").change(function (e) {
            f(this).next(".custom-file-label").html(e.target.files[0].name)
        }), f(".char-textarea").on("keyup", function (e) {
            ! function (e, a) {
                var t = parseInt(f(e).data("length")),
                    s = f(".counter-value"),
                    n = f(".char-textarea");
                (function (e) {
                    return 8 == e.keyCode || 46 == e.keyCode || 37 == e.keyCode || 38 == e.keyCode || 39 == e.keyCode || 40 == e.keyCode
                })(a) || e.value.length < t - 1 && (e.value = e.value.substring(0, t));
                f(".char-count").html(e.value.length), e.value.length > t ? (s.css("background-color", h), n.css("color", h), n.addClass("max-limit")) : (s.css("background-color", "#7367f0"), n.css("color", "#4e5154"), n.removeClass("max-limit"))
            }(this, e), f(this).addClass("active")
        }), f(".content-overlay").on("click", function () {
            f(".search-list").removeClass("show"), f(".app-content").removeClass("show-overlay"), f(".bookmark-wrapper .bookmark-input").removeClass("show")
        });
        var l = r.getElementsByClassName("main-menu-content");
        0 < l.length && l[0].addEventListener("ps-scroll-y", function () {
            0 < f(this).find(".ps__thumb-y").position().top ? f(".shadow-bottom").css("display", "block") : f(".shadow-bottom").css("display", "none")
        })
    }), f(r).on("click", ".sidenav-overlay", function (e) {
        return f.app.menu.hide(), !1
    }), "undefined" != typeof Hammer) {
        var e = r.querySelector(".drag-target");
        if (0 < f(e).length) new Hammer(e).on("panright", function (e) {
            if (d.hasClass("vertical-overlay-menu")) return f.app.menu.open(), !1
        });
        setTimeout(function () {
            var e, a = r.querySelector(".main-menu");
            0 < f(a).length && ((e = new Hammer(a)).get("pan").set({
                direction: Hammer.DIRECTION_ALL,
                threshold: 100
            }), e.on("panleft", function (e) {
                if (d.hasClass("vertical-overlay-menu")) return f.app.menu.hide(), !1
            }))
        }, 300);
        var a = r.querySelector(".sidenav-overlay");
        if (0 < f(a).length) new Hammer(a).on("panleft", function (e) {
            if (d.hasClass("vertical-overlay-menu")) return f.app.menu.hide(), !1
        })
    }
    f(r).on("click", ".menu-toggle, .modern-nav-toggle", function (e) {
        return e.preventDefault(), f.app.menu.toggle(), setTimeout(function () {
            f(i).trigger("resize")
        }, 200), 0 < f("#collapse-sidebar-switch").length && setTimeout(function () {
            d.hasClass("menu-expanded") || d.hasClass("menu-open") ? f("#collapse-sidebar-switch").prop("checked", !1) : f("#collapse-sidebar-switch").prop("checked", !0)
        }, 50), f(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").hasClass("show") && f(".vertical-overlay-menu .navbar-with-menu .navbar-container .navbar-collapse").removeClass("show"), !1
    }), f(".navigation").find("li").has("ul").addClass("has-sub"), f(".carousel").carousel({
        interval: 2e3
    }), f(".nav-link-expand").on("click", function (e) {
        "undefined" != typeof screenfull && screenfull.isEnabled && screenfull.toggle()
    }), "undefined" != typeof screenfull && screenfull.isEnabled && f(r).on(screenfull.raw.fullscreenchange, function () {
        screenfull.isFullscreen ? (f(".nav-link-expand").find("i").toggleClass("icon-minimize icon-maximize"), f("html").addClass("full-screen")) : (f(".nav-link-expand").find("i").toggleClass("icon-maximize icon-minimize"), f("html").removeClass("full-screen"))
    }), f(r).ready(function () {
        f(".step-icon").each(function () {
            var e = f(this);
            0 < e.siblings("span.step").length && (e.siblings("span.step").empty(), f(this).appendTo(f(this).siblings("span.step")))
        })
    }), f(i).resize(function () {
        f.app.menu.manualScroller.updateHeight()
    }), f("#sidebar-page-navigation").on("click", "a.nav-link", function (e) {
        e.preventDefault(), e.stopPropagation();
        var a = f(this),
            t = a.attr("href"),
            s = f(t).offset().top - 80;
        f("html, body").animate({
            scrollTop: s
        }, 0), setTimeout(function () {
            a.parent(".nav-item").siblings(".nav-item").children(".nav-link").removeClass("active"), a.addClass("active")
        }, 100)
    }),
        // i18next.use(i.i18nextXHRBackend).init({
        //     debug: !1,
        //     fallbackLng: "en",
        //     backend: {
        //         loadPath: "../../../app-assets/data/locales/{{lng}}.json"
        //     },
        //     returnObjects: !0
        // }, function (e, a) {
        //     jqueryI18next.init(i18next, f)
        // }),
        f(".dropdown-language .dropdown-item").on("click", function () {
            var e = f(this);
            e.siblings(".selected").removeClass("selected"), e.addClass("selected");
            var a = e.text(),
                t = e.find(".flag-icon").attr("class");
            f("#dropdown-flag .selected-language").text(a), f("#dropdown-flag .flag-icon").removeClass().addClass(t);
            // var s = e.data("language");
            // i18next.changeLanguage(s, function (e, a) {
            //     f(".main-menu, .horizontal-menu-wrapper").localize()
            // })
        });
    var v = f(".search-input input").data("search"),
        n = f(".bookmark-wrapper"),
        t = f(".bookmark-wrapper .bookmark-star"),
        g = f(".bookmark-wrapper .bookmark-input"),
        s = f(".nav-link-search"),
        C = f(".search-input"),
        k = f(".search-input input"),
        b = f(".search-input .search-list"),
        w = f(".app-content"),
        y = f(".bookmark-input .search-list");
    if (t.on("click", function (e) {
        e.stopPropagation(), g.toggleClass("show"), g.find("input").val(""), g.find("input").blur(), g.find("input").focus(), n.find(".search-list").addClass("show");
        var a = f("ul.nav.navbar-nav.bookmark-icons li"),
            t = "";
        f("ul.search-list li").remove();
        for (var s = 0; s < a.length; s++) t += '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' + (0 === s ? "current_item" : "") + '"><a class="d-flex align-items-center justify-content-between w-100" href=' + a[s].firstChild.href + '><div class="d-flex justify-content-start align-items-center"><span class="mr-75 ' + a[s].firstChild.firstChild.className + '"  data-icon="' + a[s].firstChild.firstChild.className + '"></span><span>' + a[s].firstChild.dataset.originalTitle + '</span></div><span class="float-right bookmark-icon feather icon-star warning"></span></a></li>';
        f("ul.search-list").append(t)
    }), s.on("click", function () {
        f(this);
        f(this).parent(".nav-search").find(".search-input").addClass("open"), k.focus(), b.find("li").remove(), g.removeClass("show")
    }), f(".search-input-close i").on("click", function () {
        f(this);
        var e = f(this).closest(".search-input");
        e.hasClass("open") && (e.removeClass("open"), k.val(""), k.blur(), b.removeClass("show"), w.removeClass("show-overlay"))
    }), f(".search-list-main").length) var o = new PerfectScrollbar(".search-list-main", {
        wheelPropagation: !1
    });
    if (f(".search-list-bookmark").length) new PerfectScrollbar(".search-list-bookmark", {
        wheelPropagation: !1
    });
    f(".search-list-main").mouseenter(function () {
        o.update()
    }), k.on("keyup", function (e) {
        if (f(this).closest(".search-list").addClass("show"), 38 !== e.keyCode && 40 !== e.keyCode && 13 !== e.keyCode) {
            27 == e.keyCode && (w.removeClass("show-overlay"), g.find("input").val(""), g.find("input").blur(), k.val(""), k.blur(), C.removeClass("open"), C.hasClass("show") && (f(this).removeClass("show"), C.removeClass("show")));
            var n = f(this).val().toLowerCase(),
                i = "",
                o = !1;
            if (f("ul.search-list li").remove(), f(this).parent().hasClass("bookmark-input") && (o = !0), "" != n) {
                w.addClass("show-overlay"), g.focus() ? y.addClass("show") : (b.addClass("show"), y.removeClass("show")), !1 === o && (b.addClass("show"), y.removeClass("show"));
                var l = "",
                    r = "",
                    c = "",
                    d = "",
                    h = '<li class=" d-flex align-items-center"><a href="#" class="pb-25"><h6 class="text-primary mb-0">Pages</h6></a></li>',
                    m = "",
                    u = "",
                    p = 0;
                f.getJSON("../../../app-assets/data/" + v + ".json", function (e) {
                    for (var a = 0; a < e.listItems.length; a++) {
                        if (!0 === o) {
                            i = "";
                            for (var t = f("ul.nav.navbar-nav.bookmark-icons li"), s = 0; s < t.length; s++) {
                                if (e.listItems[a].name === t[s].firstChild.dataset.originalTitle) {
                                    i = " warning";
                                    break
                                }
                                i = ""
                            }
                            m = '<span class="float-right bookmark-icon feather icon-star' + i + '"></span>'
                        }
                        0 == e.listItems[a].name.toLowerCase().indexOf(n) && p < 5 && (l += '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' + (0 === p ? "current_item" : "") + '"><a class="d-flex align-items-center justify-content-between w-100" href=' + e.listItems[a].url + '><div class="d-flex justify-content-start align-items-center"><span class="mr-75 ' + e.listItems[a].icon + '" data-icon="' + e.listItems[a].icon + '"></span><span>' + e.listItems[a].name + "</span></div>" + m + "</a></li>", p++)
                    }
                    for (a = 0; a < e.listItems.length; a++) {
                        if (!0 === o) {
                            i = "";
                            for (t = f("ul.nav.navbar-nav.bookmark-icons li"), s = 0; s < t.length; s++) i = e.listItems[a].name === t[s].firstChild.dataset.originalTitle ? " warning" : "";
                            m = '<span class="float-right bookmark-icon feather icon-star' + i + '"></span>'
                        }
                        0 != e.listItems[a].name.toLowerCase().indexOf(n) && -1 < e.listItems[a].name.toLowerCase().indexOf(n) && p < 5 && (r += '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer ' + (0 === p ? "current_item" : "") + '"><a class="d-flex align-items-center justify-content-between w-100" href=' + e.listItems[a].url + '><div class="d-flex justify-content-start align-items-center"><span class="mr-75 ' + e.listItems[a].icon + '" data-icon="' + e.listItems[a].icon + '"></span><span>' + e.listItems[a].name + "</span></div>" + m + "</a></li>", p++)
                    }
                    u = f(".main-search-list-defaultlist").html(), "" == l && "" == r && (r = f(".main-search-list-defaultlist-other-list").html()), c = h.concat(l, r, u), f("ul.search-list").html(c), d = l.concat(r), f("ul.search-list-bookmark").html(d)
                })
            } else if (!0 === o) {
                for (var a = f("ul.nav.navbar-nav.bookmark-iconss li"), t = "", s = 0; s < a.length; s++) 0 === s ? "current_item" : "", t += '<li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100" href=' + a[s].firstChild.href + '><div class="d-flex justify-content-start align-items-center"><span class="mr-75 ' + a[s].firstChild.firstChild.className + '"  data-icon="' + a[s].firstChild.firstChild.className + '"></span><span>' + a[s].firstChild.dataset.originalTitle + '</span></div><span class="float-right bookmark-icon feather icon-star warning"></span></a></li>';
                f("ul.search-list").append(t)
            } else w.hasClass("show-overlay") && w.removeClass("show-overlay"), b.hasClass("show") && b.removeClass("show")
        }
    }), f(r).on("mouseenter", ".search-list li", function (e) {
        f(this).siblings().removeClass("current_item"), f(this).addClass("current_item")
    }), f(r).on("click", ".search-list li", function (e) {
        e.stopPropagation()
    }), f("html").on("click", function (e) {
        f(e.target).hasClass("bookmark-icon") || (y.hasClass("show") && y.removeClass("show"), g.hasClass("show") && g.removeClass("show"))
    }), f(r).on("click", ".bookmark-input input", function (e) {
        g.addClass("show"), y.addClass("show")
    }), f(r).on("click", ".bookmark-input .search-list .bookmark-icon", function (e) {
        if (e.stopPropagation(), f(this).hasClass("warning")) {
            f(this).removeClass("warning");
            for (var a = f("ul.nav.navbar-nav.bookmark-icons li"), t = 0; t < a.length; t++) a[t].firstChild.dataset.originalTitle == f(this).parent()[0].innerText && a[t].remove();
            e.preventDefault()
        } else {
            a = f("ul.nav.navbar-nav.bookmark-icons li");
            f(this).addClass("warning"), e.preventDefault();
            var s;
            s = '<li class="nav-item d-none d-lg-block"><a class="nav-link" href="' + f(this).parent()[0].href + '" data-toggle="tooltip" data-placement="top" title="" data-original-title="' + f(this).parent()[0].innerText + '"><i class="ficon ' + f(this).parent()[0].firstChild.firstChild.dataset.icon + '"></i></a></li>', f("ul.nav.bookmark-icons").append(s), f('[data-toggle="tooltip"]').tooltip()
        }
    }), f(i).on("keydown", function (e) {
        var a, t, s = f(".search-list li.current_item");
        if (40 === e.keyCode ? (a = s.next(), s.removeClass("current_item"), s = a.addClass("current_item")) : 38 === e.keyCode && (t = s.prev(), s.removeClass("current_item"), s = t.addClass("current_item")), 13 === e.keyCode && 0 < f(".search-list li.current_item").length) {
            var n = f(".search-list li.current_item a");
            i.location = n.attr("href"), f(n).trigger("click")
        }
    }), Waves.init(), Waves.attach(".btn", ["waves-light"])
}(window, document, jQuery);