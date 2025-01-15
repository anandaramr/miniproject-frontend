import { v4 as uuid } from 'uuid'

export function updateState(func) {
    const { data } = parseJson(localStorage.getItem("state"))
    let { tabs, lastActiveTab } = func(data || {})
    
    tabs = tabs || data?.tabs
    lastActiveTab = lastActiveTab || data?.lastActiveTab
    localStorage.setItem("state", JSON.stringify({ lastActiveTab, tabs }))
}

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