import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import type { FastifyReply } from 'fastify'
import { SCHEMA_NAMES } from '../constants'
import type { GetTreesRequest, ApiError } from '../types'
import BaseRouteHandler from './base.route.handler'
import TreeService from '../services/tree.service'

export class GetTreesRouteHandler extends BaseRouteHandler {
  public uri: string = '/api/tree'

  private service: TreeService

  constructor() {
    super()
    this.service = TreeService.get()
  }

  handle = async (req: GetTreesRequest, reply: FastifyReply): Promise<void> => {
    try {
      const trees = await this.service.getTrees()
      reply.status(this.successCode).send(trees)
    } catch (err) {
      console.error('Error in GetTreesRouteHandler.handle.')
      this.errorHandler(reply, err as ApiError)
    }
  }
}

export default async function GetTreesRoute(app: FastifyInstance) {
  const getTreesRouteHandler = new GetTreesRouteHandler()
  const options: FastifyPluginOptions = {
    schema: {
      tags: ['getTrees'],
      response: {
        200: {
          type: 'array',
          items: {
            $ref: `${SCHEMA_NAMES.TREE}#`,
          },
        },
      },
    },
  }
  app.get(getTreesRouteHandler.uri, options, getTreesRouteHandler.handle)
  console.info(`Initialization: GET ${getTreesRouteHandler.uri} constructed`)
}
