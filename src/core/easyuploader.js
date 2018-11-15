var easyUploader = function(options) {
    if (!(this instanceof easyUploader)) {
        return new easyUploader(options);
    }

    // 默认配置对象
    var defaultOptions = {
        // 绑定到元素节点
        "el": "",
        // 创建的input name
        "name": "file",
        // 创建的input id
        "id": "",
        // 创建的input accept
        "accept": "",

        // 绑定到file
        "file": "#file",

        // http上传方式
        "method": "post",
        // 文件上传地址
        "url": "",
        // 上传结果返回类型
        "resType": "json",
        // 是否自动上传
        "autoUpload": false,
        // 上传文件最大容量
        "maxFileSize": "2M",
        // 提示层样式
        "tipClass": "",
        // 是否启用拖拽上传
        "drag": false,

        // 是否自动压缩（仅图片有效））
        "compress": true,
        // 重置尺寸（仅图片有效）
        "resize": {
            "maxWidth": 800,
            "maxHeight": 800
        },
        // 压缩质量（仅图片有效，图片格式必须为jpg、webp，必须为0-1小数，默认0.92）
        "compressQuality": 0.92,
    }

    // 公共参数
    this.fileObj = "";
    this.elObj = "";
    this.fileType = "";
    this.fileName = "";
    this.fileSize = "";
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.formData = new FormData();

    // 扩展配置选项
    this.options = this.extend(defaultOptions, options);

    // 初始化
    this.init();

    /**
     * 上传函数
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
 * 扩展 easyUploader
 */
easyUploader.prototype = {
    /**
     * 初始化
     */
    init: function() {
        if (this.options.el) {
            this.elObj = document.querySelector(this.options.el);
            this.createInput();
            this.bindElToInput();
            this.options.drag && this.addListenDrag(this.elObj);
        } else {
            this.fileObj = document.querySelector(this.options.file);
            this.options.drag && this.addListenDrag(this.fileObj);
        }

        this.addListenInput();
    },
    
    /**
     * 扩展对象
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
     * 创建input(type=file)
     */
    createInput: function() {
        this.options.id || (this.options.id = "easyuploader_" + this.getNonce());
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
     * 元素点击事件绑定到文件对象点击事件
     */
    bindElToInput: function() {
        var _this = this;
        _this.elObj.addEventListener("click", function() {
            _this.fileObj.click();
        })
    },
    
    /**
     * 监听文件对象值变化
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
     * 添加拖曳事件监听
     */
    addListenDrag: function(obj) {
        var _this = this;
        obj.addEventListener("drop", function(e) {
            e.preventDefault();
            _this.options.onDrop && _this.options.onDrop(e);
            _this.fileObj.files = e.dataTransfer.files;
        });
        obj.addEventListener("dragover", function(e) {
            e.preventDefault();
            _this.options.onDragOver && _this.options.onDragOver(e);
        });
        obj.addEventListener("dragenter", function(e) {
            e.preventDefault();
            _this.options.onDragEnter && _this.options.onDragEnter(e);
        });
        obj.addEventListener("dragleave", function(e) {
            e.preventDefault();
            _this.options.onDragLeave && _this.options.onDragLeave(e);
        });
    },
    
    /**
     * 渲染提示层到dom
     */
    renderTipDom: function(text) {
        var div = document.createElement("div");
        div.innerHTML = text;
        if (this.options.tipClass) {
            div.className = this.options.tipClass;
        } else {
            div.setAttribute("style", "max-width: 80%;padding: 16px 20px;font-size: 14px;color: #fff;box-sizing: border-box;border-radius: 2px;filter: Alpha(opacity=80);opacity: 0.8;-moz-opacity: 0.8;user-select: none;position: absolute;top: 50%;left: 50%;z-index: 100000;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);text-align: center;background: #000;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;");
        }
        document.querySelector("body").appendChild(div);
        setTimeout(function() {
            var opacity = div.style.opacity;
            if (opacity > 0) {
                opacity = (opacity - 0.2).toFixed(1)
                if (opacity < 0) {
                    opacity = 0;
                }
                var hideTip = setInterval(function() {
                    div.style.opacity = opacity;
                    div.style.filter = "Alpha((opacity = " + opacity * 100 + "))";
                    if (opacity <= 0) {
                        div.remove();
                        clearInterval(hideTip);
                    } else {
                        opacity = (opacity - 0.1).toFixed(1);
                        if (opacity < 0) {
                            opacity = 0;
                        }
                    }
                }, 10);
            } else {
                div.remove()
            }
        }, 1500);
    },
    
    /**
     * 重绘image并渲染画布
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
     * 上传canvas中的图片文件
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
     * 上传文件
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
     * 校验文件（尺寸、类型）
     */
    checkFile: function() {
        // B
        var maxFileSize = this.options.maxFileSize,
            hasLetter = false,
            letterStr = "B";
        if (maxFileSize.indexOf("B") > 0) {
            maxFileSize = maxFileSize.replace(/B/g, "");
            hasLetter = true;
            letterStr = "";
        }
        if (maxFileSize.indexOf("K") > 0) {
            maxFileSize = maxFileSize.replace(/K/g, "") * 1024;
            hasLetter = true;
            letterStr = "";
        } else if (maxFileSize.indexOf("M") > 0) {
            maxFileSize = maxFileSize.replace(/M/g, "") * 1024 * 1024;
            hasLetter = true;
            letterStr = "";
        } else if (maxFileSize.indexOf("G") > 0) {
            maxFileSize = maxFileSize.replace(/G/g, "") * 1024 * 1024 * 1024;
            hasLetter = true;
            letterStr = "";
        } else if (maxFileSize.indexOf("T") > 0) {
            maxFileSize = maxFileSize.replace(/T/g, "") * 1024 * 1024 * 1024 * 1024;
            hasLetter = true;
            letterStr = "";
        }

        if (this.fileSize > maxFileSize) {
            this.renderTipDom("文件太大，最大允许为" + this.options.maxFileSize + letterStr);
            this.fileObj.value = "";
            return false;
        }

        return true;
    },
    
    /**
     * 获取随机字符串
     */
    getNonce: function(length) {
        length || (length = 16);
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
            nonce = '';
        for (var i = 0; i < length; i++) {
            nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
    },
    
    /**
     * 处理结果格式
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