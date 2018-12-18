# 上传类选项

包含上传相关的选项，如下：

## url

* 类型：String
* 默认值：""
* 值示例："url": "./upload.php"
* 解释：该选项代表文件提交到的后端地址。本插件只负责前端部分，后端上传代码需自己编写。

upload.php简单示例

```
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

## method

* 类型：String
* 默认值："post"
* 值示例："method": "post"
* 解释：该选项代表上传时的http ajax请求方式。通常为post。

## maxFileSize

* 类型：String
* 默认值："2M"
* 值示例："maxFileSize": "10M"
* 解释：该选项代表上传的文件的最大容量。填写值示例："10 \* 1024 \* 1024"，"2M"，"500 KB"，"10 \* 1 MB"等等。若不填写字母（"KB"等），默认为B（字节）。还可填写"\*"进行数值计算。注意：字母必须为大写。

## autoUpload

* 类型：Boolean
* 默认值：true
* 值示例："autoUpload": true
* 解释：该选项代表在选择文件后是否自动上传文件。若为false，需要手动调用方法上传easyUploader.upload()

## allowDrag

* 类型：Boolean
* 默认值：false
* 值示例："allowDrag": true
* 解释：该选项代表是否开启拖曳上传功能。开启后可直接将文件拖曳至绑定元素区域实现上传。

# allowFileExt

* 类型：Array
* 默认值：[]
* 值示例："allowFileExt": ["jpg", "jpeg", "png"]
* 解释：该选项代表允许上传的文件的扩展类型。完全根据文件名的扩展名称来进行判断，不允许的扩展名称将无法上传。默认为空数组时，不限制上传文件类型。注意：虽然input的accept属性在选择文件时可以限制文件类型，但开启拖曳上传时将失效，故若要限制文件类型，建议配置此选项。