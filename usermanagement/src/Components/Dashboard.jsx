import { Link, NavLink, Outlet ,useNavigate } from "react-router-dom";
import { useState  } from "react";

function Dashboard() {
  const [userOpen, setUserOpen] = useState(false);


const navigate = useNavigate();
   

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4"
        style={{ height: "60px", position: "fixed", width: "100%", top: 0, zIndex: 1000 ,   display: "flex",
    justifyContent: "space-between" }}>

        <h4 className="text-white m-0">User Dashboard</h4>

         {/* USERNAME SHOW */}
 <div
  className="text-white fw-semibold"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/dashboard/profile")}
>
  👤 {JSON.parse(localStorage.getItem("currentUser"))?.username}
</div>

</nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-white shadow-sm p-3"
          style={{ width: "250px", minHeight: "100vh", position: "fixed", top: "60px", left: 0 }}>

          <h5 className="mb-4">Menu</h5>

          <ul className="nav flex-column gap-2">

            {/* HOME */}
            <li>
              <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            </li>

            {/* USER */}
            <li>
              <button className="btn w-100 text-start"
                onClick={() => setUserOpen(!userOpen)}>
                User
              </button>

              {userOpen && (
                <ul className="list-unstyled ps-3">
                  <li>
                    <NavLink to="add" className="nav-link">Add User</NavLink>
                  </li>
                  <li>
                    <NavLink to="all" className="nav-link">User List</NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* LOGOUT */}
            <li>
              <Link to="/" className="btn btn-danger w-100">
                Logout
              </Link>
            </li>

          </ul>
        </div>




        {/* CONTENT */}
        <div style={{ marginLeft: "250px", marginTop: "60px", width: "100%", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;