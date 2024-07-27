import axios from "axios";
import { useState } from "react";
import {toast} from "react-hot-toast";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(false);  
  const config = {
    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
};
  const handleLogout = async(e)=>{
      setButtonDisabled(false);
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        const response = await axios.post('https://login-page-smoky-phi.vercel.app/api/v1/users/logout',{},config
        );
        if(!response.data.success)
        {
           toast.error(response.data.message);
        }
        else{
            toast.success('logged out and cookie deleted');
            setTimeout(()=>{
              navigate('/');
            },500);
        }
      } 
      catch (error) {
        toast.error(error.response.data.message);
        console.log(error.message);
      }
      setButtonDisabled(true);
  }
  const handleDelete = async(e)=>{
    setDeleteButtonDisabled(false);
      try {
        const response = await axios.post('https://login-page-smoky-phi.vercel.app/api/v1/users/delete',{},config
        );
        if(!response.data.success)
        {
           toast.error(response.data.message);
        }
        else{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            toast.success('Account and cookies deleted successfully');
            setTimeout(()=>{
              navigate('/');
            },500);
            
        }
      } 
      catch (error) {
        console.log("why i am working");
        toast.error(error.response.data.message);
        console.log(error.message);
      }
      setDeleteButtonDisabled(true);
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
    <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <a href="/" className="text-white text-xl font-bold">Your dashboard</a>
                </div>
                <div className="flex items-center space-x-4">
                </div>
                <div className="flex items-center space-x-4">
                         <button onClick={handleLogout} disabled={isButtonDisabled} className="text-gray-300 hover:text-white">Logout</button>
                         <button onClick={handleDelete} disabled={isDeleteButtonDisabled} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">Delete Account</button>  
                </div>
            </div>
        </nav>
    <div className="flex justify-center items-center flex-1 container mx-auto">
        <h1 className="font-serif text-center text-gray-600 py-10">Welcome to your dashboard</h1>
    </div>
    </div>

  )
}

export default Dashboard
