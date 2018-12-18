# input file类选项

当el选项存在时（即绑定到元素按钮节点），插件将会创建一个隐藏的input file。涉及的属性来自插件选项，如下：

## name

* 类型：String
* 默认值："file"
* 值示例："name": "file"
* 解释：该选项代表创建的input file的name属性。当el选项存在时有效，必须填写该选项。

## id

* 类型：String
* 默认值：自动创建
* 值示例："id": "easyuploader_file"
* 解释：该选项代表创建的input file的id属性。当el选项存在时有效，若不填写，插件将会自动创建该选项的值。

## accept

* 类型：String
* 默认值：""
* 值示例："accept": "image/*"
* 解释：该选项代表创建的input file的accept属性。当el选项存在时有效。