import type { TodoItem as Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
}

export function TodoList({ todos, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos in this list yet.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  )
}
