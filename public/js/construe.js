function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element_id');
}



(function () {
    var gtConstEvalStartTime = new Date();

    
    var d = "Translate", k = this || self; function l(a, c) { a = a.split("."); var b = k; a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]); for (var f; a.length && (f = a.shift());)a.length || void 0 === c ? b[f] && b[f] !== Object.prototype[f] ? b = b[f] : b = b[f] = {} : b[f] = c }
    function m(a, c) { function b() { } b.prototype = c.prototype; a.ka = c.prototype; a.prototype = new b; a.prototype.constructor = a; a.ja = function (f, h, n) { for (var g = Array(arguments.length - 2), e = 2; e < arguments.length; e++)g[e - 2] = arguments[e]; return c.prototype[h].apply(f, g) } } function p(a) { return a }; function q() { return "[msg_undefined]" } var r = {};
    (function () {
        if (void 0 == window.CLOSURE_DEFINES || window.CLOSURE_DEFINES["te.msg.EMBED_MESSAGES"]) {
            r = {
                Y: function () { return MSG_TRANSLATE }, m: function () { return MSG_CANCEL }, s: function () { return MSG_CLOSE }, K: function () { return MSGFUNC_PAGE_TRANSLATED_TO }, Z: function () { return MSGFUNC_TRANSLATED_TO }, B: function () { return MSG_GENERAL_ERROR }, D: function () { return MSG_LANGUAGE_UNSUPPORTED }, F: function () { return MSG_LEARN_MORE }, L: function () { return MSGFUNC_POWERED_BY }, ba: function () { return MSG_TRANSLATE_PRODUCT_NAME }, da: function () { return MSG_TRANSLATION_IN_PROGRESS },
                aa: function () { return MSGFUNC_TRANSLATE_PAGE_TO }, ia: function () { return MSGFUNC_VIEW_PAGE_IN }, M: function () { return MSG_RESTORE }, U: function () { return MSG_SSL_INFO_LOCAL_FILE }, V: function () { return MSG_SSL_INFO_SECURE_PAGE }, T: function () { return MSG_SSL_INFO_INTRANET_PAGE }, N: function () { return MSG_SELECT_LANGUAGE }, fa: function () { return MSGFUNC_TURN_OFF_TRANSLATION }, ea: function () { return MSGFUNC_TURN_OFF_FOR }, l: function () { return MSG_ALWAYS_HIDE_AUTO_POPUP_BANNER }, I: function () { return MSG_ORIGINAL_TEXT }, J: function () { return MSG_ORIGINAL_TEXT_NO_COLON },
                A: function () { return MSG_FILL_SUGGESTION }, W: function () { return MSG_SUBMIT_SUGGESTION }, S: function () { return MSG_SHOW_TRANSLATE_ALL }, R: function () { return MSG_SHOW_RESTORE_ALL }, O: function () { return MSG_SHOW_CANCEL_ALL }, ca: function () { return MSG_TRANSLATE_TO_MY_LANGUAGE }, $: function () { return MSGFUNC_TRANSLATE_EVERYTHING_TO }, P: function () { return MSG_SHOW_ORIGINAL_LANGUAGES }, H: function () { return MSG_OPTIONS }, ga: function () { return MSG_TURN_OFF_TRANSLATION_FOR_THIS_SITE }, G: function () { return MSG_MANAGE_TRANSLATION_FOR_THIS_SITE },
                j: function () { return MSG_ALT_SUGGESTION }, h: function () { return MSG_ALT_ACTIVITY_HELPER_TEXT }, i: function () { return MSG_ALT_AND_CONTRIBUTE_ACTIVITY_HELPER_TEXT }, ha: function () { return MSG_USE_ALTERNATIVES }, v: function () { return MSG_DRAG_TIP }, o: function () { return MSG_CLICK_FOR_ALT }, u: function () { return MSG_DRAG_INSTUCTIONS }, X: function () { return MSG_SUGGESTION_SUBMITTED }, C: function () { return MSG_LANGUAGE_TRANSLATE_WIDGET }
            }; for (var a in r) if (r[a] !== Object.prototype[r[a]]) try { r[a] = r[a].call(null) } catch (c) { r[a] = q }
        } else a =
            function (c) { return function () { return c } }, r = { Y: a(0), m: a(1), s: a(2), K: a(3), Z: a(4), B: a(5), D: a(45), F: a(6), L: a(7), ba: a(8), da: a(9), aa: a(10), ia: a(11), M: a(12), U: a(13), V: a(14), T: a(15), N: a(16), fa: a(17), ea: a(18), l: a(19), I: a(20), A: a(21), W: a(22), S: a(23), R: a(24), O: a(25), ca: a(26), $: a(27), P: a(28), H: a(29), ga: a(30), j: a(32), h: a(33), ha: a(34), v: a(35), o: a(36), u: a(37), X: a(38), G: a(39), i: a(40), J: a(41), C: a(46) }
    })(); var t = {}, MSG_TRANSLATE = d; t[0] = MSG_TRANSLATE; var MSG_CANCEL = "Cancel"; t[1] = MSG_CANCEL; var MSG_CLOSE = "Close"; t[2] = MSG_CLOSE; function MSGFUNC_PAGE_TRANSLATED_TO(a) { return "Google has automatically translated this page to: " + a } t[3] = MSGFUNC_PAGE_TRANSLATED_TO; function MSGFUNC_TRANSLATED_TO(a) { return "Translated to: " + a } t[4] = MSGFUNC_TRANSLATED_TO; var MSG_GENERAL_ERROR = "Error: The server could not complete your request. Try again later."; t[5] = MSG_GENERAL_ERROR; var MSG_LEARN_MORE = "Learn more"; t[6] = MSG_LEARN_MORE;
    function MSGFUNC_POWERED_BY(a) { return "Powered by " + a } t[7] = MSGFUNC_POWERED_BY; var MSG_TRANSLATE_PRODUCT_NAME = d; t[8] = MSG_TRANSLATE_PRODUCT_NAME; var MSG_TRANSLATION_IN_PROGRESS = "Translation in progress"; t[9] = MSG_TRANSLATION_IN_PROGRESS; function MSGFUNC_TRANSLATE_PAGE_TO(a) { return "Translate this page to: " + (a + " using Google Translate?") } t[10] = MSGFUNC_TRANSLATE_PAGE_TO; function MSGFUNC_VIEW_PAGE_IN(a) { return "View this page in: " + a } t[11] = MSGFUNC_VIEW_PAGE_IN; var MSG_RESTORE = "Show original"; t[12] = MSG_RESTORE;
    var MSG_SSL_INFO_LOCAL_FILE = "The content of this local file will be sent to Google for translation using a secure connection."; t[13] = MSG_SSL_INFO_LOCAL_FILE; var MSG_SSL_INFO_SECURE_PAGE = "The content of this secure page will be sent to Google for translation using a secure connection."; t[14] = MSG_SSL_INFO_SECURE_PAGE; var MSG_SSL_INFO_INTRANET_PAGE = "The content of this intranet page will be sent to Google for translation using a secure connection."; t[15] = MSG_SSL_INFO_INTRANET_PAGE;
    var MSG_SELECT_LANGUAGE = "Select Language"; t[16] = MSG_SELECT_LANGUAGE; function MSGFUNC_TURN_OFF_TRANSLATION(a) { return "Turn off " + (a + " translation") } t[17] = MSGFUNC_TURN_OFF_TRANSLATION; function MSGFUNC_TURN_OFF_FOR(a) { return "Turn off for: " + a } t[18] = MSGFUNC_TURN_OFF_FOR; var MSG_ALWAYS_HIDE_AUTO_POPUP_BANNER = "Always hide"; t[19] = MSG_ALWAYS_HIDE_AUTO_POPUP_BANNER; var MSG_ORIGINAL_TEXT = "Original text:"; t[20] = MSG_ORIGINAL_TEXT; var MSG_FILL_SUGGESTION = "Contribute a better translation"; t[21] = MSG_FILL_SUGGESTION;
    var MSG_SUBMIT_SUGGESTION = "Contribute"; t[22] = MSG_SUBMIT_SUGGESTION; var MSG_SHOW_TRANSLATE_ALL = "Translate all"; t[23] = MSG_SHOW_TRANSLATE_ALL; var MSG_SHOW_RESTORE_ALL = "Restore all"; t[24] = MSG_SHOW_RESTORE_ALL; var MSG_SHOW_CANCEL_ALL = "Cancel all"; t[25] = MSG_SHOW_CANCEL_ALL; var MSG_TRANSLATE_TO_MY_LANGUAGE = "Translate sections to my language"; t[26] = MSG_TRANSLATE_TO_MY_LANGUAGE; function MSGFUNC_TRANSLATE_EVERYTHING_TO(a) { return "Translate everything to " + a } t[27] = MSGFUNC_TRANSLATE_EVERYTHING_TO;
    var MSG_SHOW_ORIGINAL_LANGUAGES = "Show original languages"; t[28] = MSG_SHOW_ORIGINAL_LANGUAGES; var MSG_OPTIONS = "Options"; t[29] = MSG_OPTIONS; var MSG_TURN_OFF_TRANSLATION_FOR_THIS_SITE = "Turn off translation for this site"; t[30] = MSG_TURN_OFF_TRANSLATION_FOR_THIS_SITE; t[31] = null; var MSG_ALT_SUGGESTION = "Show alternative translations"; t[32] = MSG_ALT_SUGGESTION; var MSG_ALT_ACTIVITY_HELPER_TEXT = "Click on words above to get alternative translations"; t[33] = MSG_ALT_ACTIVITY_HELPER_TEXT; var MSG_USE_ALTERNATIVES = "Use";
    t[34] = MSG_USE_ALTERNATIVES; var MSG_DRAG_TIP = "Drag with shift key to reorder"; t[35] = MSG_DRAG_TIP; var MSG_CLICK_FOR_ALT = "Click for alternative translations"; t[36] = MSG_CLICK_FOR_ALT; var MSG_DRAG_INSTUCTIONS = "Hold down the shift key, click, and drag the words above to reorder."; t[37] = MSG_DRAG_INSTUCTIONS; var MSG_SUGGESTION_SUBMITTED = "Thank you for contributing your translation suggestion to Google Translate."; t[38] = MSG_SUGGESTION_SUBMITTED; var MSG_MANAGE_TRANSLATION_FOR_THIS_SITE = "Manage translation for this site";
    t[39] = MSG_MANAGE_TRANSLATION_FOR_THIS_SITE; var MSG_ALT_AND_CONTRIBUTE_ACTIVITY_HELPER_TEXT = "Click a word for alternative translations, or double-click to edit directly"; t[40] = MSG_ALT_AND_CONTRIBUTE_ACTIVITY_HELPER_TEXT; var MSG_ORIGINAL_TEXT_NO_COLON = "Original text"; t[41] = MSG_ORIGINAL_TEXT_NO_COLON; t[42] = d; t[43] = d; t[44] = "Your correction has been submitted."; var MSG_LANGUAGE_UNSUPPORTED = "Error: The language of the webpage is not supported."; t[45] = MSG_LANGUAGE_UNSUPPORTED;
    var MSG_LANGUAGE_TRANSLATE_WIDGET = "Language Translate Widget"; t[46] = MSG_LANGUAGE_TRANSLATE_WIDGET; function u(a) { if (Error.captureStackTrace) Error.captureStackTrace(this, u); else { var c = Error().stack; c && (this.stack = c) } a && (this.message = String(a)) } m(u, Error); u.prototype.name = "CustomError"; function v(a, c) { a = a.split("%s"); for (var b = "", f = a.length - 1, h = 0; h < f; h++)b += a[h] + (h < c.length ? c[h] : "%s"); u.call(this, b + a[f]) } m(v, u); v.prototype.name = "AssertionError"; function w(a, c) { throw new v("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)); }; var y; function z(a, c) { this.g = c === A ? a : "" } z.prototype.toString = function () { return this.g + "" }; var A = {}; var B = null, C = /^[\w+/_-]+[=]{0,2}$/; function D(a) { return a.querySelector ? (a = a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && C.test(a) ? a : "" : "" }; function _exportMessages() { l("google.translate.m", t) } function E(a) { var c = document.getElementsByTagName("head")[0]; c || (c = document.body.parentNode.appendChild(document.createElement("head"))); c.appendChild(a) }
    function _loadJs(a) {
        var c = document; var b = "SCRIPT"; "application/xhtml+xml" === c.contentType && (b = b.toLowerCase()); b = c.createElement(b); b.type = "text/javascript"; b.charset = "UTF-8"; if (void 0 === y) { c = null; var f = k.trustedTypes; if (f && f.createPolicy) { try { c = f.createPolicy("goog#html", { createHTML: p, createScript: p, createScriptURL: p }) } catch (x) { k.console && k.console.error(x.message) } y = c } else y = c } a = (c = y) ? c.createScriptURL(a) : a; a = new z(a, A); a: {
            try {
                var h = b && b.ownerDocument, n = h && (h.defaultView || h.parentWindow); n = n || k;
                if (n.Element && n.Location) { var g = n; break a }
            } catch (x) { } g = null
        } if (g && "undefined" != typeof g.HTMLScriptElement && (!b || !(b instanceof g.HTMLScriptElement) && (b instanceof g.Location || b instanceof g.Element))) {
            g = typeof b; if ("object" == g && null != b || "function" == g) try { var e = b.constructor.displayName || b.constructor.name || Object.prototype.toString.call(b) } catch (x) { e = "<object could not be stringified>" } else e = void 0 === b ? "undefined" : null === b ? "null" : typeof b; w("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
                "HTMLScriptElement", e)
        } a instanceof z && a.constructor === z ? e = a.g : (e = typeof a, w("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ("object" != e ? e : a ? Array.isArray(a) ? "array" : e : "null")), e = "type_error:TrustedResourceUrl"); b.src = e; (e = b.ownerDocument && b.ownerDocument.defaultView) && e != k ? e = D(e.document) : (null === B && (B = D(k.document)), e = B); e && b.setAttribute("nonce", e); E(b)
    }
    function _loadCss(a) { var c = document.createElement("link"); c.type = "text/css"; c.rel = "stylesheet"; c.charset = "UTF-8"; c.href = a; E(c) } function _isNS(a) { a = a.split("."); for (var c = window, b = 0; b < a.length; ++b)if (!(c = c[a[b]])) return !1; return !0 } function _setupNS(a) { a = a.split("."); for (var c = window, b = 0; b < a.length; ++b)c.hasOwnProperty ? c.hasOwnProperty(a[b]) ? c = c[a[b]] : c = c[a[b]] = {} : c = c[a[b]] || (c[a[b]] = {}); return c } l("_exportMessages", _exportMessages); l("_loadJs", _loadJs); l("_loadCss", _loadCss); l("_isNS", _isNS);
    l("_setupNS", _setupNS); window.addEventListener && "undefined" == typeof document.readyState && window.addEventListener("DOMContentLoaded", function () { document.readyState = "complete" }, !1);
    if (_isNS('google.translate.Element')) { return } (function () { var c = _setupNS('google.translate._const'); c._cest = gtConstEvalStartTime; gtConstEvalStartTime = undefined; c._cl = 'no'; c._cuc = 'googleTranslateElementInit'; c._cac = ''; c._cam = ''; c._ctkk = '450307.3623339527'; var h = 'translate.googleapis.com'; var s = (true ? 'https' : window.location.protocol == 'https:' ? 'https' : 'http') + '://'; var b = s + h; c._pah = h; c._pas = s; c._pbi = b + '/translate_static/img/te_bk.gif'; c._pci = b + '/translate_static/img/te_ctrl3.gif'; c._pli = b + '/translate_static/img/loading.gif'; c._plla = h + '/translate_a/l'; c._pmi = b + '/translate_static/img/mini_google.png'; c._ps = b + '/translate_static/css/translateelement.css'; c._puh = 'translate.google.com'; _loadCss(c._ps); _loadJs(b + '/translate_static/js/element/main_no.js'); })();
})();