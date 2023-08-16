import { z } from 'zod'
import SQLiteService, { RunResult } from '../libs/sqlite.service'

export default class BaseSQLiteDataService {
  static instance: BaseSQLiteDataService

  protected tableName: string

  protected model: z.ZodType

  protected sqliteService: SQLiteService

  constructor(tableName: string, model: z.ZodType) {
    this.sqliteService = SQLiteService.get()

    this.tableName = tableName
    this.model = model
  }

  protected query = async <T = z.infer<typeof this.model>>(sql: string, params: any[] = []): Promise<T[]> => {
    try {
      const rows = await this.sqliteService.query<T>(sql, params)
      return rows.map((row) => this.model.parse(row))
    } catch (err) {
      console.error(`Error in ${this.tableName}Service.query. [sql: ${sql}, params: ${params}]`)
      throw err
    }
  }

  protected run = async (sql: string, params: any[]): Promise<RunResult> => {
    try {
      return await this.sqliteService.run(sql, params)
    } catch (err) {
      console.error(`Error in ${this.tableName}Service.run. [sql: ${sql}] [params: ${params}]`)
      throw err
    }
  }

  public getById = async <T = z.infer<typeof this.model>>(id: number): Promise<T> => {
    try {
      const [result] = await this.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      )
      return result
    } catch (err) {
      console.error(`Error in ${this.tableName}Service.getById. [id: ${id}]`)
      throw err
    }
  }
}
