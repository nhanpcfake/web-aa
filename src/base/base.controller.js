'use strict';

import BaseClass from './base.class'

class BaseController extends BaseClass {

  constructor() {
    super()
    this.responseSuccess = this.responseSuccess.bind(this)
    this.responseException = this.responseException.bind(this)
  }

  responseSuccess(response, collationId, code, data = {}, message) {
    // this.logger.info(`BaseController execute responseSuccess with collationId ${collationId}`)
    // this.logger.debug(`BaseController execute responseSuccess receive collationId`, collationId)
    // this.logger.debug(`BaseController execute responseSuccess receive code`, code)
    // this.logger.debug(`BaseController execute responseSuccess receive data`, data)
    // this.logger.debug(`BaseController execute responseSuccess receive message`, message)
    try {
      // const responseData = new this.model.response()
      // responseData.setCode(code)
      // responseData.setData(data)
      // responseData.setMessage(message)
      // this.logger.success(`BaseController execute responseSuccess with collationId ${collationId} response data`, responseData.getSuccess())
      // response
      //   .status(responseData.getSuccess().getHttpCode())
      //   .json(responseData.getSuccess());
    } catch (e) {
      this.logger.error(`BaseController responseSuccess with collationId ${collationId} ${e.toString()}`)
      throw e
    }
  }

  responseException(response, collationId) {
    // this.logger.info(`BaseController execute responseException with collationId ${collationId}`)
    // this.logger.debug(`BaseController execute responseException receive collationId`, collationId)
    try {
      // const responseData = new this.model.response()
      // response
      //   .status(responseData.getSystemException().getHttpCode())
      //   .send(responseData.getSystemException());
    } catch (e) {
      this.logger.error(`BaseController responseException with collationId ${collationId} ${e.toString()}`)
      throw e
    }
  }

}

export default BaseController
