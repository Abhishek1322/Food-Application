import { Route, Routes } from "react-router-dom";
import * as Containers from "../app/containers";
import * as Layouts from "../app/layouts";
import UserRoute from "../app/layouts/UserRoute";
import ChefRoute from "../app/layouts/ChefRoute";
import PublicRoute from "../app/layouts/PublicRoute";

const Router = () => {
  return (
    <>
      <Routes>
        {/* USER_ROUTES */}
        <Route element={<Layouts.UserLayout />}>
          <Route
            path="/setting"
            element={
              <UserRoute role="user">
                <Containers.SettingMain />
              </UserRoute>
            }
          />
          <Route
            path="/home-user"
            element={
              <UserRoute role="user">
                <Containers.HomeUser />
              </UserRoute>
            }
          />
          <Route
            path="/chef-details"
            element={
              <UserRoute role="user">
                <Containers.ChefDetails />
              </UserRoute>
            }
          />
        </Route>
        {/* CHEF_ROUTES */}
        <Route element={<Layouts.Chef_Layout />}>
          <Route
            path="/setting"
            element={
              <UserRoute role="chef">
                <Containers.SettingMain />
              </UserRoute>
            }
          />
          <Route
            path="/chef-profile"
            element={
              <ChefRoute role="chef">
                <Containers.myprofile />
              </ChefRoute>
            }
          />
          <Route
            path="/edit-chef-profile"
            element={
              <ChefRoute role="chef">
                <Containers.EditProfile />
              </ChefRoute>
            }
          />
          <Route
            path="/new-booking"
            element={
              <ChefRoute role="chef">
                <Containers.NewBooking />
              </ChefRoute>
            }
          />
          <Route
            path="/menu"
            element={
              <ChefRoute role="chef">
                <Containers.Menu />
              </ChefRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ChefRoute role="chef">
                <Containers.HomeRequsest />
              </ChefRoute>
            }
          />
          <Route
            path="/booking-details"
            element={
              <ChefRoute role="chef">
                <Containers.BookingDetails />
              </ChefRoute>
            }
          />

          <Route
            path="/order-details"
            element={
              <ChefRoute role="chef">
                <Containers.OrderDetails />
              </ChefRoute>
            }
          />
          <Route
            path="/anotherorder-detail"
            element={
              <ChefRoute role="chef">
                <Containers.AnotherOrderdetail />
              </ChefRoute>
            }
          />
        </Route>

        {/* PUBLIC_ROUTES */}
        <Route element={<Layouts.AuthLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Containers.Login />
              </PublicRoute>
            }
          />
          <Route
            path="/choose-roles"
            element={
              <PublicRoute>
                <Containers.ChooseRoles />
              </PublicRoute>
            }
          />
          <Route
            path="/verification"
            element={
              <PublicRoute>
                <Containers.Verification />
              </PublicRoute>
            }
          />
          <Route
            path="/create-account/:role"
            element={
              <PublicRoute>
                <Containers.CreateAccount />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <Containers.ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/recover-password"
            element={
              <PublicRoute>
                <Containers.Recoverpassword />
              </PublicRoute>
            }
          />
          <Route path="/enter-otp" element={<Containers.EnterOtp />} />
          <Route
            path="/change-password"
            element={
              <PublicRoute>
                <Containers.ChangePassword />
              </PublicRoute>
            }
          />
          <Route
            path="/delete-account"
            element={
              <ChefRoute>
                <Containers.DeleteAccount />
              </ChefRoute>
            }
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
            element={
              <ChefRoute>
                <Containers.SetupProfile />
              </ChefRoute>
            }
          />
          <Route path="/cart" element={<Containers.Cart />} />
          <Route path="/chat" element={<Containers.Chat />} />
          <Route path="/notification" element={<Containers.Notification />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
