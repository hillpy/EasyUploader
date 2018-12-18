# 上传类事件

## onUploadProgress

* 事件示例：onUploadProgress: function(e) {}
* 触发时间：文件开始上传时触发
* 解释：插件上传文件时会监听上传进度事件（progress），并执行该回调事件。

## onUploadStart

* 事件示例：onUploadStart: function(e) {}
* 触发时间：文件上传开始前触发
* 解释：插件上传文件时会监听开始加载事件（loadstart），并执行该回调事件。

## onUploadComplete

* 事件示例：onUploadComplete: function(data) {}
* 触发时间：文件上传成功后触发
* 解释：插件上传文件成功后，会执行该回调事件，并将结果根据resType选项处理后作为参数返回。

## onUploadError

* 事件示例：onUploadError: function(statusCode) {}
* 触发时间：文件上传失败后触发
* 解释：插件上传文件失败后，会执行该回调事件，并将失败时的http状态码作为参数返回。