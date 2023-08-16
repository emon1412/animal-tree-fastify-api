/* eslint-disable no-await-in-loop */
import fp from 'fastify-plugin'
import SQLiteService from './sqlite.service'

const sqliteService = new SQLiteService()

const LibServices = [
  sqliteService,
]

export {
  sqliteService
}

export default fp(async () => {
  for (const libService of LibServices) {
    await libService.init()
  }
})
