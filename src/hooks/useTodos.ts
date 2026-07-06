import { useMemo, useState } from 'react'
import type { Priority, TodoItem, TodoList } from '../types'

const defaultListId = crypto.randomUUID()

const seedLists: TodoList[] = [{ id: defaultListId, name: 'Personal' }]

const seedTodos: TodoItem[] = [
  {
    id: crypto.randomUUID(),
    listId: defaultListId,
    title: 'Buy groceries',
    completed: false,
    priority: 'medium',
    dueDate: '2026-07-08',
  },
  {
    id: crypto.randomUUID(),
    listId: defaultListId,
    title: 'Finish project proposal',
    completed: false,
    priority: 'high',
    dueDate: '2026-07-07',
  },
  {
    id: crypto.randomUUID(),
    listId: defaultListId,
    title: 'Read a chapter',
    completed: true,
    priority: 'low',
    dueDate: null,
  },
]

export function useTodos() {
  const [lists, setLists] = useState<TodoList[]>(seedLists)
  const [todos, setTodos] = useState<TodoItem[]>(seedTodos)
  const [selectedListId, setSelectedListId] = useState<string>(defaultListId)

  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedListId) ?? lists[0] ?? null,
    [lists, selectedListId],
  )

  const todosForSelectedList = useMemo(
    () => todos.filter((todo) => todo.listId === selectedListId),
    [todos, selectedListId],
  )

  function addList(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return

    const id = crypto.randomUUID()
    setLists((prev) => [...prev, { id, name: trimmed }])
    setSelectedListId(id)
  }

  function addTodo(input: {
    title: string
    priority: Priority
    dueDate: string | null
  }) {
    if (!selectedListId) return

    const trimmed = input.title.trim()
    if (!trimmed) return

    const item: TodoItem = {
      id: crypto.randomUUID(),
      listId: selectedListId,
      title: trimmed,
      completed: false,
      priority: input.priority,
      dueDate: input.dueDate || null,
    }

    setTodos((prev) => [...prev, item])
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  return {
    lists,
    selectedListId,
    selectedList,
    todosForSelectedList,
    setSelectedListId,
    addList,
    addTodo,
    toggleTodo,
  }
}
