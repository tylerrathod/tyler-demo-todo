import { useState } from 'react'
import type { FormEvent } from 'react'
import { DEFAULT_LIST_COLOR, listColors } from '../types'
import type { ListColor } from '../types'
import type { TodoList } from '../types'

type ListSidebarProps = {
  lists: TodoList[]
  selectedListId: string
  onSelect: (id: string) => void
  onAddList: (name: string, color: ListColor) => void
}

const listColorLabels: Record<ListColor, string> = {
  blue: 'Blue',
  emerald: 'Emerald',
  amber: 'Amber',
  violet: 'Violet',
  rose: 'Rose',
}

export function ListSidebar({
  lists,
  selectedListId,
  onSelect,
  onAddList,
}: ListSidebarProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState<ListColor>(DEFAULT_LIST_COLOR)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onAddList(name, color)
    setName('')
    setColor(DEFAULT_LIST_COLOR)
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
                list.id === selectedListId
                  ? `list-button list-color-${list.color} active`
                  : `list-button list-color-${list.color}`
              }
              onClick={() => onSelect(list.id)}
            >
              <span
                className={`list-color-dot list-color-${list.color}`}
                aria-hidden="true"
              />
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
        <fieldset className="list-color-picker">
          <legend>Accent color</legend>
          <div className="list-color-options">
            {listColors.map((listColor) => (
              <label key={listColor} className="list-color-option">
                <input
                  type="radio"
                  name="list-color"
                  value={listColor}
                  checked={color === listColor}
                  onChange={() => setColor(listColor)}
                />
                <span
                  className={`list-color-swatch list-color-${listColor}`}
                  aria-hidden="true"
                />
                <span>{listColorLabels[listColor]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit">Add</button>
      </form>
    </aside>
  )
}
