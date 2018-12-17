/**
 * 通用静态函数类
 */
export default class {
    /**
     * 扩展对象函数
     * @param {*} obj 
     * @param {*} newObj 
     */
    static extend(obj, newObj) {
        for (let key in newObj) {
            if (!(key in obj)) {
                obj[key] = newObj[key];
            } else if (obj[key].constructor == newObj[key].constructor) {
                if (obj[key].constructor === Object) {
                    let childObj =obj[key],
                        childNewObj = newObj[key];
                    for (let k in childNewObj) {
                        childObj[k] = childNewObj[k]
                    }
                    obj[key] = childObj;
                } else {
                    obj[key] = newObj[key];
                }
            }
        }
        return obj;
    }

    /**
     * 图片的base64转ArrayBuffer对象
     */
    static base64ToArrayBuffer(base64) {
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
        var binary = atob(base64),
            length = binary.length,
            buffer = new ArrayBuffer(length),
            view = new Uint8Array(buffer);
        for (var i = 0; i < length; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    /**
     * 获取jpg图片的orientation（即角度）
     */
    static getOrientation(arrayBuffer) {
        var dataView = new DataView(arrayBuffer),
            length = dataView.byteLength,
            orientation,
            exifIDCode,
            tiffOffset,
            firstIFDOffset,
            littleEndian,
            endianness,
            app1Start,
            ifdStart,
            offset,
            i;

        if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
            offset = 2;
            while (offset < length) {
                if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
                    app1Start = offset;
                    break;
                }
                offset++;
            }
        }
        if (app1Start) {
            exifIDCode = app1Start + 4;
            tiffOffset = app1Start + 10;
            if (this.getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
                endianness = dataView.getUint16(tiffOffset);
                littleEndian = endianness === 0x4949;
                if (littleEndian || endianness === 0x4D4D) {
                    if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                        firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                        if (firstIFDOffset >= 0x00000008) {
                            ifdStart = tiffOffset + firstIFDOffset;
                        }
                    }
                }
            }
        }
        if (ifdStart) {
            length = dataView.getUint16(ifdStart, littleEndian);
            for (i = 0; i < length; i++) {
                offset = ifdStart + i * 12 + 2;
                if (dataView.getUint16(offset, littleEndian) === 0x0112) {
                    offset += 8;
                    orientation = dataView.getUint16(offset, littleEndian);
                    if (navigator.userAgent.indexOf("Safari") > -1) {
                        dataView.setUint16(offset, 1, littleEndian);
                    }
                    break;
                }
            }
        }
        return orientation;
    }

    /**
     * Unicode码转字符串
     */
    static getStringFromCharCode(dataView, start, length) {
        var string = '',
            i;
        for (i = start, length += start; i < length; i++) {
            string += String.fromCharCode(dataView.getUint8(i));
        }
        return string;
    }

    /**
     * 获取随机字符串
     */
    static getNonce(length) {
        length || (length = 16);
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
            nonce = '';
        for (var i = 0; i < length; i++) {
            nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
    }
}