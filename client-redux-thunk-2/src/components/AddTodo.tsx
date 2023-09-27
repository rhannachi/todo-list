import React, { useState } from 'react'

// TODO remove Partial
export type FormDataType = Partial<{
    name: string
    label: string
    description: string
    email: string
    user: string
}>

type AddTodoProps = {
  saveTodo: (e: React.FormEvent, formData: FormDataType) => void
}

// TODO move function ...
const clearEmpties = (object: Record<string, string>) => {
    const newObject = {
        ...object
    }
    for (const k in newObject) {
        if (newObject[k].length === 0) {
            delete newObject[k]
        }
    }
    return !Object.keys(newObject).length ? undefined : newObject;
}

export const AddTodo: React.FC<AddTodoProps> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<FormDataType | undefined >()

  const handleForm = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newFormData = clearEmpties({
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value,
    })
    setFormData(newFormData)
  }

  return (
    <form className='form' onSubmit={(e) => formData && saveTodo(e, formData)}>
      <div>
          <div className="item">
              <input id="name" className='input' placeholder="Name" onChange={handleForm} type='text' />
              <input id="label" className='input' placeholder="Label" onChange={handleForm} type='text' />
          </div>
          <div className="item">
              <textarea id="description" className='input' placeholder="Description" onChangeCapture={handleForm} />
          </div>
          <div className="item" style={{marginTop: '20px'}} >
              <input id="user" className='input' placeholder="User" onChange={handleForm} type='text' />
              <input id="email" className='input' placeholder="E-mail" onChange={handleForm} type='text' />
          </div>
          <div className="submit-button item" >
              <button type="submit" disabled={!formData} >Add</button>
          </div>
      </div>
    </form>
  )
}
