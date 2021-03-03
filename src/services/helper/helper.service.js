'use strict'

import CryptoJS from 'crypto-js'

class HelperService {

  constructor() {
    if (!HelperService.instance) {
      HelperService.instance = this
    }
    return HelperService.instance
  }

  hashMD5(string = '') {
    return CryptoJS.MD5(string).toString()
  }

  parseUrlNews(str) {
    try {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return `${str.replace(/\s/g, "-")}.html`
    } catch (e) {
      
    }
  }

  parseDateUtc(timestamp) {
    let time = new Date(timestamp)
    time.setUTCHours(0)
    time.setUTCMinutes(0)
    time.setUTCSeconds(0)
    time.setUTCMilliseconds(0)
    return time.getTime()
  }

}

export default new HelperService()
