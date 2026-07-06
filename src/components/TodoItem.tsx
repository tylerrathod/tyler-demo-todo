import type { TodoItem as Todo } from '../types'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function formatDueDate(dueDate: string | null) {
  if (!dueDate) return null
  const date = new Date(`${dueDate}T00:00:00`)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const dueLabel = formatDueDate(todo.dueDate)

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <label className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-title">{todo.title}</span>
      </label>
      <div className="todo-details">
        <div className="todo-meta">
          <span className={`priority priority-${todo.priority}`}>
            {todo.priority}
          </span>
          {dueLabel ? <span className="due-date">Due {dueLabel}</span> : null}
        </div>
        <button
          type="button"
          className="delete-todo-button"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete ${todo.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
