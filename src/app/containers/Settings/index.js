import React from 'react';
import * as Images from "../../../utilities/images";
const SettingMain = (props) => {
    return (
        <>
            <div className='main_div'>
                <div className='sideBar'>
                    <div className='sidelogo'>
                        <figure>
                            <img src={Images.Logo} alt="logo" className="img-fluid sidebarlogo" />
                        </figure>

                        <ul>
                            <li className='linkstyle'>
                                <img src={Images.Home} className='sideimg' />
                                Home
                            </li>
                            <li className='linkstyle'>
                                <img src={Images.Chef} className='sideimg' />
                                Chefs
                            </li>
                            <li className='linkstyle'>
                                <img src={Images.myorder} className='sideimg' />
                                My Orders
                            </li>
                        </ul>
                    </div>

                </div>
                <div className='main_content'>
                    <div className='navBar'>

                    </div>
                    <div className='maincontainer'>

                    </div>

                </div>
            </div>
        </>
    )
}
export default SettingMain;
