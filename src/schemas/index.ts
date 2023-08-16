import { FastifyInstance } from 'fastify'
import tree from './tree'
import treeNode from './treeNode'

const schemas = [
  tree,
  treeNode,
]

export default (app: FastifyInstance) => {
  for (const schema of schemas) {
    console.info(`Initialization: schema ${schema.$id} added.`)
    app.addSchema(schema)
  }
}
