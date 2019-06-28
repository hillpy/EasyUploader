/**
 * Common static function class.
 */
export default class {
  /**
     * Extend the new Obj to the old Obj.
     * @param {*} obj The old Obj.
     * @param {*} newObj The new Obj.
     */
  static extend (obj, newObj) {
    for (let key in newObj) {
      if (!(key in obj)) {
        obj[key] = newObj[key]
      } else if (obj[key].constructor === newObj[key].constructor) {
        if (obj[key].constructor === Object) {
          let childObj = obj[key]

          let childNewObj = newObj[key]
          for (let k in childNewObj) {
            childObj[k] = childNewObj[k]
          }
          obj[key] = childObj
        } else {
          obj[key] = newObj[key]
        }
      }
    }
    return obj
  }

  /**
     * Converts base64 to ArrayBuffer.
     * @param {*} base64 The file's base64.
     */
  static base64ToArrayBuffer (base64) {
    base64 = base64.replace(/^data:([^;]+);base64,/gim, '')
    let binary = atob(base64)

    let length = binary.length

    let buffer = new ArrayBuffer(length)

    let view = new Uint8Array(buffer)
    for (let i = 0; i < length; i++) {
      view[i] = binary.charCodeAt(i)
    }
    return buffer
  }

  /**
     * Get the jpg file's orientation.
     * @param {*} arrayBuffer The jpg file's arrayBuffer.
     */
  static getOrientation (arrayBuffer) {
    let dataView = new DataView(arrayBuffer)

    let length = dataView.byteLength

    let orientation

    let exifIDCode

    let tiffOffset

    let firstIFDOffset

    let littleEndian

    let endianness

    let app1Start

    let ifdStart

    let offset

    let i

    if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
      offset = 2
      while (offset < length) {
        if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
          app1Start = offset
          break
        }
        offset++
      }
    }
    if (app1Start) {
      exifIDCode = app1Start + 4
      tiffOffset = app1Start + 10
      if (this.getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
        endianness = dataView.getUint16(tiffOffset)
        littleEndian = endianness === 0x4949
        if (littleEndian || endianness === 0x4D4D) {
          if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
            firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian)
            if (firstIFDOffset >= 0x00000008) {
              ifdStart = tiffOffset + firstIFDOffset
            }
          }
        }
      }
    }
    if (ifdStart) {
      length = dataView.getUint16(ifdStart, littleEndian)
      for (i = 0; i < length; i++) {
        offset = ifdStart + i * 12 + 2
        if (dataView.getUint16(offset, littleEndian) === 0x0112) {
          offset += 8
          orientation = dataView.getUint16(offset, littleEndian)
          if (navigator.userAgent.indexOf('Safari') > -1) {
            dataView.setUint16(offset, 1, littleEndian)
          }
          break
        }
      }
    }
    return orientation
  }

  /**
     * Unicode to string.
     * @param {*} dataView
     * @param {*} start
     * @param {*} length
     */
  static getStringFromCharCode (dataView, start, length) {
    let string = ''

    let i
    for (i = start, length += start; i < length; i++) {
      string += String.fromCharCode(dataView.getUint8(i))
    }
    return string
  }

  /**
     * Get the random nonce.
     * @param {*} length The nonce length.
     */
  static getNonce (length) {
    length || (length = 16)
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

    let nonce = ''
    for (let i = 0; i < length; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return nonce
  }

  /**
     * Replace the string's placeholder.
     * @param {*} str The string.
     * @param {*} arr The new string array.
     */
  static replacePlaceholders (str, arr) {
    str || (str = '')
    arr || (arr = [])
    for (let i = 0; i < arr.length; i++) {
      str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arr[i])
    }
    return str
  }

  /**
     * Handle the result.
     * @param {*} res The result data.
     * @param {*} type Handle type. json | text
     */
  static handleRes (res, type) {
    if (type === 'json') {
      return JSON.parse(res)
    } else if (type === 'text') {
      return res
    } else {
      return res
    }
  }

  /**
   * Replace eval function.
   */
  static evil (fn) {
    let Fn = Function
    return new Fn('return ' + fn)()
  }
}
