import { useEffect, useMemo, useState } from 'react'
import {
  createSeedTodoState,
  getValidSelectedListId,
  loadTodoState,
  saveTodoState,
} from '../todoStorage'
import { reorderTodosWithinList } from '../todoReorder'
import { DEFAULT_LIST_COLOR } from '../types'
import type { ListColor, Priority, TodoItem } from '../types'

function getTodoStorage() {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function useTodos() {
  const [todoState, setTodoState] = useState(() =>
    loadTodoState(getTodoStorage(), createSeedTodoState()),
  )
  const { lists, todos, selectedListId } = todoState

  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedListId) ?? lists[0] ?? null,
    [lists, selectedListId],
  )
  const activeListId = selectedList?.id ?? ''

  useEffect(() => {
    saveTodoState(getTodoStorage(), {
      lists,
      todos,
      selectedListId: activeListId,
    })
  }, [activeListId, lists, todos])

  const todosForSelectedList = useMemo(
    () => todos.filter((todo) => todo.listId === activeListId),
    [activeListId, todos],
  )

  function addList(name: string, color: ListColor = DEFAULT_LIST_COLOR) {
    const trimmed = name.trim()
    if (!trimmed) return

    const id = crypto.randomUUID()
    setTodoState((current) => ({
      ...current,
      lists: [...current.lists, { id, name: trimmed, color }],
      selectedListId: id,
    }))
  }

  function addTodo(input: {
    title: string
    priority: Priority
    dueDate: string | null
  }) {
    const trimmed = input.title.trim()
    if (!trimmed) return

    setTodoState((current) => {
      const listId = getValidSelectedListId(
        current.lists,
        current.selectedListId,
      )
      if (!listId) return current

      const item: TodoItem = {
        id: crypto.randomUUID(),
        listId,
        title: trimmed,
        completed: false,
        priority: input.priority,
        dueDate: input.dueDate || null,
      }

      return {
        ...current,
        selectedListId: listId,
        todos: [...current.todos, item],
      }
    })
  }

  function toggleTodo(id: string) {
    setTodoState((current) => ({
      ...current,
      todos: current.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }))
  }

  function deleteTodo(id: string) {
    setTodoState((current) => {
      const listId = getValidSelectedListId(
        current.lists,
        current.selectedListId,
      )

      return {
        ...current,
        selectedListId: listId,
        todos: current.todos.filter(
          (todo) => !(todo.id === id && todo.listId === listId),
        ),
      }
    })
  }

  function selectList(id: string) {
    setTodoState((current) => {
      if (!current.lists.some((list) => list.id === id)) return current
      return { ...current, selectedListId: id }
    })
  }

  function reorderTodo(draggedTodoId: string, targetTodoId: string) {
    setTodoState((current) => {
      const listId = getValidSelectedListId(
        current.lists,
        current.selectedListId,
      )
      const todos = reorderTodosWithinList(
        current.todos,
        listId,
        draggedTodoId,
        targetTodoId,
      )

      if (todos === current.todos) return current

      return {
        ...current,
        selectedListId: listId,
        todos,
      }
    })
  }

  return {
    lists,
    selectedListId: activeListId,
    selectedList,
    todosForSelectedList,
    setSelectedListId: selectList,
    addList,
    addTodo,
    toggleTodo,
    deleteTodo,
    reorderTodo,
  }
}
