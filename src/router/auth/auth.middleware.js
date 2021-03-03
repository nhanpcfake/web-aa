'use strict'

import BaseMiddleware from '../../base/base.middleware'
import AuthPayload from './auth.payload'

class AuthMiddleware extends BaseMiddleware {

  constructor() {
    if (!AuthMiddleware.instance) {
      super()
      this.login = this.login.bind(this)
      AuthMiddleware.instance = this
    }
    return AuthMiddleware.instance = this
  }

  login(request, response, next) {
    this.logger.info(`UserMiddleware execute login`)
    try {
      const payload = request.body
      this.logger.debug(`UserMiddleware execute login receive payload`, payload)
      this.validator.isObject('payload', payload, 'require payload')
      const userModel = new AuthPayload()
      userModel.set('username', payload.username, userModel.username)
      userModel.set('password', payload.password, userModel.password)
      request.payload = userModel
      next()
    } catch (e) {
      this.logger.error(`UserMiddleware login ${e.toString()}`)
      const responseData = new this.model.response()
      responseData.setMessage(e.toString())
      response
        .status(responseData.getSystemException().getHttpCode())
        .send(responseData.getSystemException());
    }
  }

}

export default new AuthMiddleware()
