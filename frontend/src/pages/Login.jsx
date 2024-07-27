import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const[data,setData]=useState({
        username:'',
        email:'',
        password:''
    })

    const loginUser=async(e)=>{
        e.preventDefault();
        const {username,email,password} = data;
        try {
            const response = await axios.post('http://127.0.0.1:8080/api/v1/users/login',{
                username,email,password
            });
            
            if(!response.data.success){
                toast.error(response.data.message);
            }
            else{
                //empty input field
                setData({});
                localStorage.setItem("accessToken",response.data.accessToken);
                localStorage.setItem("refreshToken",response.data.refreshToken);
                toast.success('logged in successfull');
                setTimeout(()=>{
                    navigate('/Dashboard');
                  },500);
                
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        }
    } 

  return (
    <section className="bg-gray-50 dark:bg-gray-200 w-full h-lvh" >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-slate-800">
                login  
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                    <form className="space-y-4 md:space-y-6" onSubmit={loginUser}>
                    <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="username" id="username" value={data.username} onChange={(e)=>setData({...data,username:e.target.value})} autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter username..." required=""/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email..." required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}placeholder="" autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div> */}
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">submit</button>
                        <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have yet an account?
                            <Link to={"/register"}><span className="font-medium text-primary-600 hover:underline dark:text-primary-500"> register</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
  )
}

export default Login