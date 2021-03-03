'use strict'

import BasePayload from '../../base/base.payload'

class UserPayload extends BasePayload {

  constructor() {
    super()

    this.username = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isUsername'],
      message: ['username is empty', 'username is not string', 'username invalid'],
    }

    this.password = {
      value: '',
      validator: ['isNotEmpty', 'isString'],
      message: ['password is empty', 'password is not string'],
    }

    this.fullName = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isFullName'],
      message: ['fullName is empty', 'fullName is not string', 'fullName invalid'],
    }

    this.phone = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isPhoneNumber'],
      message: ['phone is empty', 'phone is not string', 'Phone invalid'],
    }

    this.email = {
      value: 0,
      validator: ['isNotEmpty', 'isString', 'isEmail'],
      message: ['email is empty', 'email is not string', 'email invalid'],
    }

    this.userId = {
      value: '',
      validator: ['isNotEmpty', 'isString', 'isUserId'],
      message: ['userId is empty', 'userId is not string', 'userId invalid'],
    }

    this.skip = {
      value: 0,
      validator: ['isNotEmpty', 'isNumber'],
      message: ['skip is empty', 'skip is not number'],
    }

    this.limit = {
      value: 10,
      validator: ['isNotEmpty', 'isNumber'],
      message: ['limit is empty', 'limit is not type number'],
    }

    // this.sort = {
    //   value: {},
    //   validator: [],
    //   message: ['sort is not type string'],
    // }

    this.query = {
      value: {},
      validator: [],
      message: [],
    }

  }

  getSkip() {
    return this.skip.value
  }

  getLimit() {
    return this.limit.value
  }

  // getSort() {
  //   return this.sort.value
  // }

  getQuery() {
    return this.query.value
  }

  getUsername() {
    return this.username.value
  }

  getPassword() {
    return this.password.value
  }

  getFullName() {
    return this.fullName.value
  }

  getPhone() {
    return this.phone.value
  }

  getEmail() {
    return this.email.value
  }

  getUserId() {
    return this.userId.value
  }

  getPayloadGetList() {
    return {
      skip: this.getSkip(),
      limit: this.getLimit(),
      query: this.getQuery(),
    }
  }

  getPayloadCreate() {
    return {
      username: this.getUsername(),
      password: this.getPassword(),
      fullName: this.getFullName(),
      phone: this.getPhone(),
      email: this.getEmail(),
    }
  }

  getPayloadBan() {
    return {
      userId: this.getUserId(),
    }
  }

  getPayloadUnBan() {
    return {
      userId: this.getUserId(),
    }
  }

  getPayloadLogin() {
    return {
      username: this.getUsername(),
      password: this.getPassword(),
    }
  }

}

export default UserPayload
