import { useEffect, useState, useContext } from "react";
import {useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Context/UserContext.js";


const PrivateRoutes = () => {
    const {setUserDetails} = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const location = useLocation();
    useEffect(() => {
        const verifyAccess = async () => {
        try {
            axios.get(`http://localhost:4500/api/auth/verifyaccess`, { withCredentials: true })
                .then((res) => {
                setUserDetails(res.data.data.user);
                setIsAuthenticated(true);
            })
            .catch(async (err) => {
                try{
                    await axios.get(`http://localhost:4500/api/auth/refresh-token`, { withCredentials: true });
                    setIsAuthenticated(true);
                }
                catch(err){
                    console.log('refresh-token absent');
                    setIsAuthenticated(false);
                }
            })
        } catch (error) {
            console.log(error);
        }
    };
    verifyAccess();
    }, [location]);

    if (isAuthenticated === null) return <p>Loading...</p>; // Show loading while verifying
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;
