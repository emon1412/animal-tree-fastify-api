import { z } from 'zod'
import * as m from '../models'

export type Tree = z.infer<typeof m.TreeModel>
export type TreeNode = z.infer<typeof m.TreeNodeModel>
