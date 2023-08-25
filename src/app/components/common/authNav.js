import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthSelector } from "../../../redux/selector/auth";
import * as Images from "../../../utilities/images";
import { useDispatch } from "react-redux";

const AuthNav = () => {
    const authSelector = useAuthSelector()
    const dispatch = useDispatch()
    const step = authSelector?.userInfo?.user?.step <= 6 && authSelector?.userStep?.step == 6 || authSelector?.userInfo?.user?.step == 6;
    const socialStep = authSelector?.userSignUp?.user?.step <= 6 && authSelector?.userStep?.step == 6 || authSelector?.userInfo?.user?.step == 6;
    const location = useLocation();
    const token = localStorage.getItem("authToken")
    const [activeTab, setActiveTab] = useState("");
    const path = location.pathname;
    const userInfo = authSelector?.userInfo?.user

    return (
        <>
            <div className="authNavBar">
                <h1>Auth Navbar</h1>
            </div>
        </>
    )

}

export default AuthNav;