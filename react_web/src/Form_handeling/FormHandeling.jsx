


import React, { useState } from "react";

function FormHandeling() {
  const [formvalue, setFormhandel] = useState({
    id: "",
    name: "", 
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const changeHandel = (e) => {
    setFormhandel({
      ...formvalue,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandel = (e) => {
    e.preventDefault();

    if (editId) {
      const updated = data.map((item) =>
        item.id === editId ? { ...formvalue, id: editId } : item
      );
      setData(updated);
      setEditId(null);
    } else {
      const newData = {
        ...formvalue,
        id: new Date().getTime().toString(),
      };
      setData([...data, newData]);
    }

    setFormhandel({ id: "", name: "", email: "", password: "" });
  };

  const deleteHandel = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const editHandel = (item) => {
    setFormhandel(item);
    setEditId(item.id);
  };

  return (
    <div className="d-flex">

      <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px" }}>
        <h4 className="text-center mb-4">Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="/index" className="nav-link text-white">Home</a>
          </li>
          <li className="nav-item mb-2">
            <a href="/users" className="nav-link text-white">Users</a>
          </li>
          <li className="nav-item">
            <a href="/settings" className="nav-link text-white">Settings</a>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1">

        <nav className="navbar navbar-light bg-light shadow-sm px-4">
          <h5 className="mb-0">User Management</h5>
        </nav>

        <div className="container mt-4">

          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white text-center">
              <h5>{editId ? "Update User" : "Add User"}</h5>
            </div>

<div className="card-body">
<form onSubmit={submitHandel}>
<div className="row">
<div className="col-md-4 mb-3">
<input type="text" name="name" value={formvalue.name} onChange={changeHandel}
className="form-control" placeholder="Name" required />
</div>

<div className="col-md-4 mb-3">
<input type="email" name="email" value={formvalue.email} onChange={changeHandel}
className="form-control" placeholder="Email" required />
</div>

<div className="col-md-4 mb-3">
<input type="password" name="password" value={formvalue.password} onChange={changeHandel}
className="form-control" placeholder="Password" required />
</div>
</div>

<button className="btn btn-success w-100"> {editId ? "Update " : "Add "} </button>
</form>
</div>
</div>

          <div className="card shadow">
            <div className="card-header bg-dark text-white text-center">
              <h5>User List</h5>
            </div>

            <div className="card-body">
              <table className="table table-striped table-hover text-center">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>
<button onClick={() => editHandel(item)} className="btn btn-warning btn-sm me-2">
Edit </button>

<button onClick={() => deleteHandel(item.id)} className="btn btn-danger btn-sm">
Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Data Found!!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormHandeling;