export default {
    // 绑定到元素节点
    "el": "",
    // 创建的input name
    "name": "file",
    // 创建的input id
    "id": "",
    // 创建的input accept
    "accept": "",

    // 绑定到file
    "file": "#file",

    // http上传方式
    "method": "post",
    // 文件上传地址
    "url": "",
    // 上传结果返回类型
    "resType": "json",
    // 是否自动上传
    "autoUpload": true,
    // 上传文件最大容量
    "maxFileSize": "2M",
    // 提示层样式
    "tipClass": "",
    // 是否允许拖拽上传
    "allowDrag": false,
    // 是否自动修正上传照片方向
    "fixOrientation": true,
    // 允许上传的文件扩展名
    "allowFileExt": [],

    // 是否进行压缩（仅图片有效）
    "compress": true,
    // 重置尺寸（仅图片有效）
    "resize": {
        "maxWidth": 800,
        "maxHeight": 800
    },
    // 压缩质量（仅图片有效，图片格式必须为jpg、webp，必须为0-1小数，默认0.92）
    "compressQuality": 0.92,
}