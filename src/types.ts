export type Priority = 'low' | 'medium' | 'high'

export type TodoList = {
  id: string
  name: string
}

export type TodoItem = {
  id: string
  listId: string
  title: string
  completed: boolean
  priority: Priority
  dueDate: string | null
}
