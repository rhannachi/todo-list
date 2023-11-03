import axios, { AxiosError } from 'axios'
import { ZodiosError } from '@zodios/core'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export type ToObjectType<T> = T extends readonly Record<
  infer Key extends string,
  infer Val extends unknown
>[]
  ? { [P in Key]: Val }
  : never

const isAxiosError = <T>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

type ErrorApiType = {
  error: {
    status: 404 | 400 | 500
    message: string
  }
}
export type ErrorType = {
  error: {
    message: string
    stack?: string
  }
}
export type RejectType = {
  rejectValue: ErrorType
}

export const handleErrorApi = (error: unknown) => {
  // console.log('ZodiosError ==>', error instanceof ZodiosError)
  // console.log('ZodError ==>', error instanceof ZodError)
  // console.log('AxiosError ==>', error instanceof AxiosError)
  // console.log('error ==>', error)

  let message = 'Internal Error'
  const stack = `${error}`

  if (isAxiosError<ErrorApiType>(error) && error.response) {
    message = error.response.data.error.message
  }
  if (error instanceof ZodiosError) {
    if (error.cause instanceof ZodError) {
      message = fromZodError(error.cause).toString()
    }
  }
  return {
    error: {
      message,
      stack,
    },
  }
}
