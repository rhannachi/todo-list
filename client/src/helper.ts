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

export class ErrorType {
  message: string
  stack?: string
  constructor({ message, stack }: ErrorType) {
    this.message = message
    this.stack = stack
  }
}
export const handleError = (error: unknown): ErrorType => {
  const e = new ErrorType({
    message: 'Internal Error',
    stack: `${error}`,
  })

  if (error instanceof ErrorType) {
    // console.info('ErrorType ==>', error)
    return error
  }

  if (isAxiosError<ErrorApiType>(error) && error.response) {
    e.message = error.response.data.error.message
    // console.info('AxiosError ==>', error)
  }
  if (error instanceof ZodiosError) {
    if (error.cause instanceof ZodError) {
      e.message = fromZodError(error.cause).toString()
    }
    // console.info('ZodiosError ==>', error)
  }

  return e
}
