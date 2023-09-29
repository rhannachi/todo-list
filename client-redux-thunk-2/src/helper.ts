
export type ToObjectType<T> = T extends readonly Record<infer Key extends string,infer Val extends any>[]
    ? { [P in Key]: Val } : never

export const clearEmpties = (object: Record<string, string>) => {
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