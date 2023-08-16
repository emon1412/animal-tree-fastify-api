import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import type { FastifyReply } from 'fastify'
import { SCHEMA_NAMES } from '../constants'
import type { PostTreeNodeRequest, ApiError } from '../types'
import BaseRouteHandler from './base.route.handler'
import TreeService from '../services/tree.service'

export class PostTreeNodeRouteHandler extends BaseRouteHandler {
  public uri: string = '/api/tree'

  private service: TreeService

  constructor() {
    super()
    this.service = TreeService.get()
  }

  handle = async (req: PostTreeNodeRequest, reply: FastifyReply): Promise<void> => {
    try {
      const treeNode = req.body
      const createdNode = await this.service.postTreeNode(treeNode)
      reply.status(this.successCode).send(createdNode)
    } catch (err) {
      console.error('Error in PostTreeNodeRouteHandler.handle.')
      this.errorHandler(reply, err as ApiError)
    }
  }
}

export default async function GetTreesRoute(app: FastifyInstance) {
  const postTreeNodeRouteHandler = new PostTreeNodeRouteHandler()
  const options: FastifyPluginOptions = {
    schema: {
      tags: ['postTreeNode'],
      body: { $ref: `${SCHEMA_NAMES.TREE_NODE}#` },
      response: { 201: { $ref: `${SCHEMA_NAMES.TREE_NODE}#` } },
    },
  }
  app.post(postTreeNodeRouteHandler.uri, options, postTreeNodeRouteHandler.handle)
  console.info(`Initialization: POST ${postTreeNodeRouteHandler.uri} constructed`)
}
