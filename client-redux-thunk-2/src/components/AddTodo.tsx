import React, { useState } from 'react'
import {clearEmpties} from "../helper";

export type FormDataType = {
    name: string
    label: string
    description: string
    email: string
    user: string
}

type AddTodoProps = {
  saveTodo: (formData: FormDataType) => void
}

const validateForm = (form?: Partial<FormDataType>) => {
    return form && ('name' in form
        && 'label' in form
        &&'description' in form
        && 'email' in form
        && 'user' in form)
}

export const AddTodo: React.FC<AddTodoProps> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<Partial<FormDataType> | undefined >()

  const handleForm = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const newFormData = clearEmpties({
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value,
    })
    setFormData(newFormData)
  }

  const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // TODO improvement
      saveTodo(formData as FormDataType )
  }

  return (
    <form className='container-add-todo' onSubmit={onSubmit}>
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
              <button type="submit" disabled={!validateForm(formData)} >Add</button>
          </div>
      </div>
    </form>
  )
}
