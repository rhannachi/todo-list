import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export type NotifyType = {
  id: string
  delay?: number
  type: 'info' | 'success' | 'error'
  title: string
  description: string
}

type NotifyState = {
  list: NotifyType[]
}

const initialState: NotifyState = {
  list: [],
}

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    deleteNotifyAction: (state, { payload: { id } }: PayloadAction<{ id: string }>) => {
      state.list = state.list.filter((item) => item.id !== id)
    },
    addNotifyAction: (
      state,
      { payload: { title, description, type, delay } }: PayloadAction<Omit<NotifyType, 'id'>>,
    ) => {
      state.list.unshift({
        id: uuidv4(),
        title,
        description,
        type,
        delay,
      })
    },
  },
})

export const { deleteNotifyAction, addNotifyAction } = notifySlice.actions
