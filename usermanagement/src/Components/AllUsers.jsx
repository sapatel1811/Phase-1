import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

function AllUsers() {
  const [users, setUsers] = useState([]);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  // load user
  useEffect(() => {
    loadUsers();
  }, []);

  // get users
  const loadUsers = async () => {
    try {
      const res = await axios.get("http://192.168.1.117:3000/users");

      setUsers([...res.data].reverse()); // last add user data ko first me karne ke liye
    } catch (error) {
      console.log(error);
      toast.error("Failed to load users");
    }
  };

  // delete user with tost notify
  const removeUser = async () => {
    const toastId = toast.loading("Deleting user...");

    try {
      await axios.delete(`http://192.168.1.117:3000/users/${selectedUserId}`);

      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));

      toast.update(toastId, {
        render: "User deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
        closeButton: true,
      });

      setShowDeleteModal(false);
      setSelectedUserId(null);
    } catch (error) {
      toast.update(toastId, {
        render: "Delete failed",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  };

  // serch
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.fname} ${user.lname} ${user.email} ${user.job_title}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : user.status?.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    console.log("ALL USERS:", users);
  }, [users]);

  // toggale stsuts (active and inactive )
  const toggleStatus = async (user) => {
    try {
      const newStatus = user.status === "active" ? "inactive" : "active";

      await axios.patch(`http://192.168.1.117:3000/users/${user.id}`, {
        status: newStatus,
      });

      // First update UI
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
      );
      console.log("before tost");
      toast.success(
        // console.log("h1"),
        newStatus === "active"
          ? "User Activated Successfully"
          : "User Inactivated Successfully",
      );
     console.log("after tost");

      // loadUsers(); // Real-time update
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user status");
    }
  };

  // open delete modal and set selected user
  const setDeleteUser = (user) => {
    if (!user || !user.id) return;
    setSelectedUserId(user.id);
    setShowDeleteModal(true);
  };

  return (
    <div className="container-fluid px-2 px-sm-3 py-2">
      {/* header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-0">
        <div>
          <h2 className="fw-bold mb-0">All Users</h2>
          <small className="text-muted">
            Manage and monitor all registered users
          </small>
        </div>

        {/* <button
    className="btn btn-primary px-4"
    style={{
      minWidth: "140px",
      height: "45px",
    }}
    onClick={() => navigate("/dashboard/add")}
  >
    <i className="bi bi-person-plus-fill me-2"></i>
    Add User
  </button> */}
      </div>

      {/* serch */}
      {/* <div className="row mb-2">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search user..."
      value={search}
      onChange={(e) => {
  setSearch(e.target.value);
  setCurrentPage(1);
}}
    />
  </div>
</div> */}

      <div className="row mb-4">
        <div
          className="row g-3 mb-2"
          style={{
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                }}
              ></i>

              <input
                type="text"
                className="form-control form-control-lg ps-5 pe-5"
                placeholder="Search by name, email or job title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {search && (
                <i
                  className="bi bi-x-circle-fill position-absolute"
                  style={{
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#dc3545",
                  }}
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                ></i>
              )}
            </div>
          </div>

          {/* Filter */}
          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="form-select shadow-sm"
              style={{
                minHeight: "48px",
                fontSize: "14px",
                width: "100%",
              }}
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              /* style={{
      width: "100%",
      maxWidth: "100%",
      minHeight: "48px",
      boxSizing: "border-box",
      
    }} */
            >
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
          </div>

          {/* Add Button */}
          <div className="col-12 col-sm-6 col-lg-3">
            <button
              className="btn btn-primary w-100 h-100"
              onClick={() => navigate("/dashboard/add")}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="card shadow border-0">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="mb-0 fw-semibold">User Directory</h5>
        </div>
        <div className="card-body p-0 p-md-3">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle text-nowrap m-0">
              <thead
                className="text-center"
                style={{
                  backgroundColor: "#212529",
                  color: "#fff",
                }}
              >
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <tr key={user.id} className="text-center">
                      {/* <td>{index + 1}</td> */}

                      {/* serial no    */}
                      <td>{indexOfFirstUser + index + 1}</td>

                      {/* PROFILE */}
                      <td>
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://placehold.co/600x400";
                              e.currentTarget.onerror = null;
                            }}
                            width="40"
                            height="40"
                            className="rounded-circle border object-fit-cover "
                          />
                        ) : (
                          <img
                            src="https://placehold.co/600x400"
                            alt=""
                            width="40"
                            height="40"
                            className="rounded-circle border object-fit-cover "
                          />
                        )}
                      </td>

                      {/* NAME */}
                      <td>{user.fname + " " + user.lname}</td>

                      {/* EMAIL */}
                      <td>{user.email}</td>

                      {/* JOB TITLE */}
                      <td>{user.job_title}</td>

                      {/* ACTIONS */}

                      <td>
                        <div
                          className="
    d-flex
    flex-wrap
    justify-content-center
    align-items-center
    gap-0
  "
                        >
                          {" "}
                          {/* View */}
                          <button
                            className="btn text-success  d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            onClick={() =>
                              navigate(`/dashboard/view/${user.id}`)
                            }
                            title="View"
                          >
                            <i className="bi bi-eye-fill fs-4"></i>
                          </button>
                          {/* Edit */}
                          <button
                            className="btn text-primary  d-flex align-items-center justify-content-center"
                            style={{ width: "40px", height: "40px" }}
                            onClick={() =>
                              navigate(`/dashboard/edit/${user.id}`)
                            }
                            title="Edit"
                          >
                            <i className="bi bi-pencil-fill fs-4"></i>
                          </button>
                          {/* Delete */}
                          <button
                            className="btn text-danger  d-flex align-items-center justify-content-center"
                            style={{ width: "42px", height: "42px" }}
                            onClick={() => setDeleteUser(user)}
                            title="Delete User"
                          >
                            <i className="bi bi-trash-fill fs-4"></i>
                          </button>
                          {/* actionlog */}
                          <div
                            onClick={() => toggleStatus(user)}
                            style={{
                              width: "40px",
                              height: "22px",
                              borderRadius: "40px",
                              background:
                                user.status === "active"
                                  ? "#22c55e"
                                  : "#dc3545",
                              position: "relative",
                              cursor: "pointer",
                              transition: "0.8s",
                              marginTop: "2px",
                            }}
                          >
                            <div
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: "#fff",
                                position: "absolute",
                                top: "2px",
                                left: user.status === "active" ? "20px" : "2px",
                                transition: "0.4s",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="text-center text-muted py-4">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div
            className="
    d-flex
    flex-column
    flex-md-row
    justify-content-between
    align-items-center
    gap-3
    mt-4
  "
          >
            {" "}
            <span className="text-muted">
              Showing {currentUsers.length} of {filteredUsers.length} users
            </span>
            <div className="d-flex align-items-center flex-wrap justify-content-center">
              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span className="fw-bold mx-2">
                {currentPage} / {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>

          {/* <ToastContainer
            position="top-right"
            autoClose={2500}
            theme="colored"
          /> */}
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4 rounded-4 shadow-lg text-center"
            style={{
              width: "100%",
              maxWidth: "420px",
            }}
          >
            <div className="mb-3">
              <i
                className="bi bi-exclamation-triangle-fill text-warning"
                style={{ fontSize: "55px" }}
              ></i>
            </div>

            <h4 className="fw-bold mb-2">Delete User?</h4>

            <p className="text-muted mb-4">
              Are you sure you want to delete this user?
              <br />
              This action cannot be undone.
            </p>

            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                className="btn btn-secondary px-4"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUserId(null);
                }}
              >
                Cancel
              </button>

              <button className="btn btn-danger px-4" onClick={removeUser}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AllUsers;
