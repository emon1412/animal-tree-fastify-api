import { SCHEMA_NAMES } from '../constants'

export default {
  $id: SCHEMA_NAMES.TREE_NODE,
  type: 'object',
  properties: {
    label: {
      minLength: 1,
      type: 'string',
    },
    parentId: {
      type: 'number',
    },
  },
  required: ['label', 'parentId'],
  additionalProperties: false,
}
