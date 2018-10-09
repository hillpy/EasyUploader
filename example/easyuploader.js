(function() {
    "use strict";

    var easyUploader = function(options) {
        if (!(this instanceof easyUploader)) {
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
        }

        var fileObj = "",
            elObj = ""; 

        // extend options
        this.options = this.extend(defaultOptions, options);

        // init
        this.init();
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
            this.createInput();
            
            // bind event 
            this.bindElToInput();

            // add listen input
            this.addListenInput();

            // if (this.options.autoUpload) {
                
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
            input.name = this.options.name;
            input.id = this.options.id;
            input.setAttribute("style", "display: none;");
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
                console.log(_this.fileObj.files[0]);
            });
        }
    }

    window.easyUploader = easyUploader;
}());