import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import './style.css';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); 
    if (storedTodos) setTodos( storedTodos )
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
     setTodos(newTodos)
  }

  return (
    <body className="body">

      <div className="pencil-image"></div>
    
      <section className="list-section">
        
        <h1>TO-DO</h1>

        <div className="flex-todos">

        <TodoList todos={todos} toggleTodo={toggleTodo} />

        </div>
      </section>

      <section className="buttons">
  
        <div className="input-and-add">

          <input ref={todoNameRef} type="text"className="todo-input" placeholder="write your list here"/>
      
          <button onClick={handleAddTodo} className="add">add to-do</button>

        </div>

        <div className="left-and-clear">

          <div className="left">{todos.filter(todo => !todo.complete).length} left <br/>to-do</div>

          <button onClick={handleClearTodos} className="clear">clear completed to-dos</button>

        </div>

      </section>
      
    </body>
  )
}

export default App;
