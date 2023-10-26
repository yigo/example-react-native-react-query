import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TodoList, TodoListSchema } from "../models/TodoList";
import { TodoPatch } from "../models/TodoPatch";
import { TodoSchema } from "../models/Todo";
export const todosKeys = {
  all: ["todos"],
  byId: (id: number) => [...todosKeys.all, { id }],
}

export function useInvalidatedQueryTodos() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: todosKeys.all });
}

// GET /todos
export function useQueryTodos() {
  return useQuery({
    queryKey: todosKeys.all,
    queryFn: async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return TodoListSchema.parse(data);
    }
  })
}
// GET /todos/:id
export function useMutateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, completed }: TodoPatch) => {
      const { data } = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      ...(title && { title }),
      ...(completed && { completed }),
      });
      return TodoSchema.parse(data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        todosKeys.all,
        (existingData: TodoList) => existingData.map((todo) => todo.id === data.id ? data : todo)
      );
    },
    onError: (error) => {
      console.log("error", error);
    }
  })
}
// POST /todos

// PATCH /todos/:id