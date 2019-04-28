/**
 * The default options file.
 * el: Bind to the element node.
 * name: The input element name which is created.
 * id: The input element id which is created.
 * accept: The input element accept which is created.
 * file: Bind to the input(type=file).
 * method: The http request type.
 * url: The file upload URL.
 * resType: The return type of the file after uploading.
 * autoUpload: Whether the file is automatically uploaded after selecting it.
 * maxFileSize: Maximum file size allowed to upload.
 * tipClass: The class of tip element node.
 * autoDrag: Whether drag upload is allowed.
 * fixOrientation: Whether to automatically correct the orientation of uploading photos.
 * allowFileExt: File extensions that allow uploading.
 * language: The tip info language.
 * compress: Whether to compress or not.
 * resize: Redefine the maxWidth and maxHeight.
 * compressQuality: The picture compression quality.
 * tipDurationTime: The tip layer display duration time.The unit is seconds.
 */
export default {
  'el': '',
  'name': 'file',
  'id': '',
  'accept': '',
  'file': '#file',
  'method': 'post',
  'url': '',
  'resType': 'json',
  'autoUpload': true,
  'maxFileSize': '2M',
  'tipClass': '',
  'allowDrag': false,
  'clip': false,
  'fixOrientation': true,
  'allowFileExt': [],
  'language': 'cn',
  'compress': true,
  'resize': {
    'maxWidth': 800,
    'maxHeight': 800
  },
  'compressQuality': 0.92,
  'tipDurationTime': 3
}
