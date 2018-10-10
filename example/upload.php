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
    echo json_encode($res);
} else {
    exit('禁止访问');
}