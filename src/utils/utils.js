export function parseJson(body) {
    try {
        const data = JSON.parse(body)
        return { data }
    } catch(error) {
        return { error };
    }
}