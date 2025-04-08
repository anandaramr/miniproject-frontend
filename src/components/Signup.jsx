import { useContext, useState } from "react"
import { useAxios } from "../api/axios"
import AuthContext from "../context/AuthContext"
import { setCookie } from "../utils/utils"

export default function Signup({setSignup, setLogin})
{
    
    const axios = useAxios()
    const [ error, setError ] = useState("")

    const { authorize } = useContext(AuthContext)

    const signup = (evt) => {
        evt.preventDefault()
        setError("")
        
        const form = document.querySelector('#signup')
        const username = form[0].value
        const password = form[1].value
        const confirmPassword = form[1].value

        if(password != confirmPassword) console.log("Pass error");

        const data = { username, password }
        axios.post('/auth/register', data)
        .then(res => {
            if(res.data.error) return setError(res.data.error);

            setCookie('auth', res.data.accessToken)
            setCookie('ref', res.data.refreshToken)
            localStorage.removeItem("state")

            authorize()
            setSignup(false)
        })
        .catch(err => {
            console.log(err)
            setError(err.response.data.error)
        })
    }

    return(
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2  border-zinc-700 w-[28%] bg-zinc-900 h-[55%] rounded-xl flex flex-col py-6 px-3 text-lg"> 
                <button onClick={()=>{setSignup(false); setLogin(true)}} className="text-left px-3"><span className="material-symbols-outlined font-semibold hover:text-white text-zinc-400 duration-150">keyboard_backspace</span></button>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-rose-400 text-3xl font-semibold">Signup</p>
                    <form id="signup" onSubmit={signup} className="flex flex-col gap-3 items-center pt-10 justify-between h-full">
                        <div className="flex flex-col gap-4 ">
                                <input autoFocus type="text" placeholder="Username" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl" />
                                <input type="password" placeholder="Password" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl"/>
                                <input type="password" placeholder="Confirm Password" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl"/>
                        </div>
                        <div className="flex gap-5 mt-10">
                            <button type="submit" className="duration-150 px-4 border-2 border-zinc-300 py-1 rounded-xl hover:text-black hover:bg-zinc-50 hover:text-whitee">Signup</button>
                            <button onClick={()=>setSignup(false)} className="duration-150 px-4 rounded-xl border-zinc-800 hover:bg-rose-500 hover:text-white border-2 text-base">Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}