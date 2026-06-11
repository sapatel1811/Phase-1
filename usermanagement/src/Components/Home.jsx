
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
  console.log("First User:", users[0]);


  // Counts yahan rakhein
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "inactive"
  ).length;



// // active and inactive .....
// const activeUsers = users.filter(
//   (user) => user.status === "active"
// ).length;

// const inactiveUsers = users.filter(
//   (user) => user.status === "inactive"
// ).length;



  return (

    <div>

      <h2 className="fw-bold mb-4">Dashboard Overview</h2>

      <div className="row g-4">

  {/* Total Users */}
  <div className="col-md-4">
    <div
      className="card border-0 shadow-lg rounded-4"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
        color: "#fff",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-4">
        <div>
          <h6 className="mb-2 text-light">Total Users</h6>
         <h2 className="fw-bold mb-0">{totalUsers}</h2>
        </div>
        <i className="bi bi-people-fill fs-1 opacity-75"></i>
      </div>
    </div>
  </div>

  {/* Active Users */}
  <div className="col-md-4">
    <div
      className="card border-0 shadow-lg rounded-4"
      style={{
        background: "linear-gradient(135deg, #16a34a, #22c55e)",
        color: "#fff",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-4">
        <div>
          <h6 className="mb-2 text-light">Active Users</h6>
          <h2 className="fw-bold mb-0">{activeUsers}</h2>
        </div>
        <i className="bi bi-person-check-fill fs-1 opacity-75"></i>
      </div>
    </div>
  </div>

  {/* Inactive Users */}
  <div className="col-md-4">
    <div
      className="card border-0 shadow-lg rounded-4"
      style={{
        background: "linear-gradient(135deg, #dc2626, #ef4444)",
        color: "#fff",
      }}
    >
      <div className="card-body d-flex justify-content-between align-items-center p-4">
        <div>
          <h6 className="mb-2 text-light">Inactive Users</h6>
          <h2 className="fw-bold mb-0">{inactiveUsers}</h2>        
          </div>
        <i className="bi bi-person-x-fill fs-1 opacity-75"></i>
      </div>
    </div>
  </div>
  
</div>

</div>

    
  );
}

export default Home;