import React, { useState } from "react"
import * as Images from "../../../utilities/images";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavItem } from "react-bootstrap";
import { useAuthSelector } from "../../../redux/selector/auth";
import { useLocation, useNavigate } from "react-router-dom";

const MainNav = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const authSelector = useAuthSelector();

    const [activeTab, setActiveTab] = useState("");
    const step = authSelector?.userInfo?.user?.step <= 6 || authSelector?.userStep?.step == 6;
    const button = authSelector?.userInfo?.user?.step == 6;
    const complete_step = authSelector?.userStep?.step == 6;
    const token = localStorage.getItem("authToken")
    const path = location.pathname;

    return (
        <>
            <div className='authNavBar'>
                <h4>Navbar</h4>
            </div>
        </>
    )

}

export default MainNav;