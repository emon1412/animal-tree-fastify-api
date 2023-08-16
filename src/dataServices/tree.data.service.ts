import { TreeNodeModel } from '../models'
import type { Tree, TreeNode } from '../types'
import BaseSQLiteDataService from './base.sqlite.data.service'

export default class TreeDataService extends BaseSQLiteDataService {
  static instance: TreeDataService

  constructor() {
    super('TreeNode', TreeNodeModel)

    TreeDataService.instance = this
  }

  static get() {
    return TreeDataService.instance || new TreeDataService()
  }

  public getTrees = async (): Promise<Tree[]> => {
    const sql = `SELECT * FROM ${this.tableName}`
    const nodes = await this.query<TreeNode>(sql)
    return this.buildTree(nodes)
  }

  private buildTree = (nodes: TreeNode[]): Tree[] => {
    const map = new Map<number, Tree>(nodes.map((node) => [node.id, { ...node, children: [] }]))
    const roots: Tree[] = []

    nodes.forEach((node) => {
      if (!node.parentId) {
        roots.push(map.get(node.id)!)
      } else {
        map.get(node.parentId)!.children.push(map.get(node.id)!)
      }
    })

    return roots
  }

  public createNode = async (treeNode: Omit<TreeNode, 'id'>): Promise<TreeNode> => {
    const sql = `INSERT INTO ${this.tableName} (parentId, label) VALUES (?, ?)`
    const params = [treeNode.parentId, treeNode.label]

    const { lastId } = await this.run(sql, params)
    return this.getById(lastId)
  }
}
