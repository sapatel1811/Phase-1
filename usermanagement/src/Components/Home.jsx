  import React, { useEffect, useState } from "react";
  import axios from "axios";


  function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      loadUsers();
    }, []);


    // const loadUsers = async () => {
    //   const res = await axios.get("http://192.168.1.117:3000/users");
    //   // setUsers(res.data);
    //   setUsers([...res.data].reverse());
    // };

    const loadUsers = async () => {
  try {
    const res = await axios.get(
      "http://192.168.1.117:3000/users"
    );

    setUsers([...res.data].reverse());
  } catch (error) {
    console.log(error);
  }
};


    // COUNTS....
    // const totalUsers = users.length;   // total user yha list se aye hy
    // const activeUsersList = users.filter(
    //   (u) => u.status?.toLowerCase() === "active"  // ? and lowercase : ye user active hy ya nahi batata hy
    // );
    // const inactiveUsersList = users.filter(
    //   (u) => u.status?.toLowerCase() === "inactive" // ye user kitne user inactive hy batata hy .
    // );

    const activeUsersList = users.filter(
    (u) => u.status?.toLowerCase().trim() === "active"
  );
  const inactiveUsersList = users.filter(
    (u) => u.status?.toLowerCase().trim() === "inactive"
  );
  const totalUsers = users.length;


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
  <div className="container-fluid px-2 px-sm-3 px-md-4 py-2 pb-4">
  <h2 className="fw-bold mb-4 fs-3 fs-md-2">
  Dashboard Overview
</h2>


    {/* ================= CARDS ================= */}
<div className="row g-3 g-md-4 mb-4">

  {/* Total Users */}
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card border-0 shadow-lg rounded-4 bg-primary-subtle text-primary h-100">
      <div className="card-body d-flex justify-content-between align-items-center p-3 p-md-4">
        <div>
          <h6 className="mb-1">Total Users</h6>
          <h2 className="fw-bold mb-0">{totalUsers}</h2>
        </div>

        <i className="bi bi-people-fill fs-2 fs-md-1 opacity-75"></i>
      </div>
    </div>
  </div>

  {/* Active Users */}
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card border-0 shadow-lg rounded-4 bg-success-subtle text-success h-100">
      <div className="card-body d-flex justify-content-between align-items-center p-3 p-md-4">
        <div>
          <h6 className="mb-1">Active Users</h6>
          <h2 className="fw-bold mb-0">{activeUsersList.length}</h2>
        </div>

        <i className="bi bi-person-check-fill fs-2 fs-md-1 opacity-75"></i>
      </div>
    </div>
  </div>

  {/* Inactive Users */}
  <div className="col-12 col-sm-6 col-lg-4">
    <div className="card border-0 shadow-lg rounded-4 bg-danger-subtle text-danger h-100">
      <div className="card-body d-flex justify-content-between align-items-center p-3 p-md-4">
        <div>
          <h6 className="mb-1">Inactive Users</h6>
          <h2 className="fw-bold mb-0">{inactiveUsersList.length}</h2>
        </div>

        <i className="bi bi-person-x-fill fs-2 fs-md-1 opacity-75"></i>
      </div>
    </div>
  </div>

</div>


        {/* serch user ke liye  */}
        <div className="row g-3 mb-4">
  <div className="col-12 col-md-8 col-lg-6">
    <div className="position-relative">

      <i
        className="bi bi-search position-absolute"
        style={{
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#6c757d",
        }}
      />

      <input
        type="text"
        className="form-control form-control-lg ps-5 pe-5"
        placeholder="Search users..."
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
            fontSize: "18px",
          }}
          onClick={() => {
            setSearch("");
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  </div>
</div>

      
          

   {/* table card            */}
<div className="card shadow border-0 rounded-4 overflow-hidden">
  <div className="card-header bg-dark text-white fw-bold">
    Users List
  </div>

  <div className="card-body p-0">

    <div className="table-responsive">

      <table className="table table-hover align-middle text-center text-nowrap mb-0">

        <thead className="table-light">
          <tr>
            <th>S.No</th>
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
                    <span className="badge bg-success px-2 px-md-3 py-2">
                      Active
                    </span>
                  ) : (
                    <span className="badge bg-danger px-2 px-md-3 py-2">
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="py-5 text-muted fw-semibold"
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



          {/* </div> */}


       




<div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-3">

  <span className="text-muted text-center text-md-start">
    Showing {currentUsers.length} of {filteredUsers.length} users
  </span>

  <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">

    <button
      className="btn btn-outline-secondary"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </button>

    <span className="fw-bold">
      {currentPage} / {totalPages}
    </span>

    <button
      className="btn btn-outline-secondary"
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