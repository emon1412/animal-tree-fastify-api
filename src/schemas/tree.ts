import { SCHEMA_NAMES } from '../constants'

export default {
  $id: SCHEMA_NAMES.TREE,
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    label: {
      type: 'string',
    },
    children: {
      type: 'array',
      items: {
        $ref: SCHEMA_NAMES.TREE,
      },
    },
  },
  additionalProperties: false,
}
