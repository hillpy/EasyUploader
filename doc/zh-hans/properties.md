## 属性

EasyUploader还支持内部属性的获取与修改。

### classPrefix

* 类型：String
* 备注：该属性为一般为类库名称小写（如：easyuploader），用于作为类库内部创建元素时的属性名称（如class、id）的前缀，避免冲突产生。在EasyUploader初始化时生成。

### version

* 类型：String
* 备注：该属性为类库版本号（不含'v'）。在EasyUploader初始化时生成。

### fileObj

* 类型：Object
* 备注：该属性为input（type=file）对象。在EasyUploader初始化时生成。

### elObj

* 类型：Object
* 备注：该属性为绑定的元素的对象。在EasyUploader初始化时生成。

### fileType

* 类型：String
* 备注：该属性为上传文件的类型。在文件上传时获取。

### fileName

* 类型：String
* 备注：该属性为上传文件的名称。在文件上传时获取。

### fileSize

* 类型：Number
* 备注：该属性为上传文件的容量，单位字节。在文件上传时获取。

### fileExt

* 类型：String
* 备注：该属性为上传文件的扩展名。在文件上传时获取，并转为小写。

### fileObjClickStatus

* 类型：Boolean
* 备注：该属性为文件对象的点击操作可用状态。true为可用，false为禁用。默认为true。

### canvas

* 类型：Object
* 备注：该属性为内部canvas对象。

### context

* 类型：Object
* 备注：该属性为内部context对象。

### formData

* 类型：Object
* 备注：该属性为内部FormData对象。

### options

* 类型：Object
* 备注：该属性为扩展后的最终配置选项。

### tips

* 类型：Object
* 备注：该属性为提示信息配置对象。