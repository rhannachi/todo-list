export type ToObjectType<T> = T extends readonly Record<
  infer Key extends string,
  infer Val extends unknown
>[]
  ? { [P in Key]: Val }
  : never

export const handleErrorApi = (e: unknown, message: string): Error => {
  if (e instanceof Error) {
    return new Error(e.message)
  }
  return new Error(message)
}

export type RejectType = {
  rejectValue: {
    message: string
  }
}
