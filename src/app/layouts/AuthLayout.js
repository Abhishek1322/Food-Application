import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthSelector } from '../../redux/selector/auth';
import AuthFooter from '../components/common/authFooter';
import AuthNav from '../components/common/authNav';

const AuthLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ['/resources', '/companyfrontProfile'];

  return (
    <>
      {/* <AuthNav /> */}
      {authRoutes.includes(pathName) ?
        <>
          <Outlet />
        </>
        :
        <>
          <main className='main' id='main'>
            <div className='container'>
              <Outlet />
            </div>
          </main>
        </>
      }
      {/* <AuthFooter /> */}
    </>
  );
};

export default AuthLayout;