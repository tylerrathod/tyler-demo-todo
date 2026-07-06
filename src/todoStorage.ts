import { DEFAULT_LIST_COLOR, listColors } from './types'
import type { ListColor, Priority, TodoItem, TodoList } from './types'

export const TODO_STORAGE_KEY = 'tyler-demo-todo-state'

export type TodoState = {
  lists: TodoList[]
  todos: TodoItem[]
  selectedListId: string
}

type TodoStorage = Pick<Storage, 'getItem' | 'setItem'>

const priorities: readonly Priority[] = ['low', 'medium', 'high']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && priorities.includes(value as Priority)
}

function isListColor(value: unknown): value is ListColor {
  return typeof value === 'string' && listColors.includes(value as ListColor)
}

function cloneTodoState(state: TodoState): TodoState {
  return {
    lists: state.lists.map((list) => ({ ...list })),
    todos: state.todos.map((todo) => ({ ...todo })),
    selectedListId: state.selectedListId,
  }
}

export function createSeedTodoState(): TodoState {
  const defaultListId = crypto.randomUUID()

  return {
    lists: [{ id: defaultListId, name: 'Personal', color: DEFAULT_LIST_COLOR }],
    todos: [
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
    ],
    selectedListId: defaultListId,
  }
}

export function getValidSelectedListId(
  lists: TodoList[],
  selectedListId: string | null | undefined,
): string {
  if (selectedListId && lists.some((list) => list.id === selectedListId)) {
    return selectedListId
  }

  return lists[0]?.id ?? ''
}

function parseLists(value: unknown): TodoList[] | null {
  if (!Array.isArray(value) || value.length === 0) return null

  const seenListIds = new Set<string>()
  const lists: TodoList[] = []

  for (const list of value) {
    if (
      !isRecord(list) ||
      typeof list.id !== 'string' ||
      !list.id ||
      typeof list.name !== 'string' ||
      !list.name
    ) {
      return null
    }

    if (seenListIds.has(list.id)) return null
    seenListIds.add(list.id)
    lists.push({
      id: list.id,
      name: list.name,
      color: isListColor(list.color) ? list.color : DEFAULT_LIST_COLOR,
    })
  }

  return lists
}

function parseTodos(
  value: unknown,
  validListIds: Set<string>,
): TodoItem[] | null {
  if (!Array.isArray(value)) return null

  const seenTodoIds = new Set<string>()
  const todos: TodoItem[] = []

  for (const todo of value) {
    if (
      !isRecord(todo) ||
      typeof todo.id !== 'string' ||
      !todo.id ||
      typeof todo.listId !== 'string' ||
      !validListIds.has(todo.listId) ||
      typeof todo.title !== 'string' ||
      !todo.title ||
      typeof todo.completed !== 'boolean' ||
      !isPriority(todo.priority) ||
      !(typeof todo.dueDate === 'string' || todo.dueDate === null)
    ) {
      return null
    }

    if (seenTodoIds.has(todo.id)) return null
    seenTodoIds.add(todo.id)
    todos.push({
      id: todo.id,
      listId: todo.listId,
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority,
      dueDate: todo.dueDate,
    })
  }

  return todos
}

export function hydrateTodoState(
  savedValue: unknown,
  fallbackState: TodoState,
): TodoState {
  if (!isRecord(savedValue)) return cloneTodoState(fallbackState)

  const lists = parseLists(savedValue.lists)
  if (!lists) return cloneTodoState(fallbackState)

  const todos = parseTodos(savedValue.todos, new Set(lists.map((list) => list.id)))
  if (!todos) return cloneTodoState(fallbackState)

  return {
    lists,
    todos,
    selectedListId: getValidSelectedListId(
      lists,
      typeof savedValue.selectedListId === 'string'
        ? savedValue.selectedListId
        : null,
    ),
  }
}

export function parseStoredTodoState(
  storedValue: string | null,
  fallbackState: TodoState,
): TodoState {
  if (storedValue === null) return cloneTodoState(fallbackState)

  try {
    return hydrateTodoState(JSON.parse(storedValue), fallbackState)
  } catch {
    return cloneTodoState(fallbackState)
  }
}

export function loadTodoState(
  storage: TodoStorage | null,
  fallbackState: TodoState,
): TodoState {
  if (!storage) return cloneTodoState(fallbackState)

  try {
    return parseStoredTodoState(storage.getItem(TODO_STORAGE_KEY), fallbackState)
  } catch {
    return cloneTodoState(fallbackState)
  }
}

export function saveTodoState(storage: TodoStorage | null, state: TodoState) {
  if (!storage) return false

  try {
    storage.setItem(TODO_STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
