## Options

easyUploader supports many option configurations at initialization time.

### el

* Type: String
* Default: ""
* Example: "el": "#btn"
* Remark: This option represents the element button node to which the upload function needs to bind. It could be a button element, a div element, etc. The file option is invalid when this option exists. The value is recommended as "#id" instead of ".class".

### file

* Type: String
* Default: "#file"
* Example: "file": "#file"
* Remark: This option represents the input(type=file) object that needs to be bound to the upload function. Only valid if the [el](options.md#el) option does not exist.

### name

* Type: String
* Default: "file"
* Example: "name": "file"
* Remark: This option represents the name attribute of the input file created. Valid when the [el](options.md#el) option exists. This option must be filled in.

### id

* Type: String
* Default: Auto created.
* Example: "id": "easyuploader_file"
* Remark: This option represents the id attribute of the input file created. Valid when the [el](options.md#el) option exists. If not fill in, library will automatically create a value for this option.

### accept

* Type: String
* Default: ""
* Example: "accept": "image/*"
* Remark: This option represents the accept attribute of the input file created. Valid when the [el](options.md#el) option exists.

### url

* Type: String
* Default: ""
* Example: "url": "./upload.php"
* Remark: This option represents the backend url to which the file is submitted. The library is only responsible for the front-end part, the back-end upload code needs to be written by yourself.

upload.php Basic examples

``` php
<?php

if (strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
    $res = array(
        'code' => 0,
        'msg' => 'upload failed'
    );

    // originalFileName
    $fileName = $_FILES['file']['name'];
    // tempName
    $tmpName = $_FILES['file']['tmp_name'];
    // fileType
    $type = $_FILES['file']['type'];
    // fileSize
    $size = $_FILES['file']['size'];

    $uploadDir = './file/';
    if (!file_exists($uploadDir) || !is_dir($uploadDir)) {
        mkdir($uploadDir);
    }

    // open and read tempName
    $fp = fopen($tmpName, 'r');
    $file = fread($fp, $size);
    $data = $file;

    // open to write
    $newFile = fopen($uploadDir . $fileName, 'w');
    // write to file
    fwrite($newFile, $data);
    // close file
    fclose($newFile);

    $res['code'] = 1;
    $res['msg'] = 'upload successful';
    $res['data'] = array(
        'file_type'=>$type,
        'path'=>$uploadDir . $fileName
    );
    echo json_encode($res);
} else {
    exit('forbidden');
}
```

### method

* Type: String
* Default: "post"
* Example: "method": "post"
* Remark: This option represents the HTTP ajax request type at upload time. Post is recommended。

### maxFileSize

* Type: String
* Default: "2M"
* Example: "maxFileSize": "10M"
* Remark: This option represents the maximum size of the file to be uploaded. Fill out the Example: "10 \* 1024 \* 1024"，"2M"，"500 KB"，"10 \* 1 MB" and so on. If you do not fill in the letters ("KB", etc.), the default is B(bytes). You can also fill in "\*" for numerical calculation. Note: letters must be capitalized.

### autoUpload

* Type: Boolean
* Default: true
* Example: "autoUpload": true
* Remark: This option represents whether to automatically upload a file after selecting it. If false, you need to manually call the method upload[easyUploader.upload()](methods.md#upload).

### allowDrag

* Type: Boolean
* Default: false
* Example: "allowDrag": true
* Remark: This option represents whether drag upload is enabled or not. When enabled, files can be directly dragged to the binding element area for uploading.

### allowFileExt

* Type: Array
* Default: []
* Example: "allowFileExt": ["jpg", "jpeg", "png"]
* Remark: This option represents the extension type of file that is allowed to be uploaded. Depending on the extension name of the file name, the extension name that is not allowed will not be uploaded. When the default is an empty array, the upload file type is not restricted. Note: although the accept attribute of input can limit the file type when selecting a file, it will not work when dragging upload is enabled, so to limit the file type, it is recommended to configure this option. Also, you must fill in lowercase letters.

### compress

* Type: Boolean
* Default: true
* Example: "compress": true
* Remark: This option represents whether to compress the image before uploading it. Note: only images are valid. If true, it will be compressed before uploading.

### resize

* Type: Object
* Default: { "maxWidth": 800, "maxHeight": 800 }
* Example: "resize": { "maxWidth": 1000, "maxHeight": 1000 }
* Remark: This option represents the maximum width and height (compression on the width and height of the image) that the image can be redrawn to. You should fill in two keys, maxWidth and maxHeight. It takes effect when [compress](options.md#compress) option is true.

### compressQuality

* Type: Float
* Default: 0.92
* Example: "compressQuality": 0.9
* Remark: This option represents the quality of the image redrawn (compression on the image quality). On the basis of redrawing size, the image quality is compressed. It takes effect when [compress](options.md#compress) option is true. And only valid for JPG webp format images. The value must be between 0 and 1, and the larger the value, the higher the quality.

### resType

* Type: String
* Default: "json"
* Example: "resType": "json"
* Remark: This option represents formatting the returned results. If it is json, the returned result is converted to json format.

### tipClass

* Type: String
* Default: ""
* Example: "tipClass": "tip"
* Remark: This option is the value of the plug-in message prompt layer class attribute. You can add class values for style overrides.

### fixOrientation

* Type: Boolean
* Default: true
* Example: "fixOrientation": false
* Remark: This option is to automatically correct the orientation of the image. When the mobile use the camera to take photos and upload, and use canvas to draw the uploaded photos, there will be the problem of photo orientation reversal. This is automatically fixed when the option is true. Note: JPG only works

### language

* Type: String
* Default: "english"
* Example: "language": "cn"
* Remark: This option is the language type of the library prompt message. For example, "please select the file", "the file is too large, the maximum allowed is 2M" and so on. The optional value is either "english" or "chinese".