import { useContext, useState } from "react"
import { useAxios } from "../api/axios"
import AuthContext from "../context/AuthContext"
import { setCookie } from "../utils/utils"

export default function Login({ setLogin, setSignup }) {

    const axios = useAxios()
    const [ error, setError ] = useState("")

    const { authorize } = useContext(AuthContext)

    const login = (evt) => {
        evt.preventDefault()
        setError("")
        
        const form = document.querySelector('#login')
        const username = form[0].value
        const password = form[1].value

        const data = { username, password }
        axios.post('/auth/login', data)
        .then(res => {
            if(res.data.error) return setError(res.data.error);

            setCookie('auth', res.data.accessToken)
            setCookie('ref', res.data.refreshToken)
            localStorage.removeItem("state")

            authorize()
            setLogin(false)
        })
        .catch(err => {
            console.log(err)
            setError(err.response.data.error)
        })
        
    }
    
    return (
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2 border-zinc-700 w-[28%] bg-zinc-900 h-[55%] rounded-xl flex flex-col items-center py-10 px-3 gap-5 text-lg"> 
                <p className="text-rose-400 text-3xl font-semibold">Login</p>
                <form id="login" onSubmit={login} className="flex flex-col gap-3 items-center pt-10 justify-between h-full">
                    <div className="flex flex-col gap-4 ">
                            <input autoFocus type="text" placeholder="Username" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl" />
                            <input type="password" placeholder="Password" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl"/>
                    </div>
                    <div className="flex gap-5 mt-7">
                        <button type="submit" className="duration-150 px-4 border-2 border-zinc-300 py-1 rounded-xl hover:text-black hover:bg-zinc-50 hover:text-whitee">Login</button>
                        <button onClick={()=>setLogin(false)} className="duration-150 px-4 rounded-xl border-zinc-800 hover:bg-rose-500 hover:text-white border-2 text-base">Cancel</button>
                    </div>
                    <p className="text-sm mt-6">Don't have an account? <button onClick={()=> {setLogin(false);setSignup(true)}} className="text-cyan-300 hover:underline">Signup</button></p>
                </form>

            </div>
        </div>
    )
}