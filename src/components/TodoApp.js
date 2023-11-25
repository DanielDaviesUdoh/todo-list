import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import TodoForm from './TodoForm'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'

function TodoApp() {
  const [todos, setTodos] = useState([])

  useEffect(()=> {
    document.title = 'Todo App'

    const storedTodos = JSON.parse(localStorage.getItem('todos'))

    if(storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(()=> {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const addTodos = (todo)=> {
    const newTodos = [...todos, {
      todo,
      isEdit: false,
      isComplete: false,
      id: nanoid()
    }]
    setTodos(newTodos)
  }

  const toggleComplete = (id)=> {
    setTodos(todos.map(todo => {
      return (
        todo.id === id ? 
        {...todo, isComplete: !todo.isComplete} :
        todo )
    }))
  }

  const editTodo = (id)=> {
    setTodos(todos.map(todo => {
      return (
        todo.id === id ? 
        {...todo, isEdit: !todo.isEdit} :
        todo )
    }))
  }

  const deleteTodo = (id)=> {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const isEditing = (value, id) => {
    setTodos(todos.map((prevTodo)=> {
      return (
        prevTodo.id === id ?
        {...prevTodo, todo: value, isEdit: !prevTodo.isEdit } :
        prevTodo )
    }))
  }

  const todoList = todos.map((task,index)=> {
    return (
      task.isEdit ? 
      <EditTodoForm key={task.id} isEditing={isEditing} task={task} /> :
      <Todo 
        key={task.id} 
        task={task} 
        toggleComplete={() => toggleComplete(task.id)} 
        editTodo={editTodo} 
        deleteTodo={deleteTodo} 
      />
    )
  })

  return (
    <div className='todo-app'>
      <h2>What do you wish to do?</h2>
      <TodoForm addTodos={addTodos} />
      {todoList}
    </div>
  )
}

export default TodoApp