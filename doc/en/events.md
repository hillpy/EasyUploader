## Events

EasyUploader also provides events for more flexible interactions.

### onUploadProgress

* Event example: onUploadProgress: function(e) {}
* Triggering time: Triggered when the file starts uploading.
* Remark: When the library uploads a file, it listens for the upload progress event and executes the callback event.

### onUploadStart

* Event example: onUploadStart: function(e) {}
* Triggering time: Triggered before starting file upload.
* Remark: When the library uploads a file, it listens for the loadstart event and executes the callback event

### onUploadComplete

* Event example: onUploadComplete: function(data) {}
* Triggering time: Triggered after file upload successful.
* Remark: When the library successfully uploads the file, the callback event is executed and the result is processed according to the resType option and returned as a parameter.

### onUploadError

* Event example: onUploadError: function(statusCode) {}
* Triggering time: Triggered after file upload failes.
* Remark: When the library fails to upload the file, it executes the callback event and returns the HTTP status code as a parameter when the failure occurs.

### onDrop

* Event example: onDrop: function(e) {}
* Triggering time: Triggered when a file is placed in the drag area (that is, when the user to let go).
* Remark: The library listens for drop events in the drag area, blocks the default event, and then executes the callback event.

### onDragOver

* Event example: onDragOver: function(e) {}
* Triggering time: Event are constantly triggered when a file in a drag area.
* Remark: The library listens for the dragover event in the drag area, blocks the default event, and then executes the callback event.

### onDragEnter

* Event example: onDragEnter: function(e) {}
* Triggering time: Triggered when a file is dragged into the drag area.
* Remark: The library listens for the dragenter event in the drag area, blocks the default event, and then executes the callback event.

### onDragLeave

* Event example: onDragLeave: function(e) {}
* Triggering time: Triggered when a file is dragged out of the drag area.
* Remark: The library listens for the dragleave event in the drag area, blocks the default event, and then executes the callback event.