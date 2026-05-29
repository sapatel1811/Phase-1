import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AllUsers() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // load user
  useEffect(() => {
    loadUsers();
  }, []);

  // get users
  const loadUsers = async () => {
    try {
      const res = await axios.get("http://192.168.1.117:3000/users");

      setUsers(res.data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load users",
      });
    }
  };

  // delete user with swal alert
  const removeUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.117:3000/users/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "User Deleted Successfully",
          confirmButtonColor: "#0d6efd",
        });

        loadUsers();
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Delete failed",
        });
      }
    }
  };

  return (
    <div className="container-fluid py-4 col-12 col-xl-10 mx-auto">
      {/* header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <h2 className="fw-bold m-0">All Users </h2>
        <button className="btn btn-primary align-self-start align-self-sm-center" onClick={() => navigate("/add")}>
          Add User
        </button>
      </div>

      {/* table */}
      <div className="card shadow border-0">
        <div className="card-body table-responsive w-100 p-0 p-sm-3">
          <table className="table table-bordered table-hover align-middle text-nowrap m-0">
            <thead className="table-dark text-center">
              <tr>
                <th>S.no</th>
                <th>Profile</th>
                <th>Full Name</th>

                {/* <th>First Name</th> */}
                {/* <th>Last Name</th> */}

                <th>Email</th>

                {/* <th>Phone</th> */}
                {/* <th>City</th> */}
                {/* <th>State</th> */}
                {/* <th>Zip</th> */}
                {/* <th>DOB</th> */}

                {/* <th>Country</th> */}

                {/* <th>Language</th> */}

                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    {/* ID */}
                    {/* <td>{user.id}</td> */}
                    <td>{index + 1}</td>

                    {/* PROFILE */}
                    <td>
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400"; // Your default image URL
                            e.currentTarget.onerror = null; // Prevents infinite loops if default image also fails
                          }}
                          width="40"
                          height="40"
                          className="rounded-circle border object-fit-cover img-fluid"
                        />
                      ) : (
                        <img
                          src="https://placehold.co/600x400"
                          alt=""
                          width="40"
                          height="40"
                          className="rounded-circle border object-fit-cover img-fluid"
                        />
                      )}
                    </td>

                    {/* FIRST NAME */}
                    <td>{user.fname + " " + user.lname}</td>
                    {/* LAST NAME */}
                    {/* <td>{user.lname}</td> */}
                    {/* EMAIL */}
                    <td>{user.email}</td>
                    {/* PHONE */}
                    {/* <td>{user.phone}</td> */}
                    {/* CITY */}
                    {/* <td>{user.city}</td> */}
                    {/* STATE */}
                    {/* <td>{user.state}</td> */}
                    {/* ZIP */}
                    {/* <td>{user.zip_code}</td> */}
                    {/* DOB */}
                    {/* <td>{user.dob}</td> */}

                    {/* <td>{user.country}</td> */}
                    {/* LANGUAGE */}
                    {/* <td>{user.language}</td> */}
                    {/* JOB TITLE */}
                    <td>{user.job_title}</td>
                    {/* ACTIONS */}
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        {/* EDIT */}
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => navigate(`/edit/${user.id}`)}
                        >
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeUser(user.id)}
                        >
                          Delete
                        </button>

                        {/* view button */}
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => navigate(`/view/${user.id}`)}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="text-center text-muted py-4">
                    No Users Found{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AllUsers;
