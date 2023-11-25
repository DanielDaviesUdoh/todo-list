import React, {useState} from 'react'

function EditTodoForm({isEditing, task}) {
  const [value, setValue] = useState(task.todo)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    isEditing(value, task.id)
  }

  return (
    <form className='form' onSubmit={handleSubmit}> 
       <input 
        type='text'
        className='form-input' 
        placeholder='Update your task' 
        value={value}
        onChange={ (e)=> setValue(e.target.value) }
      />
      <button className='form-button' type='submit'>Update Task</button>
    </form>
  )
}

export default EditTodoForm