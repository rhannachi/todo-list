import React, { useEffect } from 'react'
import { notifySelector, useAppDispatch, useAppSelector } from '../store'
import { deleteNotifyAction, NotifyType } from '../store/notify'

type ToastProps = NotifyType & {
  deleteNotify: (id: string) => void
}
const Toast = ({ id, type, description, title, deleteNotify }: ToastProps) => {
  const color: Record<NotifyType['type'], 'green' | 'red' | 'blue'> = {
    success: 'green',
    error: 'red',
    info: 'blue',
  }

  return (
    <div className='toast' onClick={() => deleteNotify(id)} style={{ background: color[type] }}>
      <div>{title}</div>
      <p style={{ marginTop: '10px', fontSize: 'medium' }}>{description}</p>
    </div>
  )
}

export const withToasts = (Component: React.FC) => {
  const notify = useAppSelector(notifySelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let timer: NodeJS.Timeout
    try {
      const notifyItem = notify.list[0]
      if (notifyItem.delay) {
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

  return (
    <main className='App'>
      <div className='container-toast'>
        {notify.list.map((notify) => (
          <Toast
            {...notify}
            key={notify.id}
            deleteNotify={(id) => dispatch(deleteNotifyAction({ id }))}
          />
        ))}
      </div>
      <Component />
    </main>
  )
}
