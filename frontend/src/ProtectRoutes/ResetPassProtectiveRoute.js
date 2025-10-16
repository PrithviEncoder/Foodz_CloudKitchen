import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ResetPassProtectiveRoute = ({children}) => {

    const navigate = useNavigate();
    
    useEffect(() => { 
        if (localStorage.getItem('token')) {
            toast.info("You are already logged in");
            navigate('/');
        }
    }, [navigate]);

    return localStorage.getItem('token') ? null : children;

}

export default ResetPassProtectiveRoute;