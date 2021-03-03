'use strict'

import BaseClass from '../../base/base.class'

class AuthController extends BaseClass {

  constructor() {
    if (!AuthController.instance) {
      super()
      this.login = this.login.bind(this)
      AuthController.instance = this
    }
    return AuthController.instance
  }

  async login(request, response, next) {
    this.logger.info('UserController execute login')
    this.logger.debug("UserController login receive headers", request.headers)
    // this.logger.debug("UserController login receive payload", request.payload.getPayloadLogin())
    try {
      const payload = request.payload;
      // const userInfo = await UserInfoEntries.findOne(request.headers.getCollationId(), { username: payload.getUsername() })
      // if (!userInfo) {
      //   this.responseSuccess(response, request.headers.getCollationId(), this.responseCode.USER_LOGIN_NOT_FOUND_USERNAME, {}, this.responseCode[this.responseCode.USER_LOGIN_NOT_FOUND_USERNAME])
      //   return
      // }
      // if (userInfo.status === UserInfoEntries.enum.status.banned) {
      //   this.responseSuccess(response, request.headers.getCollationId(), this.responseCode.USER_LOGIN_BANNED, {}, this.responseCode[this.responseCode.USER_LOGIN_BANNED])
      //   return
      // }
      // const password = this.auth.hashPasswordUser(userInfo.userId, payload.getUsername(), payload.getPassword())
      // const authUserModel = await AuthUserEntries.findOne(request.headers.getCollationId(), { userId: userInfo.userId })
      // if (authUserModel.password !== password) {
      //   this.responseSuccess(response, request.headers.getCollationId(), this.responseCode.USER_LOGIN_NOT_MATCH_PASSWORD, {}, this.responseCode[this.responseCode.USER_LOGIN_NOT_MATCH_PASSWORD])
      //   return
      // }
      // if (userInfo.status === UserInfoEntries.enum.status.inActive) {
      //   userInfo.status = UserInfoEntries.enum.status.active
      //   userInfo.modifiedBy = payload.getUsername()
      //   userInfo.modifiedAt = new Date().getTime()
      //   const _ = await UserInfoEntries.updateOne(request.headers.getCollationId(), userInfo._id, userInfo)
      // }
      // const role = this.auth.hashTokenRoleUser(userInfo.userId, payload.getUsername())
      // const token = this.auth.generateToken({
      //   username: payload.getUsername(),
      //   userId: userInfo.userId,
      //   role: role,
      // })
      // this.logger.success(`UserController execute login success with collationId ${request.headers.getCollationId()} response data`)
      // this.responseSuccess(response, request.headers.getCollationId(), this.responseCode.USER_LOGIN_SUCCESS, {
      //   username: payload.getUsername(),
      //   token: token
      // }, this.responseCode[this.responseCode.USER_LOGIN_SUCCESS])
    } catch (e) {
      this.logger.error(`UserController login with collationId: ${request.headers.getCollationId()} ${e.toString()}`)
      this.responseException(response, request.headers.getCollationId())
    }
  }

}

export default new AuthController()
