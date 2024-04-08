import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts";
import { useAuthSelector } from "../redux/selector/auth";

const Router = () => {
  const authData = useAuthSelector();

  return (
    <>
      <Routes>
        {/* USER_ROUTES */}
        <Route element={<Layouts.UserLayout />}>
          {authData?.userInfo?.role === "user" && (
            <Route path="/setting" element={<Containers.SettingMain />} />
          )}
          <Route path="/home-user" element={<Containers.HomeUser />} />
          <Route path="/chef-details" element={<Containers.ChefDetails />} />
          <Route path="/menu-details" element={<Containers.MenuDetails />} />
          <Route path="/user-chef-home" element={<Containers.UserChefHome />} />
          <Route
            path="/user-order-home"
            element={<Containers.UserOrderHome />}
          />
          <Route
            path="/user-myprofile"
            element={<Containers.UserMyProfile />}
          />
          <Route
            path="/user-manageaddress"
            element={<Containers.UserManageAddress />}
          />
          <Route
            path="/user-editprofile"
            element={<Containers.UserEditProfile />}
          />
          <Route
            path="/choose-location"
            element={<Containers.ChooseLocation />}
          />
          <Route path="/thank-you" element={<Containers.ThankYou />} />
        </Route>

        {/* CHEF_ROUTES */}
        <Route element={<Layouts.Chef_Layout />}>
          {authData?.userInfo?.role === "chef" && (
            <Route path="/setting" element={<Containers.SettingMain />} />
          )}

          <Route path="/chef-profile" element={<Containers.myprofile />} />
          <Route
            path="/edit-chef-profile"
            element={<Containers.EditProfile />}
          />
          <Route path="/new-booking" element={<Containers.NewBooking />} />
          <Route path="/menu" element={<Containers.Menu />} />
          <Route path="/home" element={<Containers.HomeRequsest />} />

          <Route path="/my-profile" element={<Containers.myprofile />} />

          <Route path="/order-details" element={<Containers.OrderDetails />} />

          <Route
            path="/booking-details"
            element={<Containers.BookingDetails />}
          />
        </Route>

        {/* AUTHENTICATED_ROUTES */}
        <Route element={<Layouts.AuthLayout />}>
          <Route path="/login" element={<Containers.Login />} />
          <Route path="/choose-roles" element={<Containers.ChooseRoles />} />
          <Route path="/verification" element={<Containers.Verification />} />
          <Route
            path="/create-account/:role"
            element={<Containers.CreateAccount />}
          />
          <Route path="/setup-profile" element={<Containers.SetupProfile />} />
          <Route path="/request" element={<Containers.RequestPage />} />

          <Route
            path="/forgot-password"
            element={<Containers.ForgotPassword />}
          />
          <Route
            path="/recover-password"
            element={<Containers.Recoverpassword />}
          />
          <Route path="/enter-otp" element={<Containers.EnterOtp />} />
        </Route>

        {/* COMMON_ROUTES */}
        <Route element={<Layouts.CommonLayout />}>
          <Route path="/loading" element={<Containers.Loading />} />
          <Route path="/loading-page" element={<Containers.Loadingpage />} />
          <Route
            path="/term-condition"
            element={<Containers.TermAndCondition />}
          />
          <Route path="/about-us" element={<Containers.AboutUs />} />
          <Route path="/contact-us" element={<Containers.Contactus />} />
          <Route
            path="/privacy-policy"
            element={<Containers.PrivacyPolicy />}
          />
          <Route path="*" element={<Containers.PageNotFound />} />
        </Route>

        {/* COMMON_ROUTES PROTECTED */}

        <Route element={<Layouts.CommonProtectLayout />}>
          <Route
            path="/change-password"
            element={<Containers.ChangePassword />}
          />
          <Route
            path="/delete-account"
            element={<Containers.DeleteAccount />}
          />
          <Route
            path="/account-deleted"
            element={<Containers.AccountDeleted />}
          />
        </Route>

        {/* PUBLIC ROUTES */}
        <Route element={<Layouts.MainLayout />}>
          <Route
            path="/user-contact-us"
            element={<Containers.UserContactUs />}
          />
          <Route element={<Containers.Dashboard />} path="/" />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
