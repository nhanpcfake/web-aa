'use strict'

import { Router } from 'express';

import AuthController from './auth.controller'
import AuthMiddleware from './auth.middleware'

class AuthRouter {

  constructor() {
    if (!AuthRouter.instance) {
      this.router = this.router.bind(this)
      AuthRouter.instance = this
    }
    return AuthRouter.instance
  }

  router() {
    let router = Router()
    router
      .post('/', AuthMiddleware.setHeaders, AuthMiddleware.login, AuthController.login)
    // .post('/', AuthMiddleware.setHeaders, AuthMiddleware.login, AuthController.login.bind(AuthController))
    return router
  }

}

export default new AuthRouter()
