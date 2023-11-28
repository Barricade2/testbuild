define(["jquery", "loader", "popper"], function (e, t) {
    "use strict";

    function s() {
        this.$overlay = document.querySelector("#search-overlay"), this.class = {
            search: "#navbar-search-mobile",
            overlay: "#search-overlay",
            close: "#search-overlay-close",
            scrim: "search-scrim"
        }, this.$scrim = null, this.$timeout = null, this.init()
    }

    var i = function (t) {
        this.options = e.extend({}, i.Default, t), this.$element = e(this.options.inputID), this.$target = this.$element.data("search-target") ? this.$element.closest(this.$element.data("search-target")).get(0) : this.$element.get(0), this.$search = null, this.$remember = null, this.saveResult = {}, this.save = !0, this.searchDelay = null, this.$containerSetParams = null, this.ajaxDelay = 600, this.msg = !1, this.url = "", this.$close = null, this.stop = !1, this._popper = null, this.loader = null, this.init()
    };
    return i.Default = {
        inputID: "#search-searchword",
        minQueryLen: 4,
        searchID: "searchsuggestions",
        searchContainer: !1,
        remember: !1,
        rememberIcon: '<svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>',
        params: {url: "", method: "GET", dataType: "json", cache: !1, data: !1},
        arrow: !1,
        isToken: !1,
        arrowClassActive: "active"
    }, i.prototype = {
        init: function () {
            this.url = this.options.params.url, this.options.searchContainer || e(window).on("resize", this.resize.bind(this)), this.$element.on("input", this.send.bind(this)).on("focus", this.focus.bind(this)).on("blur", this.blur.bind(this))
        }, setParams: function (t, s) {
            this.options.params.data.params = !s && this.options.params.data.params, this.options.params.data.params = e.extend({}, this.options.params.data.params, t)
        }, send: function (e) {
            this.save = e && "input" === e.type && !this.options.isToken, e && "input" === e.type && this.setParams(this.$element.data("ajax-params"), !0), this.input()
        }, input: function () {
            var t, s, i;
            if (this.msg = e.trim(this.$element.val()), window.clearTimeout(this.searchDelay), this.options.minQueryLen <= this.msg.length) {
                if (t = {relatedTarget: this}, this.$element.trigger(s = e.Event("search.un.input", t)), s.isDefaultPrevented()) return;
                this.options.params.url = this.url.replace("word", this.msg), this.options.params.data[this.$element.attr("name")] = this.msg, this.options.isToken && (i = [], e(this.$element.data("search-token-container")).children().each(function (t) {
                    i[t] = e(this).children("input").val()
                }), this.options.params.data.ids = i), this.stop = !1, this.searchDelay = window.setTimeout(function () {
                    this.save && this.getSaveResult(this.msg) && !this.options.isToken ? this.response(this.getSaveResult(this.msg)) : this.ajax()
                }.bind(this), this.ajaxDelay)
            } else this.options.searchContainer ? this.options.remember && this.msg.length <= 0 && this.closeReset() : (this.stop = !0, this.removeSearch())
        }, focus: function () {
            this.$search && !this.options.searchContainer && (this.offset(), this.$search.fadeIn("fast"), this._popper.scheduleUpdate())
        }, blur: function () {
            this.$search && !this.options.searchContainer && this.$search.fadeOut("fast")
        }, token: function () {
            var t, s, i = this;
            this.$containerSetParams || (this.$containerSetParams = e(this.$element.data("container-set-params"))), this.$element.off("keydown.search.token"), this.$search.off("click.search.token"), this.$search.on("click.search.token", "[data-search-token-select]", function (i) {
                i.preventDefault();
                var a = e(i.currentTarget), n = !0;
                a.hasClass("selected") || (e(this.$element.data("search-token-container")).children().each(function () {
                    e(this).find("input").val() == a.data("search-token-user-id") && (n = !1, e(this).find("[data-search-token-remove]").trigger("click"))
                }), n && (t = e('<span class="uiToken d-flex align-items-center">                                    <span class="uiTokenText">' + a.data("search-token-user-name") + '</span>                                    <svg class="icon icon-close icon-t-0" role="button" data-search-token-remove="true">                                        <use xlink:href="#icon-close"></use>                                    </svg>                                    <input type="hidden" name="id[]" value="' + a.data("search-token-user-id") + '" />                                </span>'), e(this.$element.data("search-token-container")).append(t)), this.$element.data("search-token-done") && n && a.append(this.$element.data("search-token-done")), this.$element.val(""), this.options.searchContainer || this.removeSearch(), this.$containerSetParams && this.$containerSetParams.length && (s = {ids: []}, e(this.$element.data("search-token-container")).children().each(function (t) {
                    s.ids[t] = e(this).children("input").val()
                }), "hidden" === this.$containerSetParams.attr("type") ? this.$containerSetParams.val(JSON.stringify(s)) : (this.$containerSetParams.data("ajax-appear-params", s), this.$containerSetParams.attr("data-ajax-appear-params", JSON.stringify(s))), this.$containerSetParams.removeClass("disabled")))
            }.bind(this)), e(document).on("click.search.token", "[data-search-token-remove]", function (t) {
                t.preventDefault();
                var i = e(t.currentTarget);
                i.parent().remove(), this.$element.data("search-token-done") && this.$search.find('[data-search-token-user-id="' + i.parent().find("input").val() + '"] .search-token-done-remove').remove(), s = {ids: []}, e(this.$element.data("search-token-container")).children().each(function (t) {
                    s.ids[t] = e(this).children("input").val()
                }), "hidden" === this.$containerSetParams.attr("type") ? this.$containerSetParams.val(JSON.stringify(s)) : (this.$containerSetParams.data("ajax-appear-params", s), this.$containerSetParams.attr("data-ajax-appear-params", JSON.stringify(s))), this.$containerSetParams && this.$containerSetParams.length && this.$containerSetParams.addClass("disabled")
            }.bind(this)), i.$element.on("keydown.search.token", function (t) {
                8 == t.which && "" == e(t.currentTarget).val() && e(this.$element.data("search-token-container")).children().last().find("[data-search-token-remove]").trigger("click")
            }.bind(this))
        }, offset: function () {
            this.$search && (this.$search.css({width: e(this.$target).outerWidth(!0)}), this._popper || (this._popper = new window.Popper(this.$target, this.$search.get(0), {
                placement: "bottom",
                modifiers: {flip: {behavior: "clockwise"}}
            }), this._popper.scheduleUpdate()))
        }, resize: function () {
            this.offset()
        }, removeSearch: function () {
            this.options.searchContainer ? (this.$element.off("keydown.search.arrow"), this.$search = null) : null !== this.$search && (this.$element.off("keydown.search.arrow"), this.$search.remove(), null !== this._popper && this._popper.destroy(), this._popper = null, this.$search = null)
        }, arrow: function () {
            var t, s = this;
            this.$search.find("[data-search-item]").first().addClass(this.options.arrowClassActive), this.$search.find("[data-search-item]").on("mouseenter", function () {
                "ontouchstart" in document.documentElement || (e(this).parent().children().removeClass(s.options.arrowClassActive), e(this).addClass(s.options.arrowClassActive))
            }).on("mouseenter", function () {
                "ontouchstart" in document.documentElement || (e(this).parent().children().removeClass(s.options.arrowClassActive), e(this).addClass(s.options.arrowClassActive))
            }), this.$element.on("keydown.search.arrow", function (e) {
                (t = s.$search.find("[data-search-item]." + s.options.arrowClassActive)).length || s.$search.find("[data-search-item]").first().addClass(s.options.arrowClassActive), 40 == e.which ? t.next().length && t.removeClass(s.options.arrowClassActive).next().addClass(s.options.arrowClassActive) : 38 == e.which ? t.prev().length && t.removeClass(s.options.arrowClassActive).prev().addClass(s.options.arrowClassActive) : 13 == e.which && (e.preventDefault(), t.trigger("click"))
            })
        }, addSearch: function () {
            this.removeSearch(), this.options.searchContainer ? (this.$search = e(this.options.searchContainer), this.$search.html("")) : (this.$search = e("<div />"), this.$search.addClass(this.options.searchID))
        }, setLoader: function (s) {
            !0 === s ? (this.loader && this.loader.end(), this.closeRemove(), this.options.searchContainer ? (this.loader = new t({
                loader: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    "z-index": "110"
                }, idLoader: "uloader"
            }), e(this.options.searchContainer).html(""), this.loader.add(this.options.searchContainer)) : (this.loader = new t({
                loader: {
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translate(0,-50%)",
                    width: "20px",
                    height: "20px",
                    "z-index": "110"
                }, idLoader: "ispinner"
            }), this.loader.add(this.$element.get(0).parentNode))) : (this.loader.end(), this.closeInit())
        }, closeInit: function () {
            this.options.remember && !this.$close && this.msg.length > 0 && (this.$close = e('<div class="search-close" role="button"></div>'), this.options.rememberIcon && this.$close.append(this.options.rememberIcon), this.$close.css({
                position: "absolute",
                top: "50%",
                right: "10px",
                "padding-right": "20px",
                transform: "translate(0,-50%)",
                width: "20px",
                "z-index": "110"
            }), this.$element.css("padding-right", "20px"), this.$close.one("click", this.closeReset.bind(this)), this.$element.parent().append(this.$close))
        }, closeReset: function () {
            var t, s;
            t = {
                relatedTarget: this,
                search: this.$search
            }, this.$element.trigger(s = e.Event("search.un.close", t)), s.isDefaultPrevented() || (this.$remember && (e(this.options.searchContainer).html(this.$remember.html()), this.$remember = null, this.$element.val("")), this.closeRemove(), this.$element.trigger(e.Event("search.un.closed", t)))
        }, closeRemove: function () {
            this.options.remember && this.$close && (this.$close.off("click"), this.$close.remove(), this.$close = null, this.$element.css("padding-right", "0"))
        }, ajax: function () {
            var t, s;
            t = {relatedTarget: this}, this.$element.trigger(s = e.Event("search.un.start", t)), s.isDefaultPrevented() || (this.options.remember && !this.$remember && (this.$remember = e(this.options.searchContainer).clone()), this.setLoader(!0), e.ajax(this.options.params).then(this.response.bind(this)).catch(this.catch.bind(this)))
        }, response: function (t) {
            var s;
            if (this.setLoader(!1), "success" === t.status) {
                if (this.setSaveResult(t.word, t), this.stop || this.msg !== t.word && t.word.length >= this.options.minQueryLen) return;
                s = {
                    response: t,
                    search: this.$search
                }, this.$element.trigger(e.Event("search.un.show", s)), this.addSearch(), this.setContent(t.word), this.options.searchContainer || this.offset(), this.options.searchContainer || (e("body").append(this.$search), this._popper.scheduleUpdate(), this.$search.fadeIn("fast")), this.options.arrow && this.arrow(), this.options.isToken && this.token(), s = {
                    response: t,
                    search: this.$search
                }, this.$element.trigger(e.Event("search.un.shown", s))
            }
        }, catch: function () {
            this.loader.end(), console.log("search error")
        }, setSaveResult: function (e, t) {
            this.saveResult[e.toLowerCase()] = t
        }, getSaveResult: function (e) {
            return this.saveResult[e.toLowerCase()]
        }, getContent: function (e) {
            return this.saveResult[e.toLowerCase()].content
        }, setContent: function (e) {
            this.$search.html(this.getContent(e))
        }
    }, s.prototype = {
        init: function () {
            var t = document.querySelector(this.class.search);
            t && (t.addEventListener("click", function (t) {
                t.preventDefault(), window.clearTimeout(this.$timeout), "opened" !== this.$overlay.getAttribute("data-state") ? (this.$overlay.style.display = "block", this.$timeout = window.setTimeout(function () {
                    this.$scrim = document.createElement("div"), this.$scrim.setAttribute("id", this.class.scrim), this.$scrim.classList.add("d-lg-none"), document.querySelector("body").appendChild(this.$scrim), this.$scrim.classList.add("opened"), this.$overlay.setAttribute("data-state", "opened"), e(this.$overlay.querySelector("input")).trigger("focus"), document.querySelector("html").classList.add("search-mobile-open")
                }.bind(this), 50)) : this.close()
            }.bind(this)), document.querySelector(this.class.close).addEventListener("click", function (e) {
                e.preventDefault(), window.clearTimeout(this.$timeout), "opened" === this.$overlay.getAttribute("data-state") && this.close()
            }.bind(this)))
        }, touchmove: function (t) {
            var s = e(t.target).closest("#search-containe-mobile");
            (!s.length || s.length && s.height() >= e(t.target).children().height()) && t.preventDefault()
        }, close: function () {
            this.$overlay.style.top = "auto", this.remove(this.$scrim), this.$overlay.setAttribute("data-state", "closed"), document.querySelector("html").classList.remove("search-mobile-open"), this.$timeout = window.setTimeout(function () {
                this.$overlay.style.display = "none"
            }.bind(this), 1e3)
        }, remove: function (e) {
            e && (e.parentNode.removeChild(e), e = null)
        }
    }, window.ready(function () {
        new s
    }), window.ready(function () {
        document.querySelector("#navbar-search").addEventListener("click", function (t) {
            t.preventDefault();
            var s = this.parentNode;
            s.classList.contains("search-open") ? (s.classList.remove("search-open"), s.querySelector(".search").classList.remove("fadeIn")) : (s.classList.add("search-open"), s.querySelector(".search").classList.add("fadeIn"), e(s.querySelector("input")).trigger("focus"))
        })
    }), i
});



define(["jquery", "loader", "cookie", "modal", "bootstrap", "plagins"], function (t, e, o, n) {
    "use strict";

    function i(t, e, o) {
        !t.data("ajaxUNRequest") || t.attr("data-ajax-reinit") ? (t.data("ajaxUNRequest", new s({
            element: t,
            container: t.data("ajax-container"),
            containerUnwrap: t.data("ajax-container-unwrap"),
            secondContainer: t.data("ajax-second-container"),
            secondContainerUnwrap: t.data("ajax-second-container-unwrap"),
            secondContainerRemove: t.data("ajax-second-container-remove"),
            containerClear: t.data("ajax-container-clear"),
            loaded: !0 === o,
            reverse: t.data("loaded-scroll-reverse"),
            params: {
                url: t.attr("data-ajax-url"),
                method: t.data("ajax-method") ? t.data("ajax-method") : "GET",
                dataType: t.data("ajax-type") ? t.data("ajax-type") : "json",
                data: t.data("ajax-appear-params")
            },
            append: t.data("ajax-append"),
            replaceUrl: t.data("replace-url"),
            notification: t.data("notification"),
            notificationError: t.data("notification-error"),
            loadingText: t.data("loading-text"),
            top: t.data("ajax-scroll-top") || t.data("ajax-scroll-top") <= 0 ? t.data("ajax-scroll-top") : 100,
            loader: {
                id: !0 === t.data("loader") ? t : t.data("loader"),
                style: t.data("loader-style"),
                idloader: t.data("loader-idloader"),
                overlay: t.data("loader-overlay"),
                prepend: t.data("loader-prepend"),
                className: t.data("loader-classname")
            }
        })), t.data("ajax-request-begin-scroll") ? t.data("ajaxUNRequest").scroll() : t.data("ajaxUNRequest").ajax()) : e && !t.data("ajaxUNRequest").isProcessing() && t.data("ajaxUNRequest").ajax()
    }

    var a = {}, s = function (e) {
        this.options = t.extend({}, s.Default, e), this.$element = this.options.element instanceof t ? this.options.element : t(this.options.element), this.loader = null, this.$popover = null, this._url = null, this.processing = !1, this.loaded = !1, this.$popoverReload = null, this.MAX_UID = 1e6, this.ariaDescribedby = ~~(Math.random() * this.MAX_UID)
    };
    return s.Default = {
        element: null,
        container: !1,
        containerUnwrap: !1,
        secondContainer: !1,
        secondContainerUnwrap: !1,
        secondContainerRemove: !1,
        containerClear: !1,
        top: 100,
        loaded: !1,
        reverse: !1,
        params: {url: !1, method: "GET", dataType: "json", data: {}},
        append: !1,
        replaceUrl: !1,
        notification: !1,
        notificationError: "modal",
        loadingText: !1,
        loader: {id: !1, idloader: "uloader", overlay: !1, style: !1, className: !1, prepend: !1},
        beforeAjax: function () {
        },
        afterAjax: function () {
        },
        error: function () {
        }
    }, s.prototype = {
        init: function () {
            t("[data-ajax-request-begin]").each(function () {
                i(t(this))
            })
        }, dataAjax: function (e) {
            i(t(e), !0)
        }, scroll: function () {
            this.$element.offset().top - t(window).innerHeight() + this.$element.height() <= t(window).scrollTop() + this.options.top ? this.ajax() : t(window).on("scroll.un.ajax" + this.ariaDescribedby, function () {
                (this.$element.offset().top - t(window).innerHeight() + this.$element.height() <= t(window).scrollTop() + this.options.top || t(window).innerHeight() + t(window).scrollTop() > this.$element.offset().top) && (t(window).off("scroll.un.ajax" + this.ariaDescribedby), t(window).off("resize.un.ajax" + this.ariaDescribedby), this.ajax())
            }.bind(this))
        }, getParams: function () {
            if ("object" == typeof this.options.container && this.options.container.length ? this.$container = this.options.container : this.options.container && "string" == typeof this.options.container ? this.$container = t(this.options.container) : !1 !== this.options.container && (this.$container = this.$element), this.$secondContainer = !!this.options.secondContainer && t(this.options.secondContainer), this.$container && this.options.containerClear && (!0 === this.options.containerClear ? (this.$container.off("scroll.un.loadedscroll"), this.$container.html("")) : t(this.options.containerClear).off("scroll.un.loadedscroll").html("")), null !== this.$element && (this.$popover = !!this.$element.attr("aria-describedby") && t("#" + this.$element.attr("aria-describedby")), this.$popoverReload = !!this.$element.data("popover-reload") && t('[aria-describedby="' + this.$element.closest(".popover").attr("id") + '"]')), this.$element && "form" === this.$element.data("ajax-appear-params") && (this.options.params.data = this.$element.closest("form").serialize()), this.options.params.url) return !0
        }, ajax: function () {
            var e, o;
            e = {relatedTarget: this}, this.historyPage(), null !== this.$element && (this.$element.trigger(o = t.Event("requireajax.un.start", e)), o.isDefaultPrevented()) || this.getParams() && ("function" == typeof this.options.beforeAjax && this.options.beforeAjax.call(this, this.options), this.isLoaded() || (this.setProcessing(!0), this.setLoader(!0), t.ajax(this.options.params).then(t.proxy(this.response, this)).catch(t.proxy(this.catch, this))))
        }, catch: function (t) {
            var e;
            this.setProcessing(!1), this.setLoader(!1), "function" == typeof this.options.error && this.options.error(), this.$element.hasClass("loaded") && this.$element.removeClass("loaded"), e = {
                header: t.status,
                message: t.statusText
            }, console.log("error"), console.log(e)
        }, setContent: function (t, e, o) {
            if (o) {
                var n, i = null;
                t.find("img").length ? (n = !1, t.imagesLoaded({
                    complete: function () {
                        !1 === n && (window.clearTimeout(i), n = !0, this.insertContent(t, e))
                    }.bind(this)
                }), i = window.setTimeout(function () {
                    !1 === n && (n = !0, this.insertContent(t, e))
                }.bind(this), 3e3)) : this.insertContent(t, e)
            } else this.insertContent(t, e)
        }, insertContent: function (t, e) {
            "prepend" === e ? this.$container.prepend(t) : e ? this.$container.append(t) : this.$container.html(t)
        }, response: function (e) {
            if ("success" === e.status) if (e.content) {
                var o = t(e.content), n = !1, i = null;
                o.find("img").length ? (o.imagesLoaded({
                    complete: function () {
                        !1 === n && (window.clearTimeout(i), n = !0, this.setResponse(e, o))
                    }.bind(this)
                }), i = window.setTimeout(function () {
                    !1 === n && (n = !0, this.setResponse(e, o))
                }.bind(this), 3e3)) : this.setResponse(e, o)
            } else this.setResponse(e); else this.setProcessing(!1), this.setLoader(!1), this.options.notificationError && ("modal" === this.options.notificationError ? this.notification("warning", e, this.options.notificationError) : this.notification("warning", e))
        }, setResponse: function (e, o) {
            var n, i, a;
            this.setProcessing(!1), this.setLoader(!1), "function" == typeof this.options.afterAjax && this.options.afterAjax.call(this, e), this.options.loaded && this.setLoaded(!0), this.getUrl(e) && (history.replaceState(window.location.href, null, window.location.href), history.pushState(this.getUrl(e), null, this.getUrl(e))), null !== this.$element && (this.$element.tooltip("hide"), this.$element.tooltip("dispose"), n = {
                relatedTarget: this,
                response: e
            }, this.$element.trigger(a = t.Event("requireajax.un.show", n)), a.isDefaultPrevented()) || (this.$container || this.$element.data("popover")) && (e.title && t("title").html(e.title), e.head && t("head").html(e.head), e.content && (this.$container && (this.options.reverse && this.setReverseScroll(o), this.options.reverse || ("container" === this.$container.data("loaded-scroll") ? this.setContent(o) : !0 === this.options.append ? this.setContent(o, !0) : "prepend" === this.options.append ? this.setContent(o, "prepend") : null === this.$element || this.$element.data("popover") || this.setContent(o)), this.options.containerUnwrap && this.$container.each(function () {
                t(this).children().unwrap()
            })), null !== this.$element && this.$element.data("popover") && (this.$element.attr("data-content", e.content), this.$element.attr("aria-describedby") && this.$element.popover("show"))), this.$secondContainer && this.options.secondContainerRemove ? this.$secondContainer.remove() : this.$secondContainer && e.contentSecond && (i = t(e.contentSecond), this.$secondContainer.html(i), this.options.secondContainerUnwrap && i.unwrap()), this.historyPage(), this.$popoverReload && this.$popoverReload.removeClass("loaded").addClass("reloaded").data("loader-overlay", !0).popover("show"), this.options.notification && ("modal" === this.options.notification ? this.notification("success", e, this.options.notification) : this.notification("success", e)), n = {
                relatedTarget: this,
                response: e,
                content: o
            }, this.$container && this.$container.trigger(t.Event("requireajax.un.shown", n)))
        }, setReverseScroll: function (t) {
            this.setReverseScrollContainer(t)
        }, setReverseScrollContainer: function (e) {
            var o, n;
            this.$container.html(e), n = this.options.containerClear ? t(this.options.containerClear) : this.$container, o = e.children().length, n.children().length && o && n.scrollTop(n.get(0).scrollHeight)
        }, notification: function (t, e, o) {
            o && new n({
                element: null,
                ajax: !1,
                append: !1,
                replaceUrl: !1,
                header: !!e.header && e.header,
                modal: "alert",
                backdrop: !0,
                keyboard: !0,
                focus: !0,
                show: !0,
                size: "",
                target: "popup-modal"
            }, e.message ? e.message : e.content)
        }, setLoader: function (t) {
            (this.options.loader.id || this.$popover) && (!0 === t ? (this.options.loader.overlay ? this.loader = new e({
                loader: this.options.loader.style ? this.options.loader.style : {},
                idLoader: this.options.loader.idloader,
                className: this.options.loader.className ? this.options.loader.className : ""
            }) : this.loader = new e({
                loader: this.options.loader.style ? this.options.loader.style : {
                    position: "relative",
                    display: "block",
                    "margin-top": "0"
                },
                idLoader: this.options.loader.idloader,
                className: this.options.loader.className ? this.options.loader.className : ""
            }), this.loader.add(this.options.loader.id ? this.options.loader.id : this.$popover.find(".popover-content"), this.options.loader.overlay, !1, this.options.loader.prepend), this.$element.data("popover") && (this.$element.attr("data-content", this.loader.$loader.outerHTML), this.loader.end(), this.$element.popover("show"))) : this.loader.end())
        }, getUrl: function (t) {
            return this._url || this.options.replaceUrl && (!0 === this.options.replaceUrl && t && t.url ? this._url = t.url : !0 === this.options.replaceUrl && null !== this.$element && this.$element.attr("href") ? this._url = this.$element.attr("href") : "string" == typeof this.options.replaceUrl && (this._url = this.options.replaceUrl)), this._url
        }, historyPage: function () {
            if (this.getUrl()) {
                var e = window.location.href.replace(location.protocol + "//" + location.host, ""),
                    o = t("#wrap").clone();
                o.find("[data-ajax-request-begin]").html(""), a[e] = {
                    title: t("title").html(),
                    body: o.contents().unwrap()
                }
            }
        }, isLoaded: function () {
            return !0 === this.loaded
        }, setLoaded: function (t) {
            this.loaded = !0 === t, null !== this.$element && (this.isLoaded() ? this.$element.addClass("loaded") : this.$element.removeClass("loaded"))
        }, isProcessing: function () {
            return !0 === this.processing
        }, setProcessing: function (t) {
            this.processing = !0 === t, null !== this.$element && (!0 === t ? (this.$element.hasClass("dropdown-item") ? this.$element.closest(".dropdown-menu").prev().addClass("disabled") : this.$element.addClass("disabled"), this.options.loadingText && this.$element.html(this.options.loadingText)) : (this.$element.hasClass("dropdown-item") ? this.$element.closest(".dropdown-menu").prev().removeClass("disabled") : this.$element.removeClass("disabled"), this.options.loadingText && this.$element.html(this.$element.attr("title"))))
        }
    }, t(document).on("shown.bs.dropdown", "[data-dropdown-loaded]", function () {
        i(t(this).children('[data-toggle="dropdown"]'), !0, !0)
    }).on("shown.bs.collapse", "[data-collapse-loaded]", function (e) {
        i(t(this), !0, !0)
    }).on("shown.bs.tab", "[data-tab-loaded]", function (e) {
        i(t(e.target), !0, !0)
    }).on("shown.bs.popover", function (e) {
        i(t(e.target), !0, !0)
    }).on("click.bs.dropdown", "[data-dropdown-loaded] .dropdown-menu", function (t) {
        t.stopPropagation()
    }).on("click", "[data-ajax-request]", function (e) {
        e.preventDefault(), i(t(this), !0)
    }), t(window).on("popstate", function (e) {
        var o = window.location.href.replace(location.protocol + "//" + location.host, "");
        a[o] && (t("title").html(a[o].title), t("#wrap").html(a[o].body.clone()))
    }), t(function () {
        (new s).init()
    }), s
});


