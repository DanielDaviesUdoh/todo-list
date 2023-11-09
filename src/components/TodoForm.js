import React, {useState} from 'react'

function TodoForm({addTodos}) {
  const [value, setValue] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addTodos(value)
    setValue('')
  }

  return (
    <form className='form' onSubmit={handleSubmit}> 
       <input 
        className='form-input' 
        placeholder='Add tasks here...' 
        value={value}
        onChange={ (e)=> setValue(e.target.value) }
      />
      <button className='form-button' type='submit'>
        Add Task
      </button>
    </form>
  )
}

export default TodoForm