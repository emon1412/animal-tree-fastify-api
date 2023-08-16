import { z } from 'zod'

export const TreeNodeModel = z.object({
  id: z.number(),
  label: z.string(),
  parentId: z.number().nullable(),
})

const BaseTree = z.object({
  id: z.number(),
  label: z.string(),
})

export type Tree = z.infer<typeof BaseTree> & {
  children: Tree[]
}

export const TreeModel: z.ZodType<Tree> = BaseTree.extend({
  children: z.lazy(() => TreeModel.array()),
})
