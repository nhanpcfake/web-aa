'use strict'

import compression from 'compression'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors';

import BaseClass from './base/base.class'

class AppConfig extends BaseClass {

  constructor() {
    if (!AppConfig.instance) {
      super()
      // this.requestModel = new this.model.request()
      this.config = this.config.bind(this)
      AppConfig.instance = this
    }
    return AppConfig.instance
  }

  config(app) {
    app.use(helmet());
    app.use(compression());
    app.use(cors({
      origins: '*', // ["http://localhost:3001"]
      // credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      // headers: ['X-Requested-With'],
      // allowedHeaders: Object.keys(this.requestModel.headers),
      preflightContinue: false,
      optionsSuccessStatus: 204
    }))
    app.use(bodyParser.json({
      type: 'application/json'
    }))
  }

}

export default new AppConfig()
