import { useMemo, useState } from 'react'
import { ListSidebar } from './components/ListSidebar'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import { getDisplayedTodos } from './todoDisplay'
import type { TodoFilter, TodoSort } from './todoDisplay'
import './App.css'

function App() {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [sort, setSort] = useState<TodoSort>('manual')
  const {
    lists,
    selectedListId,
    selectedList,
    todosForSelectedList,
    setSelectedListId,
    addList,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos()

  const displayedTodos = useMemo(
    () => getDisplayedTodos(todosForSelectedList, filter, sort),
    [filter, sort, todosForSelectedList],
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todos</h1>
        <p className="subtitle">Lists, priorities, due dates, and completion</p>
      </header>

      <div className="layout">
        <ListSidebar
          lists={lists}
          selectedListId={selectedListId}
          onSelect={setSelectedListId}
          onAddList={addList}
        />

        <main className="main">
          <header className="main-header">
            <h2>{selectedList?.name ?? 'No list selected'}</h2>
            <span className="count">
              {todosForSelectedList.filter((t) => !t.completed).length} open
            </span>
          </header>

          <TodoForm onAdd={addTodo} />
          <section className="todo-controls" aria-label="Todo display controls">
            <label>
              Filter
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value as TodoFilter)}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label>
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as TodoSort)}
              >
                <option value="manual">Manual order</option>
                <option value="dueDate">Due date</option>
                <option value="priority">Priority</option>
              </select>
            </label>
          </section>
          <TodoList
            todos={displayedTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            emptyMessage={
              todosForSelectedList.length === 0
                ? 'No todos in this list yet.'
                : 'No todos match the current filter.'
            }
          />
        </main>
      </div>
    </div>
  )
}

export default App
