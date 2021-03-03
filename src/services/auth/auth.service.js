'use strict'

import Jwt from 'jsonwebtoken'
import crypto from 'crypto';
import fs from 'fs'

import AppConf from '../../config/app.conf'
import Logger from '../logger/logger.service'
import Exception from '../validator/exception'

class AuthService {

  constructor() {
    if (!AuthService.instance) {
      this.generateToken = this.generateToken.bind(this)
      this.verifyToken = this.verifyToken.bind(this)
      this.decodeToken = this.decodeToken.bind(this)
      this.hashTokenRoleRoot = this.hashTokenRoleRoot.bind(this)
      this.checkTokenRoleRoot = this.checkTokenRoleRoot.bind(this)
      this.hashTokenRoleAdmin = this.hashTokenRoleAdmin.bind(this)
      this.checkTokenRoleAdmin = this.checkTokenRoleAdmin.bind(this)
      this.hashTokenRoleUser = this.hashTokenRoleUser.bind(this)
      this.checkTokenRoleUser = this.checkTokenRoleUser.bind(this)
      this.decryptPassword = this.decryptPassword.bind(this)
      this.hashPassword = this.hashPassword.bind(this)
      this.decryptPasswordUser = this.decryptPasswordUser.bind(this)
      this.hashPasswordUser = this.hashPasswordUser.bind(this)
      AuthService.instance = this
    }
    return AuthService.instance
  }

  generateToken(data) {
    // Logger.info('AuthService execute generateToken')
    // Logger.debug('AuthService generateToken receive data', data)
    try {
      const privateKey = fs.readFileSync(__dirname + '/token.private.pem', 'utf8')
      // Logger.debug('\nprivateKey', privateKey)
      const token = Jwt.sign(data, privateKey.toString(), AppConf.auth.options)
      return token
    } catch (e) {
      throw e
      // Logger.error(`AuthService generateToken ${e.toString()}`)
      // throw new Exception('token', 'generate token error')
    }
  }

  verifyToken(token) {
    // Logger.info('AuthService execute verifyToken')
    // Logger.debug('AuthService verifyToken receive token', token)
    try {
      const publicKey = fs.readFileSync(__dirname + '/token.public.pem', 'utf8')
      // Logger.debug('\npublicKey', publicKey)
      Jwt.verify(token, publicKey, AppConf.auth.options)
    } catch (e) {
      // Logger.error(`AuthService verifyToken ${exception.toString()}`)
      throw e
    }
  }

  decodeToken(token) {
    // Logger.info('AuthService execute decodeToken')
    // Logger.debug('AuthService decodeToken receive token', token)
    try {
      const decodeToken = Jwt.decode(token, { complete: true })
      Logger.debug('AuthService decodeToken data', decodeToken)
      return decodeToken
    } catch (e) {
      throw e
      // Logger.error(`AuthService decodeToken ${e.toString()}`)
      // throw new Exception('token', 'decode token error')
    }
  }

  hashTokenRoleRoot(username) {
    // Logger.info('AuthService execute hashTokenRoleRoot')
    // Logger.debug('AuthService hashTokenRoleRoot receive username', username)
    try {
      username = crypto.createHash('md5').update(username).digest("hex").toString()
      return crypto.createHash('md5').update(`${AppConf.auth.key}-${username}-${AppConf.auth.key}-${username}-${AppConf.auth.key}`).digest("hex").toString()
    } catch (e) {
      throw e
    }
  }

  checkTokenRoleRoot(token) {
    // Logger.info('AuthService execute checkTokenRoleRoot')
    // Logger.debug('AuthService checkTokenRoleRoot receive token', token)
    try {
      const payload = this.decodeToken(token).payload
      const hashRole = this.hashTokenRoleRoot(payload.username)
      if (payload.role !== hashRole) {
        throw new Error('Token role invalid')
      }
    } catch (e) {
      throw e
    }
  }

  hashTokenRoleAdmin(username) {
    // Logger.info('AuthService execute hashTokenRoleAdmin')
    // Logger.debug('AuthService hashTokenRoleAdmin receive username', username)
    try {
      username = crypto.createHash('md5').update(`${username}-${username}`).digest("hex").toString()
      return crypto.createHash('md5').update(`${AppConf.auth.key}-${username}${username}--${AppConf.auth.key}---${username}${username}---${AppConf.auth.key}`).digest("hex").toString()
    } catch (e) {
      throw e
    }
  }

  checkTokenRoleAdmin(token) {
    // Logger.info('AuthService execute checkTokenRoleAdmin')
    // Logger.debug('AuthService checkTokenRoleAdmin receive token', token)
    try {
      const payload = this.decodeToken(token).payload
      const hashRole = this.hashTokenRoleAdmin(payload.username)
      if (payload.role !== hashRole) {
        throw new Error('Token role invalid')
      }
    } catch (e) {
      throw e
    }
  }

  hashTokenRoleUser(userId, username) {
    // Logger.info('AuthService execute hashTokenRoleUser')
    // Logger.debug('AuthService hashTokenRoleUser receive username', username)
    try {
      userId = crypto.createHash('md5').update(`${userId}-${userId}`).digest("hex").toString()
      username = crypto.createHash('md5').update(`${username}-${username}`).digest("hex").toString()
      return crypto.createHash('md5').update(`${AppConf.auth.key}-${userId}-${AppConf.auth.key}-${username}-${username}-${AppConf.auth.key}-${userId}-${AppConf.auth.key}`).digest("hex").toString()
    } catch (e) {
      throw e
    }
  }

  checkTokenRoleUser(token) {
    // Logger.info('AuthService execute checkTokenRoleUser')
    // Logger.debug('AuthService checkTokenRoleUser receive token', token)
    try {
      const payload = this.decodeToken(token).payload
      const hashRole = this.hashTokenRoleUser(payload.userId, payload.username)
      if (payload.role !== hashRole) {
        throw new Error('Token role invalid')
      }
    } catch (e) {
      throw e
    }
  }

  decryptPassword(password) {
    // Logger.info('AuthService execute decryptPassword')
    // Logger.debug('AuthService decryptPassword receive password', password)
    try {
      const privateKey = fs.readFileSync(__dirname + '/password.private.pem', 'utf8')
      const buffer = Buffer.from(password, "base64");
      const decrypted = crypto.privateDecrypt({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING
      }, buffer);
      return decrypted.toString("utf8");
    } catch (e) {
      // Logger.error(`AuthService decryptPassword ${e.toString()}`)
      throw e
    }
  }

  hashPassword(username, password) {
    // Logger.info('AuthService execute hashPassword')
    // Logger.debug('AuthService hashPassword receive username', username)
    // Logger.debug('AuthService hashPassword receive password', password)
    try {
      let decryptPassword = this.decryptPassword(password)
      username = crypto.createHash('md5').update(username).digest("hex").toString();
      decryptPassword = crypto.createHash('md5').update(decryptPassword).digest("hex").toString()
      return crypto.createHash('md5').update(`${AppConf.auth.key}-${username}-${decryptPassword}-${username}-${decryptPassword}-${AppConf.auth.key}`).digest("hex").toString()
    } catch (e) {
      // Logger.error(`AuthService hashPassword ${e.toString()}`)
      throw e
    }
  }

  decryptPasswordUser(password) {
    // Logger.info('AuthService execute decryptPasswordUser')
    // Logger.debug('AuthService decryptPasswordUser receive password', password)
    try {
      const privateKey = fs.readFileSync(__dirname + '/userPassword.private.pem', 'utf8')
      const buffer = Buffer.from(password, "base64");
      const decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, buffer);
      return decrypted.toString("utf8");
    } catch (e) {
      // Logger.error(`AuthService decryptPasswordUser ${e.toString()}`)
      throw e
    }
  }

  hashPasswordUser(userId, username, password) {
    // Logger.info('AuthService execute hashPasswordUser')
    // Logger.debug('AuthService hashPasswordUser receive username', username)
    // Logger.debug('AuthService hashPasswordUser receive password', password)
    try {
      let decryptPasswordUser = this.decryptPasswordUser(password)
      userId = crypto.createHash('md5').update(userId).digest("hex").toString();
      username = crypto.createHash('md5').update(username).digest("hex").toString();
      decryptPasswordUser = crypto.createHash('md5').update(decryptPasswordUser).digest("hex").toString()
      return crypto.createHash('md5').update(`${userId}-${username}-${decryptPasswordUser}-${AppConf.auth.key}`).digest("hex").toString()
    } catch (e) {
      // Logger.error(`AuthService hashPasswordUser ${e.toString()}`)
      throw e
    }
  }

}

export default new AuthService()
