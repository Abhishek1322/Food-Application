import { Outlet } from 'react-router-dom';
import MainFooter from '../components/common/mainFooter';
import MainNav from '../components/common/mainNav';

const MainLayout = () => {
  return (
    <>
      {/* <MainNav /> */}
      <main className='main'>
        <Outlet />
      </main>
      {/* <MainFooter /> */}
    </>
  );
};

export default MainLayout;