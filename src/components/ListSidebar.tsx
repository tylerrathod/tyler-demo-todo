import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TodoList } from '../types'

type ListSidebarProps = {
  lists: TodoList[]
  selectedListId: string
  onSelect: (id: string) => void
  onAddList: (name: string) => void
}

export function ListSidebar({
  lists,
  selectedListId,
  onSelect,
  onAddList,
}: ListSidebarProps) {
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onAddList(name)
    setName('')
  }

  return (
    <aside className="sidebar">
      <h2>Lists</h2>
      <ul className="list-nav">
        {lists.map((list) => (
          <li key={list.id}>
            <button
              type="button"
              className={
                list.id === selectedListId ? 'list-button active' : 'list-button'
              }
              onClick={() => onSelect(list.id)}
            >
              {list.name}
            </button>
          </li>
        ))}
      </ul>
      <form className="add-list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New list name"
          aria-label="New list name"
        />
        <button type="submit">Add</button>
      </form>
    </aside>
  )
}
