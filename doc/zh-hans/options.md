## 选项

EasyUploader在实例化时支持很多选项配置。选项以对象键值形式传入，通过不同选项实现不同特性。

### el

* 类型：String
* 默认值：""
* 值示例："el": "#btn"
* 备注：该选项表示上传功能需要绑定的元素按钮节点。可以是button元素，或者div元素等等。当该选项存在时[file](options.md#file)选项将无效。值建议为"#id"形式而非".class"形式。

### file

* 类型：String
* 默认值："#file"
* 值示例："file": "#file"
* 备注：该选项表示上传功能需要绑定的input（type=file）对象。仅在[el](options.md#el)选项不存在时有效。

### name

* 类型：String
* 默认值："file"
* 值示例："name": "file"
* 备注：该选项代表创建的input file的name属性。当[el](options.md#el)选项存在时有效。必须填写该选项。

### id

* 类型：String
* 默认值：自动创建
* 值示例："id": "easyuploader_file"
* 备注：该选项代表创建的input file的id属性。当[el](options.md#el)选项存在时有效。若不填写，库将会自动创建该选项的值。

### accept

* 类型：String
* 默认值：""
* 值示例："accept": "image/*"
* 备注：该选项代表创建的input file的accept属性。当[el](options.md#el)选项存在时有效。

### url

* 类型：String
* 默认值：""
* 值示例："url": "./upload.php"
* 备注：该选项代表文件提交到的后端url。本库只负责前端部分，后端上传代码需自己编写。

upload.php简单示例

``` php
<?php

if (strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
    $res = array(
        'code' => 0,
        'msg' => '上传失败'
    );

    // 原文件名
    $fileName = $_FILES['file']['name'];
    // 临时文件
    $tmpName = $_FILES['file']['tmp_name'];
    // 文件类型
    $type = $_FILES['file']['type'];
    // 文件大小
    $size = $_FILES['file']['size'];

    $uploadDir = './file/';
    if (!file_exists($uploadDir) || !is_dir($uploadDir)) {
        mkdir($uploadDir);
    }

    // 打开并读取临时文件
    $fp = fopen($tmpName, 'r');
    $file = fread($fp, $size);
    $data = $file;

    // 打开文件准备写入
    $newFile = fopen($uploadDir . $fileName, 'w');
    // 写入二进制流到文件
    fwrite($newFile, $data);
    // 关闭文件
    fclose($newFile);

    $res['code'] = 1;
    $res['msg'] = '上传成功';
    $res['data'] = array(
        'file_type'=>$type,
        'path'=>$uploadDir . $fileName
    );
    echo json_encode($res);
} else {
    exit('禁止访问');
}
```

### method

* 类型：String
* 默认值："post"
* 值示例："method": "post"
* 备注：该选项代表上传时的http ajax请求类型。推荐为post。

### maxFileSize

* 类型：String
* 默认值："2M"
* 值示例："maxFileSize": "10M"
* 备注：该选项代表上传的文件的最大容量。填写值示例："10 \* 1024 \* 1024"，"2M"，"500 KB"，"10 \* 1 MB"等等。若不填写字母（"KB"等），默认为B（字节）。还可填写"\*"进行数值计算。注意：字母必须为大写。

### autoUpload

* 类型：Boolean
* 默认值：true
* 值示例："autoUpload": true
* 备注：该选项代表在选择文件后是否自动上传文件。若为false，需要手动调用方法上传[EasyUploader.upload()](methods.md#upload)

### allowDrag

* 类型：Boolean
* 默认值：false
* 值示例："allowDrag": true
* 备注：该选项代表是否开启拖曳上传功能。开启后可直接将文件拖曳至绑定元素区域实现上传。

### allowFileExt

* 类型：Array
* 默认值：[]
* 值示例："allowFileExt": ["jpg", "jpeg", "png"]
* 备注：该选项代表允许上传的文件的扩展类型。完全根据文件名的扩展名称来进行判断，不允许的扩展名称将无法上传。默认为空数组时，不限制上传文件类型。注意：虽然input的accept属性在选择文件时可以限制文件类型，但开启拖曳上传时将失效，故若要限制文件类型，建议配置此选项。另外，必须填写小写字母。

### compress

* 类型：Boolean
* 默认值：true
* 值示例："compress": true
* 备注：该选项代表在图片上传之前，是否对图片进行压缩处理。注意：仅图片有效。若为true，则会先进行压缩再进行上传。

### resize

* 类型：Object
* 默认值：{ "maxWidth": 800, "maxHeight": 800 }
* 值示例："resize": { "maxWidth": 1000, "maxHeight": 1000 }
* 备注：该选项代表图片重新绘制的最大宽高（图片宽高上的压缩）。需传入maxWidth（最大宽），maxHeight（最大高）两个键值。当[compress](options.md#compress)为true时生效。

### compressQuality

* 类型：Number
* 默认值：0.92
* 值示例："compressQuality": 0.9
* 备注：该选项代表图片重新绘制的质量（图片质量上的压缩）。在重新绘制尺寸基础上再对图片质量进行压缩。当[compress](options.md#compress)为true时生效。且仅对jpg、webp格式的图片有效。值必须在0-1之间，值越大质量越高。

### resType

* 类型：String
* 默认值："json"
* 值示例："resType": "json"
* 备注：该选项代表对返回结果做格式处理。若为json，将会把返回结果转成json格式。

### tipClass

* 类型：String
* 默认值：""
* 值示例："tipClass": "tip"
* 备注：该选项为库消息提示层class属性的值。可添加class值进行样式重写

### fixOrientation

* 类型：Boolean
* 默认值：true
* 值示例："fixOrientation": false
* 备注：该选项为是否自动修正图片的方向。移动端使用相机拍照上传，并使用canvas绘制上传的照片时，会出现照片方向翻转的问题。当该选项为true时会对此进行自动修正。注意：仅jpg有效。

### language

* 类型：String
* 默认值："cn"
* 值示例："language": "en"
* 备注：该选项为库提示信息的语言类型。比如"请选择文件"、"文件太大，最大允许为2M"等等。可选值为"en"或"cn"。

### tipDurationTime

* 类型：Number
* 默认值：3
* 值示例："tipDurationTime": 1.5
* 备注：该选项为库提示信息层显示的持续时间，单位为秒。比如设置为1.5，则提示信息层显示后将在1.5秒之后消失。