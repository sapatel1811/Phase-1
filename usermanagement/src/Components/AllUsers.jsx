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

      toast.update(toastId, {
        render: "User deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

      setShowDeleteModal(false);
      setSelectedUserId(null);

      loadUsers();
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

      if (newStatus === "active") {
        toast.success("User Activated Successfully");
      } else {
        toast.warning("User Inactivated Successfully");
      }

      loadUsers(); // Real-time update
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
    <div className="container py-1 pb-4">
      {/* header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <h2 className="fw-bold m-0">All Users </h2>
        <button
          className="btn btn-primary align-self-start align-self-sm-center"
          onClick={() => navigate("/dashboard/add")}
        >
          Add User
        </button>
      </div>

      {/* serch */}
      {/* <div className="row mb-3">
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

      <div className="row mb-3">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="position-relative">
              {/* Search Icon */}
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                }}
              ></i>

              {/* Input */}
              <input
                type="text"
                className="form-control  ps-5 pe-5 "
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {/* Clear Icon */}
              {search && (
                <i
                  className="bi bi-x-circle-fill position-absolute"
                  style={{
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontSize: "18px",
                  }}
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                ></i>
              )}
            </div>
          </div>

          {/*========== action user ======================  */}

          <div className="col-md-3">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="card shadow border-0 overflow-auto">
        <div className="card-body table-responsive p-0 p-md-3">
          <table className="table table-bordered table-hover table-sm align-middle text-nowrap m-0">
            <thead className="table-dark text-center">
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
                      <div className="d-flex justify-content-center gap-2">
                        {/* View */}
                        <button
                          className="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "38px", height: "38px" }}
                          onClick={() => navigate(`/dashboard/view/${user.id}`)}
                          title="View"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>

                        {/* Edit */}
                        <button
                          className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "38px", height: "38px" }}
                          onClick={() => navigate(`/dashboard/edit/${user.id}`)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>

                        {/* Delete */}
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "38px", height: "38px" }}
                          onClick={() => setDeleteUser(user)}
                          title="Delete User"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>

                        {/* actionlog */}
                        <div
                          onClick={() => toggleStatus(user)}
                          style={{
                            width: "40px",
                            height: "22px",
                            borderRadius: "20px",
                            background:
                              user.status === "active" ? "#22c55e" : "#dc3545",
                            position: "relative",
                            cursor: "pointer",
                            transition: "0.3s",
                            marginTop: "8px",
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
                              transition: "0.3s",
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

          {/* pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted">
              Showing {currentUsers.length} of {filteredUsers.length} users
            </span>

            <div>
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              <span className="fw-bold mx-2">
                {currentPage} / {totalPages}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
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
              width: "400px",
              maxWidth: "90%",
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

            <div className="d-flex justify-content-center gap-3">
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
