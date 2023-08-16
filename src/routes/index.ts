import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import GetTreesRoute from './get.trees.route'
import PostTreeNodeRoute from './post.treeNode.route'

const routes = [
  GetTreesRoute,
  PostTreeNodeRoute,
]

export default fp(async (app: FastifyInstance) => {
  for (const route of routes) {
    app.register(route)
  }
})
