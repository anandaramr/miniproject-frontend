
export async function request(url, method, body, reqHeaders, controller) {
    if(!method) method = 'GET';
    let headers = new Headers(reqHeaders)
    if(method=='GET') body = null;

    const request = new Request(url, { method, body, headers, signal: controller.signal })
    const response = await fetch(request).catch(error => { return { ok: false, error } })

    const { status: statusCode, statusText, ok } = response;
    ({ headers } = response)

    let data
    
    if (isJsonType(response.headers)) {
        const result = await response.json()
        data = JSON.stringify(result, null, 4)
    } else {
        data = await response.text()
    }

    return { data, statusCode, statusText, ok, headers }
}

function isJsonType(headers) {
    if(!headers) return false;
    
    const contentType = headers.get('Content-Type')
    if(!contentType) return false;

    const types = contentType.split(';')
    return types.filter(item => item.trim()=='application/json').length!=0
}