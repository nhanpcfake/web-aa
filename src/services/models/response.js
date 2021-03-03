'use strict'

import HttpCode from '../codeResponse/http'
import ResponseCode from '../codeResponse/code'

class ResponseModel {

  constructor() {
    this.code = ''
    this.data = {}
    this.messages = ''
  }

  getSuccess() {
    return {
      code: this.getCode(),
      data: this.getData(),
      messages: this.getMessage(),
      getHttpCode: () => {
        return HttpCode.OK
      },
    }
  }

  getSystemException() {
    return {
      code: ResponseCode.SYSTEM_ERROR,
      data: {},
      messages: ResponseCode[ResponseCode.SYSTEM_ERROR],
      getHttpCode: () => {
        return HttpCode.OK
      },
    }
  }

  getBadRequest() {
    return {
      getHttpCode: () => {
        return HttpCode.BAD_REQUEST
      },
    }
  }

  setCode(code) {
    this.code = code
  }

  getCode() {
    return this.code
  }

  setData(data) {
    this.data = data
  }

  getData() {
    return this.data
  }

  setMessage(messages) {
    this.messages = messages
  }

  getMessage() {
    return this.messages
  }

}

export default ResponseModel
