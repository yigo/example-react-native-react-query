import zod from 'zod';
import { TodoSchema } from './Todo';

export const TodoListSchema = zod.array(TodoSchema);
export type TodoList = zod.infer<typeof TodoListSchema>;