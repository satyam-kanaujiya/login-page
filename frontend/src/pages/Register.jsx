import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const[data,setData]=useState({
        username:'',
        email:'',
        password:'',
        role:''
    })

    const registerUser = async (e)=>{
        e.preventDefault();
        const {username,email,password,role} = data;
        try {
            const response = await axios.post('https://login-page-smoky-phi.vercel.app/api/v1/users/register',{
                username,email,password,role
            });
            if(!response.data.success){
                toast.error(response.data.message);
            }
            else{
                //empty input field
                setData({});
                toast.success('registration successfull now please login');
                setTimeout(()=>{navigate('/login')},500);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.message);
        }
    }  
  return (

    <section className="bg-gray-50 dark:bg-slate-200 w-full h-lvh" >
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-slate-600">
            Create account    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                <form className="space-y-4 md:space-y-6" onSubmit={registerUser}>
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
                        <input type="password" name="password" id="password" value={data.password} autoComplete='off' onChange={(e)=>setData({...data,password:e.target.value})}placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div>
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                        <input type="text" name="role" id="role" value={data.Role} onChange={(e)=>setData({...data,role:e.target.value})} autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter username..." required=""/>
                    </div>
                    <button type="submit" className="w-full  hover:bg-blue-200 hover:text-slate-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">submit</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? 
                        <Link to={"/login"}><span className="font-medium text-primary-600 hover:underline dark:text-primary-500"> login</span></Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Register
