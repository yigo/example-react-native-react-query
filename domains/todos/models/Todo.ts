import zod from 'zod';

export const TodoSchema = zod.object({
  id: zod.number(),
  title: zod.string(),
  completed: zod.boolean(),
});

export type Todo = zod.infer<typeof TodoSchema>;