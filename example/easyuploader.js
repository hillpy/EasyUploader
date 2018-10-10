(function() {
    "use strict";

    var _this = '',
        fileType = '',
        fileName = '',
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        formData = new FormData();

    var easyUploader = function(options) {
        _this = this;

        if (!(_this instanceof easyUploader)) {
            return new easyUploader(options);
        }

        // default options object
        var defaultOptions = {
            "el": "#file",
            "file": "#file",
            "name": "file",
            "id": "file",
            "method": "post",
            "url": "",
            "autoUpload": true,
            "compress": true,
            "resize": {
                "maxWidth": 800,
                "maxHeight": 800
            },
            "compressRatio": 0.9,
            "maxFileSize": "2M"
        }

        var fileObj = "",
            elObj = "";

        // extend options
        _this.options = _this.extend(defaultOptions, options);

        // init
        _this.init();
    }

    /**
     * extend easyUploader
     */
    easyUploader.prototype = {
        /**
         * init function
         */
        init: function() {
            // render input
            _this.createInput();
            // bind event 
            _this.bindElToInput();
            // add listen input
            _this.addListenInput();
        },
        /**
         * extend object function
         */
        extend: function(obj, newObj) {
            for (var key in newObj) {
                obj[key] = newObj[key];
            }
            return obj;
        },
        /**
         * create input dom
         */
        createInput: function() {
            var input = document.createElement("input");
            input.type = "file";
            input.name = _this.options.name;
            input.id = _this.options.id;
            input.setAttribute("style", "display: none; !important");
            document.querySelector("body").appendChild(input);
            _this.fileObj = document.querySelector("#" + _this.options.id);
        },
        /**
         * bind event
         */
        bindElToInput: function() {
            _this.elObj = document.querySelector(_this.options.el);
            _this.elObj.addEventListener("click", function() {
                _this.fileObj.click();
            })
        },
        /**
         * listen input file
         */
        addListenInput: function() {
            _this.fileObj.addEventListener("change", function() {
                _this.fileObj.files[0];
                fileType = _this.fileObj.files[0].type;
                fileName = _this.fileObj.files[0].name;
                
                if (fileType.indexOf("image/") >= 0) {
                    _this.drawAndRenderCanvas();
                }
            });
        },
        /**
         * drawImage
         * render Canvas
         */
        drawAndRenderCanvas: function() {
            var reader = new FileReader,
                image = new Image();
            
            reader.readAsDataURL(_this.fileObj.files[0]);
            reader.onload = function(e) {
                image.src = this.result;
            }

            image.onload = function() {
                if (_this.options.compress) {
                    if (image.width > _this.options.resize.maxWidth || image.height > _this.options.resize.maxHeight) {
                        if (image.width > image.height) {
                            canvas.width = _this.options.resize.maxWidth;
                            canvas.height = (image.height / image.width) * _this.options.resize.maxWidth;
                        } else {
                            canvas.width = (image.width / image.height) * _this.options.resize.maxHeight;
                            canvas.height = _this.options.resize.maxHeight;
                        }
                    }
                } else {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    _this.options.compressRatio = 1;
                }

                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                canvas.setAttribute("style", "display: none !important;");
                document.querySelector("body").appendChild(canvas);
                _this.options.autoUpload && _this.uploadCanvas();
            }
        },
        /**
         * uploader canvas image
         */
        uploadCanvas: function() {
            if (!_this.fileObj.files[0]) {
                alert("请先选择文件");
                return;
            }

            canvas.toBlob(function(blob) {
                formData.append(_this.options.name, blob, fileName);
                var xhr = new XMLHttpRequest();
                xhr.open(_this.options.method, _this.options.url, true);
                xhr.upload.addEventListener("progress", function(e) {
                    console.log("上传进度为：" + ((e.loaded / e.total) * 100).toFixed(2) + "%");
                });
                xhr.upload.addEventListener("loadstart", function() {
                    console.log("上传开始"); //只出现一次
                });
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            var data = JSON.parse(xhr.responseText);
                            alert(data.msg);
                        } else {
                            console.log("请求失败: " + xhr.status);
                        }
                        _this.fileObj.value = '';
                    }
                };
                //xhr.setRequestHeader("Content-type", "multipart/form-data");
                xhr.send(formData);
            }, fileType, _this.options.compressRatio);
        }
    }

    window.easyUploader = easyUploader;
}());