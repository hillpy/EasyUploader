## Methods

EasyUploader also provides methods that can be used flexibly to implement different requirements.

### upload()

* Parameters: none
* Reutrn: none
* Call example: EasyUploader.upload()
* Remark: Execute file upload.
* Usage scenario: You can set the [autoUpload](options.md#autoupload) option to false if you don't want to automatically upload after the file is selected. You can then use this method to upload file.

### enableFileObjClick()

* Parameters: none
* Reutrn: none
* Call example: EasyUploader.enableFileObjClick()
* Remark: Enable file object click operations.
* Usage scenario: After the file object click operation is disabled (ie, clicking on the bound element node or the file node is unresponsive), the method can be executed to enable the click operation.

### disableFileObjClick()

* Parameters: none
* Reutrn: none
* Call example: EasyUploader.disableFileObjClick()
* Remark: Disable file object click operations.
* Usage scenario: This method can be implemented if you want to disable the click operation of the bound element node or file node.