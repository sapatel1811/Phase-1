


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./website/pages/Index";
import Header from "./website/component/Header";
import Footer from "./website/component/Footer";
import Properties from "./website/pages/Properties";
import PropertiesDetails from "./website/pages/PropertiesDetails";
import Contact from "./website/pages/Contact";
import Signup from "./website/pages/Signup";
import Login from "./website/pages/Login";
import AHeader from "./admin/components/AHeader";
import AFooter from "./admin/components/AFooter";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import AddCategories from "./admin/pages/AddCategories";
import ManageCategories from "./admin/pages/ManageCategories";
import AddProperties from "./admin/pages/AddProperties";
import ManageProperties from "./admin/pages/ManageProperties";
import ManageCustomer from "./admin/pages/ManageCustomer";
import ManageFeedaback from "./admin/pages/ManageFeedaback";
import ManageBooking from "./admin/pages/ManageBooking";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./website/pages/UserProfile";
import EditProfile from "./website/pages/EditProfile";

import Admin_authantic from "./admin/pages/AdminAuthantic";

import UserAfterAuth from "./website/pages/UserAfterAuth";

import UserBeforeAuth from "./website/pages/UserBeforeAuth";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<> <Header/> <Index/> <Footer/></>}></Route>
          <Route path="/properties" element={<> <Header/> <Properties/> <Footer/></>}></Route>
          <Route path="/propertyDetails/:id" element={<> <Header/> <PropertiesDetails/> <Footer/></>}></Route>
          <Route path="/contact" element={<> <Header/> <Contact/> <Footer/></>}></Route>
         
          <Route element={<UserBeforeAuth/>}>
            <Route path="/signup" element={<> <Header/> <Signup/> <Footer/></>}></Route>
            <Route path="/login" element={<> <Header/> <Login/> <Footer/></>}></Route>
          </Route>

          <Route element={<UserAfterAuth/>}>
            <Route path="/userprofile" element={<> <Header/> <UserProfile/> <Footer/></>}></Route>
            <Route path="/editprofile/:id" element={<> <Header/> <EditProfile/> <Footer/></>}></Route>
          </Route>

          <Route path="/adminlogin" element={<>  <AdminLogin/> <AFooter/></>}></Route>  
          
          <Route element={<Admin_authantic/>}>
            <Route path="/dashboard" element={<> <AHeader/> <Dashboard/> <AFooter/></>}></Route>
            <Route path="/addcategories" element={<> <AHeader/> <AddCategories/> <AFooter/></>}></Route>
            <Route path="/managecategories" element={<> <AHeader/> <ManageCategories/> <AFooter/></>}></Route>
            <Route path="/addproperties" element={<> <AHeader/> <AddProperties/> <AFooter/></>}></Route>
            <Route path="/manageproperties" element={<> <AHeader/> <ManageProperties/> <AFooter/></>}></Route>
            <Route path="/managecustomer" element={<> <AHeader/> <ManageCustomer/> <AFooter/></>}></Route>
            <Route path="/managefeedback" element={<> <AHeader/> <ManageFeedaback/> <AFooter/></>}></Route>
            <Route path="/managebooking" element={<> <AHeader/> <ManageBooking/> <AFooter/></>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;