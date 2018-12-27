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