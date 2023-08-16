import SQLite3, { Database } from 'sqlite3'

export type RunResult = {
  lastId: number
}

export default class SQLiteService {
  static instance: SQLiteService

  private db: Database

  constructor() {
    SQLiteService.instance = this
    this.db = new SQLite3.Database(process.env.DATABASE_FILE || ':memory:')
    console.info('SQLiteService: constructed.')
  }

  static get() {
    return SQLiteService.instance || new SQLiteService()
  }

  async init(): Promise<void> {
    try {
      // TODO: run these from imported sql scripts
      await this.run('CREATE TABLE IF NOT EXISTS TreeNode (id INTEGER PRIMARY KEY, label TEXT NOT NULL, parentId INT NULL REFERENCES TreeNode(id))')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (1, \'root\', NULL);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (2, \'ant\', 1);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (3, \'bear\', 1);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (4, \'cat\', 3);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (5, \'dog\', 3);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (6, \'elephant\', 5);')
      await this.run('INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (7, \'frog\', 1);')
      console.info('SQLiteService: initialized.')
    } catch (err) {
      console.error(err)
    }
  }

  public query = <T>(sql: string, params: any[] = []): Promise<T[]> => new Promise((resolve, reject) => {
    try {
      this.db.all(sql, params, (err: Error | null, rows: T[]) => (err ? reject(err) : resolve(rows)))
    } catch (err) {
      console.error(`Error in SQLiteAccessor.query. [sql: ${sql}, params: ${params}]`)
      throw err
    }
  })

  public run = (sql: string, params: any[] = []): Promise<RunResult> => new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line func-names
      this.db.run(sql, params, function (err: Error | null) {
        if (err) {
          reject(err)
        } else {
          resolve({ lastId: this.lastID })
        }
      })
    } catch (err) {
      console.error(`Error in SQLiteService.run. [sql: ${sql}] [params: ${params}]`)
      throw err
    }
  })
}
