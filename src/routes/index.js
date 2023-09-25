import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts";
import PrivateCheck from "../app/layouts/PrivateCheck";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Layouts.UserLayout />}>
          <Route path="/" element={<Containers.Login />} />
          <Route path="/setting" element={<Containers.SettingMain />} />
          <Route path="/new-booking" element={<Containers.NewBooking />} />
          <Route path="/menu" element={<Containers.Menu />} />
          <Route path="/home" element={<Containers.HomeRequsest />} />
          <Route
            path="/booking-details"
            element={<Containers.BookingDetails />}
          />
          <Route path="/order-details" element={<Containers.OrderDetails />} />
          <Route
            path="/anotherorder-detail"
            element={<Containers.AnotherOrderdetail />}
          />

          {/* Start User Side*/}
          {/* <Route path="/home-user" element={<Containers.HomeUser />} /> */}
        </Route>



        <Route element={<Layouts.Chef_Layout />}>
          <Route path="/home-user" element={<Containers.HomeUser />} />
        </Route>

        <Route element={<Layouts.AuthLayout />}>
          <Route element={<PrivateCheck auth={false} />}>
            <Route path="/choose-roles" element={<Containers.ChooseRoles />} />
            <Route path="/verification" element={<Containers.Verification />} />
            <Route
              path="/create-account"
              element={<Containers.CreateAccount />}
            />
            <Route
              path="/forgot-password"
              element={<Containers.ForgotPassword />}
            />
            <Route
              path="/recover-password"
              element={<Containers.Recoverpassword />}
            />
            <Route path="/enter-otp" element={<Containers.EnterOtp />} />
            <Route
              path="/change-password"
              element={<Containers.ChangePassword />}
            />
            <Route
              path="/delete-account"
              element={<Containers.DeleteAccount />}
            />
            <Route path="/loading" element={<Containers.Loading />} />
            <Route path="/loading-page" element={<Containers.Loadingpage />} />
            <Route
              path="/account-deleted"
              element={<Containers.AccountDeleted />}
            />
            <Route
              path="/term-condition"
              element={<Containers.TermAndCondition />}
            />
            <Route path="/contactu-us" element={<Containers.Contactus />} />
            <Route
              path="/privacy-policy"
              element={<Containers.PrivacyPolicy />}
            />
            <Route
              path="/setup-profile"
              element={<Containers.SetupProfile />}
            />
            <Route path="/cart" element={<Containers.Cart />} />
            <Route path="/chat" element={<Containers.Chat />} />
            <Route path="/notification" element={<Containers.Notification />} />
          </Route>

          <Route element={<PrivateCheck auth={true} />}>
            {/* <Route path="/setting" element={<Containers.SettingMain />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
