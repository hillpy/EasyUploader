import defaultOptions from './defaultoptions' // Import the defaultoptions module.
import tipInfos from './tipinfos' // Import the tipinfos module.
import common from './common' // Import the common module.
import { name, version } from '../../package.json'

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      let binStr = atob(this.toDataURL(type, quality).split(',')[1])

      let len = binStr.length

      let arr = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      callback(new Blob([arr], { type: type || 'image/png' }))
    }
  })
}

export default class EasyUploader {
  /**
   * The constructor.
   * @param {*} options Constructor options.
   */
  constructor (options = {}) {
    if (!(this instanceof EasyUploader)) {
      return new EasyUploader(options)
    }

    // The common params.
    this.classPrefix = name.toLowerCase()
    this.version = version
    this.fileObj = ''
    this.elObj = ''
    this.fileType = ''
    this.fileName = ''
    this.fileSize = ''
    this.fileExt = ''
    this.fileObjClickStatus = true
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.formData = new FormData()
    this.tips = {}

    // Extend config options.
    this.options = common.extend(JSON.parse(JSON.stringify(defaultOptions)), options)
    // Init function.
    this.init()
  }

  /**
   * Init function.
   */
  init () {
    let _tipInfos = JSON.parse(JSON.stringify(tipInfos))
    this.tips = _tipInfos.hasOwnProperty(this.options.language) ? _tipInfos[this.options.language] : _tipInfos['cn']

    if (this.options.el) {
      this.elObj = document.querySelector(this.options.el)
      this.createInput()
      this.bindElToInput()
      this.options.allowDrag && this.listenDrag(this.elObj)
    } else {
      this.fileObj = document.querySelector(this.options.file)
      this.options.allowDrag && this.listenDrag(this.fileObj)
    }

    this.listenFileObjClick()
    this.listenFileObjChange()
  }

  /**
   * Create the input(type=file).
   */
  createInput () {
    this.options.id || (this.options.id = this.classPrefix + '_' + common.getNonce())
    let input = document.createElement('input')
    input.type = 'file'
    input.name = this.options.name
    input.id = this.options.id
    input.accept = this.options.accept
    input.setAttribute('style', 'display: none !important;')
    this.elObj.parentNode.insertBefore(input, this.elObj.nextElementSibling)
    this.fileObj = document.querySelector('#' + this.options.id)
  }

  /**
   * Bind fileObj click event to elObj click event.
   */
  bindElToInput () {
    let _this = this
    _this.elObj.addEventListener('click', (e) => {
      e.preventDefault()
      _this.fileObj.click()
    })
  }

  /**
   * Enable fileObj click event.
   */
  enableFileObjClick () {
    this.fileObjClickStatus = true
  }

  /**
   * Disable fileObj click event.
   */
  disableFileObjClick () {
    this.fileObjClickStatus = false
  }

  /**
   * Listen fileObj click event.
   */
  listenFileObjClick () {
    let _this = this
    _this.fileObj.addEventListener('click', (e) => {
      _this.fileObjClickStatus || e.preventDefault()
    })
  }

  /**
   * Listen fileObj change event.
   */
  listenFileObjChange () {
    let _this = this
    _this.fileObj.addEventListener('change', () => {
      _this.fileIsChosen()
    })
  }

  /**
   * Listen drag event
   * @param {*} obj The listen obj.
   */
  listenDrag (obj) {
    let _this = this
    obj.addEventListener('drop', (e) => {
      e.preventDefault()
      _this.options.onDrop && _this.options.onDrop(e)
      _this.fileObj.files = e.dataTransfer.files
      _this.fileIsChosen()
    })
    obj.addEventListener('dragover', (e) => {
      e.preventDefault()
      _this.options.onDragOver && _this.options.onDragOver(e)
    })
    obj.addEventListener('dragenter', (e) => {
      e.preventDefault()
      _this.options.onDragEnter && _this.options.onDragEnter(e)
    })
    obj.addEventListener('dragleave', (e) => {
      e.preventDefault()
      _this.options.onDragLeave && _this.options.onDragLeave(e)
    })
  }

  /**
   * File is chosen
   */
  fileIsChosen () {
    this.fileType = this.fileObj.files[0].type
    this.fileName = this.fileObj.files[0].name
    this.fileExt = this.fileName.split('.').pop().toLowerCase()
    this.fileSize = this.fileObj.files[0].size
    if (this.checkFile()) {
      if (this.needCanvas()) {
        this.drawAndRenderCanvas()
      } else {
        this.options.autoUpload && this.uploadFile(this.fileObj.files[0])
      }
    }
  }

  /**
   * Draw and render canvas.
   */
  drawAndRenderCanvas () {
    let _this = this

    let reader = new FileReader()

    let image = new Image()

    let arrayBuffer = new ArrayBuffer()

    let orientation = 1

    let width = ''

    let height = ''

    reader.readAsDataURL(_this.fileObj.files[0])
    reader.onload = (e) => {
      arrayBuffer = common.base64ToArrayBuffer(e.target.result)
      orientation = common.getOrientation(arrayBuffer)
      image.src = e.target.result
    }

    image.onload = () => {
      if (_this.options.compress) {
        if (image.width > _this.options.resize.maxWidth || image.height > _this.options.resize.maxHeight) {
          if (image.width > image.height) {
            width = _this.options.resize.maxWidth
            height = (image.height / image.width) * _this.options.resize.maxWidth
          } else {
            width = (image.width / image.height) * _this.options.resize.maxHeight
            height = _this.options.resize.maxHeight
          }
        } else {
          width = image.width
          height = image.height
        }
      } else {
        width = image.width
        height = image.height
        _this.options.compressQuality = 1
      }

      if (_this.options.fixOrientation) {
        switch (orientation) {
          // 180 degree
          case 3:
            _this.canvas.width = width
            _this.canvas.height = height
            _this.context.rotate(180 * Math.PI / 180)
            _this.context.drawImage(image, -width, -height, width, height)
            break

          // clockwise 90 degree
          case 6:
            _this.canvas.width = height
            _this.canvas.height = width
            _this.context.rotate(90 * Math.PI / 180)
            _this.context.drawImage(image, 0, -height, width, height)
            break

          // clockwise 270 degree
          case 8:
            _this.canvas.width = height
            _this.canvas.height = width
            _this.context.rotate(270 * Math.PI / 180)
            _this.context.drawImage(image, -width, 0, width, height)
            break

          // 0 degree and default
          case 1:
          default:
            _this.canvas.width = width
            _this.canvas.height = height
            _this.context.drawImage(image, 0, 0, width, height)
        }
      } else {
        _this.canvas.width = width
        _this.canvas.height = height
        _this.context.drawImage(image, 0, 0, width, height)
      }

      _this.canvas.setAttribute('style', 'display: none !important;')
      document.querySelector('body').appendChild(_this.canvas)
      _this.options.autoUpload && _this.uploadCanvas()
    }
  }

  /**
   * The upload file function.
   */
  upload () {
    if (this.fileType.indexOf('image/') >= 0 && this.options.compress) {
      this.uploadCanvas()
    } else {
      this.uploadFile(this.fileObj.files[0])
    }
  }

  /**
   * Upload the canvas picture.
   */
  uploadCanvas () {
    let _this = this

    if (!_this.fileObj.files[0]) {
      _this.renderTipDom(this.tips.noFile)
      return
    }

    _this.canvas.toBlob((blob) => {
      _this.uploadFile(blob)
    }, _this.fileType, _this.options.compressQuality)
  }

  /**
   * Upload file.
   * @param {*} value The input file's value.
   */
  uploadFile (value) {
    let _this = this

    if (!_this.fileObj.files[0]) {
      _this.renderTipDom(this.tips.noFile)
      return
    }

    _this.formData.has(_this.options.name) && _this.formData.delete(_this.options.name)
    _this.formData.append(_this.options.name, value, _this.fileName)
    let xhr = new XMLHttpRequest()
    xhr.open(_this.options.method, _this.options.url, true)
    xhr.upload.addEventListener('progress', (e) => {
      _this.options.onUploadProgress && _this.options.onUploadProgress(e)
    })
    xhr.upload.addEventListener('loadstart', (e) => {
      _this.options.onUploadStart && _this.options.onUploadStart(e)
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          _this.options.onUploadComplete && _this.options.onUploadComplete(common.handleRes(xhr.responseText, this.options.resType.toLowerCase()))
        } else {
          _this.options.onUploadError && _this.options.onUploadError(xhr.status)
        }
        if (_this.needCanvas()) {
          _this.canvas.remove()
        }
        _this.fileObj.value = ''
      }
    }
    // xhr.setRequestHeader('Content-type', 'multipart/form-data');
    xhr.send(_this.formData)
  }

  /**
   * Render tipDom to body.
   * @param {*} text The tip text.
   */
  renderTipDom (text) {
    let oldTipDiv = document.getElementById(this.classPrefix + '_tipdom')
    oldTipDiv && oldTipDiv.remove()
    let tipDiv = document.createElement('div')
    tipDiv.id = this.classPrefix + '_tipdom'
    tipDiv.innerHTML = text
    if (this.options.tipClass) {
      tipDiv.className = this.options.tipClass
    } else {
      tipDiv.setAttribute('style', 'max-width: 100%;padding: 16px 20px;font-size: 14px;color: #fff;box-sizing: border-box;border-radius: 2px;filter: Alpha(opacity=80);opacity: 0.8;-moz-opacity: 0.8;user-select: none;position: fixed;top: 50%;left: 50%;z-index: 100000;transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px));-webkit-transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px));text-align: center;background: #000;word-wrap: break-word;word-break: break-all;')
    }
    document.querySelector('body').appendChild(tipDiv)

    let tipDurationTime = defaultOptions.tipDurationTime
    if (typeof this.options.tipDurationTime === 'number' && this.options.tipDurationTime > 0) {
      tipDurationTime = this.options.tipDurationTime
    }

    setTimeout(() => {
      let opacity = tipDiv.style.opacity
      if (opacity > 0) {
        opacity = (opacity - 0.2).toFixed(1)
        if (opacity < 0) {
          opacity = 0
        }
        let hideTip = setInterval(() => {
          tipDiv.style.opacity = opacity
          tipDiv.style.filter = 'Alpha((opacity = ' + opacity * 100 + '))'
          if (opacity <= 0) {
            tipDiv.remove()
            clearInterval(hideTip)
          } else {
            opacity = (opacity - 0.1).toFixed(1)
            if (opacity < 0) {
              opacity = 0
            }
          }
        }, 10)
      } else {
        tipDiv.remove()
      }
    }, tipDurationTime * 1000)
  }

  /**
   * Check the file,such as fileType and maxFileSize.
   */
  checkFile () {
    let maxFileSize = this.options.maxFileSize

    let maxFileSizeWithLetter = 0

    let letterStr = ''
    if (maxFileSize.indexOf('B') > 0) {
      maxFileSize = maxFileSize.replace(/B/g, '')
      letterStr = 'B'
    }
    if (maxFileSize.indexOf('K') > 0) {
      maxFileSizeWithLetter = common.evil(maxFileSize.replace(/K/g, ''))
      maxFileSize = maxFileSizeWithLetter * 1024
      letterStr = 'K' + letterStr
    } else if (maxFileSize.indexOf('M') > 0) {
      maxFileSizeWithLetter = common.evil(maxFileSize.replace(/M/g, ''))
      maxFileSize = maxFileSizeWithLetter * 1024 * 1024
      letterStr = 'M' + letterStr
    } else if (maxFileSize.indexOf('G') > 0) {
      maxFileSizeWithLetter = common.evil(maxFileSize.replace(/G/g, ''))
      maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024
      letterStr = 'G' + letterStr
    } else if (maxFileSize.indexOf('T') > 0) {
      maxFileSizeWithLetter = common.evil(maxFileSize.replace(/T/g, ''))
      maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024 * 1024
      letterStr = 'T' + letterStr
    } else if (maxFileSize.indexOf('P') > 0) {
      maxFileSizeWithLetter = common.evil(maxFileSize.replace(/P/g, ''))
      maxFileSize = maxFileSizeWithLetter * 1024 * 1024 * 1024 * 1024 * 1024
      letterStr = 'P' + letterStr
    } else {
      maxFileSizeWithLetter = common.evil(maxFileSize)
      maxFileSize = maxFileSizeWithLetter
      letterStr = 'B'
    }

    if (this.fileSize > maxFileSize) {
      this.renderTipDom(common.replacePlaceholders(
        this.tips.fileTooLarge,
        [maxFileSizeWithLetter + letterStr]
      ))
      this.fileObj.value = ''
      return false
    }

    if (this.options.allowFileExt.length > 0 && this.options.allowFileExt.indexOf(this.fileExt) === -1) {
      this.renderTipDom(common.replacePlaceholders(
        this.tips.fileExtNotAllow,
        [this.options.allowFileExt.join('，')]
      ))

      this.fileObj.value = ''
      return false
    }

    return true
  }

  /**
   * need to use canvas?
   */
  needCanvas () {
    if (this.fileType.indexOf('image/') >= 0 && (this.options.compress || this.options.clip)) {
      return true
    }

    return false
  }
}
