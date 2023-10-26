import zod from 'zod';
import { TodoSchema } from './Todo';

export const TodoPatchSchema = TodoSchema.partial({
  title: true,
  completed: true,
});

export type TodoPatch = zod.infer<typeof TodoPatchSchema>;