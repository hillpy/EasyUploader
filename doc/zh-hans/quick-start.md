## 快速开始

以下列举几种使用使用方式供参考体验。

### 简单上传（绑定到元素按钮节点）

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var eu1 = new EasyUploader({
        "el": "#btn1",
        "url": "./upload.php"
    });
</script>
```

实例化库，实现最简单的上传功能。传入`el`、`url`选项即可。`el`代表元素按钮节点，即上传按钮，`url`代表需要提交到后端的地址。

### 图片上传

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var eu2 = new EasyUploader({
        "el": "#btn2",
        "name": "file",
        "accept": "image/*",
        "url": "./upload.php",
        "autoUpload": true,
        "allowFileExt": ["jpg", "jpeg", "png"],
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

较完善的图片上传设置，`name`、`accept`代表input中的属性。当`autoUploader`为true时，在选择文件之后将自动执行上传。`allowFileExt`代表允许上传的文件扩展名。`compress`代表是否对图片进行压缩，为true时`resize`和`compressQuality`生效。`resize`需要传入对象，包含`maxWidth`和`maxHeight`，代表图片的最大宽高。`compressQuality`代表图片压缩质量，仅jpg和webp格式有效。`maxFileSize`代表允许文件上传的最大容量。后面四个为上传相关事件。

### 绑定到input-type-file上传

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var eu3 = new EasyUploader({
        "file": "#easyuploader_file",
        "url": "./upload.php",
        "autoUpload": true,
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

直接绑定到'input type=file'，填写到`file`选项即可。它与绑定到元素按钮节点大同小异。

### 拖曳上传

``` js
<script src="https://unpkg.com/easyuploader/dist/easyuploader.min.js"></script>
<script>
    var eu4 = new EasyUploader({
        "el": "#drop_area",
        "url": "./upload.php",
        "autoUpload": true,
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

拖曳上传与绑定到元素按钮节点上传无异，仅仅在此基础上新增拖曳上传。`allowDrag`代表是否开启拖曳，当为true时，目标文件拖至绑定元素按钮区域即可实现上传。然后，还有四个拖曳事件可供使用。