import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import paper from './paper.png';
import snail from './snail.png';
import leaf from './leaf.png';
import snailtrail from './snailtrail-.png';
import sunflower from './sunflower.png';
import tinyflowers from './Tinyflowers.png';
import tinyflower from './tinyflower.png';
import bigleaf from './bigleaf-.png';
import flower from './Flower.png';


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
      <h1>TO-DO</h1>
      <div className="flex-todos">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    
      <div className="buttons">
  
        <div className="input-and-add">
        <input ref={todoNameRef} type="text"className="todo-input" />
      
        <button onClick={handleAddTodo} className="add">add to-do</button>
        </div>
        <div className="left-and-clear">
        <div className="left">{todos.filter(todo => !todo.complete).length} left to-do</div>
        <button onClick={handleClearTodos} className="clear">clear completed to-dos</button>
        </div>
        </div>
      <img src={paper} className="paper"/>
      <div className="illustrations">
      <img src={snail} className="snail" />
      <img src={leaf}  className="leaf" />
      <img src={flower} className="flower" />
      <img src={snailtrail} className="snail-trail" />
      <img src={tinyflower} className="tiny-flower" />
      <img src={tinyflowers} className="tiny-flowers" />
      <img src={sunflower} className="sunflower" />
      <img src={bigleaf} className="big-leaf" />
      </div>
      <img src={tinyflower} className="tiny-flower2" />
      <img src={tinyflowers} className="tiny-flowers2" />
    </body>
  )
}

export default App;
