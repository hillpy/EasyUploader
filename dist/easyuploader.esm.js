/*
 * easyUploader v0.0.4-beta
 * (c) 2018-2018 shinn_lancelot
 * Released under the Apache License 2.0 License.
 */
var defaultOptions = {
    // 绑定到元素节点
    'el': '',
    // 创建的input name
    'name': 'file',
    // 创建的input id
    'id': '',
    // 创建的input accept
    'accept': '',

    // 绑定到file
    'file': '#file',

    // http上传方式
    'method': 'post',
    // 文件上传地址
    'url': '',
    // 上传结果返回类型
    'resType': 'json',
    // 是否自动上传
    'autoUpload': true,
    // 上传文件最大容量
    'maxFileSize': '2M',
    // 提示层样式
    'tipClass': '',
    // 是否允许拖拽上传
    'allowDrag': false,
    // 是否自动修正上传照片方向
    'fixOrientation': true,
    // 允许上传的文件扩展名
    'allowFileExt': [],

    // 是否进行压缩（仅图片有效）
    'compress': true,
    // 重置尺寸（仅图片有效）
    'resize': {
        'maxWidth': 800,
        'maxHeight': 800
    },
    // 压缩质量（仅图片有效，图片格式必须为jpg、webp，必须为0-1小数，默认0.92）
    'compressQuality': 0.92,
};

var tipInfos = {
    'chinese': {
        'noFile': '请先选择文件',
        'fileTooLarge': '文件太大，最大允许为{0}',
        'fileTypeNotAllow': '文件格式不允许上传，请上传{0}格式的文件'
    }
};

/**
 * 通用静态函数类
 */
var defaultExport = function defaultExport () {};

defaultExport.extend = function extend (obj, newObj) {
    for (var key in newObj) {
        if (!(key in obj)) {
            obj[key] = newObj[key];
        } else if (obj[key].constructor == newObj[key].constructor) {
            if (obj[key].constructor === Object) {
                var childObj =obj[key],
                    childNewObj = newObj[key];
                for (var k in childNewObj) {
                    childObj[k] = childNewObj[k];
                }
                obj[key] = childObj;
            } else {
                obj[key] = newObj[key];
            }
        }
    }
    return obj;
};

/**
 * 图片的base64转ArrayBuffer对象
 * @param {*} base64 图片的base64
 */
defaultExport.base64ToArrayBuffer = function base64ToArrayBuffer (base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, '');
    var binary = atob(base64),
        length = binary.length,
        buffer = new ArrayBuffer(length),
        view = new Uint8Array(buffer);
    for (var i = 0; i < length; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return buffer;
};

/**
 * 获取jpg图片的orientation（即角度）
 * @param {*} arrayBuffer 图片二进制数据缓冲区
 */
defaultExport.getOrientation = function getOrientation (arrayBuffer) {
    var dataView = new DataView(arrayBuffer),
        length = dataView.byteLength,
        orientation,
        exifIDCode,
        tiffOffset,
        firstIFDOffset,
        littleEndian,
        endianness,
        app1Start,
        ifdStart,
        offset,
        i;

    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        offset = 2;
        while (offset < length) {
            if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
                app1Start = offset;
                break;
            }
            offset++;
        }
    }
    if (app1Start) {
        exifIDCode = app1Start + 4;
        tiffOffset = app1Start + 10;
        if (this.getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
            endianness = dataView.getUint16(tiffOffset);
            littleEndian = endianness === 0x4949;
            if (littleEndian || endianness === 0x4D4D) {
                if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                    firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                    if (firstIFDOffset >= 0x00000008) {
                        ifdStart = tiffOffset + firstIFDOffset;
                    }
                }
            }
        }
    }
    if (ifdStart) {
        length = dataView.getUint16(ifdStart, littleEndian);
        for (i = 0; i < length; i++) {
            offset = ifdStart + i * 12 + 2;
            if (dataView.getUint16(offset, littleEndian) === 0x0112) {
                offset += 8;
                orientation = dataView.getUint16(offset, littleEndian);
                if (navigator.userAgent.indexOf('Safari') > -1) {
                    dataView.setUint16(offset, 1, littleEndian);
                }
                break;
            }
        }
    }
    return orientation;
};

/**
 * Unicode码转字符串
 * @param {*} dataView 
 * @param {*} start 
 * @param {*} length 
 */
defaultExport.getStringFromCharCode = function getStringFromCharCode (dataView, start, length) {
    var string = '',
        i;
    for (i = start, length += start; i < length; i++) {
        string += String.fromCharCode(dataView.getUint8(i));
    }
    return string;
};

/**
 * 获取随机字符串
 * @param {*} length 随机字符串长度
 */
defaultExport.getNonce = function getNonce (length) {
        if ( length === void 0 ) length = 16;

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',
        nonce = '';
    for (var i = 0; i < length; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
};

/**
 * 替换字符串中的占位字符串
 * @param {*} str 需要替换的字符串
 * @param {*} arr 用于替换旧字符串的字符串数组
 */
defaultExport.replacePlaceholders = function replacePlaceholders (str, arr) {
        if ( str === void 0 ) str = '';
        if ( arr === void 0 ) arr = [];

    for (var i = 0; i < arr.length; i++) {
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arr[i]);
    }
    return str;
};

if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function(callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || 'image/png' }));
        }
    });
}

var easyUploader = function easyUploader(options) {
    if ( options === void 0 ) options = {};

    if (!(this instanceof easyUploader)) {
        return new easyUploader(options);
    }

    // 公共参数
    this.fileObj = '';
    this.elObj = '';
    this.fileType = '';
    this.fileName = '';
    this.fileSize = '';
    this.fileExt = '';
    this.fileObjClickStatus = true;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.formData = new FormData();
    this.eval = eval;
    this.tips = {};

    // 扩展配置选项
    this.options = defaultExport.extend(JSON.parse(JSON.stringify(defaultOptions)), options);
    // 初始化
    this.init();
};

/**
 * 初始化
 */
easyUploader.prototype.init = function init () {
    var _tipInfos = JSON.parse(JSON.stringify(tipInfos));
    this.tips = _tipInfos.hasOwnProperty(this.options.language) ? _tipInfos[this.options.language] : _tipInfos['chinese'];

    if (this.options.el) {
        this.elObj = document.querySelector(this.options.el);
        this.createInput();
        this.bindElToInput();
        this.options.allowDrag && this.listenDrag(this.elObj);
    } else {
        this.fileObj = document.querySelector(this.options.file);
        this.options.allowDrag && this.listenDrag(this.fileObj);
    }

    this.listenFileObjClick();
    this.listenFileObjChange();
};

/**
 * 创建input(type=file)
 */
easyUploader.prototype.createInput = function createInput () {
    this.options.id || (this.options.id = 'easyuploader_' + defaultExport.getNonce());
    var input = document.createElement('input');
    input.type = 'file';
    input.name = this.options.name;
    input.id = this.options.id;
    input.accept = this.options.accept;
    input.setAttribute('style', 'display: none; !important');
    document.querySelector('body').appendChild(input);
    this.fileObj = document.querySelector('#' + this.options.id);
};

/**
 * 元素点击事件绑定到文件对象点击事件
 */
easyUploader.prototype.bindElToInput = function bindElToInput () {
    var _this = this;
    _this.elObj.addEventListener('click', function () {
        _this.fileObj.click();
    });
};

/**
 * 启用点击
 */
easyUploader.prototype.enableFileObjClick = function enableFileObjClick () {
    this.fileObjClickStatus = true;
};

/**
 * 禁用点击
 */
easyUploader.prototype.disableFileObjClick = function disableFileObjClick () {
    this.fileObjClickStatus = false;
};

/**
 * 监听文件对象点击
 */
easyUploader.prototype.listenFileObjClick = function listenFileObjClick () {
    var _this = this;
    _this.fileObj.addEventListener('click', function (e) {
        _this.fileObjClickStatus || e.preventDefault();
    });
};

/**
 * 监听文件对象值变化
 */
easyUploader.prototype.listenFileObjChange = function listenFileObjChange () {
    var _this = this;
    _this.fileObj.addEventListener('change', function () {
        _this.fileType = _this.fileObj.files[0].type;
        _this.fileName = _this.fileObj.files[0].name;
        _this.fileExt = _this.fileName.split('.').pop();
        _this.fileSize = _this.fileObj.files[0].size;
        if (_this.checkFile()) {
            if (_this.fileType.indexOf('image/') >= 0 && _this.options.compress) {
                _this.drawAndRenderCanvas();
            } else {
                _this.options.autoUpload && _this.uploadFile(_this.fileObj.files[0]);
            }
        }
    });
};

/**
 * 监听拖曳事件
 * @param {*} obj 被监听的对象
 */
easyUploader.prototype.listenDrag = function listenDrag (obj) {
    var _this = this;
    obj.addEventListener('drop', function (e) {
        e.preventDefault();
        _this.options.onDrop && _this.options.onDrop(e);
        _this.fileObj.files = e.dataTransfer.files;
    });
    obj.addEventListener('dragover', function (e) {
        e.preventDefault();
        _this.options.onDragOver && _this.options.onDragOver(e);
    });
    obj.addEventListener('dragenter', function (e) {
        e.preventDefault();
        _this.options.onDragEnter && _this.options.onDragEnter(e);
    });
    obj.addEventListener('dragleave', function (e) {
        e.preventDefault();
        _this.options.onDragLeave && _this.options.onDragLeave(e);
    });
};

/**
 * 重绘image并渲染画布
 */
easyUploader.prototype.drawAndRenderCanvas = function drawAndRenderCanvas () {
    var _this = this,
        reader = new FileReader,
        image = new Image(),
        arrayBuffer = new ArrayBuffer(),
        orientation = 1,
        width = '',
        height = '';

    reader.readAsDataURL(_this.fileObj.files[0]);
    reader.onload = function (e) {
        arrayBuffer = defaultExport.base64ToArrayBuffer(e.target.result);
        orientation = defaultExport.getOrientation(arrayBuffer);
        image.src = e.target.result;
    };

    image.onload = function () {
        if (_this.options.compress) {
            if (image.width > _this.options.resize.maxWidth || image.height > _this.options.resize.maxHeight) {
                if (image.width > image.height) {
                    width = _this.options.resize.maxWidth;
                    height = (image.height / image.width) * _this.options.resize.maxWidth;
                } else {
                    width = (image.width / image.height) * _this.options.resize.maxHeight;
                    height = _this.options.resize.maxHeight;
                }
            } else {
                width = image.width;
                height = image.height;
            }
        } else {
            width = image.width;
            height = image.height;
            _this.options.compressQuality = 1;
        }

        if (_this.options.fixOrientation) {
            switch(orientation) {
                // 偏移180度
                case 3:
                    _this.canvas.width = width;
                    _this.canvas.height = height;
                    _this.context.rotate(180 * Math.PI / 180);
                    _this.context.drawImage(image, -width, -height, width, height);
                    break;
                    
                // 顺时针偏移90度
                case 6:
                    _this.canvas.width = height;
                    _this.canvas.height = width;
                    _this.context.rotate(90 * Math.PI / 180);
                    _this.context.drawImage(image, 0, -height, width, height);
                    break;
                    
                // 顺时针偏移270度
                case 8:
                    _this.canvas.width = height;
                    _this.canvas.height = width;
                    _this.context.rotate(270 * Math.PI / 180);
                    _this.context.drawImage(image, -width, 0, width, height);
                    break;
                    
                // 0度和默认，不旋转
                case 1:
                default:
                    _this.canvas.width = width;
                    _this.canvas.height = height;
                    _this.context.drawImage(image, 0, 0, width, height);
            }
        } else {
            _this.canvas.width = width;
            _this.canvas.height = height;
            _this.context.drawImage(image, 0, 0, width, height);
        }

        _this.canvas.setAttribute('style', 'display: none !important;');
        document.querySelector('body').appendChild(_this.canvas);
        _this.options.autoUpload && _this.uploadCanvas();
    };
};

/**
 * 上传函数
 */
easyUploader.prototype.upload = function upload () {
    if (this.fileType.indexOf('image/') >= 0 && this.options.compress) {
        this.uploadCanvas();
    } else {
        this.uploadFile(this.fileObj.files[0]);
    }
};

/**
 * 上传canvas中的图片文件
 */
easyUploader.prototype.uploadCanvas = function uploadCanvas () {
    var _this = this;

    if (!_this.fileObj.files[0]) {
        _this.renderTipDom(this.tips.noFile);
        return;
    }

    _this.canvas.toBlob(function (blob) {
        _this.uploadFile(blob);
    }, _this.fileType, _this.options.compressQuality);
};

/**
 * 上传文件
 * @param {*} value input file中的值
 */
easyUploader.prototype.uploadFile = function uploadFile (value) {
    var _this = this;

    if (!_this.fileObj.files[0]) {
        _this.renderTipDom(this.tips.noFile);
        return;
    }

    _this.formData.append(_this.options.name, value, _this.fileName);
    var xhr = new XMLHttpRequest();
    xhr.open(_this.options.method, _this.options.url, true);
    xhr.upload.addEventListener('progress', function (e) {
        _this.options.onUploadProgress && _this.options.onUploadProgress(e);
    });
    xhr.upload.addEventListener('loadstart', function (e) {
        _this.options.onUploadStart && _this.options.onUploadStart(e);
    });
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                _this.options.onUploadComplete && _this.options.onUploadComplete(_this.handleRes(xhr.responseText));
            } else {
                _this.options.onUploadError && _this.options.onUploadError(xhr.status);
            }
            _this.fileObj.value = '';
        }
    };
    //xhr.setRequestHeader('Content-type', 'multipart/form-data');
    xhr.send(_this.formData);
};

/**
 * 渲染提示层到dom
 * @param {*} text 提示文本
 */
easyUploader.prototype.renderTipDom = function renderTipDom (text) {
    var div = document.createElement('div');
    div.innerHTML = text;
    if (this.options.tipClass) {
        div.className = this.options.tipClass;
    } else {
        div.setAttribute('style', 'max-width: 90%;padding: 16px 20px;font-size: 14px;color: #fff;box-sizing: border-box;border-radius: 2px;filter: Alpha(opacity=80);opacity: 0.8;-moz-opacity: 0.8;user-select: none;position: fixed;top: 50%;left: 50%;z-index: 100000;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);text-align: center;background: #000;word-wrap: break-word;word-break: break-all;');
    }
    document.querySelector('body').appendChild(div);
    setTimeout(function () {
        var opacity = div.style.opacity;
        if (opacity > 0) {
            opacity = (opacity - 0.2).toFixed(1);
            if (opacity < 0) {
                opacity = 0;
            }
            var hideTip = setInterval(function () {
                div.style.opacity = opacity;
                div.style.filter = 'Alpha((opacity = ' + opacity * 100 + '))';
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
            div.remove();
        }
    }, 1500);
};

/**
 * 校验文件（尺寸、类型）
 */
easyUploader.prototype.checkFile = function checkFile () {
    var maxFileSize = this.options.maxFileSize,
        maxFileSizeWithLetter = 0,
        letterStr = '';
    if (maxFileSize.indexOf('B') > 0) {
        maxFileSize = maxFileSize.replace(/B/g, '');
        letterStr = 'B';
    }
    if (maxFileSize.indexOf('K') > 0) {
        maxFileSizeWithLetter = this.eval(maxFileSize.replace(/K/g, ''));
        maxFileSize = maxFileSizeWithLetter * 1024;
        letterStr = 'K' + letterStr;
    } else if (maxFileSize.indexOf('M') > 0) {
        maxFileSizeWithLetter = this.eval(maxFileSize.replace(/M/g, ''));
        maxFileSize = maxFileSizeWithLetter * 1024 * 1024;
        letterStr = 'M' + letterStr;
    } else if (maxFileSize.indexOf('G') > 0) {
        maxFileSizeWithLetter = this.eval(maxFileSize.replace(/G/g, ''));
        maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024;
        letterStr = 'G' + letterStr;
    } else if (maxFileSize.indexOf('T') > 0) {
        maxFileSizeWithLetter = this.eval(maxFileSize.replace(/T/g, ''));
        maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024 * 1024;
        letterStr = 'T' + letterStr;
    } else if (maxFileSize.indexOf('P') > 0) {
        maxFileSizeWithLetter = this.eval(maxFileSize.replace(/P/g, ''));
        maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024 * 1024 * 1024;
        letterStr = 'P' + letterStr;
    } else {
        maxFileSizeWithLetter = this.eval(maxFileSize);
        maxFileSize = maxFileSizeWithLetter;
        letterStr = 'B';
    }

    if (this.fileSize > maxFileSize) {
        this.renderTipDom(defaultExport.replacePlaceholders(
            this.tips.fileTooLarge,
            [maxFileSizeWithLetter + letterStr]
        ));
        this.fileObj.value = '';
        return false;
    }

    if (this.options.allowFileExt.length > 0 && this.options.allowFileExt.indexOf(this.fileExt) == -1) {
        this.renderTipDom(defaultExport.replacePlaceholders(
            this.tips.fileTypeNotAllow,
            [this.options.allowFileExt.join("，")]
        ));

        this.fileObj.value = '';
        return false;
    }

    return true;
};

/**
 * 处理结果格式
 * @param {*} res 需要处理的结果
 */
easyUploader.prototype.handleRes = function handleRes (res) {
    var resType = this.options.resType.toLowerCase();
    if (resType == 'json') {
        return JSON.parse(res);
    } else if (resType == 'text') {
        return res;
    } else {
        return res;
    }
};

// 导出核心

export default easyUploader;
