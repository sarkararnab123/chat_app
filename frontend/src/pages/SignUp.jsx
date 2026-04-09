import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'


const SignUp = () => {

    let navigate = useNavigate()
    let [show,setShow] = useState(false)
    let [userName,setUsername] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let dispatch = useDispatch();

    const handleSignup = async(e)=>{
        e.preventDefault()
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`,{
                userName,email,password
            },{withCredentials:true})

            dispatch(setUserData(result.data))
            navigate("/profile")

            setEmail("");
            setPassword("");
            
        } catch (error) {
            console.log(error)
            
        }
    }


    return (
        <div className='w-full h-[100.1vh] bg-[#0a0a0a] flex items-center justify-center'>
            <div className='w-full max-w-[450px] bg-[#121212] rounded-3xl shadow-black shadow-2xl overflow-hidden border border-orange-900/20'>
                <div className='w-full h-[180px] bg-orange-600 flex flex-col items-center justify-center relative'>
                    <div className='absolute -bottom-10 w-20 h-20 bg-[#121212] rounded-full flex items-center justify-center border-4 border-orange-600'>
                        <h1 className='text-orange-600 text-4xl font-bold italic'>C</h1>
                    </div>
                    <h1 className='text-black font-bold text-3xl mb-6'>Create Account</h1>
                </div>

            <form className='w-full flex flex-col gap-5 justify-center items-center mt-16 mb-10 px-8' onSubmit={handleSignup}>
                <div className='w-full'>
                    <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Username</label>
                    <input type='text' placeholder='Choose a username' className='w-full h-[50px] 
                    outline-none border border-orange-900/30 px-5 bg-black/40 text-orange-100 rounded-xl focus:border-orange-500 transition shadow-inner' 
                        onChange={(e)=>setUsername(e.target.value)} value={userName}
                    />
                </div>

                <div className='w-full'>
                    <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Email Address</label>
                    <input type='email' placeholder='Enter your email' className='w-full h-[50px] 
                    outline-none border border-orange-900/30 px-5 bg-black/40 text-orange-100 rounded-xl focus:border-orange-500 transition shadow-inner'
                        onChange={(e)=>setEmail(e.target.value)} value={email}
                    />
                </div>

                <div className='w-full'>
                    <label className='text-orange-700 text-sm ml-2 mb-1 block font-medium'>Password</label>
                    <div className='w-full h-[50px] border border-orange-900/30 overflow-hidden rounded-xl relative bg-black/40 focus-within:border-orange-500 transition shadow-inner'>
                        <input type={`${show?"text" : "password"}`} placeholder='Create a password' title='password' className='w-full h-full 
                        outline-none px-5 bg-transparent text-orange-100'
                            onChange={(e)=>setPassword(e.target.value)} value={password}
                        />
                        <span className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer text-orange-600 text-xs font-bold hover:text-orange-400'
                            onClick={()=> setShow(prev=>!prev)}
                        >
                        {`${show?"HIDE" : "SHOW"}`}</span>
                    </div>
                </div>

                <button className='w-full h-[50px] bg-orange-600 rounded-xl shadow-lg font-bold text-black hover:bg-orange-700 transition transform hover:scale-[1.02] active:scale-95 mt-2'>
                    Get Started
                </button>
                <p className='text-orange-900 text-sm'>
                    Already have an account? <span onClick={()=> navigate("/login")} className='text-orange-500 font-bold cursor-pointer hover:underline'>Login</span>
                </p>
            </form>
            </div>

        </div>
    )
}

export default SignUp