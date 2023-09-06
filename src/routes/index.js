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
                    <Route path="/setting" element={<Containers.SettingMain />} />
                </Route>

                <Route element={<Layouts.AuthLayout />}>
                    <Route element={<PrivateCheck auth={false} />}>
                        <Route path="/login" element={<Containers.Login />} />
                        <Route path="/chooseroles" element={<Containers.ChooseRoles />} />
                        <Route path="/verification" element={<Containers.Verification />} />
                        <Route path="/createAccount" element={<Containers.CreateAccount />} />
                        <Route path="/forgotpassword" element={<Containers.forgotPassword />} />
                        <Route path="/recoverpassword" element={<Containers.Recoverpassword />} />
                        <Route path="/enterOtp" element={<Containers.EnterOtp />} />
                        <Route path="/ChangePassword" element={<Containers.ChangePassword />} />
                        <Route path="/deleteAccount" element={<Containers.DeleteAccount />} />
                        <Route path="/loading" element={<Containers.loading />} />
                        <Route path="/loadingPage" element={<Containers.loadingpage />} />
                        <Route path="/accountDeleted" element={<Containers.AccountDeleted />} />
                        <Route path="/termAndCondition" element={<Containers.TermAndCondition />} />
                        <Route path="/contactUs" element={<Containers.contactus />} />
                        <Route path="/PrivacyPolicy" element={<Containers.PrivacyPolicy />} />
                        <Route path="/setup-profile" element={<Containers.SetupProfile />} />
                        <Route path="/cart" element={<Containers.cart/>} />
                        <Route path="/chat" element={<Containers.chat/>} />
                        <Route path="/notification" element={<Containers.Notification/>} />
                    </Route>
 
                    <Route element={<PrivateCheck auth={true} />}> 
                        {/* <Route path="/setting" element={<Containers.SettingMain />} /> */}
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default Router;