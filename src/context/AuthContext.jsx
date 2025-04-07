import { createContext, useEffect, useState } from "react";
import { axiosJwt } from "../api/axios";
import { getCookie, removeCookie } from "../utils/utils";

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        authorize()
    }, [])

    const authorize = () => {
        setIsLoading(true)
        axiosJwt.get('/auth/')
        .then(res => {
            setUser(res.data)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const logout = () => {
        setIsLoading(true)
        axiosJwt.post('/auth/logout', { token: getCookie('ref') })
        .then(() => {
            removeCookie('auth')
            removeCookie('ref')
            setUser("")
            setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    }

    const data = { user, isLoading, logout, authorize }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}