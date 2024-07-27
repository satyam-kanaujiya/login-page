import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
 
function Refresh({setAuthenticated}) {
    const location = useLocation(); 
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            setAuthenticated(true);
            if(location.pathname === "/"||
                location.pathname === "/login"||
                location.pathname === "/register"
            ){
                navigate("/Dashboard",{replace:false});
            }
            
        }
    },[location,navigate,setAuthenticated]);
  return (
    null
  )
}

export default Refresh;