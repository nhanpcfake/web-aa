'use strict'

import express from 'express'

import appConf from './config/app.conf.json'
import appConfig from './app.config'
import appRouter from './app.router'

import logger from './services/logger/logger.service'

const port = process.env.PORT || appConf.port;

try {
  const server = express()

  appConfig.config(server)
  appRouter.router(server)

  server.get('*', (req, res) => {
    res.status(404).json()
  })

  server.listen(port, (err) => {
    if (err) throw err
    logger.success(`>Ready on http://localhost:${port}`)
  })
} catch (e) {
  logger.error(`app run error ${e.toString()}`)
  process.exit(1)
}
