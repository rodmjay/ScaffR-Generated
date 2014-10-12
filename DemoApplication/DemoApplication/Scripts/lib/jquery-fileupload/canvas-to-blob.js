(function(a) {
    "use strict";
    var b = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder, c = /^image\/(jpeg|png)$/,
        d = function(a, e, f) {
            f = f || {};
            if (a.toBlob)return a.toBlob(e, f.type), !0;
            if (a.mozGetAsFile) {
                var g = f.name;
                return e(a.mozGetAsFile(c.test(f.type) && g || (g && g.replace(/\..+$/, "") || "blob") + ".png", f.type)), !0
            }
            return a.toDataURL && b && window.atob && window.ArrayBuffer && window.Uint8Array ? (e(d.dataURItoBlob(a.toDataURL(f.type))), !0) : !1
        };
    d.dataURItoBlob = function(a) {
        var c, d, e, f, g, h;
        a.split(",")[0].indexOf("base64") >= 0 ? c = atob(a.split(",")[1]) : c = decodeURIComponent(a.split(",")[1]), d = new ArrayBuffer(c.length), e = new Uint8Array(d);
        for (f = 0; f < c.length; f += 1)e[f] = c.charCodeAt(f);
        return g = new b, g.append(d), h = a.split(",")[0].split(":")[1].split(";")[0], g.getBlob(h)
    }, typeof define != "undefined" && define.amd ? define(function() { return d }) : a.canvasToBlob = d
})(this);