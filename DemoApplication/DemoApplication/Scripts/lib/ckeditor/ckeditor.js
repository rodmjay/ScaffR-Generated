﻿/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function() {
    if (!window.CKEDITOR || !window.CKEDITOR.dom)
        window.CKEDITOR || (window.CKEDITOR = function() {
                var b = {
                        timestamp: "D21F",
                        version: "4 DEV (Standard)",
                        revision: "0a0682d",
                        rnd: Math.floor(900 * Math.random()) + 100,
                        _: { pending: [] },
                        status: "unloaded",
                        basePath: function() {
                            var a = window.CKEDITOR_BASEPATH || "";
                            if (!a)
                                for (var b = document.getElementsByTagName("script"), i = 0; i < b.length; i++) {
                                    var d = b[i].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                                    if (d) {
                                        a = d[1];
                                        break
                                    }
                                }
                            -1 == a.indexOf(":/") && (a = 0 ===
                                a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a);
                            if (!a)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                            return a
                        }(),
                        getUrl: function(a) {
                            -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                            this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                            return a
                        },
                        domReady: function() {
                            function a() {
                                try {
                                    document.addEventListener ?
                                    (document.removeEventListener("DOMContentLoaded", a, !1), b()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), b())
                                } catch (d) {
                                }
                            }

                            function b() { for (var a; a = i.shift();)a() }

                            var i = [];
                            return function(d) {
                                i.push(d);
                                "complete" === document.readyState && setTimeout(a, 1);
                                if (1 == i.length)
                                    if (document.addEventListener)document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
                                    else if (document.attachEvent) {
                                        document.attachEvent("onreadystatechange",
                                            a);
                                        window.attachEvent("onload", a);
                                        d = !1;
                                        try {
                                            d = !window.frameElement
                                        } catch (b) {
                                        }
                                        if (document.documentElement.doScroll && d) {
                                            var c = function() {
                                                try {
                                                    document.documentElement.doScroll("left")
                                                } catch (d) {
                                                    setTimeout(c, 1);
                                                    return
                                                }
                                                a()
                                            };
                                            c()
                                        }
                                    }
                            }
                        }()
                    },
                    h = window.CKEDITOR_GETURL;
                if (h) {
                    var a = b.getUrl;
                    b.getUrl = function(g) { return h.call(b, g) || a.call(b, g) }
                }
                return b
            }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(b) {
                var h = CKEDITOR.event.prototype, a;
                for (a in h)b[a] == void 0 && (b[a] = h[a])
            }, CKEDITOR.event.prototype =
                function() {
                    function b(g) {
                        var b = h(this);
                        return b[g] || (b[g] = new a(g))
                    }

                    var h = function(a) {
                            a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
                            return a.events || (a.events = {})
                        },
                        a = function(a) {
                            this.name = a;
                            this.listeners = []
                        };
                    a.prototype = {
                        getListenerIndex: function(a) {
                            for (var b = 0, i = this.listeners; b < i.length; b++)if (i[b].fn == a)return b;
                            return-1
                        }
                    };
                    return{
                        define: function(a, e) {
                            var i = b.call(this, a);
                            CKEDITOR.tools.extend(i, e, true)
                        },
                        on: function(a, e, i, d, f) {
                            function c(c, b, m, f) {
                                c = {
                                    name: a,
                                    sender: this,
                                    editor: c,
                                    data: b,
                                    listenerData: d,
                                    stop: m,
                                    cancel: f,
                                    removeListener: j
                                };
                                return e.call(i, c) === false ? false : c.data
                            }

                            function j() { l.removeListener(a, e) }

                            var k = b.call(this, a);
                            if (k.getListenerIndex(e) < 0) {
                                k = k.listeners;
                                i || (i = this);
                                isNaN(f) && (f = 10);
                                var l = this;
                                c.fn = e;
                                c.priority = f;
                                for (var m = k.length - 1; m >= 0; m--)
                                    if (k[m].priority <= f) {
                                        k.splice(m + 1, 0, c);
                                        return{ removeListener: j }
                                    }
                                k.unshift(c)
                            }
                            return{ removeListener: j }
                        },
                        once: function() {
                            var a = arguments[1];
                            arguments[1] = function(b) {
                                b.removeListener();
                                return a.apply(this, arguments)
                            };
                            return this.on.apply(this,
                                arguments)
                        },
                        capture: function() {
                            CKEDITOR.event.useCapture = 1;
                            var a = this.on.apply(this, arguments);
                            CKEDITOR.event.useCapture = 0;
                            return a
                        },
                        fire: function() {
                            var a = 0, b = function() { a = 1 }, i = 0, d = function() { i = 1 };
                            return function(f, c, j) {
                                var k = h(this)[f], f = a, l = i;
                                a = i = 0;
                                if (k) {
                                    var m = k.listeners;
                                    if (m.length)
                                        for (var m = m.slice(0), n, o = 0; o < m.length; o++) {
                                            if (k.errorProof)
                                                try {
                                                    n = m[o].call(this, j, c, b, d)
                                                } catch (p) {
                                                }
                                            else n = m[o].call(this, j, c, b, d);
                                            n === false ? i = 1 : typeof n != "undefined" && (c = n);
                                            if (a || i)break
                                        }
                                }
                                c = i ? false : typeof c == "undefined" ?
                                    true : c;
                                a = f;
                                i = l;
                                return c
                            }
                        }(),
                        fireOnce: function(a, b, i) {
                            b = this.fire(a, b, i);
                            delete h(this)[a];
                            return b
                        },
                        removeListener: function(a, b) {
                            var i = h(this)[a];
                            if (i) {
                                var d = i.getListenerIndex(b);
                                d >= 0 && i.listeners.splice(d, 1)
                            }
                        },
                        removeAllListeners: function() {
                            var a = h(this), b;
                            for (b in a)delete a[b]
                        },
                        hasListeners: function(a) { return(a = h(this)[a]) && a.listeners.length > 0 }
                    }
                }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
                CKEDITOR._.pending.push([this, arguments]);
                CKEDITOR.event.call(this)
            }, CKEDITOR.editor.prototype.fire =
                function(b, h) {
                    b in { instanceReady: 1, loaded: 1 } && (this[b] = true);
                    return CKEDITOR.event.prototype.fire.call(this, b, h, this)
                }, CKEDITOR.editor.prototype.fireOnce = function(b, h) {
                b in { instanceReady: 1, loaded: 1 } && (this[b] = true);
                return CKEDITOR.event.prototype.fireOnce.call(this, b, h, this)
            }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
                var b = navigator.userAgent.toLowerCase(),
                    h = window.opera,
                    a = {
                        ie: eval("/*@cc_on!@*/false"),
                        opera: !!h && h.version,
                        webkit: b.indexOf(" applewebkit/") >
                            -1,
                        air: b.indexOf(" adobeair/") > -1,
                        mac: b.indexOf("macintosh") > -1,
                        quirks: document.compatMode == "BackCompat",
                        mobile: b.indexOf("mobile") > -1,
                        iOS: /(ipad|iphone|ipod)/.test(b),
                        isCustomDomain: function() {
                            if (!this.ie)return false;
                            var a = document.domain, d = window.location.hostname;
                            return a != d && a != "[" + d + "]"
                        },
                        secure: location.protocol == "https:"
                    };
                a.gecko = navigator.product == "Gecko" && !a.webkit && !a.opera;
                if (a.webkit)b.indexOf("chrome") > -1 ? a.chrome = true : a.safari = true;
                var g = 0;
                if (a.ie) {
                    g = a.quirks || !document.documentMode ?
                        parseFloat(b.match(/msie (\d+)/)[1]) : document.documentMode;
                    a.ie9Compat = g == 9;
                    a.ie8Compat = g == 8;
                    a.ie7Compat = g == 7;
                    a.ie6Compat = g < 7 || a.quirks
                }
                if (a.gecko) {
                    var e = b.match(/rv:([\d\.]+)/);
                    if (e) {
                        e = e[1].split(".");
                        g = e[0] * 1E4 + (e[1] || 0) * 100 + (e[2] || 0) * 1
                    }
                }
                a.opera && (g = parseFloat(h.version()));
                a.air && (g = parseFloat(b.match(/ adobeair\/(\d+)/)[1]));
                a.webkit && (g = parseFloat(b.match(/ applewebkit\/(\d+)/)[1]));
                a.version = g;
                a.isCompatible = a.iOS && g >= 534 || !a.mobile && (a.ie && g > 6 || a.gecko && g >= 10801 || a.opera && g >= 9.5 || a.air && g >=
                    1 || a.webkit && g >= 522 || false);
                a.cssClass = "cke_browser_" + (a.ie ? "ie" : a.gecko ? "gecko" : a.opera ? "opera" : a.webkit ? "webkit" : "unknown");
                if (a.quirks)a.cssClass = a.cssClass + " cke_browser_quirks";
                if (a.ie) {
                    a.cssClass = a.cssClass + (" cke_browser_ie" + (a.quirks || a.version < 7 ? "6" : a.version));
                    if (a.quirks)a.cssClass = a.cssClass + " cke_browser_iequirks"
                }
                if (a.gecko)
                    if (g < 10900)a.cssClass = a.cssClass + " cke_browser_gecko18";
                    else if (g <= 11E3)a.cssClass = a.cssClass + " cke_browser_gecko19";
                if (a.air)a.cssClass = a.cssClass + " cke_browser_air";
                return a
            }()), "unloaded" == CKEDITOR.status && function() {
                CKEDITOR.event.implementOn(CKEDITOR);
                CKEDITOR.loadFullCore = function() {
                    if (CKEDITOR.status != "basic_ready")CKEDITOR.loadFullCore._load = 1;
                    else {
                        delete CKEDITOR.loadFullCore;
                        var b = document.createElement("script");
                        b.type = "text/javascript";
                        b.src = CKEDITOR.basePath + "ckeditor.js";
                        document.getElementsByTagName("head")[0].appendChild(b)
                    }
                };
                CKEDITOR.loadFullCoreTimeout = 0;
                CKEDITOR.add = function(b) { (this._.pending || (this._.pending = [])).push(b) };
                (function() {
                    CKEDITOR.domReady(function() {
                        var b =
                                CKEDITOR.loadFullCore,
                            h = CKEDITOR.loadFullCoreTimeout;
                        if (b) {
                            CKEDITOR.status = "basic_ready";
                            b && b._load ? b() : h && setTimeout(function() { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, h * 1E3)
                        }
                    })
                })();
                CKEDITOR.status = "basic_loaded"
            }(), CKEDITOR.dom = {}, function() {
                var b = [], h = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
                CKEDITOR.on("reset", function() { b = [] });
                CKEDITOR.tools = {
                    arrayCompare: function(a, g) {
                        if (!a && !g)return true;
                        if (!a || !g || a.length != g.length)return false;
                        for (var b = 0; b < a.length; b++)if (a[b] != g[b])return false;
                        return true
                    },
                    clone: function(a) {
                        var g;
                        if (a && a instanceof Array) {
                            g = [];
                            for (var b = 0; b < a.length; b++)g[b] = this.clone(a[b]);
                            return g
                        }
                        if (a === null || typeof a != "object" || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp)return a;
                        g = new a.constructor;
                        for (b in a)g[b] = this.clone(a[b]);
                        return g
                    },
                    capitalize: function(a) { return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase() },
                    extend: function(a) {
                        var g = arguments.length,
                            b,
                            i;
                        if (typeof(b = arguments[g - 1]) == "boolean")g--;
                        else if (typeof(b = arguments[g - 2]) == "boolean") {
                            i = arguments[g - 1];
                            g = g - 2
                        }
                        for (var d = 1; d < g; d++) {
                            var f = arguments[d], c;
                            for (c in f)if (b === true || a[c] == void 0)if (!i || c in i)a[c] = f[c]
                        }
                        return a
                    },
                    prototypedCopy: function(a) {
                        var g = function() {};
                        g.prototype = a;
                        return new g
                    },
                    isArray: function(a) { return!!a && a instanceof Array },
                    isEmpty: function(a) {
                        for (var g in a)if (a.hasOwnProperty(g))return false;
                        return true
                    },
                    cssVendorPrefix: function(a, g, b) {
                        if (b)
                            return h + a + ":" + g + ";" + a + ":" +
                                g;
                        b = {};
                        b[a] = g;
                        b[h + a] = g;
                        return b
                    },
                    cssStyleToDomStyle: function() {
                        var a = document.createElement("div").style, b = typeof a.cssFloat != "undefined" ? "cssFloat" : typeof a.styleFloat != "undefined" ? "styleFloat" : "float";
                        return function(a) { return a == "float" ? b : a.replace(/-./g, function(a) { return a.substr(1).toUpperCase() }) }
                    }(),
                    buildStyleHtml: function(a) {
                        for (var a = [].concat(a), b, e = [], i = 0; i < a.length; i++)if (b = a[i])/@
                        import | [{}] / .
                        test(b) ? e.push("<style>" + b + "</style>") : e.push('<link type="text/css" rel=stylesheet href="' +
                            b + '">');
                        return e.join("")
                    },
                    htmlEncode: function(a) { return("" + a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;") },
                    htmlEncodeAttr: function(a) { return a.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") },
                    getNextNumber: function() {
                        var a = 0;
                        return function() { return++a }
                    }(),
                    getNextId: function() { return"cke_" + this.getNextNumber() },
                    override: function(a, b) {
                        var e = b(a);
                        e.prototype = a.prototype;
                        return e
                    },
                    setTimeout: function(a, b, e, i, d) {
                        d || (d = window);
                        e || (e = d);
                        return d.setTimeout(function() {
                            i ?
                                a.apply(e, [].concat(i)) : a.apply(e)
                        }, b || 0)
                    },
                    trim: function() {
                        var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                        return function(b) { return b.replace(a, "") }
                    }(),
                    ltrim: function() {
                        var a = /^[ \t\n\r]+/g;
                        return function(b) { return b.replace(a, "") }
                    }(),
                    rtrim: function() {
                        var a = /[ \t\n\r]+$/g;
                        return function(b) { return b.replace(a, "") }
                    }(),
                    indexOf: function(a, b) {
                        if (typeof b == "function")
                            for (var e = 0, i = a.length; e < i; e++) {
                                if (b(a[e]))return e
                            }
                        else {
                            if (a.indexOf)return a.indexOf(b);
                            e = 0;
                            for (i = a.length; e < i; e++)if (a[e] === b)return e
                        }
                        return-1
                    },
                    search: function(a, b) {
                        var e = CKEDITOR.tools.indexOf(a, b);
                        return e >= 0 ? a[e] : null
                    },
                    bind: function(a, b) { return function() { return a.apply(b, arguments) } },
                    createClass: function(a) {
                        var b = a.$, e = a.base, i = a.privates || a._, d = a.proto, a = a.statics;
                        !b && (b = function() { e && this.base.apply(this, arguments) });
                        if (i)
                            var f = b,
                                b = function() {
                                    var a = this._ || (this._ = {}), b;
                                    for (b in i) {
                                        var d = i[b];
                                        a[b] = typeof d == "function" ? CKEDITOR.tools.bind(d, this) : d
                                    }
                                    f.apply(this, arguments)
                                };
                        if (e) {
                            b.prototype = this.prototypedCopy(e.prototype);
                            b.prototype.constructor =
                                b;
                            b.base = e;
                            b.baseProto = e.prototype;
                            b.prototype.base = function() {
                                this.base = e.prototype.base;
                                e.apply(this, arguments);
                                this.base = arguments.callee
                            }
                        }
                        d && this.extend(b.prototype, d, true);
                        a && this.extend(b, a, true);
                        return b
                    },
                    addFunction: function(a, g) { return b.push(function() { return a.apply(g || this, arguments) }) - 1 },
                    removeFunction: function(a) { b[a] = null },
                    callFunction: function(a) {
                        var g = b[a];
                        return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
                    },
                    cssLength: function() {
                        var a = /^-?\d+\.?\d*px$/, b;
                        return function(e) {
                            b =
                                CKEDITOR.tools.trim(e + "") + "px";
                            return a.test(b) ? b : e || ""
                        }
                    }(),
                    convertToPx: function() {
                        var a;
                        return function(b) {
                            if (!a) {
                                a = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                                CKEDITOR.document.getBody().append(a)
                            }
                            if (!/%$/.test(b)) {
                                a.setStyle("width", b);
                                return a.$.clientWidth
                            }
                            return b
                        }
                    }(),
                    repeat: function(a, b) { return Array(b + 1).join(a) },
                    tryThese: function() {
                        for (var a, b = 0, e = arguments.length; b < e; b++) {
                            var i =
                                arguments[b];
                            try {
                                a = i();
                                break
                            } catch (d) {
                            }
                        }
                        return a
                    },
                    genKey: function() { return Array.prototype.slice.call(arguments).join("-") },
                    defer: function(a) {
                        return function() {
                            var b = arguments, e = this;
                            window.setTimeout(function() { a.apply(e, b) }, 0)
                        }
                    },
                    normalizeCssText: function(a, b) {
                        var e = [], i, d = CKEDITOR.tools.parseCssText(a, true, b);
                        for (i in d)e.push(i + ":" + d[i]);
                        e.sort();
                        return e.length ? e.join(";") + ";" : ""
                    },
                    convertRgbToHex: function(a) {
                        return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, i, d) {
                            a =
                            [b, i, d];
                            for (b = 0; b < 3; b++)a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
                            return"#" + a.join("")
                        })
                    },
                    parseCssText: function(a, b, e) {
                        var i = {};
                        if (e) {
                            e = new CKEDITOR.dom.element("span");
                            e.setAttribute("style", a);
                            a = CKEDITOR.tools.convertRgbToHex(e.getAttribute("style") || "")
                        }
                        if (!a || a == ";")return i;
                        a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, f, c) {
                            if (b) {
                                f = f.toLowerCase();
                                f == "font-family" && (c = c.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                                c = CKEDITOR.tools.trim(c)
                            }
                            i[f] =
                                c
                        });
                        return i
                    }
                }
            }(), CKEDITOR.dtd = function() {
                var b = CKEDITOR.tools.extend,
                    h = function(a, b) {
                        for (var d = CKEDITOR.tools.clone(a), c = 1; c < arguments.length; c++) {
                            var b = arguments[c], g;
                            for (g in b)delete d[g]
                        }
                        return d
                    },
                    a = {},
                    g = {},
                    e = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 },
                    i = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 },
                    d = {},
                    f = { "#": 1 },
                    c = {
                        center: 1,
                        dir: 1,
                        noframes: 1
                    };
                b(a, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, "var": 1, video: 1, wbr: 1 }, f, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 });
                b(g, e, a, c);
                h = {
                    a: h(a, { a: 1, button: 1 }),
                    abbr: a,
                    address: g,
                    area: d,
                    article: b({ style: 1 }, g),
                    aside: b({ style: 1 }, g),
                    audio: b({ source: 1, track: 1 }, g),
                    b: a,
                    base: d,
                    bdi: a,
                    bdo: a,
                    blockquote: g,
                    body: g,
                    br: d,
                    button: h(a, { a: 1, button: 1 }),
                    canvas: a,
                    caption: g,
                    cite: a,
                    code: a,
                    col: d,
                    colgroup: { col: 1 },
                    command: d,
                    datalist: b({ option: 1 }, a),
                    dd: g,
                    del: a,
                    details: b({ summary: 1 }, g),
                    dfn: a,
                    div: b({ style: 1 }, g),
                    dl: { dt: 1, dd: 1 },
                    dt: g,
                    em: a,
                    embed: d,
                    fieldset: b({ legend: 1 }, g),
                    figcaption: g,
                    figure: b({ figcaption: 1 }, g),
                    footer: g,
                    form: g,
                    h1: a,
                    h2: a,
                    h3: a,
                    h4: a,
                    h5: a,
                    h6: a,
                    head: b({ title: 1, base: 1 }, i),
                    header: g,
                    hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
                    hr: d,
                    html: b({ head: 1, body: 1 }, g, i),
                    i: a,
                    iframe: f,
                    img: d,
                    input: d,
                    ins: a,
                    kbd: a,
                    keygen: d,
                    label: a,
                    legend: a,
                    li: g,
                    link: d,
                    map: g,
                    mark: a,
                    menu: b({ li: 1 }, g),
                    meta: d,
                    meter: h(a, { meter: 1 }),
                    nav: g,
                    noscript: b({ link: 1, meta: 1, style: 1 }, a),
                    object: b({ param: 1 }, a),
                    ol: { li: 1 },
                    optgroup: { option: 1 },
                    option: f,
                    output: a,
                    p: a,
                    param: d,
                    pre: a,
                    progress: h(a, { progress: 1 }),
                    q: a,
                    rp: a,
                    rt: a,
                    ruby: b({ rp: 1, rt: 1 }, a),
                    s: a,
                    samp: a,
                    script: f,
                    section: b({ style: 1 }, g),
                    select: { optgroup: 1, option: 1 },
                    small: a,
                    source: d,
                    span: a,
                    strong: a,
                    style: f,
                    sub: a,
                    summary: a,
                    sup: a,
                    table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 },
                    tbody: { tr: 1 },
                    td: g,
                    textarea: f,
                    tfoot: { tr: 1 },
                    th: g,
                    thead: { tr: 1 },
                    time: h(a, { time: 1 }),
                    title: f,
                    tr: { th: 1, td: 1 },
                    track: d,
                    u: a,
                    ul: { li: 1 },
                    "var": a,
                    video: b({ source: 1, track: 1 }, g),
                    wbr: d,
                    acronym: a,
                    applet: b({ param: 1 }, g),
                    basefont: d,
                    big: a,
                    center: g,
                    dialog: d,
                    dir: { li: 1 },
                    font: a,
                    isindex: d,
                    noframes: g,
                    strike: a,
                    tt: a
                };
                b(h, {
                    $block: b({ audio: 1, dd: 1, dt: 1, li: 1, video: 1 }, e, c),
                    $blockLimit: {
                        article: 1,
                        aside: 1,
                        audio: 1,
                        body: 1,
                        caption: 1,
                        details: 1,
                        dir: 1,
                        div: 1,
                        dl: 1,
                        fieldset: 1,
                        figure: 1,
                        footer: 1,
                        form: 1,
                        header: 1,
                        hgroup: 1,
                        menu: 1,
                        nav: 1,
                        ol: 1,
                        section: 1,
                        table: 1,
                        td: 1,
                        th: 1,
                        tr: 1,
                        ul: 1,
                        video: 1
                    },
                    $cdata: { script: 1, style: 1 },
                    $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, nav: 1, p: 1, pre: 1, section: 1 },
                    $empty: { area: 1, base: 1, basefont: 1, br: 1, col: 1, command: 1, dialog: 1, embed: 1, hr: 1, img: 1, input: 1, isindex: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1 },
                    $inline: a,
                    $list: {
                        dl: 1,
                        ol: 1,
                        ul: 1
                    },
                    $listItem: { dd: 1, dt: 1, li: 1 },
                    $nonBodyContent: b({ body: 1, head: 1, html: 1 }, h.head),
                    $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 },
                    $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 },
                    $removeEmpty: {
                        abbr: 1,
                        acronym: 1,
                        b: 1,
                        bdi: 1,
                        bdo: 1,
                        big: 1,
                        cite: 1,
                        code: 1,
                        del: 1,
                        dfn: 1,
                        em: 1,
                        font: 1,
                        i: 1,
                        ins: 1,
                        label: 1,
                        kbd: 1,
                        mark: 1,
                        meter: 1,
                        output: 1,
                        q: 1,
                        ruby: 1,
                        s: 1,
                        samp: 1,
                        small: 1,
                        span: 1,
                        strike: 1,
                        strong: 1,
                        sub: 1,
                        sup: 1,
                        time: 1,
                        tt: 1,
                        u: 1,
                        "var": 1
                    },
                    $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 },
                    $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 },
                    $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 },
                    $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
                });
                return h
            }(), CKEDITOR.dom.event = function(b) { this.$ = b }, CKEDITOR.dom.event.prototype =
            {
                getKey: function() { return this.$.keyCode || this.$.which },
                getKeystroke: function() {
                    var b = this.getKey();
                    if (this.$.ctrlKey || this.$.metaKey)b = b + CKEDITOR.CTRL;
                    this.$.shiftKey && (b = b + CKEDITOR.SHIFT);
                    this.$.altKey && (b = b + CKEDITOR.ALT);
                    return b
                },
                preventDefault: function(b) {
                    var h = this.$;
                    h.preventDefault ? h.preventDefault() : h.returnValue = false;
                    b && this.stopPropagation()
                },
                stopPropagation: function() {
                    var b = this.$;
                    b.stopPropagation ? b.stopPropagation() : b.cancelBubble = true
                },
                getTarget: function() {
                    var b = this.$.target || this.$.srcElement;
                    return b ? new CKEDITOR.dom.node(b) : null
                },
                getPhase: function() { return this.$.eventPhase || 2 },
                getPageOffset: function() {
                    var b = this.getTarget().getDocument().$;
                    return{ x: this.$.pageX || this.$.clientX + (b.documentElement.scrollLeft || b.body.scrollLeft), y: this.$.pageY || this.$.clientY + (b.documentElement.scrollTop || b.body.scrollTop) }
                }
            }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject =
                function(b) { if (b)this.$ = b }, CKEDITOR.dom.domObject.prototype = function() {
                var b = function(b, a) { return function(g) { typeof CKEDITOR != "undefined" && b.fire(a, new CKEDITOR.dom.event(g)) } };
                return{
                    getPrivate: function() {
                        var b;
                        if (!(b = this.getCustomData("_")))this.setCustomData("_", b = {});
                        return b
                    },
                    on: function(h) {
                        var a = this.getCustomData("_cke_nativeListeners");
                        if (!a) {
                            a = {};
                            this.setCustomData("_cke_nativeListeners", a)
                        }
                        if (!a[h]) {
                            a = a[h] = b(this, h);
                            this.$.addEventListener ? this.$.addEventListener(h, a, !!CKEDITOR.event.useCapture) :
                                this.$.attachEvent && this.$.attachEvent("on" + h, a)
                        }
                        return CKEDITOR.event.prototype.on.apply(this, arguments)
                    },
                    removeListener: function(b) {
                        CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                        if (!this.hasListeners(b)) {
                            var a = this.getCustomData("_cke_nativeListeners"), g = a && a[b];
                            if (g) {
                                this.$.removeEventListener ? this.$.removeEventListener(b, g, false) : this.$.detachEvent && this.$.detachEvent("on" + b, g);
                                delete a[b]
                            }
                        }
                    },
                    removeAllListeners: function() {
                        var b = this.getCustomData("_cke_nativeListeners"), a;
                        for (a in b) {
                            var g =
                                b[a];
                            this.$.detachEvent ? this.$.detachEvent("on" + a, g) : this.$.removeEventListener && this.$.removeEventListener(a, g, false);
                            delete b[a]
                        }
                    }
                }
            }(), function(b) {
                var h = {};
                CKEDITOR.on("reset", function() { h = {} });
                b.equals = function(a) {
                    try {
                        return a && a.$ === this.$
                    } catch (b) {
                        return false
                    }
                };
                b.setCustomData = function(a, b) {
                    var e = this.getUniqueId();
                    (h[e] || (h[e] = {}))[a] = b;
                    return this
                };
                b.getCustomData = function(a) {
                    var b = this.$["data-cke-expando"];
                    return(b = b && h[b]) && a in b ? b[a] : null
                };
                b.removeCustomData = function(a) {
                    var b = this.$["data-cke-expando"],
                        b = b && h[b],
                        e,
                        i;
                    if (b) {
                        e = b[a];
                        i = a in b;
                        delete b[a]
                    }
                    return i ? e : null
                };
                b.clearCustomData = function() {
                    this.removeAllListeners();
                    var a = this.$["data-cke-expando"];
                    a && delete h[a]
                };
                b.getUniqueId = function() { return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber()) };
                CKEDITOR.event.implementOn(b)
            }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(b) {
                return b ? new CKEDITOR.dom[b.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : b.nodeType == CKEDITOR.NODE_ELEMENT ? "element" :
                    b.nodeType == CKEDITOR.NODE_TEXT ? "text" : b.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : b.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](b) : this
            }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED =
                8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
                appendTo: function(b, h) {
                    b.append(this, h);
                    return b
                },
                clone: function(b, h) {
                    var a = this.$.cloneNode(b),
                        g = function(a) {
                            a["data-cke-expando"] && (a["data-cke-expando"] = false);
                            if (a.nodeType == CKEDITOR.NODE_ELEMENT) {
                                h || a.removeAttribute("id", false);
                                if (b)for (var a = a.childNodes, i = 0; i < a.length; i++)g(a[i])
                            }
                        };
                    g(a);
                    return new CKEDITOR.dom.node(a)
                },
                hasPrevious: function() { return!!this.$.previousSibling },
                hasNext: function() { return!!this.$.nextSibling },
                insertAfter: function(b) {
                    b.$.parentNode.insertBefore(this.$, b.$.nextSibling);
                    return b
                },
                insertBefore: function(b) {
                    b.$.parentNode.insertBefore(this.$, b.$);
                    return b
                },
                insertBeforeMe: function(b) {
                    this.$.parentNode.insertBefore(b.$, this.$);
                    return b
                },
                getAddress: function(b) {
                    for (var h = [], a = this.getDocument().$.documentElement, g = this.$; g && g != a;) {
                        var e = g.parentNode;
                        e && h.unshift(this.getIndex.call({ $: g }, b));
                        g = e
                    }
                    return h
                },
                getDocument: function() { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) },
                getIndex: function(b) {
                    var h = this.$, a = -1, g;
                    if (!this.$.parentNode)return a;
                    do
                        if (!b || !(h != this.$ && h.nodeType == CKEDITOR.NODE_TEXT && (g || !h.nodeValue))) {
                            a++;
                            g = h.nodeType == CKEDITOR.NODE_TEXT
                        }
                    while (h = h.previousSibling);
                    return a
                },
                getNextSourceNode: function(b, h, a) {
                    if (a && !a.call)var g = a, a = function(a) { return!a.equals(g) };
                    var b = !b && this.getFirst && this.getFirst(), e;
                    if (!b) {
                        if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false)return null;
                        b = this.getNext()
                    }
                    for (; !b && (e = (e || this).getParent());) {
                        if (a && a(e, true) ===
                            false)return null;
                        b = e.getNext()
                    }
                    return!b || a && a(b) === false ? null : h && h != b.type ? b.getNextSourceNode(false, h, a) : b
                },
                getPreviousSourceNode: function(b, h, a) {
                    if (a && !a.call)var g = a, a = function(a) { return!a.equals(g) };
                    var b = !b && this.getLast && this.getLast(), e;
                    if (!b) {
                        if (this.type == CKEDITOR.NODE_ELEMENT && a && a(this, true) === false)return null;
                        b = this.getPrevious()
                    }
                    for (; !b && (e = (e || this).getParent());) {
                        if (a && a(e, true) === false)return null;
                        b = e.getPrevious()
                    }
                    return!b || a && a(b) === false ? null : h && b.type != h ? b.getPreviousSourceNode(false,
                        h, a) : b
                },
                getPrevious: function(b) {
                    var h = this.$, a;
                    do a = (h = h.previousSibling) && h.nodeType != 10 && new CKEDITOR.dom.node(h);
                    while (a && b && !b(a));
                    return a
                },
                getNext: function(b) {
                    var h = this.$, a;
                    do a = (h = h.nextSibling) && new CKEDITOR.dom.node(h);
                    while (a && b && !b(a));
                    return a
                },
                getParent: function(b) {
                    var h = this.$.parentNode;
                    return h && (h.nodeType == CKEDITOR.NODE_ELEMENT || b && h.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(h) : null
                },
                getParents: function(b) {
                    var h = this, a = [];
                    do a[b ? "push" : "unshift"](h);
                    while (h =
                        h.getParent());
                    return a
                },
                getCommonAncestor: function(b) {
                    if (b.equals(this))return this;
                    if (b.contains && b.contains(this))return b;
                    var h = this.contains ? this : this.getParent();
                    do if (h.contains(b))return h;
                    while (h = h.getParent());
                    return null
                },
                getPosition: function(b) {
                    var h = this.$, a = b.$;
                    if (h.compareDocumentPosition)return h.compareDocumentPosition(a);
                    if (h == a)return CKEDITOR.POSITION_IDENTICAL;
                    if (this.type == CKEDITOR.NODE_ELEMENT && b.type == CKEDITOR.NODE_ELEMENT) {
                        if (h.contains) {
                            if (h.contains(a))
                                return CKEDITOR.POSITION_CONTAINS +
                                    CKEDITOR.POSITION_PRECEDING;
                            if (a.contains(h))return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                        }
                        if ("sourceIndex" in h)return h.sourceIndex < 0 || a.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : h.sourceIndex < a.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
                    }
                    for (var h = this.getAddress(), b = b.getAddress(), a = Math.min(h.length, b.length), g = 0; g <= a - 1; g++)
                        if (h[g] != b[g]) {
                            if (g < a)return h[g] < b[g] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                            break
                        }
                    return h.length < b.length ?
                        CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
                },
                getAscendant: function(b, h) {
                    var a = this.$, g;
                    if (!h)a = a.parentNode;
                    for (; a;) {
                        if (a.nodeName && (g = a.nodeName.toLowerCase(), typeof b == "string" ? g == b : g in b))return new CKEDITOR.dom.node(a);
                        a = a.parentNode
                    }
                    return null
                },
                hasAscendant: function(b, h) {
                    var a = this.$;
                    if (!h)a = a.parentNode;
                    for (; a;) {
                        if (a.nodeName && a.nodeName.toLowerCase() == b)return true;
                        a = a.parentNode
                    }
                    return false
                },
                move: function(b, h) {
                    b.append(this.remove(),
                        h)
                },
                remove: function(b) {
                    var h = this.$, a = h.parentNode;
                    if (a) {
                        if (b)for (; b = h.firstChild;)a.insertBefore(h.removeChild(b), h);
                        a.removeChild(h)
                    }
                    return this
                },
                replace: function(b) {
                    this.insertBefore(b);
                    b.remove()
                },
                trim: function() {
                    this.ltrim();
                    this.rtrim()
                },
                ltrim: function() {
                    for (var b; this.getFirst && (b = this.getFirst());) {
                        if (b.type == CKEDITOR.NODE_TEXT) {
                            var h = CKEDITOR.tools.ltrim(b.getText()), a = b.getLength();
                            if (h) {
                                if (h.length < a) {
                                    b.split(a - h.length);
                                    this.$.removeChild(this.$.firstChild)
                                }
                            } else {
                                b.remove();
                                continue
                            }
                        }
                        break
                    }
                },
                rtrim: function() {
                    for (var b; this.getLast && (b = this.getLast());) {
                        if (b.type == CKEDITOR.NODE_TEXT) {
                            var h = CKEDITOR.tools.rtrim(b.getText()), a = b.getLength();
                            if (h) {
                                if (h.length < a) {
                                    b.split(h.length);
                                    this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                                }
                            } else {
                                b.remove();
                                continue
                            }
                        }
                        break
                    }
                    if (!CKEDITOR.env.ie && !CKEDITOR.env.opera)(b = this.$.lastChild) && (b.type == 1 && b.nodeName.toLowerCase() == "br") && b.parentNode.removeChild(b)
                },
                isReadOnly: function() {
                    var b = this;
                    this.type != CKEDITOR.NODE_ELEMENT && (b = this.getParent());
                    if (b && typeof b.$.isContentEditable != "undefined")return!(b.$.isContentEditable || b.data("cke-editable"));
                    for (; b;) {
                        if (b.data("cke-editable"))break;
                        if (b.getAttribute("contentEditable") == "false")return true;
                        if (b.getAttribute("contentEditable") == "true")break;
                        b = b.getParent()
                    }
                    return!b
                }
            }), CKEDITOR.dom.window = function(b) { CKEDITOR.dom.domObject.call(this, b) }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
                focus: function() { this.$.focus() },
                getViewPaneSize: function() {
                    var b =
                            this.$.document,
                        h = b.compatMode == "CSS1Compat";
                    return{ width: (h ? b.documentElement.clientWidth : b.body.clientWidth) || 0, height: (h ? b.documentElement.clientHeight : b.body.clientHeight) || 0 }
                },
                getScrollPosition: function() {
                    var b = this.$;
                    if ("pageXOffset" in b)return{ x: b.pageXOffset || 0, y: b.pageYOffset || 0 };
                    b = b.document;
                    return{ x: b.documentElement.scrollLeft || b.body.scrollLeft || 0, y: b.documentElement.scrollTop || b.body.scrollTop || 0 }
                },
                getFrame: function() {
                    var b = this.$.frameElement;
                    return b ? new CKEDITOR.dom.element.get(b) :
                        null
                }
            }), CKEDITOR.dom.document = function(b) { CKEDITOR.dom.domObject.call(this, b) }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
                type: CKEDITOR.NODE_DOCUMENT,
                appendStyleSheet: function(b) {
                    if (this.$.createStyleSheet)this.$.createStyleSheet(b);
                    else {
                        var h = new CKEDITOR.dom.element("link");
                        h.setAttributes({ rel: "stylesheet", type: "text/css", href: b });
                        this.getHead().append(h)
                    }
                },
                appendStyleText: function(b) {
                    if (this.$.createStyleSheet) {
                        var h = this.$.createStyleSheet("");
                        h.cssText = b
                    } else {
                        var a = new CKEDITOR.dom.element("style", this);
                        a.append(new CKEDITOR.dom.text(b, this));
                        this.getHead().append(a)
                    }
                    return h || a.$.sheet
                },
                createElement: function(b, h) {
                    var a = new CKEDITOR.dom.element(b, this);
                    if (h) {
                        h.attributes && a.setAttributes(h.attributes);
                        h.styles && a.setStyles(h.styles)
                    }
                    return a
                },
                createText: function(b) { return new CKEDITOR.dom.text(b, this) },
                focus: function() { this.getWindow().focus() },
                getActive: function() { return new CKEDITOR.dom.element(this.$.activeElement) },
                getById: function(b) {
                    return(b =
                        this.$.getElementById(b)) ? new CKEDITOR.dom.element(b) : null
                },
                getByAddress: function(b, h) {
                    for (var a = this.$.documentElement, g = 0; a && g < b.length; g++) {
                        var e = b[g];
                        if (h)
                            for (var i = -1, d = 0; d < a.childNodes.length; d++) {
                                var f = a.childNodes[d];
                                if (!(h === true && f.nodeType == 3 && f.previousSibling && f.previousSibling.nodeType == 3)) {
                                    i++;
                                    if (i == e) {
                                        a = f;
                                        break
                                    }
                                }
                            }
                        else a = a.childNodes[e]
                    }
                    return a ? new CKEDITOR.dom.node(a) : null
                },
                getElementsByTag: function(b, h) {
                    if ((!CKEDITOR.env.ie || document.documentMode > 8) && h)b = h + ":" + b;
                    return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(b))
                },
                getHead: function() {
                    var b = this.$.getElementsByTagName("head")[0];
                    return b = b ? new CKEDITOR.dom.element(b) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true)
                },
                getBody: function() { return new CKEDITOR.dom.element(this.$.body) },
                getDocumentElement: function() { return new CKEDITOR.dom.element(this.$.documentElement) },
                getWindow: function() {
                    var b = new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
                    return(this.getWindow = function() { return b })()
                },
                write: function(b) {
                    this.$.open("text/html",
                        "replace");
                    CKEDITOR.env.isCustomDomain() && (this.$.domain = document.domain);
                    this.$.write(b);
                    this.$.close()
                }
            }), CKEDITOR.dom.nodeList = function(b) { this.$ = b }, CKEDITOR.dom.nodeList.prototype = {
                count: function() { return this.$.length },
                getItem: function(b) {
                    if (b < 0 || b >= this.$.length)return null;
                    return(b = this.$[b]) ? new CKEDITOR.dom.node(b) : null
                }
            }, CKEDITOR.dom.element = function(b, h) {
                typeof b == "string" && (b = (h ? h.$ : document).createElement(b));
                CKEDITOR.dom.domObject.call(this, b)
            }, CKEDITOR.dom.element.get = function(b) {
                return(b =
                    typeof b == "string" ? document.getElementById(b) || document.getElementsByName(b)[0] : b) && (b.$ ? b : new CKEDITOR.dom.element(b))
            }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(b, h) {
                var a = new CKEDITOR.dom.element("div", h);
                a.setHtml(b);
                return a.getFirst().remove()
            }, CKEDITOR.dom.element.setMarker = function(b, h, a, g) {
                var e = h.getCustomData("list_marker_id") || h.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
                    i = h.getCustomData("list_marker_names") ||
                        h.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
                b[e] = h;
                i[a] = 1;
                return h.setCustomData(a, g)
            }, CKEDITOR.dom.element.clearAllMarkers = function(b) { for (var h in b)CKEDITOR.dom.element.clearMarkers(b, b[h], 1) }, CKEDITOR.dom.element.clearMarkers = function(b, h, a) {
                var g = h.getCustomData("list_marker_names"), e = h.getCustomData("list_marker_id"), i;
                for (i in g)h.removeCustomData(i);
                h.removeCustomData("list_marker_names");
                if (a) {
                    h.removeCustomData("list_marker_id");
                    delete b[e]
                }
            }, function() {
                function b(a) {
                    for (var b =
                                 0,
                        e = 0,
                        i = h[a].length; e < i; e++)b = b + (parseInt(this.getComputedStyle(h[a][e]) || 0, 10) || 0);
                    return b
                }

                CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
                    type: CKEDITOR.NODE_ELEMENT,
                    addClass: function(a) {
                        var b = this.$.className;
                        b && (RegExp("(?:^|\\s)" + a + "(?:\\s|$)", "").test(b) || (b = b + (" " + a)));
                        this.$.className = b || a
                    },
                    removeClass: function(a) {
                        var b = this.getAttribute("class");
                        if (b) {
                            a = RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "i");
                            if (a.test(b))(b = b.replace(a, "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class")
                        }
                        return this
                    },
                    hasClass: function(a) { return RegExp("(?:^|\\s+)" + a + "(?=\\s|$)", "").test(this.getAttribute("class")) },
                    append: function(a, b) {
                        typeof a == "string" && (a = this.getDocument().createElement(a));
                        b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
                        return a
                    },
                    appendHtml: function(a) {
                        if (this.$.childNodes.length) {
                            var b = new CKEDITOR.dom.element("div", this.getDocument());
                            b.setHtml(a);
                            b.moveChildren(this)
                        } else this.setHtml(a)
                    },
                    appendText: function(a) { this.$.text != void 0 ? this.$.text = this.$.text + a : this.append(new CKEDITOR.dom.text(a)) },
                    appendBogus: function() {
                        for (var a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious();
                        if (!a || !a.is || !a.is("br")) {
                            a = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                            CKEDITOR.env.gecko && a.setAttribute("type", "_moz");
                            this.append(a)
                        }
                    },
                    breakParent: function(a) {
                        var b = new CKEDITOR.dom.range(this.getDocument());
                        b.setStartAfter(this);
                        b.setEndAfter(a);
                        a = b.extractContents();
                        b.insertNode(this.remove());
                        a.insertAfterNode(this)
                    },
                    contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(a) {
                        var b = this.$;
                        return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
                    } : function(a) { return!!(this.$.compareDocumentPosition(a.$) & 16) },
                    focus: function() {
                        function a() {
                            try {
                                this.$.focus()
                            } catch (a) {
                            }
                        }

                        return function(b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) }
                    }(),
                    getHtml: function() {
                        var a = this.$.innerHTML;
                        return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
                    },
                    getOuterHtml: function() {
                        if (this.$.outerHTML)
                            return this.$.outerHTML.replace(/<\?[^>]*>/,
                                "");
                        var a = this.$.ownerDocument.createElement("div");
                        a.appendChild(this.$.cloneNode(true));
                        return a.innerHTML
                    },
                    getClientRect: function() {
                        var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                        !a.width && (a.width = a.right - a.left);
                        !a.height && (a.height = a.bottom - a.top);
                        return a
                    },
                    setHtml: function() {
                        var a = function(a) { return this.$.innerHTML = a };
                        return CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(a) {
                            try {
                                return this.$.innerHTML = a
                            } catch (b) {
                                this.$.innerHTML = "";
                                var i = new CKEDITOR.dom.element("body", this.getDocument());
                                i.$.innerHTML = a;
                                for (i = i.getChildren(); i.count();)this.append(i.getItem(0));
                                return a
                            }
                        } : a
                    }(),
                    setText: function(a) {
                        CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function(a) { return this.$.innerText = a } : function(a) { return this.$.textContent = a };
                        return this.setText(a)
                    },
                    getAttribute: function() {
                        var a = function(a) { return this.$.getAttribute(a, 2) };
                        return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a) {
                            switch (a) {
                            case "class":
                                a = "className";
                                break;
                            case "http-equiv":
                                a =
                                    "httpEquiv";
                                break;
                            case "name":
                                return this.$.name;
                            case "tabindex":
                                a = this.$.getAttribute(a, 2);
                                a !== 0 && this.$.tabIndex === 0 && (a = null);
                                return a;
                            case "checked":
                                a = this.$.attributes.getNamedItem(a);
                                return(a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
                            case "hspace":
                            case "value":
                                return this.$[a];
                            case "style":
                                return this.$.style.cssText;
                            case "contenteditable":
                            case "contentEditable":
                                return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                            }
                            return this.$.getAttribute(a,
                                2)
                        } : a
                    }(),
                    getChildren: function() { return new CKEDITOR.dom.nodeList(this.$.childNodes) },
                    getComputedStyle: CKEDITOR.env.ie ? function(a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] } : function(a) {
                        var b = this.getWindow().$.getComputedStyle(this.$, null);
                        return b ? b.getPropertyValue(a) : ""
                    },
                    getDtd: function() {
                        var a = CKEDITOR.dtd[this.getName()];
                        this.getDtd = function() { return a };
                        return a
                    },
                    getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
                    getTabIndex: CKEDITOR.env.ie ? function() {
                        var a =
                            this.$.tabIndex;
                        a === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0) && (a = -1);
                        return a
                    } : CKEDITOR.env.webkit ? function() {
                        var a = this.$.tabIndex;
                        if (a == void 0) {
                            a = parseInt(this.getAttribute("tabindex"), 10);
                            isNaN(a) && (a = -1)
                        }
                        return a
                    } : function() { return this.$.tabIndex },
                    getText: function() { return this.$.textContent || this.$.innerText || "" },
                    getWindow: function() { return this.getDocument().getWindow() },
                    getId: function() { return this.$.id || null },
                    getNameAtt: function() {
                        return this.$.name ||
                            null
                    },
                    getName: function() {
                        var a = this.$.nodeName.toLowerCase();
                        if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                            var b = this.$.scopeName;
                            b != "HTML" && (a = b.toLowerCase() + ":" + a)
                        }
                        return(this.getName = function() { return a })()
                    },
                    getValue: function() { return this.$.value },
                    getFirst: function(a) {
                        var b = this.$.firstChild;
                        (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getNext(a));
                        return b
                    },
                    getLast: function(a) {
                        var b = this.$.lastChild;
                        (b = b && new CKEDITOR.dom.node(b)) && (a && !a(b)) && (b = b.getPrevious(a));
                        return b
                    },
                    getStyle: function(a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
                    is: function() {
                        var a = this.getName();
                        if (typeof arguments[0] == "object")return!!arguments[0][a];
                        for (var b = 0; b < arguments.length; b++)if (arguments[b] == a)return true;
                        return false
                    },
                    isEditable: function(a) {
                        var b = this.getName();
                        if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount())return false;
                        if (a !== false) {
                            a =
                                CKEDITOR.dtd[b] || CKEDITOR.dtd.span;
                            return!(!a || !a["#"])
                        }
                        return true
                    },
                    isIdentical: function(a) {
                        var b = this.clone(0, 1), a = a.clone(0, 1);
                        b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                        a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                        if (b.$.isEqualNode) {
                            b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText);
                            a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                            return b.$.isEqualNode(a.$)
                        }
                        b =
                            b.getOuterHtml();
                        a = a.getOuterHtml();
                        if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                            var e = this.getParent();
                            if (e.type == CKEDITOR.NODE_ELEMENT) {
                                e = e.clone();
                                e.setHtml(b);
                                b = e.getHtml();
                                e.setHtml(a);
                                a = e.getHtml()
                            }
                        }
                        return b == a
                    },
                    isVisible: function() {
                        var a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden", b, e;
                        if (a && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                            b = this.getWindow();
                            if (!b.equals(CKEDITOR.document.getWindow()) && (e = b.$.frameElement))a = (new CKEDITOR.dom.element(e)).isVisible()
                        }
                        return!!a
                    },
                    isEmptyInlineRemoveable: function() {
                        if (!CKEDITOR.dtd.$removeEmpty[this.getName()])return false;
                        for (var a = this.getChildren(), b = 0, e = a.count(); b < e; b++) {
                            var i = a.getItem(b);
                            if (!(i.type == CKEDITOR.NODE_ELEMENT && i.data("cke-bookmark")) && (i.type == CKEDITOR.NODE_ELEMENT && !i.isEmptyInlineRemoveable() || i.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(i.getText())))return false
                        }
                        return true
                    },
                    hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function() {
                        for (var a = this.$.attributes, b = 0; b <
                            a.length; b++) {
                            var e = a[b];
                            switch (e.nodeName) {
                            case "class":
                                if (this.getAttribute("class"))return true;
                            case "data-cke-expando":
                                continue;
                            default:
                                if (e.specified)return true
                            }
                        }
                        return false
                    } : function() {
                        var a = this.$.attributes, b = a.length, e = { "data-cke-expando": 1, _moz_dirty: 1 };
                        return b > 0 && (b > 2 || !e[a[0].nodeName] || b == 2 && !e[a[1].nodeName])
                    },
                    hasAttribute: function() {
                        function a(a) {
                            a = this.$.attributes.getNamedItem(a);
                            return!(!a || !a.specified)
                        }

                        return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function(b) {
                            return b == "name" ?
                                !!this.$.name : a.call(this, b)
                        } : a
                    }(),
                    hide: function() { this.setStyle("display", "none") },
                    moveChildren: function(a, b) {
                        var e = this.$, a = a.$;
                        if (e != a) {
                            var i;
                            if (b)for (; i = e.lastChild;)a.insertBefore(e.removeChild(i), a.firstChild);
                            else for (; i = e.firstChild;)a.appendChild(e.removeChild(i))
                        }
                    },
                    mergeSiblings: function() {
                        function a(a, b, i) {
                            if (b && b.type == CKEDITOR.NODE_ELEMENT) {
                                for (var d = []; b.data("cke-bookmark") || b.isEmptyInlineRemoveable();) {
                                    d.push(b);
                                    b = i ? b.getNext() : b.getPrevious();
                                    if (!b || b.type != CKEDITOR.NODE_ELEMENT)return
                                }
                                if (a.isIdentical(b)) {
                                    for (var f =
                                        i ? a.getLast() : a.getFirst(); d.length;)d.shift().move(a, !i);
                                    b.moveChildren(a, !i);
                                    b.remove();
                                    f && f.type == CKEDITOR.NODE_ELEMENT && f.mergeSiblings()
                                }
                            }
                        }

                        return function(b) {
                            if (b === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                                a(this, this.getNext(), true);
                                a(this, this.getPrevious())
                            }
                        }
                    }(),
                    show: function() { this.setStyles({ display: "", visibility: "" }) },
                    setAttribute: function() {
                        var a = function(a, b) {
                            this.$.setAttribute(a, b);
                            return this
                        };
                        return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ?
                            function(b, e) {
                                b == "class" ? this.$.className = e : b == "style" ? this.$.style.cssText = e : b == "tabindex" ? this.$.tabIndex = e : b == "checked" ? this.$.checked = e : b == "contenteditable" ? a.call(this, "contentEditable", e) : a.apply(this, arguments);
                                return this
                            } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, e) {
                                if (b == "src" && e.match(/^http:\/\//))
                                    try {
                                        a.apply(this, arguments)
                                    } catch (i) {
                                    }
                                else a.apply(this, arguments);
                                return this
                            } : a
                    }(),
                    setAttributes: function(a) {
                        for (var b in a)this.setAttribute(b, a[b]);
                        return this
                    },
                    setValue: function(a) {
                        this.$.value =
                            a;
                        return this
                    },
                    removeAttribute: function() {
                        var a = function(a) { this.$.removeAttribute(a) };
                        return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a) {
                            a == "class" ? a = "className" : a == "tabindex" ? a = "tabIndex" : a == "contenteditable" && (a = "contentEditable");
                            this.$.removeAttribute(a)
                        } : a
                    }(),
                    removeAttributes: function(a) {
                        if (CKEDITOR.tools.isArray(a))for (var b = 0; b < a.length; b++)this.removeAttribute(a[b]);
                        else for (b in a)a.hasOwnProperty(b) && this.removeAttribute(b)
                    },
                    removeStyle: function(a) {
                        var b =
                            this.$.style;
                        if (!b.removeProperty && (a == "border" || a == "margin" || a == "padding")) {
                            var e = ["top", "left", "right", "bottom"], i;
                            a == "border" && (i = ["color", "style", "width"]);
                            for (var b = [], d = 0; d < e.length; d++)
                                if (i)for (var f = 0; f < i.length; f++)b.push([a, e[d], i[f]].join("-"));
                                else b.push([a, e[d]].join("-"));
                            for (a = 0; a < b.length; a++)this.removeStyle(b[a])
                        } else {
                            b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a));
                            this.$.style.cssText || this.removeAttribute("style")
                        }
                    },
                    setStyle: function(a,
                        b) {
                        this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                        return this
                    },
                    setStyles: function(a) {
                        for (var b in a)this.setStyle(b, a[b]);
                        return this
                    },
                    setOpacity: function(a) {
                        if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                            a = Math.round(a * 100);
                            this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")
                        } else this.setStyle("opacity", a)
                    },
                    unselectable: function() {
                        this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                        if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                            this.setAttribute("unselectable",
                                "on");
                            for (var a, b = this.getElementsByTag("*"), e = 0, i = b.count(); e < i; e++) {
                                a = b.getItem(e);
                                a.setAttribute("unselectable", "on")
                            }
                        }
                    },
                    getPositionedAncestor: function() {
                        for (var a = this; a.getName() != "html";) {
                            if (a.getComputedStyle("position") != "static")return a;
                            a = a.getParent()
                        }
                        return null
                    },
                    getDocumentPosition: function(a) {
                        var b = 0, e = 0, i = this.getDocument(), d = i.getBody(), f = i.$.compatMode == "BackCompat";
                        if (document.documentElement.getBoundingClientRect) {
                            var c = this.$.getBoundingClientRect(),
                                j = i.$.documentElement,
                                k = j.clientTop ||
                                    d.$.clientTop || 0,
                                l = j.clientLeft || d.$.clientLeft || 0,
                                m = true;
                            if (CKEDITOR.env.ie) {
                                m = i.getDocumentElement().contains(this);
                                i = i.getBody().contains(this);
                                m = f && i || !f && m
                            }
                            if (m) {
                                b = c.left + (!f && j.scrollLeft || d.$.scrollLeft);
                                b = b - l;
                                e = c.top + (!f && j.scrollTop || d.$.scrollTop);
                                e = e - k
                            }
                        } else {
                            d = this;
                            for (i = null; d && !(d.getName() == "body" || d.getName() == "html");) {
                                b = b + (d.$.offsetLeft - d.$.scrollLeft);
                                e = e + (d.$.offsetTop - d.$.scrollTop);
                                if (!d.equals(this)) {
                                    b = b + (d.$.clientLeft || 0);
                                    e = e + (d.$.clientTop || 0)
                                }
                                for (; i && !i.equals(d);) {
                                    b = b -
                                        i.$.scrollLeft;
                                    e = e - i.$.scrollTop;
                                    i = i.getParent()
                                }
                                i = d;
                                d = (c = d.$.offsetParent) ? new CKEDITOR.dom.element(c) : null
                            }
                        }
                        if (a) {
                            d = this.getWindow();
                            i = a.getWindow();
                            if (!d.equals(i) && d.$.frameElement) {
                                a = (new CKEDITOR.dom.element(d.$.frameElement)).getDocumentPosition(a);
                                b = b + a.x;
                                e = e + a.y
                            }
                        }
                        if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !f) {
                            b = b + (this.$.clientLeft ? 1 : 0);
                            e = e + (this.$.clientTop ? 1 : 0)
                        }
                        return{ x: b, y: e }
                    },
                    scrollIntoView: function(a) {
                        var b = this.getParent();
                        if (b) {
                            do {
                                (b.$.clientWidth && b.$.clientWidth <
                                    b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1);
                                if (b.is("html")) {
                                    var e = b.getWindow();
                                    try {
                                        var i = e.$.frameElement;
                                        i && (b = new CKEDITOR.dom.element(i))
                                    } catch (d) {
                                    }
                                }
                            } while (b = b.getParent())
                        }
                    },
                    scrollIntoParent: function(a, b, e) {
                        var i, d, f, c;

                        function j(b, d) {
                            if (/body|html/.test(a.getName()))a.getWindow().$.scrollBy(b, d);
                            else {
                                a.$.scrollLeft = a.$.scrollLeft + b;
                                a.$.scrollTop = a.$.scrollTop + d
                            }
                        }

                        function k(a, b) {
                            var d = { x: 0, y: 0 };
                            if (!a.is(m ? "body" : "html")) {
                                var c =
                                    a.$.getBoundingClientRect();
                                d.x = c.left;
                                d.y = c.top
                            }
                            c = a.getWindow();
                            if (!c.equals(b)) {
                                c = k(CKEDITOR.dom.element.get(c.$.frameElement), b);
                                d.x = d.x + c.x;
                                d.y = d.y + c.y
                            }
                            return d
                        }

                        function l(a, b) { return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0 }

                        !a && (a = this.getWindow());
                        f = a.getDocument();
                        var m = f.$.compatMode == "BackCompat";
                        a instanceof CKEDITOR.dom.window && (a = m ? f.getBody() : f.getDocumentElement());
                        f = a.getWindow();
                        d = k(this, f);
                        var n = k(a, f), o = this.$.offsetHeight;
                        i = this.$.offsetWidth;
                        var h = a.$.clientHeight,
                            t =
                                a.$.clientWidth;
                        f = d.x - l(this, "left") - n.x || 0;
                        c = d.y - l(this, "top") - n.y || 0;
                        i = d.x + i + l(this, "right") - (n.x + t) || 0;
                        d = d.y + o + l(this, "bottom") - (n.y + h) || 0;
                        if (c < 0 || d > 0)j(0, b === true ? c : b === false ? d : c < 0 ? c : d);
                        if (e && (f < 0 || i > 0))j(f < 0 ? f : i, 0)
                    },
                    setState: function(a, b, e) {
                        b = b || "cke";
                        switch (a) {
                        case CKEDITOR.TRISTATE_ON:
                            this.addClass(b + "_on");
                            this.removeClass(b + "_off");
                            this.removeClass(b + "_disabled");
                            e && this.setAttribute("aria-pressed", true);
                            e && this.removeAttribute("aria-disabled");
                            break;
                        case CKEDITOR.TRISTATE_DISABLED:
                            this.addClass(b +
                                "_disabled");
                            this.removeClass(b + "_off");
                            this.removeClass(b + "_on");
                            e && this.setAttribute("aria-disabled", true);
                            e && this.removeAttribute("aria-pressed");
                            break;
                        default:
                            this.addClass(b + "_off");
                            this.removeClass(b + "_on");
                            this.removeClass(b + "_disabled");
                            e && this.removeAttribute("aria-pressed");
                            e && this.removeAttribute("aria-disabled")
                        }
                    },
                    getFrameDocument: function() {
                        var a = this.$;
                        try {
                            a.contentWindow.document
                        } catch (b) {
                            a.src = a.src
                        }
                        return a && new CKEDITOR.dom.document(a.contentWindow.document)
                    },
                    copyAttributes: function(a,
                        b) {
                        for (var e = this.$.attributes, b = b || {}, i = 0; i < e.length; i++) {
                            var d = e[i], f = d.nodeName.toLowerCase(), c;
                            if (!(f in b))
                                if (f == "checked" && (c = this.getAttribute(f)))a.setAttribute(f, c);
                                else if (d.specified || CKEDITOR.env.ie && d.nodeValue && f == "value") {
                                    c = this.getAttribute(f);
                                    if (c === null)c = d.nodeValue;
                                    a.setAttribute(f, c)
                                }
                        }
                        if (this.$.style.cssText !== "")a.$.style.cssText = this.$.style.cssText
                    },
                    renameNode: function(a) {
                        if (this.getName() != a) {
                            var b = this.getDocument(), a = new CKEDITOR.dom.element(a, b);
                            this.copyAttributes(a);
                            this.moveChildren(a);
                            this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                            a.$["data-cke-expando"] = this.$["data-cke-expando"];
                            this.$ = a.$
                        }
                    },
                    getChild: function() {
                        function a(a, b) {
                            var i = a.childNodes;
                            if (b >= 0 && b < i.length)return i[b]
                        }

                        return function(b) {
                            var e = this.$;
                            if (b.slice)for (; b.length > 0 && e;)e = a(e, b.shift());
                            else e = a(e, b);
                            return e ? new CKEDITOR.dom.node(e) : null
                        }
                    }(),
                    getChildCount: function() { return this.$.childNodes.length },
                    disableContextMenu: function() {
                        this.on("contextmenu", function(a) {
                            a.data.getTarget().hasClass("cke_enable_context_menu") ||
                                a.data.preventDefault()
                        })
                    },
                    getDirection: function(a) { return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir") },
                    data: function(a, b) {
                        a = "data-" + a;
                        if (b === void 0)return this.getAttribute(a);
                        b === false ? this.removeAttribute(a) : this.setAttribute(a, b);
                        return null
                    },
                    getEditor: function() {
                        var a = CKEDITOR.instances, b, e;
                        for (b in a) {
                            e = a[b];
                            if (e.element.equals(this) && e.elementMode !=
                                CKEDITOR.ELEMENT_MODE_APPENDTO)return e
                        }
                        return null
                    }
                });
                var h = { width: ["border-left-width", "border-right-width", "padding-left", "padding-right"], height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"] };
                CKEDITOR.dom.element.prototype.setSize = function(a, g, e) {
                    if (typeof g == "number") {
                        if (e && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks))g = g - b.call(this, a);
                        this.setStyle(a, g + "px")
                    }
                };
                CKEDITOR.dom.element.prototype.getSize = function(a, g) {
                    var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)],
                        this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
                    g && (e = e - b.call(this, a));
                    return e
                }
            }(), CKEDITOR.dom.documentFragment = function(b) {
                b = b || CKEDITOR.document;
                this.$ = b.type == CKEDITOR.NODE_DOCUMENT ? b.$.createDocumentFragment() : b
            }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
                type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                insertAfterNode: function(b) {
                    b = b.$;
                    b.parentNode.insertBefore(this.$, b.nextSibling)
                }
            }, !0, {
                append: 1,
                appendBogus: 1,
                getFirst: 1,
                getLast: 1,
                getParent: 1,
                getNext: 1,
                getPrevious: 1,
                appendTo: 1,
                moveChildren: 1,
                insertBefore: 1,
                insertAfterNode: 1,
                replace: 1,
                trim: 1,
                type: 1,
                ltrim: 1,
                rtrim: 1,
                getDocument: 1,
                getChildCount: 1,
                getChild: 1,
                getChildren: 1
            }), function() {
                function b(a, b) {
                    var c = this.range;
                    if (this._.end)return null;
                    if (!this._.start) {
                        this._.start = 1;
                        if (c.collapsed) {
                            this.end();
                            return null
                        }
                        c.optimize()
                    }
                    var i, k = c.startContainer;
                    i = c.endContainer;
                    var l = c.startOffset, m = c.endOffset, e, o = this.guard, g = this.type, h = a ? "getPreviousSourceNode" : "getNextSourceNode";
                    if (!a && !this._.guardLTR) {
                        var r =
                                i.type == CKEDITOR.NODE_ELEMENT ? i : i.getParent(),
                            s = i.type == CKEDITOR.NODE_ELEMENT ? i.getChild(m) : i.getNext();
                        this._.guardLTR = function(a, b) { return(!b || !r.equals(a)) && (!s || !a.equals(s)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
                    }
                    if (a && !this._.guardRTL) {
                        var x = k.type == CKEDITOR.NODE_ELEMENT ? k : k.getParent(), y = k.type == CKEDITOR.NODE_ELEMENT ? l ? k.getChild(l - 1) : null : k.getPrevious();
                        this._.guardRTL = function(a, b) { return(!b || !x.equals(a)) && (!y || !a.equals(y)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) }
                    }
                    var w =
                        a ? this._.guardRTL : this._.guardLTR;
                    e = o ? function(a, b) { return w(a, b) === false ? false : o(a, b) } : w;
                    if (this.current)i = this.current[h](false, g, e);
                    else {
                        if (a)i.type == CKEDITOR.NODE_ELEMENT && (i = m > 0 ? i.getChild(m - 1) : e(i, true) === false ? null : i.getPreviousSourceNode(true, g, e));
                        else {
                            i = k;
                            if (i.type == CKEDITOR.NODE_ELEMENT && !(i = i.getChild(l)))i = e(k, true) === false ? null : k.getNextSourceNode(true, g, e)
                        }
                        i && e(i) === false && (i = null)
                    }
                    for (; i && !this._.end;) {
                        this.current = i;
                        if (!this.evaluator || this.evaluator(i) !== false) {
                            if (!b)return i
                        } else if (b &&
                            this.evaluator)return false;
                        i = i[h](false, g, e)
                    }
                    this.end();
                    return this.current = null
                }

                function h(a) {
                    for (var f, c = null; f = b.call(this, a);)c = f;
                    return c
                }

                CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
                    $: function(a) {
                        this.range = a;
                        this._ = {}
                    },
                    proto: {
                        end: function() { this._.end = 1 },
                        next: function() { return b.call(this) },
                        previous: function() { return b.call(this, 1) },
                        checkForward: function() { return b.call(this, 0, 1) !== false },
                        checkBackward: function() { return b.call(this, 1, 1) !== false },
                        lastForward: function() { return h.call(this) },
                        lastBackward: function() { return h.call(this, 1) },
                        reset: function() {
                            delete this.current;
                            this._ = {}
                        }
                    }
                });
                var a = { block: 1, "list-item": 1, table: 1, "table-row-group": 1, "table-header-group": 1, "table-footer-group": 1, "table-row": 1, "table-column-group": 1, "table-column": 1, "table-cell": 1, "table-caption": 1 };
                CKEDITOR.dom.element.prototype.isBlockBoundary = function(b) {
                    b = b ? CKEDITOR.tools.extend({}, CKEDITOR.dtd.$block, b || {}) : CKEDITOR.dtd.$block;
                    return this.getComputedStyle("float") == "none" && a[this.getComputedStyle("display")] ||
                        b[this.getName()]
                };
                CKEDITOR.dom.walker.blockBoundary = function(a) { return function(b) { return!(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } };
                CKEDITOR.dom.walker.listItemBoundary = function() { return this.blockBoundary({ br: 1 }) };
                CKEDITOR.dom.walker.bookmark = function(a, b) {
                    function c(a) { return a && a.getName && a.getName() == "span" && a.data("cke-bookmark") }

                    return function(i) {
                        var k, l;
                        k = i && i.type != CKEDITOR.NODE_ELEMENT && (l = i.getParent()) && c(l);
                        k = a ? k : k || c(i);
                        return!!(b ^ k)
                    }
                };
                CKEDITOR.dom.walker.whitespaces =
                    function(a) {
                        return function(b) {
                            var c;
                            b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​");
                            return!!(a ^ c)
                        }
                    };
                CKEDITOR.dom.walker.invisible = function(a) {
                    var b = CKEDITOR.dom.walker.whitespaces();
                    return function(c) {
                        if (b(c))c = 1;
                        else {
                            c.type == CKEDITOR.NODE_TEXT && (c = c.getParent());
                            c = !c.$.offsetHeight
                        }
                        return!!(a ^ c)
                    }
                };
                CKEDITOR.dom.walker.nodeType = function(a, b) { return function(c) { return!!(b ^ c.type == a) } };
                CKEDITOR.dom.walker.bogus = function(a) {
                    function b(a) {
                        return!e(a) &&
                            !i(a)
                    }

                    return function(c) {
                        var i = !CKEDITOR.env.ie ? c.is && c.is("br") : c.getText && g.test(c.getText());
                        if (i) {
                            i = c.getParent();
                            c = c.getNext(b);
                            i = i.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())
                        }
                        return!!(a ^ i)
                    }
                };
                var g = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, e = CKEDITOR.dom.walker.whitespaces(), i = CKEDITOR.dom.walker.bookmark();
                CKEDITOR.dom.element.prototype.getBogus = function() {
                    var a = this;
                    do a = a.getPreviousSourceNode();
                    while (i(a) || e(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline &&
                        !(a.getName() in CKEDITOR.dtd.$empty));
                    return a && (!CKEDITOR.env.ie ? a.is && a.is("br") : a.getText && g.test(a.getText())) ? a : false
                }
            }(), CKEDITOR.dom.range = function(b) {
                this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
                this.collapsed = true;
                var h = b instanceof CKEDITOR.dom.document;
                this.document = h ? b : b.getDocument();
                this.root = h ? b.getBody() : b
            }, function() {
                function b() {
                    var a = false, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(true), d = CKEDITOR.dom.walker.bogus();
                    return function(f) {
                        if (c(f) ||
                            b(f))return true;
                        if (d(f) && !a)return a = true;
                        return f.type == CKEDITOR.NODE_TEXT && (f.hasAscendant("pre") || CKEDITOR.tools.trim(f.getText()).length) || f.type == CKEDITOR.NODE_ELEMENT && !f.is(i) ? false : true
                    }
                }

                function h(a) {
                    var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1);
                    return function(f) { return c(f) || b(f) ? true : !a && d(f) || f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$removeEmpty) }
                }

                function a(a) { return!f(a) && !c(a) }

                var g = function(a) {
                        a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) &&
                            a.startOffset == a.endOffset
                    },
                    e = function(a, b, c, d) {
                        a.optimizeBookmark();
                        var f = a.startContainer, i = a.endContainer, e = a.startOffset, g = a.endOffset, j, h;
                        if (i.type == CKEDITOR.NODE_TEXT)i = i.split(g);
                        else if (i.getChildCount() > 0)
                            if (g >= i.getChildCount()) {
                                i = i.append(a.document.createText(""));
                                h = true
                            } else i = i.getChild(g);
                        if (f.type == CKEDITOR.NODE_TEXT) {
                            f.split(e);
                            f.equals(i) && (i = f.getNext())
                        } else if (e)
                            if (e >= f.getChildCount()) {
                                f = f.append(a.document.createText(""));
                                j = true
                            } else f = f.getChild(e).getPrevious();
                        else {
                            f = f.append(a.document.createText(""),
                                1);
                            j = true
                        }
                        var e = f.getParents(), g = i.getParents(), y, w, v;
                        for (y = 0; y < e.length; y++) {
                            w = e[y];
                            v = g[y];
                            if (!w.equals(v))break
                        }
                        for (var q = c, u, B, A, z = y; z < e.length; z++) {
                            u = e[z];
                            q && !u.equals(f) && (B = q.append(u.clone()));
                            for (u = u.getNext(); u;) {
                                if (u.equals(g[z]) || u.equals(i))break;
                                A = u.getNext();
                                if (b == 2)q.append(u.clone(true));
                                else {
                                    u.remove();
                                    b == 1 && q.append(u)
                                }
                                u = A
                            }
                            q && (q = B)
                        }
                        q = c;
                        for (c = y; c < g.length; c++) {
                            u = g[c];
                            b > 0 && !u.equals(i) && (B = q.append(u.clone()));
                            if (!e[c] || u.$.parentNode != e[c].$.parentNode)
                                for (u = u.getPrevious(); u;) {
                                    if (u.equals(e[c]) ||
                                        u.equals(f))break;
                                    A = u.getPrevious();
                                    if (b == 2)q.$.insertBefore(u.$.cloneNode(true), q.$.firstChild);
                                    else {
                                        u.remove();
                                        b == 1 && q.$.insertBefore(u.$, q.$.firstChild)
                                    }
                                    u = A
                                }
                            q && (q = B)
                        }
                        if (b == 2) {
                            w = a.startContainer;
                            if (w.type == CKEDITOR.NODE_TEXT) {
                                w.$.data = w.$.data + w.$.nextSibling.data;
                                w.$.parentNode.removeChild(w.$.nextSibling)
                            }
                            a = a.endContainer;
                            if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                                a.$.data = a.$.data + a.$.nextSibling.data;
                                a.$.parentNode.removeChild(a.$.nextSibling)
                            }
                        } else {
                            if (w && v && (f.$.parentNode != w.$.parentNode ||
                                i.$.parentNode != v.$.parentNode)) {
                                b = v.getIndex();
                                j && v.$.parentNode == f.$.parentNode && b--;
                                if (d && w.type == CKEDITOR.NODE_ELEMENT) {
                                    d = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                                    d.insertAfter(w);
                                    w.mergeSiblings(false);
                                    a.moveToBookmark({ startNode: d })
                                } else a.setStart(v.getParent(), b)
                            }
                            a.collapse(true)
                        }
                        j && f.remove();
                        h && i.$.parentNode && i.remove()
                    },
                    i = {
                        abbr: 1,
                        acronym: 1,
                        b: 1,
                        bdo: 1,
                        big: 1,
                        cite: 1,
                        code: 1,
                        del: 1,
                        dfn: 1,
                        em: 1,
                        font: 1,
                        i: 1,
                        ins: 1,
                        label: 1,
                        kbd: 1,
                        q: 1,
                        samp: 1,
                        small: 1,
                        span: 1,
                        strike: 1,
                        strong: 1,
                        sub: 1,
                        sup: 1,
                        tt: 1,
                        u: 1,
                        "var": 1
                    },
                    d = CKEDITOR.dom.walker.bogus(),
                    f = new CKEDITOR.dom.walker.whitespaces,
                    c = new CKEDITOR.dom.walker.bookmark,
                    j = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/;
                CKEDITOR.dom.range.prototype = {
                    clone: function() {
                        var a = new CKEDITOR.dom.range(this.root);
                        a.startContainer = this.startContainer;
                        a.startOffset = this.startOffset;
                        a.endContainer = this.endContainer;
                        a.endOffset = this.endOffset;
                        a.collapsed = this.collapsed;
                        return a
                    },
                    collapse: function(a) {
                        if (a) {
                            this.endContainer =
                                this.startContainer;
                            this.endOffset = this.startOffset
                        } else {
                            this.startContainer = this.endContainer;
                            this.startOffset = this.endOffset
                        }
                        this.collapsed = true
                    },
                    cloneContents: function() {
                        var a = new CKEDITOR.dom.documentFragment(this.document);
                        this.collapsed || e(this, 2, a);
                        return a
                    },
                    deleteContents: function(a) { this.collapsed || e(this, 0, null, a) },
                    extractContents: function(a) {
                        var b = new CKEDITOR.dom.documentFragment(this.document);
                        this.collapsed || e(this, 1, b, a);
                        return b
                    },
                    createBookmark: function(a) {
                        var b, c, d, f, i = this.collapsed;
                        b = this.document.createElement("span");
                        b.data("cke-bookmark", 1);
                        b.setStyle("display", "none");
                        b.setHtml("&nbsp;");
                        if (a) {
                            d = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                            b.setAttribute("id", d + (i ? "C" : "S"))
                        }
                        if (!i) {
                            c = b.clone();
                            c.setHtml("&nbsp;");
                            a && c.setAttribute("id", d + "E");
                            f = this.clone();
                            f.collapse();
                            f.insertNode(c)
                        }
                        f = this.clone();
                        f.collapse(true);
                        f.insertNode(b);
                        if (c) {
                            this.setStartAfter(b);
                            this.setEndBefore(c)
                        } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                        return{
                            startNode: a ? d + (i ? "C" : "S") : b,
                            endNode: a ?
                                d + "E" : c,
                            serializable: a,
                            collapsed: i
                        }
                    },
                    createBookmark2: function(a) {
                        var b = this.startContainer, c = this.endContainer, d = this.startOffset, f = this.endOffset, i = this.collapsed, e, g;
                        if (!b || !c)return{ start: 0, end: 0 };
                        if (a) {
                            if (b.type == CKEDITOR.NODE_ELEMENT) {
                                if ((e = b.getChild(d)) && e.type == CKEDITOR.NODE_TEXT && d > 0 && e.getPrevious().type == CKEDITOR.NODE_TEXT) {
                                    b = e;
                                    d = 0
                                }
                                e && e.type == CKEDITOR.NODE_ELEMENT && (d = e.getIndex(1))
                            }
                            for (; b.type == CKEDITOR.NODE_TEXT && (g = b.getPrevious()) && g.type == CKEDITOR.NODE_TEXT;) {
                                b = g;
                                d = d + g.getLength()
                            }
                            if (!i) {
                                if (c.type ==
                                    CKEDITOR.NODE_ELEMENT) {
                                    if ((e = c.getChild(f)) && e.type == CKEDITOR.NODE_TEXT && f > 0 && e.getPrevious().type == CKEDITOR.NODE_TEXT) {
                                        c = e;
                                        f = 0
                                    }
                                    e && e.type == CKEDITOR.NODE_ELEMENT && (f = e.getIndex(1))
                                }
                                for (; c.type == CKEDITOR.NODE_TEXT && (g = c.getPrevious()) && g.type == CKEDITOR.NODE_TEXT;) {
                                    c = g;
                                    f = f + g.getLength()
                                }
                            }
                        }
                        return{ start: b.getAddress(a), end: i ? null : c.getAddress(a), startOffset: d, endOffset: f, normalized: a, collapsed: i, is2: true }
                    },
                    moveToBookmark: function(a) {
                        if (a.is2) {
                            var b = this.document.getByAddress(a.start, a.normalized),
                                c = a.startOffset,
                                d = a.end && this.document.getByAddress(a.end, a.normalized),
                                a = a.endOffset;
                            this.setStart(b, c);
                            d ? this.setEnd(d, a) : this.collapse(true)
                        } else {
                            b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                            a = c ? this.document.getById(a.endNode) : a.endNode;
                            this.setStartBefore(b);
                            b.remove();
                            if (a) {
                                this.setEndBefore(a);
                                a.remove()
                            } else this.collapse(true)
                        }
                    },
                    getBoundaryNodes: function() {
                        var a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset, f;
                        if (a.type == CKEDITOR.NODE_ELEMENT) {
                            f = a.getChildCount();
                            if (f > c)a = a.getChild(c);
                            else if (f < 1)a = a.getPreviousSourceNode();
                            else {
                                for (a = a.$; a.lastChild;)a = a.lastChild;
                                a = new CKEDITOR.dom.node(a);
                                a = a.getNextSourceNode() || a
                            }
                        }
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            f = b.getChildCount();
                            if (f > d)b = b.getChild(d).getPreviousSourceNode(true);
                            else if (f < 1)b = b.getPreviousSourceNode();
                            else {
                                for (b = b.$; b.lastChild;)b = b.lastChild;
                                b = new CKEDITOR.dom.node(b)
                            }
                        }
                        a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                        return{ startNode: a, endNode: b }
                    },
                    getCommonAncestor: function(a, b) {
                        var c = this.startContainer,
                            d = this.endContainer,
                            c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
                        return b && !c.is ? c.getParent() : c
                    },
                    optimize: function() {
                        var a = this.startContainer, b = this.startOffset;
                        a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                        a = this.endContainer;
                        b = this.endOffset;
                        a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
                    },
                    optimizeBookmark: function() {
                        var a =
                                this.startContainer,
                            b = this.endContainer;
                        a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                        b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
                    },
                    trim: function(a, b) {
                        var c = this.startContainer, d = this.startOffset, f = this.collapsed;
                        if ((!a || f) && c && c.type == CKEDITOR.NODE_TEXT) {
                            if (d)
                                if (d >= c.getLength()) {
                                    d = c.getIndex() + 1;
                                    c = c.getParent()
                                } else {
                                    var i = c.split(d), d = c.getIndex() + 1, c = c.getParent();
                                    if (this.startContainer.equals(this.endContainer))
                                        this.setEnd(i,
                                            this.endOffset - this.startOffset);
                                    else if (c.equals(this.endContainer))this.endOffset = this.endOffset + 1
                                }
                            else {
                                d = c.getIndex();
                                c = c.getParent()
                            }
                            this.setStart(c, d);
                            if (f) {
                                this.collapse(true);
                                return
                            }
                        }
                        c = this.endContainer;
                        d = this.endOffset;
                        if (!b && !f && c && c.type == CKEDITOR.NODE_TEXT) {
                            if (d) {
                                d >= c.getLength() || c.split(d);
                                d = c.getIndex() + 1
                            } else d = c.getIndex();
                            c = c.getParent();
                            this.setEnd(c, d)
                        }
                    },
                    enlarge: function(a, b) {
                        switch (a) {
                        case CKEDITOR.ENLARGE_INLINE:
                            var c = 1;
                        case CKEDITOR.ENLARGE_ELEMENT:
                            if (this.collapsed)break;
                            var d =
                                    this.getCommonAncestor(),
                                f = this.root,
                                i,
                                e,
                                g,
                                j,
                                h,
                                y = false,
                                w,
                                v;
                            w = this.startContainer;
                            v = this.startOffset;
                            if (w.type == CKEDITOR.NODE_TEXT) {
                                if (v) {
                                    w = !CKEDITOR.tools.trim(w.substring(0, v)).length && w;
                                    y = !!w
                                }
                                if (w && !(j = w.getPrevious()))g = w.getParent()
                            } else {
                                v && (j = w.getChild(v - 1) || w.getLast());
                                j || (g = w)
                            }
                            for (; g || j;) {
                                if (g && !j) {
                                    !h && g.equals(d) && (h = true);
                                    if (c ? g.isBlockBoundary() : !f.contains(g))break;
                                    if (!y || g.getComputedStyle("display") != "inline") {
                                        y = false;
                                        h ? i = g : this.setStartBefore(g)
                                    }
                                    j = g.getPrevious()
                                }
                                for (; j;) {
                                    w = false;
                                    if (j.type == CKEDITOR.NODE_COMMENT)j = j.getPrevious();
                                    else {
                                        if (j.type == CKEDITOR.NODE_TEXT) {
                                            v = j.getText();
                                            /[^\s\ufeff]/.test(v) && (j = null);
                                            w = /[\s\ufeff]$/.test(v)
                                        } else if ((j.$.offsetWidth > 0 || b && j.is("br")) && !j.data("cke-bookmark"))
                                            if (y && CKEDITOR.dtd.$removeEmpty[j.getName()]) {
                                                v = j.getText();
                                                if (/[^\s\ufeff]/.test(v))j = null;
                                                else
                                                    for (var q = j.$.getElementsByTagName("*"), u = 0, B; B = q[u++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) {
                                                            j = null;
                                                            break
                                                        }
                                                j && (w = !!v.length)
                                            } else j = null;
                                        w && (y ? h ? i = g : g && this.setStartBefore(g) :
                                            y = true);
                                        if (j) {
                                            w = j.getPrevious();
                                            if (!g && !w) {
                                                g = j;
                                                j = null;
                                                break
                                            }
                                            j = w
                                        } else g = null
                                    }
                                }
                                g && (g = g.getParent())
                            }
                            w = this.endContainer;
                            v = this.endOffset;
                            g = j = null;
                            h = y = false;
                            if (w.type == CKEDITOR.NODE_TEXT) {
                                w = !CKEDITOR.tools.trim(w.substring(v)).length && w;
                                y = !(w && w.getLength());
                                if (w && !(j = w.getNext()))g = w.getParent()
                            } else(j = w.getChild(v)) || (g = w);
                            for (; g || j;) {
                                if (g && !j) {
                                    !h && g.equals(d) && (h = true);
                                    if (c ? g.isBlockBoundary() : !f.contains(g))break;
                                    if (!y || g.getComputedStyle("display") != "inline") {
                                        y = false;
                                        h ? e = g : g && this.setEndAfter(g)
                                    }
                                    j =
                                        g.getNext()
                                }
                                for (; j;) {
                                    w = false;
                                    if (j.type == CKEDITOR.NODE_TEXT) {
                                        v = j.getText();
                                        /[^\s\ufeff]/.test(v) && (j = null);
                                        w = /^[\s\ufeff]/.test(v)
                                    } else if (j.type == CKEDITOR.NODE_ELEMENT) {
                                        if ((j.$.offsetWidth > 0 || b && j.is("br")) && !j.data("cke-bookmark"))
                                            if (y && CKEDITOR.dtd.$removeEmpty[j.getName()]) {
                                                v = j.getText();
                                                if (/[^\s\ufeff]/.test(v))j = null;
                                                else {
                                                    q = j.$.getElementsByTagName("*");
                                                    for (u = 0; B = q[u++];)
                                                        if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) {
                                                            j = null;
                                                            break
                                                        }
                                                }
                                                j && (w = !!v.length)
                                            } else j = null
                                    } else w = 1;
                                    w && y && (h ? e = g :
                                        this.setEndAfter(g));
                                    if (j) {
                                        w = j.getNext();
                                        if (!g && !w) {
                                            g = j;
                                            j = null;
                                            break
                                        }
                                        j = w
                                    } else g = null
                                }
                                g && (g = g.getParent())
                            }
                            if (i && e) {
                                d = i.contains(e) ? e : i;
                                this.setStartBefore(d);
                                this.setEndAfter(d)
                            }
                            break;
                        case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                        case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                            g = new CKEDITOR.dom.range(this.root);
                            f = this.root;
                            g.setStartAt(f, CKEDITOR.POSITION_AFTER_START);
                            g.setEnd(this.startContainer, this.startOffset);
                            g = new CKEDITOR.dom.walker(g);
                            var A,
                                z,
                                C = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ?
                                { br: 1 } : null),
                                D = function(a) {
                                    var b = C(a);
                                    b || (A = a);
                                    return b
                                },
                                c = function(a) {
                                    var b = D(a);
                                    !b && (a.is && a.is("br")) && (z = a);
                                    return b
                                };
                            g.guard = D;
                            g = g.lastBackward();
                            A = A || f;
                            this.setStartAt(A, !A.is("br") && (!g && this.checkStartOfBlock() || g && A.contains(g)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                            if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                                g = this.clone();
                                g = new CKEDITOR.dom.walker(g);
                                var F = CKEDITOR.dom.walker.whitespaces(), E = CKEDITOR.dom.walker.bookmark();
                                g.evaluator = function(a) { return!F(a) && !E(a) };
                                if ((g = g.previous()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("br"))break
                            }
                            g = this.clone();
                            g.collapse();
                            g.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
                            g = new CKEDITOR.dom.walker(g);
                            g.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? c : D;
                            A = null;
                            g = g.lastForward();
                            A = A || f;
                            this.setEndAt(A, !g && this.checkEndOfBlock() || g && A.contains(g) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                            z && this.setEndAfter(z)
                        }
                    },
                    shrink: function(a, b, c) {
                        if (!this.collapsed) {
                            var a = a || CKEDITOR.SHRINK_TEXT,
                                d = this.clone(),
                                f = this.startContainer,
                                i = this.endContainer,
                                g = this.startOffset,
                                e = this.endOffset,
                                j = 1,
                                h = 1;
                            if (f && f.type == CKEDITOR.NODE_TEXT)
                                if (g)
                                    if (g >= f.getLength())d.setStartAfter(f);
                                    else {
                                        d.setStartBefore(f);
                                        j = 0
                                    }
                                else d.setStartBefore(f);
                            if (i && i.type == CKEDITOR.NODE_TEXT)
                                if (e)
                                    if (e >= i.getLength())d.setEndAfter(i);
                                    else {
                                        d.setEndAfter(i);
                                        h = 0
                                    }
                                else d.setEndBefore(i);
                            var d = new CKEDITOR.dom.walker(d), y = CKEDITOR.dom.walker.bookmark();
                            d.evaluator = function(b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) };
                            var w;
                            d.guard = function(b, d) {
                                if (y(b))return true;
                                if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(w) || c === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary())return false;
                                !d && b.type == CKEDITOR.NODE_ELEMENT && (w = b);
                                return true
                            };
                            if (j)(f = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(f, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                            if (h) {
                                d.reset();
                                (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END :
                                    CKEDITOR.POSITION_AFTER_END)
                            }
                            return!(!j && !h)
                        }
                    },
                    insertNode: function(a) {
                        this.optimizeBookmark();
                        this.trim(false, true);
                        var b = this.startContainer, c = b.getChild(this.startOffset);
                        c ? a.insertBefore(c) : b.append(a);
                        a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                        this.setStartBefore(a)
                    },
                    moveToPosition: function(a, b) {
                        this.setStartAt(a, b);
                        this.collapse(true)
                    },
                    moveToRange: function(a) {
                        this.setStart(a.startContainer, a.startOffset);
                        this.setEnd(a.endContainer, a.endOffset)
                    },
                    selectNodeContents: function(a) {
                        this.setStart(a,
                            0);
                        this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
                    },
                    setStart: function(a, b) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                            b = a.getIndex();
                            a = a.getParent()
                        }
                        this.startContainer = a;
                        this.startOffset = b;
                        if (!this.endContainer) {
                            this.endContainer = a;
                            this.endOffset = b
                        }
                        g(this)
                    },
                    setEnd: function(a, b) {
                        if (a.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[a.getName()]) {
                            b = a.getIndex() + 1;
                            a = a.getParent()
                        }
                        this.endContainer = a;
                        this.endOffset = b;
                        if (!this.startContainer) {
                            this.startContainer =
                                a;
                            this.startOffset = b
                        }
                        g(this)
                    },
                    setStartAfter: function(a) { this.setStart(a.getParent(), a.getIndex() + 1) },
                    setStartBefore: function(a) { this.setStart(a.getParent(), a.getIndex()) },
                    setEndAfter: function(a) { this.setEnd(a.getParent(), a.getIndex() + 1) },
                    setEndBefore: function(a) { this.setEnd(a.getParent(), a.getIndex()) },
                    setStartAt: function(a, b) {
                        switch (b) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setStart(a, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            a.type == CKEDITOR.NODE_TEXT ? this.setStart(a, a.getLength()) : this.setStart(a,
                                a.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setStartBefore(a);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setStartAfter(a)
                        }
                        g(this)
                    },
                    setEndAt: function(a, b) {
                        switch (b) {
                        case CKEDITOR.POSITION_AFTER_START:
                            this.setEnd(a, 0);
                            break;
                        case CKEDITOR.POSITION_BEFORE_END:
                            a.type == CKEDITOR.NODE_TEXT ? this.setEnd(a, a.getLength()) : this.setEnd(a, a.getChildCount());
                            break;
                        case CKEDITOR.POSITION_BEFORE_START:
                            this.setEndBefore(a);
                            break;
                        case CKEDITOR.POSITION_AFTER_END:
                            this.setEndAfter(a)
                        }
                        g(this)
                    },
                    fixBlock: function(a,
                        b) {
                        var c = this.createBookmark(), d = this.document.createElement(b);
                        this.collapse(a);
                        this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        this.extractContents().appendTo(d);
                        d.trim();
                        CKEDITOR.env.ie || d.appendBogus();
                        this.insertNode(d);
                        this.moveToBookmark(c);
                        return d
                    },
                    splitBlock: function(a) {
                        var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = b.block, f = c.block, i = null;
                        if (!b.blockLimit.equals(c.blockLimit))return null;
                        if (a != "br") {
                            if (!d) {
                                d =
                                    this.fixBlock(true, a);
                                f = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                            }
                            f || (f = this.fixBlock(false, a))
                        }
                        a = d && this.checkStartOfBlock();
                        b = f && this.checkEndOfBlock();
                        this.deleteContents();
                        if (d && d.equals(f))
                            if (b) {
                                i = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                                this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END);
                                f = null
                            } else if (a) {
                                i = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                                this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START);
                                d = null
                            } else {
                                f = this.splitElement(d);
                                !CKEDITOR.env.ie && !d.is("ul", "ol") && d.appendBogus()
                            }
                        return{ previousBlock: d, nextBlock: f, wasStartOfBlock: a, wasEndOfBlock: b, elementPath: i }
                    },
                    splitElement: function(a) {
                        if (!this.collapsed)return null;
                        this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                        var b = this.extractContents(), c = a.clone(false);
                        b.appendTo(c);
                        c.insertAfter(a);
                        this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                        return c
                    },
                    removeEmptyBlocksAtEnd: function() {
                        function a(d) {
                            return function(a) {
                                return b(a) || (c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) ||
                                    d.is("table") && a.is("caption") ? false : true
                            }
                        }

                        var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(false);
                        return function(b) {
                            for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), f = d.block || d.blockLimit, i; f && !f.equals(d.root) && !f.getFirst(a(f));) {
                                i = f.getParent();
                                this[b ? "setEndAt" : "setStartAt"](f, CKEDITOR.POSITION_AFTER_END);
                                f.remove(1);
                                f = i
                            }
                            this.moveToBookmark(c)
                        }
                    }(),
                    startPath: function() { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) },
                    endPath: function() {
                        return new CKEDITOR.dom.elementPath(this.endContainer,
                            this.root)
                    },
                    checkBoundaryOfElement: function(a, b) {
                        var c = b == CKEDITOR.START, d = this.clone();
                        d.collapse(c);
                        d[c ? "setStartAt" : "setEndAt"](a, c ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                        d = new CKEDITOR.dom.walker(d);
                        d.evaluator = h(c);
                        return d[c ? "checkBackward" : "checkForward"]()
                    },
                    checkStartOfBlock: function() {
                        var a = this.startContainer, c = this.startOffset;
                        if (CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT) {
                            a = CKEDITOR.tools.ltrim(a.substring(0, c));
                            j.test(a) && this.trim(0, 1)
                        }
                        this.trim();
                        a = new CKEDITOR.dom.elementPath(this.startContainer,
                            this.root);
                        c = this.clone();
                        c.collapse(true);
                        c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                        a = new CKEDITOR.dom.walker(c);
                        a.evaluator = b();
                        return a.checkBackward()
                    },
                    checkEndOfBlock: function() {
                        var a = this.endContainer, c = this.endOffset;
                        if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) {
                            a = CKEDITOR.tools.rtrim(a.substring(c));
                            j.test(a) && this.trim(1, 0)
                        }
                        this.trim();
                        a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                        c = this.clone();
                        c.collapse(false);
                        c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                        a = new CKEDITOR.dom.walker(c);
                        a.evaluator = b();
                        return a.checkForward()
                    },
                    getPreviousNode: function(a, b, c) {
                        var d = this.clone();
                        d.collapse(1);
                        d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
                        c = new CKEDITOR.dom.walker(d);
                        c.evaluator = a;
                        c.guard = b;
                        return c.previous()
                    },
                    getNextNode: function(a, b, c) {
                        var d = this.clone();
                        d.collapse();
                        d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
                        c = new CKEDITOR.dom.walker(d);
                        c.evaluator = a;
                        c.guard = b;
                        return c.next()
                    },
                    checkReadOnly: function() {
                        function a(b, c) {
                            for (; b;) {
                                if (b.type ==
                                    CKEDITOR.NODE_ELEMENT) {
                                    if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable"))return 0;
                                    if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(c) || b.equals(c)))break
                                }
                                b = b.getParent()
                            }
                            return 1
                        }

                        return function() {
                            var b = this.startContainer, c = this.endContainer;
                            return!(a(b, c) && a(c, b))
                        }
                    }(),
                    moveToElementEditablePosition: function(b, c) {
                        if (b.type == CKEDITOR.NODE_ELEMENT && !b.isEditable(false)) {
                            this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                            return true
                        }
                        for (var d =
                            0; b;) {
                            if (b.type == CKEDITOR.NODE_TEXT) {
                                c && this.checkEndOfBlock() && j.test(b.getText()) ? this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(b, c ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                                d = 1;
                                break
                            }
                            if (b.type == CKEDITOR.NODE_ELEMENT)
                                if (b.isEditable()) {
                                    this.moveToPosition(b, c ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                                    d = 1
                                } else c && (b.is("br") && this.checkEndOfBlock()) && this.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                            var f = b, i = d, g = void 0;
                            f.type ==
                                CKEDITOR.NODE_ELEMENT && f.isEditable(false) && (g = f[c ? "getLast" : "getFirst"](a));
                            !i && !g && (g = f[c ? "getPrevious" : "getNext"](a));
                            b = g
                        }
                        return!!d
                    },
                    moveToElementEditStart: function(a) { return this.moveToElementEditablePosition(a) },
                    moveToElementEditEnd: function(a) { return this.moveToElementEditablePosition(a, true) },
                    getEnclosedNode: function() {
                        var a = this.clone();
                        a.optimize();
                        if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT)return null;
                        var a = new CKEDITOR.dom.walker(a),
                            b = CKEDITOR.dom.walker.bookmark(false,
                                true),
                            c = CKEDITOR.dom.walker.whitespaces(true);
                        a.evaluator = function(a) { return c(a) && b(a) };
                        var d = a.next();
                        a.reset();
                        return d && d.equals(a.previous()) ? d : null
                    },
                    getTouchedStartNode: function() {
                        var a = this.startContainer;
                        return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
                    },
                    getTouchedEndNode: function() {
                        var a = this.endContainer;
                        return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
                    },
                    scrollIntoView: function() {
                        var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>",
                                this.document),
                            b,
                            c,
                            d,
                            f = this.clone();
                        f.optimize();
                        if (d = f.startContainer.type == CKEDITOR.NODE_TEXT) {
                            c = f.startContainer.getText();
                            b = f.startContainer.split(f.startOffset);
                            a.insertAfter(f.startContainer)
                        } else f.insertNode(a);
                        a.scrollIntoView();
                        if (d) {
                            f.startContainer.setText(c);
                            b.remove()
                        }
                        a.remove()
                    }
                }
            }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS =
                3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function() {
                function b(a) {
                    if (!(arguments.length < 1)) {
                        this.range = a;
                        this.forceBrBreak = 0;
                        this.enlargeBr = 1;
                        this.enforceRealBlocks = 0;
                        this._ || (this._ = {})
                    }
                }

                function h(a, b, c) {
                    for (a = a.getNextSourceNode(b, null, c); !g(a);)a = a.getNextSourceNode(b, null, c);
                    return a
                }

                var a = /^[\r\n\t ]+$/, g = CKEDITOR.dom.walker.bookmark(false, true), e = CKEDITOR.dom.walker.whitespaces(true), i = function(a) { return g(a) && e(a) };
                b.prototype =
                {
                    getNextParagraph: function(b) {
                        b = b || "p";
                        if (!CKEDITOR.dtd[this.range.root.getName()][b])return null;
                        var f, c, e, k, l, m;
                        if (!this._.started) {
                            c = this.range.clone();
                            c.shrink(CKEDITOR.NODE_ELEMENT, true);
                            k = c.endContainer.hasAscendant("pre", true) || c.startContainer.hasAscendant("pre", true);
                            c.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                            if (!c.collapsed) {
                                k = new CKEDITOR.dom.walker(c.clone());
                                var n = CKEDITOR.dom.walker.bookmark(true, true);
                                k.evaluator =
                                    n;
                                this._.nextNode = k.next();
                                k = new CKEDITOR.dom.walker(c.clone());
                                k.evaluator = n;
                                k = k.previous();
                                this._.lastNode = k.getNextSourceNode(true);
                                if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                                    n = this.range.clone();
                                    n.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                                    if (n.checkEndOfBlock()) {
                                        n = new CKEDITOR.dom.elementPath(n.endContainer, n.root);
                                        this._.lastNode = (n.block || n.blockLimit).getNextSourceNode(true)
                                    }
                                }
                                if (!this._.lastNode) {
                                    this._.lastNode =
                                        this._.docEndMarker = c.document.createText("");
                                    this._.lastNode.insertAfter(k)
                                }
                                c = null
                            }
                            this._.started = 1
                        }
                        n = this._.nextNode;
                        k = this._.lastNode;
                        for (this._.nextNode = null; n;) {
                            var o = 0, p = n.hasAscendant("pre"), t = n.type != CKEDITOR.NODE_ELEMENT, r = 0;
                            if (t)n.type == CKEDITOR.NODE_TEXT && a.test(n.getText()) && (t = 0);
                            else {
                                var s = n.getName();
                                if (n.isBlockBoundary(this.forceBrBreak && !p && { br: 1 })) {
                                    if (s == "br")t = 1;
                                    else if (!c && !n.getChildCount() && s != "hr") {
                                        f = n;
                                        e = n.equals(k);
                                        break
                                    }
                                    if (c) {
                                        c.setEndAt(n, CKEDITOR.POSITION_BEFORE_START);
                                        if (s != "br")this._.nextNode = n
                                    }
                                    o = 1
                                } else {
                                    if (n.getFirst()) {
                                        if (!c) {
                                            c = this.range.clone();
                                            c.setStartAt(n, CKEDITOR.POSITION_BEFORE_START)
                                        }
                                        n = n.getFirst();
                                        continue
                                    }
                                    t = 1
                                }
                            }
                            if (t && !c) {
                                c = this.range.clone();
                                c.setStartAt(n, CKEDITOR.POSITION_BEFORE_START)
                            }
                            e = (!o || t) && n.equals(k);
                            if (c && !o)
                                for (; !n.getNext(i) && !e;) {
                                    s = n.getParent();
                                    if (s.isBlockBoundary(this.forceBrBreak && !p && { br: 1 })) {
                                        o = 1;
                                        t = 0;
                                        e || s.equals(k);
                                        c.setEndAt(s, CKEDITOR.POSITION_BEFORE_END);
                                        break
                                    }
                                    n = s;
                                    t = 1;
                                    e = n.equals(k);
                                    r = 1
                                }
                            t && c.setEndAt(n, CKEDITOR.POSITION_AFTER_END);
                            n = h(n, r, k);
                            if ((e = !n) || o && c)break
                        }
                        if (!f) {
                            if (!c) {
                                this._.docEndMarker && this._.docEndMarker.remove();
                                return this._.nextNode = null
                            }
                            f = new CKEDITOR.dom.elementPath(c.startContainer, c.root);
                            n = f.blockLimit;
                            o = { div: 1, th: 1, td: 1 };
                            f = f.block;
                            if (!f && n && !this.enforceRealBlocks && o[n.getName()] && c.checkStartOfBlock() && c.checkEndOfBlock() && !n.equals(c.root))f = n;
                            else if (!f || this.enforceRealBlocks && f.getName() == "li") {
                                f = this.range.document.createElement(b);
                                c.extractContents().appendTo(f);
                                f.trim();
                                c.insertNode(f);
                                l = m = true
                            } else if (f.getName() !=
                                "li") {
                                if (!c.checkStartOfBlock() || !c.checkEndOfBlock()) {
                                    f = f.clone(false);
                                    c.extractContents().appendTo(f);
                                    f.trim();
                                    m = c.splitBlock();
                                    l = !m.wasStartOfBlock;
                                    m = !m.wasEndOfBlock;
                                    c.insertNode(f)
                                }
                            } else if (!e)this._.nextNode = f.equals(k) ? null : h(c.getBoundaryNodes().endNode, 1, k)
                        }
                        if (l)(c = f.getPrevious()) && c.type == CKEDITOR.NODE_ELEMENT && (c.getName() == "br" ? c.remove() : c.getLast() && c.getLast().$.nodeName.toLowerCase() == "br" && c.getLast().remove());
                        if (m)
                        (c = f.getLast()) && c.type == CKEDITOR.NODE_ELEMENT && c.getName() == "br" &&
                        (CKEDITOR.env.ie || c.getPrevious(g) || c.getNext(g)) && c.remove();
                        if (!this._.nextNode)this._.nextNode = e || f.equals(k) || !k ? null : h(f, 1, k);
                        return f
                    }
                };
                CKEDITOR.dom.range.prototype.createIterator = function() { return new b(this) }
            }(), CKEDITOR.command = function(b, h) {
                this.uiItems = [];
                this.exec = function(a) {
                    if (this.state == CKEDITOR.TRISTATE_DISABLED)return false;
                    this.editorFocus && b.focus();
                    return this.fire("exec") === false ? true : h.exec.call(this, b, a) !== false
                };
                this.refresh = function(a, b) {
                    if (!this.readOnly && a.readOnly)return true;
                    if (this.context && !b.isContextFor(this.context)) {
                        this.disable();
                        return true
                    }
                    this.enable();
                    return this.fire("refresh", { editor: a, path: b }) === false ? true : h.refresh && h.refresh.apply(this, arguments) !== false
                };
                CKEDITOR.tools.extend(this, h, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!h.context, state: CKEDITOR.TRISTATE_OFF });
                CKEDITOR.event.call(this)
            }, CKEDITOR.command.prototype = {
                enable: function() {
                    this.state == CKEDITOR.TRISTATE_DISABLED && this.setState(!this.preserveState || typeof this.previousState == "undefined" ?
                        CKEDITOR.TRISTATE_OFF : this.previousState)
                },
                disable: function() { this.setState(CKEDITOR.TRISTATE_DISABLED) },
                setState: function(b) {
                    if (this.state == b)return false;
                    this.previousState = this.state;
                    this.state = b;
                    this.fire("state");
                    return true
                },
                toggleState: function() { this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF) }
            }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV =
                3, CKEDITOR.config = { customConfig: "config.js", autoUpdateElement: !0, language: "", defaultLanguage: "en", contentsLangDirection: "", enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: "<!DOCTYPE html>", bodyId: "", bodyClass: "", fullPage: !1, height: 200, extraPlugins: "", removePlugins: "", protectedSource: [], tabIndex: 0, width: "", baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] }, function() {
                CKEDITOR.focusManager = function(b) {
                    if (b.focusManager)return b.focusManager;
                    this.hasFocus = false;
                    this.currentActive = null;
                    this._ = { editor: b };
                    return this
                };
                CKEDITOR.focusManager._ = { blurDelay: 200 };
                CKEDITOR.focusManager.prototype = {
                    focus: function() {
                        this._.timer && clearTimeout(this._.timer);
                        if (!this.hasFocus && !this._.locked) {
                            var b = CKEDITOR.currentInstance;
                            b && b.focusManager.blur(1);
                            this.hasFocus = true;
                            (b = this._.editor.container) && b.addClass("cke_focus");
                            this._.editor.fire("focus")
                        }
                    },
                    lock: function() { this._.locked = 1 },
                    unlock: function() { delete this._.locked },
                    blur: function(b) {
                        function h() {
                            if (this.hasFocus) {
                                this.hasFocus =
                                    false;
                                var a = this._.editor.container;
                                a && a.removeClass("cke_focus");
                                this._.editor.fire("blur")
                            }
                        }

                        if (!this._.locked) {
                            this._.timer && clearTimeout(this._.timer);
                            var a = CKEDITOR.focusManager._.blurDelay;
                            b || !a ? h.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                                delete this._.timer;
                                h.call(this)
                            }, a, this)
                        }
                    },
                    add: function(b, h) {
                        var a = b.getCustomData("focusmanager");
                        if (!a || a != this) {
                            a && a.remove(b);
                            var a = "focus", g = "blur";
                            if (h)
                                if (CKEDITOR.env.ie) {
                                    a = "focusin";
                                    g = "focusout"
                                } else CKEDITOR.event.useCapture = 1;
                            var e =
                            {
                                blur: function() { b.equals(this.currentActive) && this.blur() },
                                focus: function() {
                                    this.currentActive = b;
                                    this.focus()
                                }
                            };
                            b.on(a, e.focus, this);
                            b.on(g, e.blur, this);
                            if (h)CKEDITOR.event.useCapture = 0;
                            b.setCustomData("focusmanager", this);
                            b.setCustomData("focusmanager_handlers", e)
                        }
                    },
                    remove: function(b) {
                        b.removeCustomData("focusmanager");
                        var h = b.removeCustomData("focusmanager_handlers");
                        b.removeListener("blur", h.blur);
                        b.removeListener("focus", h.focus)
                    }
                }
            }(), CKEDITOR.keystrokeHandler = function(b) {
                if (b.keystrokeHandler)return b.keystrokeHandler;
                this.keystrokes = {};
                this.blockedKeystrokes = {};
                this._ = { editor: b };
                return this
            }, function() {
                var b,
                    h = function(a) {
                        var a = a.data, e = a.getKeystroke(), i = this.keystrokes[e], d = this._.editor;
                        b = d.fire("key", { keyCode: e }) === false;
                        if (!b) {
                            i && (b = d.execCommand(i, { from: "keystrokeHandler" }) !== false);
                            b || (b = !!this.blockedKeystrokes[e])
                        }
                        b && a.preventDefault(true);
                        return!b
                    },
                    a = function(a) {
                        if (b) {
                            b = false;
                            a.data.preventDefault(true)
                        }
                    };
                CKEDITOR.keystrokeHandler.prototype = {
                    attach: function(b) {
                        b.on("keydown", h, this);
                        if (CKEDITOR.env.opera ||
                            CKEDITOR.env.gecko && CKEDITOR.env.mac)b.on("keypress", a, this)
                    }
                }
            }(), function() {
                CKEDITOR.lang = {
                    languages: { af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, "en-au": 1, "en-ca": 1, "en-gb": 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, "fr-ca": 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, pl: 1, "pt-br": 1, pt: 1, ro: 1, ru: 1, sk: 1, sl: 1, "sr-latn": 1, sr: 1, sv: 1, th: 1, tr: 1, uk: 1, vi: 1, "zh-cn": 1, zh: 1 },
                    load: function(b, h, a) {
                        if (!b || !CKEDITOR.lang.languages[b])
                            b = this.detect(h,
                                b);
                        this[b] ? a(b, this[b]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + b + ".js"), function() { a(b, this[b]) }, this)
                    },
                    detect: function(b, h) {
                        var a = this.languages, h = h || navigator.userLanguage || navigator.language || b, g = h.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), e = g[1], g = g[2];
                        a[e + "-" + g] ? e = e + "-" + g : a[e] || (e = null);
                        CKEDITOR.lang.detect = e ? function() { return e } : function(a) { return a };
                        return e || b
                    }
                }
            }(), CKEDITOR.scriptLoader = function() {
                var b = {}, h = {};
                return{
                    load: function(a, g, e, i) {
                        var d = typeof a == "string";
                        d && (a = [a]);
                        e || (e = CKEDITOR);
                        var f = a.length, c = [], j = [], k = function(a) { g && (d ? g.call(e, a) : g.call(e, c, j)) };
                        if (f === 0)k(true);
                        else {
                            var l = function(a, b) {
                                    (b ? c : j).push(a);
                                    if (--f <= 0) {
                                        i && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                                        k(b)
                                    }
                                },
                                m = function(a, c) {
                                    b[a] = 1;
                                    var d = h[a];
                                    delete h[a];
                                    for (var f = 0; f < d.length; f++)d[f](a, c)
                                },
                                n = function(a) {
                                    if (b[a])l(a, true);
                                    else {
                                        var c = h[a] || (h[a] = []);
                                        c.push(l);
                                        if (!(c.length > 1)) {
                                            var d = new CKEDITOR.dom.element("script");
                                            d.setAttributes({ type: "text/javascript", src: a });
                                            if (g)
                                                if (CKEDITOR.env.ie)
                                                    d.$.onreadystatechange =
                                                        function() {
                                                            if (d.$.readyState == "loaded" || d.$.readyState == "complete") {
                                                                d.$.onreadystatechange = null;
                                                                m(a, true)
                                                            }
                                                        };
                                                else {
                                                    d.$.onload = function() { setTimeout(function() { m(a, true) }, 0) };
                                                    d.$.onerror = function() { m(a, false) }
                                                }
                                            d.appendTo(CKEDITOR.document.getHead())
                                        }
                                    }
                                };
                            i && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                            for (var o = 0; o < f; o++)n(a[o])
                        }
                    }
                }
            }(), CKEDITOR.resourceManager = function(b, h) {
                this.basePath = b;
                this.fileName = h;
                this.registered = {};
                this.loaded = {};
                this.externals = {};
                this._ = { waitingList: {} }
            }, CKEDITOR.resourceManager.prototype =
            {
                add: function(b, h) {
                    if (this.registered[b])throw'[CKEDITOR.resourceManager.add] The resource name "' + b + '" is already registered.';
                    var a = this.registered[b] = h || {};
                    a.name = b;
                    a.path = this.getPath(b);
                    CKEDITOR.fire(b + CKEDITOR.tools.capitalize(this.fileName) + "Ready", a);
                    return this.get(b)
                },
                get: function(b) { return this.registered[b] || null },
                getPath: function(b) {
                    var h = this.externals[b];
                    return CKEDITOR.getUrl(h && h.dir || this.basePath + b + "/")
                },
                getFilePath: function(b) {
                    var h = this.externals[b];
                    return CKEDITOR.getUrl(this.getPath(b) +
                    (h && typeof h.file == "string" ? h.file : this.fileName + ".js"))
                },
                addExternal: function(b, h, a) { for (var b = b.split(","), g = 0; g < b.length; g++)this.externals[b[g]] = { dir: h, file: a } },
                load: function(b, h, a) {
                    CKEDITOR.tools.isArray(b) || (b = b ? [b] : []);
                    for (var g = this.loaded, e = this.registered, i = [], d = {}, f = {}, c = 0; c < b.length; c++) {
                        var j = b[c];
                        if (j)
                            if (!g[j] && !e[j]) {
                                var k = this.getFilePath(j);
                                i.push(k);
                                k in d || (d[k] = []);
                                d[k].push(j)
                            } else f[j] = this.get(j)
                    }
                    CKEDITOR.scriptLoader.load(i, function(b, c) {
                        if (c.length)
                            throw'[CKEDITOR.resourceManager.load] Resource name "' +
                                d[c[0]].join(",") + '" was not found at "' + c[0] + '".';
                        for (var i = 0; i < b.length; i++)
                            for (var e = d[b[i]], j = 0; j < e.length; j++) {
                                var k = e[j];
                                f[k] = this.get(k);
                                g[k] = 1
                            }
                        h.call(a, f)
                    }, this)
                }
            }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(b) {
                var h = {};
                return function(a, g, e) {
                    var i = {},
                        d = function(a) {
                            b.call(this, a, function(a) {
                                CKEDITOR.tools.extend(i, a);
                                var b = [], f;
                                for (f in a) {
                                    var l = a[f], m = l && l.requires;
                                    if (!h[f]) {
                                        if (l.icons)
                                            for (var n =
                                                         l.icons.split(","),
                                                o = 0; o < n.length; o++)CKEDITOR.skin.addIcon(n[o], l.path + "icons/" + n[o] + ".png");
                                        h[f] = 1
                                    }
                                    if (m) {
                                        m.split && (m = m.split(","));
                                        for (l = 0; l < m.length; l++)i[m[l]] || b.push(m[l])
                                    }
                                }
                                if (b.length)d.call(this, b);
                                else {
                                    for (f in i) {
                                        l = i[f];
                                        if (l.onLoad && !l.onLoad._called) {
                                            l.onLoad() === false && delete i[f];
                                            l.onLoad._called = 1
                                        }
                                    }
                                    g && g.call(e || window, i)
                                }
                            }, this)
                        };
                    d.call(this, a)
                }
            }), CKEDITOR.plugins.setLang = function(b, h, a) {
                var g = this.get(b), b = g.langEntries || (g.langEntries = {}), g = g.lang || (g.lang = []);
                g.split && (g = g.split(","));
                CKEDITOR.tools.indexOf(g, h) == -1 && g.push(h);
                b[h] = a
            }, CKEDITOR.ui = function(b) {
                if (b.ui)return b.ui;
                this.items = {};
                this.instances = {};
                this.editor = b;
                this._ = { handlers: {} };
                return this
            }, CKEDITOR.ui.prototype = {
                add: function(b, h, a) {
                    a.name = b.toLowerCase();
                    var g = this.items[b] = { type: h, command: a.command || null, args: Array.prototype.slice.call(arguments, 2) };
                    CKEDITOR.tools.extend(g, a)
                },
                get: function(b) { return this.instances[b] },
                create: function(b) {
                    var h = this.items[b],
                        a = h && this._.handlers[h.type],
                        g = h && h.command && this.editor.getCommand(h.command),
                        a = a && a.create.apply(this, h.args);
                    this.instances[b] = a;
                    g && g.uiItems.push(a);
                    if (a && !a.type)a.type = h.type;
                    return a
                },
                addHandler: function(b, h) { this._.handlers[b] = h },
                space: function(b) { return CKEDITOR.document.getById(this.spaceId(b)) },
                spaceId: function(b) { return this.editor.id + "_" + b }
            }, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
                function b(b, c, d) {
                    CKEDITOR.event.call(this);
                    b = b && CKEDITOR.tools.clone(b);
                    if (c !== void 0) {
                        if (c instanceof CKEDITOR.dom.element) {
                            if (!d)throw Error("One of the element mode must be specified.");
                        } else throw Error("Expect element of type CKEDITOR.dom.element.");
                        if (CKEDITOR.env.ie && CKEDITOR.env.quirks && d == CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");
                        if (d == CKEDITOR.ELEMENT_MODE_INLINE && !c.is(CKEDITOR.dtd.$editable) || d == CKEDITOR.ELEMENT_MODE_REPLACE && c.is(CKEDITOR.dtd.$nonBodyContent))throw Error('The specified element mode is not supported on element: "' + c.getName() + '".');
                        this.element = c;
                        this.elementMode = d;
                        this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO &&
                        (c.getId() || c.getNameAtt())
                    } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
                    this._ = {};
                    this.commands = {};
                    this.templates = {};
                    this.name = this.name || h();
                    this.id = CKEDITOR.tools.getNextId();
                    this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
                    this.ui = new CKEDITOR.ui(this);
                    this.focusManager = new CKEDITOR.focusManager(this);
                    this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
                    this.on("mode", a);
                    this.on("readOnly", a);
                    this.on("selectionChange", g);
                    this.on("instanceReady", function() {
                        this.config.startupFocus &&
                            this.focus()
                    });
                    CKEDITOR.fire("instanceCreated", null, this);
                    CKEDITOR.add(this);
                    CKEDITOR.tools.setTimeout(function() { i(this, b) }, 0, this)
                }

                function h() {
                    do var a = "editor" + ++k;
                    while (CKEDITOR.instances[a]);
                    return a
                }

                function a() {
                    var a, b = this.commands, c = this.mode;
                    if (c)
                        for (var d in b) {
                            a = b[d];
                            a[a.startDisabled ? "disable" : this.readOnly && !a.readOnly ? "disable" : a.modes[c] ? "enable" : "disable"]()
                        }
                }

                function g(a) {
                    var b = this.commands, c = a.editor, d = a.data.path, f;
                    for (f in b) {
                        a = b[f];
                        a.contextSensitive && a.refresh(c, d)
                    }
                }

                function e(a) {
                    var b =
                        a.config.customConfig;
                    if (!b)return false;
                    var b = CKEDITOR.getUrl(b), c = l[b] || (l[b] = {});
                    if (c.fn) {
                        c.fn.call(a, a.config);
                        (CKEDITOR.getUrl(a.config.customConfig) == b || !e(a)) && a.fireOnce("customConfigLoaded")
                    } else
                        CKEDITOR.scriptLoader.load(b, function() {
                            c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
                            e(a)
                        });
                    return true
                }

                function i(a, b) {
                    a.on("customConfigLoaded", function() {
                        if (b) {
                            if (b.on)for (var c in b.on)a.on(c, b.on[c]);
                            CKEDITOR.tools.extend(a.config, b, true);
                            delete a.config.on
                        }
                        a.readOnly = !(!a.config.readOnly &&
                            !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.getAttribute("disabled")));
                        a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !CKEDITOR.dtd[a.element.getName()].p;
                        a.tabIndex = a.config.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                        if (a.config.skin)CKEDITOR.skinName = a.config.skin;
                        a.fireOnce("configLoaded");
                        a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                        d(a)
                    });
                    if (b && b.customConfig != void 0)
                        a.config.customConfig =
                            b.customConfig;
                    e(a) || a.fireOnce("customConfigLoaded")
                }

                function d(a) { CKEDITOR.skin.loadPart("editor", function() { f(a) }) }

                function f(a) {
                    CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, d) {
                        a.langCode = b;
                        a.lang = CKEDITOR.tools.prototypedCopy(d);
                        if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.lang.dir == "rtl")a.lang.dir = "ltr";
                        if (!a.config.contentsLangDirection)a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                        a.fire("langLoaded");
                        c(a)
                    })
                }

                function c(a) {
                    var b = a.config, c = b.plugins, d = b.extraPlugins, f = b.removePlugins;
                    if (d)var i = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(i, ""), c = c + ("," + d);
                    if (f)var e = RegExp("(?:^|,)(?:" + f.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(e, "");
                    CKEDITOR.env.air && (c = c + ",adobeair");
                    CKEDITOR.plugins.load(c.split(","), function(c) {
                        var d = [], f = [], i = [];
                        a.plugins = c;
                        for (var g in c) {
                            var j = c[g], l = j.lang, h = null, o = j.requires, k;
                            CKEDITOR.tools.isArray(o) && (o = o.join(","));
                            if (o && (k =
                                o.match(e)))for (; o = k.pop();)CKEDITOR.tools.setTimeout(function(a, b) { throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.'); }, 0, null, [o, g]);
                            if (l && !a.lang[g]) {
                                l.split && (l = l.split(","));
                                if (CKEDITOR.tools.indexOf(l, a.langCode) >= 0)h = a.langCode;
                                else {
                                    h = a.langCode.replace(/-.*/, "");
                                    h = h != a.langCode && CKEDITOR.tools.indexOf(l, h) >= 0 ? h : CKEDITOR.tools.indexOf(l, "en") >= 0 ? "en" : l[0]
                                }
                                if (!j.langEntries || !j.langEntries[h])
                                    i.push(CKEDITOR.getUrl(j.path +
                                        "lang/" + h + ".js"));
                                else {
                                    a.lang[g] = j.langEntries[h];
                                    h = null
                                }
                            }
                            f.push(h);
                            d.push(j)
                        }
                        CKEDITOR.scriptLoader.load(i, function() {
                            for (var c = ["beforeInit", "init", "afterInit"], i = 0; i < c.length; i++)
                                for (var e = 0; e < d.length; e++) {
                                    var g = d[e];
                                    i === 0 && (f[e] && g.lang && g.langEntries) && (a.lang[g.name] = g.langEntries[f[e]]);
                                    if (g[c[i]])g[c[i]](a)
                                }
                            a.fireOnce("pluginsLoaded");
                            b.keystrokes && a.setKeystroke(a.config.keystrokes);
                            for (e = 0; e < a.config.blockedKeystrokes.length; e++)
                                a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[e]] =
                                    1;
                            a.fireOnce("loaded");
                            CKEDITOR.fire("instanceLoaded", null, a)
                        })
                    })
                }

                function j() {
                    var a = this.element;
                    if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                        var b = this.getData();
                        this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                        a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                        return true
                    }
                    return false
                }

                b.prototype = CKEDITOR.editor.prototype;
                CKEDITOR.editor = b;
                var k = 0, l = {};
                CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    addCommand: function(a, b) { return this.commands[a] = new CKEDITOR.command(this, b) },
                    destroy: function(a) {
                        this.fire("beforeDestroy");
                        !a && j.call(this);
                        this.editable(null);
                        this.fire("destroy");
                        this.removeAllListeners();
                        CKEDITOR.remove(this);
                        CKEDITOR.fire("instanceDestroyed", null, this)
                    },
                    elementPath: function(a) { return(a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null },
                    createRange: function() {
                        var a = this.editable();
                        return a ? new CKEDITOR.dom.range(a) : null
                    },
                    execCommand: function(a, b) {
                        var c = this.getCommand(a), d = { name: a, commandData: b, command: c };
                        if (c &&
                            c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== true) {
                            d.returnValue = c.exec(d.commandData);
                            if (!c.async && this.fire("afterCommandExec", d) !== true)return d.returnValue
                        }
                        return false
                    },
                    getCommand: function(a) { return this.commands[a] },
                    getData: function(a) {
                        !a && this.fire("beforeGetData");
                        var b = this._.data;
                        if (typeof b != "string")b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                        b = { dataValue: b };
                        !a && this.fire("getData", b);
                        return b.dataValue
                    },
                    getSnapshot: function() {
                        var a = this.fire("getSnapshot");
                        if (typeof a != "string") {
                            var b = this.element;
                            b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml())
                        }
                        return a
                    },
                    loadSnapshot: function(a) { this.fire("loadSnapshot", a) },
                    setData: function(a, b, c) {
                        if (b)
                            this.on("dataReady", function(a) {
                                a.removeListener();
                                b.call(a.editor)
                            });
                        a = { dataValue: a };
                        !c && this.fire("setData", a);
                        this._.data = a.dataValue;
                        !c && this.fire("afterSetData", a)
                    },
                    setReadOnly: function(a) {
                        a = a == void 0 || a;
                        if (this.readOnly !=
                            a) {
                            this.readOnly = a;
                            this.editable().setReadOnly(a);
                            this.fire("readOnly")
                        }
                    },
                    insertHtml: function(a, b) { this.fire("insertHtml", { dataValue: a, mode: b }) },
                    insertText: function(a) { this.fire("insertText", a) },
                    insertElement: function(a) { this.fire("insertElement", a) },
                    focus: function() { this.fire("beforeFocus") },
                    checkDirty: function() { return this._.previousValue !== this.getSnapshot() },
                    resetDirty: function() { this._.previousValue = this.getSnapshot() },
                    updateElement: function() { return j.call(this) },
                    setKeystroke: function() {
                        for (var a =
                                     this.keystrokeHandler.keystrokes,
                            b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)],
                            c,
                            d,
                            f = b.length; f--;) {
                            c = b[f];
                            d = 0;
                            if (CKEDITOR.tools.isArray(c)) {
                                d = c[1];
                                c = c[0]
                            }
                            d ? a[c] = d : delete a[c]
                        }
                    }
                })
            }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
                this._ = {
                    htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))",
                        "g")
                }
            }, function() {
                var b = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, h = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 };
                CKEDITOR.htmlParser.prototype = {
                    onTagOpen: function() {},
                    onTagClose: function() {},
                    onText: function() {},
                    onCDATA: function() {},
                    onComment: function() {},
                    parse: function(a) {
                        for (var g, e, i = 0, d; g = this._.htmlPartsRegex.exec(a);) {
                            e = g.index;
                            if (e > i) {
                                i = a.substring(i, e);
                                if (d)d.push(i);
                                else this.onText(i)
                            }
                            i = this._.htmlPartsRegex.lastIndex;
                            if (e = g[1]) {
                                e = e.toLowerCase();
                                if (d && CKEDITOR.dtd.$cdata[e]) {
                                    this.onCDATA(d.join(""));
                                    d = null
                                }
                                if (!d) {
                                    this.onTagClose(e);
                                    continue
                                }
                            }
                            if (d)d.push(g[0]);
                            else if (e = g[3]) {
                                e = e.toLowerCase();
                                if (!/="/.test(e)) {
                                    var f = {}, c;
                                    g = g[4];
                                    var j = !!(g && g.charAt(g.length - 1) == "/");
                                    if (g)
                                        for (; c = b.exec(g);) {
                                            var k = c[1].toLowerCase();
                                            c = c[2] || c[3] || c[4] || "";
                                            f[k] = !c && h[k] ? k : c
                                        }
                                    this.onTagOpen(e, f, j);
                                    !d && CKEDITOR.dtd.$cdata[e] && (d = [])
                                }
                            } else if (e = g[2])this.onComment(e)
                        }
                        if (a.length >
                            i)this.onText(a.substring(i, a.length))
                    }
                }
            }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
                $: function() { this._ = { output: [] } },
                proto: {
                    openTag: function(b) { this._.output.push("<", b) },
                    openTagClose: function(b, h) { h ? this._.output.push(" />") : this._.output.push(">") },
                    attribute: function(b, h) {
                        typeof h == "string" && (h = CKEDITOR.tools.htmlEncodeAttr(h));
                        this._.output.push(" ", b, '="', h, '"')
                    },
                    closeTag: function(b) { this._.output.push("</", b, ">") },
                    text: function(b) { this._.output.push(b) },
                    comment: function(b) {
                        this._.output.push("<\!--",
                            b, "--\>")
                    },
                    write: function(b) { this._.output.push(b) },
                    reset: function() {
                        this._.output = [];
                        this._.indent = false
                    },
                    getHtml: function(b) {
                        var h = this._.output.join("");
                        b && this.reset();
                        return h
                    }
                }
            }), CKEDITOR.htmlParser.comment = function(b) {
                this.value = b;
                this._ = { isBlockLike: false }
            }, CKEDITOR.htmlParser.comment.prototype = {
                type: CKEDITOR.NODE_COMMENT,
                writeHtml: function(b, h) {
                    var a = this.value;
                    if (h) {
                        if (!(a = h.onComment(a, this)))return;
                        if (typeof a != "string") {
                            a.parent = this.parent;
                            a.writeHtml(b, h);
                            return
                        }
                    }
                    b.comment(a)
                }
            }, function() {
                CKEDITOR.htmlParser.text =
                    function(b) {
                        this.value = b;
                        this._ = { isBlockLike: false }
                    };
                CKEDITOR.htmlParser.text.prototype = {
                    type: CKEDITOR.NODE_TEXT,
                    writeHtml: function(b, h) {
                        var a = this.value;
                        (!h || (a = h.onText(a, this))) && b.text(a)
                    }
                }
            }(), function() {
                CKEDITOR.htmlParser.cdata = function(b) { this.value = b };
                CKEDITOR.htmlParser.cdata.prototype = { type: CKEDITOR.NODE_TEXT, writeHtml: function(b) { b.write(this.value) } }
            }(), CKEDITOR.htmlParser.fragment = function() {
                this.children = [];
                this.parent = null;
                this._ = { isBlockLike: true, hasInlineStarted: false }
            }, function() {
                function b(a) {
                    return a.name ==
                        "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
                }

                var h = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), a = { ol: 1, ul: 1 }, g = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 });
                CKEDITOR.htmlParser.fragment.fromHtml = function(e, i, d) {
                    function f(a) {
                        var b;
                        if (p.length > 0)
                            for (var d = 0; d < p.length; d++) {
                                var f = p[d], i = f.name, e = CKEDITOR.dtd[i], g = r.name && CKEDITOR.dtd[r.name];
                                if ((!g || g[i]) &&
                                (!a || !e || e[a] || !CKEDITOR.dtd[a])) {
                                    if (!b) {
                                        c();
                                        b = 1
                                    }
                                    f = f.clone();
                                    f.parent = r;
                                    r = f;
                                    p.splice(d, 1);
                                    d--
                                } else if (i == r.name) {
                                    k(r, r.parent, 1);
                                    d--
                                }
                            }
                    }

                    function c() { for (; t.length;)k(t.shift(), r) }

                    function j(a) {
                        if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                            var b = a.children.length, c = a.children[b - 1], d;
                            if (c && c.type == CKEDITOR.NODE_TEXT)(d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                        }
                    }

                    function k(a, c, f) {
                        var c = c || r || o, i = r;
                        if (a.previous === void 0) {
                            if (l(c, a)) {
                                r = c;
                                n.onTagOpen(d, {});
                                a.returnPoint = c = r
                            }
                            j(a);
                            (!b(a) || a.children.length) && c.add(a);
                            a.name == "pre" && (x = false);
                            a.name == "textarea" && (s = false)
                        }
                        if (a.returnPoint) {
                            r = a.returnPoint;
                            delete a.returnPoint
                        } else r = f ? c : i
                    }

                    function l(a, b) {
                        if ((a == o || a.name == "body") && d && (!a.name || CKEDITOR.dtd[a.name][d])) {
                            var c, f;
                            return(c = b.attributes && (f = b.attributes["data-cke-real-element-type"]) ? f : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                        }
                    }

                    function m(a, b) {
                        return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ?
                            a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false
                    }

                    var n = new CKEDITOR.htmlParser, o = i instanceof CKEDITOR.htmlParser.element ? i : typeof i == "string" ? new CKEDITOR.htmlParser.element(i) : new CKEDITOR.htmlParser.fragment, p = [], t = [], r = o, s = o.name == "textarea", x = o.name == "pre";
                    n.onTagOpen = function(d, i, e, j) {
                        i = new CKEDITOR.htmlParser.element(d, i);
                        if (i.isUnknown && e)i.isEmpty = true;
                        i.isOptionalClose = j;
                        if (b(i))p.push(i);
                        else {
                            if (d == "pre")x = true;
                            else {
                                if (d == "br" && x) {
                                    r.add(new CKEDITOR.htmlParser.text("\n"));
                                    return
                                }
                                d == "textarea" &&
                                (s = true)
                            }
                            if (d == "br")t.push(i);
                            else {
                                for (;;) {
                                    j = (e = r.name) ? CKEDITOR.dtd[e] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : g;
                                    if (!i.isUnknown && !r.isUnknown && !j[d])
                                        if (r.isOptionalClose)n.onTagClose(e);
                                        else if (d in a && e in a) {
                                            e = r.children;
                                            (e = e[e.length - 1]) && e.name == "li" || k(e = new CKEDITOR.htmlParser.element("li"), r);
                                            !i.returnPoint && (i.returnPoint = r);
                                            r = e
                                        } else if (d in CKEDITOR.dtd.$listItem && !m(d, e))n.onTagOpen(d == "li" ? "ul" : "dl", {}, 0, 1);
                                        else if (e in h && !m(d, e)) {
                                            !i.returnPoint && (i.returnPoint = r);
                                            r = r.parent
                                        } else {
                                            e in
                                                CKEDITOR.dtd.$inline && p.unshift(r);
                                            if (r.parent)k(r, r.parent, 1);
                                            else {
                                                i.isOrphan = 1;
                                                break
                                            }
                                        }
                                    else break
                                }
                                f(d);
                                c();
                                i.parent = r;
                                i.isEmpty ? k(i) : r = i
                            }
                        }
                    };
                    n.onTagClose = function(a) {
                        for (var b = p.length - 1; b >= 0; b--)
                            if (a == p[b].name) {
                                p.splice(b, 1);
                                return
                            }
                        for (var f = [], i = [], e = r; e != o && e.name != a;) {
                            e._.isBlockLike || i.unshift(e);
                            f.push(e);
                            e = e.returnPoint || e.parent
                        }
                        if (e != o) {
                            for (b = 0; b < f.length; b++) {
                                var g = f[b];
                                k(g, g.parent)
                            }
                            r = e;
                            e._.isBlockLike && c();
                            k(e, e.parent);
                            if (e == r)r = r.parent;
                            p = p.concat(i)
                        }
                        a == "body" && (d = false)
                    };
                    n.onText =
                        function(b) {
                            if ((!r._.hasInlineStarted || t.length) && !x && !s) {
                                b = CKEDITOR.tools.ltrim(b);
                                if (b.length === 0)return
                            }
                            var i = r.name, e = i ? CKEDITOR.dtd[i] || (r._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : g;
                            if (!s && !e["#"] && i in h) {
                                n.onTagOpen(i in a ? "li" : i == "dl" ? "dd" : i == "table" ? "tr" : i == "tr" ? "td" : "");
                                n.onText(b)
                            } else {
                                c();
                                f();
                                !x && !s && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                                b = new CKEDITOR.htmlParser.text(b);
                                if (l(r, b))this.onTagOpen(d, {}, 0, 1);
                                r.add(b)
                            }
                        };
                    n.onCDATA = function(a) { r.add(new CKEDITOR.htmlParser.cdata(a)) };
                    n.onComment = function(a) {
                        c();
                        f();
                        r.add(new CKEDITOR.htmlParser.comment(a))
                    };
                    n.parse(e);
                    for (c(!CKEDITOR.env.ie && 1); r != o;)k(r, r.parent, 1);
                    j(o);
                    return o
                };
                CKEDITOR.htmlParser.fragment.prototype = {
                    type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
                    add: function(a, b) {
                        isNaN(b) && (b = this.children.length);
                        var d = b > 0 ? this.children[b - 1] : null;
                        if (d) {
                            if (a._.isBlockLike && d.type == CKEDITOR.NODE_TEXT) {
                                d.value = CKEDITOR.tools.rtrim(d.value);
                                if (d.value.length === 0) {
                                    this.children.pop();
                                    this.add(a);
                                    return
                                }
                            }
                            d.next = a
                        }
                        a.previous = d;
                        a.parent = this;
                        this.children.splice(b, 0, a);
                        if (!this._.hasInlineStarted)this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
                    },
                    writeHtml: function(a, b) {
                        var d;
                        this.filterChildren = function() {
                            var a = new CKEDITOR.htmlParser.basicWriter;
                            this.writeChildrenHtml.call(this, a, b);
                            a = a.getHtml();
                            this.children = (new CKEDITOR.htmlParser.fragment.fromHtml(a)).children;
                            d = 1
                        };
                        b && b.onRoot(this);
                        this.writeChildrenHtml(a, d ? null : b)
                    },
                    writeChildrenHtml: function(a, b, d) {
                        if (d && !this.parent && b)b.onRoot(this);
                        for (d = 0; d < this.children.length; d++)this.children[d].writeHtml(a, b)
                    }
                }
            }(), function() {
                function b(a, b) {
                    for (var f = 0; a && f < b.length; f++)var c = b[f], a = a.replace(c[0], c[1]);
                    return a
                }

                function h(a, b, f) {
                    typeof b == "function" && (b = [b]);
                    var c, e;
                    e = a.length;
                    var g = b && b.length;
                    if (g) {
                        for (c = 0; c < e && a[c].pri < f; c++);
                        for (e = g - 1; e >= 0; e--)
                            if (g = b[e]) {
                                g.pri = f;
                                a.splice(c, 0, g)
                            }
                    }
                }

                function a(a, b, f) {
                    if (b)
                        for (var c in b) {
                            var e = a[c];
                            a[c] = g(e, b[c], f);
                            e || a.$length++
                        }
                }

                function g(a, b, f) {
                    if (b) {
                        b.pri = f;
                        if (a) {
                            if (a.splice)h(a, b, f);
                            else {
                                a = a.pri >
                                    f ? [b, a] : [a, b];
                                a.filter = e
                            }
                            return a
                        }
                        return b.filter = b
                    }
                }

                function e(a) {
                    for (var b = a.type || a instanceof CKEDITOR.htmlParser.fragment, f = 0; f < this.length; f++) {
                        if (b)var c = a.type, e = a.name;
                        var g = this[f].apply(window, arguments);
                        if (g === false)return g;
                        if (b) {
                            if (g && (g.name != e || g.type != c))return g
                        } else if (typeof g != "string")return g;
                        g != void 0 && (a = g)
                    }
                    return a
                }

                CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
                    $: function(a) {
                        this._ = { elementNames: [], attributeNames: [], elements: { $length: 0 }, attributes: { $length: 0 } };
                        a &&
                            this.addRules(a, 10)
                    },
                    proto: {
                        addRules: function(b, d) {
                            typeof d != "number" && (d = 10);
                            h(this._.elementNames, b.elementNames, d);
                            h(this._.attributeNames, b.attributeNames, d);
                            a(this._.elements, b.elements, d);
                            a(this._.attributes, b.attributes, d);
                            this._.text = g(this._.text, b.text, d) || this._.text;
                            this._.comment = g(this._.comment, b.comment, d) || this._.comment;
                            this._.root = g(this._.root, b.root, d) || this._.root
                        },
                        onElementName: function(a) { return b(a, this._.elementNames) },
                        onAttributeName: function(a) { return b(a, this._.attributeNames) },
                        onText: function(a) {
                            var b = this._.text;
                            return b ? b.filter(a) : a
                        },
                        onComment: function(a, b) {
                            var f = this._.comment;
                            return f ? f.filter(a, b) : a
                        },
                        onRoot: function(a) {
                            var b = this._.root;
                            return b ? b.filter(a) : a
                        },
                        onElement: function(a) {
                            for (var b = [this._.elements["^"], this._.elements[a.name], this._.elements.$], f, c = 0; c < 3; c++)
                                if (f = b[c]) {
                                    f = f.filter(a, this);
                                    if (f === false)return null;
                                    if (f && f != a)return this.onNode(f);
                                    if (a.parent && !a.name)break
                                }
                            return a
                        },
                        onNode: function(a) {
                            var b = a.type;
                            return b == CKEDITOR.NODE_ELEMENT ? this.onElement(a) :
                                b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a.value)) : b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a.value)) : null
                        },
                        onAttribute: function(a, b, f) {
                            if (b = this._.attributes[b]) {
                                a = b.filter(f, a, this);
                                if (a === false)return false;
                                if (typeof a != "undefined")return a
                            }
                            return f
                        }
                    }
                })
            }(), function() {
                function b(b, j) {
                    function l(a) { return a || CKEDITOR.env.ie ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", { "data-cke-bogus": 1 }) }

                    function h(b, d) {
                        return function(f) {
                            if (f.type !=
                                CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var e = [], j = a(f), h, m;
                                if (j)
                                    for (o(j, 1) && e.push(j); j;) {
                                        if (i(j) && (h = g(j)) && o(h))
                                            if ((m = g(h)) && !i(m))e.push(h);
                                            else {
                                                var k = h, p = l(n), t = k.parent.children, r = CKEDITOR.tools.indexOf(t, k);
                                                t.splice(r + 1, 0, p);
                                                t = k.next;
                                                k.next = p;
                                                p.previous = k;
                                                p.parent = k.parent;
                                                p.next = t;
                                                c(h)
                                            }
                                        j = j.previous
                                    }
                                for (j = 0; j < e.length; j++)c(e[j]);
                                if (e = CKEDITOR.env.opera && !b || (typeof d == "function" ? d(f) !== false : d))
                                    if (!n && CKEDITOR.env.ie && f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)e = false;
                                    else if (!n && CKEDITOR.env.ie && (document.documentMode >
                                        7 || f.name in CKEDITOR.dtd.tr || f.name in CKEDITOR.dtd.$listItem))e = false;
                                    else {
                                        e = a(f);
                                        e = !e || f.name == "form" && e.name == "input"
                                    }
                                e && f.add(l(b))
                            }
                        }
                    }

                    function o(a, b) {
                        if ((!n || !CKEDITOR.env.ie) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"])return true;
                        var c;
                        if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(x))) {
                            if (c.index) {
                                d(a, new CKEDITOR.htmlParser.text(a.value.substring(0, c.index)));
                                a.value = c[0]
                            }
                            if (CKEDITOR.env.ie && n && (!b || a.parent.name in k))return true;
                            if (!n)
                                if ((c = a.previous) &&
                                    c.name == "br" || !c || i(c))return true
                        }
                        return false
                    }

                    var m = { elements: {} }, n = j == "html", k = CKEDITOR.tools.extend({}, q), p;
                    for (p in k)"#" in w[p] || delete k[p];
                    for (p in k)m.elements[p] = h(n, b.config.fillEmptyBlocks !== false);
                    m.root = h(n);
                    m.elements.br = function(a) {
                        return function(b) {
                            if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                                var c = b.attributes;
                                if ("data-cke-bogus" in c || "data-cke-eol" in c)delete c["data-cke-bogus"];
                                else {
                                    for (c = b.next; c && e(c);)c = c.next;
                                    var j = g(b);
                                    !c && i(b.parent) ? f(b.parent, l(a)) : i(c) && (j && !i(j)) &&
                                        d(c, l(a))
                                }
                            }
                        }
                    }(n);
                    return m
                }

                function h(a) { return a.enterMode != CKEDITOR.ENTER_BR && a.autoParagraph !== false ? a.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false }

                function a(a) {
                    for (a = a.children[a.children.length - 1]; a && e(a);)a = a.previous;
                    return a
                }

                function g(a) {
                    for (a = a.previous; a && e(a);)a = a.previous;
                    return a
                }

                function e(a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"] }

                function i(a) {
                    return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in
                        q || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
                }

                function d(a, b) {
                    var c = a.parent.children, d = CKEDITOR.tools.indexOf(c, a);
                    c.splice(d, 0, b);
                    c = a.previous;
                    a.previous = b;
                    b.next = a;
                    b.parent = a.parent;
                    if (c) {
                        b.previous = c;
                        c.next = b
                    }
                }

                function f(a, b) {
                    var c = a.children[a.children.length - 1];
                    a.children.push(b);
                    b.parent = a;
                    if (c) {
                        c.next = b;
                        b.previous = c
                    }
                }

                function c(a) {
                    var b = a.parent.children, c = CKEDITOR.tools.indexOf(b, a), d = a.previous, a = a.next;
                    d && (d.next = a);
                    a && (a.previous = d);
                    b.splice(c, 1)
                }

                function j(a) {
                    var b = a.parent;
                    return b ? CKEDITOR.tools.indexOf(b.children,
                        a) : -1
                }

                function k(a) {
                    a = a.attributes;
                    a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
                    a.contenteditable = "false"
                }

                function l(a) {
                    a = a.attributes;
                    switch (a["data-cke-editable"]) {
                    case "true":
                        a.contenteditable = "true";
                        break;
                    case "1":
                        delete a.contenteditable
                    }
                }

                function m(a) { return a.replace(z, function(a, b, c) { return"<" + b + c.replace(C, function(a, b) { return!/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1 ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a }) + ">" }) }

                function n(a) {
                    return a.replace(D,
                        function(a) { return"<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>" })
                }

                function o(a) { return a.replace(F, function(a, b) { return decodeURIComponent(b) }) }

                function p(a) { return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) { return"<\!--" + y + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>" }) }

                function t(a) { return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) { return decodeURIComponent(b) }) }

                function r(a, b) {
                    var c = b._.dataStore;
                    return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g,
                        function(a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function(a, b) { return c && c[b] || "" })
                }

                function s(a, b) {
                    for (var c = [], d = b.config.protectedSource, f = b._.dataStore || (b._.dataStore = { id: 1 }), e = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) { return"<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>" }), i = 0; i < d.length; i++)
                        a = a.replace(d[i], function(a) {
                            a = a.replace(e, function(a,
                                b, d) { return c[d] });
                            return/cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
                        });
                    a = a.replace(e, function(a, b, d) { return"<\!--" + y + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>" });
                    return a.replace(/(['"]).*?\1/g, function(a) {
                        return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
                            f[f.id] = decodeURIComponent(b);
                            return"{cke_protected_" + f.id++ + "}"
                        })
                    })
                }

                CKEDITOR.htmlDataProcessor = function(a) {
                    var c, d;
                    this.editor = a;
                    this.dataFilter = c = new CKEDITOR.htmlParser.filter;
                    this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
                    this.writer = new CKEDITOR.htmlParser.basicWriter;
                    c.addRules(u);
                    c.addRules(b(a, "data"));
                    d.addRules(B);
                    d.addRules(b(a, "html"))
                };
                CKEDITOR.htmlDataProcessor.prototype = {
                    toHtml: function(a, b, c) {
                        var a = s(a, this.editor), a = m(a), a = n(a), a = a.replace(E, "$1cke:$2"), a = a.replace(I, "<cke:$1$2></cke:$1>"), a = CKEDITOR.env.opera ? a : a.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = this.editor.editable(), f;
                        !b && b !== null && (b = d.getName());
                        d = b || d.getName();
                        if (CKEDITOR.env.ie && CKEDITOR.env.version <
                            9 && d == "pre") {
                            d = "div";
                            a = "<pre>" + a + "</pre>";
                            f = 1
                        }
                        d = this.editor.document.createElement(d);
                        d.setHtml("a" + a);
                        a = d.getHtml().substr(1);
                        a = a.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                        f && (a = a.replace(/^<pre>|<\/pre>$/gi, ""));
                        a = a.replace(K, "$1$2");
                        a = o(a);
                        a = t(a);
                        a = CKEDITOR.htmlParser.fragment.fromHtml(a, b, c === false ? false : h(this.editor.config));
                        b = new CKEDITOR.htmlParser.basicWriter;
                        a.writeChildrenHtml(b, this.dataFilter, 1);
                        a = b.getHtml(true);
                        return a = p(a)
                    },
                    toDataFormat: function(a) {
                        var b = this.editor.editable(),
                            c = this.writer,
                            a = CKEDITOR.htmlParser.fragment.fromHtml(a, b.getName(), h(this.editor.config));
                        c.reset();
                        a.writeChildrenHtml(c, this.htmlFilter, 1);
                        c = c.getHtml(true);
                        c = t(c);
                        return c = r(c, this.editor)
                    }
                };
                var x = /(?:&nbsp;|\xa0)$/,
                    y = "{cke_protected}",
                    w = CKEDITOR.dtd,
                    v = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"],
                    q = CKEDITOR.tools.extend({}, w.$blockLimit, w.$block),
                    u = { elements: {}, attributeNames: [[/^on/, "data-cke-pa-on"]] },
                    B = {
                        elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]],
                        attributeNames: [
                            [
                                /^data-cke-(saved|pa)-/,
                                ""
                            ], [/^data-cke-.*/, ""], ["hidefocus", ""]
                        ],
                        elements: {
                            $: function(a) {
                                var b = a.attributes;
                                if (b) {
                                    if (b["data-cke-temp"])return false;
                                    for (var c = ["name", "href", "src"], d, f = 0; f < c.length; f++) {
                                        d = "data-cke-saved-" + c[f];
                                        d in b && delete b[c[f]]
                                    }
                                }
                                return a
                            },
                            table: function(a) {
                                a.children.slice(0).sort(function(a, b) {
                                    var c, d;
                                    if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) {
                                        c = CKEDITOR.tools.indexOf(v, a.name);
                                        d = CKEDITOR.tools.indexOf(v, b.name)
                                    }
                                    if (!(c > -1 && d > -1 && c != d)) {
                                        c = j(a);
                                        d = j(b)
                                    }
                                    return c > d ? 1 : -1
                                })
                            },
                            embed: function(a) {
                                var b =
                                    a.parent;
                                if (b && b.name == "object") {
                                    var c = b.attributes.width, b = b.attributes.height;
                                    c && (a.attributes.width = c);
                                    b && (a.attributes.height = b)
                                }
                            },
                            param: function(a) {
                                a.children = [];
                                a.isEmpty = true;
                                return a
                            },
                            a: function(a) { if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"])return false },
                            span: function(a) { a.attributes["class"] == "Apple-style-span" && delete a.name },
                            html: function(a) {
                                delete a.attributes.contenteditable;
                                delete a.attributes["class"]
                            },
                            body: function(a) {
                                delete a.attributes.spellcheck;
                                delete a.attributes.contenteditable
                            },
                            style: function(a) {
                                var b = a.children[0];
                                b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
                                if (!a.attributes.type)a.attributes.type = "text/css"
                            },
                            title: function(a) {
                                var b = a.children[0];
                                !b && f(a, b = new CKEDITOR.htmlParser.text);
                                b.value = a.attributes["data-cke-title"] || ""
                            }
                        },
                        attributes: { "class": function(a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false } }
                    };
                if (CKEDITOR.env.ie)B.attributes.style = function(a) { return a.replace(/(^|;)([^\:]+)/g, function(a) { return a.toLowerCase() }) };
                for (var A in{ input: 1, textarea: 1 }) {
                    u.elements[A] = k;
                    B.elements[A] = l
                }
                var z = /<(a|area|img|input|source)\b([^>]*)>/gi, C = /\b(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, D = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, F = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, E = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, K = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, I = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
            }(), CKEDITOR.htmlParser.element =
                function(b, h) {
                    this.name = b;
                    this.attributes = h || {};
                    this.children = [];
                    var a = b || "", g = a.match(/^cke:(.*)/);
                    g && (a = g[1]);
                    a = !(!CKEDITOR.dtd.$nonBodyContent[a] && !CKEDITOR.dtd.$block[a] && !CKEDITOR.dtd.$listItem[a] && !CKEDITOR.dtd.$tableContent[a] && !(CKEDITOR.dtd.$nonEditable[a] || a == "br"));
                    this.isEmpty = !!CKEDITOR.dtd.$empty[b];
                    this.isUnknown = !CKEDITOR.dtd[b];
                    this._ = { isBlockLike: a, hasInlineStarted: this.isEmpty || !a }
                }, CKEDITOR.htmlParser.cssStyle = function(b) {
                var h = {};
                ((b instanceof CKEDITOR.htmlParser.element ? b.attributes.style :
                    b) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, b, e) {
                    b == "font-family" && (e = e.replace(/["']/g, ""));
                    h[b.toLowerCase()] = e
                });
                return{
                    rules: h,
                    populate: function(a) {
                        var b = this.toString();
                        if (b)a instanceof CKEDITOR.dom.element ? a.setAttribute("style", b) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = b : a.style = b
                    },
                    toString: function() {
                        var a = [], b;
                        for (b in h)h[b] && a.push(b, ":", h[b], ";");
                        return a.join("")
                    }
                }
            }, function() {
                var b = function(b, a) {
                    b = b[0];
                    a = a[0];
                    return b <
                        a ? -1 : b > a ? 1 : 0
                };
                CKEDITOR.htmlParser.element.prototype = {
                    type: CKEDITOR.NODE_ELEMENT,
                    add: CKEDITOR.htmlParser.fragment.prototype.add,
                    clone: function() { return new CKEDITOR.htmlParser.element(this.name, this.attributes) },
                    writeHtml: function(h, a) {
                        var g = this.attributes, e = this, i = e.name, d, f, c, j;
                        e.filterChildren = function() {
                            if (!j) {
                                var b = new CKEDITOR.htmlParser.basicWriter;
                                CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.call(e, b, a);
                                e.children = (new CKEDITOR.htmlParser.fragment.fromHtml(b.getHtml(), e.clone(),
                                    0)).children;
                                j = 1
                            }
                        };
                        if (a) {
                            if (!this.parent)a.onRoot(this);
                            for (;;) {
                                if (!(i = a.onElementName(i)))return;
                                e.name = i;
                                if (!(e = a.onElement(e)))return;
                                e.parent = this.parent;
                                if (e.name == i)break;
                                if (e.type != CKEDITOR.NODE_ELEMENT) {
                                    e.writeHtml(h, a);
                                    return
                                }
                                i = e.name;
                                if (!i) {
                                    for (var i = 0, k = this.children.length; i < k; i++)this.children[i].parent = e.parent;
                                    this.writeChildrenHtml.call(e, h, j ? null : a);
                                    return
                                }
                            }
                            g = e.attributes
                        }
                        h.openTag(i, g);
                        for (var k = [], l = 0; l < 2; l++)
                            for (d in g) {
                                f = d;
                                c = g[d];
                                if (l == 1)k.push([d, c]);
                                else if (a) {
                                    for (;;)
                                        if (f = a.onAttributeName(d))
                                            if (f !=
                                                d) {
                                                delete g[d];
                                                d = f
                                            } else break;
                                        else {
                                            delete g[d];
                                            break
                                        }
                                    f && ((c = a.onAttribute(e, f, c)) === false ? delete g[f] : g[f] = c)
                                }
                            }
                        h.sortAttributes && k.sort(b);
                        g = k.length;
                        for (l = 0; l < g; l++) {
                            d = k[l];
                            h.attribute(d[0], d[1])
                        }
                        h.openTagClose(i, e.isEmpty);
                        if (!e.isEmpty) {
                            this.writeChildrenHtml.call(e, h, j ? null : a);
                            h.closeTag(i)
                        }
                    },
                    writeChildrenHtml: function(b, a) { CKEDITOR.htmlParser.fragment.prototype.writeChildrenHtml.apply(this, arguments) }
                }
            }(), function() {
                var b = {};
                CKEDITOR.template = function(h) {
                    if (b[h])this.output = b[h];
                    else {
                        var a = h.replace(/'/g,
                            "\\'").replace(/{([^}]+)}/g, function(a, b) { return"',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'" });
                        this.output = b[h] = Function("data", "buffer", "return buffer?buffer.push('" + a + "'):['" + a + "'].join('');")
                    }
                }
            }(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function(b) {
                CKEDITOR.instances[b.name] = b;
                b.on("focus", function() {
                    if (CKEDITOR.currentInstance != b) {
                        CKEDITOR.currentInstance = b;
                        CKEDITOR.fire("currentInstance")
                    }
                });
                b.on("blur", function() {
                    if (CKEDITOR.currentInstance ==
                        b) {
                        CKEDITOR.currentInstance = null;
                        CKEDITOR.fire("currentInstance")
                    }
                });
                CKEDITOR.fire("instance", null, b)
            }, CKEDITOR.remove = function(b) { delete CKEDITOR.instances[b.name] }, function() {
                var b = {};
                CKEDITOR.addTemplate = function(h, a) {
                    var g = b[h];
                    if (g)return g;
                    g = { name: h, source: a };
                    CKEDITOR.fire("template", g);
                    return b[h] = new CKEDITOR.template(g.source)
                };
                CKEDITOR.getTemplate = function(h) { return b[h] }
            }(), function() {
                var b = [];
                CKEDITOR.addCss = function(h) { b.push(h) };
                CKEDITOR.getCss = function() { return b.join("\n") }
            }(), CKEDITOR.on("instanceDestroyed",
                function() { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset") }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function() {
                CKEDITOR.inline = function(b, h) {
                    if (!CKEDITOR.env.isCompatible)return null;
                    b = CKEDITOR.dom.element.get(b);
                    if (b.getEditor())throw'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
                    var a = new CKEDITOR.editor(h, b, CKEDITOR.ELEMENT_MODE_INLINE);
                    a.setData(b.getHtml(), null, true);
                    a.resetDirty();
                    a.on("loaded",
                        function() {
                            a.fire("uiReady");
                            a.editable(b);
                            a.container = b;
                            a.setData(a.getData(1));
                            a.resetDirty();
                            a.fire("contentDom");
                            a.mode = "wysiwyg";
                            a.fire("mode");
                            a.fireOnce("instanceReady");
                            CKEDITOR.fire("instanceReady", null, a)
                        }, null, null, 1E4);
                    a.on("destroy", function() {
                        a.element.clearCustomData();
                        delete a.element
                    });
                    return a
                };
                CKEDITOR.inlineAll = function() {
                    var b, h, a;
                    for (a in CKEDITOR.dtd.$editable)
                        for (var g = CKEDITOR.document.getElementsByTag(a), e = 0, i = g.count(); e < i; e++) {
                            b = g.getItem(e);
                            if (b.getAttribute("contenteditable") ==
                                "true") {
                                h = { element: b, config: {} };
                                CKEDITOR.fire("inline", h) !== false && CKEDITOR.inline(b, h.config)
                            }
                        }
                };
                CKEDITOR.domReady(function() { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
            }(), CKEDITOR.replaceClass = "ckeditor", function() {
                function b(b, d, f, c) {
                    if (!CKEDITOR.env.isCompatible)return null;
                    b = CKEDITOR.dom.element.get(b);
                    if (b.getEditor())throw'The editor instance "' + b.getEditor().name + '" is already attached to the provided element.';
                    var e = new CKEDITOR.editor(d, b, c);
                    c == CKEDITOR.ELEMENT_MODE_REPLACE && b.setStyle("visibility",
                        "hidden");
                    f && e.setData(f, null, true);
                    e.resetDirty();
                    e.on("loaded", function() {
                        a(e);
                        c == CKEDITOR.ELEMENT_MODE_REPLACE && e.config.autoUpdateElement && g(e);
                        e.setMode(e.config.startupMode, function() {
                            e.resetDirty();
                            e.fireOnce("instanceReady");
                            CKEDITOR.fire("instanceReady", null, e)
                        })
                    });
                    e.on("destroy", h);
                    return e
                }

                function h() {
                    var a = this.container, b = this.element;
                    if (a) {
                        a.clearCustomData();
                        a.remove()
                    }
                    if (b) {
                        b.clearCustomData();
                        this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.show();
                        delete this.element
                    }
                }

                function a(a) {
                    var b =
                            a.name,
                        f = a.element,
                        c = a.elementMode,
                        g = a.fire("uiSpace", { space: "top", html: "" }).html,
                        h = a.fireOnce("uiSpace", { space: "bottom", html: "" }).html;
                    e || (e = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'));
                    b = CKEDITOR.dom.element.createFromHtml(e.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.lang.editor, topHtml: g ? '<span id="' + a.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + g + "</span>" : "", contentId: a.ui.spaceId("contents"), bottomHtml: h ? '<span id="' + a.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + h + "</span>" : "", outerEl: CKEDITOR.env.ie ? "span" : "div" }));
                    if (c == CKEDITOR.ELEMENT_MODE_REPLACE) {
                        f.hide();
                        b.insertAfter(f)
                    } else f.append(b);
                    a.container = b;
                    g && a.ui.space("top").unselectable();
                    h && a.ui.space("bottom").unselectable();
                    f = a.config.width;
                    c = a.config.height;
                    f && b.setStyle("width", CKEDITOR.tools.cssLength(f));
                    c && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(c));
                    b.disableContextMenu();
                    CKEDITOR.env.webkit && b.on("focus", function() { a.focus() });
                    a.fireOnce("uiReady")
                }

                function g(a) {
                    var b = a.element;
                    if (a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && b.is("textarea")) {
                        var f = b.$.form && new CKEDITOR.dom.element(b.$.form);
                        if (f) {
                            var c = function() { a.updateElement() };
                            f.on("submit", c);
                            if (!f.$.submit.nodeName && !f.$.submit.length)
                                f.$.submit = CKEDITOR.tools.override(f.$.submit, function(b) {
                                    return function() {
                                        a.updateElement();
                                        b.apply ? b.apply(this, arguments) : b()
                                    }
                                });
                            a.on("destroy", function() { f.removeListener("submit", c) })
                        }
                    }
                }

                CKEDITOR.replace = function(a, d) { return b(a, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) };
                CKEDITOR.appendTo = function(a, d, f) { return b(a, d, f, CKEDITOR.ELEMENT_MODE_APPENDTO) };
                CKEDITOR.replaceAll = function() {
                    for (var a = document.getElementsByTagName("textarea"),
                        b = 0; b < a.length; b++) {
                        var f = null, c = a[b];
                        if (c.name || c.id) {
                            if (typeof arguments[0] == "string") {
                                if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(c.className))continue
                            } else if (typeof arguments[0] == "function") {
                                f = {};
                                if (arguments[0](c, f) === false)continue
                            }
                            this.replace(c, f)
                        }
                    }
                };
                CKEDITOR.editor.prototype.addMode = function(a, b) { (this._.modes || (this._.modes = {}))[a] = b };
                CKEDITOR.editor.prototype.setMode = function(a, b) {
                    var f = this, c = this._.modes;
                    if (!(a == f.mode || !c || !c[a])) {
                        f.fire("beforeSetMode", a);
                        if (f.mode) {
                            var e =
                                f.checkDirty();
                            f._.previousMode = f.mode;
                            f.fire("beforeModeUnload");
                            f.editable(0);
                            f.ui.space("contents").setHtml("");
                            f.mode = ""
                        }
                        this._.modes[a](function() {
                            f.mode = a;
                            e !== void 0 && !e && f.resetDirty();
                            setTimeout(function() {
                                f.fire("mode");
                                b && b.call(f)
                            }, 0)
                        })
                    }
                };
                CKEDITOR.editor.prototype.resize = function(a, b, f, c) {
                    var e = this.container, g = this.ui.space("contents"), h = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, c = c ? e.getChild(1) : e;
                    c.setSize("width", a, true);
                    h && (h.style.width = "1%");
                    g.setStyle("height",
                        Math.max(b - (f ? 0 : (c.$.offsetHeight || 0) - (g.$.clientHeight || 0)), 0) + "px");
                    h && (h.style.width = "100%");
                    this.fire("resize")
                };
                CKEDITOR.editor.prototype.getResizable = function(a) { return a ? this.ui.space("contents") : this.container };
                var e;
                CKEDITOR.domReady(function() { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
            }(), CKEDITOR.config.startupMode = "wysiwyg", function() {
                function b(b) {
                    var c = b.editor, d = c.editable(), f = b.data.path, e = f.blockLimit, g = b.data.selection.getRanges()[0], i = c.config.enterMode;
                    if (CKEDITOR.env.gecko) {
                        var j = f.block || f.blockLimit || f.root, h = j && j.getLast(a);
                        j && (j.isBlockBoundary() && (!h || !(h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary())) && !j.is("pre") && !j.getBogus()) && j.appendBogus()
                    }
                    if (c.config.autoParagraph !== false && i != CKEDITOR.ENTER_BR && g.collapsed && d.equals(e) && !f.block) {
                        d = g.clone();
                        d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                        f = new CKEDITOR.dom.walker(d);
                        f.guard = function(b) { return!a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly() };
                        if (!f.checkForward() || d.checkStartOfBlock() &&
                            d.checkEndOfBlock()) {
                            c = g.fixBlock(true, c.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                            if (CKEDITOR.env.ie)(c = c.getFirst(a)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove();
                            g.select();
                            b.cancel()
                        }
                    }
                }

                function h(a) {
                    var b = a.data.getTarget();
                    if (b.is("input")) {
                        b = b.getAttribute("type");
                        (b == "submit" || b == "reset") && a.data.preventDefault()
                    }
                }

                function a(a) { return c(a) && j(a) }

                function g(a, b) {
                    return function(c) {
                        var d = CKEDITOR.dom.element.get(c.data.$.toElement ||
                            c.data.$.fromElement || c.data.$.relatedTarget);
                        (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c)
                    }
                }

                function e(b) {
                    var c, d = b.getRanges()[0], b = b.root, f = d.startPath(), e = { table: 1, ul: 1, ol: 1, dl: 1 }, g = CKEDITOR.dom.walker.bogus();
                    if (f.contains(e)) {
                        var i = d.clone();
                        i.collapse(1);
                        i.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
                        i = new CKEDITOR.dom.walker(i);
                        f = function(b, d) {
                            return function(b, f) {
                                f && (b.type == CKEDITOR.NODE_ELEMENT && b.is(e)) && (c = b);
                                if (a(b) && !f && (!d || !g(b)))return false
                            }
                        };
                        i.guard = f(i);
                        i.checkBackward();
                        if (c) {
                            i = d.clone();
                            i.collapse();
                            i.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
                            i = new CKEDITOR.dom.walker(i);
                            i.guard = f(i, 1);
                            c = 0;
                            i.checkForward();
                            return c
                        }
                    }
                    return null
                }

                function i(a) {
                    a.editor.focus();
                    a.editor.fire("saveSnapshot")
                }

                function d(a, b) {
                    var c = a.editor;
                    !b && c.getSelection().scrollIntoView();
                    setTimeout(function() { c.fire("saveSnapshot") }, 0)
                }

                CKEDITOR.editable = CKEDITOR.tools.createClass({
                    base: CKEDITOR.dom.element,
                    $: function(a, b) {
                        this.base(b.$ || b);
                        this.editor = a;
                        this.hasFocus = false;
                        this.setup()
                    },
                    proto: {
                        focus: function() {
                            this.$[CKEDITOR.env.ie &&
                                this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                            CKEDITOR.env.safari && !this.isInline() && (CKEDITOR.document.getActive().equals(this.getWindow().getFrame()) || this.getWindow().focus())
                        },
                        on: function(a, b) {
                            var c = Array.prototype.slice.call(arguments, 0);
                            if (CKEDITOR.env.ie && /^focus|blur$/.exec(a)) {
                                a = a == "focus" ? "focusin" : "focusout";
                                b = g(b, this);
                                c[0] = a;
                                c[1] = b
                            }
                            return CKEDITOR.dom.element.prototype.on.apply(this, c)
                        },
                        attachListener: function(a, b, c, d, f, e) {
                            !this._.listeners && (this._.listeners = []);
                            var g = Array.prototype.slice.call(arguments, 1);
                            this._.listeners.push(a.on.apply(a, g))
                        },
                        clearListeners: function() {
                            var a = this._.listeners;
                            try {
                                for (; a.length;)a.pop().removeListener()
                            } catch (b) {
                            }
                        },
                        restoreAttrs: function() {
                            var a = this._.attrChanges, b, c;
                            for (c in a)
                                if (a.hasOwnProperty(c)) {
                                    b = a[c];
                                    b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)
                                }
                        },
                        attachClass: function(a) {
                            var b = this.getCustomData("classes");
                            if (!this.hasClass(a)) {
                                !b && (b = []);
                                b.push(a);
                                this.setCustomData("classes", b);
                                this.addClass(a)
                            }
                        },
                        changeAttr: function(a,
                            b) {
                            var c = this.getAttribute(a);
                            if (b !== c) {
                                !this._.attrChanges && (this._.attrChanges = {});
                                a in this._.attrChanges || (this._.attrChanges[a] = c);
                                this.setAttribute(a, b)
                            }
                        },
                        insertHtml: function(a, b) {
                            i(this);
                            k(this, b == "text" ? "text" : "html", a)
                        },
                        insertText: function(a) {
                            i(this);
                            var b = this.editor,
                                c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.config.enterMode,
                                b = c == CKEDITOR.ENTER_BR,
                                d = CKEDITOR.tools,
                                a = d.htmlEncode(a.replace(/\r\n/g, "\n")),
                                a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                                c = c ==
                                    CKEDITOR.ENTER_P ? "p" : "div";
                            if (!b) {
                                var f = /\n{2}/g;
                                if (f.test(a))var e = "<" + c + ">", g = "</" + c + ">", a = e + a.replace(f, function() { return g + e }) + g
                            }
                            a = a.replace(/\n/g, "<br>");
                            b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function(a) { return d.repeat(a, 2) }));
                            a = a.replace(/^ | $/g, "&nbsp;");
                            a = a.replace(/(>|\s) /g, function(a, b) { return b + "&nbsp;" }).replace(/ (?=<)/g, "&nbsp;");
                            k(this, "text", a)
                        },
                        insertElement: function(b) {
                            i(this);
                            for (var c = this.editor,
                                f = c.config.enterMode,
                                e = c.getSelection(),
                                g = e.getRanges(),
                                j = b.getName(),
                                h = CKEDITOR.dtd.$block[j],
                                k,
                                x,
                                y,
                                w = g.length - 1; w >= 0; w--) {
                                k = g[w];
                                if (!k.checkReadOnly()) {
                                    k.deleteContents(1);
                                    x = !w && b || b.clone(1);
                                    var v, q;
                                    if (h)
                                        for (; (v = k.getCommonAncestor(0, 1)) && (q = CKEDITOR.dtd[v.getName()]) && (!q || !q[j]);)
                                            if (v.getName() in CKEDITOR.dtd.span)k.splitElement(v);
                                            else if (k.checkStartOfBlock() && k.checkEndOfBlock()) {
                                                k.setStartBefore(v);
                                                k.collapse(true);
                                                v.remove()
                                            } else k.splitBlock(f == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                                    k.insertNode(x);
                                    y || (y = x)
                                }
                            }
                            if (y) {
                                k.moveToPosition(y, CKEDITOR.POSITION_AFTER_END);
                                if (h)
                                    if ((b = y.getNext(a)) &&
                                        b.type == CKEDITOR.NODE_ELEMENT && b.is(CKEDITOR.dtd.$block))b.getDtd()["#"] ? k.moveToElementEditStart(b) : k.moveToElementEditEnd(y);
                                    else if (!b && f != CKEDITOR.ENTER_BR) {
                                        b = k.fixBlock(true, f == CKEDITOR.ENTER_DIV ? "div" : "p");
                                        k.moveToElementEditStart(b)
                                    }
                            }
                            e.selectRanges([k]);
                            d(this, CKEDITOR.env.opera)
                        },
                        setData: function(a, b) {
                            !b && this.editor.dataProcessor && (a = this.editor.dataProcessor.toHtml(a));
                            this.setHtml(a);
                            this.editor.fire("dataReady")
                        },
                        getData: function(a) {
                            var b = this.getHtml();
                            !a && this.editor.dataProcessor &&
                            (b = this.editor.dataProcessor.toDataFormat(b));
                            return b
                        },
                        setReadOnly: function(a) { this.setAttribute("contenteditable", !a) },
                        detach: function() {
                            this.removeClass("cke_editable");
                            var a = this.editor;
                            this._.detach();
                            delete a.document;
                            delete a.window
                        },
                        isInline: function() { return this.getDocument().equals(CKEDITOR.document) },
                        setup: function() {
                            var a = this.editor;
                            this.attachListener(a, "beforeGetData", function() {
                                var b = this.getData();
                                this.is("textarea") || a.config.ignoreEmptyParagraph !== false && (b = b.replace(f, function(a,
                                    b) { return b }));
                                a.setData(b, null, 1)
                            }, this);
                            this.attachListener(a, "getSnapshot", function(a) { a.data = this.getData(1) }, this);
                            this.attachListener(a, "afterSetData", function() { this.setData(a.getData(1)) }, this);
                            this.attachListener(a, "loadSnapshot", function(a) { this.setData(a.data, 1) }, this);
                            this.attachListener(a, "beforeFocus", function() {
                                var b = a.getSelection();
                                (b = b && b.getNative()) && b.type == "Control" || this.focus()
                            }, this);
                            this.attachListener(a, "insertHtml", function(a) { this.insertHtml(a.data.dataValue, a.data.mode) },
                                this);
                            this.attachListener(a, "insertElement", function(a) { this.insertElement(a.data) }, this);
                            this.attachListener(a, "insertText", function(a) { this.insertText(a.data) }, this);
                            this.setReadOnly(a.readOnly);
                            this.attachClass("cke_editable");
                            this.attachClass(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                            this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                            a.keystrokeHandler.blockedKeystrokes[8] =
                                a.readOnly;
                            a.keystrokeHandler.attach(this);
                            this.on("blur", function(a) { CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false }, null, null, -1);
                            this.on("focus", function() { this.hasFocus = true }, null, null, -1);
                            a.focusManager.add(this);
                            if (this.equals(CKEDITOR.document.getActive())) {
                                this.hasFocus = true;
                                a.once("contentDom", function() { a.focusManager.focus() })
                            }
                            this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                            if (!this.is("textarea")) {
                                a.document =
                                    this.getDocument();
                                a.window = this.getWindow();
                                var b = a.document;
                                this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                                var d = a.config.contentsLangDirection;
                                this.getDirection(1) != d && this.changeAttr("dir", d);
                                var g = CKEDITOR.getCss();
                                if (g) {
                                    d = b.getHead();
                                    if (!d.getCustomData("stylesheet")) {
                                        g = b.appendStyleText(g);
                                        g = new CKEDITOR.dom.element(g.ownerNode || g.owningElement);
                                        d.setCustomData("stylesheet", g);
                                        g.data("cke-temp", 1)
                                    }
                                }
                                d = b.getCustomData("stylesheet_ref") || 0;
                                b.setCustomData("stylesheet_ref", d +
                                    1);
                                this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                                this.attachListener(this, "click", function(a) {
                                    var a = a.data, b = a.getTarget();
                                    b.is("a") && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                                });
                                this.attachListener(a, "key", function(b) {
                                    if (a.readOnly)return true;
                                    var d = b.data.keyCode, f;
                                    if (d in { 8: 1, 46: 1 }) {
                                        var g = a.getSelection(), b = g.getRanges()[0], i = b.startPath(), j, h, o, d = d == 8;
                                        if (g = e(g)) {
                                            a.fire("saveSnapshot");
                                            b.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START);
                                            g.remove();
                                            b.select();
                                            a.fire("saveSnapshot");
                                            f = 1
                                        } else if (b.collapsed)
                                            if ((j = i.block) && b[d ? "checkStartOfBlock" : "checkEndOfBlock"]() && (o = j[d ? "getPrevious" : "getNext"](c)) && o.is("table")) {
                                                a.fire("saveSnapshot");
                                                b[d ? "checkEndOfBlock" : "checkStartOfBlock"]() && j.remove();
                                                b["moveToElementEdit" + (d ? "End" : "Start")](o);
                                                b.select();
                                                a.fire("saveSnapshot");
                                                f = 1
                                            } else if (i.blockLimit && i.blockLimit.is("td") && (h = i.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(h, d ? CKEDITOR.START : CKEDITOR.END) && (o = h[d ? "getPrevious" : "getNext"](c))) {
                                                a.fire("saveSnapshot");
                                                b["moveToElementEdit" + (d ? "End" : "Start")](o);
                                                b.checkStartOfBlock() && b.checkEndOfBlock() ? o.remove() : b.select();
                                                a.fire("saveSnapshot");
                                                f = 1
                                            } else if ((h = i.contains(["td", "th", "caption"])) && b.checkBoundaryOfElement(h, d ? CKEDITOR.START : CKEDITOR.END))
                                                if ((o = h[d ? "getPreviousSourceNode" : "getNextSourceNode"](1, CKEDITOR.NODE_ELEMENT)) && !o.isReadOnly() && b.root.contains(o)) {
                                                    b[d ? "moveToElementEditEnd" : "moveToElementEditStart"](o);
                                                    b.select();
                                                    f = 1
                                                }
                                    }
                                    return!f
                                });
                                CKEDITOR.env.ie && this.attachListener(this, "click", h);
                                !CKEDITOR.env.ie &&
                                    !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(b) {
                                        var c = b.data.getTarget();
                                        if (c.is("img", "hr", "input", "textarea", "select")) {
                                            a.getSelection().selectElement(c);
                                            c.is("input", "textarea", "select") && b.data.preventDefault()
                                        }
                                    });
                                CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
                                    if (b.data.$.button == 2) {
                                        b = b.data.getTarget();
                                        if (!b.getOuterHtml().replace(f, "")) {
                                            var c = a.createRange();
                                            c.moveToElementEditStart(b);
                                            c.select(true)
                                        }
                                    }
                                });
                                if (CKEDITOR.env.webkit) {
                                    this.attachListener(this,
                                        "click", function(a) { a.data.getTarget().is("input", "select") && a.data.preventDefault() });
                                    this.attachListener(this, "mouseup", function(a) { a.data.getTarget().is("input", "textarea") && a.data.preventDefault() })
                                }
                            }
                        }
                    },
                    _: {
                        detach: function() {
                            this.editor.setData(this.editor.getData(), 0, 1);
                            this.clearListeners();
                            this.restoreAttrs();
                            var a;
                            if (a = this.removeCustomData("classes"))for (; a.length;)this.removeClass(a.pop());
                            a = this.getDocument();
                            var b = a.getHead();
                            if (b.getCustomData("stylesheet")) {
                                var c = a.getCustomData("stylesheet_ref");
                                if (--c)a.setCustomData("stylesheet_ref", c);
                                else {
                                    a.removeCustomData("stylesheet_ref");
                                    b.removeCustomData("stylesheet").remove()
                                }
                            }
                            delete this.editor
                        }
                    }
                });
                CKEDITOR.editor.prototype.editable = function(a) {
                    var b = this._.editable;
                    if (b && a)return 0;
                    if (arguments.length)b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
                    return b
                };
                var f = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi,
                    c = CKEDITOR.dom.walker.whitespaces(true),
                    j = CKEDITOR.dom.walker.bookmark(false, true);
                CKEDITOR.on("instanceLoaded", function(a) {
                    var c = a.editor;
                    c.on("insertElement", function(a) {
                        a = a.data;
                        if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                            a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                            a.setAttribute("contentEditable", false)
                        }
                    });
                    c.on("selectionChange", function(a) {
                        if (!c.readOnly) {
                            var d = c.getSelection();
                            if (d && !d.isLocked) {
                                d = c.checkDirty();
                                c.fire("lockSnapshot");
                                b(a);
                                c.fire("unlockSnapshot");
                                !d && c.resetDirty()
                            }
                        }
                    })
                });
                CKEDITOR.on("instanceCreated", function(a) {
                    var b = a.editor;
                    b.on("mode", function() {
                        var a = b.editable();
                        if (a && a.isInline()) {
                            var c = this.lang.editor + ", " + this.name;
                            a.changeAttr("role", "textbox");
                            a.changeAttr("aria-label", c);
                            a.changeAttr("title", c);
                            if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                                var d = CKEDITOR.tools.getNextId(),
                                    f = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' +
                                        this.lang.common.editorHelp + "</span>");
                                c.append(f);
                                a.changeAttr("aria-describedby", d)
                            }
                        }
                    })
                });
                CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
                var k = function() {
                    function b(a) { return a.type == CKEDITOR.NODE_ELEMENT }

                    function c(a, d) {
                        var f, e, g, i, h = [], o = d.range.startContainer;
                        f = d.range.startPath();
                        for (var o = j[o.getName()], k = 0, n = a.getChildren(), t = n.count(), p = -1, s = -1, y = 0, x = f.contains(j.$list); k < t; ++k) {
                            f = n.getItem(k);
                            if (b(f)) {
                                g = f.getName();
                                if (x && g in CKEDITOR.dtd.$list)h = h.concat(c(f, d));
                                else {
                                    i = !!o[g];
                                    if (g == "br" && f.data("cke-eol") && (!k || k == t - 1)) {
                                        y = (e = k ? h[k - 1].node : n.getItem(k + 1)) && (!b(e) || !e.is("br"));
                                        e = e && b(e) && j.$block[e.getName()]
                                    }
                                    p == -1 && !i && (p = k);
                                    i || (s = k);
                                    h.push({ isElement: 1, isLineBreak: y, isBlock: f.isBlockBoundary(), hasBlockSibling: e, node: f, name: g, allowed: i });
                                    e = y = 0
                                }
                            } else h.push({ isElement: 0, node: f, allowed: 1 })
                        }
                        if (p > -1)h[p].firstNotAllowed = 1;
                        if (s > -1)h[s].lastNotAllowed = 1;
                        return h
                    }

                    function f(a, c) {
                        var d = [],
                            e = a.getChildren(),
                            g = e.count(),
                            i,
                            h = 0,
                            o = j[c],
                            k = !a.is(j.$inline) || a.is("br");
                        for (k && d.push(" "); h < g; h++) {
                            i = e.getItem(h);
                            b(i) && !i.is(o) ? d = d.concat(f(i, c)) : d.push(i)
                        }
                        k && d.push(" ");
                        return d
                    }

                    function e(a) { return a && b(a) && (a.is(j.$removeEmpty) || a.is("a") && !a.isBlockBoundary()) }

                    function g(a, c, d, f) {
                        var e = a.clone(), i, j;
                        e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                        if ((i = (new CKEDITOR.dom.walker(e)).next()) && b(i) && h[i.getName()] && (j = i.getPrevious()) && b(j) && !j.getParent().equals(a.startContainer) && d.contains(j) && f.contains(i) && i.isIdentical(j)) {
                            i.moveChildren(j);
                            i.remove();
                            g(a, c, d, f)
                        }
                    }

                    function i(a, c) {
                        function d(a, c) {
                            if (c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br")) {
                                a.remove();
                                return 1
                            }
                        }

                        var f = c.endContainer.getChild(c.endOffset), e = c.endContainer.getChild(c.endOffset - 1);
                        f && d(f, a[a.length - 1]);
                        if (e && d(e, a[0])) {
                            c.setEnd(c.endContainer, c.endOffset - 1);
                            c.collapse()
                        }
                    }

                    var j = CKEDITOR.dtd, h = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }, k = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, y = CKEDITOR.tools.extend({}, j.$inline);
                    delete y.br;
                    return function(h, s, q) {
                        var u = h.editor;
                        h.getDocument();
                        var B = u.getSelection().getRanges()[0];
                        if (!B.checkReadOnly()) {
                            var A = (new CKEDITOR.dom.elementPath(B.startContainer, B.root)).blockLimit || B.root, s = { type: s, editable: h, editor: u, range: B, blockLimit: A, mergeCandidates: [], zombies: [] }, u = s.range, A = s.mergeCandidates, z, C, D, F, E;
                            if (s.type == "text" && u.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                                C = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", u.document);
                                u.insertNode(C);
                                u.setStartAfter(C)
                            }
                            D = new CKEDITOR.dom.elementPath(u.startContainer);
                            s.endPath = F = new CKEDITOR.dom.elementPath(u.endContainer);
                            if (!u.collapsed) {
                                z = F.block || F.blockLimit;
                                var K = u.getCommonAncestor();
                                z && (!z.equals(K) && !z.contains(K) && u.checkEndOfBlock()) && s.zombies.push(z);
                                u.deleteContents()
                            }
                            for (; (E = b(u.startContainer) && u.startContainer.getChild(u.startOffset - 1)) && b(E) && E.isBlockBoundary() && D.contains(E);)u.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                            g(u, s.blockLimit, D, F);
                            if (C) {
                                u.setEndBefore(C);
                                u.collapse();
                                C.remove()
                            }
                            C = u.startPath();
                            if (z = C.contains(e, false, 1)) {
                                u.splitElement(z);
                                s.inlineStylesRoot = z;
                                s.inlineStylesPeak = C.lastElement
                            }
                            C = u.createBookmark();
                            (z = C.startNode.getPrevious(a)) && b(z) && e(z) && A.push(z);
                            (z = C.startNode.getNext(a)) && b(z) && e(z) && A.push(z);
                            for (z = C.startNode; (z = z.getParent()) && e(z);)A.push(z);
                            u.moveToBookmark(C);
                            if (q) {
                                E = q;
                                q = s.range;
                                if (s.type == "text" && s.inlineStylesRoot) {
                                    C = E;
                                    E = s.inlineStylesPeak;
                                    u = E.getDocument().createText("{cke-peak}");
                                    for (A = s.inlineStylesRoot.getParent(); !E.equals(A);) {
                                        u = u.appendTo(E.clone());
                                        E = E.getParent()
                                    }
                                    E = u.getOuterHtml().replace("{cke-peak}",
                                        C)
                                }
                                C = s.blockLimit.getName();
                                if (/^\s+|\s+$/.test(E) && "span" in CKEDITOR.dtd[C]) {
                                    var I = '<span data-cke-marker="1">&nbsp;</span>';
                                    E = I + E + I
                                }
                                E = s.editor.dataProcessor.toHtml(E, null, false);
                                C = q.document.createElement("body");
                                C.setHtml(E);
                                if (I) {
                                    C.getFirst().remove();
                                    C.getLast().remove()
                                }
                                if ((I = q.startPath().block) && !(I.getChildCount() == 1 && I.getBogus()))
                                    a: {
                                        var G;
                                        if (C.getChildCount() == 1 && b(G = C.getFirst()) && G.is(k)) {
                                            I = G.getElementsByTag("*");
                                            q = 0;
                                            for (u = I.count(); q < u; q++) {
                                                E = I.getItem(q);
                                                if (!E.is(y))break a
                                            }
                                            G.moveChildren(G.getParent(1));
                                            G.remove()
                                        }
                                    }
                                s.dataWrapper = C;
                                G = s.range;
                                var I = G.document, H, q = s.blockLimit;
                                C = 0;
                                var L;
                                E = [];
                                var J, P, A = u = 0, M, Q;
                                D = G.startContainer;
                                z = s.endPath.elements[0];
                                var R;
                                F = z.getPosition(D);
                                K = !!z.getCommonAncestor(D) && F != CKEDITOR.POSITION_IDENTICAL && !(F & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                                D = c(s.dataWrapper, s);
                                for (i(D, G); C < D.length; C++) {
                                    F = D[C];
                                    if (H = F.isLineBreak) {
                                        H = G;
                                        M = q;
                                        var O = void 0, U = void 0;
                                        if (F.hasBlockSibling)H = 1;
                                        else {
                                            O = H.startContainer.getAscendant(j.$block, 1);
                                            if (!O || !O.is({ div: 1, p: 1 }))
                                                H =
                                                    0;
                                            else {
                                                U = O.getPosition(M);
                                                if (U == CKEDITOR.POSITION_IDENTICAL || U == CKEDITOR.POSITION_CONTAINS)H = 0;
                                                else {
                                                    M = H.splitElement(O);
                                                    H.moveToPosition(M, CKEDITOR.POSITION_AFTER_START);
                                                    H = 1
                                                }
                                            }
                                        }
                                    }
                                    if (H)A = C > 0;
                                    else {
                                        H = G.startPath();
                                        if (!F.isBlock && (P = s.editor.config.enterMode != CKEDITOR.ENTER_BR && s.editor.config.autoParagraph !== false ? s.editor.config.enterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false) && !H.block && H.blockLimit && H.blockLimit.equals(G.root)) {
                                            P = I.createElement(P);
                                            !CKEDITOR.env.ie && P.appendBogus();
                                            G.insertNode(P);
                                            !CKEDITOR.env.ie &&
                                            (L = P.getBogus()) && L.remove();
                                            G.moveToPosition(P, CKEDITOR.POSITION_BEFORE_END)
                                        }
                                        if ((H = G.startPath().block) && !H.equals(J)) {
                                            if (L = H.getBogus()) {
                                                L.remove();
                                                E.push(H)
                                            }
                                            J = H
                                        }
                                        F.firstNotAllowed && (u = 1);
                                        if (u && F.isElement) {
                                            H = G.startContainer;
                                            for (M = null; H && !j[H.getName()][F.name];) {
                                                if (H.equals(q)) {
                                                    H = null;
                                                    break
                                                }
                                                M = H;
                                                H = H.getParent()
                                            }
                                            if (H) {
                                                if (M) {
                                                    Q = G.splitElement(M);
                                                    s.zombies.push(Q);
                                                    s.zombies.push(M)
                                                }
                                            } else {
                                                M = q.getName();
                                                R = !C;
                                                H = C == D.length - 1;
                                                M = f(F.node, M);
                                                for (var O = [], U = M.length, T = 0, V = void 0, W = 0, S = -1; T < U; T++) {
                                                    V = M[T];
                                                    if (V == " ") {
                                                        if (!W && (!R || T)) {
                                                            O.push(new CKEDITOR.dom.text(" "));
                                                            S = O.length
                                                        }
                                                        W = 1
                                                    } else {
                                                        O.push(V);
                                                        W = 0
                                                    }
                                                }
                                                H && S == O.length && O.pop();
                                                R = O
                                            }
                                        }
                                        if (R) {
                                            for (; H = R.pop();)G.insertNode(H);
                                            R = 0
                                        } else G.insertNode(F.node);
                                        if (F.lastNotAllowed && C < D.length - 1) {
                                            (Q = K ? z : Q) && G.setEndAt(Q, CKEDITOR.POSITION_AFTER_START);
                                            u = 0
                                        }
                                        G.collapse()
                                    }
                                }
                                s.dontMoveCaret = A;
                                s.bogusNeededBlocks = E
                            }
                            L = s.range;
                            var N;
                            Q = s.bogusNeededBlocks;
                            for (R = L.createBookmark(); J = s.zombies.pop();)
                                if (J.getParent()) {
                                    P = L.clone();
                                    P.moveToElementEditStart(J);
                                    P.removeEmptyBlocksAtEnd()
                                }
                            if (Q)
                                for (; J =
                                    Q.pop();)J.append(CKEDITOR.env.ie ? L.document.createText(" ") : L.document.createElement("br"));
                            for (; J = s.mergeCandidates.pop();)J.mergeSiblings();
                            L.moveToBookmark(R);
                            if (!s.dontMoveCaret) {
                                for (J = b(L.startContainer) && L.startContainer.getChild(L.startOffset - 1); J && b(J) && !J.is(j.$empty);) {
                                    if (J.isBlockBoundary())L.moveToPosition(J, CKEDITOR.POSITION_BEFORE_END);
                                    else {
                                        if (e(J) && J.getHtml().match(/(\s|&nbsp;)$/g)) {
                                            N = null;
                                            break
                                        }
                                        N = L.clone();
                                        N.moveToPosition(J, CKEDITOR.POSITION_BEFORE_END)
                                    }
                                    J = J.getLast(a)
                                }
                                N && L.moveToRange(N)
                            }
                            B.select();
                            d(h)
                        }
                    }
                }()
            }(), function() {
                function b() {
                    var a = this.getSelection(1);
                    if (a.getType() != CKEDITOR.SELECTION_NONE) {
                        this.fire("selectionCheck", a);
                        var b = this.elementPath();
                        if (!b.compare(this._.selectionPreviousPath)) {
                            this._.selectionPreviousPath = b;
                            this.fire("selectionChange", { selection: a, path: b })
                        }
                    }
                }

                function h() {
                    f = true;
                    if (!d) {
                        a.call(this);
                        d = CKEDITOR.tools.setTimeout(a, 200, this)
                    }
                }

                function a() {
                    d = null;
                    if (f) {
                        CKEDITOR.tools.setTimeout(b, 0, this);
                        f = false
                    }
                }

                function g(a) {
                    function b(c, d) {
                        return!c || c.type == CKEDITOR.NODE_TEXT ?
                            false : a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
                    }

                    if (!(a.root instanceof CKEDITOR.editable))return false;
                    var d = a.startContainer, f = a.getPreviousNode(c, null, d), e = a.getNextNode(c, null, d);
                    return b(f) || b(e, 1) || !f && !e && !(d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() && d.getBogus()) ? true : false
                }

                function e(a) { return a.getCustomData("cke-fillingChar") }

                function i(a, b) {
                    var c = a && a.removeCustomData("cke-fillingChar");
                    if (c) {
                        if (b !== false) {
                            var d,
                                f = a.getDocument().getSelection().getNative(),
                                e = f && f.type !=
                                    "None" && f.getRangeAt(0);
                            if (c.getLength() > 1 && e && e.intersectsNode(c.$)) {
                                d = [f.anchorOffset, f.focusOffset];
                                e = f.focusNode == c.$ && f.focusOffset > 0;
                                f.anchorNode == c.$ && f.anchorOffset > 0 && d[0]--;
                                e && d[1]--;
                                var g;
                                e = f;
                                if (!e.isCollapsed) {
                                    g = e.getRangeAt(0);
                                    g.setStart(e.anchorNode, e.anchorOffset);
                                    g.setEnd(e.focusNode, e.focusOffset);
                                    g = g.collapsed
                                }
                                g && d.unshift(d.pop())
                            }
                        }
                        c.setText(c.getText().replace(/\u200B/g, ""));
                        if (d) {
                            c = f.getRangeAt(0);
                            c.setStart(c.startContainer, d[0]);
                            c.setEnd(c.startContainer, d[1]);
                            f.removeAllRanges();
                            f.addRange(c)
                        }
                    }
                }

                var d, f, c = CKEDITOR.dom.walker.invisible(1);
                CKEDITOR.on("instanceCreated", function(a) {
                    function c() {
                        var a = d.getSelection();
                        a && a.removeAllRanges()
                    }

                    var d = a.editor;
                    d.define("selectionChange", { errorProof: 1 });
                    d.on("contentDom", function() {
                        var a = d.document, c = CKEDITOR.document, f = d.editable(), e = a.getBody(), g = a.getDocumentElement(), k = f.isInline(), l;
                        CKEDITOR.env.gecko && f.attachListener(f, "focus", function(a) {
                            a.removeListener();
                            if (l !== 0) {
                                a = d.getSelection().getNative();
                                if (a.isCollapsed && a.anchorNode ==
                                    f.$) {
                                    a = d.createRange();
                                    a.moveToElementEditStart(f);
                                    a.select()
                                }
                            }
                        }, null, null, -2);
                        f.attachListener(f, "focus", function() {
                            d.unlockSelection(l);
                            l = 0
                        }, null, null, -1);
                        f.attachListener(f, "mousedown", function() { l = 0 });
                        if (CKEDITOR.env.ie || CKEDITOR.env.opera || k) {
                            var m,
                                v = function() {
                                    m = d.getSelection(1);
                                    m.lock()
                                };
                            j ? f.attachListener(f, "beforedeactivate", v, null, null, -1) : f.attachListener(d, "selectionCheck", v, null, null, -1);
                            f.attachListener(f, "blur", function() {
                                d.lockSelection(m);
                                l = 1
                            }, null, null, -1)
                        }
                        if (CKEDITOR.env.ie && !k) {
                            var q;
                            f.attachListener(f, "mousedown", function(a) { a.data.$.button == 2 && d.document.$.selection.type == "None" && (q = d.window.getScrollPosition()) });
                            f.attachListener(f, "mouseup", function(a) {
                                if (a.data.$.button == 2 && q) {
                                    d.document.$.documentElement.scrollLeft = q.x;
                                    d.document.$.documentElement.scrollTop = q.y
                                }
                                q = null
                            });
                            if (a.$.compatMode != "BackCompat") {
                                if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)
                                    g.on("mousedown", function(a) {
                                        function b(a) {
                                            a = a.data.$;
                                            if (f) {
                                                var c = e.$.createTextRange();
                                                try {
                                                    c.moveToPoint(a.x, a.y)
                                                } catch (d) {
                                                }
                                                f.setEndPoint(j.compareEndPoints("StartToStart",
                                                    c) < 0 ? "EndToEnd" : "StartToStart", c);
                                                f.select()
                                            }
                                        }

                                        function d() {
                                            g.removeListener("mousemove", b);
                                            c.removeListener("mouseup", d);
                                            g.removeListener("mouseup", d);
                                            f.select()
                                        }

                                        a = a.data;
                                        if (a.getTarget().is("html") && a.$.y < g.$.clientHeight && a.$.x < g.$.clientWidth) {
                                            var f = e.$.createTextRange();
                                            try {
                                                f.moveToPoint(a.$.x, a.$.y)
                                            } catch (i) {
                                            }
                                            var j = f.duplicate();
                                            g.on("mousemove", b);
                                            c.on("mouseup", d);
                                            g.on("mouseup", d)
                                        }
                                    });
                                if (CKEDITOR.env.version > 7) {
                                    g.on("mousedown", function(a) {
                                        if (a.data.getTarget().is("html")) {
                                            c.on("mouseup", u);
                                            g.on("mouseup", u)
                                        }
                                    });
                                    var u = function() {
                                        c.removeListener("mouseup", u);
                                        g.removeListener("mouseup", u);
                                        var b = CKEDITOR.document.$.selection, d = b.createRange();
                                        b.type != "None" && d.parentElement().ownerDocument == a.$ && d.select()
                                    }
                                }
                            }
                        }
                        f.attachListener(f, "selectionchange", b, d);
                        f.attachListener(f, "keyup", h, d);
                        f.attachListener(f, "focus", function() {
                            d.forceNextSelectionCheck();
                            d.selectionChange(1)
                        });
                        if (k ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                            var B;
                            f.attachListener(f, "mousedown", function() { B = 1 });
                            f.attachListener(a.getDocumentElement(), "mouseup", function() {
                                B && h.call(d);
                                B = 0
                            })
                        } else f.attachListener(CKEDITOR.env.ie ? f : a.getDocumentElement(), "mouseup", h, d);
                        if (CKEDITOR.env.webkit)
                            a.on("keydown", function(a) {
                                switch (a.data.getKey()) {
                                case 13:
                                case 33:
                                case 34:
                                case 35:
                                case 36:
                                case 37:
                                case 39:
                                case 8:
                                case 45:
                                case 46:
                                    i(d.editable())
                                }
                            }, null, null, -1)
                    });
                    d.on("contentDomUnload", d.forceNextSelectionCheck, d);
                    d.on("dataReady", function() { d.selectionChange(1) });
                    CKEDITOR.env.ie9Compat && d.on("beforeDestroy", c, null,
                        null, 9);
                    CKEDITOR.env.webkit && d.on("setData", c);
                    d.on("contentDomUnload", function() { d.unlockSelection() })
                });
                CKEDITOR.on("instanceReady", function(a) {
                    var b = a.editor, c = b.editable();
                    if (CKEDITOR.env.webkit) {
                        b.on("selectionChange", function() {
                            var a = e(c);
                            a && (a.getCustomData("ready") ? i(c) : a.setCustomData("ready", 1))
                        }, null, null, -1);
                        b.on("beforeSetMode", function() { i(c) }, null, null, -1);
                        var d,
                            f,
                            a = function() {
                                var a = b.document, g = e(c);
                                if (g) {
                                    a = a.$.defaultView.getSelection();
                                    a.type == "Caret" && a.anchorNode == g.$ && (f = 1);
                                    d =
                                        g.getText();
                                    g.setText(d.replace(/\u200B/g, ""))
                                }
                            },
                            g = function() {
                                var a = b.document, g = e(c);
                                if (g) {
                                    g.setText(d);
                                    if (f) {
                                        a.$.defaultView.getSelection().setPosition(g.$, g.getLength());
                                        f = 0
                                    }
                                }
                            };
                        b.on("beforeUndoImage", a);
                        b.on("afterUndoImage", g);
                        b.on("beforeGetData", a, null, null, 0);
                        b.on("getData", g)
                    }
                });
                CKEDITOR.editor.prototype.selectionChange = function(a) { (a ? b : h).call(this) };
                CKEDITOR.editor.prototype.getSelection = function(a) {
                    if (this._.savedSelection && !a)return this._.savedSelection;
                    return(a = this.editable()) ? new CKEDITOR.dom.selection(a) :
                        null
                };
                CKEDITOR.editor.prototype.lockSelection = function(a) {
                    a = a || this.getSelection(1);
                    if (a.getType() != CKEDITOR.SELECTION_NONE) {
                        !a.isLocked && a.lock();
                        this._.savedSelection = a;
                        return true
                    }
                    return false
                };
                CKEDITOR.editor.prototype.unlockSelection = function(a) {
                    var b = this._.savedSelection;
                    if (b) {
                        b.unlock(a);
                        delete this._.savedSelection;
                        return true
                    }
                    return false
                };
                CKEDITOR.editor.prototype.forceNextSelectionCheck = function() { delete this._.selectionPreviousPath };
                CKEDITOR.dom.document.prototype.getSelection = function() { return new CKEDITOR.dom.selection(this) };
                CKEDITOR.dom.range.prototype.select = function() {
                    var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
                    a.selectRanges([this]);
                    return a
                };
                CKEDITOR.SELECTION_NONE = 1;
                CKEDITOR.SELECTION_TEXT = 2;
                CKEDITOR.SELECTION_ELEMENT = 3;
                var j = typeof window.getSelection != "function";
                CKEDITOR.dom.selection = function(a) {
                    var b = a instanceof CKEDITOR.dom.element;
                    this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
                    this.root = b ? a : this.document.getBody();
                    this.isLocked = 0;
                    this._ = { cache: {} };
                    if (CKEDITOR.env.webkit) {
                        a = this.document.getWindow().$.getSelection();
                        if (a.type == "None" && this.document.getActive().equals(this.root) || a.type == "Caret" && a.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) {
                            var c = new CKEDITOR.dom.range(this.root);
                            c.moveToPosition(this.root, CKEDITOR.POSITION_AFTER_START);
                            b = this.document.$.createRange();
                            b.setStart(c.startContainer.$, c.startOffset);
                            b.collapse(1);
                            var d = this.root.on("focus", function(a) { a.cancel() }, null, null, -100);
                            a.addRange(b);
                            d.removeListener()
                        }
                    }
                    var a = this.getNative(), f;
                    if (a)
                        if (a.getRangeAt)f = (c = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(c.commonAncestorContainer);
                        else {
                            try {
                                c = a.createRange()
                            } catch (e) {
                            }
                            f = c && CKEDITOR.dom.element.get(c.item && c.item(0) || c.parentElement())
                        }
                    if (!f || !this.root.equals(f) && !this.root.contains(f)) {
                        this._.cache.type = CKEDITOR.SELECTION_NONE;
                        this._.cache.startElement = null;
                        this._.cache.selectedElement = null;
                        this._.cache.selectedText = "";
                        this._.cache.ranges = new CKEDITOR.dom.rangeList
                    }
                    return this
                };
                var k = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 };
                CKEDITOR.dom.selection.prototype = {
                    getNative: function() { return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = j ? this.document.$.selection : this.document.getWindow().$.getSelection() },
                    getType: j ? function() {
                        var a = this._.cache;
                        if (a.type)return a.type;
                        var b = CKEDITOR.SELECTION_NONE;
                        try {
                            var c = this.getNative(), d = c.type;
                            if (d == "Text")
                                b =
                                    CKEDITOR.SELECTION_TEXT;
                            if (d == "Control")b = CKEDITOR.SELECTION_ELEMENT;
                            if (c.createRange().parentElement())b = CKEDITOR.SELECTION_TEXT
                        } catch (f) {
                        }
                        return a.type = b
                    } : function() {
                        var a = this._.cache;
                        if (a.type)return a.type;
                        var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
                        if (!c || !c.rangeCount)b = CKEDITOR.SELECTION_NONE;
                        else if (c.rangeCount == 1) {
                            var c = c.getRangeAt(0), d = c.startContainer;
                            if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && k[d.childNodes[c.startOffset].nodeName.toLowerCase()])b = CKEDITOR.SELECTION_ELEMENT
                        }
                        return a.type =
                            b
                    },
                    getRanges: function() {
                        var a = j ? function() {
                            function a(b) { return(new CKEDITOR.dom.node(b)).getIndex() }

                            var b = function(b, c) {
                                b = b.duplicate();
                                b.collapse(c);
                                var d = b.parentElement(), f = d.ownerDocument;
                                if (!d.hasChildNodes())return{ container: d, offset: 0 };
                                for (var e = d.children, g, i, j = b.duplicate(), h = 0, k = e.length - 1, l = -1, n, A; h <= k;) {
                                    l = Math.floor((h + k) / 2);
                                    g = e[l];
                                    j.moveToElementText(g);
                                    n = j.compareEndPoints("StartToStart", b);
                                    if (n > 0)k = l - 1;
                                    else if (n < 0)h = l + 1;
                                    else {
                                        if (CKEDITOR.env.ie9Compat && g.tagName == "BR") {
                                            e = f.defaultView.getSelection();
                                            return{ container: e[c ? "anchorNode" : "focusNode"], offset: e[c ? "anchorOffset" : "focusOffset"] }
                                        }
                                        return{ container: d, offset: a(g) }
                                    }
                                }
                                if (l == -1 || l == e.length - 1 && n < 0) {
                                    j.moveToElementText(d);
                                    j.setEndPoint("StartToStart", b);
                                    f = j.text.replace(/(\r\n|\r)/g, "\n").length;
                                    e = d.childNodes;
                                    if (!f) {
                                        g = e[e.length - 1];
                                        return g.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: g, offset: g.nodeValue.length }
                                    }
                                    for (d = e.length; f > 0 && d > 0;) {
                                        i = e[--d];
                                        if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                            A = i;
                                            f = f - i.nodeValue.length
                                        }
                                    }
                                    return{
                                        container: A,
                                        offset: -f
                                    }
                                }
                                j.collapse(n > 0 ? true : false);
                                j.setEndPoint(n > 0 ? "StartToStart" : "EndToStart", b);
                                f = j.text.replace(/(\r\n|\r)/g, "\n").length;
                                if (!f)return{ container: d, offset: a(g) + (n > 0 ? 0 : 1) };
                                for (; f > 0;)
                                    try {
                                        i = g[n > 0 ? "previousSibling" : "nextSibling"];
                                        if (i.nodeType == CKEDITOR.NODE_TEXT) {
                                            f = f - i.nodeValue.length;
                                            A = i
                                        }
                                        g = i
                                    } catch (z) {
                                        return{ container: d, offset: a(g) }
                                    }
                                return{ container: A, offset: n > 0 ? -f : A.nodeValue.length + f }
                            };
                            return function() {
                                var a = this.getNative(), c = a && a.createRange(), d = this.getType();
                                if (!a)return[];
                                if (d == CKEDITOR.SELECTION_TEXT) {
                                    a =
                                        new CKEDITOR.dom.range(this.root);
                                    d = b(c, true);
                                    a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                                    d = b(c);
                                    a.setEnd(new CKEDITOR.dom.node(d.container), d.offset);
                                    a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                                    return[a]
                                }
                                if (d == CKEDITOR.SELECTION_ELEMENT) {
                                    for (var d = [], f = 0; f < c.length; f++) {
                                        for (var e = c.item(f), g = e.parentNode, i = 0, a = new CKEDITOR.dom.range(this.root); i < g.childNodes.length && g.childNodes[i] != e; i++);
                                        a.setStart(new CKEDITOR.dom.node(g),
                                            i);
                                        a.setEnd(new CKEDITOR.dom.node(g), i + 1);
                                        d.push(a)
                                    }
                                    return d
                                }
                                return[]
                            }
                        }() : function() {
                            var a = [], b, c = this.getNative();
                            if (!c)return a;
                            for (var d = 0; d < c.rangeCount; d++) {
                                var f = c.getRangeAt(d);
                                b = new CKEDITOR.dom.range(this.root);
                                b.setStart(new CKEDITOR.dom.node(f.startContainer), f.startOffset);
                                b.setEnd(new CKEDITOR.dom.node(f.endContainer), f.endOffset);
                                a.push(b)
                            }
                            return a
                        };
                        return function(b) {
                            var c = this._.cache;
                            if (c.ranges && !b)return c.ranges;
                            if (!c.ranges)c.ranges = new CKEDITOR.dom.rangeList(a.call(this));
                            if (b)
                                for (var d =
                                             c.ranges,
                                    f = 0; f < d.length; f++) {
                                    var e = d[f];
                                    e.getCommonAncestor().isReadOnly() && d.splice(f, 1);
                                    if (!e.collapsed) {
                                        if (e.startContainer.isReadOnly())
                                            for (var b = e.startContainer, g; b;) {
                                                if ((g = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly())break;
                                                g && b.getAttribute("contentEditable") == "false" && e.setStartAfter(b);
                                                b = b.getParent()
                                            }
                                        b = e.startContainer;
                                        g = e.endContainer;
                                        var i = e.startOffset, j = e.endOffset, h = e.clone();
                                        b && b.type == CKEDITOR.NODE_TEXT && (i >= b.getLength() ? h.setStartAfter(b) : h.setStartBefore(b));
                                        g &&
                                            g.type == CKEDITOR.NODE_TEXT && (j ? h.setEndAfter(g) : h.setEndBefore(g));
                                        b = new CKEDITOR.dom.walker(h);
                                        b.evaluator = function(a) {
                                            if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                                var b = e.clone();
                                                e.setEndBefore(a);
                                                e.collapsed && d.splice(f--, 1);
                                                if (!(a.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                                    b.setStartAfter(a);
                                                    b.collapsed || d.splice(f + 1, 0, b)
                                                }
                                                return true
                                            }
                                            return false
                                        };
                                        b.next()
                                    }
                                }
                            return c.ranges
                        }
                    }(),
                    getStartElement: function() {
                        var a = this._.cache;
                        if (a.startElement !== void 0)return a.startElement;
                        var b;
                        switch (this.getType()) {
                        case CKEDITOR.SELECTION_ELEMENT:
                            return this.getSelectedElement();
                        case CKEDITOR.SELECTION_TEXT:
                            var c = this.getRanges()[0];
                            if (c) {
                                if (c.collapsed) {
                                    b = c.startContainer;
                                    b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                                } else {
                                    for (c.optimize();;) {
                                        b = c.startContainer;
                                        if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary())c.setStartAfter(b);
                                        else break
                                    }
                                    b = c.startContainer;
                                    if (b.type != CKEDITOR.NODE_ELEMENT)return b.getParent();
                                    b = b.getChild(c.startOffset);
                                    if (!b ||
                                        b.type != CKEDITOR.NODE_ELEMENT)b = c.startContainer;
                                    else
                                        for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) {
                                            b = c;
                                            c = c.getFirst()
                                        }
                                }
                                b = b.$
                            }
                        }
                        return a.startElement = b ? new CKEDITOR.dom.element(b) : null
                    },
                    getSelectedElement: function() {
                        var a = this._.cache;
                        if (a.selectedElement !== void 0)return a.selectedElement;
                        var b = this,
                            c = CKEDITOR.tools.tryThese(function() { return b.getNative().createRange().item(0) }, function() {
                                for (var a = b.getRanges()[0], c, d, f = 2; f && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && k[c.getName()] &&
                                (d = c))); f--)a.shrink(CKEDITOR.SHRINK_ELEMENT);
                                return d.$
                            });
                        return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
                    },
                    getSelectedText: function() {
                        var a = this._.cache;
                        if (a.selectedText !== void 0)return a.selectedText;
                        var b = this.getNative(), b = j ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                        return a.selectedText = b
                    },
                    lock: function() {
                        this.getRanges();
                        this.getStartElement();
                        this.getSelectedElement();
                        this.getSelectedText();
                        this._.cache.nativeSel = null;
                        this.isLocked = 1
                    },
                    unlock: function(a) {
                        if (this.isLocked) {
                            if (a)
                                var b =
                                        this.getSelectedElement(),
                                    c = !b && this.getRanges();
                            this.isLocked = 0;
                            this.reset();
                            if (a)(a = b || c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (b ? this.selectElement(b) : this.selectRanges(c))
                        }
                    },
                    reset: function() { this._.cache = {} },
                    selectElement: function(a) {
                        var b = new CKEDITOR.dom.range(this.root);
                        b.setStartBefore(a);
                        b.setEndAfter(a);
                        this.selectRanges([b])
                    },
                    selectRanges: function(a) {
                        if (a.length)
                            if (this.isLocked) {
                                var b = CKEDITOR.document.getActive();
                                this.unlock();
                                this.selectRanges(a);
                                this.lock();
                                !b.equals(this.root) &&
                                    b.focus()
                            } else {
                                if (j) {
                                    var c = CKEDITOR.dom.walker.whitespaces(true), d = /\ufeff|\u00a0/, f = { table: 1, tbody: 1, tr: 1 };
                                    if (a.length > 1) {
                                        b = a[a.length - 1];
                                        a[0].setEnd(b.endContainer, b.endOffset)
                                    }
                                    var b = a[0], a = b.collapsed, e, h, s, x = b.getEnclosedNode();
                                    if (x && x.type == CKEDITOR.NODE_ELEMENT && x.getName() in k && (!x.is("a") || !x.getText()))
                                        try {
                                            s = x.$.createControlRange();
                                            s.addElement(x.$);
                                            s.select();
                                            return
                                        } catch (y) {
                                        }
                                    (b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.getName() in f || b.endContainer.type == CKEDITOR.NODE_ELEMENT &&
                                        b.endContainer.getName() in f) && b.shrink(CKEDITOR.NODE_ELEMENT, true);
                                    s = b.createBookmark();
                                    var f = s.startNode, w;
                                    if (!a)w = s.endNode;
                                    s = b.document.$.body.createTextRange();
                                    s.moveToElementText(f.$);
                                    s.moveStart("character", 1);
                                    if (w) {
                                        d = b.document.$.body.createTextRange();
                                        d.moveToElementText(w.$);
                                        s.setEndPoint("EndToEnd", d);
                                        s.moveEnd("character", -1)
                                    } else {
                                        e = f.getNext(c);
                                        h = f.hasAscendant("pre");
                                        e = !(e && e.getText && e.getText().match(d)) && (h || !f.hasPrevious() || f.getPrevious().is && f.getPrevious().is("br"));
                                        h = b.document.createElement("span");
                                        h.setHtml("&#65279;");
                                        h.insertBefore(f);
                                        e && b.document.createText("﻿").insertBefore(f)
                                    }
                                    b.setStartBefore(f);
                                    f.remove();
                                    if (a) {
                                        if (e) {
                                            s.moveStart("character", -1);
                                            s.select();
                                            b.document.$.selection.clear()
                                        } else s.select();
                                        b.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START);
                                        h.remove()
                                    } else {
                                        b.setEndBefore(w);
                                        w.remove();
                                        s.select()
                                    }
                                } else {
                                    w = this.getNative();
                                    if (!w)return;
                                    if (CKEDITOR.env.opera) {
                                        b = this.document.$.createRange();
                                        b.selectNodeContents(this.root.$);
                                        w.addRange(b)
                                    }
                                    this.removeAllRanges();
                                    for (d = 0; d < a.length; d++) {
                                        if (d <
                                            a.length - 1) {
                                            b = a[d];
                                            s = a[d + 1];
                                            h = b.clone();
                                            h.setStart(b.endContainer, b.endOffset);
                                            h.setEnd(s.startContainer, s.startOffset);
                                            if (!h.collapsed) {
                                                h.shrink(CKEDITOR.NODE_ELEMENT, true);
                                                e = h.getCommonAncestor();
                                                h = h.getEnclosedNode();
                                                if (e.isReadOnly() || h && h.isReadOnly()) {
                                                    s.setStart(b.startContainer, b.startOffset);
                                                    a.splice(d--, 1);
                                                    continue
                                                }
                                            }
                                        }
                                        b = a[d];
                                        s = this.document.$.createRange();
                                        e = b.startContainer;
                                        if (CKEDITOR.env.opera && b.collapsed && e.type == CKEDITOR.NODE_ELEMENT) {
                                            h = e.getChild(b.startOffset - 1);
                                            c = e.getChild(b.startOffset);
                                            if (!h && !c && e.is(CKEDITOR.dtd.$removeEmpty) || h && h.type == CKEDITOR.NODE_ELEMENT || c && c.type == CKEDITOR.NODE_ELEMENT) {
                                                b.insertNode(this.document.createText(""));
                                                b.collapse(1)
                                            }
                                        }
                                        if (b.collapsed && CKEDITOR.env.webkit && g(b)) {
                                            e = this.root;
                                            i(e, false);
                                            h = e.getDocument().createText("​");
                                            e.setCustomData("cke-fillingChar", h);
                                            b.insertNode(h);
                                            if ((e = h.getNext()) && !h.getPrevious() && e.type == CKEDITOR.NODE_ELEMENT && e.getName() == "br") {
                                                i(this.root);
                                                b.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START)
                                            } else b.moveToPosition(h, CKEDITOR.POSITION_AFTER_END)
                                        }
                                        s.setStart(b.startContainer.$,
                                            b.startOffset);
                                        try {
                                            s.setEnd(b.endContainer.$, b.endOffset)
                                        } catch (v) {
                                            if (v.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                                b.collapse(1);
                                                s.setEnd(b.endContainer.$, b.endOffset)
                                            } else throw v;
                                        }
                                        w.addRange(s)
                                    }
                                }
                                this.reset();
                                this.root.fire("selectionchange")
                            }
                    },
                    createBookmarks: function(a) { return this.getRanges().createBookmarks(a) },
                    createBookmarks2: function(a) { return this.getRanges().createBookmarks2(a) },
                    selectBookmarks: function(a) {
                        for (var b = [], c = 0; c < a.length; c++) {
                            var d = new CKEDITOR.dom.range(this.root);
                            d.moveToBookmark(a[c]);
                            b.push(d)
                        }
                        this.selectRanges(b);
                        return this
                    },
                    getCommonAncestor: function() {
                        var a = this.getRanges();
                        return a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer)
                    },
                    scrollIntoView: function() { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() },
                    removeAllRanges: function() {
                        var a = this.getNative();
                        try {
                            a && a[j ? "empty" : "removeAllRanges"]()
                        } catch (b) {
                        }
                        this.reset()
                    }
                }
            }(), CKEDITOR.editor.prototype.attachStyleStateChange = function(b, h) {
                var a = this._.styleStateChangeCallbacks;
                if (!a) {
                    a = this._.styleStateChangeCallbacks =
                    [];
                    this.on("selectionChange", function(b) {
                        for (var e = 0; e < a.length; e++) {
                            var i = a[e], d = i.style.checkActive(b.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                            i.fn.call(this, d)
                        }
                    })
                }
                a.push({ style: b, fn: h })
            }, CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function() {
                function b(a, b) {
                    for (var c, d; a = a.getParent();) {
                        if (a.equals(b))break;
                        if (a.getAttribute("data-nostyle"))c = a;
                        else if (!d) {
                            var f = a.getAttribute("contentEditable");
                            f == "false" ? c = a : f == "true" && (d = 1)
                        }
                    }
                    return c
                }

                function h(a) {
                    var c =
                        a.document;
                    if (a.collapsed) {
                        c = p(this, c);
                        a.insertNode(c);
                        a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END)
                    } else {
                        var d = this.element, f = this._.definition, e, g = f.ignoreReadonly, i = g || f.includeReadonly;
                        i == void 0 && (i = a.root.getCustomData("cke_includeReadonly"));
                        var j = CKEDITOR.dtd[d] || (e = true, CKEDITOR.dtd.span);
                        a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                        a.trim();
                        var h = a.createBookmark(), k = h.startNode, o = h.endNode, l = k, n;
                        if (!g) {
                            var t = a.getCommonAncestor(), g = b(k, t), t = b(o, t);
                            g && (l = g.getNextSourceNode(true));
                            t && (o = t)
                        }
                        for (l.getPosition(o) ==
                            CKEDITOR.POSITION_FOLLOWING && (l = 0); l;) {
                            g = false;
                            if (l.equals(o)) {
                                l = null;
                                g = true
                            } else {
                                var r = l.type, s = r == CKEDITOR.NODE_ELEMENT ? l.getName() : null, t = s && l.getAttribute("contentEditable") == "false", v = s && l.getAttribute("data-nostyle");
                                if (s && l.data("cke-bookmark")) {
                                    l = l.getNextSourceNode(true);
                                    continue
                                }
                                if (!s || j[s] && !v && (!t || i) && (l.getPosition(o) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED &&
                                (!f.childRule || f.childRule(l))) {
                                    var w = l.getParent();
                                    if (w && ((w.getDtd() || CKEDITOR.dtd.span)[d] || e) && (!f.parentRule || f.parentRule(w))) {
                                        if (!n && (!s || !CKEDITOR.dtd.$removeEmpty[s] || (l.getPosition(o) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED)) {
                                            n = a.clone();
                                            n.setStartBefore(l)
                                        }
                                        if (r == CKEDITOR.NODE_TEXT || t || r == CKEDITOR.NODE_ELEMENT && !l.getChildCount()) {
                                            for (var r = l, x; (g = !r.getNext(B)) &&
                                            (x = r.getParent(), j[x.getName()]) && (x.getPosition(k) | CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_FOLLOWING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!f.childRule || f.childRule(x));)r = x;
                                            n.setEndAfter(r)
                                        }
                                    } else g = true
                                } else g = true;
                                l = l.getNextSourceNode(v || t && !i)
                            }
                            if (g && n && !n.collapsed) {
                                for (var g = p(this, c), t = g.hasAttributes(), v = n.getCommonAncestor(), r = {}, s = {}, w = {}, y = {}, q, N, u; g && v;) {
                                    if (v.getName() == d) {
                                        for (q in f.attributes)
                                            if (!y[q] &&
                                            (u = v.getAttribute(N)))g.getAttribute(q) == u ? s[q] = 1 : y[q] = 1;
                                        for (N in f.styles)if (!w[N] && (u = v.getStyle(N)))g.getStyle(N) == u ? r[N] = 1 : w[N] = 1
                                    }
                                    v = v.getParent()
                                }
                                for (q in s)g.removeAttribute(q);
                                for (N in r)g.removeStyle(N);
                                t && !g.hasAttributes() && (g = null);
                                if (g) {
                                    n.extractContents().appendTo(g);
                                    m.call(this, g);
                                    n.insertNode(g);
                                    g.mergeSiblings();
                                    CKEDITOR.env.ie || g.$.normalize()
                                } else {
                                    g = new CKEDITOR.dom.element("span");
                                    n.extractContents().appendTo(g);
                                    n.insertNode(g);
                                    m.call(this, g);
                                    g.remove(true)
                                }
                                n = null
                            }
                        }
                        a.moveToBookmark(h);
                        a.shrink(CKEDITOR.SHRINK_TEXT)
                    }
                }

                function a(a) {
                    a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                    var b = a.createBookmark(), c = b.startNode;
                    if (a.collapsed) {
                        for (var d = new CKEDITOR.dom.elementPath(c.getParent(), a.root), f, e = 0, g; e < d.elements.length && (g = d.elements[e]); e++) {
                            if (g == d.block || g == d.blockLimit)break;
                            if (this.checkElementRemovable(g)) {
                                var i;
                                if (a.collapsed && (a.checkBoundaryOfElement(g, CKEDITOR.END) || (i = a.checkBoundaryOfElement(g, CKEDITOR.START)))) {
                                    f = g;
                                    f.match = i ? "start" : "end"
                                } else {
                                    g.mergeSiblings();
                                    g.getName() == this.element ?
                                        l.call(this, g) : n(g, s(this)[g.getName()])
                                }
                            }
                        }
                        if (f) {
                            g = c;
                            for (e = 0;; e++) {
                                i = d.elements[e];
                                if (i.equals(f))break;
                                else if (i.match)continue;
                                else i = i.clone();
                                i.append(g);
                                g = i
                            }
                            g[f.match == "start" ? "insertBefore" : "insertAfter"](f)
                        }
                    } else {
                        var j = b.endNode,
                            h = this,
                            d = function() {
                                for (var a = new CKEDITOR.dom.elementPath(c.getParent()), b = new CKEDITOR.dom.elementPath(j.getParent()), d = null, f = null, e = 0; e < a.elements.length; e++) {
                                    var g = a.elements[e];
                                    if (g == a.block || g == a.blockLimit)break;
                                    h.checkElementRemovable(g) && (d = g)
                                }
                                for (e = 0; e < b.elements.length; e++) {
                                    g =
                                        b.elements[e];
                                    if (g == b.block || g == b.blockLimit)break;
                                    h.checkElementRemovable(g) && (f = g)
                                }
                                f && j.breakParent(f);
                                d && c.breakParent(d)
                            };
                        d();
                        for (f = c; !f.equals(j);) {
                            e = f.getNextSourceNode();
                            if (f.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(f)) {
                                f.getName() == this.element ? l.call(this, f) : n(f, s(this)[f.getName()]);
                                if (e.type == CKEDITOR.NODE_ELEMENT && e.contains(c)) {
                                    d();
                                    e = c.getNext()
                                }
                            }
                            f = e
                        }
                    }
                    a.moveToBookmark(b)
                }

                function g(a) {
                    var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
                    (a = (new CKEDITOR.dom.elementPath(b,
                        a.root)).contains(this.element, 1)) && !a.isReadOnly() && t(a, this)
                }

                function e(a) {
                    var b = a.getCommonAncestor(true, true);
                    if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                        var b = this._.definition, c = b.attributes;
                        if (c)for (var d in c)a.removeAttribute(d, c[d]);
                        if (b.styles)for (var f in b.styles)b.styles.hasOwnProperty(f) && a.removeStyle(f)
                    }
                }

                function i(a) {
                    var b = a.createBookmark(true), c = a.createIterator();
                    c.enforceRealBlocks = true;
                    if (this._.enterMode)c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                    for (var d, e = a.document; d = c.getNextParagraph();)
                        if (!d.isReadOnly()) {
                            var g = p(this, e, d);
                            f(d, g)
                        }
                    a.moveToBookmark(b)
                }

                function d(a) {
                    var b = a.createBookmark(1), c = a.createIterator();
                    c.enforceRealBlocks = true;
                    c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
                    for (var d; d = c.getNextParagraph();)
                        if (this.checkElementRemovable(d))
                            if (d.is("pre")) {
                                var e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                                e && d.copyAttributes(e);
                                f(d, e)
                            } else l.call(this, d);
                    a.moveToBookmark(b)
                }

                function f(a, b) {
                    var d = !b;
                    if (d) {
                        b = a.getDocument().createElement("div");
                        a.copyAttributes(b)
                    }
                    var f = b && b.is("pre"), e = a.is("pre"), g = !f && e;
                    if (f && !e) {
                        e = b;
                        (g = a.getBogus()) && g.remove();
                        g = a.getHtml();
                        g = j(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                        g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                        g = g.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                        g = g.replace(/<br\b[^>]*>/gi, "\n");
                        if (CKEDITOR.env.ie) {
                            var i = a.getDocument().createElement("div");
                            i.append(e);
                            e.$.outerHTML = "<pre>" + g + "</pre>";
                            e.copyAttributes(i.getFirst());
                            e = i.getFirst().remove()
                        } else e.setHtml(g);
                        b = e
                    } else g ? b = k(d ? [a.getHtml()] : c(a), b) : a.moveChildren(b);
                    b.replace(a);
                    if (f) {
                        var d = b, h;
                        if ((h = d.getPrevious(A)) && h.is && h.is("pre")) {
                            f = j(h.getHtml(), /\n$/, "") + "\n\n" + j(d.getHtml(), /^\n/, "");
                            CKEDITOR.env.ie ? d.$.outerHTML = "<pre>" + f + "</pre>" : d.setHtml(f);
                            h.remove()
                        }
                    } else d && o(b)
                }

                function c(a) {
                    a.getName();
                    var b = [];
                    j(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) { return b + "</pre>" + c + "<pre>" }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,
                        function(a, c) { b.push(c) });
                    return b
                }

                function j(a, b, c) {
                    var d = "", f = "",
                        a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
                            b && (d = b);
                            c && (f = c);
                            return""
                        });
                    return d + a.replace(b, c) + f
                }

                function k(a, b) {
                    var c;
                    a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
                    for (var d = 0; d < a.length; d++) {
                        var f = a[d],
                            f = f.replace(/(\r\n|\r)/g, "\n"),
                            f = j(f, /^[ \t]*\n/, ""),
                            f = j(f, /\n$/, ""),
                            f = j(f, /^[ \t]+|[ \t]+$/g, function(a, b) {
                                return a.length == 1 ? "&nbsp;" : b ?
                                    " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                            }),
                            f = f.replace(/\n/g, "<br>"),
                            f = f.replace(/[ \t]{2,}/g, function(a) { return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " " });
                        if (c) {
                            var e = b.clone();
                            e.setHtml(f);
                            c.append(e)
                        } else b.setHtml(f)
                    }
                    return c || b
                }

                function l(a) {
                    var b = this._.definition, c = b.attributes, b = b.styles, d = s(this)[a.getName()], f = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(b), e;
                    for (e in c)
                        if (!((e == "class" || this._.definition.fullMatch) && a.getAttribute(e) !=
                            x(e, c[e]))) {
                            f = a.hasAttribute(e);
                            a.removeAttribute(e)
                        }
                    for (var g in b)
                        if (!(this._.definition.fullMatch && a.getStyle(g) != x(g, b[g], true))) {
                            f = f || !!a.getStyle(g);
                            a.removeStyle(g)
                        }
                    n(a, d, w[a.getName()]);
                    f && (this._.definition.alwaysRemoveElement ? o(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? o(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
                }

                function m(a) {
                    for (var b = s(this), c = a.getElementsByTag(this.element), d = c.count(); --d >= 0;)l.call(this, c.getItem(d));
                    for (var f in b)
                        if (f != this.element) {
                            c = a.getElementsByTag(f);
                            for (d = c.count() - 1; d >= 0; d--) {
                                var e = c.getItem(d);
                                n(e, b[f])
                            }
                        }
                }

                function n(a, b, c) {
                    if (b = b && b.attributes)
                        for (var d = 0; d < b.length; d++) {
                            var f = b[d][0], e;
                            if (e = a.getAttribute(f)) {
                                var g = b[d][1];
                                (g === null || g.test && g.test(e) || typeof g == "string" && e == g) && a.removeAttribute(f)
                            }
                        }
                    c || o(a)
                }

                function o(a, b) {
                    if (!a.hasAttributes() || b)
                        if (CKEDITOR.dtd.$block[a.getName()]) {
                            var c = a.getPrevious(A), d = a.getNext(A);
                            c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({ br: 1 })) &&
                                a.append("br", 1);
                            d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({ br: 1 })) && a.append("br");
                            a.remove(true)
                        } else {
                            c = a.getFirst();
                            d = a.getLast();
                            a.remove(true);
                            if (c) {
                                c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                                d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings()
                            }
                        }
                }

                function p(a, b, c) {
                    var d;
                    d = a.element;
                    d == "*" && (d = "span");
                    d = new CKEDITOR.dom.element(d, b);
                    c && c.copyAttributes(d);
                    d = t(d, a);
                    b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style",
                        1);
                    return d
                }

                function t(a, b) {
                    var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
                    if (d)for (var f in d)a.setAttribute(f, d[f]);
                    c && a.setAttribute("style", c);
                    return a
                }

                function r(a, b) { for (var c in a)a[c] = a[c].replace(u, function(a, c) { return b[c] }) }

                function s(a) {
                    if (a._.overrides)return a._.overrides;
                    var b = a._.overrides = {}, c = a._.definition.overrides;
                    if (c) {
                        CKEDITOR.tools.isArray(c) || (c = [c]);
                        for (var d = 0; d < c.length; d++) {
                            var f = c[d], e, g;
                            if (typeof f == "string")e = f.toLowerCase();
                            else {
                                e = f.element ? f.element.toLowerCase() :
                                    a.element;
                                g = f.attributes
                            }
                            f = b[e] || (b[e] = {});
                            if (g) {
                                var f = f.attributes = f.attributes || [], i;
                                for (i in g)f.push([i.toLowerCase(), g[i]])
                            }
                        }
                    }
                    return b
                }

                function x(a, b, c) {
                    var d = new CKEDITOR.dom.element("span");
                    d[c ? "setStyle" : "setAttribute"](a, b);
                    return d[c ? "getStyle" : "getAttribute"](a)
                }

                function y(a, b) {
                    for (var c = a.document, d = a.getRanges(), f = b ? this.removeFromRange : this.applyToRange, e, g = d.createIterator(); e = g.getNextRange();)f.call(this, e);
                    a.selectRanges(d);
                    c.removeCustomData("doc_processing_style")
                }

                var w = {
                        address: 1,
                        div: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        p: 1,
                        pre: 1,
                        section: 1,
                        header: 1,
                        footer: 1,
                        nav: 1,
                        article: 1,
                        aside: 1,
                        figure: 1,
                        dialog: 1,
                        hgroup: 1,
                        time: 1,
                        meter: 1,
                        menu: 1,
                        command: 1,
                        keygen: 1,
                        output: 1,
                        progress: 1,
                        details: 1,
                        datagrid: 1,
                        datalist: 1
                    },
                    v = { a: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 },
                    q = /\s*(?:;\s*|$)/,
                    u = /#\((.+?)\)/g,
                    B = CKEDITOR.dom.walker.bookmark(0, 1),
                    A = CKEDITOR.dom.walker.whitespaces(1);
                CKEDITOR.style = function(a, b) {
                    var c = a.attributes;
                    if (c && c.style) {
                        a.styles =
                            CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                        delete c.style
                    }
                    if (b) {
                        a = CKEDITOR.tools.clone(a);
                        r(a.attributes, b);
                        r(a.styles, b)
                    }
                    c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
                    this.type = a.type || (w[c] ? CKEDITOR.STYLE_BLOCK : v[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
                    if (typeof this.element == "object")this.type = CKEDITOR.STYLE_OBJECT;
                    this._ = { definition: a }
                };
                CKEDITOR.editor.prototype.applyStyle = function(a) { y.call(a, this.getSelection()) };
                CKEDITOR.editor.prototype.removeStyle = function(a) { y.call(a, this.getSelection(), 1) };
                CKEDITOR.style.prototype = {
                    apply: function(a) { y.call(this, a.getSelection()) },
                    remove: function(a) { y.call(this, a.getSelection(), 1) },
                    applyToRange: function(a) { return(this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? h : this.type == CKEDITOR.STYLE_BLOCK ? i : this.type == CKEDITOR.STYLE_OBJECT ? g : null).call(this, a) },
                    removeFromRange: function(b) {
                        return(this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? a : this.type == CKEDITOR.STYLE_BLOCK ?
                            d : this.type == CKEDITOR.STYLE_OBJECT ? e : null).call(this, b)
                    },
                    applyToObject: function(a) { t(a, this) },
                    checkActive: function(a) {
                        switch (this.type) {
                        case CKEDITOR.STYLE_BLOCK:
                            return this.checkElementRemovable(a.block || a.blockLimit, true);
                        case CKEDITOR.STYLE_OBJECT:
                        case CKEDITOR.STYLE_INLINE:
                            for (var b = a.elements, c = 0, d; c < b.length; c++) {
                                d = b[c];
                                if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block || d == a.blockLimit))) {
                                    if (this.type == CKEDITOR.STYLE_OBJECT) {
                                        var f = d.getName();
                                        if (!(typeof this.element == "string" ? f == this.element :
                                            f in this.element))continue
                                    }
                                    if (this.checkElementRemovable(d, true))return true
                                }
                            }
                        }
                        return false
                    },
                    checkApplicable: function(a) {
                        switch (this.type) {
                        case CKEDITOR.STYLE_OBJECT:
                            return a.contains(this.element)
                        }
                        return true
                    },
                    checkElementMatch: function(a, b) {
                        var c = this._.definition;
                        if (!a || !c.ignoreReadonly && a.isReadOnly())return false;
                        var d = a.getName();
                        if (typeof this.element == "string" ? d == this.element : d in this.element) {
                            if (!b && !a.hasAttributes())return true;
                            if (d = c._AC)c = d;
                            else {
                                var d = {}, f = 0, e = c.attributes;
                                if (e)
                                    for (var g in e) {
                                        f++;
                                        d[g] = e[g]
                                    }
                                if (g = CKEDITOR.style.getStyleText(c)) {
                                    d.style || f++;
                                    d.style = g
                                }
                                d._length = f;
                                c = c._AC = d
                            }
                            if (c._length) {
                                for (var i in c)
                                    if (i != "_length") {
                                        f = a.getAttribute(i) || "";
                                        if (i == "style")
                                            a: {
                                                d = c[i];
                                                typeof d == "string" && (d = CKEDITOR.tools.parseCssText(d));
                                                typeof f == "string" && (f = CKEDITOR.tools.parseCssText(f, true));
                                                g = void 0;
                                                for (g in d)
                                                    if (!(g in f && (f[g] == d[g] || d[g] == "inherit" || f[g] == "inherit"))) {
                                                        d = false;
                                                        break a
                                                    }
                                                d = true
                                            }
                                        else d = c[i] == f;
                                        if (d) {
                                            if (!b)return true
                                        } else if (b)return false
                                    }
                                if (b)return true
                            } else return true
                        }
                        return false
                    },
                    checkElementRemovable: function(a, b) {
                        if (this.checkElementMatch(a, b))return true;
                        var c = s(this)[a.getName()];
                        if (c) {
                            var d;
                            if (!(c = c.attributes))return true;
                            for (var f = 0; f < c.length; f++) {
                                d = c[f][0];
                                if (d = a.getAttribute(d)) {
                                    var e = c[f][1];
                                    if (e === null || typeof e == "string" && d == e || e.test(d))return true
                                }
                            }
                        }
                        return false
                    },
                    buildPreview: function(a) {
                        var b = this._.definition, c = [], d = b.element;
                        d == "bdo" && (d = "span");
                        var c = ["<", d], f = b.attributes;
                        if (f)for (var e in f)c.push(" ", e, '="', f[e], '"');
                        (f = CKEDITOR.style.getStyleText(b)) &&
                            c.push(' style="', f, '"');
                        c.push(">", a || b.name, "</", d, ">");
                        return c.join("")
                    }
                };
                CKEDITOR.style.getStyleText = function(a) {
                    var b = a._ST;
                    if (b)return b;
                    var b = a.styles, c = a.attributes && a.attributes.style || "", d = "";
                    c.length && (c = c.replace(q, ";"));
                    for (var f in b) {
                        var e = b[f], g = (f + ":" + e).replace(q, ";");
                        e == "inherit" ? d = d + g : c = c + g
                    }
                    c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
                    return a._ST = c + d
                }
            }(), CKEDITOR.styleCommand = function(b) { this.style = b }, CKEDITOR.styleCommand.prototype.exec = function(b) {
                b.focus();
                this.state ==
                    CKEDITOR.TRISTATE_OFF ? b.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && b.removeStyle(this.style)
            }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(b, h, a) {
                CKEDITOR.stylesSet.addExternal(b, h, "");
                CKEDITOR.stylesSet.load(b, a)
            }, CKEDITOR.editor.prototype.getStylesSet = function(b) {
                if (this._.stylesDefinitions)b(this._.stylesDefinitions);
                else {
                    var h = this,
                        a = h.config.stylesCombo_stylesSet ||
                            h.config.stylesSet || "default";
                    if (a instanceof Array) {
                        h._.stylesDefinitions = a;
                        b(a)
                    } else {
                        var a = a.split(":"), g = a[0];
                        CKEDITOR.stylesSet.addExternal(g, a[1] ? a.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                        CKEDITOR.stylesSet.load(g, function(a) {
                            h._.stylesDefinitions = a[g];
                            b(h._.stylesDefinitions)
                        })
                    }
                }
            }, CKEDITOR.dom.comment = function(b, h) {
                typeof b == "string" && (b = (h ? h.$ : document).createComment(b));
                CKEDITOR.dom.domObject.call(this, b)
            }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,
            { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function() { return"<\!--" + this.$.nodeValue + "--\>" } }), function() {
                var b = {}, h;
                for (h in CKEDITOR.dtd.$blockLimit)h in CKEDITOR.dtd.$list || (b[h] = 1);
                var a = {};
                for (h in CKEDITOR.dtd.$block)h in CKEDITOR.dtd.$blockLimit || h in CKEDITOR.dtd.$empty || (a[h] = 1);
                CKEDITOR.dom.elementPath = function(g, e) {
                    var i = null, d = null, f = [], e = e || g.getDocument().getBody(), c = g;
                    do
                        if (c.type == CKEDITOR.NODE_ELEMENT) {
                            f.push(c);
                            if (!this.lastElement) {
                                this.lastElement = c;
                                if (c.is(CKEDITOR.dtd.$object))continue
                            }
                            var j =
                                c.getName();
                            if (!d) {
                                !i && a[j] && (i = c);
                                if (b[j]) {
                                    var h;
                                    if (h = !i) {
                                        if (j = j == "div") {
                                            a: {
                                                j = c.getChildren();
                                                h = 0;
                                                for (var l = j.count(); h < l; h++) {
                                                    var m = j.getItem(h);
                                                    if (m.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[m.getName()]) {
                                                        j = true;
                                                        break a
                                                    }
                                                }
                                                j = false
                                            }
                                            j = !j && !c.equals(e)
                                        }
                                        h = j
                                    }
                                    h ? i = c : d = c
                                }
                            }
                            if (c.equals(e))break
                        }
                    while (c = c.getParent());
                    this.block = i;
                    this.blockLimit = d;
                    this.root = e;
                    this.elements = f
                }
            }(), CKEDITOR.dom.elementPath.prototype = {
                compare: function(b) {
                    var h = this.elements, b = b && b.elements;
                    if (!b || h.length != b.length)return false;
                    for (var a = 0; a < h.length; a++)if (!h[a].equals(b[a]))return false;
                    return true
                },
                contains: function(b, h, a) {
                    var g;
                    typeof b == "string" && (g = function(a) { return a.getName() == b });
                    b instanceof CKEDITOR.dom.element ? g = function(a) { return a.equals(b) } : CKEDITOR.tools.isArray(b) ? g = function(a) { return CKEDITOR.tools.indexOf(b, a.getName()) > -1 } : typeof b == "function" ? g = b : typeof b == "object" && (g = function(a) { return a.getName() in b });
                    var e = this.elements, i = e.length;
                    h && i--;
                    if (a) {
                        e = Array.prototype.slice.call(e, 0);
                        e.reverse()
                    }
                    for (h =
                        0; h < i; h++)if (g(e[h]))return e[h];
                    return null
                },
                isContextFor: function(b) {
                    var h;
                    if (b in CKEDITOR.dtd.$block) {
                        h = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit;
                        return!!h.getDtd()[b]
                    }
                    return true
                },
                direction: function() { return(this.block || this.blockLimit || this.root).getDirection(1) }
            }, CKEDITOR.dom.text = function(b, h) {
                typeof b == "string" && (b = (h ? h.$ : document).createTextNode(b));
                this.$ = b
            }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,
            {
                type: CKEDITOR.NODE_TEXT,
                getLength: function() { return this.$.nodeValue.length },
                getText: function() { return this.$.nodeValue },
                setText: function(b) { this.$.nodeValue = b },
                split: function(b) {
                    var h = this.$.parentNode, a = h.childNodes.length, g = this.getLength(), e = this.getDocument(), i = new CKEDITOR.dom.text(this.$.splitText(b), e);
                    if (h.childNodes.length == a)
                        if (b >= g) {
                            i = e.createText("");
                            i.insertAfter(this)
                        } else {
                            b = e.createText("");
                            b.insertAfter(i);
                            b.remove()
                        }
                    return i
                },
                substring: function(b, h) {
                    return typeof h != "number" ? this.$.nodeValue.substr(b) :
                        this.$.nodeValue.substring(b, h)
                }
            }), function() {
                function b(a, b, e) {
                    var i = a.serializable, d = b[e ? "endContainer" : "startContainer"], f = e ? "endOffset" : "startOffset", c = i ? b.document.getById(a.startNode) : a.startNode, a = i ? b.document.getById(a.endNode) : a.endNode;
                    if (d.equals(c.getPrevious())) {
                        b.startOffset = b.startOffset - d.getLength() - a.getPrevious().getLength();
                        d = a.getNext()
                    } else if (d.equals(a.getPrevious())) {
                        b.startOffset = b.startOffset - d.getLength();
                        d = a.getNext()
                    }
                    d.equals(c.getParent()) && b[f]++;
                    d.equals(a.getParent()) &&
                        b[f]++;
                    b[e ? "endContainer" : "startContainer"] = d;
                    return b
                }

                CKEDITOR.dom.rangeList = function(a) {
                    if (a instanceof CKEDITOR.dom.rangeList)return a;
                    a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
                    return CKEDITOR.tools.extend(a, h)
                };
                var h = {
                    createIterator: function() {
                        var a = this, b = CKEDITOR.dom.walker.bookmark(), e = [], i;
                        return{
                            getNextRange: function(d) {
                                i = i == void 0 ? 0 : i + 1;
                                var f = a[i];
                                if (f && a.length > 1) {
                                    if (!i)for (var c = a.length - 1; c >= 0; c--)e.unshift(a[c].createBookmark(true));
                                    if (d)
                                        for (var h = 0; a[i + h + 1];) {
                                            for (var k = f.document,
                                                d = 0,
                                                c = k.getById(e[h].endNode),
                                                k = k.getById(e[h + 1].startNode);;) {
                                                c = c.getNextSourceNode(false);
                                                if (k.equals(c))d = 1;
                                                else if (b(c) || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())continue;
                                                break
                                            }
                                            if (!d)break;
                                            h++
                                        }
                                    for (f.moveToBookmark(e.shift()); h--;) {
                                        c = a[++i];
                                        c.moveToBookmark(e.shift());
                                        f.setEnd(c.endContainer, c.endOffset)
                                    }
                                }
                                return f
                            }
                        }
                    },
                    createBookmarks: function(a) {
                        for (var g = [], e, i = 0; i < this.length; i++) {
                            g.push(e = this[i].createBookmark(a, true));
                            for (var d = i + 1; d < this.length; d++) {
                                this[d] = b(e, this[d]);
                                this[d] =
                                    b(e, this[d], true)
                            }
                        }
                        return g
                    },
                    createBookmarks2: function(a) {
                        for (var b = [], e = 0; e < this.length; e++)b.push(this[e].createBookmark2(a));
                        return b
                    },
                    moveToBookmarks: function(a) { for (var b = 0; b < this.length; b++)this[b].moveToBookmark(a[b]) }
                }
            }(), function() {
                function b() { return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/") }

                function h(a) {
                    var c = CKEDITOR.skin["ua_" + a], d = CKEDITOR.env;
                    if (c)
                        for (var c = c.split(",").sort(function(a, b) { return a > b ? -1 : 1 }), f = 0, e; f < c.length; f++) {
                            e =
                                c[f];
                            if (d.ie && (e.replace(/^ie/, "") == d.version || d.quirks && e == "iequirks"))e = "ie";
                            if (d[e]) {
                                a = a + ("_" + c[f]);
                                break
                            }
                        }
                    return CKEDITOR.getUrl(b() + a + ".css")
                }

                function a(a, b) {
                    if (!i[a]) {
                        CKEDITOR.document.appendStyleSheet(h(a));
                        i[a] = 1
                    }
                    b && b()
                }

                function g(a) {
                    var b = a.getById(d);
                    if (!b) {
                        b = a.getHead().append("style");
                        b.setAttribute("id", d);
                        b.setAttribute("type", "text/css")
                    }
                    return b
                }

                function e(a, b, c) {
                    var d, f, e;
                    if (CKEDITOR.env.webkit) {
                        b = b.split("}").slice(0, -1);
                        for (f = 0; f < b.length; f++)b[f] = b[f].split("{")
                    }
                    for (var g = 0; g <
                        a.length; g++)
                        if (CKEDITOR.env.webkit)
                            for (f = 0; f < b.length; f++) {
                                e = b[f][1];
                                for (d = 0; d < c.length; d++)e = e.replace(c[d][0], c[d][1]);
                                a[g].$.sheet.addRule(b[f][0], e)
                            }
                        else {
                            e = b;
                            for (d = 0; d < c.length; d++)e = e.replace(c[d][0], c[d][1]);
                            CKEDITOR.env.ie ? a[g].$.styleSheet.cssText = a[g].$.styleSheet.cssText + e : a[g].$.innerHTML = a[g].$.innerHTML + e
                        }
                }

                var i = {};
                CKEDITOR.skin = {
                    path: b,
                    loadPart: function(c, d) {
                        CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b() + "skin.js"), function() {
                            a(c,
                                d)
                        }) : a(c, d)
                    },
                    getPath: function(a) { return CKEDITOR.getUrl(h(a)) },
                    icons: {},
                    addIcon: function(a, b, c) {
                        a = a.toLowerCase();
                        this.icons[a] || (this.icons[a] = { path: b, offset: c || 0 })
                    },
                    getIconStyle: function(a, b, c, d) {
                        var f;
                        if (a) {
                            a = a.toLowerCase();
                            b && (f = this.icons[a + "-rtl"]);
                            f || (f = this.icons[a])
                        }
                        a = c || f && f.path || "";
                        d = d || f && f.offset;
                        return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;"
                    }
                };
                CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    getUiColor: function() { return this.uiColor },
                    setUiColor: function(a) {
                        var b =
                            g(CKEDITOR.document);
                        return(this.setUiColor = function(a) {
                            var d = CKEDITOR.skin.chameleon, g = [[c, a]];
                            this.uiColor = a;
                            e([b], d(this, "editor"), g);
                            e(f, d(this, "panel"), g)
                        }).call(this, a)
                    }
                });
                var d = "cke_ui_color", f = [], c = /\$color/g;
                CKEDITOR.on("instanceLoaded", function(a) {
                    if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                        var b = a.editor,
                            a = function(a) {
                                a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                                if (!a.getById("cke_ui_color")) {
                                    a = g(a);
                                    f.push(a);
                                    var d = b.getUiColor();
                                    d && e([a], CKEDITOR.skin.chameleon(b,
                                        "panel"), [[c, d]])
                                }
                            };
                        b.on("panelShow", a);
                        b.on("menuShow", a);
                        b.config.uiColor && b.setUiColor(b.config.uiColor)
                    }
                })
            }(), function() {
                if (CKEDITOR.env.webkit)CKEDITOR.env.hc = false;
                else {
                    var b = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', CKEDITOR.document);
                    b.appendTo(CKEDITOR.document.getHead());
                    try {
                        CKEDITOR.env.hc = b.getComputedStyle("border-top-color") == b.getComputedStyle("border-right-color")
                    } catch (h) {
                        CKEDITOR.env.hc =
                            false
                    }
                    b.remove()
                }
                if (CKEDITOR.env.hc)CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
                CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
                CKEDITOR.status = "loaded";
                CKEDITOR.fireOnce("loaded");
                if (b = CKEDITOR._.pending) {
                    delete CKEDITOR._.pending;
                    for (var a = 0; a < b.length; a++) {
                        CKEDITOR.editor.prototype.constructor.apply(b[a][0], b[a][1]);
                        CKEDITOR.add(b[a][0])
                    }
                }
            }(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera",
            CKEDITOR.skin.chameleon = function() {
                var b = function() {
                        return function(a, b) {
                            for (var i = a.match(/[^#]./g), d = 0; d < 3; d++) {
                                var f = i, c = d, h;
                                h = parseInt(i[d], 16);
                                h = ("0" + (b < 0 ? 0 | h * (1 + b) : 0 | h + (255 - h) * b).toString(16)).slice(-2);
                                f[c] = h
                            }
                            return"#" + i.join("")
                        }
                    }(),
                    h = function() {
                        var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
                        return function(b, i) { return a.output({ from: b, to: i }) }
                    }(),
                    a = {
                        editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
                        panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
                    };
                return function(g, e) {
                    var i = g.uiColor, i = { id: "." + g.id, defaultBorder: b(i, -0.1), defaultGradient: h(b(i, 0.9), i), lightGradient: h(b(i, 1), b(i, 0.7)), mediumGradient: h(b(i, 0.8), b(i, 0.5)), ckeButtonOn: h(b(i, 0.6), b(i, 0.7)), ckeResizer: b(i, -0.4), ckeToolbarSeparator: b(i, 0.5), ckeColorauto: b(i, 0.8), dialogBody: b(i, 0.7), dialogTabSelected: h("#FFFFFF", "#FFFFFF"), dialogTabSelectedBorder: "#FFF", elementsPathColor: b(i, -0.6), elementsPathBg: i, menubuttonIcon: b(i, 0.5), menubuttonIconHover: b(i, 0.3) };
                    return a[e].output(i).replace(/\[/g,
                        "{").replace(/\]/g, "}")
                }
            }(), CKEDITOR.plugins.add("dialogui", {
                onLoad: function() {
                    var b = function(a) {
                            this._ || (this._ = {});
                            this._["default"] = this._.initValue = a["default"] || "";
                            this._.required = a.required || false;
                            for (var b = [this._], d = 1; d < arguments.length; d++)b.push(arguments[d]);
                            b.push(true);
                            CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
                            return this._
                        },
                        h = { build: function(a, b, d) { return new CKEDITOR.ui.dialog.textInput(a, b, d) } },
                        a = { build: function(a, b, d) { return new CKEDITOR.ui.dialog[b.type](a, b, d) } },
                        g = {
                            isChanged: function() {
                                return this.getValue() !=
                                    this.getInitValue()
                            },
                            reset: function(a) { this.setValue(this.getInitValue(), a) },
                            setInitValue: function() { this._.initValue = this.getValue() },
                            resetInitValue: function() { this._.initValue = this._["default"] },
                            getInitValue: function() { return this._.initValue }
                        },
                        e = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                            onChange: function(a, b) {
                                if (!this._.domOnChangeRegistered) {
                                    a.on("load", function() {
                                        this.getInputElement().on("change", function() {
                                            a.parts.dialog.isVisible() && this.fire("change",
                                            { value: this.getValue() })
                                        }, this)
                                    }, this);
                                    this._.domOnChangeRegistered = true
                                }
                                this.on("change", b)
                            }
                        }, true),
                        i = /^on([A-Z]\w+)/,
                        d = function(a) {
                            for (var b in a)(i.test(b) || b == "title" || b == "type") && delete a[b];
                            return a
                        };
                    CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                        labeledElement: function(a, c, d, e) {
                            if (!(arguments.length < 4)) {
                                var g = b.call(this, c);
                                g.labelId = CKEDITOR.tools.getNextId() + "_label";
                                this._.children = [];
                                CKEDITOR.ui.dialog.uiElement.call(this, a, c, d, "div", null, { role: "presentation" }, function() {
                                    var b = [],
                                        d = c.required ?
                                            " cke_required" : "";
                                    if (c.labelLayout != "horizontal")b.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + g.labelId + '"', g.inputId ? ' for="' + g.inputId + '"' : "", (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", c.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ' role="presentation">', e.call(this, a, c), "</div>");
                                    else {
                                        d = {
                                            type: "hbox",
                                            widths: c.widths,
                                            padding: 0,
                                            children: [
                                                {
                                                    type: "html",
                                                    html: '<label class="cke_dialog_ui_labeled_label' + d +
                                                        '" id="' + g.labelId + '" for="' + g.inputId + '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(c.label) + "</span>"
                                                }, { type: "html", html: '<span class="cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style="' + c.controlStyle + '"' : "") + ">" + e.call(this, a, c) + "</span>" }
                                            ]
                                        };
                                        CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, d, b)
                                    }
                                    return b.join("")
                                })
                            }
                        },
                        textInput: function(a, c, d) {
                            if (!(arguments.length < 3)) {
                                b.call(this, c);
                                var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
                                    g = {
                                        "class": "cke_dialog_ui_input_" +
                                            c.type,
                                        id: e,
                                        type: c.type
                                    };
                                if (c.validate)this.validate = c.validate;
                                if (c.maxLength)g.maxlength = c.maxLength;
                                if (c.size)g.size = c.size;
                                if (c.inputStyle)g.style = c.inputStyle;
                                var i = this, h = false;
                                a.on("load", function() {
                                    i.getInputElement().on("keydown", function(a) { a.data.getKeystroke() == 13 && (h = true) });
                                    i.getInputElement().on("keyup", function(b) {
                                        if (b.data.getKeystroke() == 13 && h) {
                                            a.getButton("ok") && setTimeout(function() { a.getButton("ok").click() }, 0);
                                            h = false
                                        }
                                    }, null, null, 1E3)
                                });
                                CKEDITOR.ui.dialog.labeledElement.call(this,
                                    a, c, d, function() {
                                        var a = ['<div class="cke_dialog_ui_input_', c.type, '" role="presentation"'];
                                        c.width && a.push('style="width:' + c.width + '" ');
                                        a.push("><input ");
                                        g["aria-labelledby"] = this._.labelId;
                                        this._.required && (g["aria-required"] = this._.required);
                                        for (var b in g)a.push(b + '="' + g[b] + '" ');
                                        a.push(" /></div>");
                                        return a.join("")
                                    })
                            }
                        },
                        textarea: function(a, c, d) {
                            if (!(arguments.length < 3)) {
                                b.call(this, c);
                                var e = this, g = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", i = {};
                                if (c.validate)this.validate = c.validate;
                                i.rows = c.rows || 5;
                                i.cols = c.cols || 20;
                                if (typeof c.inputStyle != "undefined")i.style = c.inputStyle;
                                CKEDITOR.ui.dialog.labeledElement.call(this, a, c, d, function() {
                                    i["aria-labelledby"] = this._.labelId;
                                    this._.required && (i["aria-required"] = this._.required);
                                    var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea class="cke_dialog_ui_input_textarea" id="', g, '" '], b;
                                    for (b in i)a.push(b + '="' + CKEDITOR.tools.htmlEncode(i[b]) + '" ');
                                    a.push(">", CKEDITOR.tools.htmlEncode(e._["default"]), "</textarea></div>");
                                    return a.join("")
                                })
                            }
                        },
                        checkbox: function(a, c, e) {
                            if (!(arguments.length < 3)) {
                                var g = b.call(this, c, { "default": !!c["default"] });
                                if (c.validate)this.validate = c.validate;
                                CKEDITOR.ui.dialog.uiElement.call(this, a, c, e, "span", null, null, function() {
                                    var b = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox" }, true), e = [], i = CKEDITOR.tools.getNextId() + "_label", h = { "class": "cke_dialog_ui_checkbox_input", type: "checkbox", "aria-labelledby": i };
                                    d(b);
                                    if (c["default"])h.checked = "checked";
                                    if (typeof b.inputStyle != "undefined")b.style = b.inputStyle;
                                    g.checkbox = new CKEDITOR.ui.dialog.uiElement(a, b, e, "input", null, h);
                                    e.push(' <label id="', i, '" for="', h.id, '"' + (c.labelStyle ? ' style="' + c.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(c.label), "</label>");
                                    return e.join("")
                                })
                            }
                        },
                        radio: function(a, c, e) {
                            if (!(arguments.length < 3)) {
                                b.call(this, c);
                                if (!this._["default"])this._["default"] = this._.initValue = c.items[0][1];
                                if (c.validate)this.validate = c.valdiate;
                                var g = [], i = this;
                                CKEDITOR.ui.dialog.labeledElement.call(this,
                                    a, c, e, function() {
                                        for (var b = [], e = [], h = c.id ? c.id + "_radio" : CKEDITOR.tools.getNextId() + "_radio", j = 0; j < c.items.length; j++) {
                                            var t = c.items[j], r = t[2] !== void 0 ? t[2] : t[0], s = t[1] !== void 0 ? t[1] : t[0], x = CKEDITOR.tools.getNextId() + "_radio_input", y = x + "_label", x = CKEDITOR.tools.extend({}, c, { id: x, title: null, type: null }, true), r = CKEDITOR.tools.extend({}, x, { title: r }, true), w = { type: "radio", "class": "cke_dialog_ui_radio_input", name: h, value: s, "aria-labelledby": y }, v = [];
                                            if (i._["default"] == s)w.checked = "checked";
                                            d(x);
                                            d(r);
                                            if (typeof x.inputStyle !=
                                                "undefined")x.style = x.inputStyle;
                                            g.push(new CKEDITOR.ui.dialog.uiElement(a, x, v, "input", null, w));
                                            v.push(" ");
                                            new CKEDITOR.ui.dialog.uiElement(a, r, v, "label", null, { id: y, "for": w.id }, t[0]);
                                            b.push(v.join(""))
                                        }
                                        new CKEDITOR.ui.dialog.hbox(a, g, b, e);
                                        return e.join("")
                                    });
                                this._.children = g
                            }
                        },
                        button: function(a, c, d) {
                            if (arguments.length) {
                                typeof c == "function" && (c = c(a.getParentEditor()));
                                b.call(this, c, { disabled: c.disabled || false });
                                CKEDITOR.event.implementOn(this);
                                var e = this;
                                a.on("load", function() {
                                    var a = this.getElement();
                                    (function() {
                                        a.on("click", e.click, e);
                                        a.on("keydown", function(a) {
                                            if (a.data.getKeystroke() in { 32: 1 }) {
                                                e.click();
                                                a.data.preventDefault()
                                            }
                                        })
                                    })();
                                    a.unselectable()
                                }, this);
                                var g = CKEDITOR.tools.extend({}, c);
                                delete g.style;
                                var i = CKEDITOR.tools.getNextId() + "_label";
                                CKEDITOR.ui.dialog.uiElement.call(this, a, g, d, "a", null, { style: c.style, href: "javascript:void(0)", title: c.label, hidefocus: "true", "class": c["class"], role: "button", "aria-labelledby": i }, '<span id="' + i + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(c.label) +
                                    "</span>")
                            }
                        },
                        select: function(a, c, e) {
                            if (!(arguments.length < 3)) {
                                var g = b.call(this, c);
                                if (c.validate)this.validate = c.validate;
                                g.inputId = CKEDITOR.tools.getNextId() + "_select";
                                CKEDITOR.ui.dialog.labeledElement.call(this, a, c, e, function() {
                                    var b = CKEDITOR.tools.extend({}, c, { id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select" }, true), e = [], i = [], h = { id: g.inputId, "class": "cke_dialog_ui_input_select", "aria-labelledby": this._.labelId };
                                    e.push('<div class="cke_dialog_ui_input_', c.type, '" role="presentation"');
                                    c.width && e.push('style="width:' + c.width + '" ');
                                    e.push(">");
                                    if (c.size != void 0)h.size = c.size;
                                    if (c.multiple != void 0)h.multiple = c.multiple;
                                    d(b);
                                    for (var j = 0, t; j < c.items.length && (t = c.items[j]); j++)i.push('<option value="', CKEDITOR.tools.htmlEncode(t[1] !== void 0 ? t[1] : t[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(t[0]));
                                    if (typeof b.inputStyle != "undefined")b.style = b.inputStyle;
                                    g.select = new CKEDITOR.ui.dialog.uiElement(a, b, e, "select", null, h, i.join(""));
                                    e.push("</div>");
                                    return e.join("")
                                })
                            }
                        },
                        file: function(a, c, d) {
                            if (!(arguments.length < 3)) {
                                c["default"] === void 0 && (c["default"] = "");
                                var e = CKEDITOR.tools.extend(b.call(this, c), { definition: c, buttons: [] });
                                if (c.validate)this.validate = c.validate;
                                a.on("load", function() { CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file") });
                                CKEDITOR.ui.dialog.labeledElement.call(this, a, c, d, function() {
                                    e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                                    var a = CKEDITOR.env.isCustomDomain(),
                                        b = [
                                            '<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="',
                                            e.frameId, '" title="', c.label, '" src="javascript:void('
                                        ];
                                    b.push(a ? "(function(){document.open();document.domain='" + document.domain + "';document.close();})()" : "0");
                                    b.push(')"></iframe>');
                                    return b.join("")
                                })
                            }
                        },
                        fileButton: function(a, c, d) {
                            if (!(arguments.length < 3)) {
                                b.call(this, c);
                                var e = this;
                                if (c.validate)this.validate = c.validate;
                                var g = CKEDITOR.tools.extend({}, c), i = g.onClick;
                                g.className = (g.className ? g.className + " " : "") + "cke_dialog_ui_button";
                                g.onClick = function(b) {
                                    var d = c["for"];
                                    if (!i || i.call(this, b) !== false) {
                                        a.getContentElement(d[0],
                                            d[1]).submit();
                                        this.disable()
                                    }
                                };
                                a.on("load", function() { a.getContentElement(c["for"][0], c["for"][1])._.buttons.push(e) });
                                CKEDITOR.ui.dialog.button.call(this, a, g, d)
                            }
                        },
                        html: function() {
                            var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, d = /\/$/;
                            return function(e, g, i) {
                                if (!(arguments.length < 3)) {
                                    var h = [], o = g.html;
                                    o.charAt(0) != "<" && (o = "<span>" + o + "</span>");
                                    var p = g.focus;
                                    if (p) {
                                        var t = this.focus;
                                        this.focus = function() {
                                            (typeof p == "function" ? p : t).call(this);
                                            this.fire("focus")
                                        };
                                        if (g.isFocusable)
                                            this.isFocusable =
                                                this.isFocusable;
                                        this.keyboardFocusable = true
                                    }
                                    CKEDITOR.ui.dialog.uiElement.call(this, e, g, h, "span", null, null, "");
                                    h = h.join("").match(a);
                                    o = o.match(b) || ["", "", ""];
                                    if (d.test(o[1])) {
                                        o[1] = o[1].slice(0, -1);
                                        o[2] = "/" + o[2]
                                    }
                                    i.push([o[1], " ", h[1] || "", o[2]].join(""))
                                }
                            }
                        }(),
                        fieldset: function(a, b, d, e, g) {
                            var i = g.label;
                            this._ = { children: b };
                            CKEDITOR.ui.dialog.uiElement.call(this, a, g, e, "fieldset", null, null, function() {
                                var a = [];
                                i && a.push("<legend" + (g.labelStyle ? ' style="' + g.labelStyle + '"' : "") + ">" + i + "</legend>");
                                for (var b =
                                    0; b < d.length; b++)a.push(d[b]);
                                return a.join("")
                            })
                        }
                    }, true);
                    CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
                    CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setLabel: function(a) {
                            var b = CKEDITOR.document.getById(this._.labelId);
                            b.getChildCount() < 1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
                            return this
                        },
                        getLabel: function() {
                            var a = CKEDITOR.document.getById(this._.labelId);
                            return!a || a.getChildCount() <
                                1 ? "" : a.getChild(0).getText()
                        },
                        eventProcessors: e
                    }, true);
                    CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        click: function() { return!this._.disabled ? this.fire("click", { dialog: this._.dialog }) : false },
                        enable: function() {
                            this._.disabled = false;
                            var a = this.getElement();
                            a && a.removeClass("cke_disabled")
                        },
                        disable: function() {
                            this._.disabled = true;
                            this.getElement().addClass("cke_disabled")
                        },
                        isVisible: function() { return this.getElement().getFirst().isVisible() },
                        isEnabled: function() { return!this._.disabled },
                        eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function(a, b) { this.on("click", function() { b.apply(this, arguments) }) } }, true),
                        accessKeyUp: function() { this.click() },
                        accessKeyDown: function() { this.focus() },
                        keyboardFocusable: true
                    }, true);
                    CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                        getInputElement: function() { return CKEDITOR.document.getById(this._.inputId) },
                        focus: function() {
                            var a = this.selectParentTab();
                            setTimeout(function() {
                                var b = a.getInputElement();
                                b && b.$.focus()
                            }, 0)
                        },
                        select: function() {
                            var a = this.selectParentTab();
                            setTimeout(function() {
                                var b = a.getInputElement();
                                if (b) {
                                    b.$.focus();
                                    b.$.select()
                                }
                            }, 0)
                        },
                        accessKeyUp: function() { this.select() },
                        setValue: function(a) {
                            !a && (a = "");
                            return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                        },
                        keyboardFocusable: true
                    }, g, true);
                    CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
                    CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement,
                        {
                            getInputElement: function() { return this._.select.getElement() },
                            add: function(a, b, d) {
                                var e = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), g = this.getInputElement().$;
                                e.$.text = a;
                                e.$.value = b === void 0 || b === null ? a : b;
                                d === void 0 || d === null ? CKEDITOR.env.ie ? g.add(e.$) : g.add(e.$, null) : g.add(e.$, d);
                                return this
                            },
                            remove: function(a) {
                                this.getInputElement().$.remove(a);
                                return this
                            },
                            clear: function() {
                                for (var a = this.getInputElement().$; a.length > 0;)a.remove(0);
                                return this
                            },
                            keyboardFocusable: true
                        },
                        g, true);
                    CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        getInputElement: function() { return this._.checkbox.getElement() },
                        setValue: function(a, b) {
                            this.getInputElement().$.checked = a;
                            !b && this.fire("change", { value: a })
                        },
                        getValue: function() { return this.getInputElement().$.checked },
                        accessKeyUp: function() { this.setValue(!this.getValue()) },
                        eventProcessors: {
                            onChange: function(a, b) {
                                if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8)return e.onChange.apply(this, arguments);
                                a.on("load",
                                    function() {
                                        var a = this._.checkbox.getElement();
                                        a.on("propertychange", function(b) {
                                            b = b.data.$;
                                            b.propertyName == "checked" && this.fire("change", { value: a.$.checked })
                                        }, this)
                                    }, this);
                                this.on("change", b);
                                return null
                            }
                        },
                        keyboardFocusable: true
                    }, g, true);
                    CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                        setValue: function(a, b) {
                            for (var d = this._.children, e, g = 0; g < d.length && (e = d[g]); g++)e.getElement().$.checked = e.getValue() == a;
                            !b && this.fire("change", { value: a })
                        },
                        getValue: function() {
                            for (var a =
                                         this._.children,
                                b = 0; b < a.length; b++)if (a[b].getElement().$.checked)return a[b].getValue();
                            return null
                        },
                        accessKeyUp: function() {
                            var a = this._.children, b;
                            for (b = 0; b < a.length; b++)
                                if (a[b].getElement().$.checked) {
                                    a[b].getElement().focus();
                                    return
                                }
                            a[0].getElement().focus()
                        },
                        eventProcessors: {
                            onChange: function(a, b) {
                                if (CKEDITOR.env.ie) {
                                    a.on("load", function() {
                                        for (var a = this._.children, b = this, c = 0; c < a.length; c++)
                                            a[c].getElement().on("propertychange", function(a) {
                                                a = a.data.$;
                                                a.propertyName == "checked" && this.$.checked &&
                                                    b.fire("change", { value: this.getAttribute("value") })
                                            })
                                    }, this);
                                    this.on("change", b)
                                } else return e.onChange.apply(this, arguments);
                                return null
                            }
                        },
                        keyboardFocusable: true
                    }, g, true);
                    CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, g, {
                        getInputElement: function() {
                            var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                            return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement()
                        },
                        submit: function() {
                            this.getInputElement().getParent().$.submit();
                            return this
                        },
                        getAction: function() { return this.getInputElement().getParent().$.action },
                        registerEvents: function(a) {
                            var b = /^on([A-Z]\w+)/, d, e = function(a, b, c, d) { a.on("formLoaded", function() { a.getInputElement().on(c, d, a) }) }, g;
                            for (g in a)if (d = g.match(b))this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : e(this, this._.dialog, d[1].toLowerCase(), a[g]);
                            return this
                        },
                        reset: function() {
                            function a() {
                                d.$.open();
                                if (CKEDITOR.env.isCustomDomain())d.$.domain = document.domain;
                                var f = "";
                                e.size &&
                                (f = e.size - (CKEDITOR.env.ie ? 7 : 0));
                                var r = b.frameId + "_input";
                                d.$.write([
                                    '<html dir="' + o + '" lang="' + p + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + o + '" lang="' + p + '" action="', CKEDITOR.tools.htmlEncode(e.action), '"><label id="', b.labelId, '" for="', r, '" style="display:none">', CKEDITOR.tools.htmlEncode(e.label), '</label><input id="', r, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(e.id ||
                                        "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(f > 0 ? f : ""), '" /></form></body></html>', "<script>window.parent.CKEDITOR.tools.callFunction(" + i + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + h + ")}<\/script>"
                                ].join(""));
                                d.$.close();
                                for (f = 0; f < g.length; f++)g[f].enable()
                            }

                            var b = this._, d = CKEDITOR.document.getById(b.frameId).getFrameDocument(), e = b.definition, g = b.buttons, i = this.formLoadedNumber, h = this.formUnloadNumber, o = b.dialog._.editor.lang.dir, p = b.dialog._.editor.langCode;
                            if (!i) {
                                i = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() { this.fire("formLoaded") }, this);
                                h = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() { this.getInputElement().clearCustomData() }, this);
                                this.getDialog()._.editor.on("destroy", function() {
                                    CKEDITOR.tools.removeFunction(i);
                                    CKEDITOR.tools.removeFunction(h)
                                })
                            }
                            CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                        },
                        getValue: function() { return this.getInputElement().$.value || "" },
                        setInitValue: function() { this._.initValue = "" },
                        eventProcessors: {
                            onChange: function(a,
                                b) {
                                if (!this._.domOnChangeRegistered) {
                                    this.on("formLoaded", function() { this.getInputElement().on("change", function() { this.fire("change", { value: this.getValue() }) }, this) }, this);
                                    this._.domOnChangeRegistered = true
                                }
                                this.on("change", b)
                            }
                        },
                        keyboardFocusable: true
                    }, true);
                    CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
                    CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
                    CKEDITOR.dialog.addUIElement("text", h);
                    CKEDITOR.dialog.addUIElement("password",
                        h);
                    CKEDITOR.dialog.addUIElement("textarea", a);
                    CKEDITOR.dialog.addUIElement("checkbox", a);
                    CKEDITOR.dialog.addUIElement("radio", a);
                    CKEDITOR.dialog.addUIElement("button", a);
                    CKEDITOR.dialog.addUIElement("select", a);
                    CKEDITOR.dialog.addUIElement("file", a);
                    CKEDITOR.dialog.addUIElement("fileButton", a);
                    CKEDITOR.dialog.addUIElement("html", a);
                    CKEDITOR.dialog.addUIElement("fieldset", {
                        build: function(a, b, d) {
                            for (var e = b.children, g, i = [], h = [], o = 0; o < e.length && (g = e[o]); o++) {
                                var p = [];
                                i.push(p);
                                h.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a,
                                    g, p))
                            }
                            return new CKEDITOR.ui.dialog[b.type](a, h, i, d, b)
                        }
                    })
                }
            }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, function() {
                function b() {
                    for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
                    return null
                }

                function h() {
                    for (var a = this._.tabIdList.length,
                        b = CKEDITOR.tools.indexOf(this._.tabIdList,
                            this._.currentTabId),
                        c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
                    return null
                }

                function a(a, b) {
                    for (var c = a.$.getElementsByTagName("input"), d = 0, f = c.length; d < f; d++) {
                        var e = new CKEDITOR.dom.element(c[d]);
                        if (e.getAttribute("type").toLowerCase() == "text")
                            if (b) {
                                e.setAttribute("value", e.getCustomData("fake_value") || "");
                                e.removeCustomData("fake_value")
                            } else {
                                e.setCustomData("fake_value", e.getAttribute("value"));
                                e.setAttribute("value", "")
                            }
                    }
                }

                function g(a,
                    b) {
                    var c = this.getInputElement();
                    c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true));
                    a || (this.select ? this.select() : this.focus());
                    b && alert(b);
                    this.fire("validated", { valid: a, msg: b })
                }

                function e() {
                    var a = this.getInputElement();
                    a && a.removeAttribute("aria-invalid")
                }

                function i(a) {
                    var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", p).output({
                            id: CKEDITOR.tools.getNextNumber(),
                            editorId: a.id,
                            langDir: a.lang.dir,
                            langCode: a.langCode,
                            editorDialogClass: "cke_editor_" + a.name.replace(/\./g,
                                "\\.") + "_dialog",
                            closeTitle: a.lang.common.close
                        })),
                        b = a.getChild([0, 0, 0, 0, 0]),
                        c = b.getChild(0),
                        d = b.getChild(1);
                    if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                        var f = CKEDITOR.env.isCustomDomain(), f = "javascript:void(function(){" + encodeURIComponent("document.open();" + (f ? 'document.domain="' + document.domain + '";' : "") + "document.close();") + "}())";
                        CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + f + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
                    }
                    c.unselectable();
                    d.unselectable();
                    return{ element: a, parts: { dialog: a.getChild(0), title: c, close: d, tabs: b.getChild(2), contents: b.getChild([3, 0, 0, 0]), footer: b.getChild([3, 0, 1, 0]) } }
                }

                function d(a, b, c) {
                    this.element = b;
                    this.focusIndex = c;
                    this.tabIndex = 0;
                    this.isFocusable = function() { return!b.getAttribute("disabled") && b.isVisible() };
                    this.focus = function() {
                        a._.currentFocusIndex = this.focusIndex;
                        this.element.focus()
                    };
                    b.on("keydown", function(a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire("click") });
                    b.on("focus", function() { this.fire("mouseover") });
                    b.on("blur", function() { this.fire("mouseout") })
                }

                function f(a) {
                    function b() { a.layout() }

                    var c = CKEDITOR.document.getWindow();
                    c.on("resize", b);
                    a.on("hide", function() { c.removeListener("resize", b) })
                }

                function c(a, b) {
                    this._ = { dialog: a };
                    CKEDITOR.tools.extend(this, b)
                }

                function j(a) {
                    function b(c) {
                        var h = a.getSize(), j = CKEDITOR.document.getWindow().getViewPaneSize(), k = c.data.$.screenX, o = c.data.$.screenY, t = k - d.x, r = o - d.y;
                        d = { x: k, y: o };
                        f.x = f.x + t;
                        f.y = f.y + r;
                        a.move(f.x + i[3] < g ? -i[3] : f.x - i[1] > j.width - h.width - g ? j.width - h.width +
                        (e.lang.dir == "rtl" ? 0 : i[1]) : f.x, f.y + i[0] < g ? -i[0] : f.y - i[2] > j.height - h.height - g ? j.height - h.height + i[2] : f.y, 1);
                        c.data.preventDefault()
                    }

                    function c() {
                        CKEDITOR.document.removeListener("mousemove", b);
                        CKEDITOR.document.removeListener("mouseup", c);
                        if (CKEDITOR.env.ie6Compat) {
                            var a = q.getChild(0).getFrameDocument();
                            a.removeListener("mousemove", b);
                            a.removeListener("mouseup", c)
                        }
                    }

                    var d = null, f = null;
                    a.getElement().getFirst();
                    var e = a.getParentEditor(),
                        g = e.config.dialog_magnetDistance,
                        i = CKEDITOR.skin.margins || [
                            0, 0, 0,
                            0
                        ];
                    typeof g == "undefined" && (g = 20);
                    a.parts.title.on("mousedown", function(e) {
                        d = { x: e.data.$.screenX, y: e.data.$.screenY };
                        CKEDITOR.document.on("mousemove", b);
                        CKEDITOR.document.on("mouseup", c);
                        f = a.getPosition();
                        if (CKEDITOR.env.ie6Compat) {
                            var g = q.getChild(0).getFrameDocument();
                            g.on("mousemove", b);
                            g.on("mouseup", c)
                        }
                        e.data.preventDefault()
                    }, a)
                }

                function k(a) {
                    var b, c;

                    function d(f) {
                        var t = i.lang.dir == "rtl",
                            r = o.width,
                            p = o.height,
                            l = r + (f.data.$.screenX - b) * (t ? -1 : 1) * (a._.moved ? 1 : 2),
                            n = p + (f.data.$.screenY - c) * (a._.moved ?
                                1 : 2),
                            s = a._.element.getFirst(),
                            s = t && s.getComputedStyle("right"),
                            m = a.getPosition();
                        m.y + n > k.height && (n = k.height - m.y);
                        if ((t ? s : m.x) + l > k.width)l = k.width - (t ? s : m.x);
                        if (g == CKEDITOR.DIALOG_RESIZE_WIDTH || g == CKEDITOR.DIALOG_RESIZE_BOTH)r = Math.max(e.minWidth || 0, l - h);
                        if (g == CKEDITOR.DIALOG_RESIZE_HEIGHT || g == CKEDITOR.DIALOG_RESIZE_BOTH)p = Math.max(e.minHeight || 0, n - j);
                        a.resize(r, p);
                        a._.moved || a.layout();
                        f.data.preventDefault()
                    }

                    function f() {
                        CKEDITOR.document.removeListener("mouseup", f);
                        CKEDITOR.document.removeListener("mousemove",
                            d);
                        if (t) {
                            t.remove();
                            t = null
                        }
                        if (CKEDITOR.env.ie6Compat) {
                            var a = q.getChild(0).getFrameDocument();
                            a.removeListener("mouseup", f);
                            a.removeListener("mousemove", d)
                        }
                    }

                    var e = a.definition, g = e.resizable;
                    if (g != CKEDITOR.DIALOG_RESIZE_NONE) {
                        var i = a.getParentEditor(),
                            h,
                            j,
                            k,
                            o,
                            t,
                            r = CKEDITOR.tools.addFunction(function(e) {
                                o = a.getSize();
                                var g = a.parts.contents;
                                if (g.$.getElementsByTagName("iframe").length) {
                                    t = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                                    g.append(t)
                                }
                                j = o.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                                h = o.width - a.parts.contents.getSize("width", 1);
                                b = e.screenX;
                                c = e.screenY;
                                k = CKEDITOR.document.getWindow().getViewPaneSize();
                                CKEDITOR.document.on("mousemove", d);
                                CKEDITOR.document.on("mouseup", f);
                                if (CKEDITOR.env.ie6Compat) {
                                    g = q.getChild(0).getFrameDocument();
                                    g.on("mousemove", d);
                                    g.on("mouseup", f)
                                }
                                e.preventDefault && e.preventDefault()
                            });
                        a.on("load", function() {
                            var b = "";
                            g ==
                                CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : g == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                            b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + i.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(i.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + r + ', event )">' + (i.lang.dir == "ltr" ? "◢" : "◣") + "</div>");
                            a.parts.footer.append(b, 1)
                        });
                        i.on("destroy", function() { CKEDITOR.tools.removeFunction(r) })
                    }
                }

                function l(a) { a.data.preventDefault(1) }

                function m(a) {
                    var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", f = c.dialog_backgroundCoverOpacity, e = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, f, e), g = v[c];
                    if (g)g.show();
                    else {
                        e = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", e, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">'];
                        if (CKEDITOR.env.ie6Compat) {
                            var i = CKEDITOR.env.isCustomDomain(),
                                d = "<html><body style=\\'background-color:" +
                                    d + ";\\'></body></html>";
                            e.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                            e.push("void((function(){document.open();" + (i ? "document.domain='" + document.domain + "';" : "") + "document.write( '" + d + "' );document.close();})())");
                            e.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                        }
                        e.push("</div>");
                        g = CKEDITOR.dom.element.createFromHtml(e.join(""));
                        g.setOpacity(f != void 0 ?
                            f : 0.5);
                        g.on("keydown", l);
                        g.on("keypress", l);
                        g.on("keyup", l);
                        g.appendTo(CKEDITOR.document.getBody());
                        v[c] = g
                    }
                    a.focusManager.add(g);
                    q = g;
                    var a = function() {
                            var a = b.getViewPaneSize();
                            g.setStyles({ width: a.width + "px", height: a.height + "px" })
                        },
                        h = function() {
                            var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
                            g.setStyles({ left: a.x + "px", top: a.y + "px" });
                            if (c) {
                                do {
                                    a = c.getPosition();
                                    c.move(a.x, a.y)
                                } while (c = c._.parentDialog)
                            }
                        };
                    w = a;
                    b.on("resize", a);
                    a();
                    (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && g.focus();
                    if (CKEDITOR.env.ie6Compat) {
                        var j =
                            function() {
                                h();
                                arguments.callee.prevScrollHandler.apply(this, arguments)
                            };
                        b.$.setTimeout(function() {
                            j.prevScrollHandler = window.onscroll || function() {};
                            window.onscroll = j
                        }, 0);
                        h()
                    }
                }

                function n(a) {
                    if (q) {
                        a.focusManager.remove(q);
                        a = CKEDITOR.document.getWindow();
                        q.hide();
                        a.removeListener("resize", w);
                        CKEDITOR.env.ie6Compat && a.$.setTimeout(function() { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0);
                        w = null
                    }
                }

                var o = CKEDITOR.tools.cssLength,
                    p = '<div class="cke cke_reset_all {editorId} {editorDialogClass}" dir="{langDir}" lang="{langCode}" role="application"><table class="cke_dialog ' +
                        CKEDITOR.env.cssClass + ' cke_{langDir}" aria-labelledby="cke_dialog_title_{id}" style="position:absolute" role="dialog"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
                CKEDITOR.dialog = function(a, c) {
                    function d() {
                        var a = q._.focusList;
                        a.sort(function(a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex });
                        for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c
                    }

                    function f(a) {
                        var b = q._.focusList, a = a || 0;
                        if (!(b.length < 1)) {
                            var c = q._.currentFocusIndex;
                            try {
                                b[c].getInputElement().$.blur()
                            } catch (d) {
                            }
                            for (var e = c = (c + a + b.length) % b.length; a && !b[e].isFocusable();) {
                                e = (e + a + b.length) % b.length;
                                if (e == c)break
                            }
                            b[e].focus();
                            b[e].type == "text" && b[e].select()
                        }
                    }

                    function o(c) {
                        if (q ==
                            CKEDITOR.dialog._.currentTop) {
                            var d = c.data.getKeystroke(), e = a.lang.dir == "rtl";
                            v = w = 0;
                            if (d == 9 || d == CKEDITOR.SHIFT + 9) {
                                d = d == CKEDITOR.SHIFT + 9;
                                if (q._.tabBarMode) {
                                    d = d ? b.call(q) : h.call(q);
                                    q.selectPage(d);
                                    q._.tabs[d][0].focus()
                                } else f(d ? -1 : 1);
                                v = 1
                            } else if (d == CKEDITOR.ALT + 121 && !q._.tabBarMode && q.getPageCount() > 1) {
                                q._.tabBarMode = true;
                                q._.tabs[q._.currentTabId][0].focus();
                                v = 1
                            } else if ((d == 37 || d == 39) && q._.tabBarMode) {
                                d = d == (e ? 39 : 37) ? b.call(q) : h.call(q);
                                q.selectPage(d);
                                q._.tabs[d][0].focus();
                                v = 1
                            } else if ((d == 13 || d ==
                                32) && q._.tabBarMode) {
                                this.selectPage(this._.currentTabId);
                                this._.tabBarMode = false;
                                this._.currentFocusIndex = -1;
                                f(1);
                                v = 1
                            } else if (d == 13) {
                                d = c.data.getTarget();
                                if (!d.is("a", "button", "select", "textarea") && (!d.is("input") || d.$.type != "button")) {
                                    (d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d);
                                    v = 1
                                }
                                w = 1
                            } else if (d == 27) {
                                (d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : this.fire("cancel", { hide: true }).hide !== false && this.hide();
                                w = 1
                            } else return;
                            r(c)
                        }
                    }

                    function r(a) {
                        v ? a.data.preventDefault(1) :
                            w && a.data.stopPropagation()
                    }

                    var p = CKEDITOR.dialog._.dialogDefinitions[c], l = CKEDITOR.tools.clone(t), n = a.config.dialog_buttonsOrder || "OS", s = a.lang.dir, m = {}, v, w;
                    (n == "OS" && CKEDITOR.env.mac || n == "rtl" && s == "ltr" || n == "ltr" && s == "rtl") && l.buttons.reverse();
                    p = CKEDITOR.tools.extend(p(a), l);
                    p = CKEDITOR.tools.clone(p);
                    p = new y(this, p);
                    l = i(a);
                    this._ = {
                        editor: a,
                        element: l.element,
                        name: c,
                        contentSize: { width: 0, height: 0 },
                        size: { width: 0, height: 0 },
                        contents: {},
                        buttons: {},
                        accessKeyMap: {},
                        tabs: {},
                        tabIdList: [],
                        currentTabId: null,
                        currentTabIndex: null,
                        pageCount: 0,
                        lastTab: null,
                        tabBarMode: false,
                        focusList: [],
                        currentFocusIndex: 0,
                        hasFocus: false
                    };
                    this.parts = l.parts;
                    CKEDITOR.tools.setTimeout(function() { a.fire("ariaWidget", this.parts.contents) }, 0, this);
                    l = { position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden" };
                    l[s == "rtl" ? "right" : "left"] = 0;
                    this.parts.dialog.setStyles(l);
                    CKEDITOR.event.call(this);
                    this.definition = p = CKEDITOR.fire("dialogDefinition", { name: c, definition: p }, a).definition;
                    if (!("removeDialogTabs" in a._) &&
                        a.config.removeDialogTabs) {
                        l = a.config.removeDialogTabs.split(";");
                        for (s = 0; s < l.length; s++) {
                            n = l[s].split(":");
                            if (n.length == 2) {
                                var x = n[0];
                                m[x] || (m[x] = []);
                                m[x].push(n[1])
                            }
                        }
                        a._.removeDialogTabs = m
                    }
                    if (a._.removeDialogTabs && (m = a._.removeDialogTabs[c]))for (s = 0; s < m.length; s++)p.removeContents(m[s]);
                    if (p.onLoad)this.on("load", p.onLoad);
                    if (p.onShow)this.on("show", p.onShow);
                    if (p.onHide)this.on("hide", p.onHide);
                    if (p.onOk)
                        this.on("ok", function(b) {
                            a.fire("saveSnapshot");
                            setTimeout(function() { a.fire("saveSnapshot") },
                                0);
                            if (p.onOk.call(this, b) === false)b.data.hide = false
                        });
                    if (p.onCancel)this.on("cancel", function(a) { if (p.onCancel.call(this, a) === false)a.data.hide = false });
                    var q = this,
                        u = function(a) {
                            var b = q._.contents, c = false, d;
                            for (d in b)for (var f in b[d])if (c = a.call(this, b[d][f]))return
                        };
                    this.on("ok", function(a) {
                        u(function(b) {
                            if (b.validate) {
                                var c = b.validate(this), d = typeof c == "string" || c === false;
                                if (d) {
                                    a.data.hide = false;
                                    a.stop()
                                }
                                g.call(b, !d, typeof c == "string" ? c : void 0);
                                return d
                            }
                        })
                    }, this, null, 0);
                    this.on("cancel", function(b) {
                        u(function(c) {
                            if (c.isChanged()) {
                                if (!confirm(a.lang.common.confirmCancel))
                                    b.data.hide =
                                        false;
                                return true
                            }
                        })
                    }, this, null, 0);
                    this.parts.close.on("click", function(a) {
                        this.fire("cancel", { hide: true }).hide !== false && this.hide();
                        a.data.preventDefault()
                    }, this);
                    this.changeFocus = f;
                    var B = this._.element;
                    a.focusManager.add(B, 1);
                    this.on("show", function() {
                        B.on("keydown", o, this);
                        if (CKEDITOR.env.opera || CKEDITOR.env.gecko)B.on("keypress", r, this)
                    });
                    this.on("hide", function() {
                        B.removeListener("keydown", o);
                        (CKEDITOR.env.opera || CKEDITOR.env.gecko) && B.removeListener("keypress", r);
                        u(function(a) { e.apply(a) })
                    });
                    this.on("iframeAdded", function(a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", o, this, null, 0) });
                    this.on("show", function() {
                        d();
                        if (a.config.dialog_startupFocusTab && q._.pageCount > 1) {
                            q._.tabBarMode = true;
                            q._.tabs[q._.currentTabId][0].focus()
                        } else if (!this._.hasFocus) {
                            this._.currentFocusIndex = -1;
                            if (p.onFocus) {
                                var b = p.onFocus.call(this);
                                b && b.focus()
                            } else f(1)
                        }
                    }, this, null, 4294967295);
                    if (CKEDITOR.env.ie6Compat)
                        this.on("load", function() {
                            var a = this.getElement(), b = a.getFirst();
                            b.remove();
                            b.appendTo(a)
                        }, this);
                    j(this);
                    k(this);
                    (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title);
                    for (s = 0; s < p.contents.length; s++)(m = p.contents[s]) && this.addPage(m);
                    this.parts.tabs.on("click", function(a) {
                        var b = a.data.getTarget();
                        if (b.hasClass("cke_dialog_tab")) {
                            b = b.$.id;
                            this.selectPage(b.substring(4, b.lastIndexOf("_")));
                            if (this._.tabBarMode) {
                                this._.tabBarMode = false;
                                this._.currentFocusIndex = -1;
                                f(1)
                            }
                            a.data.preventDefault()
                        }
                    }, this);
                    s = [];
                    m = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,
                    { type: "hbox", className: "cke_dialog_footer_buttons", widths: [], children: p.buttons }, s).getChild();
                    this.parts.footer.setHtml(s.join(""));
                    for (s = 0; s < m.length; s++)this._.buttons[m[s].id] = m[s]
                };
                CKEDITOR.dialog.prototype = {
                    destroy: function() {
                        this.hide();
                        this._.element.remove()
                    },
                    resize: function() {
                        return function(a, b) {
                            if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                                CKEDITOR.dialog.fire("resize", { dialog: this, width: a, height: b }, this._.editor);
                                this.fire("resize", { width: a, height: b },
                                    this._.editor);
                                this.parts.contents.setStyles({ width: a + "px", height: b + "px" });
                                if (this._.editor.lang.dir == "rtl" && this._.position)this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10);
                                this._.contentSize = { width: a, height: b }
                            }
                        }
                    }(),
                    getSize: function() {
                        var a = this._.element.getFirst();
                        return{ width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
                    },
                    move: function(a, b, c) {
                        var d = this._.element.getFirst(),
                            f = this._.editor.lang.dir ==
                                "rtl",
                            e = d.getComputedStyle("position") == "fixed";
                        CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                        if (!e || !this._.position || !(this._.position.x == a && this._.position.y == b)) {
                            this._.position = { x: a, y: b };
                            if (!e) {
                                e = CKEDITOR.document.getWindow().getScrollPosition();
                                a = a + e.x;
                                b = b + e.y
                            }
                            if (f) {
                                e = this.getSize();
                                a = CKEDITOR.document.getWindow().getViewPaneSize().width - e.width - a
                            }
                            b = { top: (b > 0 ? b : 0) + "px" };
                            b[f ? "right" : "left"] = (a > 0 ? a : 0) + "px";
                            d.setStyles(b);
                            c && (this._.moved = 1)
                        }
                    },
                    getPosition: function() {
                        return CKEDITOR.tools.extend({},
                            this._.position)
                    },
                    show: function() {
                        var a = this._.element, b = this.definition;
                        !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                        if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) {
                            var c = this.parts.dialog;
                            c.setStyle("position", "absolute");
                            setTimeout(function() { c.setStyle("position", "fixed") }, 0)
                        }
                        this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height ||
                            b.height || b.minHeight);
                        this.reset();
                        this.selectPage(this.definition.contents[0].id);
                        if (CKEDITOR.dialog._.currentZIndex === null)CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                        this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10);
                        if (CKEDITOR.dialog._.currentTop === null) {
                            CKEDITOR.dialog._.currentTop = this;
                            this._.parentDialog = null;
                            m(this._.editor)
                        } else {
                            this._.parentDialog = CKEDITOR.dialog._.currentTop;
                            this._.parentDialog.getElement().getFirst().$.style.zIndex -=
                                Math.floor(this._.editor.config.baseFloatZIndex / 2);
                            CKEDITOR.dialog._.currentTop = this
                        }
                        a.on("keydown", B);
                        a.on(CKEDITOR.env.opera ? "keypress" : "keyup", A);
                        this._.hasFocus = false;
                        CKEDITOR.tools.setTimeout(function() {
                                this.layout();
                                f(this);
                                this.parts.dialog.setStyle("visibility", "");
                                this.fireOnce("load", {});
                                CKEDITOR.ui.fire("ready", this);
                                this.fire("show", {});
                                this._.editor.fire("dialogShow", this);
                                this._.parentDialog || this._.editor.focusManager.lock();
                                this.foreach(function(a) { a.setInitValue && a.setInitValue() })
                            },
                            100, this)
                    },
                    layout: function() {
                        var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, f = (c.height - b.height) / 2;
                        CKEDITOR.env.ie6Compat || (b.height + (f > 0 ? f : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                        this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : f)
                    },
                    foreach: function(a) {
                        for (var b in this._.contents)for (var c in this._.contents[b])a.call(this, this._.contents[b][c]);
                        return this
                    },
                    reset: function() {
                        var a = function(a) { a.reset && a.reset(1) };
                        return function() {
                            this.foreach(a);
                            return this
                        }
                    }(),
                    setupContent: function() {
                        var a = arguments;
                        this.foreach(function(b) { b.setup && b.setup.apply(b, a) })
                    },
                    commitContent: function() {
                        var a = arguments;
                        this.foreach(function(b) {
                            CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                            b.commit && b.commit.apply(b, a)
                        })
                    },
                    hide: function() {
                        if (this.parts.dialog.isVisible()) {
                            this.fire("hide", {});
                            this._.editor.fire("dialogHide",
                                this);
                            this.selectPage(this._.tabIdList[0]);
                            var a = this._.element;
                            a.setStyle("display", "none");
                            this.parts.dialog.setStyle("visibility", "hidden");
                            for (C(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide();
                            if (this._.parentDialog) {
                                var b = this._.parentDialog.getElement().getFirst();
                                b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                            } else n(this._.editor);
                            if (CKEDITOR.dialog._.currentTop = this._.parentDialog)
                                CKEDITOR.dialog._.currentZIndex =
                                    CKEDITOR.dialog._.currentZIndex - 10;
                            else {
                                CKEDITOR.dialog._.currentZIndex = null;
                                a.removeListener("keydown", B);
                                a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", A);
                                var c = this._.editor;
                                c.focus();
                                setTimeout(function() { c.focusManager.unlock() }, 0)
                            }
                            delete this._.parentDialog;
                            this.foreach(function(a) { a.resetInitValue && a.resetInitValue() })
                        }
                    },
                    addPage: function(a) {
                        var b = [],
                            c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "",
                            d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                                type: "vbox",
                                className: "cke_dialog_page_contents",
                                children: a.elements,
                                expand: !!a.expand,
                                padding: a.padding,
                                style: a.style || "width: 100%;"
                            }, b),
                            b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                        b.setAttribute("role", "tabpanel");
                        var f = CKEDITOR.env,
                            e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(),
                            c = CKEDITOR.dom.element.createFromHtml([
                                '<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', f.gecko && f.version >= 10900 && !f.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">',
                                a.label, "</a>"
                            ].join(""));
                        b.setAttribute("aria-labelledby", e);
                        this._.tabs[a.id] = [c, b];
                        this._.tabIdList.push(a.id);
                        !a.hidden && this._.pageCount++;
                        this._.lastTab = c;
                        this.updateStyle();
                        e = this._.contents[a.id] = {};
                        for (f = d.getChild(); d = f.shift();) {
                            e[d.id] = d;
                            typeof d.getChild == "function" && f.push.apply(f, d.getChild())
                        }
                        b.setAttribute("name", a.id);
                        b.appendTo(this.parts.contents);
                        c.unselectable();
                        this.parts.tabs.append(c);
                        if (a.accessKey) {
                            z(this, this, "CTRL+" + a.accessKey, F, D);
                            this._.accessKeyMap["CTRL+" + a.accessKey] =
                                a.id
                        }
                    },
                    selectPage: function(b) {
                        if (this._.currentTabId != b && this.fire("selectPage", { page: b, currentPage: this._.currentTabId }) !== true) {
                            for (var c in this._.tabs) {
                                var d = this._.tabs[c][0], f = this._.tabs[c][1];
                                if (c != b) {
                                    d.removeClass("cke_dialog_tab_selected");
                                    f.hide()
                                }
                                f.setAttribute("aria-hidden", c != b)
                            }
                            var e = this._.tabs[b];
                            e[0].addClass("cke_dialog_tab_selected");
                            if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) {
                                a(e[1]);
                                e[1].show();
                                setTimeout(function() { a(e[1], 1) }, 0)
                            } else e[1].show();
                            this._.currentTabId = b;
                            this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, b)
                        }
                    },
                    updateStyle: function() { this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page") },
                    hidePage: function(a) {
                        var c = this._.tabs[a] && this._.tabs[a][0];
                        if (c && this._.pageCount != 1 && c.isVisible()) {
                            a == this._.currentTabId && this.selectPage(b.call(this));
                            c.hide();
                            this._.pageCount--;
                            this.updateStyle()
                        }
                    },
                    showPage: function(a) {
                        if (a = this._.tabs[a] && this._.tabs[a][0]) {
                            a.show();
                            this._.pageCount++;
                            this.updateStyle()
                        }
                    },
                    getElement: function() { return this._.element },
                    getName: function() { return this._.name },
                    getContentElement: function(a, b) {
                        var c = this._.contents[a];
                        return c && c[b]
                    },
                    getValueOf: function(a, b) { return this.getContentElement(a, b).getValue() },
                    setValueOf: function(a, b, c) { return this.getContentElement(a, b).setValue(c) },
                    getButton: function(a) { return this._.buttons[a] },
                    click: function(a) { return this._.buttons[a].click() },
                    disableButton: function(a) { return this._.buttons[a].disable() },
                    enableButton: function(a) { return this._.buttons[a].enable() },
                    getPageCount: function() { return this._.pageCount },
                    getParentEditor: function() { return this._.editor },
                    getSelectedElement: function() { return this.getParentEditor().getSelection().getSelectedElement() },
                    addFocusable: function(a, b) {
                        if (typeof b == "undefined") {
                            b = this._.focusList.length;
                            this._.focusList.push(new d(this, a, b))
                        } else {
                            this._.focusList.splice(b, 0, new d(this, a, b));
                            for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++
                        }
                    }
                };
                CKEDITOR.tools.extend(CKEDITOR.dialog, {
                    add: function(a, b) {
                        if (!this._.dialogDefinitions[a] || typeof b == "function")
                            this._.dialogDefinitions[a] =
                                b
                    },
                    exists: function(a) { return!!this._.dialogDefinitions[a] },
                    getCurrent: function() { return CKEDITOR.dialog._.currentTop },
                    okButton: function() {
                        var a = function(a, b) {
                            b = b || {};
                            return CKEDITOR.tools.extend({
                                id: "ok", type: "button", label: a.lang.common.ok, "class": "cke_dialog_ui_button_ok",
                                onClick: function(a) {
                                    a = a.data.dialog;
                                    a.fire("ok", { hide: true }).hide !== false && a.hide()
                                }
                            }, b, true)
                        };
                        a.type = "button";
                        a.override = function(b) { return CKEDITOR.tools.extend(function(c) { return a(c, b) }, { type: "button" }, true) };
                        return a
                    }(),
                    cancelButton: function() {
                        var a =
                            function(a, b) {
                                b = b || {};
                                return CKEDITOR.tools.extend({
                                    id: "cancel", type: "button", label: a.lang.common.cancel, "class": "cke_dialog_ui_button_cancel",
                                    onClick: function(a) {
                                        a = a.data.dialog;
                                        a.fire("cancel", { hide: true }).hide !== false && a.hide()
                                    }
                                }, b, true)
                            };
                        a.type = "button";
                        a.override = function(b) { return CKEDITOR.tools.extend(function(c) { return a(c, b) }, { type: "button" }, true) };
                        return a
                    }(),
                    addUIElement: function(a, b) { this._.uiElementBuilders[a] = b }
                });
                CKEDITOR.dialog._ = {
                    uiElementBuilders: {},
                    dialogDefinitions: {},
                    currentTop: null,
                    currentZIndex: null
                };
                CKEDITOR.event.implementOn(CKEDITOR.dialog);
                CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
                var t = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] },
                    r = function(a, b, c) {
                        for (var d = 0, f; f = a[d]; d++) {
                            if (f.id == b)return f;
                            if (c && f[c])if (f = r(f[c], b, c))return f
                        }
                        return null
                    },
                    s = function(a, b, c, d, f) {
                        if (c) {
                            for (var e = 0, g; g = a[e]; e++) {
                                if (g.id == c) {
                                    a.splice(e, 0, b);
                                    return b
                                }
                                if (d && g[d])if (g = s(g[d], b, c, d, true))return g
                            }
                            if (f)return null
                        }
                        a.push(b);
                        return b
                    },
                    x = function(a, b, c) {
                        for (var d = 0, f; f = a[d]; d++) {
                            if (f.id == b)return a.splice(d, 1);
                            if (c && f[c])if (f = x(f[c], b, c))return f
                        }
                        return null
                    },
                    y = function(a, b) {
                        this.dialog = a;
                        for (var d = b.contents, f = 0, e; e = d[f]; f++)d[f] = e && new c(a, e);
                        CKEDITOR.tools.extend(this, b)
                    };
                y.prototype = {
                    getContents: function(a) { return r(this.contents, a) },
                    getButton: function(a) { return r(this.buttons, a) },
                    addContents: function(a, b) { return s(this.contents, a, b) },
                    addButton: function(a, b) { return s(this.buttons, a, b) },
                    removeContents: function(a) {
                        x(this.contents,
                            a)
                    },
                    removeButton: function(a) { x(this.buttons, a) }
                };
                c.prototype = { get: function(a) { return r(this.elements, a, "children") }, add: function(a, b) { return s(this.elements, a, b, "children") }, remove: function(a) { x(this.elements, a, "children") } };
                var w,
                    v = {},
                    q,
                    u = {},
                    B = function(a) {
                        var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, f = String.fromCharCode(a.data.$.keyCode);
                        if ((b = u[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                            b = b[b.length - 1];
                            b.keydown && b.keydown.call(b.uiElement, b.dialog,
                                b.key);
                            a.data.preventDefault()
                        }
                    },
                    A = function(a) {
                        var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, f = String.fromCharCode(a.data.$.keyCode);
                        if ((b = u[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + f]) && b.length) {
                            b = b[b.length - 1];
                            if (b.keyup) {
                                b.keyup.call(b.uiElement, b.dialog, b.key);
                                a.data.preventDefault()
                            }
                        }
                    },
                    z = function(a, b, c, d, f) { (u[c] || (u[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: f || a.accessKeyUp, keydown: d || a.accessKeyDown }) },
                    C = function(a) {
                        for (var b in u) {
                            for (var c = u[b],
                                d = c.length - 1; d >= 0; d--)(c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                            c.length === 0 && delete u[b]
                        }
                    },
                    D = function(a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) },
                    F = function() {};
                (function() {
                    CKEDITOR.ui.dialog = {
                        uiElement: function(a, b, c, d, f, e, g) {
                            if (!(arguments.length < 4)) {
                                var i = (d.call ? d(b) : d) || "div", h = ["<", i, " "], j = (f && f.call ? f(b) : f) || {}, k = (e && e.call ? e(b) : e) || {}, o = (g && g.call ? g.call(this, a, b) : g) || "", p = this.domId = k.id || CKEDITOR.tools.getNextId() + "_uiElement";
                                this.id = b.id;
                                k.id = p;
                                var t = {};
                                b.type &&
                                (t["cke_dialog_ui_" + b.type] = 1);
                                b.className && (t[b.className] = 1);
                                b.disabled && (t.cke_disabled = 1);
                                for (var r = k["class"] && k["class"].split ? k["class"].split(" ") : [], p = 0; p < r.length; p++)r[p] && (t[r[p]] = 1);
                                r = [];
                                for (p in t)r.push(p);
                                k["class"] = r.join(" ");
                                if (b.title)k.title = b.title;
                                t = (b.style || "").split(";");
                                if (b.align) {
                                    r = b.align;
                                    j["margin-left"] = r == "left" ? 0 : "auto";
                                    j["margin-right"] = r == "right" ? 0 : "auto"
                                }
                                for (p in j)t.push(p + ":" + j[p]);
                                b.hidden && t.push("display:none");
                                for (p = t.length - 1; p >= 0; p--)
                                    t[p] === "" && t.splice(p,
                                        1);
                                if (t.length > 0)k.style = (k.style ? k.style + "; " : "") + t.join("; ");
                                for (p in k)h.push(p + '="' + CKEDITOR.tools.htmlEncode(k[p]) + '" ');
                                h.push(">", o, "</", i, ">");
                                c.push(h.join(""));
                                (this._ || (this._ = {})).dialog = a;
                                if (typeof b.isChanged == "boolean")this.isChanged = function() { return b.isChanged };
                                if (typeof b.isChanged == "function")this.isChanged = b.isChanged;
                                if (typeof b.setValue == "function")this.setValue = CKEDITOR.tools.override(this.setValue, function(a) { return function(c) { a.call(this, b.setValue.call(this, c)) } });
                                if (typeof b.getValue ==
                                    "function")this.getValue = CKEDITOR.tools.override(this.getValue, function(a) { return function() { return b.getValue.call(this, a.call(this)) } });
                                CKEDITOR.event.implementOn(this);
                                this.registerEvents(b);
                                this.accessKeyUp && (this.accessKeyDown && b.accessKey) && z(this, a, "CTRL+" + b.accessKey);
                                var l = this;
                                a.on("load", function() {
                                    var b = l.getInputElement();
                                    if (b) {
                                        var c = l.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                        b.on("focus", function() {
                                            a._.tabBarMode = false;
                                            a._.hasFocus =
                                                true;
                                            l.fire("focus");
                                            c && this.addClass(c)
                                        });
                                        b.on("blur", function() {
                                            l.fire("blur");
                                            c && this.removeClass(c)
                                        })
                                    }
                                });
                                if (this.keyboardFocusable) {
                                    this.tabIndex = b.tabIndex || 0;
                                    this.focusIndex = a._.focusList.push(this) - 1;
                                    this.on("focus", function() { a._.currentFocusIndex = l.focusIndex })
                                }
                                CKEDITOR.tools.extend(this, b)
                            }
                        },
                        hbox: function(a, b, c, d, f) {
                            if (!(arguments.length < 4)) {
                                this._ || (this._ = {});
                                var e = this._.children = b, g = f && f.widths || null, i = f && f.height || null, h, j = { role: "presentation" };
                                f && f.align && (j.align = f.align);
                                CKEDITOR.ui.dialog.uiElement.call(this,
                                    a, f || { type: "hbox" }, d, "table", {}, j, function() {
                                        var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                                        for (h = 0; h < c.length; h++) {
                                            var b = "cke_dialog_ui_hbox_child", d = [];
                                            h === 0 && (b = "cke_dialog_ui_hbox_first");
                                            h == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                            a.push('<td class="', b, '" role="presentation" ');
                                            g ? g[h] && d.push("width:" + o(g[h])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                            i && d.push("height:" + o(i));
                                            f && f.padding != void 0 && d.push("padding:" + o(f.padding));
                                            CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[h].align) && d.push("text-align:" +
                                                e[h].align);
                                            d.length > 0 && a.push('style="' + d.join("; ") + '" ');
                                            a.push(">", c[h], "</td>")
                                        }
                                        a.push("</tr></tbody>");
                                        return a.join("")
                                    })
                            }
                        },
                        vbox: function(a, b, c, d, f) {
                            if (!(arguments.length < 3)) {
                                this._ || (this._ = {});
                                var e = this._.children = b, g = f && f.width || null, i = f && f.heights || null;
                                CKEDITOR.ui.dialog.uiElement.call(this, a, f || { type: "vbox" }, d, "div", null, { role: "presentation" }, function() {
                                    var b = ['<table role="presentation" cellspacing="0" border="0" '];
                                    b.push('style="');
                                    f && f.expand && b.push("height:100%;");
                                    b.push("width:" +
                                        o(g || "100%"), ";");
                                    CKEDITOR.env.webkit && b.push("float:none;");
                                    b.push('"');
                                    b.push('align="', CKEDITOR.tools.htmlEncode(f && f.align || (a.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" ');
                                    b.push("><tbody>");
                                    for (var d = 0; d < c.length; d++) {
                                        var h = [];
                                        b.push('<tr><td role="presentation" ');
                                        g && h.push("width:" + o(g || "100%"));
                                        i ? h.push("height:" + o(i[d])) : f && f.expand && h.push("height:" + Math.floor(100 / c.length) + "%");
                                        f && f.padding != void 0 && h.push("padding:" + o(f.padding));
                                        CKEDITOR.env.ie && (CKEDITOR.env.quirks && e[d].align) &&
                                            h.push("text-align:" + e[d].align);
                                        h.length > 0 && b.push('style="', h.join("; "), '" ');
                                        b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                                    }
                                    b.push("</tbody></table>");
                                    return b.join("")
                                })
                            }
                        }
                    }
                })();
                CKEDITOR.ui.dialog.uiElement.prototype = {
                    getElement: function() { return CKEDITOR.document.getById(this.domId) },
                    getInputElement: function() { return this.getElement() },
                    getDialog: function() { return this._.dialog },
                    setValue: function(a, b) {
                        this.getInputElement().setValue(a);
                        !b && this.fire("change", { value: a });
                        return this
                    },
                    getValue: function() { return this.getInputElement().getValue() },
                    isChanged: function() { return false },
                    selectParentTab: function() {
                        for (var a = this.getInputElement(); (a = a.getParent()) && a.$.className.search("cke_dialog_page_contents") == -1;);
                        if (!a)return this;
                        a = a.getAttribute("name");
                        this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                        return this
                    },
                    focus: function() {
                        this.selectParentTab().getInputElement().focus();
                        return this
                    },
                    registerEvents: function(a) {
                        var b = /^on([A-Z]\w+)/,
                            c,
                            d = function(a, b, c, d) {
                                b.on("load",
                                    function() { a.getInputElement().on(c, d, a) })
                            },
                            f;
                        for (f in a)if (c = f.match(b))this.eventProcessors[f] ? this.eventProcessors[f].call(this, this._.dialog, a[f]) : d(this, this._.dialog, c[1].toLowerCase(), a[f]);
                        return this
                    },
                    eventProcessors: { onLoad: function(a, b) { a.on("load", b, this) }, onShow: function(a, b) { a.on("show", b, this) }, onHide: function(a, b) { a.on("hide", b, this) } },
                    accessKeyDown: function() { this.focus() },
                    accessKeyUp: function() {},
                    disable: function() {
                        var a = this.getElement();
                        this.getInputElement().setAttribute("disabled",
                            "true");
                        a.addClass("cke_disabled")
                    },
                    enable: function() {
                        var a = this.getElement();
                        this.getInputElement().removeAttribute("disabled");
                        a.removeClass("cke_disabled")
                    },
                    isEnabled: function() { return!this.getElement().hasClass("cke_disabled") },
                    isVisible: function() { return this.getInputElement().isVisible() },
                    isFocusable: function() { return!this.isEnabled() || !this.isVisible() ? false : true }
                };
                CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                    getChild: function(a) {
                        if (arguments.length <
                            1)return this._.children.concat();
                        a.splice || (a = [a]);
                        return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
                    }
                }, true);
                CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
                (function() {
                    var a = {
                        build: function(a, b, c) {
                            for (var d = b.children, f, e = [], g = [], i = 0; i < d.length && (f = d[i]); i++) {
                                var h = [];
                                e.push(h);
                                g.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, h))
                            }
                            return new CKEDITOR.ui.dialog[b.type](a,
                                g, e, c, b)
                        }
                    };
                    CKEDITOR.dialog.addUIElement("hbox", a);
                    CKEDITOR.dialog.addUIElement("vbox", a)
                })();
                CKEDITOR.dialogCommand = function(a, b) {
                    this.dialogName = a;
                    CKEDITOR.tools.extend(this, b, true)
                };
                CKEDITOR.dialogCommand.prototype = { exec: function(a) { CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function() { a.openDialog(this.dialogName) }, 0, this) : a.openDialog(this.dialogName) }, canUndo: false, editorFocus: 1 };
                (function() {
                    var a = /^([a]|[^a])+$/,
                        b = /^\d*$/,
                        c = /^\d*(?:\.\d+)?$/,
                        d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
                        f = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
                        e = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
                    CKEDITOR.VALIDATE_OR = 1;
                    CKEDITOR.VALIDATE_AND = 2;
                    CKEDITOR.dialog.validate = {
                        functions: function() {
                            var a = arguments;
                            return function() {
                                var b = this && this.getValue ? this.getValue() : a[0], c = void 0, d = CKEDITOR.VALIDATE_AND, f = [], e;
                                for (e = 0; e < a.length; e++)
                                    if (typeof a[e] == "function")f.push(a[e]);
                                    else break;
                                if (e < a.length && typeof a[e] == "string") {
                                    c = a[e];
                                    e++
                                }
                                e < a.length && typeof a[e] == "number" && (d = a[e]);
                                var g = d == CKEDITOR.VALIDATE_AND ? true : false;
                                for (e = 0; e < f.length; e++)
                                    g = d == CKEDITOR.VALIDATE_AND ?
                                        g && f[e](b) : g || f[e](b);
                                return!g ? c : true
                            }
                        },
                        regex: function(a, b) {
                            return function(c) {
                                c = this && this.getValue ? this.getValue() : c;
                                return!a.test(c) ? b : true
                            }
                        },
                        notEmpty: function(b) { return this.regex(a, b) },
                        integer: function(a) { return this.regex(b, a) },
                        number: function(a) { return this.regex(c, a) },
                        cssLength: function(a) { return this.functions(function(a) { return f.test(CKEDITOR.tools.trim(a)) }, a) },
                        htmlLength: function(a) { return this.functions(function(a) { return d.test(CKEDITOR.tools.trim(a)) }, a) },
                        inlineStyle: function(a) {
                            return this.functions(function(a) { return e.test(CKEDITOR.tools.trim(a)) },
                                a)
                        },
                        equals: function(a, b) { return this.functions(function(b) { return b == a }, b) },
                        notEqual: function(a, b) { return this.functions(function(b) { return b != a }, b) }
                    };
                    CKEDITOR.on("instanceDestroyed", function(a) {
                        if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                            for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide();
                            for (var c in v)v[c].remove();
                            v = {}
                        }
                        var a = a.editor._.storedDialogs, d;
                        for (d in a)a[d].destroy()
                    })
                })();
                CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                    openDialog: function(a, b) {
                        var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                        CKEDITOR.dialog._.currentTop === null && m(this);
                        if (typeof d == "function") {
                            c = this._.storedDialogs || (this._.storedDialogs = {});
                            c = c[a] || (c[a] = new CKEDITOR.dialog(this, a));
                            b && b.call(c, c);
                            c.show()
                        } else {
                            if (d == "failed") {
                                n(this);
                                throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                            }
                            typeof d == "string" && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
                                typeof CKEDITOR.dialog._.dialogDefinitions[a] != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                                this.openDialog(a,
                                    b)
                            }, this, 0, 1)
                        }
                        CKEDITOR.skin.loadPart("dialog");
                        return c
                    }
                })
            }(), CKEDITOR.plugins.add("dialog", {
                requires: "dialogui",
                init: function(b) {
                    b.on("contentDom", function() {
                        var h = b.editable();
                        h.attachListener(h, "dblclick", function(a) {
                            if (b.readOnly)return false;
                            a = { element: a.data.getTarget() };
                            b.fire("doubleclick", a);
                            a.dialog && b.openDialog(a.dialog);
                            return 1
                        })
                    })
                }
            }), function() {
                CKEDITOR.plugins.add("a11yhelp", {
                    requires: "dialog",
                    availableLangs: {
                        en: 1,
                        ar: 1,
                        bg: 1,
                        ca: 1,
                        et: 1,
                        cs: 1,
                        cy: 1,
                        da: 1,
                        de: 1,
                        el: 1,
                        eo: 1,
                        es: 1,
                        fa: 1,
                        fi: 1,
                        fr: 1,
                        gu: 1,
                        he: 1,
                        hi: 1,
                        hr: 1,
                        hu: 1,
                        it: 1,
                        ja: 1,
                        km: 1,
                        ku: 1,
                        lt: 1,
                        lv: 1,
                        mk: 1,
                        mn: 1,
                        nb: 1,
                        nl: 1,
                        no: 1,
                        pl: 1,
                        pt: 1,
                        "pt-br": 1,
                        ro: 1,
                        ru: 1,
                        sk: 1,
                        sl: 1,
                        sv: 1,
                        th: 1,
                        tr: 1,
                        ug: 1,
                        uk: 1,
                        vi: 1,
                        "zh-cn": 1
                    },
                    init: function(b) {
                        var h = this;
                        b.addCommand("a11yHelp", {
                            exec: function() {
                                var a = b.langCode, a = h.availableLangs[a] ? a : h.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en";
                                CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path + "dialogs/lang/" + a + ".js"), function() {
                                    b.lang.a11yhelp = h.langEntries[a];
                                    b.openDialog("a11yHelp")
                                })
                            },
                            modes: { wysiwyg: 1, source: 1 },
                            readOnly: 1,
                            canUndo: false
                        });
                        b.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                        CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js")
                    }
                })
            }(), CKEDITOR.plugins.add("about", {
                requires: "dialog",
                init: function(b) {
                    var h = b.addCommand("about", new CKEDITOR.dialogCommand("about"));
                    h.modes = { wysiwyg: 1, source: 1 };
                    h.canUndo = false;
                    h.readOnly = 1;
                    b.ui.addButton && b.ui.addButton("About", { label: b.lang.about.title, command: "about", toolbar: "about" });
                    CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
                }
            }), CKEDITOR.plugins.add("basicstyles",
            {
                init: function(b) {
                    var h = 0,
                        a = function(a, d, f, c) {
                            if (c) {
                                c = new CKEDITOR.style(c);
                                b.attachStyleStateChange(c, function(a) { !b.readOnly && b.getCommand(f).setState(a) });
                                b.addCommand(f, new CKEDITOR.styleCommand(c));
                                b.ui.addButton && b.ui.addButton(a, { label: d, command: f, toolbar: "basicstyles," + (h = h + 10) })
                            }
                        },
                        g = b.config,
                        e = b.lang.basicstyles;
                    a("Bold", e.bold, "bold", g.coreStyles_bold);
                    a("Italic", e.italic, "italic", g.coreStyles_italic);
                    a("Underline", e.underline, "underline", g.coreStyles_underline);
                    a("Strike", e.strike, "strike",
                        g.coreStyles_strike);
                    a("Subscript", e.subscript, "subscript", g.coreStyles_subscript);
                    a("Superscript", e.superscript, "superscript", g.coreStyles_superscript);
                    b.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
                }
            }), CKEDITOR.config.coreStyles_bold = { element: "strong", overrides: "b" }, CKEDITOR.config.coreStyles_italic = { element: "em", overrides: "i" }, CKEDITOR.config.coreStyles_underline = { element: "u" }, CKEDITOR.config.coreStyles_strike = { element: "strike" }, CKEDITOR.config.coreStyles_subscript =
            { element: "sub" }, CKEDITOR.config.coreStyles_superscript = { element: "sup" }, function() {
                var b = {
                    exec: function(b) {
                        var a = b.getCommand("blockquote").state, g = b.getSelection(), e = g && g.getRanges(true)[0];
                        if (e) {
                            var i = g.createBookmarks();
                            if (CKEDITOR.env.ie) {
                                var d = i[0].startNode, f = i[0].endNode, c;
                                if (d && d.getParent().getName() == "blockquote")
                                    for (c = d; c = c.getNext();)
                                        if (c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()) {
                                            d.move(c, true);
                                            break
                                        }
                                if (f && f.getParent().getName() == "blockquote")
                                    for (c = f; c = c.getPrevious();)
                                        if (c.type ==
                                            CKEDITOR.NODE_ELEMENT && c.isBlockBoundary()) {
                                            f.move(c);
                                            break
                                        }
                            }
                            var j = e.createIterator();
                            j.enlargeBr = b.config.enterMode != CKEDITOR.ENTER_BR;
                            if (a == CKEDITOR.TRISTATE_OFF) {
                                for (d = []; a = j.getNextParagraph();)d.push(a);
                                if (d.length < 1) {
                                    a = b.document.createElement(b.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                                    f = i.shift();
                                    e.insertNode(a);
                                    a.append(new CKEDITOR.dom.text("﻿", b.document));
                                    e.moveToBookmark(f);
                                    e.selectNodeContents(a);
                                    e.collapse(true);
                                    f = e.createBookmark();
                                    d.push(a);
                                    i.unshift(f)
                                }
                                c = d[0].getParent();
                                e = [];
                                for (f = 0; f < d.length; f++) {
                                    a = d[f];
                                    c = c.getCommonAncestor(a.getParent())
                                }
                                for (a = { table: 1, tbody: 1, tr: 1, ol: 1, ul: 1 }; a[c.getName()];)c = c.getParent();
                                for (f = null; d.length > 0;) {
                                    for (a = d.shift(); !a.getParent().equals(c);)a = a.getParent();
                                    a.equals(f) || e.push(a);
                                    f = a
                                }
                                for (; e.length > 0;) {
                                    a = e.shift();
                                    if (a.getName() == "blockquote") {
                                        for (f = new CKEDITOR.dom.documentFragment(b.document); a.getFirst();) {
                                            f.append(a.getFirst().remove());
                                            d.push(f.getLast())
                                        }
                                        f.replace(a)
                                    } else d.push(a)
                                }
                                e = b.document.createElement("blockquote");
                                for (e.insertBefore(d[0]); d.length >
                                    0;) {
                                    a = d.shift();
                                    e.append(a)
                                }
                            } else if (a == CKEDITOR.TRISTATE_ON) {
                                f = [];
                                for (c = {}; a = j.getNextParagraph();) {
                                    for (d = e = null; a.getParent();) {
                                        if (a.getParent().getName() == "blockquote") {
                                            e = a.getParent();
                                            d = a;
                                            break
                                        }
                                        a = a.getParent()
                                    }
                                    if (e && d && !d.getCustomData("blockquote_moveout")) {
                                        f.push(d);
                                        CKEDITOR.dom.element.setMarker(c, d, "blockquote_moveout", true)
                                    }
                                }
                                CKEDITOR.dom.element.clearAllMarkers(c);
                                a = [];
                                d = [];
                                for (c = {}; f.length > 0;) {
                                    j = f.shift();
                                    e = j.getParent();
                                    if (j.getPrevious())
                                        if (j.getNext()) {
                                            j.breakParent(j.getParent());
                                            d.push(j.getNext())
                                        } else j.remove().insertAfter(e);
                                    else j.remove().insertBefore(e);
                                    if (!e.getCustomData("blockquote_processed")) {
                                        d.push(e);
                                        CKEDITOR.dom.element.setMarker(c, e, "blockquote_processed", true)
                                    }
                                    a.push(j)
                                }
                                CKEDITOR.dom.element.clearAllMarkers(c);
                                for (f = d.length - 1; f >= 0; f--) {
                                    e = d[f];
                                    a: {
                                        c = e;
                                        for (var j = 0, k = c.getChildCount(), l = void 0; j < k && (l = c.getChild(j)); j++)
                                            if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) {
                                                c = false;
                                                break a
                                            }
                                        c = true
                                    }
                                    c && e.remove()
                                }
                                if (b.config.enterMode == CKEDITOR.ENTER_BR)
                                    for (e = true; a.length;) {
                                        j = a.shift();
                                        if (j.getName() == "div") {
                                            f =
                                                new CKEDITOR.dom.documentFragment(b.document);
                                            e && (j.getPrevious() && !(j.getPrevious().type == CKEDITOR.NODE_ELEMENT && j.getPrevious().isBlockBoundary())) && f.append(b.document.createElement("br"));
                                            for (e = j.getNext() && !(j.getNext().type == CKEDITOR.NODE_ELEMENT && j.getNext().isBlockBoundary()); j.getFirst();)j.getFirst().remove().appendTo(f);
                                            e && f.append(b.document.createElement("br"));
                                            f.replace(j);
                                            e = false
                                        }
                                    }
                            }
                            g.selectBookmarks(i);
                            b.focus()
                        }
                    },
                    refresh: function(b, a) {
                        this.setState(b.elementPath(a.block || a.blockLimit).contains("blockquote",
                            1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    },
                    context: "blockquote"
                };
                CKEDITOR.plugins.add("blockquote", {
                    init: function(h) {
                        if (!h.blockless) {
                            h.addCommand("blockquote", b);
                            h.ui.addButton && h.ui.addButton("Blockquote", { label: h.lang.blockquote.toolbar, command: "blockquote", toolbar: "blocks,10" })
                        }
                    }
                })
            }(), "use strict", function() {
                function b(a) {
                    function b() {
                        var c = a.editable();
                        c.on(u, function(a) { (!CKEDITOR.env.ie || !w) && s(a) });
                        CKEDITOR.env.ie && c.on("paste", function(b) {
                            if (!v) {
                                g();
                                b.data.preventDefault();
                                s(b);
                                h("paste") ||
                                    a.openDialog("paste")
                            }
                        });
                        if (CKEDITOR.env.ie) {
                            c.on("contextmenu", i, null, null, 0);
                            c.on("beforepaste", function(a) { a.data && !a.data.$.ctrlKey && i() }, null, null, 0)
                        }
                        c.on("beforecut", function() { !w && o(a) });
                        (CKEDITOR.env.ie ? c : a.document.getDocumentElement()).on("mouseup", function() { setTimeout(function() { x() }, 0) });
                        c.on("keyup", x)
                    }

                    function c(b) {
                        return{
                            type: b,
                            canUndo: b == "cut",
                            startDisabled: true,
                            exec: function() {
                                this.type == "cut" && o();
                                var b;
                                var c = this.type;
                                if (CKEDITOR.env.ie)b = h(c);
                                else
                                    try {
                                        b = a.document.$.execCommand(c,
                                            false, null)
                                    } catch (f) {
                                        b = false
                                    }
                                b || alert(a.lang.clipboard[this.type + "Error"]);
                                return b
                            }
                        }
                    }

                    function e() {
                        return{
                            canUndo: false, async: true,
                            exec: function(a, b) {
                                var c = function(b, c) {
                                        b && n(b.type, b.dataValue, !!c);
                                        a.fire("afterCommandExec", { name: "paste", command: d, returnValue: !!b })
                                    },
                                    d = this;
                                typeof b == "string" ? c({ type: "auto", dataValue: b }, 1) : a.getClipboardData(c)
                            }
                        }
                    }

                    function g() {
                        v = 1;
                        setTimeout(function() { v = 0 }, 100)
                    }

                    function i() {
                        w = 1;
                        setTimeout(function() { w = 0 }, 10)
                    }

                    function h(b) {
                        var c = a.document,
                            f = c.getBody(),
                            e = false,
                            g =
                                function() { e = true };
                        f.on(b, g);
                        (CKEDITOR.env.version > 7 ? c.$ : c.$.selection.createRange()).execCommand(b);
                        f.removeListener(b, g);
                        return e
                    }

                    function n(b, c, f) {
                        b = { type: b };
                        if (f && !a.fire("beforePaste", b) || !c)return false;
                        b.dataValue = c;
                        return a.fire("paste", b)
                    }

                    function o() {
                        if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                            var b = a.getSelection(), c, f, e;
                            if (b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement())) {
                                f = b.getRanges()[0];
                                e = a.document.createText("");
                                e.insertBefore(c);
                                f.setStartBefore(e);
                                f.setEndAfter(c);
                                b.selectRanges([f]);
                                setTimeout(function() {
                                    if (c.getParent()) {
                                        e.remove();
                                        b.selectElement(c)
                                    }
                                }, 0)
                            }
                        }
                    }

                    function p(b, c) {
                        var f = a.document, e = a.editable(), g = function(a) { a.cancel() }, i = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902;
                        if (!f.getById("cke_pastebin")) {
                            var h = a.getSelection(), j = h.createBookmarks(), k = new CKEDITOR.dom.element(e.is("body") && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", f);
                            k.setAttribute("id", "cke_pastebin");
                            CKEDITOR.env.opera && k.appendBogus();
                            var o = 0, f = f.getWindow();
                            if (i) {
                                k.insertAfter(j[0].startNode);
                                k.setStyle("display", "inline")
                            } else {
                                if (CKEDITOR.env.webkit) {
                                    e.append(k);
                                    k.addClass("cke_editable");
                                    o = (e.is("body") ? e : CKEDITOR.dom.element.get(k.$.offsetParent)).getDocumentPosition().y
                                } else e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(k);
                                k.setStyles({ position: "absolute", top: f.getScrollPosition().y - o + 10 + "px", width: "1px", height: Math.max(1, f.getViewPaneSize().height - 20) + "px", overflow: "hidden", margin: 0, padding: 0 })
                            }
                            if (i = k.getParent().isReadOnly()) {
                                k.setOpacity(0);
                                k.setAttribute("contenteditable",
                                    true)
                            } else k.setStyle(a.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
                            a.on("selectionChange", g, null, null, 0);
                            i && k.focus();
                            i = new CKEDITOR.dom.range(k);
                            i.selectNodeContents(k);
                            var p = i.select();
                            if (CKEDITOR.env.ie)var t = e.once("blur", function() { a.lockSelection(p) });
                            var r = CKEDITOR.document.getWindow().getScrollPosition().y;
                            setTimeout(function() {
                                if (CKEDITOR.env.webkit || CKEDITOR.env.opera)CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = r;
                                t && t.removeListener();
                                CKEDITOR.env.ie && e.focus();
                                h.selectBookmarks(j);
                                k.remove();
                                var b;
                                if (CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span"))k = b;
                                a.removeListener("selectionChange", g);
                                c(k.getHtml())
                            }, 0)
                        }
                    }

                    function t() {
                        if (CKEDITOR.env.ie) {
                            a.focus();
                            g();
                            var b = a.focusManager;
                            b.lock();
                            if (a.editable().fire(u) && !h("paste")) {
                                b.unlock();
                                return false
                            }
                            b.unlock()
                        } else
                            try {
                                if (a.editable().fire(u) && !a.document.$.execCommand("Paste", false, null))throw 0;
                            } catch (c) {
                                return false
                            }
                        return true
                    }

                    function r(b) {
                        if (a.mode ==
                            "wysiwyg")
                            switch (b.data.keyCode) {
                            case CKEDITOR.CTRL + 86:
                            case CKEDITOR.SHIFT + 45:
                                b = a.editable();
                                g();
                                !CKEDITOR.env.ie && b.fire("beforepaste");
                                (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste");
                                break;
                            case CKEDITOR.CTRL + 88:
                            case CKEDITOR.SHIFT + 46:
                                a.fire("saveSnapshot");
                                setTimeout(function() { a.fire("saveSnapshot") }, 0)
                            }
                    }

                    function s(b) {
                        var c = { type: "auto" }, f = a.fire("beforePaste", c);
                        p(b, function(a) {
                            a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                            f && n(c.type, a, 0,
                                1)
                        })
                    }

                    function x() {
                        if (a.mode == "wysiwyg") {
                            var b = y("Paste");
                            a.getCommand("cut").setState(y("Cut"));
                            a.getCommand("copy").setState(y("Copy"));
                            a.getCommand("paste").setState(b);
                            a.fire("pasteState", b)
                        }
                    }

                    function y(b) {
                        var c;
                        if (q && b in { Paste: 1, Cut: 1 })return CKEDITOR.TRISTATE_DISABLED;
                        if (b == "Paste") {
                            CKEDITOR.env.ie && (w = 1);
                            try {
                                c = a.document.$.queryCommandEnabled(b) || CKEDITOR.env.webkit
                            } catch (f) {
                            }
                            w = 0
                        } else {
                            b = a.getSelection();
                            c = b.getRanges();
                            c = b.getType() != CKEDITOR.SELECTION_NONE && !(c.length == 1 && c[0].collapsed)
                        }
                        return c ?
                            CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                    }

                    var w = 0, v = 0, q = 0, u = CKEDITOR.env.ie ? "beforepaste" : "paste";
                    (function() {
                        a.on("key", r);
                        a.on("contentDom", b);
                        a.on("selectionChange", function(a) {
                            q = a.data.selection.getRanges()[0].checkReadOnly();
                            x()
                        });
                        a.contextMenu && a.contextMenu.addListener(function(a, b) {
                            q = b.getRanges()[0].checkReadOnly();
                            return{ cut: y("Cut"), copy: y("Copy"), paste: y("Paste") }
                        })
                    })();
                    (function() {
                        function b(c, f, e, g, i) {
                            var h = a.lang.clipboard[f];
                            a.addCommand(f, e);
                            a.ui.addButton && a.ui.addButton(c,
                            { label: h, command: f, toolbar: "clipboard," + g });
                            a.addMenuItems && a.addMenuItem(f, { label: h, command: f, group: "clipboard", order: i })
                        }

                        b("Cut", "cut", c("cut"), 10, 1);
                        b("Copy", "copy", c("copy"), 20, 4);
                        b("Paste", "paste", e(), 30, 8)
                    })();
                    a.getClipboardData = function(b, c) {
                        function f(a) {
                            a.removeListener();
                            a.cancel();
                            c(a.data)
                        }

                        function e(a) {
                            a.removeListener();
                            a.cancel();
                            j = true;
                            c({ type: h, dataValue: a.data })
                        }

                        function g() { this.customTitle = b && b.title }

                        var i = false, h = "auto", j = false;
                        if (!c) {
                            c = b;
                            b = null
                        }
                        a.on("paste", f, null, null, 0);
                        a.on("beforePaste",
                            function(a) {
                                a.removeListener();
                                i = true;
                                h = a.data.type
                            }, null, null, 1E3);
                        if (t() === false) {
                            a.removeListener("paste", f);
                            if (i && a.fire("pasteDialog", g)) {
                                a.on("pasteDialogCommit", e);
                                a.on("dialogHide", function(a) {
                                    a.removeListener();
                                    a.data.removeListener("pasteDialogCommit", e);
                                    setTimeout(function() { j || c(null) }, 10)
                                })
                            } else c(null)
                        }
                    }
                }

                function h(a) {
                    if (CKEDITOR.env.webkit) {
                        if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return"html"
                    } else if (CKEDITOR.env.ie) {
                        if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) &&
                            !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return"html"
                    } else if (CKEDITOR.env.gecko || CKEDITOR.env.opera) {
                        if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return"html"
                    } else return"html";
                    return"htmlifiedtext"
                }

                function a(a, b) {
                    function c(a) { return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "") }

                    b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
                    b = b.replace(/<\/?[A-Z]+>/g, function(a) { return a.toLowerCase() });
                    if (b.match(/^[^<]$/))return b;
                    if (CKEDITOR.env.webkit && b.indexOf("<div>") >
                        -1) {
                        b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>");
                        b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) { return c(a.split("</div><div>").length + 1) }) + "</p>");
                        b = b.replace(/<\/div><div>/g, "<br>");
                        b = b.replace(/<\/?div>/g, "")
                    }
                    if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) {
                        CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>"));
                        b.indexOf("<br><br>") > -1 && (b = "<p>" +
                            b.replace(/(<br>){2,}/g, function(a) { return c(a.length / 4) }) + "</p>")
                    }
                    return i(a, b)
                }

                function g() {
                    var a = new CKEDITOR.htmlParser.filter,
                        b = { blockquote: 1, dl: 1, fieldset: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ol: 1, p: 1, table: 1, ul: 1 },
                        c = CKEDITOR.tools.extend({ br: 0 }, CKEDITOR.dtd.$inline),
                        e = { p: 1, br: 1, "cke:br": 1 },
                        g = CKEDITOR.dtd,
                        i = CKEDITOR.tools.extend({ area: 1, basefont: 1, embed: 1, iframe: 1, map: 1, object: 1, param: 1 }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata),
                        h = function(a) {
                            delete a.name;
                            a.add(new CKEDITOR.htmlParser.text(" "))
                        },
                        n = function(a) {
                            for (var b = a, c; (b = b.next) && b.name && b.name.match(/^h\d$/);) {
                                c = new CKEDITOR.htmlParser.element("cke:br");
                                c.isEmpty = true;
                                for (a.add(c); c = b.children.shift();)a.add(c)
                            }
                        };
                    a.addRules({
                        elements: {
                            h1: n,
                            h2: n,
                            h3: n,
                            h4: n,
                            h5: n,
                            h6: n,
                            img: function(a) {
                                var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " ";
                                a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] ");
                                return new CKEDITOR.htmlParser.text(b)
                            },
                            td: h,
                            th: h,
                            $: function(a) {
                                var d = a.name, h;
                                if (i[d])return false;
                                delete a.attributes;
                                if (d == "br")return a;
                                if (b[d])
                                    a.name =
                                        "p";
                                else if (c[d])delete a.name;
                                else if (g[d]) {
                                    h = new CKEDITOR.htmlParser.element("cke:br");
                                    h.isEmpty = true;
                                    if (CKEDITOR.dtd.$empty[d])return h;
                                    a.add(h, 0);
                                    h = h.clone();
                                    h.isEmpty = true;
                                    a.add(h);
                                    delete a.name
                                }
                                e[a.name] || delete a.name;
                                return a
                            }
                        }
                    });
                    return a
                }

                function e(a, b, c) {
                    var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), e = new CKEDITOR.htmlParser.basicWriter;
                    b.writeHtml(e, c);
                    var b = e.getHtml(),
                        b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g,
                            "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""),
                        g = 0,
                        b = b.replace(/<\/?p>/g, function(a) {
                            if (a == "<p>") {
                                if (++g > 1)return"</p><p>"
                            } else if (--g > 0)return"</p><p>";
                            return a
                        }).replace(/<p><\/p>/g, "");
                    return i(a, b)
                }

                function i(a, b) {
                    a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) { return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2) }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
                    return b
                }

                CKEDITOR.plugins.add("clipboard", {
                    requires: "dialog",
                    init: function(d) {
                        var f;
                        b(d);
                        CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                        d.on("paste", function(a) {
                            var b = a.data.dataValue, d = CKEDITOR.dtd.$block;
                            if (b.indexOf("Apple-") > -1) {
                                b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
                                a.data.type != "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) { return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;") }));
                                if (b.indexOf('<br class="Apple-interchange-newline">') >
                                    -1) {
                                    a.data.startsWithEOL = 1;
                                    a.data.preSniffing = "html";
                                    b = b.replace(/<br class="Apple-interchange-newline">/, "")
                                }
                                b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                            }
                            if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                                var f, e, g = new CKEDITOR.dom.element("div");
                                for (g.setHtml(b); g.getChildCount() == 1 && (f = g.getFirst()) && f.type == CKEDITOR.NODE_ELEMENT && (f.hasClass("cke_editable") || f.hasClass("cke_contents"));)g = e = f;
                                e && (b = e.getHtml().replace(/<br>$/i, ""))
                            }
                            CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b,
                                f) {
                                if (f.toLowerCase() in d) {
                                    a.data.preSniffing = "html";
                                    return"<" + f
                                }
                                return b
                            }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, f) {
                                if (f in d) {
                                    a.data.endsWithEOL = 1;
                                    return"</" + f + ">"
                                }
                                return b
                            }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                            a.data.dataValue = b
                        }, null, null, 3);
                        d.on("paste", function(b) {
                            var b = b.data, i = b.type, k = b.dataValue, l, m = d.config.clipboard_defaultContentType || "html";
                            l = i == "html" || b.preSniffing == "html" ? "html" : h(k);
                            l == "htmlifiedtext" ? k = a(d.config, k) : i == "text" && l ==
                                "html" && (k = e(d.config, k, f || (f = g(d))));
                            b.startsWithEOL && (k = '<br data-cke-eol="1">' + k);
                            b.endsWithEOL && (k = k + '<br data-cke-eol="1">');
                            i == "auto" && (i = l == "html" || m == "html" ? "html" : "text");
                            b.type = i;
                            b.dataValue = k;
                            delete b.preSniffing;
                            delete b.startsWithEOL;
                            delete b.endsWithEOL
                        }, null, null, 6);
                        d.on("paste", function(a) {
                            a = a.data;
                            d.insertHtml(a.dataValue, a.type);
                            setTimeout(function() { d.fire("afterPaste") }, 0)
                        }, null, null, 1E3);
                        d.on("pasteDialog", function(a) { setTimeout(function() { d.openDialog("paste", a.data) }, 0) })
                    }
                })
            }(),
            function() {
                CKEDITOR.plugins.add("panel", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } });
                CKEDITOR.UI_PANEL = "panel";
                CKEDITOR.ui.panel = function(a, b) {
                    b && CKEDITOR.tools.extend(this, b);
                    CKEDITOR.tools.extend(this, { className: "", css: [] });
                    this.id = CKEDITOR.tools.getNextId();
                    this.document = a;
                    this.isFramed = this.forceIFrame || this.css.length;
                    this._ = { blocks: {} }
                };
                CKEDITOR.ui.panel.handler = { create: function(a) { return new CKEDITOR.ui.panel(a) } };
                var b = CKEDITOR.addTemplate("panel",
                        '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'),
                    h = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="application" frameborder="0" src="{src}"></iframe>'),
                    a = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
                CKEDITOR.ui.panel.prototype = {
                    render: function(g, e) {
                        this.getHolderElement = function() {
                            var b = this._.holder;
                            if (!b) {
                                if (this.isFramed) {
                                    var b = this.document.getById(this.id + "_frame"), c = b.getParent(), b = b.getFrameDocument();
                                    CKEDITOR.env.iOS && c.setStyles({ overflow: "scroll", "-webkit-overflow-scrolling": "touch" });
                                    c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                                        this.isLoaded = true;
                                        if (this.onLoad)this.onLoad()
                                    }, this));
                                    b.write(a.output(CKEDITOR.tools.extend({
                                        css: CKEDITOR.tools.buildStyleHtml(this.css),
                                        onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");"
                                    }, i)));
                                    b.getWindow().$.CKEDITOR = CKEDITOR;
                                    b.on("key" + (CKEDITOR.env.opera ? "press" : "down"), function(a) {
                                        var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir");
                                        this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault()
                                    }, this);
                                    b = b.getBody();
                                    b.unselectable();
                                    CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
                                } else b = this.document.getById(this.id);
                                this._.holder = b
                            }
                            return b
                        };
                        var i = { editorId: g.id, id: this.id, langCode: g.langCode, dir: g.lang.dir, cls: this.className, frame: "", env: CKEDITOR.env.cssClass, "z-index": g.config.baseFloatZIndex + 1 };
                        if (this.isFramed)i.frame = h.output({ id: this.id + "_frame", src: "javascript:void(document.open()," + (CKEDITOR.env.isCustomDomain() ? "document.domain='" + document.domain + "'," : "") + 'document.close())">' });
                        var d = b.output(i);
                        e && e.push(d);
                        return d
                    },
                    addBlock: function(a, b) {
                        b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b :
                            new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
                        this._.currentBlock || this.showBlock(a);
                        return b
                    },
                    getBlock: function(a) { return this._.blocks[a] },
                    showBlock: function(a) {
                        var a = this._.blocks[a], b = this._.currentBlock, i = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                        if (b) {
                            i.removeAttributes(b.attributes);
                            b.hide()
                        }
                        this._.currentBlock = a;
                        i.setAttributes(a.attributes);
                        CKEDITOR.fire("ariaWidget", i);
                        a._.focusIndex = -1;
                        this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown,
                            a);
                        a.show();
                        return a
                    },
                    destroy: function() { this.element && this.element.remove() }
                };
                CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
                    $: function(a, b) {
                        this.element = a.append(a.getDocument().createElement("div", { attributes: { tabIndex: -1, "class": "cke_panel_block", role: "presentation" }, styles: { display: "none" } }));
                        b && CKEDITOR.tools.extend(this, b);
                        if (!this.attributes.title)this.attributes.title = this.attributes["aria-label"];
                        this.keys = {};
                        this._.focusIndex = -1;
                        this.element.disableContextMenu()
                    },
                    _: {
                        markItem: function(a) {
                            if (a !=
                                -1) {
                                a = this.element.getElementsByTag("a").getItem(this._.focusIndex = a);
                                (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus();
                                a.focus();
                                this.onMark && this.onMark(a)
                            }
                        }
                    },
                    proto: {
                        show: function() { this.element.setStyle("display", "") },
                        hide: function() { (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none") },
                        onKeyDown: function(a) {
                            var b = this.keys[a];
                            switch (b) {
                            case "next":
                                for (var a = this._.focusIndex, b = this.element.getElementsByTag("a"), i; i = b.getItem(++a);)
                                    if (i.getAttribute("_cke_focus") &&
                                        i.$.offsetWidth) {
                                        this._.focusIndex = a;
                                        i.focus();
                                        break
                                    }
                                return false;
                            case "prev":
                                a = this._.focusIndex;
                                for (b = this.element.getElementsByTag("a"); a > 0 && (i = b.getItem(--a));)
                                    if (i.getAttribute("_cke_focus") && i.$.offsetWidth) {
                                        this._.focusIndex = a;
                                        i.focus();
                                        break
                                    }
                                return false;
                            case "click":
                            case "mouseup":
                                a = this._.focusIndex;
                                (i = a >= 0 && this.element.getElementsByTag("a").getItem(a)) && (i.$[b] ? i.$[b]() : i.$["on" + b]());
                                return false
                            }
                            return true
                        }
                    }
                })
            }(), CKEDITOR.plugins.add("floatpanel", { requires: "panel" }), function() {
                function b(a,
                    b, e, i, d) {
                    var d = CKEDITOR.tools.genKey(b.getUniqueId(), e.getUniqueId(), a.lang.dir, a.uiColor || "", i.css || "", d || ""), f = h[d];
                    if (!f) {
                        f = h[d] = new CKEDITOR.ui.panel(b, i);
                        f.element = e.append(CKEDITOR.dom.element.createFromHtml(f.render(a), b));
                        f.element.setStyles({ display: "none", position: "absolute" })
                    }
                    return f
                }

                var h = {};
                CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
                    $: function(a, g, e, i) {
                        function d() { k.hide() }

                        e.forceIFrame = 1;
                        e.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (g = CKEDITOR.document.getById("cke_" +
                            a.name));
                        var f = g.getDocument(), i = b(a, f, g, e, i || 0), c = i.element, h = c.getFirst(), k = this;
                        c.disableContextMenu();
                        c.setAttribute("role", "application");
                        this.element = c;
                        this._ = { editor: a, panel: i, parentElement: g, definition: e, document: f, iframe: h, children: [], dir: a.lang.dir };
                        a.on("mode", d);
                        a.on("resize", d);
                        f.getWindow().on("resize", d)
                    },
                    proto: {
                        addBlock: function(a, b) { return this._.panel.addBlock(a, b) },
                        addListBlock: function(a, b) { return this._.panel.addListBlock(a, b) },
                        getBlock: function(a) { return this._.panel.getBlock(a) },
                        showBlock: function(a, b, e, i, d) {
                            var f = this._.panel, c = f.showBlock(a);
                            this.allowBlur(false);
                            a = this._.editor.editable();
                            this._.returnFocus = a.hasFocus ? a : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                            var h = this.element, a = this._.iframe, a = CKEDITOR.env.ie ? a : new CKEDITOR.dom.window(a.$.contentWindow), k = h.getDocument(), l = this._.parentElement.getPositionedAncestor(), m = b.getDocumentPosition(k), k = l ? l.getDocumentPosition(k) : { x: 0, y: 0 }, n = this._.dir == "rtl", o = m.x + (i || 0) - k.x, p = m.y + (d || 0) - k.y;
                            if (n && (e == 1 ||
                                e == 4))o = o + b.$.offsetWidth;
                            else if (!n && (e == 2 || e == 3))o = o + (b.$.offsetWidth - 1);
                            if (e == 3 || e == 4)p = p + (b.$.offsetHeight - 1);
                            this._.panel._.offsetParentId = b.getId();
                            h.setStyles({ top: p + "px", left: 0, display: "" });
                            h.setOpacity(0);
                            h.getFirst().removeStyle("width");
                            this._.editor.focusManager.add(a);
                            if (!this._.blurSet) {
                                CKEDITOR.event.useCapture = true;
                                a.on("blur", function(a) {
                                        if (this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild) {
                                            delete this._.returnFocus;
                                            this.hide()
                                        }
                                    },
                                    this);
                                a.on("focus", function() {
                                    this._.focused = true;
                                    this.hideChild();
                                    this.allowBlur(true)
                                }, this);
                                CKEDITOR.event.useCapture = false;
                                this._.blurSet = 1
                            }
                            f.onEscape = CKEDITOR.tools.bind(function(a) { if (this.onEscape && this.onEscape(a) === false)return false }, this);
                            CKEDITOR.tools.setTimeout(function() {
                                var a = CKEDITOR.tools.bind(function() {
                                    h.removeStyle("width");
                                    if (c.autoSize) {
                                        var a = c.element.getDocument(), a = (CKEDITOR.env.webkit ? c.element : a.getBody()).$.scrollWidth;
                                        CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a +
                                        ((h.$.offsetWidth || 0) - (h.$.clientWidth || 0) + 3));
                                        h.setStyle("width", a + 10 + "px");
                                        a = c.element.$.scrollHeight;
                                        CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((h.$.offsetHeight || 0) - (h.$.clientHeight || 0) + 3));
                                        h.setStyle("height", a + "px");
                                        f._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                                    } else h.removeStyle("height");
                                    n && (o = o - h.$.offsetWidth);
                                    h.setStyle("left", o + "px");
                                    var b = f.element.getWindow(),
                                        a = h.$.getBoundingClientRect(),
                                        b = b.getViewPaneSize(),
                                        d = a.width || a.right - a.left,
                                        e = a.height ||
                                            a.bottom - a.top,
                                        g = n ? a.right : b.width - a.left,
                                        i = n ? b.width - a.right : a.left;
                                    n ? g < d && (o = i > d ? o + d : b.width > d ? o - a.left : o - a.right + b.width) : g < d && (o = i > d ? o - d : b.width > d ? o - a.right + b.width : o - a.left);
                                    d = a.top;
                                    b.height - a.top < e && (p = d > e ? p - e : b.height > e ? p - a.bottom + b.height : p - a.top);
                                    if (CKEDITOR.env.ie) {
                                        b = a = new CKEDITOR.dom.element(h.$.offsetParent);
                                        b.getName() == "html" && (b = b.getDocument().getBody());
                                        b.getComputedStyle("direction") == "rtl" && (o = CKEDITOR.env.ie8Compat ? o - h.getDocument().getDocumentElement().$.scrollLeft * 2 : o - (a.$.scrollWidth -
                                            a.$.clientWidth))
                                    }
                                    var a = h.getFirst(), k;
                                    (k = a.getCustomData("activePanel")) && k.onHide && k.onHide.call(this, 1);
                                    a.setCustomData("activePanel", this);
                                    h.setStyles({ top: p + "px", left: o + "px" });
                                    h.setOpacity(1)
                                }, this);
                                f.isLoaded ? a() : f.onLoad = a;
                                CKEDITOR.tools.setTimeout(function() {
                                    this.focus();
                                    this.allowBlur(true);
                                    this._.editor.fire("panelShow", this)
                                }, 0, this)
                            }, CKEDITOR.env.air ? 200 : 0, this);
                            this.visible = 1;
                            this.onShow && this.onShow.call(this)
                        },
                        focus: function() {
                            if (CKEDITOR.env.webkit) {
                                var a = CKEDITOR.document.getActive();
                                !a.equals(this._.iframe) && a.$.blur()
                            }
                            (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                        },
                        blur: function() {
                            var a = this._.iframe.getFrameDocument().getActive();
                            a.is("a") && (this._.lastFocused = a)
                        },
                        hide: function(a) {
                            if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                                this.hideChild();
                                CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                                this.element.setStyle("display", "none");
                                this.visible = 0;
                                this.element.getFirst().removeCustomData("activePanel");
                                if (a =
                                    a && this._.returnFocus) {
                                    CKEDITOR.env.webkit && a.type && a.getWindow().$.focus();
                                    a.focus()
                                }
                                delete this._.lastFocused;
                                this._.editor.fire("panelHide", this)
                            }
                        },
                        allowBlur: function(a) {
                            var b = this._.panel;
                            if (a != void 0)b.allowBlur = a;
                            return b.allowBlur
                        },
                        showAsChild: function(a, b, e, i, d, f) {
                            if (!(this._.activeChild == a && a._.panel._.offsetParentId == e.getId())) {
                                this.hideChild();
                                a.onHide = CKEDITOR.tools.bind(function() { CKEDITOR.tools.setTimeout(function() { this._.focused || this.hide() }, 0, this) }, this);
                                this._.activeChild = a;
                                this._.focused =
                                    false;
                                a.showBlock(b, e, i, d, f);
                                this.blur();
                                (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() { a.element.getChild(0).$.style.cssText += "" }, 100)
                            }
                        },
                        hideChild: function(a) {
                            var b = this._.activeChild;
                            if (b) {
                                delete b.onHide;
                                delete this._.activeChild;
                                b.hide();
                                a && this.focus()
                            }
                        }
                    }
                });
                CKEDITOR.on("instanceDestroyed", function() {
                    var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances), b;
                    for (b in h) {
                        var e = h[b];
                        a ? e.destroy() : e.element.hide()
                    }
                    a && (h = {})
                })
            }(), CKEDITOR.plugins.add("menu", {
                requires: "floatpanel",
                beforeInit: function(b) {
                    for (var h = b.config.menu_groups.split(","), a = b._.menuGroups = {}, g = b._.menuItems = {}, e = 0; e < h.length; e++)a[h[e]] = e + 1;
                    b.addMenuGroup = function(b, d) { a[b] = d || 100 };
                    b.addMenuItem = function(b, d) { a[d.group] && (g[b] = new CKEDITOR.menuItem(this, b, d)) };
                    b.addMenuItems = function(a) { for (var b in a)this.addMenuItem(b, a[b]) };
                    b.getMenuItem = function(a) { return g[a] };
                    b.removeMenuItem = function(a) { delete g[a] }
                }
            }), function() {
                function b(a) {
                    a.sort(function(a, b) {
                        return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order <
                            b.order ? -1 : a.order > b.order ? 1 : 0
                    })
                }

                var h = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" aria-pressed="{pressed}"';
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)h = h + ' onkeypress="return false;"';
                CKEDITOR.env.gecko && (h = h + ' onblur="this.style.cssText = this.style.cssText;"');
                var h =
                        h + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'),
                    a = CKEDITOR.addTemplate("menuItem", h + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'),
                    g = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
                CKEDITOR.menu = CKEDITOR.tools.createClass({
                    $: function(a, b) {
                        b = this._.definition = b || {};
                        this.id = CKEDITOR.tools.getNextId();
                        this.editor = a;
                        this.items = [];
                        this._.listeners = [];
                        this._.level = b.level || 1;
                        var d = CKEDITOR.tools.extend({}, b.panel, { css: [CKEDITOR.skin.getPath("editor")], level: this._.level - 1, block: {} }), f = d.block.attributes = d.attributes || {};
                        !f.role && (f.role = "menu");
                        this._.panelDefinition = d
                    },
                    _: {
                        onShow: function() {
                            var a =
                                    this.editor.getSelection(),
                                b = a && a.getStartElement(),
                                d = this.editor.elementPath(),
                                f = this._.listeners;
                            this.removeAll();
                            for (var c = 0; c < f.length; c++) {
                                var g = f[c](b, a, d);
                                if (g)
                                    for (var h in g) {
                                        var l = this.editor.getMenuItem(h);
                                        if (l && (!l.command || this.editor.getCommand(l.command).state)) {
                                            l.state = g[h];
                                            this.add(l)
                                        }
                                    }
                            }
                        },
                        onClick: function(a) {
                            this.hide();
                            if (a.onClick)a.onClick();
                            else a.command && this.editor.execCommand(a.command)
                        },
                        onEscape: function(a) {
                            var b = this.parent;
                            b ? b._.panel.hideChild(1) : a == 27 && this.hide(1);
                            return false
                        },
                        onHide: function() { this.onHide && this.onHide() },
                        showSubMenu: function(a) {
                            var b = this._.subMenu, d = this.items[a];
                            if (d = d.getItems && d.getItems()) {
                                if (b)b.removeAll();
                                else {
                                    b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, true));
                                    b.parent = this;
                                    b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)
                                }
                                for (var f in d) {
                                    var c = this.editor.getMenuItem(f);
                                    if (c) {
                                        c.state = d[f];
                                        b.add(c)
                                    }
                                }
                                var g = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                                ("" + a));
                                setTimeout(function() { b.show(g, 2) }, 0)
                            } else this._.panel.hideChild(1)
                        }
                    },
                    proto: {
                        add: function(a) {
                            if (!a.order)a.order = this.items.length;
                            this.items.push(a)
                        },
                        removeAll: function() { this.items = [] },
                        show: function(a, g, d, f) {
                            if (!this.parent) {
                                this._.onShow();
                                if (!this.items.length)return
                            }
                            var g = g || (this.editor.lang.dir == "rtl" ? 2 : 1), c = this.items, h = this.editor, k = this._.panel, l = this._.element;
                            if (!k) {
                                k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                                k.onEscape = CKEDITOR.tools.bind(function(a) { if (this._.onEscape(a) === false)return false }, this);
                                k.onShow = function() { k._.panel.getHolderElement().getParent().addClass("cke cke_reset_all") };
                                k.onHide = CKEDITOR.tools.bind(function() { this._.onHide && this._.onHide() }, this);
                                l = k.addBlock(this.id, this._.panelDefinition.block);
                                l.autoSize = true;
                                var m = l.keys;
                                m[40] = "next";
                                m[9] = "next";
                                m[38] = "prev";
                                m[CKEDITOR.SHIFT + 9] = "prev";
                                m[h.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                                m[32] = CKEDITOR.env.ie ? "mouseup" :
                                    "click";
                                CKEDITOR.env.ie && (m[13] = "mouseup");
                                l = this._.element = l.element;
                                m = l.getDocument();
                                m.getBody().setStyle("overflow", "hidden");
                                m.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                                this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
                                    clearTimeout(this._.showSubTimeout);
                                    this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, h.config.menu_subMenuDelay || 400, this, [a])
                                }, this);
                                this._.itemOutFn = CKEDITOR.tools.addFunction(function() { clearTimeout(this._.showSubTimeout) }, this);
                                this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
                                    var b = this.items[a];
                                    if (b.state == CKEDITOR.TRISTATE_DISABLED)this.hide(1);
                                    else if (b.getItems)this._.showSubMenu(a);
                                    else this._.onClick(b)
                                }, this)
                            }
                            b(c);
                            for (var m = h.elementPath(), m = ['<div class="cke_menu' + (m && m.direction() != h.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], n = c.length, o = n && c[0].group, p = 0; p < n; p++) {
                                var t = c[p];
                                if (o != t.group) {
                                    m.push('<div class="cke_menuseparator" role="separator"></div>');
                                    o = t.group
                                }
                                t.render(this, p, m)
                            }
                            m.push("</div>");
                            l.setHtml(m.join(""));
                            CKEDITOR.ui.fire("ready", this);
                            this.parent ? this.parent._.panel.showAsChild(k, this.id, a, g, d, f) : k.showBlock(this.id, a, g, d, f);
                            h.fire("menuShow", [k])
                        },
                        addListener: function(a) { this._.listeners.push(a) },
                        hide: function(a) {
                            this._.onHide && this._.onHide();
                            this._.panel && this._.panel.hide(a)
                        }
                    }
                });
                CKEDITOR.menuItem = CKEDITOR.tools.createClass({
                    $: function(a, b, d) {
                        CKEDITOR.tools.extend(this, d, { order: 0, className: "cke_menubutton__" + b });
                        this.group = a._.menuGroups[this.group];
                        this.editor = a;
                        this.name =
                            b
                    },
                    proto: {
                        render: function(b, h, d) {
                            var f = b.id + ("" + h), c = typeof this.state == "undefined" ? CKEDITOR.TRISTATE_OFF : this.state, j = c == CKEDITOR.TRISTATE_ON ? "on" : c == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off", k = this.getItems, l = "&#" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";", m = this.name;
                            if (this.icon && !/\./.test(this.icon))m = this.icon;
                            b = {
                                id: f,
                                name: this.name,
                                iconName: m,
                                label: this.label,
                                cls: this.className || "",
                                state: j,
                                hasPopup: k ? "true" : "false",
                                disabled: c == CKEDITOR.TRISTATE_DISABLED,
                                pressed: c == CKEDITOR.TRISTATE_ON,
                                title: this.label,
                                href: "javascript:void('" + (this.label || "").replace("'") + "')",
                                hoverFn: b._.itemOverFn,
                                moveOutFn: b._.itemOutFn,
                                clickFn: b._.itemClickFn,
                                index: h,
                                iconStyle: CKEDITOR.skin.getIconStyle(m, this.editor.lang.dir == "rtl", m == this.icon ? null : this.icon, this.iconOffset),
                                arrowHtml: k ? g.output({ label: l }) : ""
                            };
                            a.output(b, d)
                        }
                    }
                })
            }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
            CKEDITOR.plugins.add("contextmenu", {
                requires: "menu",
                onLoad: function() {
                    CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                        base: CKEDITOR.menu,
                        $: function(b) { this.base.call(this, b, { panel: { className: "cke_menu_panel", attributes: { "aria-label": b.lang.contextmenu.options } } }) },
                        proto: {
                            addTarget: function(b, h) {
                                if (CKEDITOR.env.opera && !("oncontextmenu" in document.body)) {
                                    var a;
                                    b.on("mousedown", function(e) {
                                        e = e.data;
                                        if (e.$.button != 2)e.getKeystroke() == CKEDITOR.CTRL + 1 && b.fire("contextmenu", e);
                                        else if (!h || !(CKEDITOR.env.mac ?
                                            e.$.metaKey : e.$.ctrlKey)) {
                                            var d = e.getTarget();
                                            if (!a) {
                                                d = d.getDocument();
                                                a = d.createElement("input");
                                                a.$.type = "button";
                                                d.getBody().append(a)
                                            }
                                            a.setAttribute("style", "position:absolute;top:" + (e.$.clientY - 2) + "px;left:" + (e.$.clientX - 2) + "px;width:5px;height:5px;opacity:0.01")
                                        }
                                    });
                                    b.on("mouseup", function(e) {
                                        if (a) {
                                            a.remove();
                                            a = void 0;
                                            b.fire("contextmenu", e.data)
                                        }
                                    })
                                }
                                b.on("contextmenu", function(a) {
                                    a = a.data;
                                    if (!h || !(CKEDITOR.env.webkit ? g : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey)) {
                                        a.preventDefault();
                                        var b = a.getTarget().getDocument(),
                                            f = a.getTarget().getDocument().getDocumentElement(),
                                            c = !b.equals(CKEDITOR.document),
                                            b = b.getWindow().getScrollPosition(),
                                            e = c ? a.$.clientX : a.$.pageX || b.x + a.$.clientX,
                                            k = c ? a.$.clientY : a.$.pageY || b.y + a.$.clientY;
                                        CKEDITOR.tools.setTimeout(function() { this.open(f, null, e, k) }, CKEDITOR.env.ie ? 200 : 0, this)
                                    }
                                }, this);
                                if (CKEDITOR.env.opera)
                                    b.on("keypress", function(a) {
                                        a = a.data;
                                        a.$.keyCode === 0 && a.preventDefault()
                                    });
                                if (CKEDITOR.env.webkit) {
                                    var g, e = function() { g = 0 };
                                    b.on("keydown", function(a) {
                                        g = CKEDITOR.env.mac ? a.data.$.metaKey :
                                            a.data.$.ctrlKey
                                    });
                                    b.on("keyup", e);
                                    b.on("contextmenu", e)
                                }
                            },
                            open: function(b, h, a, g) {
                                this.editor.focus();
                                b = b || CKEDITOR.document.getDocumentElement();
                                this.editor.selectionChange(1);
                                this.show(b, h, a, g)
                            }
                        }
                    })
                },
                beforeInit: function(b) {
                    var h = b.contextMenu = new CKEDITOR.plugins.contextMenu(b);
                    b.on("contentDom", function() { h.addTarget(b.editable(), b.config.browserContextMenuOnCtrl !== false) });
                    b.addCommand("contextMenu", { exec: function() { b.contextMenu.open(b.document.getBody()) } });
                    b.setKeystroke(CKEDITOR.SHIFT + 121,
                        "contextMenu");
                    b.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
                }
            }), function() {
                var b = { editorFocus: false, readOnly: 1, exec: function(a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } }, h = '<span class="cke_path_empty">&nbsp;</span>', a = "";
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)a = a + ' onkeypress="return false;"';
                CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
                var g = CKEDITOR.addTemplate("pathItem",
                    '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + a + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
                CKEDITOR.plugins.add("elementspath", {
                    init: function(a) {
                        function i(b) {
                            b = a._.elementsPath.list[b];
                            if (b.equals(a.editable())) {
                                var c =
                                    a.createRange();
                                c.selectNodeContents(b);
                                c.select()
                            } else a.getSelection().selectElement(b);
                            a.focus()
                        }

                        function d() {
                            c && c.setHtml(h);
                            delete a._.elementsPath.list
                        }

                        if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var f = a.ui.spaceId("path"), c, j = "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_";
                            a._.elementsPath = { idBase: j, filters: [] };
                            a.on("uiSpace", function(b) {
                                if (b.data.space == "bottom")
                                    b.data.html = b.data.html + ('<span id="' + f + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' +
                                        f + '" class="cke_path" role="group" aria-labelledby="' + f + '_label">' + h + "</span>")
                            });
                            a.on("uiReady", function() {
                                var b = a.ui.space("path");
                                b && a.focusManager.add(b, 1)
                            });
                            var k = CKEDITOR.tools.addFunction(i),
                                l = CKEDITOR.tools.addFunction(function(b, c) {
                                    var d = a._.elementsPath.idBase, f, c = new CKEDITOR.dom.event(c);
                                    f = a.lang.dir == "rtl";
                                    switch (c.getKeystroke()) {
                                    case f ? 39 : 37:
                                    case 9:
                                        (f = CKEDITOR.document.getById(d + (b + 1))) || (f = CKEDITOR.document.getById(d + "0"));
                                        f.focus();
                                        return false;
                                    case f ? 37 : 39:
                                    case CKEDITOR.SHIFT + 9:
                                        (f =
                                            CKEDITOR.document.getById(d + (b - 1))) || (f = CKEDITOR.document.getById(d + (a._.elementsPath.list.length - 1)));
                                        f.focus();
                                        return false;
                                    case 27:
                                        a.focus();
                                        return false;
                                    case 13:
                                    case 32:
                                        i(b);
                                        return false
                                    }
                                    return true
                                });
                            a.on("selectionChange", function(b) {
                                for (var d = a.editable(), i = b.data.selection.getStartElement(), b = [], p = a._.elementsPath.list = [], t = a._.elementsPath.filters; i;) {
                                    var r = 0, s;
                                    s = i.data("cke-display-name") ? i.data("cke-display-name") : i.data("cke-real-element-type") ? i.data("cke-real-element-type") : i.getName();
                                    for (var x = 0; x < t.length; x++) {
                                        var y = t[x](i, s);
                                        if (y === false) {
                                            r = 1;
                                            break
                                        }
                                        s = y || s
                                    }
                                    if (!r) {
                                        r = p.push(i) - 1;
                                        x = a.lang.elementspath.eleTitle.replace(/%1/, s);
                                        s = g.output({ id: j + r, label: x, text: s, jsTitle: "javascript:void('" + s + "')", index: r, keyDownFn: l, clickFn: k });
                                        b.unshift(s)
                                    }
                                    if (i.equals(d))break;
                                    i = i.getParent()
                                }
                                c || (c = CKEDITOR.document.getById(f));
                                d = c;
                                d.setHtml(b.join("") + h);
                                a.fire("elementsPathUpdate", { space: d })
                            });
                            a.on("readOnly", d);
                            a.on("contentDomUnload", d);
                            a.addCommand("elementsPathFocus", b);
                            a.setKeystroke(CKEDITOR.ALT +
                                122, "elementsPathFocus")
                        }
                    }
                })
            }(), function() {
                function b(a, b, c) {
                    function d(c) { if ((j = i[c ? "getFirst" : "getLast"]()) && (!j.is || !j.isBlockBoundary()) && (k = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(true))) && (!k.is || !k.isBlockBoundary({ br: 1 })))a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](j) }

                    for (var f = CKEDITOR.plugins.list.listToArray(b.root, c), e = [], g = 0; g < b.contents.length; g++) {
                        var h = b.contents[g];
                        if ((h = h.getAscendant("li", true)) && !h.getCustomData("list_item_processed")) {
                            e.push(h);
                            CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", true)
                        }
                    }
                    h = null;
                    for (g = 0; g < e.length; g++) {
                        h = e[g].getCustomData("listarray_index");
                        f[h].indent = -1
                    }
                    for (g = h + 1; g < f.length; g++)
                        if (f[g].indent > f[g - 1].indent + 1) {
                            e = f[g - 1].indent + 1 - f[g].indent;
                            for (h = f[g].indent; f[g] && f[g].indent >= h;) {
                                f[g].indent = f[g].indent + e;
                                g++
                            }
                            g--
                        }
                    var i = CKEDITOR.plugins.list.arrayToList(f, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, j, k;
                    d(true);
                    d();
                    i.replace(b.root)
                }

                function h(a, b) {
                    this.name = a;
                    this.context = this.type =
                        b
                }

                function a(a, b, c, d) {
                    for (var f, e; f = a[d ? "getLast" : "getFirst"](n);) {
                        (e = f.getDirection(1)) !== b.getDirection(1) && f.setAttribute("dir", e);
                        f.remove();
                        c ? f[d ? "insertBefore" : "insertAfter"](c) : b.append(f, d)
                    }
                }

                function g(b) {
                    var c;
                    (c = function(c) {
                        var d = b[c ? "getPrevious" : "getNext"](k);
                        if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is(b.getName())) {
                            a(b, d, null, !c);
                            b.remove();
                            b = d
                        }
                    })();
                    c(1)
                }

                function e(a) { return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"] }

                function i(b, c, f) {
                    b.fire("saveSnapshot");
                    f.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
                    var e = f.extractContents();
                    c.trim(false, true);
                    var h = c.createBookmark(), i = new CKEDITOR.dom.elementPath(c.startContainer), j = i.block, i = i.lastElement.getAscendant("li", 1) || j, n = new CKEDITOR.dom.elementPath(f.startContainer), m = n.contains(CKEDITOR.dtd.$listItem), n = n.contains(CKEDITOR.dtd.$list);
                    if (j)(j = j.getBogus()) && j.remove();
                    else if (n)(j = n.getPrevious(k)) && l(j) && j.remove();
                    (j = e.getLast()) && (j.type == CKEDITOR.NODE_ELEMENT &&
                        j.is("br")) && j.remove();
                    (j = c.startContainer.getChild(c.startOffset)) ? e.insertBefore(j) : c.startContainer.append(e);
                    if (m)
                        if (e = d(m))
                            if (i.contains(m)) {
                                a(e, m.getParent(), m);
                                e.remove()
                            } else i.append(e);
                    for (; f.checkStartOfBlock() && f.checkEndOfBlock();) {
                        n = f.startPath();
                        e = n.block;
                        if (e.is("li")) {
                            i = e.getParent();
                            e.equals(i.getLast(k)) && e.equals(i.getFirst(k)) && (e = i)
                        }
                        f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START);
                        e.remove()
                    }
                    f = f.clone();
                    e = b.editable();
                    f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                    f = new CKEDITOR.dom.walker(f);
                    f.evaluator = function(a) { return k(a) && !l(a) };
                    (f = f.next()) && (f.type == CKEDITOR.NODE_ELEMENT && f.getName() in CKEDITOR.dtd.$list) && g(f);
                    c.moveToBookmark(h);
                    c.select();
                    b.fire("saveSnapshot")
                }

                function d(a) { return(a = a.getLast(k)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in f ? a : null }

                var f = { ol: 1, ul: 1 }, c = CKEDITOR.dom.walker.whitespaces(), j = CKEDITOR.dom.walker.bookmark(), k = function(a) { return!(c(a) || j(a)) }, l = CKEDITOR.dom.walker.bogus();
                CKEDITOR.plugins.list = {
                    listToArray: function(a, b, c, d, e) {
                        if (!f[a.getName()])return[];
                        d || (d = 0);
                        c || (c = []);
                        for (var g = 0, h = a.getChildCount(); g < h; g++) {
                            var i = a.getChild(g);
                            i.type == CKEDITOR.NODE_ELEMENT && i.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(i, b, c, d + 1);
                            if (i.$.nodeName.toLowerCase() == "li") {
                                var j = { parent: a, indent: d, element: i, contents: [] };
                                if (e)j.grandparent = e;
                                else {
                                    j.grandparent = a.getParent();
                                    if (j.grandparent && j.grandparent.$.nodeName.toLowerCase() == "li")j.grandparent = j.grandparent.getParent()
                                }
                                b && CKEDITOR.dom.element.setMarker(b, i, "listarray_index", c.length);
                                c.push(j);
                                for (var k = 0, l = i.getChildCount(), n; k < l; k++) {
                                    n = i.getChild(k);
                                    n.type == CKEDITOR.NODE_ELEMENT && f[n.getName()] ? CKEDITOR.plugins.list.listToArray(n, b, c, d + 1, j.grandparent) : j.contents.push(n)
                                }
                            }
                        }
                        return c
                    },
                    arrayToList: function(a, b, c, d, e) {
                        c || (c = 0);
                        if (!a || a.length < c + 1)return null;
                        for (var g, h = a[c].parent.getDocument(), i = new CKEDITOR.dom.documentFragment(h), j = null, l = c, n = Math.max(a[c].indent, 0), m = null, A, z, C = d == CKEDITOR.ENTER_P ? "p" : "div";;) {
                            var D = a[l];
                            g = D.grandparent;
                            A = D.element.getDirection(1);
                            if (D.indent == n) {
                                if (!j ||
                                    a[l].parent.getName() != j.getName()) {
                                    j = a[l].parent.clone(false, 1);
                                    e && j.setAttribute("dir", e);
                                    i.append(j)
                                }
                                m = j.append(D.element.clone(0, 1));
                                A != j.getDirection(1) && m.setAttribute("dir", A);
                                for (g = 0; g < D.contents.length; g++)m.append(D.contents[g].clone(1, 1));
                                l++
                            } else if (D.indent == Math.max(n, 0) + 1) {
                                z = a[l - 1].element.getDirection(1);
                                l = CKEDITOR.plugins.list.arrayToList(a, null, l, d, z != A ? A : null);
                                !m.getChildCount() && (CKEDITOR.env.ie && !(h.$.documentMode > 7)) && m.append(h.createText(" "));
                                m.append(l.listNode);
                                l = l.nextIndex
                            } else if (D.indent ==
                                -1 && !c && g) {
                                if (f[g.getName()]) {
                                    m = D.element.clone(false, true);
                                    A != g.getDirection(1) && m.setAttribute("dir", A)
                                } else m = new CKEDITOR.dom.documentFragment(h);
                                var j = g.getDirection(1) != A, F = D.element, E = F.getAttribute("class"), K = F.getAttribute("style"), I = m.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || j || K || E), G, H = D.contents.length;
                                for (g = 0; g < H; g++) {
                                    G = D.contents[g];
                                    if (G.type == CKEDITOR.NODE_ELEMENT && G.isBlockBoundary()) {
                                        j && !G.getDirection() && G.setAttribute("dir", A);
                                        var L = G, J = F.getAttribute("style");
                                        J && L.setAttribute("style", J.replace(/([^;])$/, "$1;") + (L.getAttribute("style") || ""));
                                        E && G.addClass(E)
                                    } else if (I) {
                                        if (!z) {
                                            z = h.createElement(C);
                                            j && z.setAttribute("dir", A)
                                        }
                                        K && z.setAttribute("style", K);
                                        E && z.setAttribute("class", E);
                                        z.append(G.clone(1, 1))
                                    }
                                    m.append(z || G.clone(1, 1))
                                }
                                if (m.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && l != a.length - 1) {
                                    (A = m.getLast()) && (A.type == CKEDITOR.NODE_ELEMENT && A.getAttribute("type") == "_moz") && A.remove();
                                    (!m.getLast(k) || !(A.type == CKEDITOR.NODE_ELEMENT && A.getName() in CKEDITOR.dtd.$block)) &&
                                        m.append(h.createElement("br"))
                                }
                                A = m.$.nodeName.toLowerCase();
                                !CKEDITOR.env.ie && (A == "div" || A == "p") && m.appendBogus();
                                i.append(m);
                                j = null;
                                l++
                            } else return null;
                            z = null;
                            if (a.length <= l || Math.max(a[l].indent, 0) < n)break
                        }
                        if (b)
                            for (a = i.getFirst(); a;) {
                                if (a.type == CKEDITOR.NODE_ELEMENT) {
                                    CKEDITOR.dom.element.clearMarkers(b, a);
                                    if (a.getName() in CKEDITOR.dtd.$listItem) {
                                        c = a;
                                        h = e = d = void 0;
                                        if (d = c.getDirection()) {
                                            for (e = c.getParent(); e && !(h = e.getDirection());)e = e.getParent();
                                            d == h && c.removeAttribute("dir")
                                        }
                                    }
                                }
                                a = a.getNextSourceNode()
                            }
                        return{
                            listNode: i,
                            nextIndex: l
                        }
                    }
                };
                var m = /^h[1-6]$/, n = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
                h.prototype = {
                    exec: function(a) {
                        this.refresh(a, a.elementPath());
                        var c = a.config, d = a.getSelection(), e = d && d.getRanges(true);
                        if (this.state == CKEDITOR.TRISTATE_OFF) {
                            var h = a.editable();
                            if (h.getFirst(k)) {
                                var i = e.length == 1 && e[0];
                                (c = i && i.getEnclosedNode()) && (c.is && this.type == c.getName()) && this.setState(CKEDITOR.TRISTATE_ON)
                            } else {
                                c.enterMode == CKEDITOR.ENTER_BR ? h.appendBogus() : e[0].fixBlock(1, c.enterMode == CKEDITOR.ENTER_P ? "p" :
                                    "div");
                                d.selectRanges(e)
                            }
                        }
                        for (var c = d.createBookmarks(true), h = [], j = {}, e = e.createIterator(), l = 0; (i = e.getNextRange()) && ++l;) {
                            var n = i.getBoundaryNodes(), q = n.startNode, u = n.endNode;
                            q.type == CKEDITOR.NODE_ELEMENT && q.getName() == "td" && i.setStartAt(n.startNode, CKEDITOR.POSITION_AFTER_START);
                            u.type == CKEDITOR.NODE_ELEMENT && u.getName() == "td" && i.setEndAt(n.endNode, CKEDITOR.POSITION_BEFORE_END);
                            i = i.createIterator();
                            for (i.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; n = i.getNextParagraph();)
                                if (!n.getCustomData("list_block")) {
                                    CKEDITOR.dom.element.setMarker(j,
                                        n, "list_block", 1);
                                    for (var B = a.elementPath(n), q = B.elements, u = 0, B = B.blockLimit, A, z = q.length - 1; z >= 0 && (A = q[z]); z--)
                                        if (f[A.getName()] && B.contains(A)) {
                                            B.removeCustomData("list_group_object_" + l);
                                            if (q = A.getCustomData("list_group_object"))q.contents.push(n);
                                            else {
                                                q = { root: A, contents: [n] };
                                                h.push(q);
                                                CKEDITOR.dom.element.setMarker(j, A, "list_group_object", q)
                                            }
                                            u = 1;
                                            break
                                        }
                                    if (!u) {
                                        u = B;
                                        if (u.getCustomData("list_group_object_" + l))u.getCustomData("list_group_object_" + l).contents.push(n);
                                        else {
                                            q = { root: u, contents: [n] };
                                            CKEDITOR.dom.element.setMarker(j,
                                                u, "list_group_object_" + l, q);
                                            h.push(q)
                                        }
                                    }
                                }
                        }
                        for (A = []; h.length > 0;) {
                            q = h.shift();
                            if (this.state == CKEDITOR.TRISTATE_OFF)
                                if (f[q.root.getName()]) {
                                    n = a;
                                    e = q;
                                    q = j;
                                    l = A;
                                    u = CKEDITOR.plugins.list.listToArray(e.root, q);
                                    B = [];
                                    for (i = 0; i < e.contents.length; i++) {
                                        z = e.contents[i];
                                        if ((z = z.getAscendant("li", true)) && !z.getCustomData("list_item_processed")) {
                                            B.push(z);
                                            CKEDITOR.dom.element.setMarker(q, z, "list_item_processed", true)
                                        }
                                    }
                                    for (var z = e.root.getDocument(), C = void 0, D = void 0, i = 0; i < B.length; i++) {
                                        var F = B[i].getCustomData("listarray_index"),
                                            C = u[F].parent;
                                        if (!C.is(this.type)) {
                                            D = z.createElement(this.type);
                                            C.copyAttributes(D, { start: 1, type: 1 });
                                            D.removeStyle("list-style-type");
                                            u[F].parent = D
                                        }
                                    }
                                    n = CKEDITOR.plugins.list.arrayToList(u, q, null, n.config.enterMode);
                                    q = void 0;
                                    u = n.listNode.getChildCount();
                                    for (i = 0; i < u && (q = n.listNode.getChild(i)); i++)q.getName() == this.type && l.push(q);
                                    n.listNode.replace(e.root)
                                } else {
                                    u = a;
                                    n = q;
                                    i = A;
                                    B = n.contents;
                                    e = n.root.getDocument();
                                    l = [];
                                    if (B.length == 1 && B[0].equals(n.root)) {
                                        q = e.createElement("div");
                                        B[0].moveChildren && B[0].moveChildren(q);
                                        B[0].append(q);
                                        B[0] = q
                                    }
                                    n = n.contents[0].getParent();
                                    for (z = 0; z < B.length; z++)n = n.getCommonAncestor(B[z].getParent());
                                    C = u.config.useComputedState;
                                    u = q = void 0;
                                    C = C === void 0 || C;
                                    for (z = 0; z < B.length; z++)
                                        for (D = B[z]; F = D.getParent();) {
                                            if (F.equals(n)) {
                                                l.push(D);
                                                !u && D.getDirection() && (u = 1);
                                                D = D.getDirection(C);
                                                q !== null && (q = q && q != D ? null : D);
                                                break
                                            }
                                            D = F
                                        }
                                    if (!(l.length < 1)) {
                                        B = l[l.length - 1].getNext();
                                        z = e.createElement(this.type);
                                        i.push(z);
                                        for (C = i = void 0; l.length;) {
                                            i = l.shift();
                                            C = e.createElement("li");
                                            if (i.is("pre") || m.test(i.getName()))i.appendTo(C);
                                            else {
                                                i.copyAttributes(C);
                                                if (q && i.getDirection()) {
                                                    C.removeStyle("direction");
                                                    C.removeAttribute("dir")
                                                }
                                                i.moveChildren(C);
                                                i.remove()
                                            }
                                            C.appendTo(z)
                                        }
                                        q && u && z.setAttribute("dir", q);
                                        B ? z.insertBefore(B) : z.appendTo(n)
                                    }
                                }
                            else this.state == CKEDITOR.TRISTATE_ON && f[q.root.getName()] && b.call(this, a, q, j)
                        }
                        for (z = 0; z < A.length; z++)g(A[z]);
                        CKEDITOR.dom.element.clearAllMarkers(j);
                        d.selectBookmarks(c);
                        a.focus()
                    },
                    refresh: function(a, b) {
                        var c = b.contains(f, 1), d = b.blockLimit || b.root;
                        c && d.contains(c) ? this.setState(c.is(this.type) ?
                            CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
                    }
                };
                CKEDITOR.plugins.add("list", {
                    init: function(a) {
                        if (!a.blockless) {
                            a.addCommand("numberedlist", new h("numberedlist", "ol"));
                            a.addCommand("bulletedlist", new h("bulletedlist", "ul"));
                            if (a.ui.addButton) {
                                a.ui.addButton("NumberedList", { label: a.lang.list.numberedlist, command: "numberedlist", directional: true, toolbar: "list,10" });
                                a.ui.addButton("BulletedList", {
                                    label: a.lang.list.bulletedlist,
                                    command: "bulletedlist",
                                    directional: true,
                                    toolbar: "list,20"
                                })
                            }
                            a.on("key", function(b) {
                                var c = b.data.keyCode;
                                if (a.mode == "wysiwyg" && c in { 8: 1, 46: 1 }) {
                                    var g = a.getSelection().getRanges()[0], h = g.startPath();
                                    if (g.collapsed) {
                                        var h = new CKEDITOR.dom.elementPath(g.startContainer), j = c == 8, n = a.editable(), m = new CKEDITOR.dom.walker(g.clone());
                                        m.evaluator = function(a) { return k(a) && !l(a) };
                                        m.guard = function(a, b) { return!(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table")) };
                                        c = g.clone();
                                        if (j) {
                                            var v, q;
                                            if ((v = h.contains(f)) && g.checkBoundaryOfElement(v, CKEDITOR.START) && (v =
                                                v.getParent()) && v.is("li") && (v = d(v))) {
                                                q = v;
                                                v = v.getPrevious(k);
                                                c.moveToPosition(v && l(v) ? v : q, CKEDITOR.POSITION_BEFORE_START)
                                            } else {
                                                m.range.setStartAt(n, CKEDITOR.POSITION_AFTER_START);
                                                m.range.setEnd(g.startContainer, g.startOffset);
                                                if ((v = m.previous()) && v.type == CKEDITOR.NODE_ELEMENT && (v.getName() in f || v.is("li"))) {
                                                    if (!v.is("li")) {
                                                        m.range.selectNodeContents(v);
                                                        m.reset();
                                                        m.evaluator = e;
                                                        v = m.previous()
                                                    }
                                                    q = v;
                                                    c.moveToElementEditEnd(q)
                                                }
                                            }
                                            if (q) {
                                                i(a, c, g);
                                                b.cancel()
                                            } else if ((c = h.contains(f)) && g.checkBoundaryOfElement(c,
                                                CKEDITOR.START)) {
                                                q = c.getFirst(k);
                                                if (g.checkBoundaryOfElement(q, CKEDITOR.START)) {
                                                    v = c.getPrevious(k);
                                                    if (d(q)) {
                                                        if (v) {
                                                            g.moveToElementEditEnd(v);
                                                            g.select()
                                                        }
                                                    } else a.execCommand("outdent");
                                                    b.cancel()
                                                }
                                            }
                                        } else if (q = h.contains("li")) {
                                            m.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END);
                                            n = (h = q.getLast(k)) && e(h) ? h : q;
                                            q = 0;
                                            if ((v = m.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.getName() in f && v.equals(h)) {
                                                q = 1;
                                                v = m.next()
                                            } else g.checkBoundaryOfElement(n, CKEDITOR.END) && (q = 1);
                                            if (q && v) {
                                                g = g.clone();
                                                g.moveToElementEditStart(v);
                                                i(a,
                                                    c, g);
                                                b.cancel()
                                            }
                                        } else {
                                            m.range.setEndAt(n, CKEDITOR.POSITION_BEFORE_END);
                                            if ((v = m.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.is(f)) {
                                                v = v.getFirst(k);
                                                if (h.block && g.checkStartOfBlock() && g.checkEndOfBlock()) {
                                                    h.block.remove();
                                                    g.moveToElementEditStart(v);
                                                    g.select()
                                                } else if (d(v)) {
                                                    g.moveToElementEditStart(v);
                                                    g.select()
                                                } else {
                                                    g = g.clone();
                                                    g.moveToElementEditStart(v);
                                                    i(a, c, g)
                                                }
                                                b.cancel()
                                            }
                                        }
                                        setTimeout(function() { a.selectionChange(1) })
                                    }
                                }
                            })
                        }
                    }
                })
            }(), function() {
                function b(a, b) {
                    this.name = b;
                    if (this.useIndentClasses = a.config.indentClasses &&
                        a.config.indentClasses.length > 0) {
                        this.classNameRegex = RegExp("(?:^|\\s+)(" + a.config.indentClasses.join("|") + ")(?=$|\\s)");
                        this.indentClassMap = {};
                        for (var c = 0; c < a.config.indentClasses.length; c++)this.indentClassMap[a.config.indentClasses[c]] = c + 1
                    }
                    this.startDisabled = b == "outdent"
                }

                function h(a, b) { return(b || a.getComputedStyle("direction")) == "ltr" ? "margin-left" : "margin-right" }

                function a(a) { return a.type == CKEDITOR.NODE_ELEMENT && a.is("li") }

                var g = { ol: 1, ul: 1 },
                    e = CKEDITOR.dom.walker.whitespaces(true),
                    i = CKEDITOR.dom.walker.bookmark(false,
                        true);
                b.prototype = {
                    context: "p",
                    refresh: function(a, b) {
                        var c = b && b.contains(g), e = b.block || b.blockLimit;
                        if (c)this.setState(CKEDITOR.TRISTATE_OFF);
                        else if (!this.useIndentClasses && this.name == "indent")this.setState(CKEDITOR.TRISTATE_OFF);
                        else if (e)
                            if (this.useIndentClasses) {
                                c = e.$.className.match(this.classNameRegex);
                                e = 0;
                                if (c) {
                                    c = c[1];
                                    e = this.indentClassMap[c]
                                }
                                this.name == "outdent" && !e || this.name == "indent" && e == a.config.indentClasses.length ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)
                            } else {
                                c =
                                    parseInt(e.getStyle(h(e)), 10);
                                isNaN(c) && (c = 0);
                                c <= 0 ? this.setState(CKEDITOR.TRISTATE_DISABLED) : this.setState(CKEDITOR.TRISTATE_OFF)
                            }
                        else this.setState(CKEDITOR.TRISTATE_DISABLED)
                    },
                    exec: function(b) {
                        function f(a) {
                            for (var c = o.startContainer, f = o.endContainer; c && !c.getParent().equals(a);)c = c.getParent();
                            for (; f && !f.getParent().equals(a);)f = f.getParent();
                            if (c && f) {
                                for (var h = c, c = [], j = false; !j;) {
                                    h.equals(f) && (j = true);
                                    c.push(h);
                                    h = h.getNext()
                                }
                                if (!(c.length < 1)) {
                                    h = a.getParents(true);
                                    for (f = 0; f < h.length; f++)
                                        if (h[f].getName &&
                                            g[h[f].getName()]) {
                                            a = h[f];
                                            break
                                        }
                                    for (var h = k.name == "indent" ? 1 : -1, f = c[0], c = c[c.length - 1], j = CKEDITOR.plugins.list.listToArray(a, l), n = j[c.getCustomData("listarray_index")].indent, f = f.getCustomData("listarray_index"); f <= c.getCustomData("listarray_index"); f++) {
                                        j[f].indent = j[f].indent + h;
                                        if (h > 0) {
                                            var p = j[f].parent;
                                            j[f].parent = new CKEDITOR.dom.element(p.getName(), p.getDocument())
                                        }
                                    }
                                    for (f = c.getCustomData("listarray_index") + 1; f < j.length && j[f].indent > n; f++)j[f].indent = j[f].indent + h;
                                    c = CKEDITOR.plugins.list.arrayToList(j,
                                        l, null, b.config.enterMode, a.getDirection());
                                    if (k.name == "outdent") {
                                        var t;
                                        if ((t = a.getParent()) && t.is("li"))for (var h = c.listNode.getChildren(), m = [], r, f = h.count() - 1; f >= 0; f--)(r = h.getItem(f)) && (r.is && r.is("li")) && m.push(r)
                                    }
                                    c && c.listNode.replace(a);
                                    if (m && m.length)
                                        for (f = 0; f < m.length; f++) {
                                            for (r = a = m[f]; (r = r.getNext()) && r.is && r.getName() in g;) {
                                                CKEDITOR.env.ie && !a.getFirst(function(a) { return e(a) && i(a) }) && a.append(o.document.createText(" "));
                                                a.append(r)
                                            }
                                            a.insertAfter(t)
                                        }
                                }
                            }
                        }

                        function c() {
                            var a = o.createIterator(),
                                c = b.config.enterMode;
                            a.enforceRealBlocks = true;
                            a.enlargeBr = c != CKEDITOR.ENTER_BR;
                            for (var f; f = a.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" : "div");)j(f)
                        }

                        function j(a, c) {
                            if (a.getCustomData("indent_processed"))return false;
                            if (k.useIndentClasses) {
                                var f = a.$.className.match(k.classNameRegex), e = 0;
                                if (f) {
                                    f = f[1];
                                    e = k.indentClassMap[f]
                                }
                                k.name == "outdent" ? e-- : e++;
                                if (e < 0)return false;
                                e = Math.min(e, b.config.indentClasses.length);
                                e = Math.max(e, 0);
                                a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(k.classNameRegex,
                                    ""));
                                e > 0 && a.addClass(b.config.indentClasses[e - 1])
                            } else {
                                f = h(a, c);
                                e = parseInt(a.getStyle(f), 10);
                                isNaN(e) && (e = 0);
                                var g = b.config.indentOffset || 40, e = e + (k.name == "indent" ? 1 : -1) * g;
                                if (e < 0)return false;
                                e = Math.max(e, 0);
                                e = Math.ceil(e / g) * g;
                                a.setStyle(f, e ? e + (b.config.indentUnit || "px") : "");
                                a.getAttribute("style") === "" && a.removeAttribute("style")
                            }
                            CKEDITOR.dom.element.setMarker(l, a, "indent_processed", 1);
                            return true
                        }

                        for (var k = this, l = {}, m = b.getSelection(), n = m.createBookmarks(1), o, p = (m && m.getRanges(1)).createIterator(); o =
                            p.getNextRange();) {
                            for (var t = o.getCommonAncestor(); t && !(t.type == CKEDITOR.NODE_ELEMENT && g[t.getName()]);)t = t.getParent();
                            if (!t) {
                                var r = o.getEnclosedNode();
                                if (r && r.type == CKEDITOR.NODE_ELEMENT && r.getName() in g) {
                                    o.setStartAt(r, CKEDITOR.POSITION_AFTER_START);
                                    o.setEndAt(r, CKEDITOR.POSITION_BEFORE_END);
                                    t = r
                                }
                            }
                            if (t && o.startContainer.type == CKEDITOR.NODE_ELEMENT && o.startContainer.getName() in g) {
                                r = new CKEDITOR.dom.walker(o);
                                r.evaluator = a;
                                o.startContainer = r.next()
                            }
                            if (t && o.endContainer.type == CKEDITOR.NODE_ELEMENT &&
                                o.endContainer.getName() in g) {
                                r = new CKEDITOR.dom.walker(o);
                                r.evaluator = a;
                                o.endContainer = r.previous()
                            }
                            if (t) {
                                var r = t.getFirst(a), s = !!r.getNext(a), x = o.startContainer;
                                (!r.equals(x) && !r.contains(x) || !(k.name == "indent" || k.useIndentClasses || parseInt(t.getStyle(h(t)), 10)) || !j(t, !s && r.getDirection())) && f(t)
                            } else c()
                        }
                        CKEDITOR.dom.element.clearAllMarkers(l);
                        b.forceNextSelectionCheck();
                        m.selectBookmarks(n)
                    }
                };
                CKEDITOR.plugins.add("indent", {
                    requires: "list",
                    onLoad: function() {
                        (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) &&
                            CKEDITOR.addCss(".cke_editable ul,.cke_editable ol{\tmargin-left: 0px;\tpadding-left: 40px;}")
                    },
                    init: function(a) {
                        if (!a.blockless) {
                            a.addCommand("indent", new b(a, "indent"));
                            a.addCommand("outdent", new b(a, "outdent"));
                            if (a.ui.addButton) {
                                a.ui.addButton("Indent", { label: a.lang.indent.indent, command: "indent", directional: true, toolbar: "indent,20" });
                                a.ui.addButton("Outdent", { label: a.lang.indent.outdent, command: "outdent", directional: true, toolbar: "indent,10" })
                            }
                            a.on("dirChanged", function(b) {
                                var c = a.createRange();
                                c.setStartBefore(b.data.node);
                                c.setEndAfter(b.data.node);
                                for (var e = new CKEDITOR.dom.walker(c), g; g = e.next();)
                                    if (g.type == CKEDITOR.NODE_ELEMENT)
                                        if (!g.equals(b.data.node) && g.getDirection()) {
                                            c.setStartAfter(g);
                                            e = new CKEDITOR.dom.walker(c)
                                        } else {
                                            var h = a.config.indentClasses;
                                            if (h)
                                                for (var i = b.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], n = 0; n < h.length; n++)
                                                    if (g.hasClass(h[n] + i[0])) {
                                                        g.removeClass(h[n] + i[0]);
                                                        g.addClass(h[n] + i[1])
                                                    }
                                            h = g.getStyle("margin-right");
                                            i = g.getStyle("margin-left");
                                            h ? g.setStyle("margin-left",
                                                h) : g.removeStyle("margin-left");
                                            i ? g.setStyle("margin-right", i) : g.removeStyle("margin-right")
                                        }
                            })
                        }
                    }
                })
            }(), function() {
                function b(a, b, f) {
                    f = a.config.forceEnterMode || f;
                    if (a.mode != "wysiwyg")return false;
                    if (!b)b = a.config.enterMode;
                    if (!a.elementPath().isContextFor("p")) {
                        b = CKEDITOR.ENTER_BR;
                        f = 1
                    }
                    a.fire("saveSnapshot");
                    b == CKEDITOR.ENTER_BR ? i(a, b, null, f) : d(a, b, null, f);
                    a.fire("saveSnapshot");
                    return true
                }

                function h(a) {
                    for (var a = a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--)a[b].deleteContents();
                    return a[0]
                }

                CKEDITOR.plugins.add("enterkey", {
                    requires: "indent",
                    init: function(a) {
                        a.addCommand("enter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function(a) { b(a) } });
                        a.addCommand("shiftEnter", { modes: { wysiwyg: 1 }, editorFocus: false, exec: function(a) { a.mode == "wysiwyg" && b(a, a.config.shiftEnterMode, 1) } });
                        a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
                    }
                });
                var a = CKEDITOR.dom.walker.whitespaces(), g = CKEDITOR.dom.walker.bookmark();
                CKEDITOR.plugins.enterkey = {
                    enterBlock: function(b, d, e, l) {
                        if (e = e || h(b)) {
                            var m = e.document,
                                n = e.checkStartOfBlock(),
                                o = e.checkEndOfBlock(),
                                p = b.elementPath(e.startContainer).block;
                            if (n && o) {
                                if (p && (p.is("li") || p.getParent().is("li"))) {
                                    b.execCommand("outdent");
                                    return
                                }
                                if (p && p.getParent().is("blockquote")) {
                                    p.breakParent(p.getParent());
                                    p.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || p.getPrevious().remove();
                                    p.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || p.getNext().remove();
                                    e.moveToElementEditStart(p);
                                    e.select();
                                    return
                                }
                            } else if (p && p.is("pre") && !o) {
                                i(b, d, e, l);
                                return
                            }
                            var p = d ==
                                    CKEDITOR.ENTER_DIV ? "div" : "p",
                                t = e.splitBlock(p);
                            if (t) {
                                var d = t.previousBlock, b = t.nextBlock, n = t.wasStartOfBlock, o = t.wasEndOfBlock, r;
                                if (b) {
                                    r = b.getParent();
                                    if (r.is("li")) {
                                        b.breakParent(r);
                                        b.move(b.getNext(), 1)
                                    }
                                } else if (d && (r = d.getParent()) && r.is("li")) {
                                    d.breakParent(r);
                                    r = d.getNext();
                                    e.moveToElementEditStart(r);
                                    d.move(d.getPrevious())
                                }
                                if (!n && !o) {
                                    if (b.is("li")) {
                                        var s = e.clone();
                                        s.selectNodeContents(b);
                                        s = new CKEDITOR.dom.walker(s);
                                        s.evaluator = function(b) {
                                            return!(g(b) || a(b) || b.type == CKEDITOR.NODE_ELEMENT &&
                                                b.getName() in CKEDITOR.dtd.$inline && !(b.getName() in CKEDITOR.dtd.$empty))
                                        };
                                        (r = s.next()) && (r.type == CKEDITOR.NODE_ELEMENT && r.is("ul", "ol")) && (CKEDITOR.env.ie ? m.createText(" ") : m.createElement("br")).insertBefore(r)
                                    }
                                    b && e.moveToElementEditStart(b)
                                } else {
                                    var x;
                                    if (d) {
                                        if (d.is("li") || !f.test(d.getName()) && !d.is("pre"))s = d.clone()
                                    } else b && (s = b.clone());
                                    if (s)l && !s.is("li") && s.renameNode(p);
                                    else if (r && r.is("li"))s = r;
                                    else {
                                        s = m.createElement(p);
                                        d && (x = d.getDirection()) && s.setAttribute("dir", x)
                                    }
                                    if (m = t.elementPath) {
                                        l =
                                            0;
                                        for (r = m.elements.length; l < r; l++) {
                                            x = m.elements[l];
                                            if (x.equals(m.block) || x.equals(m.blockLimit))break;
                                            if (CKEDITOR.dtd.$removeEmpty[x.getName()]) {
                                                x = x.clone();
                                                s.moveChildren(x);
                                                s.append(x)
                                            }
                                        }
                                    }
                                    CKEDITOR.env.ie || s.appendBogus();
                                    s.getParent() || e.insertNode(s);
                                    s.is("li") && s.removeAttribute("value");
                                    if (CKEDITOR.env.ie && n && (!o || !d.getChildCount())) {
                                        e.moveToElementEditStart(o ? d : s);
                                        e.select()
                                    }
                                    e.moveToElementEditStart(n && !o ? b : s)
                                }
                                e.select();
                                e.scrollIntoView()
                            }
                        }
                    },
                    enterBr: function(a, b, e, g) {
                        if (e = e || h(a)) {
                            var i = e.document,
                                n = e.checkEndOfBlock(),
                                o = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
                                p = o.block,
                                o = p && o.block.getName();
                            if (!g && o == "li")d(a, b, e, g);
                            else {
                                if (!g && n && f.test(o))
                                    if (n = p.getDirection()) {
                                        i = i.createElement("div");
                                        i.setAttribute("dir", n);
                                        i.insertAfter(p);
                                        e.setStart(i, 0)
                                    } else {
                                        i.createElement("br").insertAfter(p);
                                        CKEDITOR.env.gecko && i.createText("").insertAfter(p);
                                        e.setStartAt(p.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)
                                    }
                                else {
                                    p = o == "pre" && CKEDITOR.env.ie &&
                                        CKEDITOR.env.version < 8 ? i.createText("\r") : i.createElement("br");
                                    e.deleteContents();
                                    e.insertNode(p);
                                    if (CKEDITOR.env.ie)e.setStartAt(p, CKEDITOR.POSITION_AFTER_END);
                                    else {
                                        i.createText("﻿").insertAfter(p);
                                        n && p.getParent().appendBogus();
                                        p.getNext().$.nodeValue = "";
                                        e.setStartAt(p.getNext(), CKEDITOR.POSITION_AFTER_START)
                                    }
                                }
                                e.collapse(true);
                                e.select();
                                e.scrollIntoView()
                            }
                        }
                    }
                };
                var e = CKEDITOR.plugins.enterkey, i = e.enterBr, d = e.enterBlock, f = /^h[1-6]$/
            }(), function() {
                function b(b, a) {
                    var g = {},
                        e = [],
                        i = {
                            nbsp: " ",
                            shy: "­",
                            gt: ">",
                            lt: "<",
                            amp: "&",
                            apos: "'",
                            quot: '"'
                        },
                        b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(b, c) {
                            var d = a ? "&" + c + ";" : i[c];
                            g[d] = a ? i[c] : "&" + c + ";";
                            e.push(d);
                            return""
                        });
                    if (!a && b) {
                        var b = b.split(","), d = document.createElement("div"), f;
                        d.innerHTML = "&" + b.join(";&") + ";";
                        f = d.innerHTML;
                        d = null;
                        for (d = 0; d < f.length; d++) {
                            var c = f.charAt(d);
                            g[c] = "&" + b[d] + ";";
                            e.push(c)
                        }
                    }
                    g.regex = e.join(a ? "|" : "");
                    return g
                }

                CKEDITOR.plugins.add("entities", {
                    afterInit: function(h) {
                        var a = h.config;
                        if (h = (h = h.dataProcessor) && h.htmlFilter) {
                            var g =
                            [];
                            a.basicEntities !== false && g.push("nbsp,gt,lt,amp");
                            if (a.entities) {
                                g.length && g.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                                a.entities_latin && g.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml");
                                a.entities_greek && g.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                                a.entities_additional && g.push(a.entities_additional)
                            }
                            var e = b(g.join(",")), i = e.regex ? "[" + e.regex + "]" : "a^";
                            delete e.regex;
                            a.entities && a.entities_processNumerical && (i = "[^ -~]|" + i);
                            var i = RegExp(i, "g"), d = function(b) { return a.entities_processNumerical == "force" || !e[b] ? "&#" + b.charCodeAt(0) + ";" : e[b] }, f = b("nbsp,gt,lt,amp,shy", true), c = RegExp(f.regex, "g"), j = function(a) { return f[a] };
                            h.addRules({ text: function(a) { return a.replace(c, j).replace(i, d) } })
                        }
                    }
                })
            }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities =
                !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
                popup: function(b, h, a, g) {
                    h = h || "80%";
                    a = a || "70%";
                    typeof h == "string" && (h.length > 1 && h.substr(h.length - 1, 1) == "%") && (h = parseInt(window.screen.width * parseInt(h, 10) / 100, 10));
                    typeof a == "string" && (a.length > 1 && a.substr(a.length - 1, 1) == "%") && (a = parseInt(window.screen.height * parseInt(a, 10) / 100, 10));
                    h < 640 && (h = 640);
                    a < 420 && (a =
                        420);
                    var e = parseInt((window.screen.height - a) / 2, 10), i = parseInt((window.screen.width - h) / 2, 10), g = (g || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + h + ",height=" + a + ",top=" + e + ",left=" + i, d = window.open("", null, g, true);
                    if (!d)return false;
                    try {
                        if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) {
                            d.moveTo(i, e);
                            d.resizeTo(h, a)
                        }
                        d.focus();
                        d.location.href = b
                    } catch (f) {
                        window.open(b, null, g, true)
                    }
                    return true
                }
            }), function() {
                function b(a,
                    b) {
                    var d = [];
                    if (b)for (var f in b)d.push(f + "=" + encodeURIComponent(b[f]));
                    else return a;
                    return a + (a.indexOf("?") != -1 ? "&" : "?") + d.join("&")
                }

                function h(a) {
                    a = a + "";
                    return a.charAt(0).toUpperCase() + a.substr(1)
                }

                function a() {
                    var a = this.getDialog(), d = a.getParentEditor();
                    d._.filebrowserSe = this;
                    var f = d.config["filebrowser" + h(a.getName()) + "WindowWidth"] || d.config.filebrowserWindowWidth || "80%",
                        a = d.config["filebrowser" + h(a.getName()) + "WindowHeight"] || d.config.filebrowserWindowHeight || "70%",
                        e = this.filebrowser.params ||
                        {};
                    e.CKEditor = d.name;
                    e.CKEditorFuncNum = d._.filebrowserFn;
                    if (!e.langCode)e.langCode = d.langCode;
                    e = b(this.filebrowser.url, e);
                    d.popup(e, f, a, d.config.filebrowserWindowFeatures || d.config.fileBrowserWindowFeatures)
                }

                function g() {
                    var a = this.getDialog();
                    a.getParentEditor()._.filebrowserSe = this;
                    return!a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true
                }

                function e(a, d, f) {
                    var e = f.params || {};
                    e.CKEditor = a.name;
                    e.CKEditorFuncNum =
                        a._.filebrowserFn;
                    if (!e.langCode)e.langCode = a.langCode;
                    d.action = b(f.url, e);
                    d.filebrowser = f
                }

                function i(b, d, f, l) {
                    var m, n;
                    for (n in l) {
                        m = l[n];
                        (m.type == "hbox" || m.type == "vbox" || m.type == "fieldset") && i(b, d, f, m.children);
                        if (m.filebrowser) {
                            if (typeof m.filebrowser == "string")m.filebrowser = { action: m.type == "fileButton" ? "QuickUpload" : "Browse", target: m.filebrowser };
                            if (m.filebrowser.action == "Browse") {
                                var o = m.filebrowser.url;
                                if (o === void 0) {
                                    o = b.config["filebrowser" + h(d) + "BrowseUrl"];
                                    if (o === void 0)o = b.config.filebrowserBrowseUrl
                                }
                                if (o) {
                                    m.onClick =
                                        a;
                                    m.filebrowser.url = o;
                                    m.hidden = false
                                }
                            } else if (m.filebrowser.action == "QuickUpload" && m["for"]) {
                                o = m.filebrowser.url;
                                if (o === void 0) {
                                    o = b.config["filebrowser" + h(d) + "UploadUrl"];
                                    if (o === void 0)o = b.config.filebrowserUploadUrl
                                }
                                if (o) {
                                    var p = m.onClick;
                                    m.onClick = function(a) {
                                        var b = a.sender;
                                        return p && p.call(b, a) === false ? false : g.call(b, a)
                                    };
                                    m.filebrowser.url = o;
                                    m.hidden = false;
                                    e(b, f.getContents(m["for"][0]).get(m["for"][1]), m.filebrowser)
                                }
                            }
                        }
                    }
                }

                function d(a, b, f) {
                    if (f.indexOf(";") !== -1) {
                        for (var f = f.split(";"), e = 0; e < f.length; e++)
                            if (d(a,
                                b, f[e]))return true;
                        return false
                    }
                    return(a = a.getContents(b).get(f).filebrowser) && a.url
                }

                function f(a, b) {
                    var d = this._.filebrowserSe.getDialog(), f = this._.filebrowserSe["for"], e = this._.filebrowserSe.filebrowser.onSelect;
                    f && d.getContentElement(f[0], f[1]).reset();
                    if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(e && e.call(this._.filebrowserSe, a, b) === false)) {
                        typeof b == "string" && b && alert(b);
                        if (a) {
                            f = this._.filebrowserSe;
                            d = f.getDialog();
                            if (f = f.filebrowser.target || null) {
                                f = f.split(":");
                                if (e =
                                    d.getContentElement(f[0], f[1])) {
                                    e.setValue(a);
                                    d.selectPage(f[0])
                                }
                            }
                        }
                    }
                }

                CKEDITOR.plugins.add("filebrowser", {
                    requires: "popup",
                    init: function(a) {
                        a._.filebrowserFn = CKEDITOR.tools.addFunction(f, a);
                        a.on("destroy", function() { CKEDITOR.tools.removeFunction(this._.filebrowserFn) })
                    }
                });
                CKEDITOR.on("dialogDefinition", function(a) {
                    var b = a.data.definition, f, e;
                    for (e in b.contents)
                        if (f = b.contents[e]) {
                            i(a.editor, a.data.name, b, f.elements);
                            if (f.hidden && f.filebrowser)f.hidden = !d(b, f.id, f.filebrowser)
                        }
                })
            }(), function() {
                function b(a) {
                    var b =
                        a == "left" ? "pageXOffset" : "pageYOffset";
                    return b in g.$ ? g.$[b] : CKEDITOR.document.$.documentElement[a == "left" ? "scrollLeft" : "scrollTop"]
                }

                function h(h) {
                    var d,
                        f = h.config,
                        c = f.floatSpaceDockedOffsetX || 0,
                        j = f.floatSpaceDockedOffsetY || 0,
                        k = f.floatSpacePinnedOffsetX || 0,
                        l = f.floatSpacePinnedOffsetY || 0,
                        m = function(a) {
                            function f(a, b, c) {
                                p.setStyle(b, e(c));
                                p.setStyle("position", a)
                            }

                            function n(a) {
                                var b = o.getDocumentPosition();
                                switch (a) {
                                case "top":
                                    f("absolute", "top", b.y - v - j);
                                    break;
                                case "pin":
                                    f("fixed", "top", l);
                                    break;
                                case "bottom":
                                    f("absolute",
                                        "top", b.y + (w.height || w.bottom - w.top) + j)
                                }
                                d = a
                            }

                            a.name == "focus" && p.show();
                            p.removeStyle("left");
                            p.removeStyle("right");
                            var o = h.editable(), y = p.getClientRect(), w = o.getClientRect(), v = y.height, q = b("left");
                            if (d) {
                                d == "top" && y.top < l ? n("pin") : d == "pin" ? w.top > j + v ? n("top") : w.bottom - y.bottom < v && n("bottom") : d == "bottom" && (w.top > j + v ? n("top") : w.bottom > 2 * v + l && n("pin"));
                                var a = g.getViewPaneSize(),
                                    u = a.width / 2,
                                    u = w.left > 0 && w.right < a.width && w.width > y.width ? h.config.contentsLangDirection == "rtl" ? "right" : "left" : u - w.left > w.right -
                                        u ? "left" : "right",
                                    B;
                                if (y.width > a.width) {
                                    u = "left";
                                    B = 0
                                } else {
                                    B = u == "left" ? w.left > 0 ? w.left : 0 : w.right < a.width ? a.width - w.right : 0;
                                    if (B + y.width > a.width) {
                                        u = u == "left" ? "right" : "left";
                                        B = 0
                                    }
                                }
                                p.setStyle(u, e((d == "pin" ? k : c) + B + (d == "pin" ? 0 : u == "left" ? q : -q)))
                            } else {
                                d = "pin";
                                n("pin");
                                m(a)
                            }
                        },
                        f = CKEDITOR.document.getBody(),
                        n = { id: h.id, name: h.name, langDir: h.lang.dir, langCode: h.langCode },
                        o = h.fire("uiSpace", { space: "top", html: "" }).html;
                    if (o) {
                        var p = f.append(CKEDITOR.dom.element.createFromHtml(a.output(CKEDITOR.tools.extend({
                            topId: h.ui.spaceId("top"),
                            content: o,
                            style: "display:none;z-index:" + (h.config.baseFloatZIndex - 1)
                        }, n))));
                        p.unselectable();
                        p.on("mousedown", function(a) {
                            a = a.data;
                            a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                        });
                        h.on("focus", function(a) {
                            m(a);
                            g.on("scroll", m);
                            g.on("resize", m)
                        });
                        h.on("blur", function() {
                            p.hide();
                            g.removeListener("scroll", m);
                            g.removeListener("resize", m)
                        });
                        h.on("destroy", function() {
                            g.removeListener("scroll", m);
                            g.removeListener("resize", m);
                            p.clearCustomData();
                            p.remove()
                        });
                        h.focusManager.hasFocus && p.show();
                        h.focusManager.add(p,
                            1)
                    }
                }

                var a = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>');
                CKEDITOR.plugins.add("floatingspace", { init: function(a) { a.on("contentDom", function() { h(a) }) } });
                var g = CKEDITOR.document.getWindow(),
                    e = CKEDITOR.tools.cssLength
            }(), CKEDITOR.plugins.add("listblock", {
                requires: "panel",
                onLoad: function() {
                    var b = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'),
                        h = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'),
                        a = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>');
                    CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) };
                    CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.panel.block,
                        $: function(a, b) {
                            var b = b || {}, h = b.attributes || (b.attributes = {});
                            (this.multiSelect = !!b.multiSelect) && (h["aria-multiselectable"] = true);
                            !h.role && (h.role = "listbox");
                            this.base.apply(this,
                                arguments);
                            h = this.keys;
                            h[40] = "next";
                            h[9] = "next";
                            h[38] = "prev";
                            h[CKEDITOR.SHIFT + 9] = "prev";
                            h[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                            CKEDITOR.env.ie && (h[13] = "mouseup");
                            this._.pendingHtml = [];
                            this._.pendingList = [];
                            this._.items = {};
                            this._.groups = {}
                        },
                        _: {
                            close: function() {
                                if (this._.started) {
                                    var a = b.output({ items: this._.pendingList.join("") });
                                    this._.pendingList = [];
                                    this._.pendingHtml.push(a);
                                    delete this._.started
                                }
                            },
                            getClick: function() {
                                if (!this._.click)
                                    this._.click = CKEDITOR.tools.addFunction(function(a) {
                                        var b = this.toggle(a);
                                        if (this.onClick)this.onClick(a, b)
                                    }, this);
                                return this._.click
                            }
                        },
                        proto: {
                            add: function(a, b, i) {
                                var d = CKEDITOR.tools.getNextId();
                                if (!this._.started) {
                                    this._.started = 1;
                                    this._.size = this._.size || 0
                                }
                                this._.items[a] = d;
                                a = { id: d, val: a, onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick", clickFn: this._.getClick(), title: i || a, text: b || a };
                                this._.pendingList.push(h.output(a))
                            },
                            startGroup: function(b) {
                                this._.close();
                                var e = CKEDITOR.tools.getNextId();
                                this._.groups[b] = e;
                                this._.pendingHtml.push(a.output({
                                    id: e,
                                    label: b
                                }))
                            },
                            commit: function() {
                                this._.close();
                                this.element.appendHtml(this._.pendingHtml.join(""));
                                delete this._.size;
                                this._.pendingHtml = []
                            },
                            toggle: function(a) {
                                var b = this.isMarked(a);
                                b ? this.unmark(a) : this.mark(a);
                                return!b
                            },
                            hideGroup: function(a) {
                                var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                                if (a) {
                                    a.setStyle("display", "none");
                                    b && b.getName() == "ul" && b.setStyle("display", "none")
                                }
                            },
                            hideItem: function(a) { this.element.getDocument().getById(this._.items[a]).setStyle("display", "none") },
                            showAll: function() {
                                var a = this._.items, b = this._.groups, h = this.element.getDocument(), d;
                                for (d in a)h.getById(a[d]).setStyle("display", "");
                                for (var f in b) {
                                    a = h.getById(b[f]);
                                    d = a.getNext();
                                    a.setStyle("display", "");
                                    d && d.getName() == "ul" && d.setStyle("display", "")
                                }
                            },
                            mark: function(a) {
                                this.multiSelect || this.unmarkAll();
                                var a = this._.items[a], b = this.element.getDocument().getById(a);
                                b.addClass("cke_selected");
                                this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", true);
                                this.onMark && this.onMark(b)
                            },
                            unmark: function(a) {
                                var b = this.element.getDocument(), a = this._.items[a], h = b.getById(a);
                                h.removeClass("cke_selected");
                                b.getById(a + "_option").removeAttribute("aria-selected");
                                this.onUnmark && this.onUnmark(h)
                            },
                            unmarkAll: function() {
                                var a = this._.items, b = this.element.getDocument(), h;
                                for (h in a) {
                                    var d = a[h];
                                    b.getById(d).removeClass("cke_selected");
                                    b.getById(d + "_option").removeAttribute("aria-selected")
                                }
                                this.onUnmark && this.onUnmark()
                            },
                            isMarked: function(a) { return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected") },
                            focus: function(a) {
                                this._.focusIndex = -1;
                                if (a) {
                                    for (var b = this.element.getDocument().getById(this._.items[a]).getFirst(), a = this.element.getElementsByTag("a"), h, d = -1; h = a.getItem(++d);)
                                        if (h.equals(b)) {
                                            this._.focusIndex = d;
                                            break
                                        }
                                    setTimeout(function() { b.focus() }, 0)
                                }
                            }
                        }
                    })
                }
            }), function() {
                var b = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}"';
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)b = b + ' onkeypress="return false;"';
                CKEDITOR.env.gecko && (b = b + ' onblur="this.style.cssText = this.style.cssText;"');
                var b = b + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'),
                    b = b + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label">{label}</span>{arrowHtml}</a>',
                    h = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"),
                    a = CKEDITOR.addTemplate("button", b);
                CKEDITOR.plugins.add("button", { beforeInit: function(a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } });
                CKEDITOR.UI_BUTTON = "button";
                CKEDITOR.ui.button = function(a) {
                    CKEDITOR.tools.extend(this, a, {
                        title: a.label,
                        click: a.click ||
                            function(b) { b.execCommand(a.command) }
                    });
                    this._ = {}
                };
                CKEDITOR.ui.button.handler = { create: function(a) { return new CKEDITOR.ui.button(a) } };
                CKEDITOR.ui.button.prototype = {
                    render: function(b, e) {
                        var i = CKEDITOR.env, d = this._.id = CKEDITOR.tools.getNextId(), f = "", c = this.command, j;
                        this._.editor = b;
                        var k = { id: d, button: this, editor: b, focus: function() { CKEDITOR.document.getById(d).focus() }, execute: function() { this.button.click(b) }, attach: function(a) { this.button.attach(a) } },
                            l = CKEDITOR.tools.addFunction(function(a) {
                                if (k.onkey) {
                                    a =
                                        new CKEDITOR.dom.event(a);
                                    return k.onkey(k, a.getKeystroke()) !== false
                                }
                            }),
                            m = CKEDITOR.tools.addFunction(function(a) {
                                var b;
                                k.onfocus && (b = k.onfocus(k, new CKEDITOR.dom.event(a)) !== false);
                                CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble();
                                return b
                            }),
                            n = 0,
                            o = CKEDITOR.tools.addFunction(function() {
                                if (CKEDITOR.env.opera) {
                                    var a = b.editable();
                                    if (a.isInline() && a.hasFocus) {
                                        b.lockSelection();
                                        n = 1
                                    }
                                }
                            });
                        k.clickFn = j = CKEDITOR.tools.addFunction(function() {
                            if (n) {
                                b.unlockSelection(1);
                                n = 0
                            }
                            k.execute()
                        });
                        if (this.modes) {
                            var p =
                                {},
                                t = function() {
                                    var a = b.mode;
                                    if (a) {
                                        a = this.modes[a] ? p[a] != void 0 ? p[a] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                                        this.setState(b.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : a)
                                    }
                                };
                            b.on("beforeModeUnload", function() { if (b.mode && this._.state != CKEDITOR.TRISTATE_DISABLED)p[b.mode] = this._.state }, this);
                            b.on("mode", t, this);
                            !this.readOnly && b.on("readOnly", t, this)
                        } else if (c)
                            if (c = b.getCommand(c)) {
                                c.on("state", function() { this.setState(c.state) }, this);
                                f = f + (c.state == CKEDITOR.TRISTATE_ON ? "on" : c.state ==
                                    CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off")
                            }
                        if (this.directional)
                            b.on("contentDirChanged", function(a) {
                                var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), a = a.data;
                                a != b.lang.dir ? c.addClass("cke_" + a) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                                d.setAttribute("style", CKEDITOR.skin.getIconStyle(r, a == "rtl", this.icon, this.iconOffset))
                            }, this);
                        c || (f = f + "off");
                        var r = t = this.name || this.command;
                        if (this.icon && !/\./.test(this.icon)) {
                            r = this.icon;
                            this.icon = null
                        }
                        i = {
                            id: d,
                            name: t,
                            iconName: r,
                            label: this.label,
                            cls: this.className || "",
                            state: f,
                            title: this.title,
                            titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'", ""),
                            hasArrow: this.hasArrow ? "true" : "false",
                            keydownFn: l,
                            mousedownFn: o,
                            focusFn: m,
                            clickFn: j,
                            style: CKEDITOR.skin.getIconStyle(r, b.lang.dir == "rtl", this.icon, this.iconOffset),
                            arrowHtml: this.hasArrow ? h.output() : ""
                        };
                        a.output(i, e);
                        if (this.onRender)this.onRender();
                        return k
                    },
                    setState: function(a) {
                        if (this._.state == a)return false;
                        this._.state = a;
                        var b = CKEDITOR.document.getById(this._.id);
                        if (b) {
                            b.setState(a,
                                "cke_button");
                            a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled");
                            a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", true) : b.removeAttribute("aria-pressed");
                            return true
                        }
                        return false
                    }
                };
                CKEDITOR.ui.prototype.addButton = function(a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
            }(), CKEDITOR.plugins.add("richcombo", { requires: "floatpanel,listblock,button", beforeInit: function(b) { b.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } }), function() {
                var b =
                    '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)b = b + ' onkeypress="return false;"';
                CKEDITOR.env.gecko && (b = b + ' onblur="this.style.cssText = this.style.cssText;"');
                var b = b + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);"  onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' +
                    (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"),
                    h = CKEDITOR.addTemplate("combo", b);
                CKEDITOR.UI_RICHCOMBO = "richcombo";
                CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
                    $: function(a) {
                        CKEDITOR.tools.extend(this, a, { canGroup: false, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 });
                        a = this.panel || {};
                        delete this.panel;
                        this.id = CKEDITOR.tools.getNextNumber();
                        this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
                        a.className = "cke_combopanel";
                        a.block = {
                            multiSelect: a.multiSelect,
                            attributes: a.attributes
                        };
                        a.toolbarRelated = true;
                        this._ = { panelDefinition: a, items: {} }
                    },
                    proto: {
                        renderHtml: function(a) {
                            var b = [];
                            this.render(a, b);
                            return b.join("")
                        },
                        render: function(a, b) {
                            function e() {
                                var b = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                                this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b);
                                this.setValue("")
                            }

                            var i = CKEDITOR.env,
                                d = "cke_" + this.id,
                                f = CKEDITOR.tools.addFunction(function(b) {
                                    if (m) {
                                        a.unlockSelection(1);
                                        m = 0
                                    }
                                    j.execute(b)
                                }, this),
                                c = this,
                                j = {
                                    id: d,
                                    combo: this,
                                    focus: function() { CKEDITOR.document.getById(d).getChild(1).focus() },
                                    execute: function(b) {
                                        var d = c._;
                                        if (d.state != CKEDITOR.TRISTATE_DISABLED) {
                                            c.createPanel(a);
                                            if (d.on)d.panel.hide();
                                            else {
                                                c.commit();
                                                var f = c.getValue();
                                                f ? d.list.mark(f) : d.list.unmarkAll();
                                                d.panel.showBlock(c.id, new CKEDITOR.dom.element(b), 4)
                                            }
                                        }
                                    },
                                    clickFn: f
                                };
                            a.on("mode", e, this);
                            !this.readOnly && a.on("readOnly", e, this);
                            var k = CKEDITOR.tools.addFunction(function(a, b) {
                                    var a = new CKEDITOR.dom.event(a), c = a.getKeystroke();
                                    switch (c) {
                                    case 13:
                                    case 32:
                                    case 40:
                                        CKEDITOR.tools.callFunction(f,
                                            b);
                                        break;
                                    default:
                                        j.onkey(j, c)
                                    }
                                    a.preventDefault()
                                }),
                                l = CKEDITOR.tools.addFunction(function() { j.onfocus && j.onfocus() }),
                                m = 0,
                                n = CKEDITOR.tools.addFunction(function() {
                                    if (CKEDITOR.env.opera) {
                                        var b = a.editable();
                                        if (b.isInline() && b.hasFocus) {
                                            a.lockSelection();
                                            m = 1
                                        }
                                    }
                                });
                            j.keyDownFn = k;
                            i = { id: d, name: this.name || this.command, label: this.label, title: this.title, cls: this.className || "", titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'", ""), keydownFn: k, mousedownFn: n, focusFn: l, clickFn: f };
                            h.output(i, b);
                            if (this.onRender)this.onRender();
                            return j
                        },
                        createPanel: function(a) {
                            if (!this._.panel) {
                                var b = this._.panelDefinition, e = this._.panelDefinition.block, h = b.parent || CKEDITOR.document.getBody(), d = "cke_combopanel__" + this.name, f = new CKEDITOR.ui.floatPanel(a, h, b), c = f.addListBlock(this.id, e), j = this;
                                f.onShow = function() {
                                    this.element.addClass(d);
                                    j.setState(CKEDITOR.TRISTATE_ON);
                                    c.focus(!c.multiSelect && j.getValue());
                                    j._.on = 1;
                                    j.editorFocus && a.focus();
                                    if (j.onOpen)j.onOpen()
                                };
                                f.onHide = function(b) {
                                    this.element.removeClass(d);
                                    j.setState(j.modes && j.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                    j._.on = 0;
                                    if (!b && j.onClose)j.onClose()
                                };
                                f.onEscape = function() { f.hide(1) };
                                c.onClick = function(a, b) {
                                    j.onClick && j.onClick.call(j, a, b);
                                    f.hide()
                                };
                                this._.panel = f;
                                this._.list = c;
                                f.getBlock(this.id).onHide = function() {
                                    j._.on = 0;
                                    j.setState(CKEDITOR.TRISTATE_OFF)
                                };
                                this.init && this.init()
                            }
                        },
                        setValue: function(a, b) {
                            this._.value = a;
                            var e = this.document.getById("cke_" + this.id + "_text");
                            if (e) {
                                if (!a && !b) {
                                    b = this.label;
                                    e.addClass("cke_combo_inlinelabel")
                                } else e.removeClass("cke_combo_inlinelabel");
                                e.setText(typeof b != "undefined" ? b : a)
                            }
                        },
                        getValue: function() { return this._.value || "" },
                        unmarkAll: function() { this._.list.unmarkAll() },
                        mark: function(a) { this._.list.mark(a) },
                        hideItem: function(a) { this._.list.hideItem(a) },
                        hideGroup: function(a) { this._.list.hideGroup(a) },
                        showAll: function() { this._.list.showAll() },
                        add: function(a, b, e) {
                            this._.items[a] = e || a;
                            this._.list.add(a, b, e)
                        },
                        startGroup: function(a) { this._.list.startGroup(a) },
                        commit: function() {
                            if (!this._.committed) {
                                this._.list.commit();
                                this._.committed = 1;
                                CKEDITOR.ui.fire("ready",
                                    this)
                            }
                            this._.committed = 1
                        },
                        setState: function(a) {
                            if (this._.state != a) {
                                var b = this.document.getById("cke_" + this.id);
                                b.setState(a, "cke_combo");
                                a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled");
                                this._.state = a
                            }
                        },
                        enable: function() { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) },
                        disable: function() {
                            if (this._.state != CKEDITOR.TRISTATE_DISABLED) {
                                this._.lastState = this._.state;
                                this.setState(CKEDITOR.TRISTATE_DISABLED)
                            }
                        }
                    },
                    statics: { handler: { create: function(a) { return new CKEDITOR.ui.richCombo(a) } } }
                });
                CKEDITOR.ui.prototype.addRichCombo = function(a, b) { this.add(a, CKEDITOR.UI_RICHCOMBO, b) }
            }(), CKEDITOR.plugins.add("format", {
                requires: "richcombo",
                init: function(b) {
                    if (!b.blockless) {
                        for (var h = b.config, a = b.lang.format, g = h.format_tags.split(";"), e = {}, i = 0; i < g.length; i++) {
                            var d = g[i];
                            e[d] = new CKEDITOR.style(h["format_" + d]);
                            e[d]._.enterMode = b.config.enterMode
                        }
                        b.ui.addRichCombo("Format", {
                            label: a.label,
                            title: a.panelTitle,
                            toolbar: "styles,20",
                            panel: {
                                css: [CKEDITOR.skin.getPath("editor")].concat(h.contentsCss),
                                multiSelect: false,
                                attributes: { "aria-label": a.panelTitle }
                            },
                            init: function() {
                                this.startGroup(a.panelTitle);
                                for (var b in e) {
                                    var c = a["tag_" + b];
                                    this.add(b, e[b].buildPreview(c), c)
                                }
                            },
                            onClick: function(a) {
                                b.focus();
                                b.fire("saveSnapshot");
                                var a = e[a], c = b.elementPath();
                                b[a.checkActive(c) ? "removeStyle" : "applyStyle"](a);
                                setTimeout(function() { b.fire("saveSnapshot") }, 0)
                            },
                            onRender: function() {
                                b.on("selectionChange", function(a) {
                                    var c = this.getValue(), a = a.data.path, d = !b.readOnly && a.isContextFor("p");
                                    this[d ? "enable" : "disable"]();
                                    if (d) {
                                        for (var g in e)
                                            if (e[g].checkActive(a)) {
                                                g !=
                                                    c && this.setValue(g, b.lang.format["tag_" + g]);
                                                return
                                            }
                                        this.setValue("")
                                    }
                                }, this)
                            }
                        })
                    }
                }
            }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = { element: "p" }, CKEDITOR.config.format_div = { element: "div" }, CKEDITOR.config.format_pre = { element: "pre" }, CKEDITOR.config.format_address = { element: "address" }, CKEDITOR.config.format_h1 = { element: "h1" }, CKEDITOR.config.format_h2 = { element: "h2" }, CKEDITOR.config.format_h3 = { element: "h3" }, CKEDITOR.config.format_h4 = { element: "h4" }, CKEDITOR.config.format_h5 =
            { element: "h5" }, CKEDITOR.config.format_h6 = { element: "h6" }, function() {
                var b = {
                    canUndo: false,
                    exec: function(b) {
                        var a = b.document.createElement("hr");
                        b.insertElement(a)
                    }
                };
                CKEDITOR.plugins.add("horizontalrule", {
                    init: function(h) {
                        if (!h.blockless) {
                            h.addCommand("horizontalrule", b);
                            h.ui.addButton && h.ui.addButton("HorizontalRule", { label: h.lang.horizontalrule.toolbar, command: "horizontalrule", toolbar: "insert,40" })
                        }
                    }
                })
            }(), CKEDITOR.plugins.add("htmlwriter", {
                init: function(b) {
                    var h = new CKEDITOR.htmlWriter;
                    h.forceSimpleAmpersand =
                        b.config.forceSimpleAmpersand;
                    h.indentationChars = b.config.dataIndentationChars || "\t";
                    b.dataProcessor.writer = h
                }
            }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
                base: CKEDITOR.htmlParser.basicWriter,
                $: function() {
                    this.base();
                    this.indentationChars = "\t";
                    this.selfClosingEnd = " />";
                    this.lineBreakChars = "\n";
                    this.sortAttributes = 1;
                    this._.indent = 0;
                    this._.indentation = "";
                    this._.inPre = 0;
                    this._.rules = {};
                    var b = CKEDITOR.dtd, h;
                    for (h in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent))
                        this.setRules(h,
                        { indent: !b[h]["#"], breakBeforeOpen: 1, breakBeforeClose: !b[h]["#"], breakAfterClose: 1, needsSpace: h in b.$block && !(h in { li: 1, dt: 1, dd: 1 }) });
                    this.setRules("br", { breakAfterOpen: 1 });
                    this.setRules("title", { indent: 0, breakAfterOpen: 0 });
                    this.setRules("style", { indent: 0, breakBeforeClose: 1 });
                    this.setRules("pre", { breakAfterOpen: 1, indent: 0 })
                },
                proto: {
                    openTag: function(b) {
                        var h = this._.rules[b];
                        this._.afterCloser && (h && h.needsSpace && this._.needsSpace) && this._.output.push("\n");
                        if (this._.indent)this.indentation();
                        else if (h &&
                            h.breakBeforeOpen) {
                            this.lineBreak();
                            this.indentation()
                        }
                        this._.output.push("<", b);
                        this._.afterCloser = 0
                    },
                    openTagClose: function(b, h) {
                        var a = this._.rules[b];
                        if (h) {
                            this._.output.push(this.selfClosingEnd);
                            if (a && a.breakAfterClose)this._.needsSpace = a.needsSpace
                        } else {
                            this._.output.push(">");
                            if (a && a.indent)this._.indentation = this._.indentation + this.indentationChars
                        }
                        a && a.breakAfterOpen && this.lineBreak();
                        b == "pre" && (this._.inPre = 1)
                    },
                    attribute: function(b, h) {
                        if (typeof h == "string") {
                            this.forceSimpleAmpersand && (h = h.replace(/&amp;/g,
                                "&"));
                            h = CKEDITOR.tools.htmlEncodeAttr(h)
                        }
                        this._.output.push(" ", b, '="', h, '"')
                    },
                    closeTag: function(b) {
                        var h = this._.rules[b];
                        if (h && h.indent)this._.indentation = this._.indentation.substr(this.indentationChars.length);
                        if (this._.indent)this.indentation();
                        else if (h && h.breakBeforeClose) {
                            this.lineBreak();
                            this.indentation()
                        }
                        this._.output.push("</", b, ">");
                        b == "pre" && (this._.inPre = 0);
                        if (h && h.breakAfterClose) {
                            this.lineBreak();
                            this._.needsSpace = h.needsSpace
                        }
                        this._.afterCloser = 1
                    },
                    text: function(b) {
                        if (this._.indent) {
                            this.indentation();
                            !this._.inPre && (b = CKEDITOR.tools.ltrim(b))
                        }
                        this._.output.push(b)
                    },
                    comment: function(b) {
                        this._.indent && this.indentation();
                        this._.output.push("<\!--", b, "--\>")
                    },
                    lineBreak: function() {
                        !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars);
                        this._.indent = 1
                    },
                    indentation: function() {
                        !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                        this._.indent = 0
                    },
                    reset: function() {
                        this._.output = [];
                        this._.indent = 0;
                        this._.indentation = "";
                        this._.afterCloser = 0;
                        this._.inPre = 0
                    },
                    setRules: function(b,
                        h) {
                        var a = this._.rules[b];
                        a ? CKEDITOR.tools.extend(a, h, true) : this._.rules[b] = h
                    }
                }
            }), function() {
                function b(a, b) {
                    b || (b = a.getSelection().getSelectedElement());
                    if (b && b.is("img") && !b.data("cke-realelement") && !b.isReadOnly())return b
                }

                function h(a) {
                    var b = a.getStyle("float");
                    if (b == "inherit" || b == "none")b = 0;
                    b || (b = a.getAttribute("align"));
                    return b
                }

                CKEDITOR.plugins.add("image", {
                    requires: "dialog",
                    init: function(a) {
                        CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                        a.addCommand("image", new CKEDITOR.dialogCommand("image"));
                        a.ui.addButton && a.ui.addButton("Image", { label: a.lang.common.image, command: "image", toolbar: "insert,10" });
                        a.on("doubleclick", function(a) {
                            var b = a.data.element;
                            if (b.is("img") && !b.data("cke-realelement") && !b.isReadOnly())a.data.dialog = "image"
                        });
                        a.addMenuItems && a.addMenuItems({ image: { label: a.lang.image.menu, command: "image", group: "image" } });
                        a.contextMenu && a.contextMenu.addListener(function(g) { if (b(a, g))return{ image: CKEDITOR.TRISTATE_OFF } })
                    },
                    afterInit: function(a) {
                        function g(e) {
                            var g = a.getCommand("justify" +
                                e);
                            if (g) {
                                if (e == "left" || e == "right")
                                    g.on("exec", function(d) {
                                        var f = b(a), c;
                                        if (f) {
                                            c = h(f);
                                            if (c == e) {
                                                f.removeStyle("float");
                                                e == h(f) && f.removeAttribute("align")
                                            } else f.setStyle("float", e);
                                            d.cancel()
                                        }
                                    });
                                g.on("refresh", function(d) {
                                    var f = b(a);
                                    if (f) {
                                        f = h(f);
                                        this.setState(f == e ? CKEDITOR.TRISTATE_ON : e == "right" || e == "left" ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                        d.cancel()
                                    }
                                })
                            }
                        }

                        g("left");
                        g("right");
                        g("center");
                        g("block")
                    }
                })
            }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function() {
                function b(a, b) {
                    var c = g.exec(a),
                        e = g.exec(b);
                    if (c) {
                        if (!c[2] && e[2] == "px")return e[1];
                        if (c[2] == "px" && !e[2])return e[1] + "px"
                    }
                    return b
                }

                var h = CKEDITOR.htmlParser.cssStyle,
                    a = CKEDITOR.tools.cssLength,
                    g = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
                    e = {
                        elements: {
                            $: function(a) {
                                var f = a.attributes;
                                if ((f = (f = (f = f && f["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(f))) && f.children[0]) && a.attributes["data-cke-resizable"]) {
                                    var c = (new h(a)).rules, a = f.attributes, e = c.width, c = c.height;
                                    e && (a.width = b(a.width, e));
                                    c && (a.height =
                                        b(a.height, c))
                                }
                                return f
                            }
                        }
                    },
                    i = CKEDITOR.plugins.add("fakeobjects", { afterInit: function(a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(e) } });
                CKEDITOR.editor.prototype.createFakeElement = function(b, f, c, e) {
                    var g = this.lang.fakeobjects, g = g[c] || g.unknown, f = { "class": f, "data-cke-realelement": encodeURIComponent(b.getOuterHtml()), "data-cke-real-node-type": b.type, alt: g, title: g, align: b.getAttribute("align") || "" };
                    if (!CKEDITOR.env.hc)f.src = CKEDITOR.getUrl(i.path + "images/spacer.gif");
                    c && (f["data-cke-real-element-type"] =
                        c);
                    if (e) {
                        f["data-cke-resizable"] = e;
                        c = new h;
                        e = b.getAttribute("width");
                        b = b.getAttribute("height");
                        e && (c.rules.width = a(e));
                        b && (c.rules.height = a(b));
                        c.populate(f)
                    }
                    return this.document.createElement("img", { attributes: f })
                };
                CKEDITOR.editor.prototype.createFakeParserElement = function(b, f, c, e) {
                    var g = this.lang.fakeobjects, g = g[c] || g.unknown, l;
                    l = new CKEDITOR.htmlParser.basicWriter;
                    b.writeHtml(l);
                    l = l.getHtml();
                    f = {
                        "class": f,
                        "data-cke-realelement": encodeURIComponent(l),
                        "data-cke-real-node-type": b.type,
                        alt: g,
                        title: g,
                        align: b.attributes.align || ""
                    };
                    if (!CKEDITOR.env.hc)f.src = CKEDITOR.getUrl(i.path + "images/spacer.gif");
                    c && (f["data-cke-real-element-type"] = c);
                    if (e) {
                        f["data-cke-resizable"] = e;
                        e = b.attributes;
                        b = new h;
                        c = e.width;
                        e = e.height;
                        c != void 0 && (b.rules.width = a(c));
                        e != void 0 && (b.rules.height = a(e));
                        b.populate(f)
                    }
                    return new CKEDITOR.htmlParser.element("img", f)
                };
                CKEDITOR.editor.prototype.restoreRealElement = function(a) {
                    if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT)return null;
                    var f = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")),
                        this.document);
                    if (a.data("cke-resizable")) {
                        var c = a.getStyle("width"), a = a.getStyle("height");
                        c && f.setAttribute("width", b(f.getAttribute("width"), c));
                        a && f.setAttribute("height", b(f.getAttribute("height"), a))
                    }
                    return f
                }
            }(), CKEDITOR.plugins.add("link", {
                requires: "dialog,fakeobjects",
                onLoad: function() {
                    function b(b) { return a.replace(/%1/g, b == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" + b) }

                    var h = "background:url(" + CKEDITOR.getUrl(this.path + "images/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;",
                        a = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + h + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.env.ie ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" + h + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
                    CKEDITOR.addCss(b("ltr") + b("rtl"))
                },
                init: function(b) {
                    b.addCommand("link", new CKEDITOR.dialogCommand("link"));
                    b.addCommand("anchor", new CKEDITOR.dialogCommand("anchor"));
                    b.addCommand("unlink", new CKEDITOR.unlinkCommand);
                    b.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
                    b.setKeystroke(CKEDITOR.CTRL + 76, "link");
                    if (b.ui.addButton) {
                        b.ui.addButton("Link", { label: b.lang.link.toolbar, command: "link", toolbar: "links,10" });
                        b.ui.addButton("Unlink", { label: b.lang.link.unlink, command: "unlink", toolbar: "links,20" });
                        b.ui.addButton("Anchor", { label: b.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30" })
                    }
                    CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
                    CKEDITOR.dialog.add("anchor",
                        this.path + "dialogs/anchor.js");
                    b.on("doubleclick", function(h) {
                        var a = CKEDITOR.plugins.link.getSelectedLink(b) || h.data.element;
                        if (!a.isReadOnly())
                            if (a.is("a")) {
                                h.data.dialog = a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()) ? "anchor" : "link";
                                b.getSelection().selectElement(a)
                            } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a))h.data.dialog = "anchor"
                    });
                    b.addMenuItems && b.addMenuItems({
                        anchor: { label: b.lang.link.anchor.menu, command: "anchor", group: "anchor", order: 1 },
                        removeAnchor: {
                            label: b.lang.link.anchor.remove,
                            command: "removeAnchor",
                            group: "anchor",
                            order: 5
                        },
                        link: { label: b.lang.link.menu, command: "link", group: "link", order: 1 },
                        unlink: { label: b.lang.link.unlink, command: "unlink", group: "link", order: 5 }
                    });
                    b.contextMenu && b.contextMenu.addListener(function(h) {
                        if (!h || h.isReadOnly())return null;
                        h = CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, h);
                        if (!h && !(h = CKEDITOR.plugins.link.getSelectedLink(b)))return null;
                        var a = {};
                        h.getAttribute("href") && h.getChildCount() && (a = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF });
                        if (h && h.hasAttribute("name"))a.anchor = a.removeAnchor = CKEDITOR.TRISTATE_OFF;
                        return a
                    })
                },
                afterInit: function(b) {
                    var h = b.dataProcessor, a = h && h.dataFilter, h = h && h.htmlFilter, g = b._.elementsPath && b._.elementsPath.filters;
                    a && a.addRules({
                        elements: {
                            a: function(a) {
                                var g = a.attributes;
                                if (!g.name)return null;
                                var d = !a.children.length;
                                if (CKEDITOR.plugins.link.synAnchorSelector) {
                                    var a = d ? "cke_anchor_empty" : "cke_anchor", f = g["class"];
                                    if (g.name && (!f || f.indexOf(a) < 0))g["class"] = (f || "") + " " + a;
                                    if (d && CKEDITOR.plugins.link.emptyAnchorFix) {
                                        g.contenteditable =
                                            "false";
                                        g["data-cke-editable"] = 1
                                    }
                                } else if (CKEDITOR.plugins.link.fakeAnchor && d)return b.createFakeParserElement(a, "cke_anchor", "anchor");
                                return null
                            }
                        }
                    });
                    CKEDITOR.plugins.link.emptyAnchorFix && h && h.addRules({ elements: { a: function(a) { delete a.attributes.contenteditable } } });
                    g && g.push(function(a, g) { if (g == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount())))return"anchor" })
                }
            }), CKEDITOR.plugins.link = {
                getSelectedLink: function(b) {
                    var h =
                            b.getSelection(),
                        a = h.getSelectedElement();
                    if (a && a.is("a"))return a;
                    if (h = h.getRanges(true)[0]) {
                        h.shrink(CKEDITOR.SHRINK_TEXT);
                        return b.elementPath(h.getCommonAncestor()).contains("a", 1)
                    }
                    return null
                },
                fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit,
                synAnchorSelector: CKEDITOR.env.ie,
                emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
                tryRestoreFakeAnchor: function(b, h) {
                    if (h && h.data("cke-real-element-type") && h.data("cke-real-element-type") == "anchor") {
                        var a = b.restoreRealElement(h);
                        if (a.data("cke-saved-name"))return a
                    }
                }
            },
            CKEDITOR.unlinkCommand = function() {}, CKEDITOR.unlinkCommand.prototype = {
                exec: function(b) {
                    var h = new CKEDITOR.style({ element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 });
                    b.removeStyle(h)
                },
                refresh: function(b, h) {
                    var a = h.lastElement && h.lastElement.getAscendant("a", true);
                    a && a.getName() == "a" && a.getAttribute("href") && a.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
                },
                contextSensitive: 1,
                startDisabled: 1
            }, CKEDITOR.removeAnchorCommand = function() {}, CKEDITOR.removeAnchorCommand.prototype =
            {
                exec: function(b) {
                    var h = b.getSelection(), a = h.createBookmarks(), g;
                    if (h && (g = h.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !g.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(b, g) : g.is("a")))g.remove(1);
                    else if (g = CKEDITOR.plugins.link.getSelectedLink(b))
                        if (g.hasAttribute("href")) {
                            g.removeAttributes({ name: 1, "data-cke-saved-name": 1 });
                            g.removeClass("cke_anchor")
                        } else g.remove(1);
                    h.selectBookmarks(a)
                }
            }, CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 }),
            "use strict", function() {
                function b(a, b, c) { return j(b) && j(c) && c.equals(b.getNext(function(a) { return!(T(a) || V(a) || k(a)) })) }

                function h(a) {
                    this.upper = a[0];
                    this.lower = a[1];
                    this.set.apply(this, a.slice(2))
                }

                function a(a) {
                    var b = a.element, c;
                    return b && j(b) ? (c = b.getAscendant(a.triggers, true)) && !c.contains(a.editable) && !c.equals(a.editable) ? c : null : null
                }

                function g(a, b, c) {
                    r(a, b);
                    r(a, c);
                    a = b.size.bottom;
                    c = c.size.top;
                    return a && c ? 0 | (a + c) / 2 : a || c
                }

                function e(a, b, d) {
                    return b = b[d ? "getPrevious" : "getNext"](function(b) {
                        return b &&
                            b.type == CKEDITOR.NODE_TEXT && !T(b) || j(b) && !k(b) && !c(a, b)
                    })
                }

                function i(a) {
                    var b = a.doc, c = q('<span contenteditable="false" style="' + Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b);
                    w(c, {
                        attach: function() {
                            this.wrap.getParent() || this.wrap.appendTo(a.editable, true);
                            return this
                        },
                        lineChildren: [
                            w(q('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
                                base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + this.path + "images/icon.png) center no-repeat " +
                                    a.boxColor + ";cursor:pointer;" + (u.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : ""),
                                looks: ["top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1)]
                            }), w(q(O, b), { base: R + "left:0px;border-left-color:" + a.boxColor + ";", looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"] }),
                            w(q(O, b), { base: R + "right:0px;border-right-color:" + a.boxColor + ";", looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"] })
                        ],
                        detach: function() {
                            this.wrap.getParent() && this.wrap.remove();
                            return this
                        },
                        mouseNear: function() {
                            r(a, this);
                            var b = a.holdDistance, c = this.size;
                            return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? true : false
                        },
                        place: function() {
                            var b = a.view,
                                c = a.editable,
                                d = a.trigger,
                                f = d.upper,
                                e = d.lower,
                                g =
                                    f || e,
                                h = g.getParent(),
                                i = {};
                            this.trigger = d;
                            f && r(a, f, true);
                            e && r(a, e, true);
                            r(a, h, true);
                            a.inInlineMode && s(a, true);
                            if (h.equals(c)) {
                                i.left = b.scroll.x;
                                i.right = -b.scroll.x;
                                i.width = ""
                            } else {
                                i.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0);
                                i.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x;
                                i.right = ""
                            }
                            if (f && e)
                                i.top = f.size.margin.bottom === e.size.margin.top ? 0 | f.size.bottom + f.size.margin.bottom / 2 : f.size.margin.bottom < e.size.margin.top ?
                                    f.size.bottom + f.size.margin.bottom : f.size.bottom + f.size.margin.bottom - e.size.margin.top;
                            else if (f) {
                                if (!e)i.top = f.size.bottom + f.size.margin.bottom
                            } else i.top = e.size.top - e.size.margin.top;
                            if (d.is(E) || i.top > b.scroll.y - 15 && i.top < b.scroll.y + 5) {
                                i.top = a.inInlineMode ? 0 : b.scroll.y;
                                this.look(E)
                            } else if (d.is(K) || i.top > b.pane.bottom - 5 && i.top < b.pane.bottom + 15) {
                                i.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1;
                                this.look(K)
                            } else {
                                if (a.inInlineMode)
                                    i.top = i.top -
                                    (b.editable.top + b.editable.border.top);
                                this.look(I)
                            }
                            if (a.inInlineMode) {
                                i.top--;
                                i.top = i.top + b.editable.scroll.top;
                                i.left = i.left + b.editable.scroll.left
                            }
                            for (var j in i)i[j] = CKEDITOR.tools.cssLength(i[j]);
                            this.setStyles(i)
                        },
                        look: function(a) {
                            if (this.oldLook != a) {
                                for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                                this.oldLook = a
                            }
                        },
                        wrap: new v("span", a.doc)
                    });
                    for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c);
                    c.look(I);
                    c.appendTo(c.wrap);
                    c.unselectable();
                    c.lineChildren[0].on("mouseup", function(b) {
                        c.detach();
                        d(a, function(b) {
                            var c = a.line.trigger;
                            b[c.is(A) ? "insertBefore" : "insertAfter"](c.is(A) ? c.lower : c.upper)
                        }, true);
                        a.editor.focus();
                        !u.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                        b.data.preventDefault(true)
                    });
                    c.on("mousedown", function(a) { a.data.preventDefault(true) });
                    a.line = c
                }

                function d(a, b, c) {
                    var d = new CKEDITOR.dom.range(a.doc), f = a.editor, e;
                    if (u.ie && a.enterMode == CKEDITOR.ENTER_BR)e = a.doc.createText(G);
                    else {
                        e = new v(a.enterBehavior,
                            a.doc);
                        a.enterMode != CKEDITOR.ENTER_BR && a.doc.createText(G).appendTo(e)
                    }
                    c && f.fire("saveSnapshot");
                    b(e);
                    d.moveToPosition(e, CKEDITOR.POSITION_AFTER_START);
                    f.getSelection().selectRanges([d]);
                    a.hotNode = e;
                    c && f.fire("saveSnapshot")
                }

                function f(b, c) {
                    return{
                        canUndo: true,
                        modes: { wysiwyg: 1 },
                        exec: function() {
                            function f(a) {
                                var e = u.ie && u.version < 9 ? " " : G, g = b.hotNode && b.hotNode.getText() == e && b.element.equals(b.hotNode) && b.lastCmdDirection === !!c;
                                d(b, function(d) {
                                    g && b.hotNode && b.hotNode.remove();
                                    d[c ? "insertAfter" : "insertBefore"](a);
                                    d.setAttributes({ "data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c });
                                    b.lastCmdDirection = !!c
                                });
                                !u.ie && b.enterMode != CKEDITOR.ENTER_BR && b.hotNode.scrollIntoView();
                                b.line.detach()
                            }

                            return function(d) {
                                d = d.getSelection().getStartElement();
                                if ((d = d.getAscendant(P, 1)) && !d.equals(b.editable) && !d.contains(b.editable)) {
                                    b.element = d;
                                    var g = e(b, d, !c), h;
                                    if (j(g) && g.is(b.triggers) && g.is(J) && (!e(b, g, !c) || (h = e(b, g, !c)) && j(h) && h.is(b.triggers)))f(g);
                                    else {
                                        h = a(b, d);
                                        if (j(h))
                                            if (e(b, h, !c))
                                                (d = e(b, h, !c)) && (j(d) && d.is(b.triggers)) &&
                                                    f(h);
                                            else f(h)
                                    }
                                }
                            }
                        }()
                    }
                }

                function c(a, b) {
                    if (!b || !(b.type == CKEDITOR.NODE_ELEMENT && b.$))return false;
                    var c = a.line;
                    return c.wrap.equals(b) || c.wrap.contains(b)
                }

                function j(a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.$ }

                function k(a) {
                    if (!j(a))return false;
                    var b;
                    if (!(b = l(a)))
                        if (j(a)) {
                            b = { left: 1, right: 1, center: 1 };
                            b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])
                        } else b = false;
                    return b
                }

                function l(a) { return!!{ absolute: 1, fixed: 1, relative: 1 }[a.getComputedStyle("position")] }

                function m(a, b) {
                    return j(b) ?
                        b.is(a.triggers) : null
                }

                function n(a, b, c) {
                    b = b[c ? "getLast" : "getFirst"](function(b) { return a.isRelevant(b) && !b.is(L) });
                    if (!b)return false;
                    r(a, b);
                    return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
                }

                function o(a) {
                    var b = a.editable, d = a.mouse, f = a.view, e = a.triggerOffset;
                    s(a);
                    var g = d.y > (a.inInlineMode ? f.editable.top + f.editable.height / 2 : Math.min(f.editable.height, f.pane.height) / 2), b = b[g ? "getLast" : "getFirst"](function(a) { return!(T(a) || V(a)) });
                    if (!b)return null;
                    c(a, b) && (b = a.line.wrap[g ? "getPrevious" : "getNext"](function(a) {
                        return!(T(a) ||
                            V(a))
                    }));
                    if (!j(b) || k(b) || !m(a, b))return null;
                    r(a, b);
                    if (!g && b.size.top >= 0 && d.y > 0 && d.y < b.size.top + e) {
                        a = a.inInlineMode || f.scroll.y === 0 ? E : I;
                        return new h([null, b, A, D, a])
                    }
                    if (g && b.size.bottom <= f.pane.height && d.y > b.size.bottom - e && d.y < f.pane.height) {
                        a = a.inInlineMode || b.size.bottom > f.pane.height - e && b.size.bottom < f.pane.height ? K : I;
                        return new h([b, null, z, D, a])
                    }
                    return null
                }

                function p(b) {
                    var c = b.mouse, d = b.view, f = b.triggerOffset, g = a(b);
                    if (!g)return null;
                    r(b, g);
                    var f = Math.min(f, 0 | g.size.outerHeight / 2), i = [], l, o;
                    if (c.y >
                        g.size.top - 1 && c.y < g.size.top + f)o = false;
                    else if (c.y > g.size.bottom - f && c.y < g.size.bottom + 1)o = true;
                    else return null;
                    if (k(g) || n(b, g, o) || g.getParent().is(H))return null;
                    var p = e(b, g, !o);
                    if (p) {
                        if (p && p.type == CKEDITOR.NODE_TEXT)return null;
                        if (j(p)) {
                            if (k(p) || !m(b, p) || p.getParent().is(H))return null;
                            i = [p, g][o ? "reverse" : "concat"]().concat([C, D])
                        }
                    } else {
                        if (g.equals(b.editable[o ? "getLast" : "getFirst"](b.isRelevant))) {
                            s(b);
                            o && c.y > g.size.bottom - f && c.y < d.pane.height && g.size.bottom > d.pane.height - f && g.size.bottom < d.pane.height ?
                                l = K : c.y > 0 && c.y < g.size.top + f && (l = E)
                        } else l = I;
                        i = [null, g][o ? "reverse" : "concat"]().concat([o ? z : A, D, l, g.equals(b.editable[o ? "getLast" : "getFirst"](b.isRelevant)) ? o ? K : E : I])
                    }
                    return 0 in i ? new h(i) : null
                }

                function t(a, b, c, d) {
                    for (var f = function() {
                                 var c = u.ie ? b.$.currentStyle : a.win.$.getComputedStyle(b.$, "");
                                 return u.ie ? function(a) { return c[CKEDITOR.tools.cssStyleToDomStyle(a)] } : function(a) { return c.getPropertyValue(a) }
                             }(),
                        e = b.getDocumentPosition(),
                        g = {},
                        h = {},
                        i = {},
                        j = {},
                        k = S.length; k--;) {
                        g[S[k]] = parseInt(f("border-" +
                            S[k] + "-width"), 10) || 0;
                        i[S[k]] = parseInt(f("padding-" + S[k]), 10) || 0;
                        h[S[k]] = parseInt(f("margin-" + S[k]), 10) || 0
                    }
                    (!c || d) && x(a, d);
                    j.top = e.y - (c ? 0 : a.view.scroll.y);
                    j.left = e.x - (c ? 0 : a.view.scroll.x);
                    j.outerWidth = b.$.offsetWidth;
                    j.outerHeight = b.$.offsetHeight;
                    j.height = j.outerHeight - (i.top + i.bottom + g.top + g.bottom);
                    j.width = j.outerWidth - (i.left + i.right + g.left + g.right);
                    j.bottom = j.top + j.outerHeight;
                    j.right = j.left + j.outerWidth;
                    if (a.inInlineMode)j.scroll = { top: b.$.scrollTop, left: b.$.scrollLeft };
                    return w({
                        border: g,
                        padding: i,
                        margin: h,
                        ignoreScroll: c
                    }, j, true)
                }

                function r(a, b, c) {
                    if (!j(b))return b.size = null;
                    if (b.size) {
                        if (b.size.ignoreScroll == c && b.size.date > new Date - M)return null
                    } else b.size = {};
                    return w(b.size, t(a, b, c), { date: +new Date }, true)
                }

                function s(a, b) { a.view.editable = t(a, a.editable, b, true) }

                function x(a, b) {
                    if (!a.view)a.view = {};
                    var c = a.view;
                    if (b || !(c && c.date > new Date - M)) {
                        var d = a.win, c = d.getScrollPosition(), d = d.getViewPaneSize();
                        w(a.view, {
                            scroll: {
                                x: c.x,
                                y: c.y,
                                width: a.doc.$.documentElement.scrollWidth - d.width,
                                height: a.doc.$.documentElement.scrollHeight -
                                    d.height
                            },
                            pane: { width: d.width, height: d.height, bottom: d.height + c.y },
                            date: +new Date
                        }, true)
                    }
                }

                function y(a, b, c, d) {
                    for (var f = d, e = d, g = 0, i = false, j = false, k = a.view.pane.height, n = a.mouse; n.y + g < k && n.y - g > 0;) {
                        i || (i = b(f, d));
                        j || (j = b(e, d));
                        !i && n.y - g > 0 && (f = c(a, { x: n.x, y: n.y - g }));
                        !j && n.y + g < k && (e = c(a, { x: n.x, y: n.y + g }));
                        if (i && j)break;
                        g = g + 2
                    }
                    return new h([f, e, null, null])
                }

                CKEDITOR.plugins.add("magicline", {
                    init: function(b) {
                        var g = {};
                        g[CKEDITOR.ENTER_BR] = "br";
                        g[CKEDITOR.ENTER_P] = "p";
                        g[CKEDITOR.ENTER_DIV] = "div";
                        var n = b.config,
                            m = n.magicline_triggerOffset || 30,
                            r = n.enterMode,
                            q = { editor: b, enterBehavior: g[r], enterMode: r, triggerOffset: m, holdDistance: 0 | m * (n.magicline_holdDistance || 0.5), boxColor: n.magicline_color || "#ff0000", rtl: n.contentsLangDirection == "rtl", triggers: n.magicline_everywhere ? P : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 } },
                            v,
                            y,
                            A;
                        q.isRelevant = function(a) { return j(a) && !c(q, a) && !k(a) };
                        b.on("contentDom", function() {
                            var g = b.editable(), j = b.document, k = b.window;
                            w(q, { editable: g, inInlineMode: g.isInline(), doc: j, win: k },
                                true);
                            q.boundary = q.inInlineMode ? q.editable : q.doc.getDocumentElement();
                            if (!g.is(B.$inline)) {
                                q.inInlineMode && !l(g) && g.setStyles({ position: "relative", top: null, left: null });
                                i.call(this, q);
                                x(q);
                                g.attachListener(b, "beforeUndoImage", function() { q.line.detach() });
                                g.attachListener(b, "beforeGetData", function() {
                                    if (q.line.wrap.getParent()) {
                                        q.line.detach();
                                        b.once("getData", function() { q.line.attach() }, null, null, 1E3)
                                    }
                                }, null, null, 0);
                                g.attachListener(q.inInlineMode ? j : j.getWindow().getFrame(), "mouseout", function(a) {
                                    if (b.mode ==
                                        "wysiwyg")
                                        if (q.inInlineMode) {
                                            var c = a.data.$.clientX, a = a.data.$.clientY;
                                            x(q);
                                            s(q, true);
                                            var d = q.view.editable, f = q.view.scroll;
                                            if (!(c > d.left - f.x && c < d.right - f.x) || !(a > d.top - f.y && a < d.bottom - f.y)) {
                                                clearTimeout(A);
                                                A = null;
                                                q.line.detach()
                                            }
                                        } else {
                                            clearTimeout(A);
                                            A = null;
                                            q.line.detach()
                                        }
                                });
                                g.attachListener(g, "keyup", function() { q.hiddenMode = 0 });
                                g.attachListener(g, "keydown", function(a) {
                                    if (b.mode == "wysiwyg") {
                                        a = a.data.getKeystroke();
                                        b.getSelection().getStartElement();
                                        switch (a) {
                                        case 2228240:
                                        case 16:
                                            q.hiddenMode = 1;
                                            q.line.detach()
                                        }
                                    }
                                });
                                g.attachListener(q.inInlineMode ? g : j, "mousemove", function(a) {
                                    y = true;
                                    if (!(b.mode != "wysiwyg" || b.readOnly || A)) {
                                        var c = { x: a.data.$.clientX, y: a.data.$.clientY };
                                        A = setTimeout(function() {
                                            q.mouse = c;
                                            A = q.trigger = null;
                                            x(q);
                                            if (y && !q.hiddenMode && b.focusManager.hasFocus && !q.line.mouseNear() && (q.element = U(q, true))) {
                                                if (q.trigger = o(q) || p(q) || W(q))q.line.attach().place();
                                                else {
                                                    q.trigger = null;
                                                    q.line.detach()
                                                }
                                                y = false
                                            }
                                        }, 30)
                                    }
                                });
                                g.attachListener(k, "scroll", function() {
                                    if (b.mode == "wysiwyg") {
                                        q.line.detach();
                                        if (u.webkit) {
                                            q.hiddenMode = 1;
                                            clearTimeout(v);
                                            v = setTimeout(function() { q.hiddenMode = 0 }, 50)
                                        }
                                    }
                                });
                                g.attachListener(k, "mousedown", function() {
                                    if (b.mode == "wysiwyg") {
                                        q.line.detach();
                                        q.hiddenMode = 1
                                    }
                                });
                                g.attachListener(k, "mouseup", function() { q.hiddenMode = 0 });
                                b.addCommand("accessPreviousSpace", f(q));
                                b.addCommand("accessNextSpace", f(q, true));
                                b.setKeystroke([[n.magicline_keystrokePrevious, "accessPreviousSpace"], [n.magicline_keystrokeNext, "accessNextSpace"]]);
                                b.on("loadSnapshot", function() {
                                    for (var a = j.getElementsByTag(q.enterBehavior),
                                        b,
                                        c = a.count(); c--;)
                                        if ((b = a.getItem(c)).hasAttribute("data-cke-magicline-hot")) {
                                            q.hotNode = b;
                                            q.lastCmdDirection = b.getAttribute("data-cke-magicline-dir") === "true" ? true : false;
                                            break
                                        }
                                });
                                this.backdoor = { accessFocusSpace: d, boxTrigger: h, isLine: c, getAscendantTrigger: a, getNonEmptyNeighbour: e, getSize: t, that: q, triggerEdge: p, triggerEditable: o, triggerExpand: W }
                            }
                        }, this)
                    }
                });
                var w = CKEDITOR.tools.extend,
                    v = CKEDITOR.dom.element,
                    q = v.createFromHtml,
                    u = CKEDITOR.env,
                    B = CKEDITOR.dtd,
                    A = 128,
                    z = 64,
                    C = 32,
                    D = 16,
                    F = 8,
                    E = 4,
                    K = 2,
                    I = 1,
                    G = " ",
                    H = B.$listItem,
                    L = B.$tableContent,
                    J = w({}, B.$nonEditable, B.$empty),
                    P = B.$block,
                    M = 100,
                    Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
                    R = Q + "border-color:transparent;display:block;border-style:solid;",
                    O = "<span>" + G + "</span>";
                h.prototype = {
                    set: function(a, b, c) {
                        this.properties = a + b + (c || I);
                        return this
                    },
                    is: function(a) { return(this.properties & a) == a }
                };
                var U = function() {
                        return function(a, b, d) {
                            if (!a.mouse)return null;
                            var f = a.doc,
                                e =
                                    a.line.wrap,
                                d = d || a.mouse,
                                g = new CKEDITOR.dom.element(f.$.elementFromPoint(d.x, d.y));
                            if (b && c(a, g)) {
                                e.hide();
                                g = new CKEDITOR.dom.element(f.$.elementFromPoint(d.x, d.y));
                                e.show()
                            }
                            return!g || !(g.type == CKEDITOR.NODE_ELEMENT && g.$) || u.ie && u.version < 9 && !a.boundary.equals(g) && !a.boundary.contains(g) ? null : g
                        }
                    }(),
                    T = CKEDITOR.dom.walker.whitespaces(),
                    V = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
                    W = function() {
                        function a(c) {
                            var f = c.element, e, h, i;
                            if (!j(f) || f.contains(c.editable))return null;
                            i = y(c, function(a, b) { return!b.equals(a) },
                                function(a, b) { return U(a, true, b) }, f);
                            e = i.upper;
                            h = i.lower;
                            if (b(c, e, h))return i.set(C, F);
                            if (e && f.contains(e))for (; !e.getParent().equals(f);)e = e.getParent();
                            else e = f.getFirst(function(a) { return d(c, a) });
                            if (h && f.contains(h))for (; !h.getParent().equals(f);)h = h.getParent();
                            else h = f.getLast(function(a) { return d(c, a) });
                            if (!e || !h)return null;
                            r(c, e);
                            r(c, h);
                            if (!(c.mouse.y > e.size.top && c.mouse.y < h.size.bottom))return null;
                            for (var f = Number.MAX_VALUE, k, n, o, l; h && !h.equals(e);) {
                                if (!(n = e.getNext(c.isRelevant)))break;
                                k = Math.abs(g(c, e, n) - c.mouse.y);
                                if (k < f) {
                                    f = k;
                                    o = e;
                                    l = n
                                }
                                e = n;
                                r(c, e)
                            }
                            if (!o || !l || !(c.mouse.y > o.size.top && c.mouse.y < l.size.bottom))return null;
                            i.upper = o;
                            i.lower = l;
                            return i.set(C, F)
                        }

                        function d(a, b) { return!(b && b.type == CKEDITOR.NODE_TEXT || V(b) || k(b) || c(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br")) }

                        return function(c) {
                            var d = a(c), f;
                            if (f = d) {
                                f = d.upper;
                                var e = d.lower;
                                f = !f || !e || k(e) || k(f) || e.equals(f) || f.equals(e) || e.contains(f) || f.contains(e) ? false : m(c, f) && m(c, e) && b(c, f, e) ? true : false
                            }
                            return f ? d : null
                        }
                    }(),
                    S = [
                        "top",
                        "left", "right", "bottom"
                    ]
            }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 219, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 221, function() {
                function b(a) {
                    if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form")return[];
                    for (var b = [], f = ["style", "className"], c = 0; c < f.length; c++) {
                        var e = a.$.elements.namedItem(f[c]);
                        if (e) {
                            e = new CKEDITOR.dom.element(e);
                            b.push([e, e.nextSibling]);
                            e.remove()
                        }
                    }
                    return b
                }

                function h(a, b) {
                    if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() !=
                        "form") && b.length > 0)
                        for (var f = b.length - 1; f >= 0; f--) {
                            var c = b[f][0], e = b[f][1];
                            e ? c.insertBefore(e) : c.appendTo(a)
                        }
                }

                function a(a, d) {
                    var f = b(a), c = {}, e = a.$;
                    if (!d) {
                        c["class"] = e.className || "";
                        e.className = ""
                    }
                    c.inline = e.style.cssText || "";
                    if (!d)e.style.cssText = "position: static; overflow: visible";
                    h(f);
                    return c
                }

                function g(a, d) {
                    var f = b(a), c = a.$;
                    if ("class" in d)c.className = d["class"];
                    if ("inline" in d)c.style.cssText = d.inline;
                    h(f)
                }

                function e(a) {
                    if (!a.editable().isInline()) {
                        var b = CKEDITOR.instances, f;
                        for (f in b) {
                            var c =
                                b[f];
                            if (c.mode == "wysiwyg" && !c.readOnly) {
                                c = c.document.getBody();
                                c.setAttribute("contentEditable", false);
                                c.setAttribute("contentEditable", true)
                            }
                        }
                        if (a.editable().hasFocus) {
                            a.toolbox.focus();
                            a.focus()
                        }
                    }
                }

                CKEDITOR.plugins.add("maximize", {
                    init: function(b) {
                        function d() {
                            var a = h.getViewPaneSize();
                            b.resize(a.width, a.height, null, true)
                        }

                        if (b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var f = b.lang, c = CKEDITOR.document, h = c.getWindow(), k, l, m, n = CKEDITOR.TRISTATE_OFF;
                            b.addCommand("maximize", {
                                modes: {
                                    wysiwyg: !CKEDITOR.env.iOS,
                                    source: !CKEDITOR.env.iOS
                                },
                                readOnly: 1,
                                editorFocus: false,
                                exec: function() {
                                    var o = b.container.getChild(1), p = b.ui.space("contents");
                                    if (b.mode == "wysiwyg") {
                                        var t = b.getSelection();
                                        k = t && t.getRanges();
                                        l = h.getScrollPosition()
                                    } else {
                                        var r = b.editable().$;
                                        k = !CKEDITOR.env.ie && [r.selectionStart, r.selectionEnd];
                                        l = [r.scrollLeft, r.scrollTop]
                                    }
                                    if (this.state == CKEDITOR.TRISTATE_OFF) {
                                        h.on("resize", d);
                                        m = h.getScrollPosition();
                                        for (t = b.container; t = t.getParent();) {
                                            t.setCustomData("maximize_saved_styles", a(t));
                                            t.setStyle("z-index",
                                                b.config.baseFloatZIndex - 5)
                                        }
                                        p.setCustomData("maximize_saved_styles", a(p, true));
                                        o.setCustomData("maximize_saved_styles", a(o, true));
                                        p = { overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0 };
                                        c.getDocumentElement().setStyles(p);
                                        !CKEDITOR.env.gecko && c.getDocumentElement().setStyle("position", "fixed");
                                        (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && c.getBody().setStyles(p);
                                        CKEDITOR.env.ie ? setTimeout(function() { h.$.scrollTo(0, 0) }, 0) : h.$.scrollTo(0, 0);
                                        o.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ?
                                            "fixed" : "absolute");
                                        o.$.offsetLeft;
                                        o.setStyles({ "z-index": b.config.baseFloatZIndex - 5, left: "0px", top: "0px" });
                                        o.addClass("cke_maximized");
                                        d();
                                        p = o.getDocumentPosition();
                                        o.setStyles({ left: -1 * p.x + "px", top: -1 * p.y + "px" });
                                        CKEDITOR.env.gecko && e(b)
                                    } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                        h.removeListener("resize", d);
                                        p = [p, o];
                                        for (t = 0; t < p.length; t++) {
                                            g(p[t], p[t].getCustomData("maximize_saved_styles"));
                                            p[t].removeCustomData("maximize_saved_styles")
                                        }
                                        for (t = b.container; t = t.getParent();) {
                                            g(t, t.getCustomData("maximize_saved_styles"));
                                            t.removeCustomData("maximize_saved_styles")
                                        }
                                        CKEDITOR.env.ie ? setTimeout(function() { h.$.scrollTo(m.x, m.y) }, 0) : h.$.scrollTo(m.x, m.y);
                                        o.removeClass("cke_maximized");
                                        if (CKEDITOR.env.webkit) {
                                            o.setStyle("display", "inline");
                                            setTimeout(function() { o.setStyle("display", "block") }, 0)
                                        }
                                        b.fire("resize")
                                    }
                                    this.toggleState();
                                    if (t = this.uiItems[0]) {
                                        p = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize;
                                        t = CKEDITOR.document.getById(t._.id);
                                        t.getChild(1).setHtml(p);
                                        t.setAttribute("title", p);
                                        t.setAttribute("href",
                                            'javascript:void("' + p + '");')
                                    }
                                    if (b.mode == "wysiwyg")
                                        if (k) {
                                            CKEDITOR.env.gecko && e(b);
                                            b.getSelection().selectRanges(k);
                                            (r = b.getSelection().getStartElement()) && r.scrollIntoView(true)
                                        } else h.$.scrollTo(l.x, l.y);
                                    else {
                                        if (k) {
                                            r.selectionStart = k[0];
                                            r.selectionEnd = k[1]
                                        }
                                        r.scrollLeft = l[0];
                                        r.scrollTop = l[1]
                                    }
                                    k = l = null;
                                    n = this.state;
                                    b.fire("maximize", this.state)
                                },
                                canUndo: false
                            });
                            b.ui.addButton && b.ui.addButton("Maximize", { label: f.maximize.maximize, command: "maximize", toolbar: "tools,10" });
                            b.on("mode", function() {
                                var a = b.getCommand("maximize");
                                a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : n)
                            }, null, null, 100)
                        }
                    }
                })
            }(), function() {
                function b(a, b, e) {
                    var h = CKEDITOR.cleanWord;
                    if (h)e();
                    else {
                        a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js");
                        CKEDITOR.scriptLoader.load(a, e, null, true)
                    }
                    return!h
                }

                function h(a) { a.data.type = "html" }

                CKEDITOR.plugins.add("pastefromword", {
                    requires: "clipboard",
                    init: function(a) {
                        var g = 0, e = this.path;
                        a.addCommand("pastefromword", {
                            canUndo: false,
                            async: true,
                            exec: function(a) {
                                var b =
                                    this;
                                g = 1;
                                a.once("beforePaste", h);
                                a.getClipboardData({ title: a.lang.pastefromword.title }, function(f) {
                                    f && a.fire("paste", { type: "html", dataValue: f.dataValue });
                                    a.fire("afterCommandExec", { name: "pastefromword", command: b, returnValue: !!f })
                                })
                            }
                        });
                        a.ui.addButton && a.ui.addButton("PasteFromWord", { label: a.lang.pastefromword.toolbar, command: "pastefromword", toolbar: "clipboard,50" });
                        a.on("pasteState", function(b) { a.getCommand("pastefromword").setState(b.data) });
                        a.on("paste", function(h) {
                            var d = h.data, f = d.dataValue;
                            if (f &&
                            (g || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(f))) {
                                var c = b(a, e, function() {
                                    if (c)a.fire("paste", d);
                                    else if (!a.config.pasteFromWordPromptCleanup || g || confirm(a.lang.pastefromword.confirmCleanup))d.dataValue = CKEDITOR.cleanWord(f, a)
                                });
                                c && h.cancel()
                            }
                        }, null, null, 3)
                    }
                })
            }(), function() {
                var b = {
                    canUndo: false,
                    async: true,
                    exec: function(h) {
                        h.getClipboardData({ title: h.lang.pastetext.title }, function(a) {
                            a && h.fire("paste", { type: "text", dataValue: a.dataValue });
                            h.fire("afterCommandExec", {
                                name: "pastetext",
                                command: b,
                                returnValue: !!a
                            })
                        })
                    }
                };
                CKEDITOR.plugins.add("pastetext", {
                    requires: "clipboard",
                    init: function(h) {
                        h.addCommand("pastetext", b);
                        h.ui.addButton && h.ui.addButton("PasteText", { label: h.lang.pastetext.button, command: "pastetext", toolbar: "clipboard,40" });
                        if (h.config.forcePasteAsPlainText)h.on("beforePaste", function(a) { if (a.data.type != "html")a.data.type = "text" });
                        h.on("pasteState", function(a) { h.getCommand("pastetext").setState(a.data) })
                    }
                })
            }(), CKEDITOR.plugins.add("removeformat", {
                init: function(b) {
                    b.addCommand("removeFormat",
                        CKEDITOR.plugins.removeformat.commands.removeformat);
                    b.ui.addButton && b.ui.addButton("RemoveFormat", { label: b.lang.removeformat.toolbar, command: "removeFormat", toolbar: "cleanup,10" })
                }
            }), CKEDITOR.plugins.removeformat = {
                commands: {
                    removeformat: {
                        exec: function(b) {
                            for (var h = b._.removeFormatRegex || (b._.removeFormatRegex = RegExp("^(?:" + b.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")),
                                a = b._.removeAttributes || (b._.removeAttributes = b.config.removeFormatAttributes.split(",")),
                                g = CKEDITOR.plugins.removeformat.filter,
                                e = b.getSelection().getRanges(1),
                                i = e.createIterator(),
                                d; d = i.getNextRange();) {
                                d.collapsed || d.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                                var f = d.createBookmark(), c = f.startNode, j = f.endNode,
                                    k = function(a) {
                                        for (var c = b.elementPath(a), d = c.elements, f = 1, e; e = d[f]; f++) {
                                            if (e.equals(c.block) || e.equals(c.blockLimit))break;
                                            h.test(e.getName()) && g(b, e) && a.breakParent(e)
                                        }
                                    };
                                k(c);
                                if (j) {
                                    k(j);
                                    for (c = c.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT); c;) {
                                        if (c.equals(j))break;
                                        k = c.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);
                                        if (!(c.getName() ==
                                            "img" && c.data("cke-realelement")) && g(b, c))
                                            if (h.test(c.getName()))c.remove(1);
                                            else {
                                                c.removeAttributes(a);
                                                b.fire("removeFormatCleanup", c)
                                            }
                                        c = k
                                    }
                                }
                                d.moveToBookmark(f)
                            }
                            b.forceNextSelectionCheck();
                            b.getSelection().selectRanges(e)
                        }
                    }
                },
                filter: function(b, h) {
                    for (var a = b._.removeFormatFilters || [], g = 0; g < a.length; g++)if (a[g](h) === false)return false;
                    return true
                }
            }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(b) {
                if (!this._.removeFormatFilters)this._.removeFormatFilters = [];
                this._.removeFormatFilters.push(b)
            },
            CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize", {
                init: function(b) {
                    var h, a, g, e, i = b.config, d = b.ui.spaceId("resizer"), f = b.element ? b.element.getDirection(1) : "ltr";
                    !i.resize_dir && (i.resize_dir = "vertical");
                    i.resize_maxWidth == void 0 && (i.resize_maxWidth = 3E3);
                    i.resize_maxHeight == void 0 && (i.resize_maxHeight = 3E3);
                    i.resize_minWidth ==
                        void 0 && (i.resize_minWidth = 750);
                    i.resize_minHeight == void 0 && (i.resize_minHeight = 250);
                    if (i.resize_enabled !== false) {
                        var c = null,
                            j = (i.resize_dir == "both" || i.resize_dir == "horizontal") && i.resize_minWidth != i.resize_maxWidth,
                            k = (i.resize_dir == "both" || i.resize_dir == "vertical") && i.resize_minHeight != i.resize_maxHeight,
                            l = function(c) {
                                var d = h, n = a, l = d + (c.data.$.screenX - g) * (f == "rtl" ? -1 : 1), c = n + (c.data.$.screenY - e);
                                j && (d = Math.max(i.resize_minWidth, Math.min(l, i.resize_maxWidth)));
                                k && (n = Math.max(i.resize_minHeight, Math.min(c,
                                    i.resize_maxHeight)));
                                b.resize(j ? d : null, n)
                            },
                            m = function() {
                                CKEDITOR.document.removeListener("mousemove", l);
                                CKEDITOR.document.removeListener("mouseup", m);
                                if (b.document) {
                                    b.document.removeListener("mousemove", l);
                                    b.document.removeListener("mouseup", m)
                                }
                            },
                            n = CKEDITOR.tools.addFunction(function(d) {
                                c || (c = b.getResizable());
                                h = c.$.offsetWidth || 0;
                                a = c.$.offsetHeight || 0;
                                g = d.screenX;
                                e = d.screenY;
                                i.resize_minWidth > h && (i.resize_minWidth = h);
                                i.resize_minHeight > a && (i.resize_minHeight = a);
                                CKEDITOR.document.on("mousemove",
                                    l);
                                CKEDITOR.document.on("mouseup", m);
                                if (b.document) {
                                    b.document.on("mousemove", l);
                                    b.document.on("mouseup", m)
                                }
                                d.preventDefault && d.preventDefault()
                            });
                        b.on("destroy", function() { CKEDITOR.tools.removeFunction(n) });
                        b.on("uiSpace", function(a) {
                            if (a.data.space == "bottom") {
                                var c = "";
                                j && !k && (c = " cke_resizer_horizontal");
                                !j && k && (c = " cke_resizer_vertical");
                                var e = '<span id="' + d + '" class="cke_resizer' + c + " cke_resizer_" + f + '" title="' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' +
                                    n + ', event)">' + (f == "ltr" ? "◢" : "◣") + "</span>";
                                f == "ltr" && c == "ltr" ? a.data.html = a.data.html + e : a.data.html = e + a.data.html
                            }
                        }, b, null, 100);
                        b.on("maximize", function(a) { b.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]() })
                    }
                }
            }), CKEDITOR.plugins.add("menubutton", {
                requires: "button,menu",
                onLoad: function() {
                    var b = function(b) {
                        var a = this._;
                        if (a.state !== CKEDITOR.TRISTATE_DISABLED) {
                            a.previousState = a.state;
                            var g = a.menu;
                            if (!g) {
                                g = a.menu = new CKEDITOR.menu(b, { panel: { className: "cke_menu_panel", attributes: { "aria-label": b.lang.common.options } } });
                                g.onHide = CKEDITOR.tools.bind(function() { this.setState(this.modes && this.modes[b.mode] ? a.previousState : CKEDITOR.TRISTATE_DISABLED) }, this);
                                this.onMenu && g.addListener(this.onMenu)
                            }
                            if (a.on)g.hide();
                            else {
                                this.setState(CKEDITOR.TRISTATE_ON);
                                setTimeout(function() { g.show(CKEDITOR.document.getById(a.id), 4) }, 0)
                            }
                        }
                    };
                    CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                        base: CKEDITOR.ui.button,
                        $: function(h) {
                            delete h.panel;
                            this.base(h);
                            this.hasArrow = true;
                            this.click = b
                        },
                        statics: { handler: { create: function(b) { return new CKEDITOR.ui.menuButton(b) } } }
                    })
                },
                beforeInit: function(b) { b.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
            }), CKEDITOR.UI_MENUBUTTON = "menubutton", function() {
                function b(a, b) {
                    var c = 0, e;
                    for (e in b)
                        if (b[e] == a) {
                            c = 1;
                            break
                        }
                    return c
                }

                var h = "",
                    a = function() {
                        function a() {
                            c.once("focus", e);
                            c.once("blur", b)
                        }

                        function b(c) {
                            var c = c.editor, f = g.getScayt(c), e = c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE;
                            if (f) {
                                g.setPaused(c, !f.disabled);
                                g.setControlId(c, f.id);
                                f.destroy(true);
                                delete g.instances[c.name];
                                e && a()
                            }
                        }

                        var c = this,
                            e = function() {
                                if (!(typeof g.instances[c.name] !=
                                    "undefined" || g.instances[c.name] != null)) {
                                    var a = c.config, b = {};
                                    b.srcNodeRef = c.editable().$.nodeName == "BODY" ? c.document.getWindow().$.frameElement : c.editable().$;
                                    b.assocApp = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision;
                                    b.customerid = a.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
                                    b.customDictionaryIds = a.scayt_customDictionaryIds || "";
                                    b.userDictionaryName = a.scayt_userDictionaryName || "";
                                    b.sLang = a.scayt_sLang || "en_US";
                                    b.onLoad = function() {
                                        CKEDITOR.env.ie &&
                                            CKEDITOR.env.version < 8 || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;");
                                        c.editable().hasFocus && !g.isControlRestored(c) && this.focus()
                                    };
                                    b.onBeforeChange = function() { g.getScayt(c) && !c.checkDirty() && setTimeout(function() { c.resetDirty() }, 0) };
                                    a = window.scayt_custom_params;
                                    if (typeof a == "object")for (var d in a)b[d] = a[d];
                                    if (g.getControlId(c))b.id = g.getControlId(c);
                                    var f = new window.scayt(b);
                                    f.afterMarkupRemove.push(function(a) { (new CKEDITOR.dom.element(a, f.document)).mergeSiblings() });
                                    if (b =
                                        g.instances[c.name]) {
                                        f.sLang = b.sLang;
                                        f.option(b.option());
                                        f.paused = b.paused
                                    }
                                    g.instances[c.name] = f;
                                    try {
                                        f.setDisabled(g.isPaused(c) === false)
                                    } catch (e) {
                                    }
                                    c.fire("showScaytState")
                                }
                            };
                        c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a() : c.on("contentDom", e);
                        c.on("contentDomUnload", function() {
                            for (var a = CKEDITOR.document.getElementsByTag("script"), b = /^dojoIoScript(\d+)$/i, c = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i, d = 0; d < a.count(); d++) {
                                var f = a.getItem(d), e = f.getId(), g = f.getAttribute("src");
                                e && (g && e.match(b) && g.match(c)) && f.remove()
                            }
                        });
                        c.on("beforeCommandExec", function(a) { a.data.name == "source" && c.mode == "source" && g.markControlRestore(c) });
                        c.on("afterCommandExec", function(a) { g.isScaytEnabled(c) && c.mode == "wysiwyg" && (a.data.name == "undo" || a.data.name == "redo") && window.setTimeout(function() { g.getScayt(c).refresh() }, 10) });
                        c.on("destroy", b);
                        c.on("setData", b);
                        c.on("insertElement", function() {
                            var a = g.getScayt(c);
                            if (g.isScaytEnabled(c)) {
                                CKEDITOR.env.ie && c.getSelection().unlock(true);
                                window.setTimeout(function() {
                                    a.focus();
                                    a.refresh()
                                }, 10)
                            }
                        }, this, null, 50);
                        c.on("insertHtml", function() {
                            var a = g.getScayt(c);
                            if (g.isScaytEnabled(c)) {
                                CKEDITOR.env.ie && c.getSelection().unlock(true);
                                window.setTimeout(function() {
                                    a.focus();
                                    a.refresh()
                                }, 10)
                            }
                        }, this, null, 50);
                        c.on("scaytDialog", function(a) {
                            a.data.djConfig = window.djConfig;
                            a.data.scayt_control = g.getScayt(c);
                            a.data.tab = h;
                            a.data.scayt = window.scayt
                        });
                        var i = c.dataProcessor;
                        (i = i && i.htmlFilter) && i.addRules({
                            elements: {
                                span: function(a) {
                                    if (a.attributes["data-scayt_word"] && a.attributes["data-scaytid"]) {
                                        delete a.name;
                                        return a
                                    }
                                }
                            }
                        });
                        i = CKEDITOR.plugins.undo.Image.prototype;
                        i.equals = CKEDITOR.tools.override(i.equals, function(a) {
                            return function(b) {
                                var c = this.contents, d = b.contents, f = g.getScayt(this.editor);
                                if (f && g.isScaytReady(this.editor)) {
                                    this.contents = f.reset(c) || "";
                                    b.contents = f.reset(d) || ""
                                }
                                f = a.apply(this, arguments);
                                this.contents = c;
                                b.contents = d;
                                return f
                            }
                        });
                        c.document && (c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || c.focusManager.hasFocus) && e()
                    };
                CKEDITOR.plugins.scayt = {
                    engineLoaded: false,
                    instances: {},
                    controlInfo: {},
                    setControlInfo: function(a, b) {
                        a && (a.name && typeof this.controlInfo[a.name] != "object") && (this.controlInfo[a.name] = {});
                        for (var c in b)this.controlInfo[a.name][c] = b[c]
                    },
                    isControlRestored: function(a) { return a && a.name && this.controlInfo[a.name] ? this.controlInfo[a.name].restored : false },
                    markControlRestore: function(a) { this.setControlInfo(a, { restored: true }) },
                    setControlId: function(a, b) { this.setControlInfo(a, { id: b }) },
                    getControlId: function(a) {
                        return a && a.name && this.controlInfo[a.name] && this.controlInfo[a.name].id ?
                            this.controlInfo[a.name].id : null
                    },
                    setPaused: function(a, b) { this.setControlInfo(a, { paused: b }) },
                    isPaused: function(a) { if (a && a.name && this.controlInfo[a.name])return this.controlInfo[a.name].paused },
                    getScayt: function(a) { return this.instances[a.name] },
                    isScaytReady: function(a) { return this.engineLoaded === true && "undefined" !== typeof window.scayt && this.getScayt(a) },
                    isScaytEnabled: function(a) { return(a = this.getScayt(a)) ? a.disabled === false : false },
                    getUiTabs: function(a) {
                        var b = [],
                            c = a.config.scayt_uiTabs || "1,1,1",
                            c =
                                c.split(",");
                        c[3] = "1";
                        for (var e = 0; e < 4; e++)b[e] = typeof window.scayt != "undefined" && typeof window.scayt.uiTags != "undefined" ? parseInt(c[e], 10) && window.scayt.uiTags[e] : parseInt(c[e], 10);
                        typeof a.plugins.wsc == "object" ? b.push(1) : b.push(0);
                        return b
                    },
                    loadEngine: function(b) {
                        if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 || CKEDITOR.env.opera || CKEDITOR.env.air)return b.fire("showScaytState");
                        if (this.engineLoaded === true)return a.apply(b);
                        if (this.engineLoaded == -1)return CKEDITOR.on("scaytReady", function() { a.apply(b) });
                        CKEDITOR.on("scaytReady", a, b);
                        CKEDITOR.on("scaytReady", function() { this.engineLoaded = true }, this, null, 0);
                        this.engineLoaded = -1;
                        var f = document.location.protocol, f = f.search(/https?:/) != -1 ? f : "http:", f = b.config.scayt_srcUrl || f + "//svc.webspellchecker.net/scayt26/loader__base.js", c = g.parseUrl(f).path + "/";
                        if (window.scayt == void 0) {
                            CKEDITOR._djScaytConfig = { baseUrl: c, addOnLoad: [function() { CKEDITOR.fireOnce("scaytReady") }], isDebug: false };
                            CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script",
                            { attributes: { type: "text/javascript", async: "true", src: f } }))
                        } else CKEDITOR.fireOnce("scaytReady");
                        return null
                    },
                    parseUrl: function(a) {
                        var b;
                        return a.match && (b = a.match(/(.*)[\/\\](.*?\.\w+)$/)) ? { path: b[1], file: b[2] } : a
                    }
                };
                var g = CKEDITOR.plugins.scayt,
                    e = function(a, b, c, e, g, h, i) {
                        a.addCommand(e, g);
                        a.addMenuItem(e, { label: c, command: e, group: h, order: i })
                    },
                    i = {
                        preserveState: true,
                        editorFocus: false,
                        canUndo: false,
                        exec: function(a) {
                            if (g.isScaytReady(a)) {
                                var b = g.isScaytEnabled(a);
                                this.setState(b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                                a = g.getScayt(a);
                                a.focus();
                                a.setDisabled(b)
                            } else if (!a.config.scayt_autoStartup && g.engineLoaded >= 0) {
                                a.focus();
                                this.setState(CKEDITOR.TRISTATE_DISABLED);
                                g.loadEngine(a)
                            }
                        }
                    };
                CKEDITOR.plugins.add("scayt", {
                    requires: "menubutton,dialog",
                    beforeInit: function(a) {
                        var b = a.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control", c = "";
                        if ((b = b.split("|")) && b.length)for (var e = 0; e < b.length; e++)c = c + ("scayt_" + b[e] + (b.length != parseInt(e, 10) + 1 ? "," : ""));
                        a.config.menu_groups = c + "," + a.config.menu_groups
                    },
                    init: function(a) {
                        var f =
                                a.dataProcessor && a.dataProcessor.dataFilter,
                            c = {
                                elements: {
                                    span: function(a) {
                                        var b = a.attributes;
                                        b && b["data-scaytid"] && delete a.name
                                    }
                                }
                            };
                        f && f.addRules(c);
                        var j = {}, k = {}, l = a.addCommand("scaytcheck", i);
                        CKEDITOR.dialog.add("scaytcheck", CKEDITOR.getUrl(this.path + "dialogs/options.js"));
                        f = g.getUiTabs(a);
                        a.addMenuGroup("scaytButton");
                        a.addMenuGroup("scayt_suggest", -10);
                        a.addMenuGroup("scayt_moresuggest", -9);
                        a.addMenuGroup("scayt_control", -8);
                        var c = {}, m = a.lang.scayt;
                        c.scaytToggle = {
                            label: m.enable,
                            command: "scaytcheck",
                            group: "scaytButton"
                        };
                        if (f[0] == 1)
                            c.scaytOptions = {
                                label: m.options, group: "scaytButton",
                                onClick: function() {
                                    h = "options";
                                    a.openDialog("scaytcheck")
                                }
                            };
                        if (f[1] == 1)
                            c.scaytLangs = {
                                label: m.langs, group: "scaytButton",
                                onClick: function() {
                                    h = "langs";
                                    a.openDialog("scaytcheck")
                                }
                            };
                        if (f[2] == 1)
                            c.scaytDict = {
                                label: m.dictionariesTab, group: "scaytButton",
                                onClick: function() {
                                    h = "dictionaries";
                                    a.openDialog("scaytcheck")
                                }
                            };
                        c.scaytAbout = {
                            label: a.lang.scayt.about, group: "scaytButton",
                            onClick: function() {
                                h = "about";
                                a.openDialog("scaytcheck")
                            }
                        };
                        if (f[4] == 1)c.scaytWSC = { label: a.lang.wsc.toolbar, group: "scaytButton", command: "checkspell" };
                        a.addMenuItems(c);
                        a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                            label: m.title,
                            title: CKEDITOR.env.opera ? m.opera_title : m.title,
                            modes: { wysiwyg: 1 },
                            toolbar: "spellchecker,20",
                            onRender: function() { l.on("state", function() { this.setState(l.state) }, this) },
                            onMenu: function() {
                                var b = g.isScaytEnabled(a);
                                a.getMenuItem("scaytToggle").label = m[b ? "disable" : "enable"];
                                var c = g.getUiTabs(a);
                                return{
                                    scaytToggle: CKEDITOR.TRISTATE_OFF,
                                    scaytOptions: b &&
                                        c[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    scaytLangs: b && c[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    scaytDict: b && c[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    scaytAbout: b && c[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                    scaytWSC: c[4] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                }
                            }
                        });
                        a.contextMenu && a.addMenuItems && a.contextMenu.addListener(function(c, f) {
                            if (!g.isScaytEnabled(a) || f.getRanges()[0].checkReadOnly())return null;
                            var h = g.getScayt(a), i = h.getScaytNode();
                            if (!i)return null;
                            var l = h.getWord(i);
                            if (!l)return null;
                            var s = h.getLang(), x = a.config.scayt_contextCommands || "all", l = window.scayt.getSuggestion(l, s), x = x.split("|"), y;
                            for (y in j) {
                                delete a._.menuItems[y];
                                delete a.commands[y]
                            }
                            for (y in k) {
                                delete a._.menuItems[y];
                                delete a.commands[y]
                            }
                            if (!l || !l.length) {
                                e(a, "no_sugg", m.noSuggestions, "scayt_no_sugg", { exec: function() {} }, "scayt_control", 1, true);
                                k.scayt_no_sugg = CKEDITOR.TRISTATE_OFF
                            } else {
                                j = {};
                                k = {};
                                y = a.config.scayt_moreSuggestions || "on";
                                var s = false, w = a.config.scayt_maxSuggestions;
                                typeof w != "number" && (w = 5);
                                !w && (w = l.length);
                                for (var v = 0, q = l.length; v < q; v = v + 1) {
                                    var u = "scayt_suggestion_" + l[v].replace(" ", "_"), B = function(a, b) { return{ exec: function() { h.replace(a, b) } } }(i, l[v]);
                                    if (v < w) {
                                        e(a, "button_" + u, l[v], u, B, "scayt_suggest", v + 1);
                                        k[u] = CKEDITOR.TRISTATE_OFF
                                    } else if (y == "on") {
                                        e(a, "button_" + u, l[v], u, B, "scayt_moresuggest", v + 1);
                                        j[u] = CKEDITOR.TRISTATE_OFF;
                                        s = true
                                    }
                                }
                                if (s) {
                                    a.addMenuItem("scayt_moresuggest", { label: m.moreSuggestions, group: "scayt_moresuggest", order: 10, getItems: function() { return j } });
                                    k.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                                }
                            }
                            if (b("all", x) || b("ignore", x)) {
                                e(a, "ignore", m.ignore, "scayt_ignore", { exec: function() { h.ignore(i) } }, "scayt_control", 2);
                                k.scayt_ignore = CKEDITOR.TRISTATE_OFF
                            }
                            if (b("all", x) || b("ignoreall", x)) {
                                e(a, "ignore_all", m.ignoreAll, "scayt_ignore_all", { exec: function() { h.ignoreAll(i) } }, "scayt_control", 3);
                                k.scayt_ignore_all = CKEDITOR.TRISTATE_OFF
                            }
                            if (b("all", x) || b("add", x)) {
                                e(a, "add_word", m.addWord, "scayt_add_word", { exec: function() { window.scayt.addWordToUserDictionary(i) } }, "scayt_control",
                                    4);
                                k.scayt_add_word = CKEDITOR.TRISTATE_OFF
                            }
                            h.fireOnContextMenu && h.fireOnContextMenu(a);
                            return k
                        });
                        f = function(b) {
                            b.removeListener();
                            CKEDITOR.env.opera || CKEDITOR.env.air ? l.setState(CKEDITOR.TRISTATE_DISABLED) : l.setState(g.isScaytEnabled(a) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                        };
                        a.on("showScaytState", f);
                        a.on("instanceReady", f);
                        if (a.config.scayt_autoStartup)a.on("instanceReady", function() { g.loadEngine(a) })
                    },
                    afterInit: function(a) {
                        var b, c = function(a) { if (a.hasAttribute("data-scaytid"))return false };
                        a._.elementsPath && (b = a._.elementsPath.filters) && b.push(c);
                        a.addRemoveFormatFilter && a.addRemoveFormatFilter(c)
                    }
                })
            }(), function() {
                CKEDITOR.plugins.add("sourcearea", {
                    init: function(h) {
                        function a() {
                            this.hide();
                            this.setStyle("height", this.getParent().$.clientHeight + "px");
                            this.setStyle("width", this.getParent().$.clientWidth + "px");
                            this.show()
                        }

                        if (h.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var g = CKEDITOR.plugins.sourcearea;
                            h.addMode("source", function(e) {
                                var g = h.ui.space("contents").getDocument().createElement("textarea");
                                g.setStyles(CKEDITOR.tools.extend({ width: CKEDITOR.env.ie7Compat ? "99%" : "100%", height: "100%", resize: "none", outline: "none", "text-align": "left" }, CKEDITOR.tools.cssVendorPrefix("tab-size", h.config.sourceAreaTabSize || 4)));
                                g.setAttribute("dir", "ltr");
                                g.addClass("cke_source cke_reset cke_enable_context_menu");
                                h.ui.space("contents").append(g);
                                g = h.editable(new b(h, g));
                                g.setData(h.getData(1));
                                if (CKEDITOR.env.ie) {
                                    g.attachListener(h, "resize", a, g);
                                    g.attachListener(CKEDITOR.document.getWindow(), "resize", a, g);
                                    CKEDITOR.tools.setTimeout(a,
                                        0, g)
                                }
                                h.fire("ariaWidget", this);
                                e()
                            });
                            h.addCommand("source", g.commands.source);
                            h.ui.addButton && h.ui.addButton("Source", { label: h.lang.sourcearea.toolbar, command: "source", toolbar: "mode,10" });
                            h.on("mode", function() { h.getCommand("source").setState(h.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) })
                        }
                    }
                });
                var b = CKEDITOR.tools.createClass({
                    base: CKEDITOR.editable,
                    proto: {
                        setData: function(b) {
                            this.setValue(b);
                            this.editor.fire("dataReady")
                        },
                        getData: function() { return this.getValue() },
                        insertHtml: function() {},
                        insertElement: function() {},
                        insertText: function() {},
                        setReadOnly: function(b) { this[(b ? "set" : "remove") + "Attribute"]("readOnly", "readonly") },
                        detach: function() {
                            b.baseProto.detach.call(this);
                            this.clearCustomData();
                            this.remove()
                        }
                    }
                })
            }(), CKEDITOR.plugins.sourcearea = {
                commands: {
                    source: {
                        modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1,
                        exec: function(b) {
                            b.mode == "wysiwyg" && b.fire("saveSnapshot");
                            b.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                            b.setMode(b.mode == "source" ? "wysiwyg" : "source")
                        },
                        canUndo: !1
                    }
                }
            },
            CKEDITOR.plugins.add("specialchar", {
                availableLangs: { ca: 1, cs: 1, cy: 1, de: 1, en: 1, eo: 1, et: 1, fa: 1, fi: 1, fr: 1, he: 1, hr: 1, it: 1, ku: 1, lv: 1, nb: 1, nl: 1, no: 1, pl: 1, "pt-br": 1, sk: 1, sv: 1, th: 1, tr: 1, ug: 1, "zh-cn": 1 },
                requires: "dialog",
                init: function(b) {
                    var h = this;
                    CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
                    b.addCommand("specialchar", {
                        exec: function() {
                            var a = b.langCode, a = h.availableLangs[a] ? a : h.availableLangs[a.replace(/-.*/, "")] ? a.replace(/-.*/, "") : "en";
                            CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(h.path +
                                "dialogs/lang/" + a + ".js"), function() {
                                CKEDITOR.tools.extend(b.lang.specialchar, h.langEntries[a]);
                                b.openDialog("specialchar")
                            })
                        },
                        modes: { wysiwyg: 1 },
                        canUndo: false
                    });
                    b.ui.addButton && b.ui.addButton("SpecialChar", { label: b.lang.specialchar.toolbar, command: "specialchar", toolbar: "insert,50" })
                }
            }), CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),
            function() {
                CKEDITOR.plugins.add("stylescombo", {
                    requires: "richcombo",
                    init: function(b) {
                        function h(d) {
                            b.getStylesSet(function(c) {
                                if (!i.length) {
                                    for (var g, h, l = 0, m = c.length; l < m; l++) {
                                        g = c[l];
                                        if (!(b.blockless && g.element in CKEDITOR.dtd.$block)) {
                                            h = g.name;
                                            g = e[h] = new CKEDITOR.style(g);
                                            g._name = h;
                                            g._.enterMode = a.enterMode;
                                            g._.weight = l + (g.type == CKEDITOR.STYLE_OBJECT ? 1 : g.type == CKEDITOR.STYLE_BLOCK ? 2 : 3) * 1E3;
                                            i.push(g)
                                        }
                                    }
                                    i.sort(function(a, b) { return a._.weight - b._.weight })
                                }
                                d && d()
                            })
                        }

                        var a = b.config,
                            g = b.lang.stylescombo,
                            e = {},
                            i = [],
                            d;
                        b.ui.addRichCombo("Styles", {
                            label: g.label,
                            title: g.panelTitle,
                            toolbar: "styles,10",
                            panel: { css: [CKEDITOR.skin.getPath("editor")].concat(a.contentsCss), multiSelect: true, attributes: { "aria-label": g.panelTitle } },
                            init: function() {
                                d = this;
                                h(function() {
                                    var a, b, e, h, l, m;
                                    l = 0;
                                    for (m = i.length; l < m; l++) {
                                        a = i[l];
                                        b = a._name;
                                        h = a.type;
                                        if (h != e) {
                                            d.startGroup(g["panelTitle" + h]);
                                            e = h
                                        }
                                        d.add(b, a.type == CKEDITOR.STYLE_OBJECT ? b : a.buildPreview(), b)
                                    }
                                    d.commit()
                                })
                            },
                            onClick: function(a) {
                                b.focus();
                                b.fire("saveSnapshot");
                                var a =
                                        e[a],
                                    c = b.elementPath();
                                b[a.checkActive(c) ? "removeStyle" : "applyStyle"](a);
                                b.fire("saveSnapshot")
                            },
                            onRender: function() {
                                b.on("selectionChange", function(a) {
                                    for (var b = this.getValue(), a = a.data.path.elements, d = 0, g = a.length, h; d < g; d++) {
                                        h = a[d];
                                        for (var i in e)
                                            if (e[i].checkElementRemovable(h, true)) {
                                                i != b && this.setValue(i);
                                                return
                                            }
                                    }
                                    this.setValue("")
                                }, this)
                            },
                            onOpen: function() {
                                var a = b.getSelection().getSelectedElement(), a = b.elementPath(a), c = [0, 0, 0, 0];
                                this.showAll();
                                this.unmarkAll();
                                for (var d in e) {
                                    var h = e[d], i = h.type;
                                    if (i == CKEDITOR.STYLE_BLOCK && !a.isContextFor(h.element))this.hideItem(d);
                                    else {
                                        if (h.checkActive(a))this.mark(d);
                                        else if (i == CKEDITOR.STYLE_OBJECT && !h.checkApplicable(a)) {
                                            this.hideItem(d);
                                            c[i]--
                                        }
                                        c[i]++
                                    }
                                }
                                c[CKEDITOR.STYLE_BLOCK] || this.hideGroup(g["panelTitle" + CKEDITOR.STYLE_BLOCK]);
                                c[CKEDITOR.STYLE_INLINE] || this.hideGroup(g["panelTitle" + CKEDITOR.STYLE_INLINE]);
                                c[CKEDITOR.STYLE_OBJECT] || this.hideGroup(g["panelTitle" + CKEDITOR.STYLE_OBJECT])
                            },
                            reset: function() {
                                if (d) {
                                    delete d._.panel;
                                    delete d._.list;
                                    d._.committed =
                                        0;
                                    d._.items = {};
                                    d._.state = CKEDITOR.TRISTATE_OFF
                                }
                                e = {};
                                i = [];
                                h()
                            }
                        });
                        b.on("instanceReady", function() { h() })
                    }
                })
            }(), function() {
                function b(a) {
                    return{
                        editorFocus: false,
                        canUndo: false,
                        modes: { wysiwyg: 1 },
                        exec: function(b) {
                            if (b.editable().hasFocus) {
                                var d = b.getSelection(), f;
                                if (f = (new CKEDITOR.dom.elementPath(d.getCommonAncestor(), d.root)).contains({ td: 1, th: 1 }, 1)) {
                                    var d = b.createRange(),
                                        c = CKEDITOR.tools.tryThese(function() {
                                            var b = f.getParent().$.cells[f.$.cellIndex + (a ? -1 : 1)];
                                            b.parentNode.parentNode;
                                            return b
                                        }, function() {
                                            var b =
                                                    f.getParent(),
                                                b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                                            return b.cells[a ? b.cells.length - 1 : 0]
                                        });
                                    if (!c && !a) {
                                        for (var g = f.getAscendant("table").$, c = f.getParent().$.cells, g = new CKEDITOR.dom.element(g.insertRow(-1), b.document), h = 0, l = c.length; h < l; h++) {
                                            var m = g.append((new CKEDITOR.dom.element(c[h], b.document)).clone(false, false));
                                            !CKEDITOR.env.ie && m.appendBogus()
                                        }
                                        d.moveToElementEditStart(g)
                                    } else if (c) {
                                        c = new CKEDITOR.dom.element(c);
                                        d.moveToElementEditStart(c);
                                        (!d.checkStartOfBlock() || !d.checkEndOfBlock()) &&
                                            d.selectNodeContents(c)
                                    } else return true;
                                    d.select(true);
                                    return true
                                }
                            }
                            return false
                        }
                    }
                }

                var h = { editorFocus: false, modes: { wysiwyg: 1, source: 1 } }, a = { exec: function(a) { a.container.focusNext(true, a.tabIndex) } }, g = { exec: function(a) { a.container.focusPrevious(true, a.tabIndex) } };
                CKEDITOR.plugins.add("tab", {
                    init: function(e) {
                        for (var i = e.config.enableTabKeyTools !== false, d = e.config.tabSpaces || 0, f = ""; d--;)f = f + " ";
                        if (f)
                            e.on("key", function(a) {
                                if (a.data.keyCode == 9) {
                                    e.insertHtml(f);
                                    a.cancel()
                                }
                            });
                        if (i)
                            e.on("key", function(a) {
                                (a.data.keyCode ==
                                    9 && e.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && e.execCommand("selectPreviousCell")) && a.cancel()
                            });
                        e.addCommand("blur", CKEDITOR.tools.extend(a, h));
                        e.addCommand("blurBack", CKEDITOR.tools.extend(g, h));
                        e.addCommand("selectNextCell", b());
                        e.addCommand("selectPreviousCell", b(true))
                    }
                })
            }(), CKEDITOR.dom.element.prototype.focusNext = function(b, h) {
                var a = h === void 0 ? this.getTabIndex() : h, g, e, i, d, f, c;
                if (a <= 0)
                    for (f = this.getNextSourceNode(b, CKEDITOR.NODE_ELEMENT); f;) {
                        if (f.isVisible() && f.getTabIndex() ===
                            0) {
                            i = f;
                            break
                        }
                        f = f.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT)
                    }
                else
                    for (f = this.getDocument().getBody().getFirst(); f = f.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
                        if (!g)
                            if (!e && f.equals(this)) {
                                e = true;
                                if (b) {
                                    if (!(f = f.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT)))break;
                                    g = 1
                                }
                            } else e && !this.contains(f) && (g = 1);
                        if (f.isVisible() && !((c = f.getTabIndex()) < 0)) {
                            if (g && c == a) {
                                i = f;
                                break
                            }
                            if (c > a && (!i || !d || c < d)) {
                                i = f;
                                d = c
                            } else if (!i && c === 0) {
                                i = f;
                                d = c
                            }
                        }
                    }
                i && i.focus()
            }, CKEDITOR.dom.element.prototype.focusPrevious = function(b,
                h) {
                for (var a = h === void 0 ? this.getTabIndex() : h, g, e, i, d = 0, f, c = this.getDocument().getBody().getLast(); c = c.getPreviousSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
                    if (!g)
                        if (!e && c.equals(this)) {
                            e = true;
                            if (b) {
                                if (!(c = c.getPreviousSourceNode(true, CKEDITOR.NODE_ELEMENT)))break;
                                g = 1
                            }
                        } else e && !this.contains(c) && (g = 1);
                    if (c.isVisible() && !((f = c.getTabIndex()) < 0))
                        if (a <= 0) {
                            if (g && f === 0) {
                                i = c;
                                break
                            }
                            if (f > d) {
                                i = c;
                                d = f
                            }
                        } else {
                            if (g && f == a) {
                                i = c;
                                break
                            }
                            if (f < a && (!i || f > d)) {
                                i = c;
                                d = f
                            }
                        }
                }
                i && i.focus()
            }, CKEDITOR.plugins.add("table", {
                requires: "dialog",
                init: function(b) {
                    function h(a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function(a, b) { this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) }

                    if (!b.blockless) {
                        var a = b.lang.table;
                        b.addCommand("table", new CKEDITOR.dialogCommand("table", { context: "table" }));
                        b.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", h()));
                        b.addCommand("tableDelete", h({
                            exec: function(a) {
                                var b = a.elementPath().contains("table", 1);
                                if (b) {
                                    var h = b.getParent();
                                    h.getChildCount() == 1 && !h.is("body", "td", "th") && (b = h);
                                    a = a.createRange();
                                    a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                                    b.remove();
                                    a.select()
                                }
                            }
                        }));
                        b.ui.addButton && b.ui.addButton("Table", { label: a.toolbar, command: "table", toolbar: "insert,30" });
                        CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                        CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                        b.addMenuItems && b.addMenuItems({
                            table: { label: a.menu, command: "tableProperties", group: "table", order: 5 },
                            tabledelete: {
                                label: a.deleteTable,
                                command: "tableDelete",
                                group: "table",
                                order: 1
                            }
                        });
                        b.on("doubleclick", function(a) { if (a.data.element.is("table"))a.data.dialog = "tableProperties" });
                        b.contextMenu && b.contextMenu.addListener(function() { return{ tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
                    }
                }
            }), function() {
                function b(a) {
                    function b(a) {
                        if (!(c.length > 0) && a.type == CKEDITOR.NODE_ELEMENT && m.test(a.getName()) && !a.getCustomData("selected_cell")) {
                            CKEDITOR.dom.element.setMarker(d, a, "selected_cell", true);
                            c.push(a)
                        }
                    }

                    for (var a = a.getRanges(),
                        c = [],
                        d = {},
                        f = 0; f < a.length; f++) {
                        var e = a[f];
                        if (e.collapsed) {
                            e = e.getCommonAncestor();
                            (e = e.getAscendant("td", true) || e.getAscendant("th", true)) && c.push(e)
                        } else {
                            var e = new CKEDITOR.dom.walker(e), g;
                            for (e.guard = b; g = e.next();)
                                if (g.type != CKEDITOR.NODE_ELEMENT || !g.is(CKEDITOR.dtd.table))
                                    if ((g = g.getAscendant("td", true) || g.getAscendant("th", true)) && !g.getCustomData("selected_cell")) {
                                        CKEDITOR.dom.element.setMarker(d, g, "selected_cell", true);
                                        c.push(g)
                                    }
                        }
                    }
                    CKEDITOR.dom.element.clearAllMarkers(d);
                    return c
                }

                function h(a,
                    c) {
                    for (var d = b(a), f = d[0], e = f.getAscendant("table"), f = f.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], i = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(e.$.rows[i]), h = c ? h : i, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(e), e = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, f = f.createElement("tr"), i = 0; e[i] && i < d; i++) {
                        var j;
                        if (e[i].rowSpan > 1 && h && e[i] == h[i]) {
                            j = e[i];
                            j.rowSpan = j.rowSpan + 1
                        } else {
                            j = (new CKEDITOR.dom.element(e[i])).clone();
                            j.removeAttribute("rowSpan");
                            !CKEDITOR.env.ie && j.appendBogus();
                            f.append(j);
                            j = j.$
                        }
                        i = i + (j.colSpan - 1)
                    }
                    c ? f.insertBefore(g) : f.insertAfter(g)
                }

                function a(c) {
                    if (c instanceof CKEDITOR.dom.selection) {
                        for (var d = b(c), f = d[0].getAscendant("table"), e = CKEDITOR.tools.buildTableMap(f), c = d[0].getParent().$.rowIndex, d = d[d.length - 1], g = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], h = c; h <= g; h++) {
                            for (var i = e[h], j = new CKEDITOR.dom.element(f.$.rows[h]), k = 0; k < i.length; k++) {
                                var l = new CKEDITOR.dom.element(i[k]), m = l.getParent().$.rowIndex;
                                if (l.$.rowSpan == 1)l.remove();
                                else {
                                    l.$.rowSpan = l.$.rowSpan -
                                        1;
                                    if (m == h) {
                                        m = e[h + 1];
                                        m[k - 1] ? l.insertAfter(new CKEDITOR.dom.element(m[k - 1])) : (new CKEDITOR.dom.element(f.$.rows[h + 1])).append(l, 1)
                                    }
                                }
                                k = k + (l.$.colSpan - 1)
                            }
                            d.push(j)
                        }
                        e = f.$.rows;
                        f = new CKEDITOR.dom.element(e[g + 1] || (c > 0 ? e[c - 1] : null) || f.$.parentNode);
                        for (h = d.length; h >= 0; h--)a(d[h]);
                        return f
                    }
                    if (c instanceof CKEDITOR.dom.element) {
                        f = c.getAscendant("table");
                        f.$.rows.length == 1 ? f.remove() : c.remove()
                    }
                    return null
                }

                function g(a, b) {
                    for (var c = b ? Infinity : 0, d = 0; d < a.length; d++) {
                        var f;
                        f = a[d];
                        for (var e = b,
                            g = f.getParent().$.cells,
                            h = 0,
                            i = 0; i < g.length; i++) {
                            var j = g[i], h = h + (e ? 1 : j.colSpan);
                            if (j == f.$)break
                        }
                        f = h - 1;
                        if (b ? f < c : f > c)c = f
                    }
                    return c
                }

                function e(a, c) {
                    for (var d = b(a), f = d[0].getAscendant("table"), e = g(d, 1), d = g(d), e = c ? e : d, h = CKEDITOR.tools.buildTableMap(f), f = [], d = [], i = h.length, j = 0; j < i; j++) {
                        f.push(h[j][e]);
                        d.push(c ? h[j][e - 1] : h[j][e + 1])
                    }
                    for (j = 0; j < i; j++)
                        if (f[j]) {
                            if (f[j].colSpan > 1 && d[j] == f[j]) {
                                e = f[j];
                                e.colSpan = e.colSpan + 1
                            } else {
                                e = (new CKEDITOR.dom.element(f[j])).clone();
                                e.removeAttribute("colSpan");
                                !CKEDITOR.env.ie && e.appendBogus();
                                e[c ?
                                    "insertBefore" : "insertAfter"].call(e, new CKEDITOR.dom.element(f[j]));
                                e = e.$
                            }
                            j = j + (e.rowSpan - 1)
                        }
                }

                function i(a, b) {
                    var c = a.getStartElement();
                    if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) {
                        var d = c.clone();
                        CKEDITOR.env.ie || d.appendBogus();
                        b ? d.insertBefore(c) : d.insertAfter(c)
                    }
                }

                function d(a) {
                    if (a instanceof CKEDITOR.dom.selection) {
                        var a = b(a), c = a[0] && a[0].getAscendant("table"), e;
                        a: {
                            var g = 0;
                            e = a.length - 1;
                            for (var h = {}, i, j; i = a[g++];)CKEDITOR.dom.element.setMarker(h, i, "delete_cell", true);
                            for (g = 0; i = a[g++];)
                                if ((j =
                                    i.getPrevious()) && !j.getCustomData("delete_cell") || (j = i.getNext()) && !j.getCustomData("delete_cell")) {
                                    CKEDITOR.dom.element.clearAllMarkers(h);
                                    e = j;
                                    break a
                                }
                            CKEDITOR.dom.element.clearAllMarkers(h);
                            j = a[0].getParent();
                            if (j = j.getPrevious())e = j.getLast();
                            else {
                                j = a[e].getParent();
                                e = (j = j.getNext()) ? j.getChild(0) : null
                            }
                        }
                        for (j = a.length - 1; j >= 0; j--)d(a[j]);
                        e ? f(e, true) : c && c.remove()
                    } else if (a instanceof CKEDITOR.dom.element) {
                        c = a.getParent();
                        c.getChildCount() == 1 ? c.remove() : a.remove()
                    }
                }

                function f(a, b) {
                    var c = new CKEDITOR.dom.range(a.getDocument());
                    if (!c["moveToElementEdit" + (b ? "End" : "Start")](a)) {
                        c.selectNodeContents(a);
                        c.collapse(b ? false : true)
                    }
                    c.select(true)
                }

                function c(a, b, c) {
                    a = a[b];
                    if (typeof c == "undefined")return a;
                    for (b = 0; a && b < a.length; b++) {
                        if (c.is && a[b] == c.$)return b;
                        if (b == c)return new CKEDITOR.dom.element(a[b])
                    }
                    return c.is ? -1 : null
                }

                function j(a, d, f) {
                    var e = b(a), g;
                    if ((d ? e.length != 1 : e.length < 2) || (g = a.getCommonAncestor()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("table"))return false;
                    var h, a = e[0];
                    g = a.getAscendant("table");
                    var i = CKEDITOR.tools.buildTableMap(g),
                        j = i.length,
                        k = i[0].length,
                        l = a.getParent().$.rowIndex,
                        m = c(i, l, a);
                    if (d) {
                        var u;
                        try {
                            var B = parseInt(a.getAttribute("rowspan"), 10) || 1;
                            h = parseInt(a.getAttribute("colspan"), 10) || 1;
                            u = i[d == "up" ? l - B : d == "down" ? l + B : l][d == "left" ? m - h : d == "right" ? m + h : m]
                        } catch (A) {
                            return false
                        }
                        if (!u || a.$ == u)return false;
                        e[d == "up" || d == "left" ? "unshift" : "push"](new CKEDITOR.dom.element(u))
                    }
                    for (var d = a.getDocument(), z = l, B = u = 0, C = !f && new CKEDITOR.dom.documentFragment(d), D = 0, d = 0; d < e.length; d++) {
                        h = e[d];
                        var F = h.getParent(),
                            E = h.getFirst(),
                            K = h.$.colSpan,
                            I = h.$.rowSpan,
                            F = F.$.rowIndex,
                            G = c(i, F, h),
                            D = D + K * I,
                            B = Math.max(B, G - m + K);
                        u = Math.max(u, F - l + I);
                        if (!f) {
                            K = h;
                            (I = K.getBogus()) && I.remove();
                            K.trim();
                            if (h.getChildren().count()) {
                                if (F != z && E && (!E.isBlockBoundary || !E.isBlockBoundary({ br: 1 })))(z = C.getLast(CKEDITOR.dom.walker.whitespaces(true))) && (!z.is || !z.is("br")) && C.append("br");
                                h.moveChildren(C)
                            }
                            d ? h.remove() : h.setHtml("")
                        }
                        z = F
                    }
                    if (f)return u * B == D;
                    C.moveChildren(a);
                    CKEDITOR.env.ie || a.appendBogus();
                    B >= k ? a.removeAttribute("rowSpan") : a.$.rowSpan = u;
                    u >= j ? a.removeAttribute("colSpan") :
                        a.$.colSpan = B;
                    f = new CKEDITOR.dom.nodeList(g.$.rows);
                    e = f.count();
                    for (d = e - 1; d >= 0; d--) {
                        g = f.getItem(d);
                        if (!g.$.cells.length) {
                            g.remove();
                            e++
                        }
                    }
                    return a
                }

                function k(a, d) {
                    var f = b(a);
                    if (f.length > 1)return false;
                    if (d)return true;
                    var f = f[0], e = f.getParent(), g = e.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(g), i = e.$.rowIndex, j = c(h, i, f), k = f.$.rowSpan, l;
                    if (k > 1) {
                        l = Math.ceil(k / 2);
                        for (var k = Math.floor(k / 2), e = i + l, g = new CKEDITOR.dom.element(g.$.rows[e]), h = c(h, e), m, e = f.clone(), i = 0; i < h.length; i++) {
                            m = h[i];
                            if (m.parentNode ==
                                g.$ && i > j) {
                                e.insertBefore(new CKEDITOR.dom.element(m));
                                break
                            } else m = null
                        }
                        m || g.append(e, true)
                    } else {
                        k = l = 1;
                        g = e.clone();
                        g.insertAfter(e);
                        g.append(e = f.clone());
                        m = c(h, i);
                        for (j = 0; j < m.length; j++)m[j].rowSpan++
                    }
                    CKEDITOR.env.ie || e.appendBogus();
                    f.$.rowSpan = l;
                    e.$.rowSpan = k;
                    l == 1 && f.removeAttribute("rowSpan");
                    k == 1 && e.removeAttribute("rowSpan");
                    return e
                }

                function l(a, d) {
                    var f = b(a);
                    if (f.length > 1)return false;
                    if (d)return true;
                    var f = f[0],
                        e = f.getParent(),
                        g = e.getAscendant("table"),
                        g = CKEDITOR.tools.buildTableMap(g),
                        h =
                            c(g, e.$.rowIndex, f),
                        i = f.$.colSpan;
                    if (i > 1) {
                        e = Math.ceil(i / 2);
                        i = Math.floor(i / 2)
                    } else {
                        for (var i = e = 1, j = [], k = 0; k < g.length; k++) {
                            var l = g[k];
                            j.push(l[h]);
                            l[h].rowSpan > 1 && (k = k + (l[h].rowSpan - 1))
                        }
                        for (g = 0; g < j.length; g++)j[g].colSpan++
                    }
                    g = f.clone();
                    g.insertAfter(f);
                    CKEDITOR.env.ie || g.appendBogus();
                    f.$.colSpan = e;
                    g.$.colSpan = i;
                    e == 1 && f.removeAttribute("colSpan");
                    i == 1 && g.removeAttribute("colSpan");
                    return g
                }

                var m = /^(?:td|th)$/;
                CKEDITOR.plugins.tabletools = {
                    requires: "table,dialog,contextmenu",
                    init: function(c) {
                        function g(a) {
                            return CKEDITOR.tools.extend(a ||
                            {}, { contextSensitive: 1, refresh: function(a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } })
                        }

                        var m = c.lang.table;
                        c.addCommand("cellProperties", new CKEDITOR.dialogCommand("cellProperties", g()));
                        CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                        c.addCommand("rowDelete", g({
                            exec: function(b) {
                                b = b.getSelection();
                                f(a(b))
                            }
                        }));
                        c.addCommand("rowInsertBefore", g({
                            exec: function(a) {
                                a = a.getSelection();
                                h(a, true)
                            }
                        }));
                        c.addCommand("rowInsertAfter", g({
                            exec: function(a) {
                                a =
                                    a.getSelection();
                                h(a)
                            }
                        }));
                        c.addCommand("columnDelete", g({
                            exec: function(a) {
                                for (var a = a.getSelection(), a = b(a), c = a[0], d = a[a.length - 1], a = c.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(a), g, h, i = [], j = 0, k = e.length; j < k; j++)
                                    for (var l = 0, m = e[j].length; l < m; l++) {
                                        e[j][l] == c.$ && (g = l);
                                        e[j][l] == d.$ && (h = l)
                                    }
                                for (j = g; j <= h; j++)
                                    for (l = 0; l < e.length; l++) {
                                        d = e[l];
                                        c = new CKEDITOR.dom.element(a.$.rows[l]);
                                        d = new CKEDITOR.dom.element(d[j]);
                                        if (d.$) {
                                            d.$.colSpan == 1 ? d.remove() : d.$.colSpan = d.$.colSpan - 1;
                                            l = l + (d.$.rowSpan - 1);
                                            c.$.cells.length ||
                                                i.push(c)
                                        }
                                    }
                                h = a.$.rows[0] && a.$.rows[0].cells;
                                g = new CKEDITOR.dom.element(h[g] || (g ? h[g - 1] : a.$.parentNode));
                                i.length == k && a.remove();
                                g && f(g, true)
                            }
                        }));
                        c.addCommand("columnInsertBefore", g({
                            exec: function(a) {
                                a = a.getSelection();
                                e(a, true)
                            }
                        }));
                        c.addCommand("columnInsertAfter", g({
                            exec: function(a) {
                                a = a.getSelection();
                                e(a)
                            }
                        }));
                        c.addCommand("cellDelete", g({
                            exec: function(a) {
                                a = a.getSelection();
                                d(a)
                            }
                        }));
                        c.addCommand("cellMerge", g({ exec: function(a) { f(j(a.getSelection()), true) } }));
                        c.addCommand("cellMergeRight", g({
                            exec: function(a) {
                                f(j(a.getSelection(),
                                    "right"), true)
                            }
                        }));
                        c.addCommand("cellMergeDown", g({ exec: function(a) { f(j(a.getSelection(), "down"), true) } }));
                        c.addCommand("cellVerticalSplit", g({ exec: function(a) { f(k(a.getSelection())) } }));
                        c.addCommand("cellHorizontalSplit", g({ exec: function(a) { f(l(a.getSelection())) } }));
                        c.addCommand("cellInsertBefore", g({
                            exec: function(a) {
                                a = a.getSelection();
                                i(a, true)
                            }
                        }));
                        c.addCommand("cellInsertAfter", g({
                            exec: function(a) {
                                a = a.getSelection();
                                i(a)
                            }
                        }));
                        c.addMenuItems && c.addMenuItems({
                            tablecell: {
                                label: m.cell.menu,
                                group: "tablecell",
                                order: 1,
                                getItems: function() {
                                    var a = c.getSelection(), d = b(a);
                                    return{
                                        tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                        tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                        tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                        tablecell_merge: j(a, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_merge_right: j(a, "right", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_merge_down: j(a, "down", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_split_vertical: k(a, true) ? CKEDITOR.TRISTATE_OFF :
                                            CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_split_horizontal: l(a, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                        tablecell_properties: d.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                                    }
                                }
                            },
                            tablecell_insertBefore: { label: m.cell.insertBefore, group: "tablecell", command: "cellInsertBefore", order: 5 },
                            tablecell_insertAfter: { label: m.cell.insertAfter, group: "tablecell", command: "cellInsertAfter", order: 10 },
                            tablecell_delete: { label: m.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15 },
                            tablecell_merge: {
                                label: m.cell.merge,
                                group: "tablecell",
                                command: "cellMerge",
                                order: 16
                            },
                            tablecell_merge_right: { label: m.cell.mergeRight, group: "tablecell", command: "cellMergeRight", order: 17 },
                            tablecell_merge_down: { label: m.cell.mergeDown, group: "tablecell", command: "cellMergeDown", order: 18 },
                            tablecell_split_horizontal: { label: m.cell.splitHorizontal, group: "tablecell", command: "cellHorizontalSplit", order: 19 },
                            tablecell_split_vertical: { label: m.cell.splitVertical, group: "tablecell", command: "cellVerticalSplit", order: 20 },
                            tablecell_properties: {
                                label: m.cell.title,
                                group: "tablecellproperties",
                                command: "cellProperties",
                                order: 21
                            },
                            tablerow: { label: m.row.menu, group: "tablerow", order: 1, getItems: function() { return{ tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } } },
                            tablerow_insertBefore: { label: m.row.insertBefore, group: "tablerow", command: "rowInsertBefore", order: 5 },
                            tablerow_insertAfter: { label: m.row.insertAfter, group: "tablerow", command: "rowInsertAfter", order: 10 },
                            tablerow_delete: {
                                label: m.row.deleteRow,
                                group: "tablerow",
                                command: "rowDelete",
                                order: 15
                            },
                            tablecolumn: { label: m.column.menu, group: "tablecolumn", order: 1, getItems: function() { return{ tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } } },
                            tablecolumn_insertBefore: { label: m.column.insertBefore, group: "tablecolumn", command: "columnInsertBefore", order: 5 },
                            tablecolumn_insertAfter: { label: m.column.insertAfter, group: "tablecolumn", command: "columnInsertAfter", order: 10 },
                            tablecolumn_delete: {
                                label: m.column.deleteColumn,
                                group: "tablecolumn",
                                command: "columnDelete",
                                order: 15
                            }
                        });
                        c.contextMenu && c.contextMenu.addListener(function(a, b, c) { return(a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
                    },
                    getSelectedCells: b
                };
                CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
            }(), CKEDITOR.tools.buildTableMap = function(b) {
                for (var b = b.$.rows, h = -1, a = [], g = 0; g < b.length; g++) {
                    h++;
                    !a[h] && (a[h] = []);
                    for (var e = -1, i = 0; i < b[g].cells.length; i++) {
                        var d =
                            b[g].cells[i];
                        for (e++; a[h][e];)e++;
                        for (var f = isNaN(d.colSpan) ? 1 : d.colSpan, d = isNaN(d.rowSpan) ? 1 : d.rowSpan, c = 0; c < d; c++) {
                            a[h + c] || (a[h + c] = []);
                            for (var j = 0; j < f; j++)a[h + c][e + j] = b[g].cells[i]
                        }
                        e = e + (f - 1)
                    }
                }
                return a
            }, function() {
                function b(a) {
                    function b() {
                        for (var c = d(), g = CKEDITOR.tools.clone(a.config.toolbarGroups) || h(a), i = 0; i < g.length; i++) {
                            var m = g[i];
                            if (m != "/") {
                                typeof m == "string" && (m = g[i] = { name: m });
                                var n, o = m.groups;
                                if (o)
                                    for (var p = 0; p < o.length; p++) {
                                        n = o[p];
                                        (n = c[n]) && f(m, n)
                                    }
                                (n = c[m.name]) && f(m, n)
                            }
                        }
                        return g
                    }

                    function d() {
                        var b =
                            {},
                            c,
                            d,
                            f;
                        for (c in a.ui.items) {
                            d = a.ui.items[c];
                            f = d.toolbar || "others";
                            f = f.split(",");
                            d = f[0];
                            f = parseInt(f[1] || -1, 10);
                            b[d] || (b[d] = []);
                            b[d].push({ name: c, order: f })
                        }
                        for (d in b)b[d] = b[d].sort(function(a, b) { return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ? -1 : 1 });
                        return b
                    }

                    function f(a, b) {
                        if (b.length) {
                            a.items ? a.items.push("-") : a.items = [];
                            for (var c; c = b.shift();)a.items.push(c.name)
                        }
                    }

                    var c = a.config.toolbar;
                    typeof c == "string" && (c = a.config["toolbar_" + c]);
                    return a.toolbar = c || b()
                }

                function h(a) {
                    return a._.toolbarGroups ||
                    (a._.toolbarGroups = [{ name: "document", groups: ["mode", "document", "doctools"] }, { name: "clipboard", groups: ["clipboard", "undo"] }, { name: "editing", groups: ["find", "selection", "spellchecker"] }, { name: "forms" }, "/", { name: "basicstyles", groups: ["basicstyles", "cleanup"] }, { name: "paragraph", groups: ["list", "indent", "blocks", "align"] }, { name: "links" }, { name: "insert" }, "/", { name: "styles" }, { name: "colors" }, { name: "tools" }, { name: "others" }, { name: "about" }])
                }

                var a = function() {
                    this.toolbars = [];
                    this.focusCommandExecuted = false
                };
                a.prototype.focus =
                    function() {
                        for (var a = 0, b; b = this.toolbars[a++];)
                            for (var d = 0, f; f = b.items[d++];)
                                if (f.focus) {
                                    f.focus();
                                    return
                                }
                    };
                var g = {
                    modes: { wysiwyg: 1, source: 1 }, readOnly: 1,
                    exec: function(a) {
                        if (a.toolbox) {
                            a.toolbox.focusCommandExecuted = true;
                            CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() { a.toolbox.focus() }, 100) : a.toolbox.focus()
                        }
                    }
                };
                CKEDITOR.plugins.add("toolbar", {
                    requires: "button",
                    init: function(e) {
                        var h,
                            d = function(a, b) {
                                var g, k = e.lang.dir == "rtl", l = e.config.toolbarGroupCycling, l = l === void 0 || l;
                                switch (b) {
                                case 9:
                                case CKEDITOR.SHIFT +
                                        9:
                                    for (; !g || !g.items.length;) {
                                        g = b == 9 ? (g ? g.next : a.toolbar.next) || e.toolbox.toolbars[0] : (g ? g.previous : a.toolbar.previous) || e.toolbox.toolbars[e.toolbox.toolbars.length - 1];
                                        if (g.items.length)for (a = g.items[h ? g.items.length - 1 : 0]; a && !a.focus;)(a = h ? a.previous : a.next) || (g = 0)
                                    }
                                    a && a.focus();
                                    return false;
                                case k ? 37 : 39:
                                case 40:
                                    g = a;
                                    do {
                                        g = g.next;
                                        !g && l && (g = a.toolbar.items[0])
                                    } while (g && !g.focus);
                                    g ? g.focus() : d(a, 9);
                                    return false;
                                case k ? 39 : 37:
                                case 38:
                                    g = a;
                                    do {
                                        g = g.previous;
                                        !g && l && (g = a.toolbar.items[a.toolbar.items.length - 1])
                                    } while (g &&
                                        !g.focus);
                                    if (g)g.focus();
                                    else {
                                        h = 1;
                                        d(a, CKEDITOR.SHIFT + 9);
                                        h = 0
                                    }
                                    return false;
                                case 27:
                                    e.focus();
                                    return false;
                                case 13:
                                case 32:
                                    a.execute();
                                    return false
                                }
                                return true
                            };
                        e.on("uiSpace", function(f) {
                            if (f.data.space == e.config.toolbarLocation) {
                                e.toolbox = new a;
                                var c = CKEDITOR.tools.getNextId(),
                                    g = e.config.removeButtons,
                                    g = g && g.split(","),
                                    h = ['<span id="', c, '" class="cke_voice_label">', e.lang.toolbar.toolbars, "</span>", '<span id="' + e.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', c, '" onmousedown="return false;">'],
                                    c = e.config.toolbarStartupExpanded !== false,
                                    i,
                                    m;
                                e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && h.push('<span class="cke_toolbox_main"' + (c ? ">" : ' style="display:none">'));
                                for (var n = e.toolbox.toolbars, o = b(e), p = 0; p < o.length; p++) {
                                    var t, r = 0, s, x = o[p], y;
                                    if (x) {
                                        if (i) {
                                            h.push("</span>");
                                            m = i = 0
                                        }
                                        if (x === "/")h.push('<span class="cke_toolbar_break"></span>');
                                        else {
                                            y = x.items || x;
                                            for (var w = 0; w < y.length; w++) {
                                                var v;
                                                v = y[w];
                                                var q;
                                                if (!(g && CKEDITOR.tools.indexOf(g, v) >= 0))
                                                    if (v = e.ui.create(v))
                                                        if (v.type ==
                                                            CKEDITOR.UI_SEPARATOR)m = i && v;
                                                        else {
                                                            q = v.canGroup !== false;
                                                            if (!r) {
                                                                t = CKEDITOR.tools.getNextId();
                                                                r = { id: t, items: [] };
                                                                s = x.name && (e.lang.toolbar.toolbarGroups[x.name] || x.name);
                                                                h.push('<span id="', t, '" class="cke_toolbar"', s ? ' aria-labelledby="' + t + '_label"' : "", ' role="toolbar">');
                                                                s && h.push('<span id="', t, '_label" class="cke_voice_label">', s, "</span>");
                                                                h.push('<span class="cke_toolbar_start"></span>');
                                                                var u = n.push(r) - 1;
                                                                if (u > 0) {
                                                                    r.previous = n[u - 1];
                                                                    r.previous.next = r
                                                                }
                                                            }
                                                            if (q) {
                                                                if (!i) {
                                                                    h.push('<span class="cke_toolgroup" role="presentation">');
                                                                    i = 1
                                                                }
                                                            } else if (i) {
                                                                h.push("</span>");
                                                                i = 0
                                                            }
                                                            t = function(a) {
                                                                a = a.render(e, h);
                                                                u = r.items.push(a) - 1;
                                                                if (u > 0) {
                                                                    a.previous = r.items[u - 1];
                                                                    a.previous.next = a
                                                                }
                                                                a.toolbar = r;
                                                                a.onkey = d;
                                                                a.onfocus = function() { e.toolbox.focusCommandExecuted || e.focus() }
                                                            };
                                                            if (m) {
                                                                t(m);
                                                                m = 0
                                                            }
                                                            t(v)
                                                        }
                                            }
                                            if (i) {
                                                h.push("</span>");
                                                m = i = 0
                                            }
                                            r && h.push('<span class="cke_toolbar_end"></span></span>')
                                        }
                                    }
                                }
                                e.config.toolbarCanCollapse && h.push("</span>");
                                if (e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                                    var B = CKEDITOR.tools.addFunction(function() { e.execCommand("toolbarCollapse") });
                                    e.on("destroy", function() { CKEDITOR.tools.removeFunction(B) });
                                    e.addCommand("toolbarCollapse", {
                                        readOnly: 1,
                                        exec: function(a) {
                                            var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), f = c.getParent(), e = parseInt(d.$.style.height, 10), g = f.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
                                            if (h) {
                                                c.show();
                                                b.removeClass("cke_toolbox_collapser_min");
                                                b.setAttribute("title", a.lang.toolbar.toolbarCollapse)
                                            } else {
                                                c.hide();
                                                b.addClass("cke_toolbox_collapser_min");
                                                b.setAttribute("title",
                                                    a.lang.toolbar.toolbarExpand)
                                            }
                                            b.getFirst().setText(h ? "▲" : "◀");
                                            d.setStyle("height", e - (f.$.offsetHeight - g) + "px");
                                            a.fire("resize")
                                        },
                                        modes: { wysiwyg: 1, source: 1 }
                                    });
                                    e.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                                    h.push('<a title="' + (c ? e.lang.toolbar.toolbarCollapse : e.lang.toolbar.toolbarExpand) + '" id="' + e.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                                    c || h.push(" cke_toolbox_collapser_min");
                                    h.push('" onclick="CKEDITOR.tools.callFunction(' +
                                        B + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                                }
                                h.push("</span>");
                                f.data.html = f.data.html + h.join("")
                            }
                        });
                        e.on("destroy", function() {
                            if (this.toolbox) {
                                var a, b = 0, d, e, g;
                                for (a = this.toolbox.toolbars; b < a.length; b++) {
                                    e = a[b].items;
                                    for (d = 0; d < e.length; d++) {
                                        g = e[d];
                                        g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn);
                                        g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn)
                                    }
                                }
                            }
                        });
                        e.on("uiReady", function() {
                            var a = e.ui.space("toolbox");
                            a && e.focusManager.add(a, 1)
                        });
                        e.addCommand("toolbarFocus", g);
                        e.setKeystroke(CKEDITOR.ALT +
                            121, "toolbarFocus");
                        e.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                        e.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                            create: function() {
                                return{
                                    render: function(a, b) {
                                        b.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                        return{}
                                    }
                                }
                            }
                        })
                    }
                });
                CKEDITOR.ui.prototype.addToolbarGroup = function(a, b, d) {
                    var f = h(this.editor), c = b === 0, g = { name: a };
                    if (d) {
                        if (d = CKEDITOR.tools.search(f, function(a) { return a.name == d })) {
                            !d.groups && (d.groups = []);
                            if (b) {
                                b = CKEDITOR.tools.indexOf(d.groups, b);
                                if (b >= 0) {
                                    d.groups.splice(b + 1, 0, a);
                                    return
                                }
                            }
                            c ?
                                d.groups.splice(0, 0, a) : d.groups.push(a);
                            return
                        }
                        b = null
                    }
                    b && (b = CKEDITOR.tools.indexOf(f, function(a) { return a.name == b }));
                    c ? f.splice(0, 0, a) : typeof b == "number" ? f.splice(b + 1, 0, g) : f.push(a)
                }
            }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", function() {
                function b(a) {
                    this.editor = a;
                    this.reset()
                }

                CKEDITOR.plugins.add("undo", {
                    init: function(a) {
                        function f(a) { c.enabled && a.data.command.canUndo !== false && c.save() }

                        var c = new b(a),
                            e = a.addCommand("undo", {
                                exec: function() {
                                    if (c.undo()) {
                                        a.selectionChange();
                                        this.fire("afterUndo")
                                    }
                                },
                                state: CKEDITOR.TRISTATE_DISABLED,
                                canUndo: false
                            }),
                            g = a.addCommand("redo", {
                                exec: function() {
                                    if (c.redo()) {
                                        a.selectionChange();
                                        this.fire("afterRedo")
                                    }
                                },
                                state: CKEDITOR.TRISTATE_DISABLED,
                                canUndo: false
                            });
                        a.setKeystroke([[CKEDITOR.CTRL + 90, "undo"], [CKEDITOR.CTRL + 89, "redo"], [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]]);
                        c.onChange = function() {
                            e.setState(c.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            g.setState(c.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        };
                        a.on("beforeCommandExec", f);
                        a.on("afterCommandExec", f);
                        a.on("saveSnapshot", function(a) { c.save(a.data && a.data.contentOnly) });
                        a.on("contentDom", function() { a.editable().on("keydown", function(a) { !a.data.$.ctrlKey && !a.data.$.metaKey && c.type(a) }) });
                        a.on("beforeModeUnload", function() { a.mode == "wysiwyg" && c.save(true) });
                        a.on("mode", function() {
                            c.enabled = a.readOnly ? false : a.mode == "wysiwyg";
                            c.onChange()
                        });
                        if (a.ui.addButton) {
                            a.ui.addButton("Undo", { label: a.lang.undo.undo, command: "undo", toolbar: "undo,10" });
                            a.ui.addButton("Redo",
                            { label: a.lang.undo.redo, command: "redo", toolbar: "undo,20" })
                        }
                        a.resetUndo = function() {
                            c.reset();
                            a.fire("saveSnapshot")
                        };
                        a.on("updateSnapshot", function() { c.currentImage && c.update() });
                        a.on("lockSnapshot", c.lock, c);
                        a.on("unlockSnapshot", c.unlock, c)
                    }
                });
                CKEDITOR.plugins.undo = {};
                var h = CKEDITOR.plugins.undo.Image = function(a) {
                        this.editor = a;
                        a.fire("beforeUndoImage");
                        var b = a.getSnapshot(), c = b && a.getSelection();
                        CKEDITOR.env.ie && b && (b = b.replace(/\s+data-cke-expando=".*?"/g, ""));
                        this.contents = b;
                        this.bookmarks = c &&
                            c.createBookmarks2(true);
                        a.fire("afterUndoImage")
                    },
                    a = /\b(?:href|src|name)="[^"]*?"/gi;
                h.prototype = {
                    equals: function(b, f) {
                        var c = this.contents, e = b.contents;
                        if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) {
                            c = c.replace(a, "");
                            e = e.replace(a, "")
                        }
                        if (c != e)return false;
                        if (f)return true;
                        c = this.bookmarks;
                        e = b.bookmarks;
                        if (c || e) {
                            if (!c || !e || c.length != e.length)return false;
                            for (var g = 0; g < c.length; g++) {
                                var h = c[g], i = e[g];
                                if (h.startOffset != i.startOffset || h.endOffset != i.endOffset || !CKEDITOR.tools.arrayCompare(h.start,
                                    i.start) || !CKEDITOR.tools.arrayCompare(h.end, i.end))return false
                            }
                        }
                        return true
                    }
                };
                var g = { 8: 1, 46: 1 }, e = { 16: 1, 17: 1, 18: 1 }, i = { 37: 1, 38: 1, 39: 1, 40: 1 };
                b.prototype = {
                    type: function(a) {
                        var a = a && a.data.getKey(), b = a in g, c = this.lastKeystroke in g, j = b && a == this.lastKeystroke, k = a in i, l = this.lastKeystroke in i;
                        if (!(a in e || this.typing) || !b && !k && (c || l) || b && !j) {
                            var m = new h(this.editor), n = this.snapshots.length;
                            CKEDITOR.tools.setTimeout(function() {
                                var a = this.editor.getSnapshot();
                                CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g,
                                    ""));
                                if (m.contents != a && n == this.snapshots.length) {
                                    this.typing = true;
                                    this.save(false, m, false) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1);
                                    this.hasUndo = true;
                                    this.hasRedo = false;
                                    this.modifiersCount = this.typesCount = 1;
                                    this.onChange()
                                }
                            }, 0, this)
                        }
                        this.lastKeystroke = a;
                        if (b) {
                            this.typesCount = 0;
                            this.modifiersCount++;
                            if (this.modifiersCount > 25) {
                                this.save(false, null, false);
                                this.modifiersCount = 1
                            }
                        } else if (!k) {
                            this.modifiersCount = 0;
                            this.typesCount++;
                            if (this.typesCount > 25) {
                                this.save(false, null,
                                    false);
                                this.typesCount = 1
                            }
                        }
                    },
                    reset: function() {
                        this.lastKeystroke = 0;
                        this.snapshots = [];
                        this.index = -1;
                        this.limit = this.editor.config.undoStackSize || 20;
                        this.currentImage = null;
                        this.hasRedo = this.hasUndo = false;
                        this.locked = null;
                        this.resetType()
                    },
                    resetType: function() {
                        this.typing = false;
                        delete this.lastKeystroke;
                        this.modifiersCount = this.typesCount = 0
                    },
                    fireChange: function() {
                        this.hasUndo = !!this.getNextImage(true);
                        this.hasRedo = !!this.getNextImage(false);
                        this.resetType();
                        this.onChange()
                    },
                    save: function(a, b, c) {
                        if (this.locked)return false;
                        var e = this.snapshots;
                        b || (b = new h(this.editor));
                        if (b.contents === false || this.currentImage && b.equals(this.currentImage, a))return false;
                        e.splice(this.index + 1, e.length - this.index - 1);
                        e.length == this.limit && e.shift();
                        this.index = e.push(b) - 1;
                        this.currentImage = b;
                        c !== false && this.fireChange();
                        return true
                    },
                    restoreImage: function(a) {
                        var b = this.editor, c;
                        if (a.bookmarks) {
                            b.focus();
                            c = b.getSelection()
                        }
                        this.locked = 1;
                        this.editor.loadSnapshot(a.contents);
                        if (a.bookmarks)c.selectBookmarks(a.bookmarks);
                        else if (CKEDITOR.env.ie) {
                            b =
                                this.editor.document.getBody().$.createTextRange();
                            b.collapse(true);
                            b.select()
                        }
                        this.locked = 0;
                        this.index = a.index;
                        this.update();
                        this.fireChange()
                    },
                    getNextImage: function(a) {
                        var b = this.snapshots, c = this.currentImage, e;
                        if (c)
                            if (a)
                                for (e = this.index - 1; e >= 0; e--) {
                                    a = b[e];
                                    if (!c.equals(a, true)) {
                                        a.index = e;
                                        return a
                                    }
                                }
                            else
                                for (e = this.index + 1; e < b.length; e++) {
                                    a = b[e];
                                    if (!c.equals(a, true)) {
                                        a.index = e;
                                        return a
                                    }
                                }
                        return null
                    },
                    redoable: function() { return this.enabled && this.hasRedo },
                    undoable: function() { return this.enabled && this.hasUndo },
                    undo: function() {
                        if (this.undoable()) {
                            this.save(true);
                            var a = this.getNextImage(true);
                            if (a)return this.restoreImage(a), true
                        }
                        return false
                    },
                    redo: function() {
                        if (this.redoable()) {
                            this.save(true);
                            if (this.redoable()) {
                                var a = this.getNextImage(false);
                                if (a)return this.restoreImage(a), true
                            }
                        }
                        return false
                    },
                    update: function() { if (!this.locked)this.snapshots.splice(this.index, 1, this.currentImage = new h(this.editor)) },
                    lock: function() {
                        if (!this.locked) {
                            var a = this.editor.getSnapshot();
                            this.locked = {
                                update: this.currentImage &&
                                    a == this.currentImage.contents ? a : null
                            }
                        }
                    },
                    unlock: function() {
                        if (this.locked) {
                            var a = this.locked.update, b = this.editor.getSnapshot();
                            this.locked = null;
                            typeof a == "string" && b != a && this.update()
                        }
                    }
                }
            }(), CKEDITOR.plugins.add("wsc", {
                requires: "dialog",
                init: function(b) {
                    b.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname };
                    typeof b.plugins.scayt == "undefined" && b.ui.addButton && b.ui.addButton("SpellChecker",
                    { label: b.lang.wsc.toolbar, command: "checkspell", toolbar: "spellchecker,10" });
                    CKEDITOR.dialog.add("checkspell", this.path + "dialogs/wsc.js")
                }
            }), CKEDITOR.config.wsc_customerId = CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk", CKEDITOR.config.wsc_customLoaderScript = CKEDITOR.config.wsc_customLoaderScript || null, function() {
                function b(b) {
                    var f = this.editor, c = b.document, e = c.body;
                    (b = c.getElementById("cke_actscrpt")) && b.parentNode.removeChild(b);
                    (b = c.getElementById("cke_shimscrpt")) &&
                        b.parentNode.removeChild(b);
                    if (CKEDITOR.env.gecko) {
                        e.contentEditable = false;
                        if (CKEDITOR.env.version < 2E4) {
                            e.innerHTML = e.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, "");
                            setTimeout(function() {
                                var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c));
                                a.setStart(new CKEDITOR.dom.node(e), 0);
                                f.getSelection().selectRanges([a])
                            }, 0)
                        }
                    }
                    e.contentEditable = true;
                    if (CKEDITOR.env.ie) {
                        e.hideFocus = true;
                        e.disabled = true;
                        e.removeAttribute("disabled")
                    }
                    delete this._.isLoadingData;
                    this.$ = e;
                    c = new CKEDITOR.dom.document(c);
                    this.setup();
                    if (CKEDITOR.env.ie) {
                        c.getDocumentElement().addClass(c.$.compatMode);
                        f.config.enterMode != CKEDITOR.ENTER_P && c.on("selectionchange", function() {
                            var a = c.getBody(), b = f.getSelection(), d = b && b.getRanges()[0];
                            d && (a.getHtml().match(/^<p>&nbsp;<\/p>$/i) && d.startContainer.equals(a)) && setTimeout(function() {
                                d = f.getSelection().getRanges()[0];
                                if (!d.startContainer.equals("body")) {
                                    a.getFirst().remove(1);
                                    d.moveToElementEditEnd(a);
                                    d.select()
                                }
                            }, 0)
                        })
                    }
                    CKEDITOR.env.gecko && CKEDITOR.tools.setTimeout(a, 0, this, f);
                    try {
                        f.document.$.execCommand("2D-position", false, true)
                    } catch (g) {
                    }
                    try {
                        f.document.$.execCommand("enableInlineTableEditing", false, !f.config.disableNativeTableHandles)
                    } catch (h) {
                    }
                    if (f.config.disableObjectResizing)
                        try {
                            this.getDocument().$.execCommand("enableObjectResizing", false, false)
                        } catch (i) {
                            this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function(a) { a.data.preventDefault() })
                        }
                    (CKEDITOR.env.gecko || CKEDITOR.env.ie && f.document.$.compatMode == "CSS1Compat") && this.attachListener(this, "keydown",
                        function(a) {
                            var b = a.data.getKeystroke();
                            if (b == 33 || b == 34)
                                if (CKEDITOR.env.ie)setTimeout(function() { f.getSelection().scrollIntoView() }, 0);
                                else if (f.window.$.innerHeight > this.$.offsetHeight) {
                                    var c = f.createRange();
                                    c[b == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                                    c.select();
                                    a.data.preventDefault()
                                }
                        });
                    CKEDITOR.env.ie && this.attachListener(c, "blur", function() {
                        try {
                            c.$.selection.empty()
                        } catch (a) {
                        }
                    });
                    f.document.getElementsByTag("title").getItem(0).data("cke-title", f.document.$.title);
                    if (CKEDITOR.env.ie)
                        f.document.$.title =
                            this._.docTitle;
                    CKEDITOR.tools.setTimeout(function() {
                        f.fire("contentDom");
                        if (this._.isPendingFocus) {
                            f.focus();
                            this._.isPendingFocus = false
                        }
                        setTimeout(function() { f.fire("dataReady") }, 0);
                        CKEDITOR.env.ie && setTimeout(function() {
                            if (f.document) {
                                var a = f.document.$.body;
                                a.runtimeStyle.marginBottom = "0px";
                                a.runtimeStyle.marginBottom = ""
                            }
                        }, 1E3)
                    }, 0, this)
                }

                function h(a) { a.checkDirty() || setTimeout(function() { a.resetDirty() }, 0) }

                function a(a) {
                    if (!a.readOnly) {
                        var b = a.window,
                            c = a.document,
                            e = c.getBody(),
                            g = e.getFirst(),
                            i = e.getChildren().count();
                        if (!i || i == 1 && g.type == CKEDITOR.NODE_ELEMENT && g.hasAttribute("_moz_editor_bogus_node")) {
                            h(a);
                            var g = CKEDITOR.document, m = g.getDocumentElement(), n = m.$.scrollTop, o = m.$.scrollLeft, p = c.$.createEvent("KeyEvents");
                            p.initKeyEvent("keypress", true, true, b.$, false, false, false, false, 0, 32);
                            c.$.dispatchEvent(p);
                            (n != m.$.scrollTop || o != m.$.scrollLeft) && g.getWindow().$.scrollTo(o, n);
                            i && e.getFirst().remove();
                            c.getBody().appendBogus();
                            a = a.createRange();
                            a.setStartAt(e, CKEDITOR.POSITION_AFTER_START);
                            a.select()
                        }
                    }
                }

                function g() {
                    var a = [];
                    if (CKEDITOR.document.$.documentMode >= 8) {
                        a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                        var b = [], c;
                        for (c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat " + c + "[contenteditable=false]");
                        a.push(b.join(",") + "{display:inline-block}")
                    } else if (CKEDITOR.env.gecko) {
                        a.push("html{height:100% !important}");
                        a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
                    }
                    a.push("html{cursor:text;*cursor:auto}");
                    a.push("img,input,textarea{cursor:default}");
                    return a.join("\n")
                }

                CKEDITOR.plugins.add("wysiwygarea", {
                    init: function(a) {
                        a.addMode("wysiwyg", function(b) {
                            function c(c) {
                                c && c.removeListener();
                                a.editable(new i(a, g.$.contentWindow.document.body));
                                a.setData(a.getData(1), b)
                            }

                            var g = CKEDITOR.document.createElement("iframe");
                            g.setStyles({ width: "100%", height: "100%" });
                            g.addClass("cke_wysiwyg_frame cke_reset");
                            var h = a.ui.space("contents");
                            h.append(g);
                            var l = "document.open();" + (e ? 'document.domain="' + document.domain + '";' : "") + "document.close();",
                                l = CKEDITOR.env.air ?
                                    "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(l) + "}())" : "",
                                m = CKEDITOR.env.ie || CKEDITOR.env.gecko;
                            if (m)g.on("load", c);
                            var n = [a.lang.editor, a.name].join(), o = a.lang.common.editorHelp;
                            CKEDITOR.env.ie && (n = n + (", " + o));
                            var p = CKEDITOR.tools.getNextId(), t = CKEDITOR.dom.element.createFromHtml('<span id="' + p + '" class="cke_voice_label">' + o + "</span>");
                            h.append(t, 1);
                            a.on("beforeModeUnload", function(a) {
                                a.removeListener();
                                t.remove()
                            });
                            g.setAttributes({
                                frameBorder: 0,
                                "aria-describedby": p,
                                title: n,
                                src: l,
                                tabIndex: a.tabIndex,
                                allowTransparency: "true"
                            });
                            !m && c();
                            if (CKEDITOR.env.webkit) {
                                l = function() {
                                    h.setStyle("width", "100%");
                                    g.hide();
                                    g.setSize("width", h.getSize("width"));
                                    h.removeStyle("width");
                                    g.show()
                                };
                                g.setCustomData("onResize", l);
                                CKEDITOR.document.getWindow().on("resize", l)
                            }
                            a.fire("ariaWidget", g)
                        })
                    }
                });
                var e = CKEDITOR.env.isCustomDomain(),
                    i = CKEDITOR.tools.createClass({
                        $: function(a) {
                            this.base.apply(this, arguments);
                            this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) {
                                CKEDITOR.tools.setTimeout(b,
                                    0, this, a)
                            }, this);
                            this._.docTitle = this.getWindow().getFrame().getAttribute("title")
                        },
                        base: CKEDITOR.editable,
                        proto: {
                            setData: function(a, b) {
                                var c = this.editor;
                                if (b)this.setHtml(a);
                                else {
                                    this._.isLoadingData = true;
                                    c._.dataStore = { id: 1 };
                                    var h = c.config, i = h.fullPage, l = h.docType, m = CKEDITOR.tools.buildStyleHtml(g()).replace(/<style>/, '<style data-cke-temp="1">');
                                    i || (m = m + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss));
                                    var n = h.baseHref ? '<base href="' + h.baseHref + '" data-cke-temp="1" />' : "";
                                    i && (a = a.replace(/<!DOCTYPE[^>]*>/i,
                                        function(a) {
                                            c.docType = l = a;
                                            return""
                                        }).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
                                        c.xmlDeclaration = a;
                                        return""
                                    }));
                                    c.dataProcessor && (a = c.dataProcessor.toHtml(a));
                                    if (i) {
                                        /<body[\s|>]/.test(a) || (a = "<body>" + a);
                                        /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>");
                                        /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>");
                                        n && (a = a.replace(/<head>/, "$&" + n));
                                        a = a.replace(/<\/head\s*>/, m + "$&");
                                        a = l + a
                                    } else
                                        a = h.docType + '<html dir="' +
                                            h.contentsLangDirection + '" lang="' + (h.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + n + m + "</head><body" + (h.bodyId ? ' id="' + h.bodyId + '"' : "") + (h.bodyClass ? ' class="' + h.bodyClass + '"' : "") + ">" + a + "</body></html>";
                                    if (CKEDITOR.env.gecko) {
                                        a = a.replace(/<body/, '<body contenteditable="true" ');
                                        CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>"))
                                    }
                                    h = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">" + (e ? 'document.domain="' +
                                        document.domain + '";' : "") + "var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                                    CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (h = h + '<script id="cke_shimscrpt">(function(){var e="abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,mark,meter,nav,output,progress,section,summary,time,video".split(","),i=e.length;while(i--){document.createElement(e[i])}})()<\/script>');
                                    a = a.replace(/(?=\s*<\/(:?head)>)/, h);
                                    this.clearCustomData();
                                    this.clearListeners();
                                    c.fire("contentDomUnload");
                                    var o = this.getDocument();
                                    try {
                                        o.write(a)
                                    } catch (p) {
                                        setTimeout(function() { o.write(a) }, 0)
                                    }
                                }
                            },
                            getData: function(a) {
                                if (a)return this.getHtml();
                                var a = this.editor, b = a.config.fullPage, c = b && a.docType, e = b && a.xmlDeclaration, g = this.getDocument(), b = b ? g.getDocumentElement().getOuterHtml() : g.getBody().getHtml();
                                CKEDITOR.env.gecko && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                                a.dataProcessor && (b = a.dataProcessor.toDataFormat(b));
                                e && (b = e + "\n" + b);
                                c && (b = c + "\n" + b);
                                return b
                            },
                            focus: function() { this._.isLoadingData ? this._.isPendingFocus = true : i.baseProto.focus.call(this) },
                            detach: function() {
                                var a = this.editor, b = a.document, c = a.window.getFrame();
                                i.baseProto.detach.call(this);
                                this.clearCustomData();
                                b.getDocumentElement().clearCustomData();
                                c.clearCustomData();
                                CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                                (b = c.removeCustomData("onResize")) && b.removeListener();
                                a.fire("contentDomUnload");
                                c.remove()
                            }
                        }
                    })
            }(), CKEDITOR.config.disableObjectResizing =
                !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css", CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,clipboard,panel,floatpanel,menu,contextmenu,elementspath,list,indent,enterkey,entities,popup,filebrowser,floatingspace,listblock,button,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,sourcearea,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wsc,wysiwygarea",
            CKEDITOR.config.skin = "moono", function() {
                for (var b = "about,0,bold,32,italic,64,strike,96,subscript,128,superscript,160,underline,192,blockquote,224,copy-rtl,256,copy,288,cut-rtl,320,cut,352,paste-rtl,384,paste,416,horizontalrule,448,image,480,indent-rtl,512,indent,544,outdent-rtl,576,outdent,608,anchor-rtl,640,anchor,672,link,704,unlink,736,bulletedlist-rtl,768,bulletedlist,800,numberedlist-rtl,832,numberedlist,864,maximize,896,pastefromword-rtl,928,pastefromword,960,pastetext-rtl,992,pastetext,1024,removeformat,1056,scayt,1088,source-rtl,1120,source,1152,specialchar,1184,table,1216,redo-rtl,1248,redo,1280,undo-rtl,1312,undo,1344,spellchecker,1376",
                    h = CKEDITOR.getUrl("plugins/icons.png"),
                    b = b.split(","),
                    a = 0; a < b.length; a++)CKEDITOR.skin.icons[b[a]] = { path: h, offset: -b[++a] }
            }()
})();