import { useState } from 'react'
import type { TodoItem as Todo } from '../types'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onReorder?: (draggedTodoId: string, targetTodoId: string) => void
  canReorder?: boolean
  emptyMessage?: string
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onReorder,
  canReorder = false,
  emptyMessage = 'No todos in this list yet.',
}: TodoListProps) {
  const [draggedTodoId, setDraggedTodoId] = useState<string | null>(null)

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
          draggable={canReorder}
          isDragging={draggedTodoId === todo.id}
          onDragStart={(event) => {
            if (!canReorder) return

            setDraggedTodoId(todo.id)
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text/plain', todo.id)
          }}
          onDragOver={(event) => {
            if (!canReorder || !draggedTodoId || draggedTodoId === todo.id) {
              return
            }

            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'
          }}
          onDrop={(event) => {
            if (!canReorder) return

            event.preventDefault()
            const droppedTodoId =
              draggedTodoId || event.dataTransfer.getData('text/plain')

            if (droppedTodoId && droppedTodoId !== todo.id) {
              onReorder?.(droppedTodoId, todo.id)
            }

            setDraggedTodoId(null)
          }}
          onDragEnd={() => setDraggedTodoId(null)}
        />
      ))}
    </ul>
  )
}
