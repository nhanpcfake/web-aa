'use strict';

import BaseClass from './base.class'

class BaseMiddleware extends BaseClass {

  constructor() {
    super()
    this.setHeaders = this.setHeaders.bind(this)
  }

  setHeaders(request, response, next) {
    this.logger.info(`BaseMiddleware execute setHeaders`)
    this.logger.debug(`BaseMiddleware execute setHeaders receive headers`, request.headers)
    try {
      const requestModel = new this.model.request()
      requestModel.setHeaders(request.headers)
      request.headers = requestModel
      next()
    } catch (e) {
      this.logger.error(`BaseMiddleware setHeaders ${e.toString()}`)
      const responseData = new this.model.response()
      response
        .status(responseData.getSystemException().getHttpCode())
        .send(responseData.getSystemException());
    }
  }

}

export default BaseMiddleware
