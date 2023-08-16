import type { FastifyRequest } from 'fastify'
import * as m from './models.type'

export type GetTreesRequest = FastifyRequest<{}>

export type PostTreeNodeRequest = FastifyRequest<{
  Body: Omit<m.TreeNode, 'id'>
}>
