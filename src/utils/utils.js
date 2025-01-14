import { v4 as uuid } from 'uuid'

export function parseJson(body) {
    try {
        const data = JSON.parse(body)
        return { data }
    } catch(error) {
        return { error };
    }
}

export function generateId() {
    return uuid()
}