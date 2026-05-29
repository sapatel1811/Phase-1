import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import AddUser from "./Components/AddUser";
import AllUsers from "./Components/AllUsers";
import ViewUser from "./Components/ViewUser";

function App() {

  return (

    <BrowserRouter>
      <Routes>  
        <Route path="/" element={  <Dashboard /> }>
          {/* HOME */}
          <Route index element={<Home />} />

          {/* ADD USER */}
          <Route path="add" element={<AddUser />} />

          {/* ALL USERS */}
          <Route path="all" element={<AllUsers />} />

          {/* EDIT USER */}
          <Route path="edit/:id" element={<AddUser />} />

              {/* view user */}
            <Route path="/view/:id" element={<ViewUser />} />
            
          </Route>
    
      </Routes>

    </BrowserRouter>
  );
}

export default App;