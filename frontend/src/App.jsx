import {Routes,Route, Navigate} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { useState } from 'react';
import Refresh from './Refresh.jsx';


// axios.defaults.baseURL = 'http://127.0.0.1:8080';
// axios.defaults.withCredentials=true;
function App() {
          const [isAuthenticated,setAuthenticated] = useState(false);
          const PrivateRoute = ({element})=>{
            return isAuthenticated ? element : <Navigate to={"/login"}/>
          }
  return (
    <>
     <Toaster position='top-center' toastOptions={{duration:2000}}/>
        <Refresh setAuthenticated = {setAuthenticated} />
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
        </Routes>
    </>
  )
}

export default App
