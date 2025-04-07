export default function Login({setLogin, setSignup})
{
    return(
        <div className="flex h-svh w-full justify-center items-center bg-transparent absolute z-20">
            <div className="border-2  border-zinc-700 w-[28%] bg-zinc-900 h-[50%] rounded-xl flex flex-col items-center py-10 px-3 gap-5 text-lg"> 
                <p className="text-rose-400 text-3xl font-semibold">Login</p>
                <div className="flex flex-col gap-3 items-center pt-10 justify-between h-full">
                    <div className="flex flex-col gap-4 ">
                            <input type="text" placeholder="Username" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl" />
                            <input type="text" placeholder="Password" className="bg-zinc-800 px-4 py-2 w-72 outline-none rounded-xl"/>
                    </div>
                    <div className="flex gap-5 mt-7">
                        <button className="duration-150 px-4 border-2 border-zinc-300 py-1 rounded-xl hover:text-black hover:bg-zinc-50 hover:text-whitee">Login</button>
                        <button onClick={()=>setLogin(false)} className="duration-150 px-4 rounded-xl border-zinc-800 hover:bg-rose-500 hover:text-white border-2 text-base">Cancel</button>
                    </div>
                    <p className="text-sm">Don't have an account? <button onClick={()=> {setLogin(false);setSignup(true)}} className="hover:text-emerald-300">Signup</button></p>
                </div>

            </div>
        </div>
    )
}