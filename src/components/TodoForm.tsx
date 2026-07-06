import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority } from '../types'

type TodoFormProps = {
  onAdd: (input: {
    title: string
    priority: Priority
    dueDate: string | null
  }) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onAdd({
      title,
      priority,
      dueDate: dueDate || null,
    })
    setTitle('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs doing?"
        aria-label="Todo title"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        aria-label="Priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
      />
      <button type="submit">Add todo</button>
    </form>
  )
}
