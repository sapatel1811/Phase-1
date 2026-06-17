import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";


// used for profile icon clickable
import { useRef, useEffect } from "react";


function Dashboard() {
  const [userOpen, setUserOpen] = useState(false);


  // profile edit ....
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  // Logout Function
  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // profile kahi be click krne par card hat jata hy wo function
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




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
        <div ref={menuRef} className="position-relative">
          <div
            className="d-flex align-items-center gap-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setShowProfileMenu(!showProfileMenu);
            }}
          >
            <ProfileIcon />
            {/* <span>{currentUser?.username}</span> */}
          </div>


          {showProfileMenu && (
            <div
              className="card shadow border-0 position-absolute"
              style={{
                right: 0,
                top: "50px",
                width: "220px",
                zIndex: 9999,
                borderRadius: "12px",
              }}
            >
              <div className="card-body p-3">
                <h6 className="mb-0 fw-bold">
                  {currentUser?.fname
                    ? `${currentUser.fname} ${currentUser.lname}`
                    : currentUser?.username}
                </h6>


                <small
                  className="text-muted d-block"
                  style={{ lineHeight: "1.2" }}
                >
                  {currentUser?.email}
                </small>


                <hr className="my-2" />


                {/* <button
                  className="btn btn-light w-100 mb-2"
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setShowProfileMenu(false);
                  }}
                >
                  Edit Profile
                </button>

                <button
                  className="btn btn-danger w-100"
                  onClick={logout}
                >
                  Logout
                </button> */}

<button
  className="btn w-100 mb-2 text-white d-flex align-items-center justify-content-center gap-2"
  style={{
    background: "#0d6efd",
    borderRadius: "8px",
  }}
  onClick={() => {
    navigate("/dashboard/profile");
    setShowProfileMenu(false);
  }}
>
  <i className="bi bi-pencil-square"></i>
  Edit Profile
</button>

<button
  className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2"
  style={{
    background: "#dc3545",
    borderRadius: "8px",
  }}
  onClick={logout}
>
  <i className="bi bi-box-arrow-right"></i>
  Logout
</button>







              </div>
            </div>
          )}
        </div>


        {/* <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center gap-2 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/profile-edit")}
          >
            <ProfileIcon /> */}


        {/* <div
              className="rounded-circle bg-light text-dark d-flex align-items-center justify-content-center"
              style={{
                width: "38px",
                height: "38px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
             
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


        {/* <span className="fw-semibold">{currentUser?.username}</span>
          </div> */}


        {/* <button
            className="btn btn-outline-light btn-sm px-3"
            onClick={logout}
          >
            Logout
          </button> */}
        {/*
        </div> */}
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
                User Management
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
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "#ff6600" : "transparent",
                        color: isActive ? "#fff" : "#6c757d",
                      })}
                    >
                      User List
                    </NavLink>
                  </li>


                  {/* NEW PROFILE SETTINGS */}
                  {/* <li>
                    <NavLink
                      to="profile-edit"
                      className="nav-link rounded px-3 py-2 fw-bold"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "#ff6600" : "transparent",
                        color: isActive ? "#fff" : "#6c757d",
                      })}
                    >
                      Profile Settings
                    </NavLink>
                  </li> */}


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
