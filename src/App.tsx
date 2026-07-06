import { ListSidebar } from './components/ListSidebar'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import './App.css'

function App() {
  const {
    lists,
    selectedListId,
    selectedList,
    todosForSelectedList,
    setSelectedListId,
    addList,
    addTodo,
    toggleTodo,
  } = useTodos()

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
          <TodoList todos={todosForSelectedList} onToggle={toggleTodo} />
        </main>
      </div>
    </div>
  )
}

export default App
