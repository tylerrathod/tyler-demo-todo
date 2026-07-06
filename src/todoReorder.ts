import type { TodoItem } from './types'

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  const nextItems = [...items]
  const [item] = nextItems.splice(fromIndex, 1)
  nextItems.splice(toIndex, 0, item)
  return nextItems
}

export function reorderTodosWithinList(
  todos: TodoItem[],
  listId: string,
  draggedTodoId: string,
  targetTodoId: string,
) {
  if (!listId || draggedTodoId === targetTodoId) return todos

  const listTodos = todos.filter((todo) => todo.listId === listId)
  const fromIndex = listTodos.findIndex((todo) => todo.id === draggedTodoId)
  const toIndex = listTodos.findIndex((todo) => todo.id === targetTodoId)

  if (fromIndex === -1 || toIndex === -1) return todos

  const reorderedListTodos = moveItem(listTodos, fromIndex, toIndex)
  let nextListTodoIndex = 0

  return todos.map((todo) =>
    todo.listId === listId ? reorderedListTodos[nextListTodoIndex++] : todo,
  )
}
