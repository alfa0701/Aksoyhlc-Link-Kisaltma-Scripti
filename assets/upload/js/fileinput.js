/*!
 * bootstrap-fileinput v5.0.2
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2019, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(window.jQuery)
}(function(e) {
    "use strict";
    var t, i;
    e.fn.fileinputLocales = {}, e.fn.fileinputThemes = {}, String.prototype.setTokens = function(e) {
        var t, i, a = this.toString();
        for (t in e) e.hasOwnProperty(t) && (i = new RegExp("{" + t + "}", "g"), a = a.replace(i, e[t]));
        return a
    }, t = {
        FRAMES: ".kv-preview-thumb",
        SORT_CSS: "file-sortable",
        OBJECT_PARAMS: '<param name="controller" value="true" />\n<param name="allowFullScreen" value="true" />\n<param name="allowScriptAccess" value="always" />\n<param name="autoPlay" value="false" />\n<param name="autoStart" value="false" />\n<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n<span class="{previewFileIconClass}">{previewFileIcon}</span>\n</div>',
        MODAL_ID: "kvFileinputModal",
        MODAL_EVENTS: ["show", "shown", "hide", "hidden", "loaded"],
        objUrl: window.URL || window.webkitURL,
        now: function() {
            return new Date
        },
        round: function(e) {
            return e = parseFloat(e), isNaN(e) ? 0 : Math.floor(Math.round(e))
        },
        getFileRelativePath: function(e) {
            return String(e.relativePath || e.webkitRelativePath || t.getFileName(e) || null)
        },
        getFileId: function(e, i) {
            var a = t.getFileRelativePath(e);
            return "function" == typeof i ? i(e) : e && a ? e.size + "_" + a.replace(/\s/gim, "_") : null
        },
        getElapsed: function(t) {
            var i = t,
                a = "",
                r = {},
                n = {
                    year: 31536e3,
                    month: 2592e3,
                    week: 604800,
                    day: 86400,
                    hour: 3600,
                    minute: 60,
                    second: 1
                };
            return Object.keys(n).forEach(function(e) {
                r[e] = Math.floor(i / n[e]), i -= r[e] * n[e]
            }), e.each(r, function(e, t) {
                t > 0 && (a += (a ? " " : "") + t + e.substring(0, 1))
            }), a
        },
        debounce: function(e, t) {
            var i;
            return function() {
                var a = arguments,
                    r = this;
                clearTimeout(i), i = setTimeout(function() {
                    e.apply(r, a)
                }, t)
            }
        },
        stopEvent: function(e) {
            e.stopPropagation(), e.preventDefault()
        },
        getFileName: function(e) {
            return e && (e.fileName || e.name) || ""
        },
        createObjectURL: function(e) {
            return t.objUrl && t.objUrl.createObjectURL && e ? t.objUrl.createObjectURL(e) : ""
        },
        revokeObjectURL: function(e) {
            t.objUrl && t.objUrl.revokeObjectURL && e && t.objUrl.revokeObjectURL(e)
        },
        compare: function(e, t, i) {
            return void 0 !== e && (i ? e === t : e.match(t))
        },
        isIE: function(e) {
            var t, i;
            return "Microsoft Internet Explorer" === navigator.appName && (10 === e ? new RegExp("msie\\s" + e, "i").test(navigator.userAgent) : ((t = document.createElement("div")).innerHTML = "\x3c!--[if IE " + e + "]> <i></i> <![endif]--\x3e", i = t.getElementsByTagName("i").length, document.body.appendChild(t), t.parentNode.removeChild(t), i))
        },
        canAssignFilesToInput: function() {
            var e = document.createElement("input");
            try {
                return e.type = "file", e.files = null, !0
            } catch (e) {
                return !1
            }
        },
        getDragDropFolders: function(e) {
            var t, i, a = e ? e.length : 0,
                r = 0;
            if (a > 0 && e[0].webkitGetAsEntry())
                for (t = 0; t < a; t++)(i = e[t].webkitGetAsEntry()) && i.isDirectory && r++;
            return r
        },
        initModal: function(t) {
            var i = e("body");
            i.length && t.appendTo(i)
        },
        isEmpty: function(t, i) {
            return null == t || 0 === t.length || i && "" === e.trim(t)
        },
        isArray: function(e) {
            return Array.isArray(e) || "[object Array]" === Object.prototype.toString.call(e)
        },
        ifSet: function(e, t, i) {
            return i = i || "", t && "object" == typeof t && e in t ? t[e] : i
        },
        cleanArray: function(e) {
            return e instanceof Array || (e = []), e.filter(function(e) {
                return null != e
            })
        },
        spliceArray: function(t, i, a) {
            var r, n, s = 0,
                o = [];
            if (!(t instanceof Array)) return [];
            for (n = e.extend(!0, [], t), a && n.reverse(), r = 0; r < n.length; r++) r !== i && (o[s] = n[r], s++);
            return a && o.reverse(), o
        },
        getNum: function(e, t) {
            return t = t || 0, "number" == typeof e ? e : ("string" == typeof e && (e = parseFloat(e)), isNaN(e) ? t : e)
        },
        hasFileAPISupport: function() {
            return !(!window.File || !window.FileReader)
        },
        hasDragDropSupport: function() {
            var e = document.createElement("div");
            return !t.isIE(9) && (void 0 !== e.draggable || void 0 !== e.ondragstart && void 0 !== e.ondrop)
        },
        hasFileUploadSupport: function() {
            return t.hasFileAPISupport() && window.FormData
        },
        hasBlobSupport: function() {
            try {
                return !!window.Blob && Boolean(new Blob)
            } catch (e) {
                return !1
            }
        },
        hasArrayBufferViewSupport: function() {
            try {
                return 100 === new Blob([new Uint8Array(100)]).size
            } catch (e) {
                return !1
            }
        },
        hasResumableUploadSupport: function() {
            return t.hasFileUploadSupport() && t.hasBlobSupport() && t.hasArrayBufferViewSupport() && (!!Blob.prototype.webkitSlice || !!Blob.prototype.mozSlice || !!Blob.prototype.slice || !1)
        },
        dataURI2Blob: function(e) {
            var i, a, r, n, s, o, l = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                d = t.hasBlobSupport();
            if (!((d || l) && window.atob && window.ArrayBuffer && window.Uint8Array)) return null;
            for (i = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : decodeURIComponent(e.split(",")[1]), a = new ArrayBuffer(i.length), r = new Uint8Array(a), n = 0; n < i.length; n += 1) r[n] = i.charCodeAt(n);
            return s = e.split(",")[0].split(":")[1].split(";")[0], d ? new Blob([t.hasArrayBufferViewSupport() ? r : a], {
                type: s
            }) : ((o = new l).append(a), o.getBlob(s))
        },
        arrayBuffer2String: function(e) {
            if (window.TextDecoder) return new TextDecoder("utf-8").decode(e);
            var t, i, a, r, n = Array.prototype.slice.apply(new Uint8Array(e)),
                s = "",
                o = 0;
            for (t = n.length; o < t;) switch ((i = n[o++]) >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    s += String.fromCharCode(i);
                    break;
                case 12:
                case 13:
                    a = n[o++], s += String.fromCharCode((31 & i) << 6 | 63 & a);
                    break;
                case 14:
                    a = n[o++], r = n[o++], s += String.fromCharCode((15 & i) << 12 | (63 & a) << 6 | (63 & r) << 0)
            }
            return s
        },
        isHtml: function(e) {
            var t = document.createElement("div");
            t.innerHTML = e;
            for (var i = t.childNodes, a = i.length; a--;)
                if (1 === i[a].nodeType) return !0;
            return !1
        },
        isSvg: function(e) {
            return e.match(/^\s*<\?xml/i) && (e.match(/<!DOCTYPE svg/i) || e.match(/<svg/i))
        },
        getMimeType: function(e, t, i) {
            switch (e) {
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                    return "image/jpeg";
                case "89504E47":
                    return "image/png";
                case "47494638":
                    return "image/gif";
                case "49492a00":
                    return "image/tiff";
                case "52494646":
                    return "image/webp";
                case "66747970":
                    return "video/3gp";
                case "4f676753":
                    return "video/ogg";
                case "1a45dfa3":
                    return "video/mkv";
                case "000001ba":
                case "000001b3":
                    return "video/mpeg";
                case "3026b275":
                    return "video/wmv";
                case "25504446":
                    return "application/pdf";
                case "25215053":
                    return "application/ps";
                case "504b0304":
                case "504b0506":
                case "504b0508":
                    return "application/zip";
                case "377abcaf":
                    return "application/7z";
                case "75737461":
                    return "application/tar";
                case "7801730d":
                    return "application/dmg";
                default:
                    switch (e.substring(0, 6)) {
                        case "435753":
                            return "application/x-shockwave-flash";
                        case "494433":
                            return "audio/mp3";
                        case "425a68":
                            return "application/bzip";
                        default:
                            switch (e.substring(0, 4)) {
                                case "424d":
                                    return "image/bmp";
                                case "fffb":
                                    return "audio/mp3";
                                case "4d5a":
                                    return "application/exe";
                                case "1f9d":
                                case "1fa0":
                                    return "application/zip";
                                case "1f8b":
                                    return "application/gzip";
                                default:
                                    return t && !t.match(/[^\u0000-\u007f]/) ? "application/text-plain" : i
                            }
                    }
            }
        },
        addCss: function(e, t) {
            e.removeClass(t).addClass(t)
        },
        getElement: function(i, a, r) {
            return t.isEmpty(i) || t.isEmpty(i[a]) ? r : e(i[a])
        },
        uniqId: function() {
            return Math.round((new Date).getTime()) + "_" + Math.round(100 * Math.random())
        },
        htmlEncode: function(e, t) {
            return void 0 === e ? t || null : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
        },
        replaceTags: function(t, i) {
            var a = t;
            return i ? (e.each(i, function(e, t) {
                "function" == typeof t && (t = t()), a = a.split(e).join(t)
            }), a) : a
        },
        cleanMemory: function(e) {
            var i = e.is("img") ? e.attr("src") : e.find("source").attr("src");
            t.revokeObjectURL(i)
        },
        findFileName: function(e) {
            var t = e.lastIndexOf("/");
            return -1 === t && (t = e.lastIndexOf("\\")), e.split(e.substring(t, t + 1)).pop()
        },
        checkFullScreen: function() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        },
        toggleFullScreen: function(e) {
            var i = document,
                a = i.documentElement;
            a && e && !t.checkFullScreen() ? a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : i.exitFullscreen ? i.exitFullscreen() : i.msExitFullscreen ? i.msExitFullscreen() : i.mozCancelFullScreen ? i.mozCancelFullScreen() : i.webkitExitFullscreen && i.webkitExitFullscreen()
        },
        moveArray: function(t, i, a, r) {
            var n = e.extend(!0, [], t);
            if (r && n.reverse(), a >= n.length)
                for (var s = a - n.length; 1 + s--;) n.push(void 0);
            return n.splice(a, 0, n.splice(i, 1)[0]), r && n.reverse(), n
        },
        cleanZoomCache: function(e) {
            var t = e.closest(".kv-zoom-cache-theme");
            t.length || (t = e.closest(".kv-zoom-cache")), t.remove()
        },
        closeButton: function(e) {
            return '<button type="button" class="' + (e = e ? "close " + e : "close") + '" aria-label="Close">\n  <span aria-hidden="true">&times;</span>\n</button>'
        },
        getRotation: function(e) {
            switch (e) {
                case 2:
                    return "rotateY(180deg)";
                case 3:
                    return "rotate(180deg)";
                case 4:
                    return "rotate(180deg) rotateY(180deg)";
                case 5:
                    return "rotate(270deg) rotateY(180deg)";
                case 6:
                    return "rotate(90deg)";
                case 7:
                    return "rotate(90deg) rotateY(180deg)";
                case 8:
                    return "rotate(270deg)";
                default:
                    return ""
            }
        },
        setTransform: function(e, t) {
            e && (e.style.transform = t, e.style.webkitTransform = t, e.style["-moz-transform"] = t, e.style["-ms-transform"] = t, e.style["-o-transform"] = t)
        },
        setImageOrientation: function(e, i, a) {
            if (e && e.length) {
                var r = "load.fileinputimageorient";
                e.off(r).on(r, function() {
                    var r = e.get(0),
                        n = i && i.length ? i.get(0) : null,
                        s = r.offsetHeight,
                        o = r.offsetWidth,
                        l = t.getRotation(a);
                    if (e.data("orientation", a), n && i.data("orientation", a), a < 5) return t.setTransform(r, l), void t.setTransform(n, l);
                    var d = Math.atan(o / s),
                        c = Math.sqrt(Math.pow(s, 2) + Math.pow(o, 2)),
                        u = c ? s / Math.cos(Math.PI / 2 + d) / c : 1,
                        p = " scale(" + Math.abs(u) + ")";
                    t.setTransform(r, l + p), t.setTransform(n, l + p)
                })
            }
        }
    }, (i = function(i, a) {
        this.$element = e(i), this.$parent = this.$element.parent(), this._validate() && (this.isPreviewable = t.hasFileAPISupport(), this.isIE9 = t.isIE(9), this.isIE10 = t.isIE(10), (this.isPreviewable || this.isIE9) && (this._init(a), this._listen()), this.$element.removeClass("file-loading"))
    }).prototype = {
        constructor: i,
        _cleanup: function() {
            this.reader = null, this.clearFileStack(), this.fileBatchCompleted = !0, this.isError = !1, this.cancelling = !1, this.paused = !1, this.lastProgress = 0, this._initAjax()
        },
        _initAjax: function() {
            this.ajaxQueue = [], this.ajaxRequests = [], this.ajaxQueueIntervalId = null, this.ajaxCurrentThreads = 0, this.ajaxAborted = !1
        },
        _init: function(i, a) {
            var r, n, s, o, l = this,
                d = l.$element;
            l.options = i, e.each(i, function(e, i) {
                switch (e) {
                    case "minFileCount":
                    case "maxFileCount":
                    case "minFileSize":
                    case "maxFileSize":
                    case "maxFilePreviewSize":
                    case "resizeImageQuality":
                    case "resizeIfSizeMoreThan":
                    case "progressUploadThreshold":
                    case "initialPreviewCount":
                    case "zoomModalHeight":
                    case "minImageHeight":
                    case "maxImageHeight":
                    case "minImageWidth":
                    case "maxImageWidth":
                        l[e] = t.getNum(i);
                        break;
                    default:
                        l[e] = i
                }
            }), l.rtl && (o = l.previewZoomButtonIcons.prev, l.previewZoomButtonIcons.prev = l.previewZoomButtonIcons.next, l.previewZoomButtonIcons.next = o), !isNaN(l.maxAjaxThreads) && l.maxAjaxThreads < l.resumableUploadOptions.maxThreads && (l.resumableUploadOptions.maxThreads = l.maxAjaxThreads), l._initFileManager(), "function" == typeof l.autoOrientImage && (l.autoOrientImage = l.autoOrientImage()), "function" == typeof l.autoOrientImageInitial && (l.autoOrientImageInitial = l.autoOrientImageInitial()), a || l._cleanup(), l.$form = d.closest("form"), l._initTemplateDefaults(), l.uploadFileAttr = t.isEmpty(d.attr("name")) ? "file_data" : d.attr("name"), s = l._getLayoutTemplate("progress"), l.progressTemplate = s.replace("{class}", l.progressClass), l.progressInfoTemplate = s.replace("{class}", l.progressInfoClass), l.progressPauseTemplate = s.replace("{class}", l.progressPauseClass), l.progressCompleteTemplate = s.replace("{class}", l.progressCompleteClass), l.progressErrorTemplate = s.replace("{class}", l.progressErrorClass), l.isDisabled = d.attr("disabled") || d.attr("readonly"), l.isDisabled && d.attr("disabled", !0), l.isClickable = l.browseOnZoneClick && l.showPreview && (l.dropZoneEnabled || !t.isEmpty(l.defaultPreviewContent)), l.isAjaxUpload = t.hasFileUploadSupport() && !t.isEmpty(l.uploadUrl), l.dropZoneEnabled = t.hasDragDropSupport() && l.dropZoneEnabled, l.isAjaxUpload || (l.dropZoneEnabled = l.dropZoneEnabled && t.canAssignFilesToInput()), l.slug = "function" == typeof i.slugCallback ? i.slugCallback : l._slugDefault, l.mainTemplate = l.showCaption ? l._getLayoutTemplate("main1") : l._getLayoutTemplate("main2"), l.captionTemplate = l._getLayoutTemplate("caption"), l.previewGenericTemplate = l._getPreviewTemplate("generic"), !l.imageCanvas && l.resizeImage && (l.maxImageWidth || l.maxImageHeight) && (l.imageCanvas = document.createElement("canvas"), l.imageCanvasContext = l.imageCanvas.getContext("2d")), t.isEmpty(d.attr("id")) && d.attr("id", t.uniqId()), l.namespace = ".fileinput_" + d.attr("id").replace(/-/g, "_"), void 0 === l.$container ? l.$container = l._createContainer() : l._refreshContainer(), n = l.$container, l.$dropZone = n.find(".file-drop-zone"), l.$progress = n.find(".kv-upload-progress"), l.$btnUpload = n.find(".fileinput-upload"), l.$captionContainer = t.getElement(i, "elCaptionContainer", n.find(".file-caption")), l.$caption = t.getElement(i, "elCaptionText", n.find(".file-caption-name")), t.isEmpty(l.msgPlaceholder) || (r = d.attr("multiple") ? l.filePlural : l.fileSingle, l.$caption.attr("placeholder", l.msgPlaceholder.replace("{files}", r))), l.$captionIcon = l.$captionContainer.find(".file-caption-icon"), l.$previewContainer = t.getElement(i, "elPreviewContainer", n.find(".file-preview")), l.$preview = t.getElement(i, "elPreviewImage", n.find(".file-preview-thumbnails")), l.$previewStatus = t.getElement(i, "elPreviewStatus", n.find(".file-preview-status")), l.$errorContainer = t.getElement(i, "elErrorContainer", l.$previewContainer.find(".kv-fileinput-error")), l._validateDisabled(), t.isEmpty(l.msgErrorClass) || t.addCss(l.$errorContainer, l.msgErrorClass), a ? l._errorsExist() || l.$errorContainer.hide() : (l.$errorContainer.hide(), l.previewInitId = "preview-" + t.uniqId(), l._initPreviewCache(), l._initPreview(!0), l._initPreviewActions(), l.$parent.hasClass("file-loading") && (l.$container.insertBefore(l.$parent), l.$parent.remove())), l._setFileDropZoneTitle(), d.attr("disabled") && l.disable(), l._initZoom(), l.hideThumbnailContent && t.addCss(l.$preview, "hide-content")
        },
        _initFileManager: function() {
            var i = this;
            i.fileManager = {
                stack: {},
                processed: [],
                loadedImages: {},
                totalImages: 0,
                totalFiles: null,
                totalSize: null,
                uploadedSize: 0,
                stats: {},
                initStats: function(e) {
                    var a = {
                        started: t.now().getTime()
                    };
                    e ? i.fileManager.stats[e] = a : i.fileManager.stats = a
                },
                getUploadStats: function(e, a, r) {
                    var n = i.fileManager,
                        s = e && n.stats[e] && n.stats[e].started || null;
                    s || (s = t.now().getTime());
                    var o = (t.now().getTime() - s) / 1e3,
                        l = o ? a / o : 0,
                        d = {
                            fileId: e,
                            started: s,
                            elapsed: o,
                            loaded: a,
                            total: r,
                            bps: l,
                            bitrate: i._getSize(l, ["B/s", "KB/s", "MB/s", "GB/s", "TB/s", "PB/s", "EB/s", "ZB/s", "YB/s"]),
                            pendingBytes: r - a
                        };
                    return e ? n.stats[e] = d : n.stats = d, d
                },
                exists: function(t) {
                    return -1 !== e.inArray(t, i.fileManager.getIdList())
                },
                count: function() {
                    return i.fileManager.getIdList().length
                },
                total: function() {
                    var e = i.fileManager;
                    return e.totalFiles || (e.totalFiles = e.count()), e.totalFiles
                },
                getTotalSize: function() {
                    var t = i.fileManager;
                    return t.totalSize ? t.totalSize : (t.totalSize = 0, e.each(i.fileManager.stack, function(e, i) {
                        var a = parseFloat(i.size);
                        t.totalSize += isNaN(a) ? 0 : a
                    }), t.totalSize)
                },
                add: function(e, a) {
                    a || (a = i.fileManager.getId(e)), a && (i.fileManager.stack[a] = {
                        file: e,
                        name: t.getFileName(e),
                        relativePath: t.getFileRelativePath(e),
                        size: e.size,
                        nameFmt: i._getFileName(e, ""),
                        sizeFmt: i._getSize(e.size)
                    })
                },
                remove: function(e) {
                    var t = e.attr("data-fileid");
                    t && i.fileManager.removeFile(t)
                },
                removeFile: function(e) {
                    delete i.fileManager.stack[e], delete i.fileManager.loadedImages[e]
                },
                move: function(t, a) {
                    var r = {},
                        n = i.fileManager.stack;
                    (t || a) && t !== a && (e.each(n, function(e, i) {
                        e !== t && (r[e] = i), e === a && (r[t] = n[t])
                    }), i.fileManager.stack = r)
                },
                list: function() {
                    var t = [];
                    return e.each(i.fileManager.stack, function(e, i) {
                        i && i.file && t.push(i.file)
                    }), t
                },
                isPending: function(t) {
                    return -1 === e.inArray(t, i.fileManager.processed) && i.fileManager.exists(t)
                },
                isProcessed: function() {
                    var t = !0,
                        a = i.fileManager;
                    return e.each(a.stack, function(e) {
                        a.isPending(e) && (t = !1)
                    }), t
                },
                clear: function() {
                    var e = i.fileManager;
                    e.totalFiles = null, e.totalSize = null, e.uploadedSize = 0, e.stack = {}, e.processed = [], e.stats = {}, e.clearImages()
                },
                clearImages: function() {
                    i.fileManager.loadedImages = {}, i.fileManager.totalImages = 0
                },
                addImage: function(e, t) {
                    i.fileManager.loadedImages[e] = t
                },
                removeImage: function(e) {
                    delete i.fileManager.loadedImages[e]
                },
                getImageIdList: function() {
                    return Object.keys(i.fileManager.loadedImages)
                },
                getImageCount: function() {
                    return i.fileManager.getImageIdList().length
                },
                getId: function(e) {
                    return i._getFileId(e)
                },
                getIndex: function(e) {
                    return i.fileManager.getIdList().indexOf(e)
                },
                getThumb: function(t) {
                    var a = null;
                    return i._getThumbs().each(function() {
                        e(this).attr("data-fileid") === t && (a = e(this))
                    }), a
                },
                getThumbIndex: function(e) {
                    var t = e.attr("data-fileid");
                    return i.fileManager.getIndex(t)
                },
                getIdList: function() {
                    return Object.keys(i.fileManager.stack)
                },
                getFile: function(e) {
                    return i.fileManager.stack[e] || null
                },
                getFileName: function(e, t) {
                    var a = i.fileManager.getFile(e);
                    return a ? t ? a.nameFmt || "" : a.name || "" : ""
                },
                getFirstFile: function() {
                    var e = i.fileManager.getIdList(),
                        t = e && e.length ? e[0] : null;
                    return i.fileManager.getFile(t)
                },
                setFile: function(e, t) {
                    i.fileManager.getFile(e) ? i.fileManager.stack[e].file = t : i.fileManager.add(t, e)
                },
                setProcessed: function(e) {
                    i.fileManager.processed.push(e)
                },
                getProgress: function() {
                    var e = i.fileManager.total(),
                        t = i.fileManager.processed.length;
                    return e ? Math.ceil(t / e * 100) : 0
                },
                setProgress: function(e, t) {
                    var a = i.fileManager.getFile(e);
                    !isNaN(t) && a && (a.progress = t)
                }
            }
        },
        _setUploadData: function(i, a) {
            var r = this;
            e.each(a, function(e, a) {
                var n = r.uploadParamNames[e] || e;
                t.isArray(a) ? i.append(n, a[0], a[1]) : i.append(n, a)
            })
        },
        _initResumableUpload: function() {
            var i = this,
                a = i.resumableUploadOptions;
            if (i.enableResumableUpload)
                if (!1 !== a.fallback && "function" != typeof a.fallback && (a.fallback = function(e) {
                        e._log("The browser does not support resumable or chunk uploads."), e.enableResumableUpload = !1
                    }), t.hasResumableUploadSupport() || !1 === a.fallback) {
                    if (!i.uploadUrl && i.enableResumableUpload) return i._log('The "uploadUrl" is not set. Ajax uploads and resumable uploads have been disabled.'), void(i.enableResumableUpload = !1);
                    if (a.chunkSize = parseFloat(a.chunkSize), a.chunkSize <= 0 || isNaN(a.chunkSize)) return i._log('Invalid "uploadResumableSize" (' + a.chunkSize + "). Resumable uploads are disabled."), void(i.enableResumableUpload = !1);
                    i.resumableManager = {
                        init: function(e, t, a) {
                            var r = i.resumableManager,
                                n = i.fileManager;
                            r.currThreads = 0, r.logs = [], r.stack = [], r.error = "", r.chunkIntervalId = null, r.id = e, r.file = t.file, r.fileName = t.name, r.fileIndex = a, r.completed = !1, r.testing = !1, r.lastProgress = 0, i.showPreview && (r.$thumb = n.getThumb(e) || null, r.$progress = r.$btnUpload = r.$btnDelete = null, r.$thumb && r.$thumb.length && (r.$progress = r.$thumb.find(".file-thumb-progress"), r.$btnUpload = r.$thumb.find(".kv-file-upload"), r.$btnDelete = r.$thumb.find(".kv-file-remove"))), r.chunkSize = 1024 * i.resumableUploadOptions.chunkSize, r.chunkCount = r.getTotalChunks()
                        },
                        logAjaxError: function(e, t, a) {
                            i.resumableUploadOptions.showErrorLog && i._log(e.status + ": " + a + ". Error Details: " + e.responseText || "")
                        },
                        reset: function() {
                            i.resumableManager.processed = {}
                        },
                        setProcessed: function(e) {
                            var t, a = i.resumableManager,
                                r = i.fileManager,
                                n = a.id,
                                s = a.$btnUpload,
                                o = a.$thumb,
                                l = a.$progress,
                                d = {
                                    id: o.attr("id"),
                                    index: r.getIndex(n),
                                    fileId: n
                                };
                            a.completed = !0, a.lastProgress = 0, r.uploadedSize += a.file.size, o.removeClass("file-uploading"), "success" === e ? (i.showPreview && (i._setProgress(101, l), i._setThumbStatus(o, "Success"), i._initUploadSuccess(a.processed[n].data, o), s.hide()), i.fileManager.removeFile(n), delete a.processed[n], i._raise("fileuploaded", [d.id, d.index, d.fileId]), r.isProcessed() && i._setProgress(101)) : (i.showPreview && (i._setThumbStatus(o, "Error"), i._setPreviewError(o, !0), i.retryErrorUploads ? s.removeAttr("disabled") : s.hide(), i._setProgress(101, l, i.msgUploadError), i._setProgress(101, i.$progress, i.msgUploadError), i.cancelling = !0), i.$errorContainer.find('li[data-file-id="' + d.fileId + '"]').length || (t = i.msgResumableUploadRetriesExceeded.setTokens({
                                file: a.fileName,
                                max: i.resumableUploadOptions.maxRetries,
                                error: a.error
                            }), i._showUploadError(t, d))), r.isProcessed() && a.reset()
                        },
                        check: function() {
                            var t = i.resumableManager,
                                a = !0;
                            e.each(t.logs, function(e, t) {
                                if (!t) return a = !1, !1
                            }), a && (clearInterval(t.chunkIntervalId), t.setProcessed("success"))
                        },
                        processedResumables: function() {
                            var e, t = i.resumableManager.logs,
                                a = 0;
                            if (!t || !t.length) return 0;
                            for (e = 0; e < t.length; e++) !0 === t[e] && a++;
                            return a
                        },
                        getUploadedSize: function() {
                            var e = i.resumableManager,
                                t = e.processedResumables() * e.chunkSize;
                            return t > e.file.size ? e.file.size : t
                        },
                        getTotalChunks: function() {
                            var e = i.resumableManager,
                                t = parseFloat(e.chunkSize);
                            return !isNaN(t) && t > 0 ? Math.ceil(e.file.size / t) : 0
                        },
                        getProgress: function() {
                            var e = i.resumableManager,
                                t = e.processedResumables(),
                                a = e.chunkCount;
                            return 0 === a ? 0 : Math.ceil(t / a * 100)
                        },
                        checkAborted: function(e) {
                            (i.paused || i.cancelling) && (clearInterval(e), i.unlock())
                        },
                        uploadSingle: function(e) {
                            var t, a = i.resumableManager,
                                r = i.fileManager,
                                n = "new";
                            t = setInterval(function() {
                                a.checkAborted(t), "new" === n && (i.lock(), n = "processing", r.stack[e] && (a.init(e, r.stack[e]), a.uploadResumable())), (!r.isPending(e) && a.completed || r.isProcessed()) && (clearInterval(t), i.unlock())
                            }, i.processDelay)
                        },
                        upload: function() {
                            var e, a = i.resumableManager,
                                r = i.fileManager,
                                n = r.getIdList(),
                                s = "new";
                            e = setInterval(function() {
                                var o;
                                if (a.checkAborted(e), "new" === s && (i.lock(), s = "processing", o = n.shift(), r.initStats(o), r.stack[o] && (a.init(o, r.stack[o], r.getIndex(o)), a.testUpload(), a.uploadResumable())), !r.isPending(o) && a.completed && (s = "new"), r.isProcessed()) {
                                    var l = i.$preview.find(".file-preview-initial");
                                    l.length && (t.addCss(l, t.SORT_CSS), i._initSortable()), clearInterval(e), i._clearFileInput(), i.unlock(), setTimeout(function() {
                                        var e = i.previewCache.data;
                                        e && (i.initialPreview = e.content, i.initialPreviewConfig = e.config, i.initialPreviewThumbTags = e.tags), i._raise("filebatchuploadcomplete", [i.initialPreview, i.initialPreviewConfig, i.initialPreviewThumbTags, i._getExtraData()])
                                    }, i.processDelay)
                                }
                            }, i.processDelay)
                        },
                        uploadResumable: function() {
                            var e, t = i.resumableManager,
                                a = t.chunkCount;
                            for (e = 0; e < a; e++) t.logs[e] = !(!t.processed[t.id] || !t.processed[t.id][e]);
                            for (e = 0; e < a; e++) t.pushAjax(e, 0);
                            t.chunkIntervalId = setInterval(t.loopAjax, i.queueDelay)
                        },
                        testUpload: function() {
                            var a, r, n, s, o, l, d, c = i.resumableManager,
                                u = i.resumableUploadOptions,
                                p = i.fileManager,
                                h = c.id;
                            u.testUrl ? (c.testing = !0, a = new FormData, r = p.stack[h], i._setUploadData(a, {
                                fileId: h,
                                fileName: r.fileName,
                                fileSize: r.size,
                                fileRelativePath: r.relativePath,
                                chunkSize: c.chunkSize,
                                chunkCount: c.chunkCount
                            }), n = function(e) {
                                d = i._getOutData(a, e), i._raise("filetestbeforesend", [h, p, c, d])
                            }, s = function(r, n, s) {
                                d = i._getOutData(a, s, r);
                                var o = i.uploadParamNames.chunksUploaded || "chunksUploaded",
                                    l = [h, p, c, d];
                                r[o] && t.isArray(r[o]) ? (c.processed[h] || (c.processed[h] = {}), e.each(r[o], function(e, t) {
                                    c.logs[t] = !0, c.processed[h][t] = !0
                                }), c.processed[h].data = r, i._raise("filetestsuccess", l)) : i._raise("filetesterror", l), c.testing = !1
                            }, o = function(e, t, r) {
                                d = i._getOutData(a, e), i._raise("filetestajaxerror", [h, p, c, d]), c.logAjaxError(e, t, r), c.testing = !1
                            }, l = function() {
                                i._raise("filetestcomplete", [h, p, c, i._getOutData(a)]), c.testing = !1
                            }, i._ajaxSubmit(n, s, l, o, a, h, c.fileIndex, u.testUrl)) : c.testing = !1
                        },
                        pushAjax: function(e, t) {
                            i.resumableManager.stack.push([e, t])
                        },
                        sendAjax: function(e, a) {
                            var r, n = i.fileManager,
                                s = i.resumableManager,
                                o = i.resumableUploadOptions,
                                l = s.chunkSize,
                                d = s.id,
                                c = s.file,
                                u = s.$thumb,
                                p = s.$btnUpload,
                                h = s.$btnDelete;
                            if (!s.processed[d] || !s.processed[d][e])
                                if (s.currThreads++, a > o.maxRetries) s.setProcessed("error");
                                else {
                                    var f, m, g, v, w, b, _ = c[c.slice ? "slice" : c.mozSlice ? "mozSlice" : c.webkitSlice ? "webkitSlice" : "slice"](l * e, l * (e + 1));
                                    f = new FormData, r = n.stack[d], i._setUploadData(f, {
                                        fileId: d,
                                        fileName: s.fileName,
                                        fileSize: c.size,
                                        fileRelativePath: r.relativePath,
                                        fileBlob: [_, s.fileName],
                                        chunkIndex: e,
                                        chunkSize: l,
                                        chunkSizeStart: l * e,
                                        chunkCount: s.chunkCount,
                                        retryCount: a
                                    }), s.$progress.show(), g = function(r) {
                                        m = i._getOutData(f, r), i.showPreview && (u.hasClass("file-preview-success") || (i._setThumbStatus(u, "Loading"), t.addCss(u, "file-uploading")), p.attr("disabled", !0), h.attr("disabled", !0)), i._raise("filechunkbeforesend", [d, e, a, n, s, m])
                                    }, v = function(t, r, o) {
                                        m = i._getOutData(f, o, t);
                                        var l = i.uploadParamNames.chunkIndex || "chunkIndex",
                                            c = i.resumableUploadOptions,
                                            u = [d, e, a, n, s, m];
                                        s.currThreads--, t.error ? (c.showErrorLog && i._log("Retry # " + a + "1 for " + s.fileName + " chunk # " + e), s.pushAjax(e, a + 1), s.error = t.error, i._raise("filechunkerror", u)) : (s.logs[t[l]] = !0, s.processed[d] || (s.processed[d] = {}), s.processed[d][t[l]] = !0, s.processed[d].data = t, s.check(), i._raise("filechunksuccess", u))
                                    }, w = function(t, r, o) {
                                        m = i._getOutData(f, t), s.currThreads--, s.error = o, s.logAjaxError(t, r, o), i._raise("filechunkajaxerror", [d, e, a, n, s, m]), s.pushAjax(e, a + 1)
                                    }, b = function() {
                                        i._raise("filechunkcomplete", [d, e, a, n, s, i._getOutData(f)])
                                    }, i._ajaxSubmit(g, v, b, w, f, d, s.fileIndex)
                                }
                        },
                        loopAjax: function() {
                            var e = i.resumableManager;
                            if (e.currThreads < i.resumableUploadOptions.maxThreads && !e.testing) {
                                var t, a = e.stack.shift();
                                void 0 !== a && (t = a[0], e.processed[e.id] && e.processed[e.id][t] ? e.processedResumables() >= e.getTotalChunks() && (e.setProcessed("success"), clearInterval(e.chunkIntervalId)) : e.sendAjax(t, a[1]))
                            }
                        }
                    }, i.resumableManager.reset()
                } else a.fallback(i)
        },
        _initTemplateDefaults: function() {
            var i, a, r, n, s, o, l, d, c, u = this;
            i = t.closeButton("fileinput-remove"), a = '<div id="' + t.MODAL_ID + '" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="' + t.MODAL_ID + 'Label"></div>', r = '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-fileid="{fileid}" data-template="{template}"', n = '<video class="kv-preview-data file-preview-video" controls {style}>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</video>\n", s = '\x3c!--suppress ALL --\x3e<audio class="kv-preview-data file-preview-audio" controls {style}>\n<source src="{data}" type="{type}">\n' + t.DEFAULT_PREVIEW + "\n</audio>\n", l = '<embed class="kv-preview-data file-preview-pdf" src="{data}" type="application/pdf" {style}>\n', o = '<object class="kv-preview-data file-preview-object file-object {typeCss}" data="{data}" type="{type}" {style}>\n<param name="movie" value="{caption}" />\n' + t.OBJECT_PARAMS + " " + t.DEFAULT_PREVIEW + "\n</object>\n", d = '<div class="kv-preview-data file-preview-other-frame" {style}>\n' + t.DEFAULT_PREVIEW + "\n</div>\n", c = {
                width: "100%",
                height: "100%",
                "min-height": "480px"
            }, u._isPdfRendered() && (l = u.pdfRendererTemplate.replace("{renderer}", u._encodeURI(u.pdfRendererUrl))), u.defaults = {
                layoutTemplates: {
                    main1: '{preview}\n<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n<div class="input-group {class}">\n  {caption}\n<div class="input-group-btn input-group-append">\n      {remove}\n      {cancel}\n      {pause}\n      {upload}\n      {browse}\n    </div>\n</div>',
                    main2: '{preview}\n<div class="kv-upload-progress kv-hidden"></div>\n<div class="clearfix"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
                    preview: '<div class="file-preview {class}">\n    {close}    <div class="{dropClass}">\n    <div class="file-preview-thumbnails">\n    </div>\n    <div class="clearfix"></div>    <div class="file-preview-status text-center text-success"></div>\n    <div class="kv-fileinput-error"></div>\n    </div>\n</div>',
                    close: i,
                    fileIcon: '<i class="glyphicon glyphicon-file"></i>',
                    caption: '<div class="file-caption form-control {class}" tabindex="500">\n  <span class="file-caption-icon"></span>\n  <input class="file-caption-name" onkeydown="return false;" onpaste="return false;">\n</div>',
                    modalMain: a,
                    modal: '<div class="modal-dialog modal-lg{rtl}" role="document">\n  <div class="modal-content">\n    <div class="modal-header">\n      <h5 class="modal-title">{heading}</h5>\n      <span class="kv-zoom-title"></span>\n      <div class="kv-zoom-actions">{toggleheader}{fullscreen}{borderless}{close}</div>\n    </div>\n    <div class="modal-body">\n      <div class="floating-buttons"></div>\n      <div class="kv-zoom-body file-zoom-content {zoomFrameClass}"></div>\n{prev} {next}\n    </div>\n  </div>\n</div>\n',
                    progress: '<div class="progress">\n    <div class="{class}" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n        {status}\n     </div>\n</div>{stats}',
                    stats: '<div class="text-info file-upload-stats"><span class="pending-time">{pendingTime}</span> <span class="upload-speed">{uploadSpeed}</span></div>',
                    size: " <samp>({sizeText})</samp>",
                    footer: '<div class="file-thumbnail-footer">\n    <div class="file-footer-caption" title="{caption}">\n        <div class="file-caption-info">{caption}</div>\n        <div class="file-size-info">{size}</div>\n    </div>\n    {progress}\n{indicator}\n{actions}\n</div>',
                    indicator: '<div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>',
                    actions: '<div class="file-actions">\n    <div class="file-footer-buttons">\n        {download} {upload} {delete} {zoom} {other}    </div>\n</div>\n{drag}\n<div class="clearfix"></div>',
                    actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}" {dataUrl}{dataKey}>{removeIcon}</button>\n',
                    actionUpload: '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>',
                    actionDownload: '<a class="kv-file-download {downloadClass}" title="{downloadTitle}" href="{downloadUrl}" download="{caption}" target="_blank">{downloadIcon}</a>',
                    actionZoom: '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>',
                    actionDrag: '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>',
                    btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</button>',
                    btnLink: '<a href="{href}" tabindex="500" title="{title}" class="{css}" {status}>{icon} {label}</a>',
                    btnBrowse: '<div tabindex="500" class="{css}" {status}>{icon} {label}</div>',
                    zoomCache: '<div class="kv-zoom-cache" style="display:none">{zoomContent}</div>'
                },
                previewMarkupTags: {
                    tagBefore1: '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-fileid="{fileid}" data-template="{template}"><div class="kv-file-content">\n',
                    tagBefore2: '<div class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}" data-fileid="{fileid}" data-template="{template}" title="{caption}"><div class="kv-file-content">\n',
                    tagAfter: "</div>{footer}\n</div>\n"
                },
                previewContentTemplates: {
                    generic: "{content}\n",
                    html: '<div class="kv-preview-data file-preview-html" title="{caption}" {style}>{data}</div>\n',
                    image: '<img src="{data}" class="file-preview-image kv-preview-data" title="{title}" alt="{alt}" {style}>\n',
                    text: '<textarea class="kv-preview-data file-preview-text" title="{caption}" readonly {style}>{data}</textarea>\n',
                    office: '<iframe class="kv-preview-data file-preview-office" src="https://view.officeapps.live.com/op/embed.aspx?src={data}" {style}></iframe>',
                    gdocs: '<iframe class="kv-preview-data file-preview-gdocs" src="https://docs.google.com/gview?url={data}&embedded=true" {style}></iframe>',
                    video: n,
                    audio: s,
                    flash: '<embed class="kv-preview-data file-preview-flash" src="{data}" type="application/x-shockwave-flash" {style}>\n',
                    object: o,
                    pdf: l,
                    other: d
                },
                allowedPreviewTypes: ["image", "html", "text", "video", "audio", "flash", "pdf", "object"],
                previewTemplates: {},
                previewSettings: {
                    image: {
                        width: "auto",
                        height: "auto",
                        "max-width": "100%",
                        "max-height": "100%"
                    },
                    html: {
                        width: "213px",
                        height: "160px"
                    },
                    text: {
                        width: "213px",
                        height: "160px"
                    },
                    office: {
                        width: "213px",
                        height: "160px"
                    },
                    gdocs: {
                        width: "213px",
                        height: "160px"
                    },
                    video: {
                        width: "213px",
                        height: "160px"
                    },
                    audio: {
                        width: "100%",
                        height: "30px"
                    },
                    flash: {
                        width: "213px",
                        height: "160px"
                    },
                    object: {
                        width: "213px",
                        height: "160px"
                    },
                    pdf: {
                        width: "100%",
                        height: "160px"
                    },
                    other: {
                        width: "213px",
                        height: "160px"
                    }
                },
                previewSettingsSmall: {
                    image: {
                        width: "auto",
                        height: "auto",
                        "max-width": "100%",
                        "max-height": "100%"
                    },
                    html: {
                        width: "100%",
                        height: "160px"
                    },
                    text: {
                        width: "100%",
                        height: "160px"
                    },
                    office: {
                        width: "100%",
                        height: "160px"
                    },
                    gdocs: {
                        width: "100%",
                        height: "160px"
                    },
                    video: {
                        width: "100%",
                        height: "auto"
                    },
                    audio: {
                        width: "100%",
                        height: "30px"
                    },
                    flash: {
                        width: "100%",
                        height: "auto"
                    },
                    object: {
                        width: "100%",
                        height: "auto"
                    },
                    pdf: {
                        width: "100%",
                        height: "160px"
                    },
                    other: {
                        width: "100%",
                        height: "160px"
                    }
                },
                previewZoomSettings: {
                    image: {
                        width: "auto",
                        height: "auto",
                        "max-width": "100%",
                        "max-height": "100%"
                    },
                    html: c,
                    text: c,
                    office: {
                        width: "100%",
                        height: "100%",
                        "max-width": "100%",
                        "min-height": "480px"
                    },
                    gdocs: {
                        width: "100%",
                        height: "100%",
                        "max-width": "100%",
                        "min-height": "480px"
                    },
                    video: {
                        width: "auto",
                        height: "100%",
                        "max-width": "100%"
                    },
                    audio: {
                        width: "100%",
                        height: "30px"
                    },
                    flash: {
                        width: "auto",
                        height: "480px"
                    },
                    object: {
                        width: "auto",
                        height: "100%",
                        "max-width": "100%",
                        "min-height": "480px"
                    },
                    pdf: c,
                    other: {
                        width: "auto",
                        height: "100%",
                        "min-height": "480px"
                    }
                },
                mimeTypeAliases: {
                    "video/quicktime": "video/mp4"
                },
                fileTypeSettings: {
                    image: function(e, i) {
                        return t.compare(e, "image.*") && !t.compare(e, /(tiff?|wmf)$/i) || t.compare(i, /\.(gif|png|jpe?g)$/i)
                    },
                    html: function(e, i) {
                        return t.compare(e, "text/html") || t.compare(i, /\.(htm|html)$/i)
                    },
                    office: function(e, i) {
                        return t.compare(e, /(word|excel|powerpoint|office)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?)$/i)
                    },
                    gdocs: function(e, i) {
                        return t.compare(e, /(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) || t.compare(i, /\.(docx?|xlsx?|pptx?|pps|potx?|rtf|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i)
                    },
                    text: function(e, i) {
                        return t.compare(e, "text.*") || t.compare(i, /\.(xml|javascript)$/i) || t.compare(i, /\.(txt|md|csv|nfo|ini|json|php|js|css)$/i)
                    },
                    video: function(e, i) {
                        return t.compare(e, "video.*") && (t.compare(e, /(ogg|mp4|mp?g|mov|webm|3gp)$/i) || t.compare(i, /\.(og?|mp4|webm|mp?g|mov|3gp)$/i))
                    },
                    audio: function(e, i) {
                        return t.compare(e, "audio.*") && (t.compare(i, /(ogg|mp3|mp?g|wav)$/i) || t.compare(i, /\.(og?|mp3|mp?g|wav)$/i))
                    },
                    flash: function(e, i) {
                        return t.compare(e, "application/x-shockwave-flash", !0) || t.compare(i, /\.(swf)$/i)
                    },
                    pdf: function(e, i) {
                        return t.compare(e, "application/pdf", !0) || t.compare(i, /\.(pdf)$/i)
                    },
                    object: function() {
                        return !0
                    },
                    other: function() {
                        return !0
                    }
                },
                fileActionSettings: {
                    showRemove: !0,
                    showUpload: !0,
                    showDownload: !0,
                    showZoom: !0,
                    showDrag: !0,
                    removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
                    removeClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",
                    removeErrorClass: "btn btn-sm btn-kv btn-danger",
                    removeTitle: "Remove file",
                    uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
                    uploadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",
                    uploadTitle: "Upload file",
                    uploadRetryIcon: '<i class="glyphicon glyphicon-repeat"></i>',
                    uploadRetryTitle: "Retry upload",
                    downloadIcon: '<i class="glyphicon glyphicon-download"></i>',
                    downloadClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",
                    downloadTitle: "Download file",
                    zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',
                    zoomClass: "btn btn-sm btn-kv btn-default btn-outline-secondary",
                    zoomTitle: "View Details",
                    dragIcon: '<i class="glyphicon glyphicon-move"></i>',
                    dragClass: "text-info",
                    dragTitle: "Move / Rearrange",
                    dragSettings: {},
                    indicatorNew: '<i class="glyphicon glyphicon-plus-sign text-warning"></i>',
                    indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
                    indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
                    indicatorLoading: '<i class="glyphicon glyphicon-hourglass text-muted"></i>',
                    indicatorNewTitle: "Not uploaded yet",
                    indicatorSuccessTitle: "Uploaded",
                    indicatorErrorTitle: "Upload Error",
                    indicatorLoadingTitle: "Uploading ..."
                }
            }, e.each(u.defaults, function(t, i) {
                "allowedPreviewTypes" !== t ? u[t] = e.extend(!0, {}, i, u[t]) : void 0 === u.allowedPreviewTypes && (u.allowedPreviewTypes = i)
            }), u._initPreviewTemplates()
        },
        _initPreviewTemplates: function() {
            var i, a = this,
                r = a.previewMarkupTags,
                n = r.tagAfter;
            e.each(a.previewContentTemplates, function(e, s) {
                t.isEmpty(a.previewTemplates[e]) && (i = r.tagBefore2, "generic" !== e && "image" !== e && "html" !== e && "text" !== e || (i = r.tagBefore1), a._isPdfRendered() && "pdf" === e && (i = i.replace("kv-file-content", "kv-file-content kv-pdf-rendered")), a.previewTemplates[e] = i + s + n)
            })
        },
        _initPreviewCache: function() {
            var i = this;
            i.previewCache = {
                data: {},
                init: function() {
                    var e = i.initialPreview;
                    e.length > 0 && !t.isArray(e) && (e = e.split(i.initialPreviewDelimiter)), i.previewCache.data = {
                        content: e,
                        config: i.initialPreviewConfig,
                        tags: i.initialPreviewThumbTags
                    }
                },
                count: function(e) {
                    return i.previewCache.data && i.previewCache.data.content ? e ? i.previewCache.data.content.filter(function(e) {
                        return null !== e
                    }).length : i.previewCache.data.content.length : 0
                },
                get: function(a, r) {
                    var n, s, o, l, d, c, u, p, h = "init_" + a,
                        f = i.previewCache.data,
                        m = f.config[a],
                        g = f.content[a],
                        v = i.previewInitId + "-" + h,
                        w = t.ifSet("previewAsData", m, i.initialPreviewAsData),
                        b = m ? {
                            title: m.title || null,
                            alt: m.alt || null
                        } : {
                            title: null,
                            alt: null
                        },
                        _ = function(e, a, r, s, o, l, d, c, u) {
                            return c = " file-preview-initial " + t.SORT_CSS + (c ? " " + c : ""), n = m && m.fileId || "file_" + o, i._generatePreviewTemplate(e, a, r, s, o, n, !1, null, c, l, d, u, b, m && m.zoomData || a)
                        };
                    return g && g.length ? (r = void 0 === r || r, l = t.ifSet("type", m, i.initialPreviewFileType || "generic"), c = t.ifSet("filename", m, t.ifSet("caption", m)), u = t.ifSet("filetype", m, l), d = i.previewCache.footer(a, r, m && m.size || null), p = t.ifSet("frameClass", m), s = w ? _(l, g, c, u, v, d, h, p) : _("generic", g, c, u, v, d, h, p, l).setTokens({
                        content: f.content[a]
                    }), f.tags.length && f.tags[a] && (s = t.replaceTags(s, f.tags[a])), t.isEmpty(m) || t.isEmpty(m.frameAttr) || ((o = e(document.createElement("div")).html(s)).find(".file-preview-initial").attr(m.frameAttr), s = o.html(), o.remove()), s) : ""
                },
                clean: function(e) {
                    e.content = t.cleanArray(e.content), e.config = t.cleanArray(e.config), e.tags = t.cleanArray(e.tags), i.previewCache.data = e
                },
                add: function(e, a, r, n) {
                    var s = i.previewCache.data,
                        o = e.length - 1;
                    return e && e.length ? (t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), n ? (o = s.content.push(e[0]) - 1, s.config[o] = a, s.tags[o] = r) : (s.content = e, s.config = a, s.tags = r), i.previewCache.clean(s), o) : o
                },
                set: function(e, a, r, n) {
                    var s, o = i.previewCache.data;
                    if (e && e.length && (t.isArray(e) || (e = e.split(i.initialPreviewDelimiter)), e.filter(function(e) {
                            return null !== e
                        }).length)) {
                        if (void 0 === o.content && (o.content = []), void 0 === o.config && (o.config = []), void 0 === o.tags && (o.tags = []), n) {
                            for (s = 0; s < e.length; s++) e[s] && o.content.push(e[s]);
                            for (s = 0; s < a.length; s++) a[s] && o.config.push(a[s]);
                            for (s = 0; s < r.length; s++) r[s] && o.tags.push(r[s])
                        } else o.content = e, o.config = a, o.tags = r;
                        i.previewCache.clean(o)
                    }
                },
                unset: function(a) {
                    var r = i.previewCache.count(),
                        n = i.reversePreviewOrder;
                    if (r) {
                        if (1 === r) return i.previewCache.data.content = [], i.previewCache.data.config = [], i.previewCache.data.tags = [], i.initialPreview = [], i.initialPreviewConfig = [], void(i.initialPreviewThumbTags = []);
                        i.previewCache.data.content = t.spliceArray(i.previewCache.data.content, a, n), i.previewCache.data.config = t.spliceArray(i.previewCache.data.config, a, n), i.previewCache.data.tags = t.spliceArray(i.previewCache.data.tags, a, n);
                        var s = e.extend(!0, {}, i.previewCache.data);
                        i.previewCache.clean(s)
                    }
                },
                out: function() {
                    var e, t, a = "",
                        r = i.previewCache.count();
                    if (0 === r) return {
                        content: "",
                        caption: ""
                    };
                    for (e = 0; e < r; e++) t = i.previewCache.get(e), a = i.reversePreviewOrder ? t + a : a + t;
                    return {
                        content: a,
                        caption: i._getMsgSelected(r)
                    }
                },
                footer: function(e, a, r) {
                    var n = i.previewCache.data || {};
                    if (t.isEmpty(n.content)) return "";
                    (t.isEmpty(n.config) || t.isEmpty(n.config[e])) && (n.config[e] = {}), a = void 0 === a || a;
                    var s, o = n.config[e],
                        l = t.ifSet("caption", o),
                        d = t.ifSet("width", o, "auto"),
                        c = t.ifSet("url", o, !1),
                        u = t.ifSet("key", o, null),
                        p = t.ifSet("fileId", o, null),
                        h = i.fileActionSettings,
                        f = i.initialPreviewShowDelete || !1,
                        m = i.initialPreviewDownloadUrl ? i.initialPreviewDownloadUrl + "?key=" + u + (p ? "&fileId=" + p : "") : "",
                        g = o.downloadUrl || m,
                        v = o.filename || o.caption || "",
                        w = !!g,
                        b = t.ifSet("showRemove", o, t.ifSet("showRemove", h, f)),
                        _ = t.ifSet("showDownload", o, t.ifSet("showDownload", h, w)),
                        y = t.ifSet("showZoom", o, t.ifSet("showZoom", h, !0)),
                        C = t.ifSet("showDrag", o, t.ifSet("showDrag", h, !0)),
                        x = !1 === c && a;
                    return _ = _ && !1 !== o.downloadUrl && !!g, s = i._renderFileActions(o, !1, _, b, y, C, x, c, u, !0, g, v), i._getLayoutTemplate("footer").setTokens({
                        progress: i._renderThumbProgress(),
                        actions: s,
                        caption: l,
                        size: i._getSize(r),
                        width: d,
                        indicator: ""
                    })
                }
            }, i.previewCache.init()
        },
        _isPdfRendered: function() {
            var e = this.usePdfRenderer;
            return ("function" == typeof e ? e() : !!e) && this.pdfRendererUrl
        },
        _handler: function(e, t, i) {
            var a = this.namespace,
                r = t.split(" ").join(a + " ") + a;
            e && e.length && e.off(r).on(r, i)
        },
        _encodeURI: function(e) {
            return this.encodeUrl ? encodeURI(e) : e
        },
        _log: function(e) {
            var t = this.$element.attr("id");
            t && (e = '"' + t + '": ' + e), e = "bootstrap-fileinput: " + e, void 0 !== window.console.log ? window.console.log(e) : window.alert(e)
        },
        _validate: function() {
            var e = "file" === this.$element.attr("type");
            return e || this._log('The input "type" must be set to "file" for initializing the "bootstrap-fileinput" plugin.'), e
        },
        _errorsExist: function() {
            var t;
            return !!this.$errorContainer.find("li").length || ((t = e(document.createElement("div")).html(this.$errorContainer.html())).find(".kv-error-close").remove(), t.find("ul").remove(), !!e.trim(t.text()).length)
        },
        _errorHandler: function(e, t) {
            var i = this,
                a = e.target.error,
                r = function(e) {
                    i._showError(e.replace("{name}", t))
                };
            a.code === a.NOT_FOUND_ERR ? r(i.msgFileNotFound) : a.code === a.SECURITY_ERR ? r(i.msgFileSecured) : a.code === a.NOT_READABLE_ERR ? r(i.msgFileNotReadable) : a.code === a.ABORT_ERR ? r(i.msgFilePreviewAborted) : r(i.msgFilePreviewError)
        },
        _addError: function(e) {
            var t = this,
                i = t.$errorContainer;
            e && i.length && (i.html(t.errorCloseButton + e), t._handler(i.find(".kv-error-close"), "click", function() {
                setTimeout(function() {
                    t.showPreview && !t.getFrames().length && t.clear(), i.fadeOut("slow")
                }, t.processDelay)
            }))
        },
        _setValidationError: function(e) {
            e = (e ? e + " " : "") + "has-error", this.$container.removeClass(e).addClass("has-error"), t.addCss(this.$captionContainer, "is-invalid")
        },
        _resetErrors: function(e) {
            var t = this.$errorContainer;
            this.isError = !1, this.$container.removeClass("has-error"), this.$captionContainer.removeClass("is-invalid"), t.html(""), e ? t.fadeOut("slow") : t.hide()
        },
        _showFolderError: function(e) {
            var t, i = this.$errorContainer;
            e && (this.isAjaxUpload || this._clearFileInput(), t = this.msgFoldersNotAllowed.replace("{n}", e), this._addError(t), this._setValidationError(), i.fadeIn(800), this._raise("filefoldererror", [e, t]))
        },
        _showUploadError: function(e, t, i) {
            var a = this.$errorContainer,
                r = i || "fileuploaderror",
                n = t.fileId || "",
                s = t && t.id ? '<li data-thumb-id="' + t.id + '" data-file-id="' + n + '">' + e + "</li>" : "<li>" + e + "</li>";
            return 0 === a.find("ul").length ? this._addError("<ul>" + s + "</ul>") : a.find("ul").append(s), a.fadeIn(800), this._raise(r, [t, e]), this._setValidationError("file-input-new"), !0
        },
        _showError: function(e, t, i) {
            var a = this.$errorContainer,
                r = i || "fileerror";
            return (t = t || {}).reader = this.reader, this._addError(e), a.fadeIn(800), this._raise(r, [t, e]), this.isAjaxUpload || this._clearFileInput(), this._setValidationError("file-input-new"), this.$btnUpload.attr("disabled", !0), !0
        },
        _noFilesError: function(e) {
            var t = this.minFileCount > 1 ? this.filePlural : this.fileSingle,
                i = this.msgFilesTooLess.replace("{n}", this.minFileCount).replace("{files}", t),
                a = this.$errorContainer;
            this._addError(i), this.isError = !0, this._updateFileDetails(0), a.fadeIn(800), this._raise("fileerror", [e, i]), this._clearFileInput(), this._setValidationError()
        },
        _parseError: function(t, i, a, r) {
            var n, s = e.trim(a + ""),
                o = void 0 !== i.responseJSON && void 0 !== i.responseJSON.error ? i.responseJSON.error : i.responseText;
            return this.cancelling && this.msgUploadAborted && (s = this.msgUploadAborted), this.showAjaxErrorDetails && o && (n = (o = e.trim(o.replace(/\n\s*\n/g, "\n"))).length ? "<pre>" + o + "</pre>" : "", s += s ? n : o), s || (s = this.msgAjaxError.replace("{operation}", t)), this.cancelling = !1, r ? "<b>" + r + ": </b>" + s : s
        },
        _parseFileType: function(e, i) {
            var a, r, n, s = this.allowedPreviewTypes || [];
            if ("application/text-plain" === e) return "text";
            for (n = 0; n < s.length; n++)
                if (r = s[n], a = (0, this.fileTypeSettings[r])(e, i) ? r : "", !t.isEmpty(a)) return a;
            return "other"
        },
        _getPreviewIcon: function(t) {
            var i, a = this,
                r = null;
            return t && t.indexOf(".") > -1 && (i = t.split(".").pop(), a.previewFileIconSettings && (r = a.previewFileIconSettings[i] || a.previewFileIconSettings[i.toLowerCase()] || null), a.previewFileExtSettings && e.each(a.previewFileExtSettings, function(e, t) {
                a.previewFileIconSettings[e] && t(i) && (r = a.previewFileIconSettings[e])
            })), r
        },
        _parseFilePreviewIcon: function(e, t) {
            var i = this._getPreviewIcon(t) || this.previewFileIcon,
                a = e;
            return a.indexOf("{previewFileIcon}") > -1 && (a = a.setTokens({
                previewFileIconClass: this.previewFileIconClass,
                previewFileIcon: i
            })), a
        },
        _raise: function(t, i) {
            var a = e.Event(t);
            if (void 0 !== i ? this.$element.trigger(a, i) : this.$element.trigger(a), a.isDefaultPrevented() || !1 === a.result) return !1;
            switch (t) {
                case "filebatchuploadcomplete":
                case "filebatchuploadsuccess":
                case "fileuploaded":
                case "fileclear":
                case "filecleared":
                case "filereset":
                case "fileerror":
                case "filefoldererror":
                case "fileuploaderror":
                case "filebatchuploaderror":
                case "filedeleteerror":
                case "filecustomerror":
                case "filesuccessremove":
                    break;
                default:
                    this.ajaxAborted || (this.ajaxAborted = a.result)
            }
            return !0
        },
        _listenFullScreen: function(e) {
            var t, i, a = this.$modal;
            a && a.length && (t = a && a.find(".btn-fullscreen"), i = a && a.find(".btn-borderless"), t.length && i.length && (t.removeClass("active").attr("aria-pressed", "false"), i.removeClass("active").attr("aria-pressed", "false"), e ? t.addClass("active").attr("aria-pressed", "true") : i.addClass("active").attr("aria-pressed", "true"), a.hasClass("file-zoom-fullscreen") ? this._maximizeZoomDialog() : e ? this._maximizeZoomDialog() : i.removeClass("active").attr("aria-pressed", "false")))
        },
        _listen: function() {
            var i = this,
                a = i.$element,
                r = i.$form,
                n = i.$container;
            i._handler(a, "click", function(e) {
                a.hasClass("file-no-browse") && (a.data("zoneClicked") ? a.data("zoneClicked", !1) : e.preventDefault())
            }), i._handler(a, "change", e.proxy(i._change, i)), i.showBrowse && i._handler(i.$btnFile, "click", e.proxy(i._browse, i)), i._handler(n.find(".fileinput-remove:not([disabled])"), "click", e.proxy(i.clear, i)), i._handler(n.find(".fileinput-cancel"), "click", e.proxy(i.cancel, i)), i._handler(n.find(".fileinput-pause"), "click", e.proxy(i.pause, i)), i._initDragDrop(), i._handler(r, "reset", e.proxy(i.clear, i)), i.isAjaxUpload || i._handler(r, "submit", e.proxy(i._submitForm, i)), i._handler(i.$container.find(".fileinput-upload"), "click", e.proxy(i._uploadClick, i)), i._handler(e(window), "resize", function() {
                i._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight)
            }), i._handler(e(document), "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
                i._listenFullScreen(t.checkFullScreen())
            }), i._autoFitContent(), i._initClickable(), i._refreshPreview()
        },
        _autoFitContent: function() {
            var t, i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                a = this,
                r = i < 400 ? a.previewSettingsSmall || a.defaults.previewSettingsSmall : a.previewSettings || a.defaults.previewSettings;
            e.each(r, function(e, i) {
                t = ".file-preview-frame .file-preview-" + e, a.$preview.find(t + ".kv-preview-data," + t + " .kv-preview-data").css(i)
            })
        },
        _scanDroppedItems: function(e, t, i) {
            i = i || "";
            var a, r, n, s = this,
                o = function(e) {
                    s._log("Error scanning dropped files!"), s._log(e)
                };
            e.isFile ? e.file(function(e) {
                t.push(e)
            }, o) : e.isDirectory && (r = e.createReader(), (n = function() {
                r.readEntries(function(r) {
                    if (r && r.length > 0) {
                        for (a = 0; a < r.length; a++) s._scanDroppedItems(r[a], t, i + e.name + "/");
                        n()
                    }
                    return null
                }, o)
            })())
        },
        _initDragDrop: function() {
            var t = this.$dropZone;
            this.dropZoneEnabled && this.showPreview && (this._handler(t, "dragenter dragover", e.proxy(this._zoneDragEnter, this)), this._handler(t, "dragleave", e.proxy(this._zoneDragLeave, this)), this._handler(t, "drop", e.proxy(this._zoneDrop, this)), this._handler(e(document), "dragenter dragover drop", this._zoneDragDropInit))
        },
        _zoneDragDropInit: function(e) {
            e.stopPropagation(), e.preventDefault()
        },
        _zoneDragEnter: function(i) {
            var a = i.originalEvent.dataTransfer,
                r = e.inArray("Files", a.types) > -1;
            if (this._zoneDragDropInit(i), this.isDisabled || !r) return i.originalEvent.dataTransfer.effectAllowed = "none", void(i.originalEvent.dataTransfer.dropEffect = "none");
            this._raise("fileDragEnter", {
                sourceEvent: i,
                files: a.types.Files
            }) && t.addCss(this.$dropZone, "file-highlighted")
        },
        _zoneDragLeave: function(e) {
            this._zoneDragDropInit(e), this.isDisabled || this._raise("fileDragLeave", {
                sourceEvent: e
            }) && this.$dropZone.removeClass("file-highlighted")
        },
        _zoneDrop: function(e) {
            var i, a = this,
                r = a.$element,
                n = e.originalEvent.dataTransfer,
                s = n.files,
                o = n.items,
                l = t.getDragDropFolders(o),
                d = function() {
                    a.isAjaxUpload ? a._change(e, s) : (a.changeTriggered = !0, r.get(0).files = s, setTimeout(function() {
                        a.changeTriggered = !1, r.trigger("change" + a.namespace)
                    }, a.processDelay)), a.$dropZone.removeClass("file-highlighted")
                };
            if (e.preventDefault(), !a.isDisabled && !t.isEmpty(s) && a._raise("fileDragDrop", {
                    sourceEvent: e,
                    files: s
                }))
                if (l > 0) {
                    if (!a.isAjaxUpload) return void a._showFolderError(l);
                    for (s = [], i = 0; i < o.length; i++) {
                        var c = o[i].webkitGetAsEntry();
                        c && a._scanDroppedItems(c, s)
                    }
                    setTimeout(function() {
                        d()
                    }, 500)
                } else d()
        },
        _uploadClick: function(e) {
            var i, a = this.$container.find(".fileinput-upload"),
                r = !a.hasClass("disabled") && t.isEmpty(a.attr("disabled"));
            e && e.isDefaultPrevented() || (this.isAjaxUpload ? (e.preventDefault(), r && this.upload()) : r && "submit" !== a.attr("type") && ((i = a.closest("form")).length && i.trigger("submit"), e.preventDefault()))
        },
        _submitForm: function() {
            return this._isFileSelectionValid() && !this._abort({})
        },
        _clearPreview: function() {
            var i = this.$preview;
            (this.showUploadedThumbs ? this.getFrames(":not(.file-preview-success)") : this.getFrames()).each(function() {
                var a = e(this);
                a.remove(), t.cleanZoomCache(i.find("#zoom-" + a.attr("id")))
            }), this.getFrames().length && this.showPreview || this._resetUpload(), this._validateDefaultPreview()
        },
        _initSortable: function() {
            var i, a = this,
                r = a.$preview,
                n = "." + t.SORT_CSS,
                s = a.reversePreviewOrder;
            window.KvSortable && 0 !== r.find(n).length && (i = {
                handle: ".drag-handle-init",
                dataIdAttr: "data-preview-id",
                scroll: !1,
                draggable: n,
                onSort: function(i) {
                    var r = i.oldIndex,
                        n = i.newIndex,
                        o = 0;
                    a.initialPreview = t.moveArray(a.initialPreview, r, n, s), a.initialPreviewConfig = t.moveArray(a.initialPreviewConfig, r, n, s), a.previewCache.init(), a.getFrames(".file-preview-initial").each(function() {
                        e(this).attr("data-fileindex", "init_" + o), o++
                    }), a._raise("filesorted", {
                        previewId: e(i.item).attr("id"),
                        oldIndex: r,
                        newIndex: n,
                        stack: a.initialPreviewConfig
                    })
                }
            }, r.data("kvsortable") && r.kvsortable("destroy"), e.extend(!0, i, a.fileActionSettings.dragSettings), r.kvsortable(i))
        },
        _setPreviewContent: function(e) {
            this.$preview.html(e), this._autoFitContent()
        },
        _initPreviewImageOrientations: function() {
            var i = this,
                a = 0;
            i.autoOrientImageInitial && i.getFrames(".file-preview-initial").each(function() {
                var r, n, s, o = e(this),
                    l = i.initialPreviewConfig[a];
                l && l.exif && l.exif.Orientation && (s = o.attr("id"), r = o.find(">.kv-file-content img"), n = i.$preview.find("#zoom-" + s + " >.kv-file-content img"), r && r.length && t.setImageOrientation(r, n, l.exif.Orientation)), a++
            })
        },
        _initPreview: function(e) {
            var i, a = this.initialCaption || "";
            if (!this.previewCache.count(!0)) return this._clearPreview(), void(e ? this._setCaption(a) : this._initCaption());
            i = this.previewCache.out(), a = e && this.initialCaption ? this.initialCaption : i.caption, this._setPreviewContent(i.content), this._setInitThumbAttr(), this._setCaption(a), this._initSortable(), t.isEmpty(i.content) || this.$container.removeClass("file-input-new"), this._initPreviewImageOrientations()
        },
        _getZoomButton: function(e) {
            var t = this.previewZoomButtonIcons[e],
                i = this.previewZoomButtonClasses[e],
                a = ' title="' + (this.previewZoomButtonTitles[e] || "") + '" ' + ("close" === e ? ' data-dismiss="modal" aria-hidden="true"' : "");
            return "fullscreen" !== e && "borderless" !== e && "toggleheader" !== e || (a += ' data-toggle="button" aria-pressed="false" autocomplete="off"'), '<button type="button" class="' + i + " btn-" + e + '"' + a + ">" + t + "</button>"
        },
        _getModalContent: function() {
            return this._getLayoutTemplate("modal").setTokens({
                rtl: this.rtl ? " kv-rtl" : "",
                zoomFrameClass: this.frameClass,
                heading: this.msgZoomModalHeading,
                prev: this._getZoomButton("prev"),
                next: this._getZoomButton("next"),
                toggleheader: this._getZoomButton("toggleheader"),
                fullscreen: this._getZoomButton("fullscreen"),
                borderless: this._getZoomButton("borderless"),
                close: this._getZoomButton("close")
            })
        },
        _listenModalEvent: function(e) {
            var i = this,
                a = i.$modal;
            a.on(e + ".bs.modal", function(r) {
                var n = a.find(".btn-fullscreen"),
                    s = a.find(".btn-borderless");
                i._raise("filezoom" + e, function(e) {
                    return {
                        sourceEvent: e,
                        previewId: a.data("previewId"),
                        modal: a
                    }
                }(r)), "shown" === e && (s.removeClass("active").attr("aria-pressed", "false"), n.removeClass("active").attr("aria-pressed", "false"), a.hasClass("file-zoom-fullscreen") && (i._maximizeZoomDialog(), t.checkFullScreen() ? n.addClass("active").attr("aria-pressed", "true") : s.addClass("active").attr("aria-pressed", "true")))
            })
        },
        _initZoom: function() {
            var i, a = this,
                r = a._getLayoutTemplate("modalMain"),
                n = "#" + t.MODAL_ID;
            a.showPreview && (a.$modal = e(n), a.$modal && a.$modal.length || (i = e(document.createElement("div")).html(r).insertAfter(a.$container), a.$modal = e(n).insertBefore(i), i.remove()), t.initModal(a.$modal), a.$modal.html(a._getModalContent()), e.each(t.MODAL_EVENTS, function(e, t) {
                a._listenModalEvent(t)
            }))
        },
        _initZoomButtons: function() {
            var t, i, a = this.$modal.data("previewId") || "",
                r = this.getFrames().toArray(),
                n = r.length,
                s = this.$modal.find(".btn-prev"),
                o = this.$modal.find(".btn-next");
            if (r.length < 2) return s.hide(), void o.hide();
            s.show(), o.show(), n && (t = e(r[0]), i = e(r[n - 1]), s.removeAttr("disabled"), o.removeAttr("disabled"), t.length && t.attr("id") === a && s.attr("disabled", !0), i.length && i.attr("id") === a && o.attr("disabled", !0))
        },
        _maximizeZoomDialog: function() {
            var t = this.$modal,
                i = t.find(".modal-header:visible"),
                a = t.find(".modal-footer:visible"),
                r = t.find(".modal-body"),
                n = e(window).height();
            t.addClass("file-zoom-fullscreen"), i && i.length && (n -= i.outerHeight(!0)), a && a.length && (n -= a.outerHeight(!0)), r && r.length && (n -= r.outerHeight(!0) - r.height()), t.find(".kv-zoom-body").height(n)
        },
        _resizeZoomDialog: function(e) {
            var i = this.$modal,
                a = i.find(".btn-fullscreen"),
                r = i.find(".btn-borderless");
            if (i.hasClass("file-zoom-fullscreen")) t.toggleFullScreen(!1), e ? a.hasClass("active") || (i.removeClass("file-zoom-fullscreen"), this._resizeZoomDialog(!0), r.hasClass("active") && r.removeClass("active").attr("aria-pressed", "false")) : a.hasClass("active") ? a.removeClass("active").attr("aria-pressed", "false") : (i.removeClass("file-zoom-fullscreen"), this.$modal.find(".kv-zoom-body").css("height", this.zoomModalHeight));
            else {
                if (!e) return void this._maximizeZoomDialog();
                t.toggleFullScreen(!0)
            }
            i.focus()
        },
        _setZoomContent: function(i, a) {
            var r, n, s, o, l, d, c, u, p = this,
                h = i.attr("id"),
                f = p.$preview.find("#zoom-" + h),
                m = p.$modal,
                g = m.find(".btn-fullscreen"),
                v = m.find(".btn-borderless"),
                w = m.find(".btn-toggleheader");
            n = f.attr("data-template") || "generic", s = (r = f.find(".kv-file-content")).length ? r.html() : "", o = (i.data("caption") || "") + " " + (i.data("size") || ""), m.find(".kv-zoom-title").attr("title", e("<div/>").html(o).text()).html(o), l = m.find(".kv-zoom-body"), m.removeClass("kv-single-content"), a ? (u = l.addClass("file-thumb-loading").clone().insertAfter(l), l.html(s).hide(), u.fadeOut("fast", function() {
                l.fadeIn("fast", function() {
                    l.removeClass("file-thumb-loading")
                }), u.remove()
            })) : l.html(s), (c = p.previewZoomSettings[n]) && (d = l.find(".kv-preview-data"), t.addCss(d, "file-zoom-detail"), e.each(c, function(e, t) {
                d.css(e, t), (d.attr("width") && "width" === e || d.attr("height") && "height" === e) && d.removeAttr(e)
            })), m.data("previewId", h), p._handler(m.find(".btn-prev"), "click", function() {
                p._zoomSlideShow("prev", h)
            }), p._handler(m.find(".btn-next"), "click", function() {
                p._zoomSlideShow("next", h)
            }), p._handler(g, "click", function() {
                p._resizeZoomDialog(!0)
            }), p._handler(v, "click", function() {
                p._resizeZoomDialog(!1)
            }), p._handler(w, "click", function() {
                var e, t = m.find(".modal-header"),
                    i = m.find(".modal-body .floating-buttons"),
                    a = t.find(".kv-zoom-actions"),
                    r = function(e) {
                        var i = p.$modal.find(".kv-zoom-body"),
                            a = p.zoomModalHeight;
                        m.hasClass("file-zoom-fullscreen") && (a = i.outerHeight(!0), e || (a -= t.outerHeight(!0))), i.css("height", e ? a + e : a)
                    };
                t.is(":visible") ? (e = t.outerHeight(!0), t.slideUp("slow", function() {
                    a.find(".btn").appendTo(i), r(e)
                })) : (i.find(".btn").appendTo(a), t.slideDown("slow", function() {
                    r()
                })), m.focus()
            }), p._handler(m, "keydown", function(t) {
                var i = t.which || t.keyCode,
                    a = e(this).find(".btn-prev"),
                    r = e(this).find(".btn-next"),
                    n = e(this).data("previewId"),
                    s = p.rtl ? 39 : 37,
                    o = p.rtl ? 37 : 39;
                i === s && a.length && !a.attr("disabled") && p._zoomSlideShow("prev", n), i === o && r.length && !r.attr("disabled") && p._zoomSlideShow("next", n)
            })
        },
        _zoomPreview: function(e) {
            var i, a = this.$modal;
            if (!e.length) throw "Cannot zoom to detailed preview!";
            t.initModal(a), a.html(this._getModalContent()), i = e.closest(t.FRAMES), this._setZoomContent(i), a.modal("show"), this._initZoomButtons()
        },
        _zoomSlideShow: function(t, i) {
            var a, r, n, s = this.$modal.find(".kv-zoom-actions .btn-" + t),
                o = this.getFrames().toArray(),
                l = o.length;
            if (!s.attr("disabled")) {
                for (r = 0; r < l; r++)
                    if (e(o[r]).attr("id") === i) {
                        n = "prev" === t ? r - 1 : r + 1;
                        break
                    } n < 0 || n >= l || !o[n] || ((a = e(o[n])).length && this._setZoomContent(a, !0), this._initZoomButtons(), this._raise("filezoom" + t, {
                    previewId: i,
                    modal: this.$modal
                }))
            }
        },
        _initZoomButton: function() {
            var t = this;
            t.$preview.find(".kv-file-zoom").each(function() {
                var i = e(this);
                t._handler(i, "click", function() {
                    t._zoomPreview(i)
                })
            })
        },
        _inputFileCount: function() {
            return this.$element.get(0).files.length
        },
        _refreshPreview: function() {
            var e;
            (this._inputFileCount() || this.isAjaxUpload) && this.showPreview && this.isPreviewable && (this.isAjaxUpload && this.fileManager.count() > 0 ? (e = this.fileManager.stack, this.fileManager.clear(), this._clearFileInput()) : e = this.$element.get(0).files, e && e.length && (this.readFiles(e), this._setFileDropZoneTitle()))
        },
        _clearObjects: function(t) {
            t.find("video audio").each(function() {
                this.pause(), e(this).remove()
            }), t.find("img object div").each(function() {
                e(this).remove()
            })
        },
        _clearFileInput: function() {
            var t, i, a, r = this.$element;
            this._inputFileCount() && (t = r.closest("form"), i = e(document.createElement("form")), a = e(document.createElement("div")), r.before(a), t.length ? t.after(i) : a.after(i), i.append(r).trigger("reset"), a.before(r).remove(), i.remove())
        },
        _resetUpload: function() {
            this.uploadCache = {
                content: [],
                config: [],
                tags: [],
                append: !0
            }, this.$btnUpload.removeAttr("disabled"), this._setProgress(0), this.$progress.hide(), this._resetErrors(!1), this._initAjax(), this.fileManager.clearImages(), this._resetCanvas(), this.cacheInitialPreview = {}, this.overwriteInitial && (this.initialPreview = [], this.initialPreviewConfig = [], this.initialPreviewThumbTags = [], this.previewCache.data = {
                content: [],
                config: [],
                tags: []
            })
        },
        _resetCanvas: function() {
            this.canvas && this.imageCanvasContext && this.imageCanvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        _hasInitialPreview: function() {
            return !this.overwriteInitial && this.previewCache.count(!0)
        },
        _resetPreview: function() {
            var e, t;
            this.previewCache.count(!0) ? (e = this.previewCache.out(), this._setPreviewContent(e.content), this._setInitThumbAttr(), t = this.initialCaption ? this.initialCaption : e.caption, this._setCaption(t)) : (this._clearPreview(), this._initCaption()), this.showPreview && (this._initZoom(), this._initSortable())
        },
        _clearDefaultPreview: function() {
            this.$preview.find(".file-default-preview").remove()
        },
        _validateDefaultPreview: function() {
            this.showPreview && !t.isEmpty(this.defaultPreviewContent) && (this._setPreviewContent('<div class="file-default-preview">' + this.defaultPreviewContent + "</div>"), this.$container.removeClass("file-input-new"), this._initClickable())
        },
        _resetPreviewThumbs: function(e) {
            var t;
            if (e) return this._clearPreview(), void this.clearFileStack();
            this._hasInitialPreview() ? (t = this.previewCache.out(), this._setPreviewContent(t.content), this._setInitThumbAttr(), this._setCaption(t.caption), this._initPreviewActions()) : this._clearPreview()
        },
        _getLayoutTemplate: function(e) {
            var i = this.layoutTemplates[e];
            return t.isEmpty(this.customLayoutTags) ? i : t.replaceTags(i, this.customLayoutTags)
        },
        _getPreviewTemplate: function(e) {
            var i = this.previewTemplates[e];
            return t.isEmpty(this.customPreviewTags) ? i : t.replaceTags(i, this.customPreviewTags)
        },
        _getOutData: function(e, t, i, a) {
            return t = t || {}, i = i || {}, {
                formdata: e,
                files: a = a || this.fileManager.list(),
                filenames: this.filenames,
                filescount: this.getFilesCount(),
                extra: this._getExtraData(),
                response: i,
                reader: this.reader,
                jqXHR: t
            }
        },
        _getMsgSelected: function(e) {
            var t = 1 === e ? this.fileSingle : this.filePlural;
            return e > 0 ? this.msgSelected.replace("{n}", e).replace("{files}", t) : this.msgNoFilesSelected
        },
        _getFrame: function(t) {
            var i = e("#" + t);
            return i.length ? i : (this._log('Invalid thumb frame with id: "' + t + '".'), null)
        },
        _getThumbs: function(e) {
            return e = e || "", this.getFrames(":not(.file-preview-initial)" + e)
        },
        _getExtraData: function(e, t) {
            var i = this.uploadExtraData;
            return "function" == typeof this.uploadExtraData && (i = this.uploadExtraData(e, t)), i
        },
        _initXhr: function(e, i, a) {
            var r = this,
                n = r.fileManager,
                s = function(e) {
                    var s = 0,
                        o = e.total,
                        l = e.loaded || e.position,
                        d = n.getUploadStats(i, l, o);
                    e.lengthComputable && !r.enableResumableUpload && (s = t.round(l / o * 100)), i ? r._setFileUploadStats(i, s, a, d) : r._setProgress(s, null, null, r._getStats(d)), r._raise("fileajaxprogress", [d])
                };
            return e.upload && (r.progressDelay && (s = t.debounce(s, r.progressDelay)), e.upload.addEventListener("progress", s, !1)), e
        },
        _initAjaxSettings: function() {
            this._ajaxSettings = e.extend(!0, {}, this.ajaxSettings), this._ajaxDeleteSettings = e.extend(!0, {}, this.ajaxDeleteSettings)
        },
        _mergeAjaxCallback: function(e, t, i) {
            var a, r = this._ajaxSettings,
                n = this.mergeAjaxCallbacks;
            "delete" === i && (r = this._ajaxDeleteSettings, n = this.mergeAjaxDeleteCallbacks), a = r[e], r[e] = n && "function" == typeof a ? "before" === n ? function() {
                a.apply(this, arguments), t.apply(this, arguments)
            } : function() {
                t.apply(this, arguments), a.apply(this, arguments)
            } : t
        },
        _ajaxSubmit: function(t, i, a, r, n, s, o, l) {
            var d, c, u, p, h = this;
            h._raise("filepreajax", [n, s, o]) && (n.append("initialPreview", JSON.stringify(h.initialPreview)), n.append("initialPreviewConfig", JSON.stringify(h.initialPreviewConfig)), n.append("initialPreviewThumbTags", JSON.stringify(h.initialPreviewThumbTags)), h._initAjaxSettings(), h._mergeAjaxCallback("beforeSend", t), h._mergeAjaxCallback("success", i), h._mergeAjaxCallback("complete", a), h._mergeAjaxCallback("error", r), "function" == typeof(l = l || h.uploadUrlThumb || h.uploadUrl) && (l = l()), "object" == typeof(u = h._getExtraData(s, o) || {}) && e.each(u, function(e, t) {
                n.append(e, t)
            }), c = {
                xhr: function() {
                    var t = e.ajaxSettings.xhr();
                    return h._initXhr(t, s, h.fileManager.count())
                },
                url: h._encodeURI(l),
                type: "POST",
                dataType: "json",
                data: n,
                cache: !1,
                processData: !1,
                contentType: !1
            }, d = e.extend(!0, {}, c, h._ajaxSettings), h.ajaxQueue.push(d), p = function() {
                var t, i;
                h.ajaxCurrentThreads < h.maxAjaxThreads && void 0 !== (t = h.ajaxQueue.shift()) && (h.ajaxCurrentThreads++, i = e.ajax(t).done(function() {
                    clearInterval(h.ajaxQueueIntervalId), h.ajaxCurrentThreads--
                }), h.ajaxRequests.push(i))
            }, h.ajaxQueueIntervalId = setInterval(p, h.queueDelay))
        },
        _mergeArray: function(e, i) {
            var a = t.cleanArray(this[e]),
                r = t.cleanArray(i);
            this[e] = a.concat(r)
        },
        _initUploadSuccess: function(i, a, r) {
            var n, s, o, l, d, c, u, p, h, f = this;
            f.showPreview && "object" == typeof i && !e.isEmptyObject(i) && void 0 !== i.initialPreview && i.initialPreview.length > 0 && (f.hasInitData = !0, c = i.initialPreview || [], u = i.initialPreviewConfig || [], p = i.initialPreviewThumbTags || [], n = void 0 === i.append || i.append, c.length > 0 && !t.isArray(c) && (c = c.split(f.initialPreviewDelimiter)), c.length && (f._mergeArray("initialPreview", c), f._mergeArray("initialPreviewConfig", u), f._mergeArray("initialPreviewThumbTags", p)), void 0 !== a ? r ? (h = a.attr("data-fileindex"), f.uploadCache.content[h] = c[0], f.uploadCache.config[h] = u[0] || [], f.uploadCache.tags[h] = p[0] || [], f.uploadCache.append = n) : (o = f.previewCache.add(c[0], u[0], p[0], n), s = f.previewCache.get(o, !1), (d = (l = e(document.createElement("div")).html(s).hide().insertAfter(a)).find(".kv-zoom-cache")) && d.length && d.insertAfter(a), a.fadeOut("slow", function() {
                var e = l.find(".file-preview-frame");
                e && e.length && e.insertBefore(a).fadeIn("slow").css("display:inline-block"), f._initPreviewActions(), f._clearFileInput(), t.cleanZoomCache(f.$preview.find("#zoom-" + a.attr("id"))), f._initSortable()
            })) : (f.previewCache.set(c, u, p, n), f._initPreview(), f._initPreviewActions()))
        },
        _initSuccessThumbs: function() {
            var i = this;
            i.showPreview && i._getThumbs(t.FRAMES + ".file-preview-success").each(function() {
                var a = e(this),
                    r = i.$preview,
                    n = a.find(".kv-file-remove");
                n.removeAttr("disabled"), i._handler(n, "click", function() {
                    var e = a.attr("id"),
                        n = i._raise("filesuccessremove", [e, a.attr("data-fileindex")]);
                    t.cleanMemory(a), !1 !== n && a.fadeOut("slow", function() {
                        t.cleanZoomCache(r.find("#zoom-" + e)), a.remove(), i.getFrames().length || i.reset()
                    })
                })
            })
        },
        _updateInitialPreview: function() {
            var e, i, a = this.uploadCache,
                r = 0,
                n = this.cacheInitialPreview;
            if (n && n.content && (r = n.content.length), this.showPreview) {
                if (this.previewCache.set(a.content, a.config, a.tags, a.append), r) {
                    for (e = 0; e < a.content.length; e++) i = e + r, n.content[i] = a.content[e], n.config.length && (n.config[i] = a.config[e]), n.tags.length && (n.tags[i] = a.tags[e]);
                    this.initialPreview = t.cleanArray(n.content), this.initialPreviewConfig = t.cleanArray(n.config), this.initialPreviewThumbTags = t.cleanArray(n.tags)
                } else this.initialPreview = a.content, this.initialPreviewConfig = a.config, this.initialPreviewThumbTags = a.tags;
                this.cacheInitialPreview = {}, this.hasInitData && (this._initPreview(), this._initPreviewActions())
            }
        },
        _uploadSingle: function(i, a, r) {
            var n, s, o, l, d, c, u, p, h, f, m, g, v = this,
                w = v.fileManager,
                b = w.count(),
                _ = new FormData,
                y = v.previewInitId + "-" + i,
                C = b > 0 || !e.isEmptyObject(v.uploadExtraData),
                x = w.getFile(a),
                T = v.resumableManager,
                k = {
                    id: y,
                    index: i,
                    fileId: a
                },
                I = v.fileManager.getFileName(a, !0);
            if (v.enableResumableUpload) return v.paused = !1, v.cancelling = !1, w.initStats(a), void T.uploadSingle(a);
            v.showPreview && (s = v.fileManager.getThumb(a), u = s.find(".file-thumb-progress"), l = s.find(".kv-file-upload"), d = s.find(".kv-file-remove"), u.show()), 0 === b || !C || v.showPreview && l && l.hasClass("disabled") || v._abort(k) || (g = function() {
                c || v.fileManager.removeFile(a), v.fileManager.setProcessed(a), v.fileManager.isProcessed() && (v.fileBatchCompleted = !0)
            }, o = function() {
                var e;
                v.fileBatchCompleted && setTimeout(function() {
                    var i = 0 === v.fileManager.count();
                    v._updateInitialPreview(), v.unlock(i), i && v._clearFileInput(), e = v.$preview.find(".file-preview-initial"), v.uploadAsync && e.length && (t.addCss(e, t.SORT_CSS), v._initSortable()), v._raise("filebatchuploadcomplete", [v.fileManager.stack, v._getExtraData()]), v.fileManager.clear(), v._setProgress(101), v.ajaxAborted = !1
                }, v.processDelay)
            }, p = function(o) {
                n = v._getOutData(_, o), w.initStats(a), v.fileBatchCompleted = !1, r || (v.ajaxAborted = !1), v.showPreview && (s.hasClass("file-preview-success") || (v._setThumbStatus(s, "Loading"), t.addCss(s, "file-uploading")), l.attr("disabled", !0), d.attr("disabled", !0)), r || v.lock(), v._raise("filepreupload", [n, y, i]), e.extend(!0, k, n), v._abort(k) && (o.abort(), r || (v._setThumbStatus(s, "New"), s.removeClass("file-uploading"), l.removeAttr("disabled"), d.removeAttr("disabled"), v.unlock()), v._setProgressCancelled())
            }, h = function(a, o, d) {
                var p = v.showPreview && s.attr("id") ? s.attr("id") : y;
                n = v._getOutData(_, d, a), e.extend(!0, k, n), setTimeout(function() {
                    t.isEmpty(a) || t.isEmpty(a.error) ? (v.showPreview && (v._setThumbStatus(s, "Success"), l.hide(), v._initUploadSuccess(a, s, r), v._setProgress(101, u)), v._raise("fileuploaded", [n, p, i]), r ? g() : v.fileManager.remove(s)) : (c = !0, v._showUploadError(a.error, k), v._setPreviewError(s, !0), v.retryErrorUploads || l.hide(), r && g(), v._setProgress(101, e("#" + p).find(".file-thumb-progress"), v.msgUploadError))
                }, v.processDelay)
            }, f = function() {
                setTimeout(function() {
                    v.showPreview && (l.removeAttr("disabled"), d.removeAttr("disabled"), s.removeClass("file-uploading")), r ? o() : (v.unlock(!1), v._clearFileInput()), v._initSuccessThumbs()
                }, v.processDelay)
            }, m = function(t, i, n) {
                var o = v.ajaxOperations.uploadThumb,
                    d = v._parseError(o, t, n, v.fileManager.getFileName(a));
                c = !0, setTimeout(function() {
                    r && g(), v.fileManager.setProgress(a, 100), v._setPreviewError(s, !0), v.retryErrorUploads || l.hide(), e.extend(!0, k, v._getOutData(_, t)), v._setProgress(101, u, v.msgAjaxProgressError.replace("{operation}", o)), v._setProgress(101, s.find(".file-thumb-progress"), v.msgUploadError), v._showUploadError(d, k)
                }, v.processDelay)
            }, _.append(v.uploadFileAttr, x.file, I), v._setUploadData(_, {
                fileId: a
            }), v._ajaxSubmit(p, h, f, m, _, a, i))
        },
        _uploadBatch: function() {
            var i, a, r, n, s, o = this,
                l = o.fileManager,
                d = l.total(),
                c = d > 0 || !e.isEmptyObject(o.uploadExtraData),
                u = new FormData;
            if (0 !== d && c && !o._abort({})) {
                s = function() {
                    o.fileManager.clear(), o._clearFileInput()
                }, i = function(i) {
                    o.lock(), l.initStats();
                    var a = o._getOutData(u, i);
                    o.ajaxAborted = !1, o.showPreview && o._getThumbs().each(function() {
                        var i = e(this),
                            a = i.find(".kv-file-upload"),
                            r = i.find(".kv-file-remove");
                        i.hasClass("file-preview-success") || (o._setThumbStatus(i, "Loading"), t.addCss(i, "file-uploading")), a.attr("disabled", !0), r.attr("disabled", !0)
                    }), o._raise("filebatchpreupload", [a]), o._abort(a) && (i.abort(), o._getThumbs().each(function() {
                        var t = e(this),
                            i = t.find(".kv-file-upload"),
                            a = t.find(".kv-file-remove");
                        t.hasClass("file-preview-loading") && (o._setThumbStatus(t, "New"), t.removeClass("file-uploading")), i.removeAttr("disabled"), a.removeAttr("disabled")
                    }), o._setProgressCancelled())
                }, a = function(i, a, r) {
                    var n = o._getOutData(u, r, i),
                        l = 0,
                        d = o._getThumbs(":not(.file-preview-success)"),
                        c = t.isEmpty(i) || t.isEmpty(i.errorkeys) ? [] : i.errorkeys;
                    t.isEmpty(i) || t.isEmpty(i.error) ? (o._raise("filebatchuploadsuccess", [n]), s(), o.showPreview ? (d.each(function() {
                        var t = e(this);
                        o._setThumbStatus(t, "Success"), t.removeClass("file-uploading"), t.find(".kv-file-upload").hide().removeAttr("disabled")
                    }), o._initUploadSuccess(i)) : o.reset(), o._setProgress(101)) : (o.showPreview && (d.each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), t.find(".kv-file-upload").removeAttr("disabled"), t.find(".kv-file-remove").removeAttr("disabled"), 0 === c.length || -1 !== e.inArray(l, c) ? (o._setPreviewError(t, !0), o.retryErrorUploads || (t.find(".kv-file-upload").hide(), o.fileManager.remove(t))) : (t.find(".kv-file-upload").hide(), o._setThumbStatus(t, "Success"), o.fileManager.remove(t)), t.hasClass("file-preview-error") && !o.retryErrorUploads || l++
                    }), o._initUploadSuccess(i)), o._showUploadError(i.error, n, "filebatchuploaderror"), o._setProgress(101, o.$progress, o.msgUploadError))
                }, n = function() {
                    o.unlock(), o._initSuccessThumbs(), o._clearFileInput(), o._raise("filebatchuploadcomplete", [o.fileManager.stack, o._getExtraData()])
                }, r = function(t, i, a) {
                    var r = o._getOutData(u, t),
                        n = o.ajaxOperations.uploadBatch,
                        s = o._parseError(n, t, a);
                    o._showUploadError(s, r, "filebatchuploaderror"), o.uploadFileCount = d - 1, o.showPreview && (o._getThumbs().each(function() {
                        var t = e(this);
                        t.removeClass("file-uploading"), o.fileManager.getFile(t.attr("data-fileid")) && o._setPreviewError(t)
                    }), o._getThumbs().removeClass("file-uploading"), o._getThumbs(" .kv-file-upload").removeAttr("disabled"), o._getThumbs(" .kv-file-delete").removeAttr("disabled"), o._setProgress(101, o.$progress, o.msgAjaxProgressError.replace("{operation}", n)))
                };
                var p = 0;
                e.each(o.fileManager.stack, function(e, i) {
                    t.isEmpty(i.file) || u.append(o.uploadFileAttr, i.file, i.nameFmt || "untitled_" + p), p++
                }), o._ajaxSubmit(i, a, n, r, u)
            }
        },
        _uploadExtraOnly: function() {
            var e, i, a, r, n = this,
                s = {},
                o = new FormData;
            n._abort(s) || (e = function(e) {
                n.lock();
                var t = n._getOutData(o, e);
                n._raise("filebatchpreupload", [t]), n._setProgress(50), s.data = t, s.xhr = e, n._abort(s) && (e.abort(), n._setProgressCancelled())
            }, i = function(e, i, a) {
                var r = n._getOutData(o, a, e);
                t.isEmpty(e) || t.isEmpty(e.error) ? (n._raise("filebatchuploadsuccess", [r]), n._clearFileInput(), n._initUploadSuccess(e), n._setProgress(101)) : n._showUploadError(e.error, r, "filebatchuploaderror")
            }, a = function() {
                n.unlock(), n._clearFileInput(), n._raise("filebatchuploadcomplete", [n.fileManager.stack, n._getExtraData()])
            }, r = function(e, t, i) {
                var a = n._getOutData(o, e),
                    r = n.ajaxOperations.uploadExtra,
                    l = n._parseError(r, e, i);
                s.data = a, n._showUploadError(l, a, "filebatchuploaderror"), n._setProgress(101, n.$progress, n.msgAjaxProgressError.replace("{operation}", r))
            }, n._ajaxSubmit(e, i, a, r, o))
        },
        _deleteFileIndex: function(i) {
            var a = i.attr("data-fileindex"),
                r = this.reversePreviewOrder;
            "init_" === a.substring(0, 5) && (a = parseInt(a.replace("init_", "")), this.initialPreview = t.spliceArray(this.initialPreview, a, r), this.initialPreviewConfig = t.spliceArray(this.initialPreviewConfig, a, r), this.initialPreviewThumbTags = t.spliceArray(this.initialPreviewThumbTags, a, r), this.getFrames().each(function() {
                var t = e(this),
                    i = t.attr("data-fileindex");
                "init_" === i.substring(0, 5) && (i = parseInt(i.replace("init_", ""))) > a && (i--, t.attr("data-fileindex", "init_" + i))
            }), (this.uploadAsync || this.enableResumableUpload) && (this.cacheInitialPreview = this.getPreview()))
        },
        _initFileActions: function() {
            var i = this,
                a = i.$preview;
            i.showPreview && (i._initZoomButton(), i.getFrames(" .kv-file-remove").each(function() {
                var r, n, s, o = e(this),
                    l = o.closest(t.FRAMES),
                    d = l.attr("id"),
                    c = l.attr("data-fileindex");
                i._handler(o, "click", function() {
                    if (!1 === i._raise("filepreremove", [d, c]) || !i._validateMinCount()) return !1;
                    r = l.hasClass("file-preview-error"), t.cleanMemory(l), l.fadeOut("slow", function() {
                        t.cleanZoomCache(a.find("#zoom-" + d)), i.fileManager.remove(l), i._clearObjects(l), l.remove(), d && r && i.$errorContainer.find('li[data-thumb-id="' + d + '"]').fadeOut("fast", function() {
                            e(this).remove(), i._errorsExist() || i._resetErrors()
                        }), i._clearFileInput();
                        var o, u = i.previewCache.count(!0),
                            p = i.fileManager.count(),
                            h = i.showPreview && i.getFrames().length;
                        0 !== p || 0 !== u || h ? ((n = u + p) > 1 ? s = i._getMsgSelected(n) : (o = i.fileManager.getFirstFile(), s = o ? o.nameFmt : "_"), i._setCaption(s)) : i.reset(), i._raise("fileremoved", [d, c])
                    })
                })
            }), i.getFrames(" .kv-file-upload").each(function() {
                var a = e(this);
                i._handler(a, "click", function() {
                    var e = a.closest(t.FRAMES),
                        r = e.attr("data-fileid");
                    i.$progress.hide(), e.hasClass("file-preview-error") && !i.retryErrorUploads || i._uploadSingle(i.fileManager.getIndex(r), r, !1)
                })
            }))
        },
        _initPreviewActions: function() {
            var i = this,
                a = i.$preview,
                r = i.deleteExtraData || {},
                n = t.FRAMES + " .kv-file-remove",
                s = i.fileActionSettings,
                o = s.removeClass,
                l = s.removeErrorClass,
                d = function() {
                    var e = i.isAjaxUpload ? i.previewCache.count(!0) : i._inputFileCount();
                    i.getFrames().length || e || (i._setCaption(""), i.reset(), i.initialCaption = "")
                };
            i._initZoomButton(), a.find(n).each(function() {
                var n, s, c, u = e(this),
                    p = u.data("url") || i.deleteUrl,
                    h = u.data("key");
                if (!t.isEmpty(p) && void 0 !== h) {
                    "function" == typeof p && (p = p());
                    var f, m, g, v, w = u.closest(t.FRAMES),
                        b = i.previewCache.data,
                        _ = w.attr("data-fileindex");
                    _ = parseInt(_.replace("init_", "")), g = t.isEmpty(b.config) && t.isEmpty(b.config[_]) ? null : b.config[_], "function" == typeof(v = t.isEmpty(g) || t.isEmpty(g.extra) ? r : g.extra) && (v = v()), m = {
                        id: u.attr("id"),
                        key: h,
                        extra: v
                    }, n = function(e) {
                        i.ajaxAborted = !1, i._raise("filepredelete", [h, e, v]), i._abort() ? e.abort() : (u.removeClass(l), t.addCss(w, "file-uploading"), t.addCss(u, "disabled " + o))
                    }, s = function(e, r, n) {
                        var s, c;
                        if (!t.isEmpty(e) && !t.isEmpty(e.error)) return m.jqXHR = n, m.response = e, i._showError(e.error, m, "filedeleteerror"), w.removeClass("file-uploading"), u.removeClass("disabled " + o).addClass(l), void d();
                        w.removeClass("file-uploading").addClass("file-deleted"), w.fadeOut("slow", function() {
                            _ = parseInt(w.attr("data-fileindex").replace("init_", "")), i.previewCache.unset(_), i._deleteFileIndex(w), s = i.previewCache.count(!0), c = s > 0 ? i._getMsgSelected(s) : "", i._setCaption(c), i._raise("filedeleted", [h, n, v]), t.cleanZoomCache(a.find("#zoom-" + w.attr("id"))), i._clearObjects(w), w.remove(), d()
                        })
                    }, c = function(e, t, a) {
                        var r = i.ajaxOperations.deleteThumb,
                            n = i._parseError(r, e, a);
                        m.jqXHR = e, m.response = {}, i._showError(n, m, "filedeleteerror"), w.removeClass("file-uploading"), u.removeClass("disabled " + o).addClass(l), d()
                    }, i._initAjaxSettings(), i._mergeAjaxCallback("beforeSend", n, "delete"), i._mergeAjaxCallback("success", s, "delete"), i._mergeAjaxCallback("error", c, "delete"), f = e.extend(!0, {}, {
                        url: i._encodeURI(p),
                        type: "POST",
                        dataType: "json",
                        data: e.extend(!0, {}, {
                            key: h
                        }, v)
                    }, i._ajaxDeleteSettings), i._handler(u, "click", function() {
                        if (!i._validateMinCount()) return !1;
                        i.ajaxAborted = !1, i._raise("filebeforedelete", [h, v]), i.ajaxAborted instanceof Promise ? i.ajaxAborted.then(function(t) {
                            t || e.ajax(f)
                        }) : i.ajaxAborted || e.ajax(f)
                    })
                }
            })
        },
        _hideFileIcon: function() {
            this.overwriteInitial && this.$captionContainer.removeClass("icon-visible")
        },
        _showFileIcon: function() {
            t.addCss(this.$captionContainer, "icon-visible")
        },
        _getSize: function(t, i) {
            var a, r, n = parseFloat(t),
                s = this.fileSizeGetter;
            return e.isNumeric(t) && e.isNumeric(n) ? ("function" == typeof s ? r = s(n) : 0 === n ? r = "0.00 B" : (a = Math.floor(Math.log(n) / Math.log(1024)), i || (i = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]), r = 1 * (n / Math.pow(1024, a)).toFixed(2) + " " + i[a]), this._getLayoutTemplate("size").replace("{sizeText}", r)) : ""
        },
        _getFileType: function(e) {
            return this.mimeTypeAliases[e] || e
        },
        _generatePreviewTemplate: function(i, a, r, n, s, o, l, d, c, u, p, h, f, m) {
            var g, v, w = this,
                b = w.slug(r),
                _ = "",
                y = "",
                C = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                x = w.preferIconicPreview ? "other" : i,
                T = b,
                k = b,
                I = u || w._renderFileFooter(i, b, d, "auto", l),
                P = w._getPreviewIcon(r),
                S = "type-default",
                E = P && w.preferIconicPreview,
                F = P && w.preferIconicZoomPreview;
            return (g = C < 400 ? w.previewSettingsSmall[x] || w.defaults.previewSettingsSmall[x] : w.previewSettings[x] || w.defaults.previewSettings[x]) && e.each(g, function(e, t) {
                y += e + ":" + t + ";"
            }), v = function(a, l, d, u) {
                var m = d ? "zoom-" + s : s,
                    g = w._getPreviewTemplate(a),
                    v = (c || "") + " " + u;
                return w.frameClass && (v = w.frameClass + " " + v), d && (v = v.replace(" " + t.SORT_CSS, "")), g = w._parseFilePreviewIcon(g, r), "text" === a && (l = t.htmlEncode(l)), "object" !== i || n || e.each(w.defaults.fileTypeSettings, function(e, t) {
                    "object" !== e && "other" !== e && t(r, n) && (S = "type-" + e)
                }), t.isEmpty(f) || (void 0 !== f.title && null !== f.title && (T = f.title), void 0 !== f.alt && null !== f.alt && (T = f.alt)), g.setTokens({
                    previewId: m,
                    caption: b,
                    title: T,
                    alt: k,
                    frameClass: v,
                    type: w._getFileType(n),
                    fileindex: p,
                    fileid: o || "",
                    typeCss: S,
                    footer: I,
                    data: l,
                    template: h || i,
                    style: y ? 'style="' + y + '"' : ""
                })
            }, p = p || s.slice(s.lastIndexOf("-") + 1), w.fileActionSettings.showZoom && (_ = v(F ? "other" : i, m || a, !0, "kv-zoom-thumb")), _ = "\n" + w._getLayoutTemplate("zoomCache").replace("{zoomContent}", _), "function" == typeof w.sanitizeZoomCache && (_ = w.sanitizeZoomCache(_)), v(E ? "other" : i, a, !1, "kv-preview-thumb") + _
        },
        _addToPreview: function(e, t) {
            return this.reversePreviewOrder ? e.prepend(t) : e.append(t)
        },
        _previewDefault: function(i, a, r) {
            var n = this.$preview;
            if (this.showPreview) {
                var s, o = t.getFileName(i),
                    l = i ? i.type : "",
                    d = i.size || 0,
                    c = this._getFileName(i, ""),
                    u = !0 === r && !this.isAjaxUpload,
                    p = t.createObjectURL(i),
                    h = this.fileManager.getId(i);
                this._clearDefaultPreview(), s = this._generatePreviewTemplate("other", p, o, l, a, h, u, d), this._addToPreview(n, s), this._setThumbAttr(a, c, d), !0 === r && this.isAjaxUpload && this._setThumbStatus(e("#" + a), "Error")
            }
        },
        canPreview: function(e) {
            if (!(e && this.showPreview && this.$preview && this.$preview.length)) return !1;
            var i, a, r, n = e.name || "",
                s = e.type || "",
                o = (e.size || 0) / 1e3,
                l = this._parseFileType(s, n),
                d = this.allowedPreviewTypes,
                c = this.allowedPreviewMimeTypes,
                u = this.allowedPreviewExtensions || [],
                p = this.disabledPreviewTypes,
                h = this.disabledPreviewMimeTypes,
                f = this.disabledPreviewExtensions || [],
                m = this.maxFilePreviewSize && parseFloat(this.maxFilePreviewSize) || 0,
                g = new RegExp("\\.(" + u.join("|") + ")$", "i"),
                v = new RegExp("\\.(" + f.join("|") + ")$", "i");
            return i = !d || -1 !== d.indexOf(l), a = !c || -1 !== c.indexOf(s), r = !u.length || t.compare(n, g), !(p && -1 !== p.indexOf(l) || h && -1 !== h.indexOf(s) || f.length && t.compare(n, v) || m && !isNaN(m) && o > m) && (i || a || r)
        },
        _previewFile: function(e, i, a, r, n, s) {
            if (this.showPreview) {
                var o, l = t.getFileName(i),
                    d = s.type,
                    c = s.name,
                    u = this._parseFileType(d, l),
                    p = this.$preview,
                    h = i.size || 0,
                    f = "text" === u || "html" === u || "image" === u ? a.target.result : n,
                    m = this.fileManager.getId(i);
                "html" === u && this.purifyHtml && window.DOMPurify && (f = window.DOMPurify.sanitize(f)), o = this._generatePreviewTemplate(u, f, l, d, r, m, !1, h), this._clearDefaultPreview(), this._addToPreview(p, o);
                var g = p.find("#" + r),
                    v = g.find("img"),
                    w = g.attr("data-fileid");
                this._validateImageOrientation(v, i, r, w, c, d, h, f), this._setThumbAttr(r, c, h), this._initSortable()
            }
        },
        _setThumbAttr: function(t, i, a) {
            var r = e("#" + t);
            r.length && (a = a && a > 0 ? this._getSize(a) : "", r.data({
                caption: i,
                size: a
            }))
        },
        _setInitThumbAttr: function() {
            var e, i, a, r, n = this.previewCache.data,
                s = this.previewCache.count(!0);
            if (0 !== s)
                for (var o = 0; o < s; o++) e = n.config[o], r = this.previewInitId + "-init_" + o, i = t.ifSet("caption", e, t.ifSet("filename", e)), a = t.ifSet("size", e), this._setThumbAttr(r, i, a)
        },
        _slugDefault: function(e) {
            return t.isEmpty(e) ? "" : String(e).replace(/[\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, "_")
        },
        _updateFileDetails: function(e) {
            var i, a, r, n, s = this.$element,
                o = t.isIE(9) && t.findFileName(s.val()) || s[0].files[0] && s[0].files[0].name;
            i = !o && this.fileManager.count() > 0 ? this.fileManager.getFirstFile().nameFmt : o ? this.slug(o) : "_", a = this.isAjaxUpload ? this.fileManager.count() : e, n = this.previewCache.count(!0) + a, r = 1 === a ? i : this._getMsgSelected(n), this.isError ? (this.$previewContainer.removeClass("file-thumb-loading"), this.$previewStatus.html(""), this.$captionContainer.removeClass("icon-visible")) : this._showFileIcon(), this._setCaption(r, this.isError), this.$container.removeClass("file-input-new file-input-ajax-new"), 1 === arguments.length && this._raise("fileselect", [e, i]), this.previewCache.count(!0) && this._initPreviewActions()
        },
        _setThumbStatus: function(e, t) {
            if (this.showPreview) {
                var i = "indicator" + t,
                    a = i + "Title",
                    r = "file-preview-" + t.toLowerCase(),
                    n = e.find(".file-upload-indicator"),
                    s = this.fileActionSettings;
                e.removeClass("file-preview-success file-preview-error file-preview-loading"), "Success" === t && e.find(".file-drag-handle").remove(), n.html(s[i]), n.attr("title", s[a]), e.addClass(r), "Error" !== t || this.retryErrorUploads || e.find(".kv-file-upload").attr("disabled", !0)
            }
        },
        _setProgressCancelled: function() {
            this._setProgress(101, this.$progress, this.msgCancelled)
        },
        _setProgress: function(e, i, a, r) {
            var n, s = Math.min(e, 100),
                o = this.progressUploadThreshold,
                l = e <= 100 ? this.progressTemplate : this.progressCompleteTemplate,
                d = s < 100 ? this.progressTemplate : a ? this.paused ? this.progressPauseTemplate : this.progressErrorTemplate : l;
            i = i || this.$progress, e >= 100 && (r = ""), t.isEmpty(d) || (r = r || "", n = (n = o && s > o && e <= 100 ? d.setTokens({
                percent: o,
                status: this.msgUploadThreshold
            }) : d.setTokens({
                percent: s,
                status: e > 100 ? this.msgUploadEnd : s + "%"
            })).setTokens({
                stats: r
            }), i.html(n), a && i.find('[role="progressbar"]').html(a))
        },
        _setFileDropZoneTitle: function() {
            var e, i = this.$container.find(".file-drop-zone"),
                a = this.dropZoneTitle;
            this.isClickable && (e = t.isEmpty(this.$element.attr("multiple")) ? this.fileSingle : this.filePlural, a += this.dropZoneClickTitle.replace("{files}", e)), i.find("." + this.dropZoneTitleClass).remove(), !this.showPreview || 0 === i.length || this.fileManager.count() > 0 || !this.dropZoneEnabled || !this.isAjaxUpload && this.$element.files || (0 === i.find(t.FRAMES).length && t.isEmpty(this.defaultPreviewContent) && i.prepend('<div class="' + this.dropZoneTitleClass + '">' + a + "</div>"), this.$container.removeClass("file-input-new"), t.addCss(this.$container, "file-input-ajax-new"))
        },
        _getStats: function(e) {
            var i, a;
            return this.showUploadStats && e && e.bitrate ? (a = this._getLayoutTemplate("stats"), i = e.elapsed && e.bps ? this.msgPendingTime.setTokens({
                time: t.getElapsed(Math.ceil(e.pendingBytes / e.bps))
            }) : this.msgCalculatingTime, a.setTokens({
                uploadSpeed: e.bitrate,
                pendingTime: i
            })) : ""
        },
        _setResumableProgress: function(e, t, i) {
            var a = this.resumableManager,
                r = i ? a : this,
                n = i ? i.find(".file-thumb-progress") : null;
            0 === r.lastProgress && (r.lastProgress = e), e < r.lastProgress && (e = r.lastProgress), this._setProgress(e, n, null, this._getStats(t)), r.lastProgress = e
        },
        _setFileUploadStats: function(i, a, r, n) {
            var s, o = this.fileManager,
                l = o.getThumb(i),
                d = this.resumableManager,
                c = 0,
                u = o.getTotalSize(),
                p = e.extend(!0, {}, n);
            if (this.enableResumableUpload) {
                var h, f = n.loaded,
                    m = d.getUploadedSize(),
                    g = d.file.size;
                f += m, h = o.uploadedSize + f, a = t.round(100 * f / g), n.pendingBytes = g - m, this._setResumableProgress(a, n, l), s = Math.floor(100 * h / u), p.pendingBytes = u - h, this._setResumableProgress(s, p)
            } else o.setProgress(i, a), this._setProgress(a, l.find(".file-thumb-progress"), null, this._getStats(n)), e.each(o.stats, function(e, t) {
                c += t.loaded
            }), p.pendingBytes = u - c, s = t.round(c / u * 100), this._setProgress(s, null, null, this._getStats(p))
        },
        _validateMinCount: function() {
            var e = this.isAjaxUpload ? this.fileManager.count() : this._inputFileCount();
            return !(this.validateInitialCount && this.minFileCount > 0 && this._getFileCount(e - 1) < this.minFileCount) || (this._noFilesError({}), !1)
        },
        _getFileCount: function(e) {
            return this.validateInitialCount && !this.overwriteInitial && (e += this.previewCache.count(!0)), e
        },
        _getFileId: function(e) {
            return t.getFileId(e, this.generateFileId)
        },
        _getFileName: function(e, i) {
            var a = t.getFileName(e);
            return a ? this.slug(a) : i
        },
        _getFileNames: function(e) {
            return this.filenames.filter(function(t) {
                return e ? void 0 !== t : null != t
            })
        },
        _setPreviewError: function(e, t) {
            var i = this.removeFromPreviewOnError && !this.retryErrorUploads;
            t && !i || this.fileManager.remove(e), this.showPreview && (i ? e.remove() : (this._setThumbStatus(e, "Error"), this._refreshUploadButton(e)))
        },
        _refreshUploadButton: function(e) {
            var t = e.find(".kv-file-upload"),
                i = this.fileActionSettings,
                a = i.uploadIcon,
                r = i.uploadTitle;
            t.length && (this.retryErrorUploads && (a = i.uploadRetryIcon, r = i.uploadRetryTitle), t.attr("title", r).html(a))
        },
        _checkDimensions: function(e, i, a, r, n, s, o) {
            var l, d, c, u = this[("Small" === i ? "min" : "max") + "Image" + s];
            !t.isEmpty(u) && a.length && (c = a[0], d = "Width" === s ? c.naturalWidth || c.width : c.naturalHeight || c.height, ("Small" === i ? d >= u : d <= u) || (l = this["msgImage" + s + i].setTokens({
                name: n,
                size: u
            }), this._showUploadError(l, o), this._setPreviewError(r)))
        },
        _getExifObj: function(e) {
            var t = null;
            if ("data:image/jpeg;base64," === e.slice(0, 23) || "data:image/jpg;base64," === e.slice(0, 22)) {
                try {
                    t = window.piexif ? window.piexif.load(e) : null
                } catch (e) {
                    t = null, this._log(e)
                }
                return t || this._log("Error loading the piexif.js library."), t
            }
            t = null
        },
        _validateImageOrientation: function(e, i, a, r, n, s, o, l) {
            var d, c, u = this.autoOrientImage;
            (c = (d = e.length && u ? this._getExifObj(l) : null) ? d["0th"][piexif.ImageIFD.Orientation] : null) ? (t.setImageOrientation(e, this.$preview.find("#zoom-" + a + " img"), c), this._raise("fileimageoriented", {
                $img: e,
                file: i
            }), this._validateImage(a, r, n, s, o, l, d)) : this._validateImage(a, r, n, s, o, l, d)
        },
        _validateImage: function(t, i, a, r, n, s, o) {
            var l, d, c, u = this,
                p = u.$preview,
                h = p.find("#" + t),
                f = h.attr("data-fileindex"),
                m = h.find("img");
            a = a || "Untitled", m.one("load", function() {
                d = h.width(), c = p.width(), d > c && m.css("width", "100%"), l = {
                    ind: f,
                    id: t,
                    fileId: i
                }, u._checkDimensions(f, "Small", m, h, a, "Width", l), u._checkDimensions(f, "Small", m, h, a, "Height", l), u.resizeImage || (u._checkDimensions(f, "Large", m, h, a, "Width", l), u._checkDimensions(f, "Large", m, h, a, "Height", l)), u._raise("fileimageloaded", [t]), u.fileManager.addImage(i, {
                    ind: f,
                    img: m,
                    thumb: h,
                    pid: t,
                    typ: r,
                    siz: n,
                    validated: !1,
                    imgData: s,
                    exifObj: o
                }), h.data("exif", o), u._validateAllImages()
            }).one("error", function() {
                u._raise("fileimageloaderror", [t])
            }).each(function() {
                this.complete ? e(this).trigger("load") : this.error && e(this).trigger("error")
            })
        },
        _validateAllImages: function() {
            var t, i = this,
                a = {
                    val: 0
                },
                r = i.fileManager.getImageCount(),
                n = i.resizeIfSizeMoreThan;
            r === i.fileManager.totalImages && (i._raise("fileimagesloaded"), i.resizeImage && e.each(i.fileManager.loadedImages, function(e, s) {
                s.validated || ((t = s.siz) && t > 1e3 * n && i._getResizedImage(e, s, a, r), s.validated = !0)
            }))
        },
        _getResizedImage: function(i, a, r, n) {
            var s, o, l, d, c, u, p, h, f, m = this,
                g = e(a.img)[0],
                v = g.naturalWidth,
                w = g.naturalHeight,
                b = 1,
                _ = m.maxImageWidth || v,
                y = m.maxImageHeight || w,
                C = !(!v || !w),
                x = m.imageCanvas,
                T = m.imageCanvasContext,
                k = a.typ,
                I = a.pid,
                P = a.ind,
                S = a.thumb,
                E = a.exifObj;
            if (c = function(e, t, i) {
                    m.isAjaxUpload ? m._showUploadError(e, t, i) : m._showError(e, t, i), m._setPreviewError(S)
                }, h = {
                    id: I,
                    index: P,
                    fileId: i
                }, f = [i, I, P], (p = m.getFile(i)) && C && !(v <= _ && w <= y) || (C && p && m._raise("fileimageresized", f), r.val++, r.val === n && m._raise("fileimagesresized"), C)) {
                k = k || m.resizeDefaultImageType, o = v > _, l = w > y, b = "width" === m.resizePreference ? o ? _ / v : l ? y / w : 1 : l ? y / w : o ? _ / v : 1, m._resetCanvas(), v *= b, w *= b, x.width = v, x.height = w;
                try {
                    T.drawImage(g, 0, 0, v, w), d = x.toDataURL(k, m.resizeQuality), E && (u = window.piexif.dump(E), d = window.piexif.insert(u, d)), s = t.dataURI2Blob(d), m.fileManager.setFile(i, s), m._raise("fileimageresized", f), r.val++, r.val === n && m._raise("fileimagesresized", [void 0, void 0]), s instanceof Blob || c(m.msgImageResizeError, h, "fileimageresizeerror")
                } catch (e) {
                    r.val++, r.val === n && m._raise("fileimagesresized", [void 0, void 0]), c(m.msgImageResizeException.replace("{errors}", e.message), h, "fileimageresizeexception")
                }
            } else c(m.msgImageResizeError, h, "fileimageresizeerror")
        },
        _initBrowse: function(e) {
            var i = this.$element;
            this.showBrowse ? this.$btnFile = e.find(".btn-file").append(i) : (i.appendTo(e).attr("tabindex", -1), t.addCss(i, "file-no-browse"))
        },
        _initClickable: function() {
            var i, a, r = this;
            r.isClickable && (i = r.$dropZone, r.isAjaxUpload || (a = r.$preview.find(".file-default-preview")).length && (i = a), t.addCss(i, "clickable"), i.attr("tabindex", -1), r._handler(i, "click", function(t) {
                var a = e(t.target);
                e(r.elErrorContainer + ":visible").length || a.parents(".file-preview-thumbnails").length && !a.parents(".file-default-preview").length || (r.$element.data("zoneClicked", !0).trigger("click"), i.blur())
            }))
        },
        _initCaption: function() {
            var e = this.initialCaption || "";
            return this.overwriteInitial || t.isEmpty(e) ? (this.$caption.val(""), !1) : (this._setCaption(e), !0)
        },
        _setCaption: function(i, a) {
            var r, n, s, o, l, d;
            if (this.$caption.length) {
                if (this.$captionContainer.removeClass("icon-visible"), a) r = e("<div>" + this.msgValidationError + "</div>").text(), (o = this.fileManager.count()) ? (d = this.fileManager.getFirstFile(), l = 1 === o && d ? d.nameFmt : this._getMsgSelected(o)) : l = this._getMsgSelected(this.msgNo), n = t.isEmpty(i) ? l : i, s = '<span class="' + this.msgValidationErrorClass + '">' + this.msgValidationErrorIcon + "</span>";
                else {
                    if (t.isEmpty(i)) return;
                    n = r = e("<div>" + i + "</div>").text(), s = this._getLayoutTemplate("fileIcon")
                }
                this.$captionContainer.addClass("icon-visible"), this.$caption.attr("title", r).val(n), this.$captionIcon.html(s)
            }
        },
        _createContainer: function() {
            var t = {
                    class: "file-input file-input-new" + (this.rtl ? " kv-rtl" : "")
                },
                i = e(document.createElement("div")).attr(t).html(this._renderMain());
            return i.insertBefore(this.$element), this._initBrowse(i), this.theme && i.addClass("theme-" + this.theme), i
        },
        _refreshContainer: function() {
            var e = this.$container;
            this.$element.insertAfter(e), e.html(this._renderMain()), this._initBrowse(e), this._validateDisabled()
        },
        _validateDisabled: function() {
            this.$caption.attr({
                readonly: this.isDisabled
            })
        },
        _renderMain: function() {
            var e = this.dropZoneEnabled ? " file-drop-zone" : "file-drop-disabled",
                t = this.showClose ? this._getLayoutTemplate("close") : "",
                i = this.showPreview ? this._getLayoutTemplate("preview").setTokens({
                    class: this.previewClass,
                    dropClass: e
                }) : "",
                a = this.isDisabled ? this.captionClass + " file-caption-disabled" : this.captionClass,
                r = this.captionTemplate.setTokens({
                    class: a + " kv-fileinput-caption"
                });
            return this.mainTemplate.setTokens({
                class: this.mainClass + (!this.showBrowse && this.showCaption ? " no-browse" : ""),
                preview: i,
                close: t,
                caption: r,
                upload: this._renderButton("upload"),
                remove: this._renderButton("remove"),
                cancel: this._renderButton("cancel"),
                pause: this._renderButton("pause"),
                browse: this._renderButton("browse")
            })
        },
        _renderButton: function(e) {
            var i = this._getLayoutTemplate("btnDefault"),
                a = this[e + "Class"],
                r = this[e + "Title"],
                n = this[e + "Icon"],
                s = this[e + "Label"],
                o = this.isDisabled ? " disabled" : "",
                l = "button";
            switch (e) {
                case "remove":
                    if (!this.showRemove) return "";
                    break;
                case "cancel":
                    if (!this.showCancel) return "";
                    a += " kv-hidden";
                    break;
                case "pause":
                    if (!this.showPause) return "";
                    a += " kv-hidden";
                    break;
                case "upload":
                    if (!this.showUpload) return "";
                    this.isAjaxUpload && !this.isDisabled ? i = this._getLayoutTemplate("btnLink").replace("{href}", this.uploadUrl) : l = "submit";
                    break;
                case "browse":
                    if (!this.showBrowse) return "";
                    i = this._getLayoutTemplate("btnBrowse");
                    break;
                default:
                    return ""
            }
            return a += "browse" === e ? " btn-file" : " fileinput-" + e + " fileinput-" + e + "-button", t.isEmpty(s) || (s = ' <span class="' + this.buttonLabelClass + '">' + s + "</span>"), i.setTokens({
                type: l,
                css: a,
                title: r,
                status: o,
                icon: n,
                label: s
            })
        },
        _renderThumbProgress: function() {
            return '<div class="file-thumb-progress kv-hidden">' + this.progressInfoTemplate.setTokens({
                percent: 101,
                status: this.msgUploadBegin,
                stats: ""
            }) + "</div>"
        },
        _renderFileFooter: function(e, i, a, r, n) {
            var s, o, l = this.fileActionSettings,
                d = l.showRemove,
                c = l.showDrag,
                u = l.showUpload,
                p = l.showZoom,
                h = this._getLayoutTemplate("footer"),
                f = this._getLayoutTemplate("indicator"),
                m = n ? l.indicatorError : l.indicatorNew,
                g = n ? l.indicatorErrorTitle : l.indicatorNewTitle,
                v = f.setTokens({
                    indicator: m,
                    indicatorTitle: g
                });
            return o = {
                type: e,
                caption: i,
                size: a = this._getSize(a),
                width: r,
                progress: "",
                indicator: v
            }, this.isAjaxUpload ? (o.progress = this._renderThumbProgress(), o.actions = this._renderFileActions(o, u, !1, d, p, c, !1, !1, !1)) : o.actions = this._renderFileActions(o, !1, !1, !1, p, c, !1, !1, !1), s = h.setTokens(o), s = t.replaceTags(s, this.previewThumbTags)
        },
        _renderFileActions: function(e, t, i, a, r, n, s, o, l, d, c, u) {
            if (!e.type && d && (e.type = "image"), "function" == typeof t && (t = t(e)), "function" == typeof i && (i = i(e)), "function" == typeof a && (i = i(e)), "function" == typeof r && (r = r(e)), "function" == typeof n && (n = n(e)), !(t || i || i || r || n)) return "";
            var p, h = !1 === o ? "" : ' data-url="' + o + '"',
                f = !1 === l ? "" : ' data-key="' + l + '"',
                m = "",
                g = "",
                v = "",
                w = "",
                b = "",
                _ = this._getLayoutTemplate("actions"),
                y = this.fileActionSettings,
                C = this.otherActionButtons.setTokens({
                    dataKey: f,
                    key: l
                }),
                x = s ? y.removeClass + " disabled" : y.removeClass;
            return a && (m = this._getLayoutTemplate("actionDelete").setTokens({
                removeClass: x,
                removeIcon: y.removeIcon,
                removeTitle: y.removeTitle,
                dataUrl: h,
                dataKey: f,
                key: l
            })), t && (g = this._getLayoutTemplate("actionUpload").setTokens({
                uploadClass: y.uploadClass,
                uploadIcon: y.uploadIcon,
                uploadTitle: y.uploadTitle
            })), i && (v = (v = this._getLayoutTemplate("actionDownload").setTokens({
                downloadClass: y.downloadClass,
                downloadIcon: y.downloadIcon,
                downloadTitle: y.downloadTitle,
                downloadUrl: c || this.initialPreviewDownloadUrl
            })).setTokens({
                filename: u,
                key: l
            })), r && (w = this._getLayoutTemplate("actionZoom").setTokens({
                zoomClass: y.zoomClass,
                zoomIcon: y.zoomIcon,
                zoomTitle: y.zoomTitle
            })), n && d && (p = "drag-handle-init " + y.dragClass, b = this._getLayoutTemplate("actionDrag").setTokens({
                dragClass: p,
                dragTitle: y.dragTitle,
                dragIcon: y.dragIcon
            })), _.setTokens({
                delete: m,
                upload: g,
                download: v,
                zoom: w,
                drag: b,
                other: C
            })
        },
        _browse: function(e) {
            e && e.isDefaultPrevented() || !this._raise("filebrowse") || (this.isError && !this.isAjaxUpload && this.clear(), this.$captionContainer.focus())
        },
        _change: function(i) {
            var a = this;
            if (!a.changeTriggered) {
                var r, n, s, o, l, d, c, u, p, h, f, m, g = a.$element,
                    v = arguments.length > 1,
                    w = a.isAjaxUpload,
                    b = v ? arguments[1] : g.get(0).files,
                    _ = !w && t.isEmpty(g.attr("multiple")) ? 1 : a.maxFileCount,
                    y = a.fileManager.count(),
                    C = t.isEmpty(g.attr("multiple")) && y > 0;
                if (a.reader = null, a._resetUpload(), a._hideFileIcon(), a.dropZoneEnabled && a.$container.find(".file-drop-zone ." + a.dropZoneTitleClass).remove(), w || (b = i.target && void 0 === i.target.files ? i.target.value ? [{
                        name: i.target.value.replace(/^.+\\/, "")
                    }] : [] : i.target.files || {}), r = b, t.isEmpty(r) || 0 === r.length) return w || a.clear(), void a._raise("fileselectnone");
                if (a._resetErrors(), s = r.length, n = a._getFileCount(w ? a.fileManager.count() + s : s), _ > 0 && n > _) {
                    if (!a.autoReplace || s > _) return o = a.autoReplace && s > _ ? s : n, l = _, m = a.msgFilesTooMany.replace("{m}", l).replace("{n}", o), a.isError = (d = m, c = null, u = null, p = null, h = e.extend(!0, {}, a._getOutData(null, {}, {}, b), {
                        id: u,
                        index: p
                    }), f = {
                        id: u,
                        index: p,
                        file: c,
                        files: b
                    }, w ? a._showUploadError(d, h) : a._showError(d, f)), a.$captionContainer.removeClass("icon-visible"), a._setCaption("", !0), void a.$container.removeClass("file-input-new file-input-ajax-new");
                    n > _ && a._resetPreviewThumbs(w)
                } else !w || C ? (a._resetPreviewThumbs(!1), C && a.clearFileStack()) : !w || 0 !== y || a.previewCache.count(!0) && !a.overwriteInitial || a._resetPreviewThumbs(!0);
                a.readFiles(r)
            }
        },
        _abort: function(t) {
            var i;
            return this.ajaxAborted && "object" == typeof this.ajaxAborted && void 0 !== this.ajaxAborted.message ? ((i = e.extend(!0, {}, this._getOutData(null), t)).abortData = this.ajaxAborted.data || {}, i.abortMessage = this.ajaxAborted.message, this._setProgress(101, this.$progress, this.msgCancelled), this._showUploadError(this.ajaxAborted.message, i, "filecustomerror"), this.cancel(), !0) : !!this.ajaxAborted
        },
        _resetFileStack: function() {
            var i = this,
                a = 0;
            i._getThumbs().each(function() {
                var r = e(this),
                    n = r.attr("data-fileindex"),
                    s = r.attr("id");
                "-1" !== n && -1 !== n && (i.fileManager.getFile(r.attr("data-fileid")) ? r.attr({
                    id: "uploaded-" + t.uniqId(),
                    "data-fileindex": "-1"
                }) : (r.attr({
                    id: i.previewInitId + "-" + a,
                    "data-fileindex": a
                }), a++), i.$preview.find("#zoom-" + s).attr({
                    id: "zoom-" + r.attr("id"),
                    "data-fileindex": r.attr("data-fileindex")
                }))
            })
        },
        _isFileSelectionValid: function(e) {
            return e = e || 0, this.required && !this.getFilesCount() ? (this.$errorContainer.html(""), this._showUploadError(this.msgFileRequired), !1) : !(this.minFileCount > 0 && this._getFileCount(e) < this.minFileCount) || (this._noFilesError({}), !1)
        },
        clearFileStack: function() {
            return this.fileManager.clear(), this._initResumableUpload(), this.enableResumableUpload ? (null === this.showPause && (this.showPause = !0), null === this.showCancel && (this.showCancel = !1)) : (this.showPause = !1, null === this.showCancel && (this.showCancel = !0)), this.$element
        },
        getFileStack: function() {
            return this.files.stack
        },
        getFileList: function() {
            return this.files.list()
        },
        getFilesCount: function() {
            var e = this.isAjaxUpload ? this.fileManager.count() : this._inputFileCount();
            return this._getFileCount(e)
        },
        readFiles: function(i) {
            this.reader = new FileReader;
            var a, r = this,
                n = r.$element,
                s = r.reader,
                o = r.$previewContainer,
                l = r.$previewStatus,
                d = r.msgLoading,
                c = r.msgProgress,
                u = r.previewInitId,
                p = i.length,
                h = r.fileTypeSettings,
                f = r.fileManager.count(),
                m = r.allowedFileTypes,
                g = m ? m.length : 0,
                v = r.allowedFileExtensions,
                w = t.isEmpty(v) ? "" : v.join(", "),
                b = function(t, n, s, o, l) {
                    var d = e.extend(!0, {}, r._getOutData(null, {}, {}, i), {
                            id: s,
                            index: o,
                            fileId: l
                        }),
                        c = e("#" + s),
                        u = {
                            id: s,
                            index: o,
                            fileId: l,
                            file: n,
                            files: i
                        };
                    r._previewDefault(n, s, !0), r.isAjaxUpload ? setTimeout(function() {
                        a(o + 1)
                    }, r.processDelay) : p = 0, r._initFileActions(), c.remove(), r.isError = r.isAjaxUpload ? r._showUploadError(t, d) : r._showError(t, u), r._updateFileDetails(p)
                };
            r.fileManager.clearImages(), e.each(i, function(e, t) {
                var i = r.fileTypeSettings.image;
                i && i(t.type) && r.fileManager.totalImages++
            }), (a = function(_) {
                if (t.isEmpty(n.attr("multiple")) && (p = 1), _ >= p) return r.isAjaxUpload && r.fileManager.count() > 0 ? r._raise("filebatchselected", [r.fileManager.stack]) : r._raise("filebatchselected", [i]), o.removeClass("file-thumb-loading"), void l.html("");
                var y, C, x, T, k, I, P, S, E, F, z, A, D, M = u + "-" + (f + _),
                    U = i[_],
                    $ = h.text,
                    j = h.image,
                    R = h.html,
                    O = r._getFileName(U, ""),
                    B = (U && U.size || 0) / 1e3,
                    L = "",
                    Z = t.createObjectURL(U),
                    N = 0,
                    H = "",
                    q = 0,
                    W = function() {
                        var e = c.setTokens({
                            index: _ + 1,
                            files: p,
                            percent: 50,
                            name: O
                        });
                        setTimeout(function() {
                            l.html(e), r._updateFileDetails(p), a(_ + 1)
                        }, r.processDelay), r._raise("fileloaded", [U, M, _, s])
                    };
                if (U) {
                    if (S = r.fileManager.getId(U), g > 0)
                        for (C = 0; C < g; C++) I = m[C], P = r.msgFileTypes[I] || I, H += 0 === C ? P : ", " + P;
                    if (!1 !== O) {
                        if (0 === O.length) return x = r.msgInvalidFileName.replace("{name}", t.htmlEncode(t.getFileName(U), "[unknown]")), void b(x, U, M, _, S);
                        if (t.isEmpty(v) || (L = new RegExp("\\.(" + v.join("|") + ")$", "i")), y = B.toFixed(2), r.maxFileSize > 0 && B > r.maxFileSize) return x = r.msgSizeTooLarge.setTokens({
                            name: O,
                            size: y,
                            maxSize: r.maxFileSize
                        }), void b(x, U, M, _, S);
                        if (null !== r.minFileSize && B <= t.getNum(r.minFileSize)) return x = r.msgSizeTooSmall.setTokens({
                            name: O,
                            size: y,
                            minSize: r.minFileSize
                        }), void b(x, U, M, _, S);
                        if (!t.isEmpty(m) && t.isArray(m)) {
                            for (C = 0; C < m.length; C += 1) T = m[C], N += (E = h[T]) && "function" == typeof E && E(U.type, t.getFileName(U)) ? 1 : 0;
                            if (0 === N) return x = r.msgInvalidFileType.setTokens({
                                name: O,
                                types: H
                            }), void b(x, U, M, _, S)
                        }
                        if (0 === N && !t.isEmpty(v) && t.isArray(v) && !t.isEmpty(L) && (k = t.compare(O, L), 0 === (N += t.isEmpty(k) ? 0 : k.length))) return x = r.msgInvalidFileExtension.setTokens({
                            name: O,
                            extensions: w
                        }), void b(x, U, M, _, S);
                        if (r.isAjaxUpload && r.fileManager.exists(S)) return x = r.msgDuplicateFile.setTokens({
                            name: O,
                            size: y
                        }), void b(x, U, M, _, S);
                        if (!r.canPreview(U)) return r.isAjaxUpload && r.fileManager.add(U), r.showPreview && (o.addClass("file-thumb-loading"), r._previewDefault(U, M), r._initFileActions()), void setTimeout(function() {
                            r._updateFileDetails(p), a(_ + 1), r._raise("fileloaded", [U, M, _])
                        }, 10);
                        F = $(U.type, O), z = R(U.type, O), A = j(U.type, O), l.html(d.replace("{index}", _ + 1).replace("{files}", p)), o.addClass("file-thumb-loading"), s.onerror = function(e) {
                            r._errorHandler(e, O)
                        }, s.onload = function(i) {
                            var a, n, o, l, d, c, u, p, f = [];
                            if (n = {
                                    name: O,
                                    type: U.type
                                }, e.each(h, function(e, t) {
                                    "object" !== e && "other" !== e && "function" == typeof t && t(U.type, O) && q++
                                }), 0 === q) {
                                for (o = new Uint8Array(i.target.result), C = 0; C < o.length; C++) l = o[C].toString(16), f.push(l);
                                if (a = f.join("").toLowerCase().substring(0, 8), c = t.getMimeType(a, "", ""), t.isEmpty(c) && (d = t.arrayBuffer2String(s.result), c = t.isSvg(d) ? "image/svg+xml" : t.getMimeType(a, d, U.type)), n = {
                                        name: O,
                                        type: c
                                    }, F = $(c, ""), z = R(c, ""), A = j(c, ""), (D = F || z) || A) return u = D, (p = new FileReader).onerror = function(e) {
                                    r._errorHandler(e, O)
                                }, p.onload = function(e) {
                                    r._previewFile(_, U, e, M, Z, n), r._initFileActions(), W()
                                }, void(u ? p.readAsText(U, r.textEncoding) : p.readAsDataURL(U))
                            }
                            r._previewFile(_, U, i, M, Z, n), r._initFileActions(), W()
                        }, s.onprogress = function(e) {
                            if (e.lengthComputable) {
                                var t = e.loaded / e.total * 100,
                                    i = Math.ceil(t);
                                x = c.setTokens({
                                    index: _ + 1,
                                    files: p,
                                    percent: i,
                                    name: O
                                }), setTimeout(function() {
                                    l.html(x)
                                }, r.processDelay)
                            }
                        }, F || z ? s.readAsText(U, r.textEncoding) : A ? s.readAsDataURL(U) : s.readAsArrayBuffer(U), r.fileManager.add(U)
                    } else a(_ + 1)
                }
            })(0), r._updateFileDetails(p, !1)
        },
        lock: function() {
            var e = this.$container;
            return this._resetErrors(), this.disable(), e.addClass("is-locked"), this.showCancel && e.find(".fileinput-cancel").show(), this.showPause && e.find(".fileinput-pause").show(), this._raise("filelock", [this.fileManager.stack, this._getExtraData()]), this.$element
        },
        unlock: function(e) {
            var t = this.$container;
            return void 0 === e && (e = !0), this.enable(), t.removeClass("is-locked"), this.showCancel && t.find(".fileinput-cancel").hide(), this.showPause && t.find(".fileinput-pause").hide(), e && this._resetFileStack(), this._raise("fileunlock", [this.fileManager.stack, this._getExtraData()]), this.$element
        },
        pause: function() {
            var t, i = this,
                a = i.resumableManager,
                r = i.ajaxRequests,
                n = r.length;
            if (i.enableResumableUpload) {
                if (a.chunkIntervalId && clearInterval(a.chunkIntervalId), i.ajaxQueueIntervalId && clearInterval(i.ajaxQueueIntervalId), i._raise("fileuploadpaused", [i.fileManager, a]), n > 0)
                    for (t = 0; t < n; t += 1) i.paused = !0, r[t].abort();
                return i.showPreview && (a.$btnUpload.removeAttr("disabled"), i._getThumbs().each(function() {
                    var t = e(this),
                        a = t.attr("data-fileid");
                    t.removeClass("file-uploading"), i.fileManager.getFile(a) || (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled"))
                })), i._setProgress(101, i.$progress, i.msgPaused), i.$element
            }
        },
        cancel: function() {
            var t, i = this,
                a = i.ajaxRequests,
                r = i.resumableManager,
                n = a.length;
            if (i.enableResumableUpload && r.chunkIntervalId ? (clearInterval(r.chunkIntervalId), r.reset(), i._raise("fileuploadcancelled", [i.fileManager, r])) : i._raise("fileuploadcancelled", [i.fileManager]), i.ajaxQueueIntervalId && clearInterval(i.ajaxQueueIntervalId), i._initAjax(), n > 0)
                for (t = 0; t < n; t += 1) i.cancelling = !0, a[t].abort();
            return i._getThumbs().each(function() {
                var t = e(this),
                    a = t.attr("data-fileid"),
                    r = t.find(".file-thumb-progress");
                t.removeClass("file-uploading"), i._setProgress(0, r), r.hide(), i.fileManager.getFile(a) || (t.find(".kv-file-upload").removeClass("disabled").removeAttr("disabled"), t.find(".kv-file-remove").removeClass("disabled").removeAttr("disabled")), i.unlock()
            }), setTimeout(function() {
                i._setProgressCancelled()
            }, i.processDelay), i.$element
        },
        clear: function() {
            var i, a = this;
            if (a._raise("fileclear")) return a.$btnUpload.removeAttr("disabled"), a._getThumbs().find("video,audio,img").each(function() {
                t.cleanMemory(e(this))
            }), a._clearFileInput(), a._resetUpload(), a.clearFileStack(), a._resetErrors(!0), a._hasInitialPreview() ? (a._showFileIcon(), a._resetPreview(), a._initPreviewActions(), a.$container.removeClass("file-input-new")) : (a._getThumbs().each(function() {
                a._clearObjects(e(this))
            }), a.isAjaxUpload && (a.previewCache.data = {}), a.$preview.html(""), i = !a.overwriteInitial && a.initialCaption.length > 0 ? a.initialCaption : "", a.$caption.attr("title", "").val(i), t.addCss(a.$container, "file-input-new"), a._validateDefaultPreview()), 0 === a.$container.find(t.FRAMES).length && (a._initCaption() || a.$captionContainer.removeClass("icon-visible")), a._hideFileIcon(), a.$captionContainer.focus(), a._setFileDropZoneTitle(), a._raise("filecleared"), a.$element
        },
        reset: function() {
            if (this._raise("filereset")) return this.lastProgress = 0, this._resetPreview(), this.$container.find(".fileinput-filename").text(""), t.addCss(this.$container, "file-input-new"), (this.getFrames().length || this.dropZoneEnabled) && this.$container.removeClass("file-input-new"), this.clearFileStack(), this._setFileDropZoneTitle(), this.$element
        },
        disable: function() {
            return this.isDisabled = !0, this._raise("filedisabled"), this.$element.attr("disabled", "disabled"), this.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled"), this.$container.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").attr("disabled", !0), t.addCss(this.$container.find(".btn-file"), "disabled"), this._initDragDrop(), this.$element
        },
        enable: function() {
            return this.isDisabled = !1, this._raise("fileenabled"), this.$element.removeAttr("disabled"), this.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled"), this.$container.find(".fileinput-remove, .fileinput-upload, .file-preview-frame button").removeAttr("disabled"), this.$container.find(".btn-file").removeClass("disabled"), this._initDragDrop(), this.$element
        },
        upload: function() {
            var i, a, r, n = this,
                s = n.fileManager,
                o = s.count(),
                l = n.resumableManager,
                d = !e.isEmptyObject(n._getExtraData()),
                c = n.$progress;
            if (n.isAjaxUpload && !n.isDisabled && n._isFileSelectionValid(o)) {
                if (n.lastProgress = 0, n._resetUpload(), 0 !== o || d) {
                    if (n.cancelling = !1, n.$progress.show(), n.lock(), r = s.count(), 0 === o && d) return n._setProgress(2), void n._uploadExtraOnly();
                    if (n.uploadAsync || n.enableResumableUpload) {
                        for (a = n._getOutData(null), n._raise("filebatchpreupload", [a]), n.fileBatchCompleted = !1, n.uploadCache = {
                                content: [],
                                config: [],
                                tags: [],
                                append: !0
                            }, i = 0; i < r; i++) n.uploadCache.content[i] = null, n.uploadCache.config[i] = null, n.uploadCache.tags[i] = null;
                        n.$preview.find(".file-preview-initial").removeClass(t.SORT_CSS), n._initSortable(), n.cacheInitialPreview = n.getPreview()
                    }
                    if (n.enableResumableUpload) {
                        var u = !1;
                        return n.paused ? c.html(n.progressPauseTemplate.setTokens({
                            percent: 101,
                            status: n.msgUploadResume,
                            stats: ""
                        })) : u = !0, n.paused = !1, u && c.html(n.progressInfoTemplate.setTokens({
                            percent: 101,
                            status: n.msgUploadBegin,
                            stats: ""
                        })), setTimeout(function() {
                            l.upload()
                        }, n.processDelay), n.$element
                    }
                    return n._setProgress(2), n.hasInitData = !1, n.uploadAsync ? (i = 0, void e.each(s.stack, function(e) {
                        n._uploadSingle(i, e, !0), i++
                    })) : (n._uploadBatch(), n.$element)
                }
                n._showUploadError(n.msgUploadEmpty)
            }
        },
        destroy: function() {
            var t = this.$form,
                i = this.$container,
                a = this.$element,
                r = this.namespace;
            return e(document).off(r), e(window).off(r), t && t.length && t.off(r), this.isAjaxUpload && this._clearFileInput(), this._cleanup(), this._initPreviewCache(), a.insertBefore(i).off(r).removeData(), i.off().remove(), a
        },
        refresh: function(i) {
            var a = this.$element;
            return i = "object" != typeof i || t.isEmpty(i) ? this.options : e.extend(!0, {}, this.options, i), this._init(i, !0), this._listen(), a
        },
        zoom: function(e) {
            var i = this._getFrame(e),
                a = this.$modal;
            i && (t.initModal(a), a.html(this._getModalContent()), this._setZoomContent(i), a.modal("show"), this._initZoomButtons())
        },
        getExif: function(e) {
            var t = this._getFrame(e);
            return t && t.data("exif") || null
        },
        getFrames: function(i) {
            var a;
            return i = i || "", a = this.$preview.find(t.FRAMES + i), this.reversePreviewOrder && (a = e(a.get().reverse())), a
        },
        getPreview: function() {
            return {
                content: this.initialPreview,
                config: this.initialPreviewConfig,
                tags: this.initialPreviewThumbTags
            }
        }
    }, e.fn.fileinput = function(a) {
        if (t.hasFileAPISupport() || t.isIE(9)) {
            var r = Array.apply(null, arguments),
                n = [];
            switch (r.shift(), this.each(function() {
                var s, o = e(this),
                    l = o.data("fileinput"),
                    d = "object" == typeof a && a,
                    c = d.theme || o.data("theme"),
                    u = {},
                    p = {},
                    h = d.language || o.data("language") || e.fn.fileinput.defaults.language || "en";
                l || (c && (p = e.fn.fileinputThemes[c] || {}), "en" === h || t.isEmpty(e.fn.fileinputLocales[h]) || (u = e.fn.fileinputLocales[h] || {}), s = e.extend(!0, {}, e.fn.fileinput.defaults, p, e.fn.fileinputLocales.en, u, d, o.data()), l = new i(this, s), o.data("fileinput", l)), "string" == typeof a && n.push(l[a].apply(l, r))
            }), n.length) {
                case 0:
                    return this;
                case 1:
                    return n[0];
                default:
                    return n
            }
        }
    }, e.fn.fileinput.defaults = {
        language: dil,
        showCaption: !0,
        showBrowse: !0,
        showPreview: !0,
        showRemove: !0,
        showUpload: !0,
        showUploadStats: !0,
        showCancel: null,
        showPause: null,
        showClose: !0,
        showUploadedThumbs: !0,
        browseOnZoneClick: !1,
        autoReplace: !1,
        autoOrientImage: function() {
            var e = window.navigator.userAgent,
                t = !!e.match(/WebKit/i);
            return !(!!e.match(/iP(od|ad|hone)/i) && t && !e.match(/CriOS/i))
        },
        autoOrientImageInitial: !0,
        required: !1,
        rtl: !1,
        hideThumbnailContent: !1,
        encodeUrl: !0,
        generateFileId: null,
        previewClass: "",
        captionClass: "",
        frameClass: "krajee-default",
        mainClass: "file-caption-main",
        mainTemplate: null,
        purifyHtml: !0,
        fileSizeGetter: null,
        initialCaption: "",
        initialPreview: [],
        initialPreviewDelimiter: "*$$*",
        initialPreviewAsData: !1,
        initialPreviewFileType: "image",
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: !0,
        initialPreviewDownloadUrl: "",
        removeFromPreviewOnError: !1,
        deleteUrl: "",
        deleteExtraData: {},
        overwriteInitial: !0,
        sanitizeZoomCache: function(t) {
            var i = e(document.createElement("div")).append(t);
            return i.find("input,select,.file-thumbnail-footer").remove(), i.html()
        },
        previewZoomButtonIcons: {
            prev: '<i class="glyphicon glyphicon-triangle-left"></i>',
            next: '<i class="glyphicon glyphicon-triangle-right"></i>',
            toggleheader: '<i class="glyphicon glyphicon-resize-vertical"></i>',
            fullscreen: '<i class="glyphicon glyphicon-fullscreen"></i>',
            borderless: '<i class="glyphicon glyphicon-resize-full"></i>',
            close: '<i class="glyphicon glyphicon-remove"></i>'
        },
        previewZoomButtonClasses: {
            prev: "btn btn-navigate",
            next: "btn btn-navigate",
            toggleheader: "btn btn-sm btn-kv btn-default btn-outline-secondary",
            fullscreen: "btn btn-sm btn-kv btn-default btn-outline-secondary",
            borderless: "btn btn-sm btn-kv btn-default btn-outline-secondary",
            close: "btn btn-sm btn-kv btn-default btn-outline-secondary"
        },
        previewTemplates: {},
        previewContentTemplates: {},
        preferIconicPreview: !1,
        preferIconicZoomPreview: !1,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        allowedPreviewTypes: void 0,
        allowedPreviewMimeTypes: null,
        allowedPreviewExtensions: null,
        disabledPreviewTypes: void 0,
        disabledPreviewExtensions: ["msi", "exe", "com", "zip", "rar", "app", "vb", "scr"],
        disabledPreviewMimeTypes: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: "file-other-icon",
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: "hidden-xs",
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>&nbsp;',
        browseClass: "btn btn-primary",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        removeClass: "btn btn-default btn-secondary",
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i>',
        cancelClass: "btn btn-default btn-secondary",
        pauseIcon: '<i class="glyphicon glyphicon-pause"></i>',
        pauseClass: "btn btn-default btn-secondary",
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
        uploadClass: "btn btn-default btn-secondary",
        uploadUrl: null,
        uploadUrlThumb: null,
        uploadAsync: !0,
        uploadParamNames: {
            chunkIndex: "chunkIndex",
            chunkCount: "chunkCount",
            chunkSize: "chunkSize",
            chunkSizeStart: "chunkSizeStart",
            chunksUploaded: "chunksUploaded",
            retryCount: "retryCount",
            fileId: "fileId",
            fileRelativePath: "fileRelativePath",
            fileSize: "fileSize",
            fileName: "fileName"
        },
        maxAjaxThreads: 5,
        processDelay: 100,
        queueDelay: 10,
        progressDelay: 0,
        enableResumableUpload: !1,
        resumableUploadOptions: {
            fallback: null,
            testUrl: null,
            chunkSize: 2048,
            maxThreads: 4,
            maxRetries: 3,
            showErrorLog: !0
        },
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: !1,
        resizePreference: "width",
        resizeQuality: .92,
        resizeDefaultImageType: "image/jpeg",
        resizeIfSizeMoreThan: 0,
        minFileSize: 0,
        maxFileSize: 0,
        maxFilePreviewSize: 25600,
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: !1,
        msgValidationErrorClass: "text-danger",
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: "file-error-message",
        progressThumbClass: "progress-bar progress-bar-striped active",
        progressClass: "progress-bar bg-success progress-bar-success progress-bar-striped active",
        progressInfoClass: "progress-bar bg-info progress-bar-info progress-bar-striped active",
        progressCompleteClass: "progress-bar bg-success progress-bar-success",
        progressPauseClass: "progress-bar bg-primary progress-bar-primary progress-bar-striped active",
        progressErrorClass: "progress-bar bg-danger progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: "image",
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: t.closeButton("kv-error-close"),
        slugCallback: null,
        dropZoneEnabled: !0,
        dropZoneTitleClass: "file-drop-zone-title",
        fileActionSettings: {},
        otherActionButtons: "",
        textEncoding: "UTF-8",
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: !0,
        mergeAjaxCallbacks: !1,
        mergeAjaxDeleteCallbacks: !1,
        retryErrorUploads: !0,
        reversePreviewOrder: !1,
        usePdfRenderer: function() {
            var e = !!window.MSInputMethodContext && !!document.documentMode;
            return !!navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/i) || e
        },
        pdfRendererUrl: "",
        pdfRendererTemplate: '<iframe class="kv-preview-data file-preview-pdf" src="{renderer}?file={data}" {style}></iframe>'
    }, e.fn.fileinputLocales.en = {
       fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        pauseLabel: 'Pause',
        pauseTitle: 'Pause ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgNo: 'No',
        msgNoFilesSelected: 'No files selected',
        msgPaused: 'Paused',
        msgCancelled: 'Cancelled',
        msgPlaceholder: 'Select {files}...',
        msgZoomModalHeading: 'Detailed Preview',
        msgFileRequired: 'You must select a file to upload.',
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'The file upload was aborted',
        msgUploadThreshold: 'Processing...',
        msgUploadBegin: 'Initializing...',
        msgUploadEnd: 'Done',
        msgUploadResume: 'Resuming upload...',
        msgUploadEmpty: 'No valid data available for upload.',
        msgUploadError: 'Error',
        msgValidationError: 'Validation Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgFoldersNotAllowed: 'Drag & drop files only! Skipped {n} dropped folder(s).',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        msgAjaxError: 'Something went wrong with the {operation} operation. Please try again later!',
        msgAjaxProgressError: '{operation} failed',
        msgDuplicateFile: 'File "{name}" of same size "{size} KB" has already been selected earlier. Skipping duplicate selection.',
        msgResumableUploadRetriesExceeded:  'Upload aborted beyond <b>{max}</b> retries for file <b>{file}</b>! Error Details: <pre>{error}</pre>',
        msgPendingTime: '{time} remaining',
        msgCalculatingTime: 'calculating time remaining',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Drag & drop files here &hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        fileActionSettings: {
            removeTitle: 'Remove file',
            uploadTitle: 'Upload file',
            uploadRetryTitle: 'Retry upload',
            downloadTitle: 'Download file',
            zoomTitle: 'View details',
            dragTitle: 'Move / Rearrange',
            indicatorNewTitle: 'Not uploaded yet',
            indicatorSuccessTitle: 'Uploaded',
            indicatorErrorTitle: 'Upload Error',
            indicatorLoadingTitle: 'Uploading ...'
        },
        previewZoomButtonTitles: {
            prev: 'View previous file',
            next: 'View next file',
            toggleheader: 'Toggle header',
            fullscreen: 'Toggle full screen',
            borderless: 'Toggle borderless mode',
            close: 'Close detailed preview'
        }
    }, e.fn.fileinput.Constructor = i, e(document).ready(function() {
        var t = e("input.file[type=file]");
        t.length && t.fileinput()
    })
});