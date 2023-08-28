import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts"
import PrivateCheck from "../app/layouts/PrivateCheck";


const Router = () => {

    return (
        <>
            <Routes>
                <Route element={<Layouts.MainLayout />}>
                    <Route path="/" element={<Containers.Login />} />
                </Route>

                <Route element={<Layouts.AuthLayout />}>
                    <Route element={<PrivateCheck auth={true} />}>
                        <Route path="/login" element={<Containers.Login />} />
                        <Route path="/chooseroles" element={<Containers.ChooseRoles />} />
                        <Route path="/verification" element={<Containers.Verification />} />
                        <Route path="/createAccount" element={<Containers.CreateAccount />} />
                        <Route path="/forgotpassword" element={<Containers.forgotPassword />} />
                    </Route>
 
                    {/* <Route element={<PrivateCheck auth={true} />}> 
                        <Route path="/dashboard" element={<Containers.AccountDashboard />} />
                    </Route> */}
                </Route>
            </Routes>
        </>
    );
}

export default Router;