# 拖曳类事件

## onDrop

* 事件示例：onDrop: function(e) {}
* 触发时间：当文件在拖曳区域内放入（即用户松手）时触发
* 解释：插件会监听拖曳区域的drop事件，并阻止默认事件，然后执行该回调事件。

## onDragOver

* 事件示例：onDragOver: function(e) {}
* 触发时间：当文件在拖曳区域内时会不断触发
* 解释：插件会监听拖曳区域的dragover事件，并阻止默认事件，然后执行该回调事件。

## onDragEnter

* 事件示例：onDragEnter: function(e) {}
* 触发时间：当文件被拖入拖曳区域内时触发
* 解释：插件会监听拖曳区域的dragenter事件，并阻止默认事件，然后执行该回调事件。

## onDragLeave

* 事件示例：onDragLeave: function(e) {}
* 触发时间：当文件被拖离拖曳区域内时触发
* 解释：插件会监听拖曳区域的dragleave事件，并阻止默认事件，然后执行该回调事件。