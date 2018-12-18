# 其它类型

# resType

* 类型：String
* 默认值："json"
* 值示例："resType": "json"
* 解释：该选项代表对返回结果做格式处理。若为json，将会把返回结果转成json格式。

# tipClass

* 类型：String
* 默认值：""
* 值示例："tipClass": "tip"
* 解释：该选项为插件消息提示层class属性的值。可添加class值进行样式重写

# fixOrientation

* 类型：Boolean
* 默认值：true
* 值示例："fixOrientation": false
* 解释：该选项为是否自动修正图片的方向。移动端使用相机拍照上传，并使用canvas绘制上传的照片时，会出现照片方向翻转的问题。当该选项为true时会对此进行自动修正。注意：仅jpg有效。
