import React, { useEffect } from 'react'
import { notifySelector, useAppDispatch, useAppSelector } from '../store'
import { deleteNotifyAction, NotifyType } from '../store/notify'

export const withToasts = (Component: React.FC) => {
  const notify = useAppSelector(notifySelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let timer: NodeJS.Timeout
    try {
      const notifyItem = notify.list[0]
      if (notifyItem) {
        timer = setTimeout(() => {
          dispatch(deleteNotifyAction({ id: notifyItem.id }))
        }, notifyItem.delay)
      }
    } catch (e) {
      // console.error('withToasts:', e)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [notify.list])

  type ToastProps = NotifyType & {
    deleteNotify: (id: string) => void
  }

  const Toast = ({ id, type, description, title, deleteNotify }: ToastProps) => {
    const color = {
      success: 'green',
      error: 'red',
      info: 'blue',
    }

    return (
      <div
        onClick={() => deleteNotify(id)}
        style={{
          background: color[type],
          marginTop: '15px',
          padding: '10px',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        <div>{title}</div>
        <p style={{ marginTop: '10px', fontSize: 'medium' }}>{description}</p>
      </div>
    )
  }

  return (
    <main className='App'>
      <div
        style={{
          width: '300px',
          position: 'fixed',
          margin: '30px',
          right: 0,
          top: 0,
        }}
      >
        {notify.list.map((notify) => (
          <Toast
            key={notify.id}
            deleteNotify={(id) => dispatch(deleteNotifyAction({ id }))}
            {...notify}
          />
        ))}
      </div>
      <Component />
    </main>
  )
}
