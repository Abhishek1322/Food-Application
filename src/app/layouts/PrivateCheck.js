import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import BaseUrl from "../../constants/baseUrl";
import { useAuthSelector } from "../../redux/selector/auth";

const PrivateCheck = ({ auth }) => { 
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const pathName = location.pathname;
    const authSelector = useAuthSelector()
    const step = authSelector?.userInfo?.user?.step == 6;
    const userstep = authSelector?.userStep?.step == 6;
    const authRoutes = ['/resources'];
    const authToken = localStorage.getItem("authToken") ? true : false;

    //add this authentication after implimenting login 

    
    return (
        <>
        <Outlet/>
            {/* {
                (authToken && auth) ? <Outlet /> :
                    (authToken && !auth && !step) ? <Navigate to="/registration" /> :
                        (!authToken && !auth) ? <Outlet /> :
                            (authRoutes.includes(pathName)) ? <Outlet /> :
                                authToken && step ? <Navigate to="/dashboard" /> :
                                    // authToken && step ? <Navigate to="/registration" /> : 
                                    // <Navigate to="/chooserolesfor=signin" /> 
                                    <Navigate to="/" />
            }
            {step && pathName == "/registration" ? navigate("/dashboard") :
                userstep && pathName == "/registration" ? navigate("/dashboard") : "" } */}
        </>

    )

}


export default PrivateCheck;
