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

    let { tabs, proxy, lastActiveTab } = func({ ...data, tabs: data?.tabs || [] }) || {}
    
    tabs = tabs || data?.tabs
    proxy = proxy===undefined ? data?.proxy : proxy
    lastActiveTab = lastActiveTab || data?.lastActiveTab
    localStorage.setItem("state", JSON.stringify({ lastActiveTab, proxy, tabs }))
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

export const getCookie = (key) => {
    const arr = document.cookie.split(';')
    const cookies = arr.map(cookie => {
        return {type: cookie.split('=')[0]?.trim(), val: cookie.split('=')[1]?.trim()}
    })
    const result = cookies.find(cookie => cookie.type==key)
    return result?.val
}

export const setCookie = (key,value) => {
    document.cookie = `${key}=${value}`
}

export const removeCookie = (key) => {
    document.cookie = `${key}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export function parseKeyValPairs(input) {
    const result = {}
    input.forEach(item => {
        if (!item[0]) return;
        if (!item[1]) item[1] = ""
        result[item[0]] = item[1]
    })
    return result
}

export function setLastActiveProject(projectId) {
    localStorage.setItem("lastActiveProject", projectId)
}

export function getLastActiveProject() {
    return localStorage.getItem("lastActiveProject")
}

export function getCurrentProject(projects) {
    if (!projects[0]) return null;
        
    let currentProjectId = getLastActiveProject()
    if (!currentProjectId) {
        currentProjectId = projects[0].projectId
        setLastActiveProject(currentProjectId)
    }

    const project = projects.find(item => item.projectId == currentProjectId) || projects[0]
    updateState(({ lastActiveTab }) => {
        const tabs = JSON.parse(project.state)
        return { tabs, lastActiveTab: lastActiveTab || tabs[0].tabId }
    })
    return project
}

export function convertToOpenAPI(requests) {
    const paths = {};
  
    requests.forEach((req) => {
        if (!req.url) return;
        if (!req.method) req.method = "GET"

        const url = new URL(req.url);
        const path = url.pathname || "/";
        const method = req.method.toLowerCase();

        if (!paths[path]) paths[path] = {};

        const responseSchema = inferSchemaFromResponse(req.response?.data);

        paths[path][method] = {
        summary: req.title || `Call to ${req.url}`,
        parameters: [],
        responses: {
            [req.response?.statusCode || 200]: {
            description: req.response?.statusText || "Response",
            schema: responseSchema || { type: "string" }
            }
        }
        };
    });
  
    return JSON.stringify({
        swagger: "2.0",
        info: {
            title: "Converted API",
            version: "1.0.0"
        },
        paths: paths
    }, null, 4);
}
  
function inferSchemaFromResponse(data) {
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
            return {
                type: "array",
                items: inferSchemaFromResponse(JSON.stringify(parsed[0]))
            };
        } else if (typeof parsed === "object") {
            const properties = {};
            for (const key in parsed) {
                properties[key] = { type: typeof parsed[key] };
            }
            return { type: "object", properties };
        }
    } catch (e) {
        console.log(e)
    }
    return { type: "string" };
}
  