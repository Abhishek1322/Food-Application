import React from "react"
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';

const MainNav = () => {
    return (
        <>
            <div className="header">
                <div className="headersection">
                    <p className="settingtxt">Setting</p>
                    <div className="headerRight d-flex">
                        <Link className="headerLinks">
                            <img src={Images.chat} alt="logo" className="img-fluid chatIconImage" />
                        </Link>
                        <Link className="headerLinks">
                            <img src={Images.bellImage} alt="logo" className="img-fluid chatIconImage" />
                        </Link>
                        <div className="cart">
                            <Link className="">
                                <img src={Images.cardImage} alt="logo" className="img-fluid chatIconImage" />
                            </Link>
                            <img src={Images.basketImg} alt="logo" className="img-fluid basketImg" />
                            <span className="cartItems">0</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default MainNav;