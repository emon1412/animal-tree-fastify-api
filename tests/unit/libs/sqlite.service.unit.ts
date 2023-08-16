/* eslint-disable no-promise-executor-return */
import SQLiteService from '../../../src/libs/sqlite.service'

const sqliteMock = {
  run: jest.fn().mockResolvedValue({}),
  query: jest.fn().mockResolvedValue({}),
  all: jest.fn().mockResolvedValue({}),
}
jest.mock('sqlite3', () => ({
  Database: jest.fn().mockImplementation(() => sqliteMock),
}))

process.env.DATABASE_FILE = 'database.sqlite3'
describe('SQLiteService', () => {
  it('should be defined', () => {
    expect(SQLiteService).toBeDefined()
  })
  it('should be a function', () => {
    expect(typeof SQLiteService).toBe('function')
  })

  it('should return an instance of SQLiteService', () => {
    const service = new SQLiteService()
    expect(service instanceof SQLiteService).toBe(true)
  })

  describe('get', () => {
    it('should return an instance of SQLiteService', () => {
      const service = SQLiteService.get()
      expect(service instanceof SQLiteService).toBe(true)
    })
    it('should return the same instance of SQLiteService', () => {
      const service = SQLiteService.get()
      const service2 = SQLiteService.get()
      expect(service).toEqual(service2)
    })
  })

  describe('init', () => {
    let service: SQLiteService
    beforeEach(() => {
      service = new SQLiteService()
      service.run = jest.fn().mockResolvedValue({})
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should create the TreeNode table if it does not exist', async () => {
      await service.init()
      expect(service.run).toHaveBeenNthCalledWith(1, 'CREATE TABLE IF NOT EXISTS TreeNode (id INTEGER PRIMARY KEY, label TEXT NOT NULL, parentId INT NULL REFERENCES TreeNode(id))')
    })
  })

  describe('query', () => {
    let service: SQLiteService
    beforeEach(() => {
      sqliteMock.all = jest.fn().mockResolvedValue([])

      service = new SQLiteService()
      service.init()
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call query with the correct parameters', () => {
      const query = 'SELECT * FROM Users'
      const params = ['someParam']
      service.query(query, params)
      expect(sqliteMock.all.mock.calls[0][0]).toEqual(query)
      expect(sqliteMock.all.mock.calls[0][1]).toEqual(params)
    })

    it('should return result resolved from sqlite.all', () => {
      const rows = [{ id: '1' }]
      sqliteMock.all = jest.fn().mockResolvedValue(rows)
      const result = service.query('SELECT * FROM Users', [])
      expect(result).resolves.toEqual(rows)
    })

    it('should throw error if sqlite.all rejects', async () => {
      const errorMessage = 'Bruh'
      sqliteMock.all = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage)
      })
      await expect(() => service.query('SELECT * FROM Users', [])).rejects.toThrow(errorMessage)
    })
  })

  describe('run', () => {
    let service: SQLiteService
    beforeEach(() => {
      service = new SQLiteService()
      service.init()
    })
    it('should call run with the correct parameters', () => {
      const params = ['someParam']
      service.run('INSERT INTO Users (id) VALUES (1)', params)

      // skip the first sqliteMock.run call because they are from the init calls
      expect(sqliteMock.run.mock.calls[1][0]).toEqual('INSERT INTO Users (id) VALUES (1)')
      expect(sqliteMock.run.mock.calls[1][1]).toEqual(params)
    })

    it('should throw error if sqlite.run rejects', async () => {
      const errorMessage = 'Bruh'
      sqliteMock.run = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage)
      })
      await expect(() => service.run('INSERT INTO Users (id) VALUES (1)', [])).rejects.toThrow(errorMessage)
    })
  })
})
