import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";

function Dashboard() {
  const [userOpen, setUserOpen] = useState(false);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Logout Function
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* ================= NAVBAR ================= */}
      <nav
        className="navbar navbar-dark px-4 shadow-sm"
        style={{
          height: "70px",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          background: "linear-gradient(90deg, #1e293b, #334155)",
        }}
      >
        {/* Logo */}
        <h4 className="text-white fw-bold m-0">User Management System</h4>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center gap-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/profile-edit")}
          >
            <ProfileIcon />

            {/* <div
              className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center"
              style={{
                width: "38px",
                height: "38px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              👤
            </div> */}

            {/* 4-6-2026 */}

            {/* <img
  src={
    JSON.parse(localStorage.getItem("currentUser"))
      ?.profile ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  }
  alt="profile"
  width="40"
  height="40"
  className="rounded-circle border"
  style={{
    objectFit: "cover",
  }}
/> */}

            <span className="fw-semibold">{currentUser?.username}</span>
          </div>

          <button
            className="btn btn-outline-light btn-sm px-3"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="d-flex">
        {/* ================= SIDEBAR ================= */}
        <div
          className="shadow-sm"
          style={{
            width: "250px",
            minHeight: "100vh",
            position: "fixed",
            top: "70px",
            left: 0,
            background: "#ffffff",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          {/* Sidebar Header */}
          {/* <div className="text-center py-4 border-bottom">
            <h5 className="fw-bold text-primary mb-1">
              Admin Panel
            </h5>

            <small className="text-muted">
              User Management
            </small>
          </div> */}

          {/* Menu */}
          <ul className="nav flex-column p-3 gap-2">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className="nav-link rounded px-3 py-2 fw-semibold"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#ff6600" : "transparent",
                  color: isActive ? "white" : "black",
                })}
              >
                Dashboard
              </NavLink>
            </li>

            {/* User Section */}
            <li>
              <button
                className="btn w-100 text-start fw-semibold"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
                onClick={() => setUserOpen(!userOpen)}
              >
                User
              </button>

              {userOpen && (
                <ul className="list-unstyled ps-3 mt-2">
                  <li>
                    <NavLink
                      to="add"
                      className="nav-link rounded px-3 py-2 fw-bold"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "#ff6600" : "transparent",
                        color: isActive ? "#fff" : "#6c757d",
                      })}
                    >
                      Add User
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="all"
                      className="nav-link rounded px-3 py-2 fw-bold"
                      style={({isActive})=>({
                        backgroundColor: isActive ? "#ff6600" : "transparent",
                        color: isActive ? "#fff" : "#6c757d",
                      })}
                    >
                      User List
                    </NavLink>
                  </li>

                  {/* NEW PROFILE SETTINGS */}
                  <li>
                    <NavLink
                      to="profile-edit"
                       className="nav-link rounded px-3 py-2 fw-bold"
                      style={({isActive})=>({
                        backgroundColor: isActive ? "#ff6600" : "transparent",
                        color: isActive ? "#fff" : "#6c757d",
                      })}
                    >
                      Settings
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          style={{
            marginLeft: "250px",
            marginTop: "70px",
            width: "100%",
            padding: "25px",
            backgroundColor: "#f8fafc",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
