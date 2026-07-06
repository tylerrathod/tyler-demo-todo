import type { TodoItem as Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  emptyMessage?: string
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  emptyMessage = 'No todos in this list yet.',
}: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
