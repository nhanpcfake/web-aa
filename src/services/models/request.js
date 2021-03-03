'use strict'

class RequestModel {

  constructor() {
    this.headers = {
      ['content-type']: '',
    }
  }

  getHeaders() {
    return this.headers
  }

  setHeaders(headers) {
    this.headers = headers
  }

}

export default RequestModel
