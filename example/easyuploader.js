(function() {
    "use strict";

    var _this = '';

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
            "maxFileSize": "2M",
            "url": "",
            "autoUpload": true,
            "compress": true,
            "resize": {
                "width": 800,
                "height": 800
            },
            "compress": true,
            "compressRatio": 0.9
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
            console.log('init function');
            // render input
            _this.createInput();
            
            // bind event 
            _this.bindElToInput();

            // add listen input
            _this.addListenInput();

            // if (_this.options.autoUpload) {
                
            // }
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
            input.setAttribute("style", "display: none;");
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
                console.log(_this.fileObj.files[0]);
            });
        }
    }

    window.easyUploader = easyUploader;
}());