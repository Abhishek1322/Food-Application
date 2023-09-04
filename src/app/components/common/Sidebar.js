import React from 'react'
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <>
           <div className='sideBar'>
            <div className='sidebarlogo '>
            <img src={Images.Logo} alt="logo" className="img-fluid" />
            </div>
            <div className='sidelist'>
                <ul>
                    <li className='sidebarlinks'>
                        <Link to ="/home" className='sidebarItems'>
                        <img src={Images.Home} alt="logo" className="img-fluid home" />
                        Home
                        </Link>
                    </li>
                    <li className='sidebarlinks'>
                        <Link to="/chef" className='sidebarItems'>
                        <img src={Images.sidebarchef} alt="logo" className="img-fluid home" />
                        Chefs
                        </Link>
                    </li>
                    <li className='sidebarlinks'>
                        <Link to="/myorder" className='sidebarItems'>
                        <img src={Images.myorder} alt="logo" className="img-fluid home" />
                        My Orders
                        </Link>
                    </li>
                    <li className='sidebarlinks '>
                        <Link to="/settings" className='settings'>
                        <img src={Images.setting} alt="logo" className="img-fluid home" />
                        Settings
                        </Link>
                    </li>
                    
                 </ul>

            </div>
            <div className='sidebarItems '>
            <img src={Images.userProfile} alt="logo" className="img-fluid" />
            Profile
            </div>
         </div>
        </>
    )
}

export default Sidebar