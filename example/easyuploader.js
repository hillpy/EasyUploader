(function() {
    'use strict';

    var easyUploader = function(options) {
        if (!(this instanceof easyUploader)) {
            return new easyUploader(options);
        }

        // default options object
        var defaultOptions = {
            "el": "#file",
            "method": "post",
            "maxFileSize": "2M",
        }

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
        },
        /**
         * extend object function
         */
        extend: function(obj, newObj) {
            for (var key in newObj) {
                obj[key] = newObj[key];
            }
            return obj;
        }
    }

    window.easyUploader = easyUploader;
}());