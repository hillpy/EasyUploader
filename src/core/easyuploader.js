var easyUploader = function(options) {
    if (!(this instanceof easyUploader)) {
        return new easyUploader(options);
    }

    // default options object
    var defaultOptions = {
        "el": "",
        "name": "file",
        "id": "file",
        "accept": "",
        "file": "#file",
        "method": "post",
        "url": "",
        "resType": "json",
        "autoUpload": false,
        "compress": true,
        "resize": {
            "maxWidth": 800,
            "maxHeight": 800
        },
        "compressQuality": 0.9,
        "maxFileSize": "2M",
        "tipClass": ""
    }

    // common param
    this.fileObj = "";
    this.elObj = "";
    this.fileType = "";
    this.fileName = "";
    this.fileSize = "";
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.formData = new FormData();

    // extend options
    this.options = this.extend(defaultOptions, options);

    // init
    this.init();

    /**
     * upload function
     */
    this.upload = function() {
        if (this.fileType.indexOf("image/") >= 0) {
            this.uploadCanvas();
        } else {
            this.uploadFile(this.fileObj.files[0]);
        }
    }
}

/**
 * extend easyUploader
 */
easyUploader.prototype = {
    /**
     * init function
     */
    init: function() {
        if (this.options.el) {
            // render input
            this.createInput();
            // bind event
            this.bindElToInput();
        } else {
            this.fileObj = document.querySelector(this.options.file);
        }

        // add listen input
        this.addListenInput();
    },
    /**
     * extend object function
     */
    extend: function(obj, newObj) {
        for (var key in newObj) {
            if (!(key in obj)) {
                obj[key] = newObj[key];
            } else if (obj[key].constructor == newObj[key].constructor) {
                if (obj[key].constructor === Object) {
                    var childObj =obj[key],
                        childNewObj = newObj[key];
                    for (var k in childNewObj) {
                        childObj[k] = childNewObj[k]
                    }
                    obj[key] = childObj;
                } else {
                    obj[key] = newObj[key];
                }
            }
        }
        return obj;
    },
    /**
     * create input dom
     */
    createInput: function() {
        var input = document.createElement("input");
        input.type = "file";
        input.name = this.options.name;
        input.id = this.options.id;
        input.accept = this.options.accept;
        input.setAttribute("style", "display: none; !important");
        document.querySelector("body").appendChild(input);
        this.fileObj = document.querySelector("#" + this.options.id);
    },
    /**
     * bind event
     */
    bindElToInput: function() {
        var _this = this;
        _this.elObj = document.querySelector(_this.options.el);
        _this.elObj.addEventListener("click", function() {
            _this.fileObj.click();
        })
    },
    /**
     * listen input file
     */
    addListenInput: function() {
        var _this = this;
        _this.fileObj.addEventListener("change", function() {
            _this.fileType = _this.fileObj.files[0].type;
            _this.fileName = _this.fileObj.files[0].name;
            _this.fileSize = _this.fileObj.files[0].size;
            if (_this.checkFile()) {
                if (_this.fileType.indexOf("image/") >= 0) {
                    _this.drawAndRenderCanvas();
                } else {
                    _this.options.autoUpload && _this.uploadFile(_this.fileObj.files[0]);
                }
            }
        });
    },
    /**
     * render tip dom when error
     */
    renderTipDom: function(text) {
        var div = document.createElement("div");
        div.innerHTML = text;
        if (this.options.tipClass) {
            div.className = this.options.tipClass;
        } else {
            div.setAttribute("style", "padding: 16px 20px;font-size: 16px;color: #fff;box-sizing: border-box;border-radius: 2px;filter: Alpha(opacity=80);opacity: 0.8;-moz-opacity: 0.8;user-select: none;position: absolute;top: 50%;left: 50%;z-index: 100000;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);text-align: center;background: #000;");
        }
        document.querySelector("body").appendChild(div);
    },
    /**
     * drawImage
     * render Canvas
     */
    drawAndRenderCanvas: function() {
        var _this = this,
            reader = new FileReader,
            image = new Image();

        reader.readAsDataURL(_this.fileObj.files[0]);
        reader.onload = function(e) {
            image.src = this.result;
        }

        image.onload = function() {
            if (_this.options.compress) {
                if (image.width > _this.options.resize.maxWidth || image.height > _this.options.resize.maxHeight) {
                    if (image.width > image.height) {
                        _this.canvas.width = _this.options.resize.maxWidth;
                        _this.canvas.height = (image.height / image.width) * _this.options.resize.maxWidth;
                    } else {
                        _this.canvas.width = (image.width / image.height) * _this.options.resize.maxHeight;
                        _this.canvas.height = _this.options.resize.maxHeight;
                    }
                } else {
                    _this.canvas.width = image.width;
                    _this.canvas.height = image.height;
                }
            } else {
                _this.canvas.width = image.width;
                _this.canvas.height = image.height;
                _this.options.compressQuality = 1;
            }

            _this.context.drawImage(image, 0, 0, _this.canvas.width, _this.canvas.height);
            _this.canvas.setAttribute("style", "display: none !important;");
            document.querySelector("body").appendChild(_this.canvas);
            _this.options.autoUpload && _this.uploadCanvas();
        }
    },
    /**
     * uploader canvas image
     */
    uploadCanvas: function() {
        var _this = this;

        if (!_this.fileObj.files[0]) {
            this.renderTipDom("请先选择文件")
            return;
        }

        _this.canvas.toBlob(function(blob) {
            _this.uploadFile(blob);
        }, _this.fileType, _this.options.compressQuality);
    },
    /**
     * uploader file
     */
    uploadFile: function(value) {
        var _this = this;

        if (!_this.fileObj.files[0]) {
            this.renderTipDom("请先选择文件");
            return;
        }

        _this.formData.append(_this.options.name, value, _this.fileName);
        var xhr = new XMLHttpRequest();
        xhr.open(_this.options.method, _this.options.url, true);
        xhr.upload.addEventListener("progress", function(e) {
            _this.options.onUploadProgress && _this.options.onUploadProgress(e);
        });
        xhr.upload.addEventListener("loadstart", function(e) {
            _this.options.onUploadStart && _this.options.onUploadStart(e);
        });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    _this.options.onUploadComplete && _this.options.onUploadComplete(_this.handleRes(xhr.responseText));
                } else {
                    _this.options.onUploadError && _this.options.onUploadError(xhr.status);
                }
                _this.fileObj.value = "";
            }
        };
        //xhr.setRequestHeader("Content-type", "multipart/form-data");
        xhr.send(_this.formData);
    },
    /**
     * checkfile:size，type
     */
    checkFile: function() {
        // B
        var maxFileSize = this.options.maxFileSize;
        if (maxFileSize.indexOf("B") > 0) {
            maxFileSize = maxFileSize.replace(/B/g, "");
        } else if (maxFileSize.indexOf("K") > 0) {
            maxFileSize = maxFileSize.replace(/K/g, "") * 1024;
        } else if (maxFileSize.indexOf("M") > 0) {
            maxFileSize = maxFileSize.replace(/M/g, "") * 1024 * 1024;
        } else if (maxFileSize.indexOf("G") > 0) {
            maxFileSize = maxFileSize.replace(/G/g, "") * 1024 * 1024 * 1024;
        } else if (maxFileSize.indexOf("T") > 0) {
            maxFileSize = maxFileSize.replace(/T/g, "") * 1024 * 1024 * 1024 * 1024;
        }

        if (this.fileSize > maxFileSize) {
            this.renderTipDom("文件太大，最大允许为" + this.options.maxFileSize);
            this.fileObj.value = "";
            return false;
        }

        return true;
    },
    /**
     * handle ajax result
     */
    handleRes: function(res) {
        var resType = this.options.resType.toLowerCase();
        if (resType == "json") {
            return JSON.parse(res);
        } else if (resType == 'text') {
            return res;
        } else {
            return res;
        }
    }
}

window.easyUploader = easyUploader;