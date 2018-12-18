# 压缩类选项

包含图片压缩相关的选项，具体如下：

## compress

* 类型：Boolean
* 默认值：true
* 值示例："compress": true
* 解释：该选项代表在图片上传之前，是否对图片进行压缩处理。注意，仅图片有效。若为true，则会先进行压缩再进行上传

## resize

* 类型：Object
* 默认值：{ "maxWidth": 800, "maxHeight": 800 }
* 值示例："resize": { "maxWidth": 1000, "maxHeight": 1000 }
* 解释：该选项代表图片重新绘制的最大尺寸（图片尺寸上的压缩），需传入maxWidth（最大宽），maxHeight（最大高）两个键值。当compress为true时生效。

## compressQuality

* 类型：Float
* 默认值：0.92
* 值示例："compressQuality": 0.9
* 解释：该选项代表图片重新绘制的质量（图片质量上的压缩）。在重新绘制尺寸基础上再对图片质量进行压缩，当compress为true时生效，且仅对jpg、webp格式的图片有效。值必须在0-1之间，值越大质量越高。