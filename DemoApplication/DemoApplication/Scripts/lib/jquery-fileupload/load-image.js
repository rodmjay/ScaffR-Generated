(function(a) {
    "use strict";
    var b = function(a, c, d) {
            var e = document.createElement("img"), f, g;
            return e.onerror = c, e.onload = function() { g && b.revokeObjectURL(g), c(b.scale(e, d)) }, window.Blob && a instanceof Blob || window.File && a instanceof File ? f = g = b.createObjectURL(a) : f = a, f ? (e.src = f, e) : b.readFile(a, function(a) { e.src = a })
        },
        c = window.createObjectURL && window || window.URL && URL || window.webkitURL && webkitURL;
    b.scale = function(a, b) {
        b = b || {};
        var c = document.createElement("canvas"), d = Math.max((b.minWidth || a.width) / a.width, (b.minHeight || a.height) / a.height);
        return d > 1 && (a.width = parseInt(a.width * d, 10), a.height = parseInt(a.height * d, 10)), d = Math.min((b.maxWidth || a.width) / a.width, (b.maxHeight || a.height) / a.height), d < 1 && (a.width = parseInt(a.width * d, 10), a.height = parseInt(a.height * d, 10)), !b.canvas || !c.getContext ? a : (c.width = a.width, c.height = a.height, c.getContext("2d").drawImage(a, 0, 0, a.width, a.height), c)
    }, b.createObjectURL = function(a) { return c ? c.createObjectURL(a) : !1 }, b.revokeObjectURL = function(a) { return c ? c.revokeObjectURL(a) : !1 }, b.readFile = function(a, b) {
        if (window.FileReader && FileReader.prototype.readAsDataURL) {
            var c = new FileReader;
            return c.onload = function(a) { b(a.target.result) }, c.readAsDataURL(a), c
        }
        return!1
    }, typeof define != "undefined" && define.amd ? define(function() { return b }) : a.loadImage = b
})(this);