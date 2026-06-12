import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://192.168.1.117:3000/users");
    setUsers(res.data);
  };

  
  // COUNTS
  const totalUsers = users.length; // total user yha list se aye hy 

  const activeUsersList = users.filter(
    (u) => u.status?.toLowerCase() === "active"  // ? anad lowercase : ye user active hy ya nahi batata hy
  );

  const inactiveUsersList = users.filter(
    (u) => u.status?.toLowerCase() === "inactive" // ye user kitne user inactive hy batata hy .
  );


// Search
const [search, setSearch] = useState("");

// Pagination
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 6;

// Filter Users
const filteredUsers = users.filter((user) =>
  `${user.fname} ${user.lname} ${user.email} ${user.job_title} ${user.status || ""}`
    .toLowerCase()
    .includes(search.toLowerCase())
);
// Pagination Logic
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = filteredUsers.slice(
  indexOfFirstUser,
  indexOfLastUser
);
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);



return (
    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4">Dashboard Overview</h2>

      {/* ================= CARDS ================= */}
      <div className="row g-4 mb-4">

        {/* TOTAL */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg rounded-4 bg-primary text-white">
            <div className="card-body d-flex justify-content-between align-items-center p-4">
              <div>
                <h6>Total Users</h6>
                <h2 className="fw-bold mb-0">{totalUsers}</h2>
              </div>
              <i className="bi bi-people-fill fs-1 opacity-75"></i>
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white">
            <div className="card-body d-flex justify-content-between align-items-center p-4">
              <div>
                <h6>Active Users</h6>
                <h2 className="fw-bold mb-0">{activeUsersList.length}</h2>
               
              </div>
              <i className="bi bi-person-check-fill fs-1 opacity-75"></i>
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg rounded-4 bg-danger text-white">
            <div className="card-body d-flex justify-content-between align-items-center p-4">
              <div>
                <h6>Inactive Users</h6>
                <h2 className="fw-bold mb-0">{inactiveUsersList.length}</h2>
              </div>
              <i className="bi bi-person-x-fill fs-1 opacity-75"></i>
            </div>
          </div>
        </div>

      </div>

{/* serch user ke liye  */}
  <div className="row my-4">
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search Users..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>
</div>

      {/* ================= ACTIVE USERS TABLE ================= */}
      {/* <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-header bg-secondary text-white fw-bold">
          Active Users ({activeUsersList.length})
        </div>

        <div className="card-body table-responsive p-0">
          <table className="table table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {activeUsersList.length > 0 ? (
                activeUsersList.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.job_title}</td>
                    <td>
                      <span className="badge bg-success px-3 py-2">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 text-muted">
                    No Active Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* ================= INACTIVE USERS TABLE ================= */}
      {/* <div className="card shadow border-0 rounded-4">
        <div className="card-header bg-secondary text-white fw-bold">
          Inactive Users ({inactiveUsersList.length})
        </div>

        <div className="card-body table-responsive p-0">
          <table className="table table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inactiveUsersList.length > 0 ? (
                inactiveUsersList.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.job_title}</td>
                    <td>
                      <span className="badge bg-danger px-3 py-2">
                        Inactive
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 text-muted">
                    No Inactive Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}

  


<div className="card shadow border-0 rounded-4">
<div className="card shadow border-0 rounded-4">
<div className="card-header bg-dark text-white fw-bold">
    Users List ({filteredUsers.length})
</div>

  <div className="card-body table-responsive p-0">
    <table className="table table-hover align-middle text-center mb-0">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Job Title</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {currentUsers.length > 0 ? (
          currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>

              <td>
                {user.fname} {user.lname}
              </td>

              <td>{user.email}</td>

              <td>{user.job_title}</td>

              <td>
                {user.status?.toLowerCase() === "active" ? (
                  <span className="badge bg-success px-3 py-2">
                    Active
                  </span>
                ) : (
                  <span className="badge bg-danger px-3 py-2">
                    Inactive
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="py-4 text-muted">
              No Users Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

</div>


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
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>
  </div>
</div>


</div>





  
  );
}

export default Home;