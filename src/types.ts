export type Priority = 'low' | 'medium' | 'high'

export const listColors = ['blue', 'emerald', 'amber', 'violet', 'rose'] as const

export type ListColor = (typeof listColors)[number]

export const DEFAULT_LIST_COLOR: ListColor = 'blue'

export type TodoList = {
  id: string
  name: string
  color: ListColor
}

export type TodoItem = {
  id: string
  listId: string
  title: string
  completed: boolean
  priority: Priority
  dueDate: string | null
}
