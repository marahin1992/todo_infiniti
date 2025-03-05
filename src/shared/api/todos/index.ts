import { PaginatedResult, Todo } from "./model";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";


export const getTodosInfiniteQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ["tasks", "list"],
    queryFn: (meta) => jsonApiInstance<PaginatedResult<Todo>>(`/todos?_page=${meta.pageParam}&_per_page=10`, {
      signal: meta.signal
    }),
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: result => result.pages.map(page => page.data).flat()
  })
}

export const getTodoByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["tasks", "one"],
    queryFn: (meta) => jsonApiInstance<Todo>(`/todos/${id}`, {
      signal: meta.signal
    })
  })
}

export const createTodo = (todo: Todo) => {
  return jsonApiInstance<Todo>(`/todos`, {
    method: 'POST',
    json: todo
  })
}

export const updateTodo = (todo: Partial<Todo>) => {
  return jsonApiInstance<Todo>(`/todos/${todo.id}`, {
    method: 'PATCH',
    json: todo
  })
}

export const deleteTodo = (id: string) => {
  return jsonApiInstance(`/todos/${id}`, {
    method: 'DELETE'
  })
}
