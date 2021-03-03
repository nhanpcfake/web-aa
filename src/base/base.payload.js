'use strict'

import BaseClass from './base.class'

class BasePayload extends BaseClass {

  constructor() {
    super()

    this.set = this.set.bind(this)
  }

  set(field, value, property) {
    try {
      // this.logger.debug(`BasePayload set receive field`, field)
      // this.logger.debug(`BasePayload set receive value`, value)
      // this.logger.debug(`BasePayload set receive typeof value`, typeof value)
      // value = (typeof value === 'string') ? value.trim() : value
      // this.validator.validate(field, value, property.validator, property.message)
      // property.value = value
    } catch (exception) {
      // this.logger.debug(`BasePayload set receive field`, field)
      // this.logger.debug(`BasePayload set receive value`, value)
      // this.logger.debug(`BasePayload set receive typeof value`, typeof value)
      // this.logger.error(`BasePayload set error ${exception.toString()}`)
      throw exception
    }
  }

}

export default BasePayload
