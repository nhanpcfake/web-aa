'use strict';

import AppConf from '../config/app.conf'

import LoggerService from '../services/logger/logger.service'
import HelperService from '../services/helper/helper.service'
import ValidatorService from '../services/validator/validator'
import Exception from '../services/validator/exception'
import AuthService from '../services/auth/auth.service'

import ResponseCode from '../services/codeResponse/code'
import HttpCode from '../services/codeResponse/http'

import RequestModel from '../services/models/request'
import ResponseModel from '../services/models/response'

class BaseClass {

  constructor() {
    this.appConf = AppConf
    this.logger = LoggerService
    this.helper = HelperService
    this.validator = ValidatorService
    this.exception = Exception
    this.auth = AuthService
    this.responseCode = ResponseCode
    this.httpCode = HttpCode
    this.model = {
      request: RequestModel,
      response: ResponseModel,
    }
  }

}

export default BaseClass
