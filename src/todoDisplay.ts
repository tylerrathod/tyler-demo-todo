import type { Priority, TodoItem } from './types'

export type TodoFilter = 'all' | 'open' | 'completed'
export type TodoSort = 'manual' | 'dueDate' | 'priority'

const priorityRank: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function getDisplayedTodos(
  todos: TodoItem[],
  filter: TodoFilter,
  sort: TodoSort,
) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'open') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (sort === 'manual') return filteredTodos

  return [...filteredTodos].sort((first, second) => {
    if (sort === 'priority') {
      return priorityRank[first.priority] - priorityRank[second.priority]
    }

    if (!first.dueDate && !second.dueDate) return 0
    if (!first.dueDate) return 1
    if (!second.dueDate) return -1
    return first.dueDate.localeCompare(second.dueDate)
  })
}
