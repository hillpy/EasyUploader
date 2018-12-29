## Quick start

The following are several ways to use them for reference.

### Simple upload (bind to element node)

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var easyuploader1 = new easyUploader({
        "el": "#btn1",
        "url": "./upload.php",
        "language": "en"
    });
</script>
```

Initialize the library to achieve the simplest upload function. The incoming `el` `url` `language` option. `el` represents the element button node, the upload button. `url` represents the address that needs to be submitted to the back end. `language` represents the type of message prompt language.

### Upload picture

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var easyUploader2 = new easyUploader({
        "el": "#btn2",
        "name": "file",
        "accept": "image/*",
        "url": "./upload.php",
        "autoUpload": true,
        "allowFileExt": ["jpg", "jpeg", "png"],
        "language": "en",
        "compress": true,
        "resize": {
            "maxWidth": 1000,
            "maxHeight": 1000
        },
        "compressQuality": 0.9,
        "maxFileSize": "10M",
        onUploadProgress: function(e) {
            console.log("上传进度为：" + ((e.loaded / e.total) * 100).toFixed(2) + "%");
        },
        onUploadStart: function(e) {
            console.log('即将上传。。');
        },
        onUploadComplete: function(data) {
            console.log(data);
        },
        onUploadError: function(statusCode) {
            console.log(statusCode);
        }
    });
</script>
```

More perfect image upload settings, `name` `accept` represented attribute of the input. When `autoUploader` is true, after select files to upload automatically. `allowFileExt` represents the file extension that is allowed to be uploaded. `compress` represents whether to compress the image, and `resize` and `compressQuality` take effect when it is true. `resize` needs to be introduced into object, including `maxWidth` and `maxHeight`, on behalf of the biggest wide high pictures. `compressQuality` represents the image compression quality, only JPG and webp formats are valid. `maxFileSize` represents the maximum capacity allowed for file uploads. The next four are for uploading related events.

### Bind to input-type-file

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var easyUploader3 = new easyUploader({
        "file": "#easyuploader_file",
        "url": "./upload.php",
        "autoUpload": true,
        "language": "en",
        "compress": true,
        "resize": {
            "maxWidth": 1000,
            "maxHeight": 1000
        },
        "compressQuality": 0.9,
        "maxFileSize": "10 * 1024 * 1024",
        onUploadProgress: function (e) {
            console.log("上传进度为：" + ((e.loaded / e.total) * 100).toFixed(2) + "%");
        },
        onUploadStart: function (e) {
            console.log('即将上传。。');
        },
        onUploadComplete: function (data) {
            console.log(data)
        },
        onUploadError: function (statusCode) {
            console.log(statusCode);
        }
    });
</script>
```

Directly bound to the 'input type = file, fill in the ` file ` option. It is much the same as binding to an element button node.

### Drag upload

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var easyUploader4 = new easyUploader({
        "el": "#drop_area",
        "url": "./upload.php",
        "autoUpload": true,
        "language": "en",
        "compress": true,
        "resize": {
            "maxWidth": 1000,
            "maxHeight": 1000
        },
        "compressQuality": 0.9,
        "maxFileSize": "2 * 1024 KB",
        "allowDrag": true,
        onDrop: function(e) {
            console.log("drop");
        },
        onDragOver: function(e) {
            console.log("dragover");
        },
        onDragEnter: function(e) {
            console.log("dragenter");
        },
        onDragLeave: function(e) {
            console.log("dragleave");
        },
        onUploadProgress: function (e) {
            console.log("上传进度为：" + ((e.loaded / e.total) * 100).toFixed(2) + "%");
        },
        onUploadStart: function (e) {
            console.log('即将上传。。');
        },
        onUploadComplete: function (data) {
            console.log(data)
        },
        onUploadError: function (statusCode) {
            console.log(statusCode);
        }
    });
</script>
```

Drag upload is the same as binding to an element button node upload, only drag upload is added on top of that. `allowDrag` represents whether drag is enabled, and when true, the target file can be uploaded by dragging it to the button area of the binding element. And then, there are four more drag events available.