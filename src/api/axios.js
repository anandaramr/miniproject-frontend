import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { getCookie, setCookie } from '../utils/utils';

const baseURL = "http://localhost:3000/"

export function useAxios() {
    return axios.create({ baseURL })
}

export const axiosJwt = axios.create({ baseURL })

axiosJwt.interceptors.request.use(async config => {
    const token = getCookie('auth')
    const controller = new AbortController()

    if(!token) {
        config.signal = controller.signal
        controller.abort()
        return config;
    }
    
    const data = jwtDecode(token)
    const date = new Date()
    if(data.exp * 1000 < date.getTime()) {
        await refresh()
    }

    config.headers.Authorization = `BEARER ${getCookie('auth')}`
    return config
}, err => Promise.reject(err))

axiosJwt.interceptors.response.use(res => res,
    err => {
        if(err.code=="ERR_CANCELED") return Promise.resolve(err);
        Promise.reject(err)
    }
)

async function refresh() {
    await axios.post(baseURL + 'auth/refresh', { token: getCookie('ref') })
    .then(res => {
        setCookie('auth', res.data.accessToken)
        setCookie('ref', res.data.refreshToken)
    })
}