import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";


function Dashboard() {
  const [userOpen, setUserOpen] = useState(false);

  

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-dark bg-dark px-4"
        style={{
          height: "60px",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h4 className="text-white m-0">User Dashboard</h4>

      </nav>

      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-white shadow-sm p-3"
          style={{
            width: "250px",
            minHeight: "100vh",
            position: "fixed",
            top: "60px",
            left: 0,
          }}
        >
          <h5 className="mb-4">Menu</h5>
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark fw-semibold">
                Dashboard{" "}
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn w-100 text-start d-flex justify-content-between align-items-center"
                onClick={() => setUserOpen(!userOpen)}
              >
                <span>User</span>
                <span>{userOpen ? "−" : "+"}</span>
              </button>

              {userOpen && (
                <ul className="list-unstyled ps-3 mt-2">
                  <li>
                    <NavLink to="add" className="nav-link text-dark">
                      Add User
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="all" className="nav-link text-dark">
                      User List
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          style={{
            marginLeft: "250px",
            marginTop: "60px",
            width: "100%",
            padding: "20px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
