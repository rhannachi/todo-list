import { ToObjectType } from '../helper'
import { addTodoThunk, deleteTodoThunk } from './todo'

export type HandleSaveTodoParametersType = ToObjectType<Parameters<typeof addTodoThunk>>
export type HandleDeleteTodoFunctionType = ToObjectType<Parameters<typeof deleteTodoThunk>>
