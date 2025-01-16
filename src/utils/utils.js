import { v4 as uuid } from 'uuid'

/**
 * Updates state information stored in `localStorage`
 *
 * @param {function} func - Function which take as input the current state and outputs updates if any
 * 
 * - The argument and return value of `func` is an object where:
 *    - `tabs` (optional): The updated list of tabs.
 *    - `lastActiveTab` (optional): The updated value for the last active tab.
 * 
 * If `func` does not provide these values, the existing values from the current state will be retained.
 *
 * The updated state is saved back to `localStorage`.
 * 
 * @example
 * // Add new tab
 * updateState(({ tabs }) => {
 *     return {
 *         tabs: [ ...tabs, newTab ],
 *         lastActiveTab: newTab.tabId
 *     }
 * })
 */
export function updateState(func) {
    let { data, error } = parseJson(localStorage.getItem("state"))
    if (error) {
        console.error("Error parsing state: ", error)
        console.warn("Resetting state...")

        data = { tabs: [] }
        localStorage.setItem("state", JSON.stringify(data))
    } 

    let { tabs, lastActiveTab } = func({ ...data, tabs: data?.tabs || [] })
    
    tabs = tabs || data?.tabs
    lastActiveTab = lastActiveTab || data?.lastActiveTab
    localStorage.setItem("state", JSON.stringify({ lastActiveTab, tabs }))
}

/**
 * Safely parse a JSON string and returns the parsed data if succesfully parsed; else it return an error.
 *
 * @param {string} body - The JSON string to parse.
 * @returns {{ data?: any, error?: Error }} An object containing either the parsed `data` or an `error`.
 *
 * @example
 * // Valid JSON string
 * const result = parseJson('{"key": "value"}');
 * console.log(result.data); // { key: "value" }
 *
 * @example
 * // Invalid JSON string
 * const result = parseJson('invalid json');
 * console.log(result.error);
 */
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