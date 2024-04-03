'use client'
import { auth_action, auth_login } from '@/lib/slice/auth_slice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm() {
    const router=useRouter()
    const dispatch=useDispatch()
    const {user,loading,error,status}=useSelector(state=>state.auth)
    const [login_Data,setLogin_data]=useState({
        email:"",
        password:""
    })
    const handle_change=(e)=>{
        setLogin_data({...login_Data,[e.target.name]:e.target.value})
    }
    const submit_login=(e)=>{
        e.preventDefault()
        console.log(login_Data);
        if(!login_Data.email || !login_Data.password){
            return toast.error("Email and Password are Required",{
            })
        }
        dispatch(auth_login(login_Data))
    }

    useEffect(() => {
        console.log("error",error);
      if(error){
        console.log("client",error);
          dispatch(auth_action.login_status_blank())
          toast.error(error, {
          })
      }
        if (status){
        router.push("/admin_panel/dashboard")
      }
    }, [error, status])
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form onSubmit={submit_login} className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" name="email"  className="sr-only">Email address</label>
                            <input id="email-address" name="email" onChange={handle_change} type="email" autoComplete="email"  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password"  onChange={handle_change} autoComplete="current-password" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div> */}

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className={`group relative ${loading==="login" ? "animate-pulse":""} w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* Heroicon name: lock-closed */}
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                    <path d="M4 8V6a4 4 0 014-4h4a4 4 0 014 4v2h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h1zm6-6a2 2 0 00-2 2v2h4V4a2 2 0 00-2-2h-1zm-1 10a4 4 0 004 0H5a4 4 0 004 0h1z"></path>
                                </svg>
                            </span>
                            {loading === "login" ? "Loading..." :
                            "Sign in"}
                           
                            
                        </button>
                    </div>   
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default LoginForm;
