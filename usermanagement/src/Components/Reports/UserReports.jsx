import React, { useEffect, useState } from "react";
import axios from "axios";

function UserReports() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(
      "http://192.168.1.117:3000/users"
    );

    setUsers(res.data);
  };

  return (
    <div className="container-fluid">

      <div className="mb-4">
  <h2 className="fw-bold text-dark">
    User Reports
  </h2>

  <p className="text-muted mb-0">
    View user statistics and detailed reports.
  </p>
</div>

    <div className="row g-4 mb-4">

  <div className="col-md-4">
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderLeft: "5px solid #ff6600",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted">Total Users</h6>
          <h2 className="fw-bold">{users.length}</h2>
        </div>

        {/* <i
          className="bi bi-people-fill"
          style={{
            fontSize: "40px",
            color: "#ff6600",
          }}
        ></i> */}

      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderLeft: "5px solid #28a745",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted">Active Users</h6>
          <h2 className="fw-bold">{users.length}</h2>
        </div>

        {/* <i
          className="bi bi-person-check-fill text-success"
          style={{ fontSize: "40px" }}
        ></i>
         */}
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderLeft: "5px solid #dc3545",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted">Inactive Users</h6>
          <h2 className="fw-bold">0</h2>
        </div>

        {/* <i
          className="bi bi-person-x-fill text-danger"
          style={{ fontSize: "40px" }}
        ></i>
         */}
      </div>
    </div>
  </div>

</div>

      <div className="card border-0 shadow-sm">

  <div
    className="card-header text-white fw-bold"
    style={{
      background: "linear-gradient(90deg,#ff6600,#ff8533)",
    }}
  >
    User Report List
  </div>

  <div className="card-body table-responsive">

    <table className="table table-hover align-middle">

      <thead>
        <tr>
          <th>#</th>
          <th>Profile</th>
          <th>Name</th>
          <th>Email</th>
          <th>Job Title</th>
        </tr>
      </thead>

      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id}>

              <td>{index + 1}</td>

              <td>
                <img
                  src={
                    user.profile ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt=""
                  width="45"
                  height="45"
                  className="rounded-circle border"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>
                <strong>
                  {user.fname} {user.lname}
                </strong>
              </td>

              <td>{user.email}</td>

              <td>
                <span className="badge bg-primary">
                  {user.job_title}
                </span>
              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center text-muted py-4"
            >
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

export default UserReports;