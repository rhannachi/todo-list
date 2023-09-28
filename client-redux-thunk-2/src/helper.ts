
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