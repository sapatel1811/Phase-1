import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import AllUsers from "./Components/AllUsers";
import ViewUser from "./Components/ViewUser";
import Login from "./Components/Login";
// import ProfileEdit from "./Components/ProfileEdit";

import ProfileSetting from "./Components/ProfileSetting";
import PasswordSetting from "./Components/PasswordSetting";
import Signup from "./Components/Signup";



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
       <Route path="signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
       {/* <Route path="profile" element={<ProfileEdit />}/> */}

    

          <Route index element={<Home />} />
          <Route path="add" element={<AddUser />} />
          <Route path="all" element={<AllUsers />} />



          <Route path="edit/:id" element={<AddUser />} />
          <Route path="view/:id" element={<ViewUser />} />
          

         <Route path="profile" element={<ProfileSetting />}/>        
         <Route path="password-setting" element={<PasswordSetting />} />

        </Route>
      </Routes>

        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>


    


    </>
  );
}

export default App;