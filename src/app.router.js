'use strict'

import AuthRouter from './router/auth/auth.router'

class AppRouter {

  constructor() {
    if (!AppRouter.instance) {
      this.router = this.router.bind(this)
      AppRouter.instance = this
    }
    return AppRouter.instance
  }

  router(app) {
    app.use('/auth', AuthRouter.router())
  }

}

export default new AppRouter()
