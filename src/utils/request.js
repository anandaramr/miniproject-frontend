/**
 * Makes an HTTP request and returns the response details
 *
 * @param {string} url - The URL to which the request is sent
 * @param {string} [method='GET'] - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE')
 * @param {any} [body=null] - The request body (ignored for GET requests)
 * @param {Object} [headers={}] - An object containing custom headers for the request
 * @param {AbortController} controller - An `AbortController` instance for request cancellation
 * @returns {Promise<{ data: string, statusCode: number, statusText: string, ok: boolean, headers: Headers }>} 
 *          A promise resolving to an object containing the response details:
 *          - `data` (string): The response body (parsed if JSON)
 *          - `statusCode` (number): The HTTP status code
 *          - `statusText` (string): The HTTP status text
 *          - `ok` (boolean): Indicates if the request was successful (status in the range 200-299)
 *          - `headers` (Headers): The response headers
 *
 * @example
 * // Example: Making a GET request
 * const controller = new AbortController();
 * const response = await request('https://api.example.com/data', 'GET', null, { 'Accept': 'application/json' }, controller);
 * console.log(response.data); // Parsed JSON or raw text
 *
 * @example
 * // Example: Making a POST request with a JSON body
 * const controller = new AbortController();
 * const response = await request(
 *   'https://api.example.com/data',
 *   'POST',
 *   JSON.stringify({ key: 'value' }),
 *   { 'Content-Type': 'application/json' },
 *   controller
 * );
 * console.log(response.statusCode); // 200
 *
 * @example
 * // Example: Handling an aborted request
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 5000); // Abort after 5 seconds
 * try {
 *   const response = await request('https://api.example.com/slow', 'GET', null, {}, controller);
 * } catch (error) {
 *   console.error('Request aborted:', error);
 * }
 */
export async function request(url, method, body, headers, params, controller, proxy) {
    if (!url) return {};
    if(!method) method = 'GET';
    if(method=='GET') body = undefined

    url += '?' + new URLSearchParams(params).toString()
    
    let request;
    if (proxy) {
        const proxyServer = import.meta.env.VITE_SERVER + '/proxy'
        const requestBody = JSON.stringify({ url, method, body, headers })

        request = new Request(proxyServer, { 
            method: "POST", 
            body: requestBody, 
            headers: { 'content-type': 'application/json' }, 
            signal: controller?.signal 
        })
    } else {

        let reqHeaders = new Headers(headers)
        request = new Request(url, { method, body, headers: reqHeaders, signal: controller?.signal })
    }
    
    const start = new Date().getTime()
    const response = await fetch(request).catch(error =>  ({ ok: false, error }) )
    const end = new Date().getTime()
    const time = end - start

    if (response.error) return { ...response, time };

    unwrapHeaders(response)
    const { status: statusCode, statusText, ok, headers: resHeaders } = response;

    let data
    
    if (isJsonType(response)) {
        const result = await response.json()
        data = JSON.stringify(result, null, 4)
    } else {
        data = await response.text()
    }

    return { data, statusCode, statusText, ok, headers: resHeaders, time }
}

/**
 * Determines if the response's `Content-Type` header indicates JSON data
 *
 * @param {Response} response - The fetch API response object
 * @returns {boolean} `true` if the `Content-Type` includes 'application/json', otherwise `false`
 *
 * @example
 * // Example: Checking if a response contains JSON
 * const response = await fetch('https://api.example.com/data');
 * if (isJsonType(response)) {
 *     const data = await response.json();
 *     console.log(data);
 * }
 */
function isJsonType(response) {
    if(!response?.headers) return false;
    const { headers } = response
    
    const contentType = headers.get('Content-Type')
    if(!contentType) return false;

    const types = contentType.split(';')
    return types.filter(item => item.trim()=='application/json').length!=0
}

function unwrapHeaders(data) {
    data.headers.forEach((val, header) => data.headers[header] = val)
}