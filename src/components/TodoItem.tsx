import type { TodoItem as Todo } from '../types'
import type { DragEventHandler } from 'react'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  draggable?: boolean
  isDragging?: boolean
  onDragStart?: DragEventHandler<HTMLLIElement>
  onDragEnter?: DragEventHandler<HTMLLIElement>
  onDragOver?: DragEventHandler<HTMLLIElement>
  onDrop?: DragEventHandler<HTMLLIElement>
  onDragEnd?: DragEventHandler<HTMLLIElement>
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

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  draggable = false,
  isDragging = false,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragEnd,
}: TodoItemProps) {
  const dueLabel = formatDueDate(todo.dueDate)
  const itemClassName = [
    'todo-item',
    `todo-priority-${todo.priority}`,
    todo.completed ? 'completed' : '',
    draggable ? 'todo-reorderable' : '',
    isDragging ? 'dragging' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li
      className={itemClassName}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
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
