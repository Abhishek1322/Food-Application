import React from "react"
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';

const MainNav = () => {
    return (
        <>
           <div className="main_Setting">
           <div className="navMain">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-12">
                            <p className="settingtxt">Setting</p>
                        </div>
                        <div className="col-lg-6 col-sm-12 text-end">
                            <div className="flexBox">
                               <div className="headermenu">
                               <figure className="menuBox">
                                    <img src={Images.chat} alt="logo" className="img-fluid chatIconImage" />
                                </figure>
                               </div>
                                <div className="headeritem">
                                <figure className="menuBox">
                                    <img src={Images.bellImage} alt="logo" className="img-fluid chatIconImage" />
                                </figure>
                                </div>
                                <div className="menuBox cart">
                                    <img src={Images.bellImage} alt="logo" className="img-fluid basketImg" />
                                    <span className="cartItems">0</span>
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>

        </>
    )

}

export default MainNav;