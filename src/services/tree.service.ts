import createError from 'http-errors'
import TreeDataService from '../dataServices/tree.data.service'
import type { Tree, TreeNode } from '../types'

export default class TreeService {
  static instance: TreeService

  private treeDataService: TreeDataService

  constructor() {
    TreeService.instance = this
    this.treeDataService = TreeDataService.get()

    console.info('TreeService: constructed.')
  }

  static get() {
    return TreeService.instance || new TreeService()
  }

  public getTrees = async (): Promise<Tree[]> => this.treeDataService.getTrees()

  public postTreeNode = async (treeNode: Omit<TreeNode, 'id'>): Promise<TreeNode> => {
    if (treeNode.parentId) {
      const parentNode = await this.treeDataService.getById(treeNode.parentId)
      if (!parentNode) {
        throw createError(400, `Parent node with id ${treeNode.parentId} not found.`)
      }
    }
    return this.treeDataService.createNode(treeNode)
  }
}
