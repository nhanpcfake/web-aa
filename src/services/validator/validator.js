import Exception from './exception'

class ValidatorService {

  constructor() {
    if (!ValidatorService.instance) {

      ValidatorService.instance = this
    }
    return ValidatorService.instance
  }

  validate(field, value, rules, messages) {
    try {
      if (!Array.isArray(rules)) {
        throw new Exception(field, 'rules is not array')
      }
      if (!Array.isArray(messages)) {
        throw new Exception(field, 'messages is not array')
      }
      rules.map((rule, index) => {
        this[rule](field, value, messages[index])
      })
    } catch (exception) {
      throw exception
    }
  }

  isString(field, value, message = 'is not string') {
    try {
      value = value.trim()
      if (typeof value !== 'string') {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isBoolean(field, value, message = 'is not boolean') {
    try {
      if (typeof value !== 'boolean') {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isNotEmpty(field, value, message = 'is empty') {
    try {
      if (typeof value === 'undefined' || value === null || value === '') {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isNumber(field, value, message = 'is not number') {
    try {
      if (typeof value !== 'number') {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isArray(field, value, message = 'is not array') {
    try {
      if (!Array.isArray(value)) {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isObject(field, value, message = 'is not object') {
    try {
      this.isNotEmpty(field, value, message)
      if (typeof value !== "object") {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isUsername(field, value, message = 'username invalid') {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9@\.\-_]{4,45}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isPassword(field, value, message = 'password invalid') {
    try {
      // const regex = new RegExp(/^[a-zA-Z0-9@]{6,500}$/)
      // if (!regex.test(value)) {
      //   throw new Exception(field, message)
      // }
    } catch (exception) {
      throw exception
    }
  }

  isFullName(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{4,50}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isPhoneNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{8,20}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isUserId(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{9,9}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isEmail(field, value, message) {
    try {
      const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isAddress(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{4,200}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  clearVietnamese(str) {
    try {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return str
    } catch (e) {
      return str
    }
  }

  isProductName(field, value, message) {
    try {
      // const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{4,100}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isProductLink(field, value, message) {
    try {
      const regex = new RegExp(/^(https?:\/\/[^\s]+)$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isImage(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9@\.\:\-\s]{20,1000}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (exception) {
      throw exception
    }
  }

  isNewsTitle(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s\.\-\_\/\?\+\*\#\@\!\&\%\$\~]{4,100}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isNewsSummary(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s\.\-\_\/\?\+\*\#\@\!\&\%\$\~]{4,100}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isCategoryName(field, value, message) {
    try {
      // const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{4,100}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isCategoryDescription(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s\(\)\+\-\_]{4,5000}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isServicesCategoryId(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9]{24,24}$/)
      if (!regex.test(value)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isServicesName(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s\(\)\+\-\_]{4,300}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  isServicesDescription(field, value, message) {
    try {
      const clearVietnamese = this.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s\(\)\+\-\_]{4,5000}$/)
      if (!regex.test(clearVietnamese)) {
        throw new Exception(field, message)
      }
    } catch (e) {
      throw e
    }
  }

}

export default new ValidatorService()
