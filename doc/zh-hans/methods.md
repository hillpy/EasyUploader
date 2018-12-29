## 方法

easyUpload还提供了一些方法。可灵活使用来实现不同需求。

### upload()

* 参数：无
* 返回值: 无
* 调用示例：easyUploader.upload()
* 备注：执行文件上传。
* 使用场景：若不想在文件选择后自动上传，可设置[autoUpload](options.md#autoupload)选项为false。之后可使用该方法来进行文件上传。

### enableFileObjClick()

* 参数：无
* 返回值: 无
* 调用示例：easyUploader.enableFileObjClick()
* 备注：启用文件对象点击操作。
* 使用场景：在文件对象点击操作被禁用后（即点击绑定的元素节点或文件节点无反应），可执行该方法来启用点击操作。

### disableFileObjClick()

* 参数：无
* 返回值: 无
* 调用示例：easyUploader.disableFileObjClick()
* 备注：禁用文件对象点击操作。
* 使用场景：若希望禁用绑定的元素节点或文件节点的点击操作，可执行该方法来实现。