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
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id} className="text-center">
              <td>{index + 1}</td>

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

              {/* NAME */}
              <td>{user.fname + " " + user.lname}</td>

              {/* EMAIL */}
              <td>{user.email}</td>

              {/* JOB TITLE */}
              <td>{user.job_title}</td>

              {/* ACTIONS */}
              <td>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {/* EDIT */}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      navigate(`/dashboard/edit/${user.id}`)
                    }
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

                  {/* VIEW */}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      navigate(`/dashboard/view/${user.id}`)
                    }
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
              No Users Found
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
