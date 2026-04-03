import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

function ManageCustomer() {

  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user");
      setUsers(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      toast.success("User Deleted Successfully");
      getData();
    } catch (error) {
      console.log("Delete Error:", error);
      toast.error("Delete Failed");
    }
  };

  const statusChange = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`);

      let newStatus = res.data.status === "Unblock" ? "Block" : "Unblock";

      await axios.patch(`http://localhost:3000/user/${id}`, {
        status: newStatus
      });

      swal("Success!", `User ${newStatus} Successfully!`, "success");
      getData();

    } catch (error) {
      console.log("Status Error:", error);
      toast.error("Status Change Failed");
    }
  };

  return (
    <div className="featured section">
      <div className="container">
        <div className="row">

          <div className="col-lg-12">
            <div className="section-heading">
              <h6>| Customer</h6>
              <h2>Manage Customer</h2>
            </div>

            <div className="container mt-3">

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((value) => (
                      <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.mobile}</td>
                        <td>{value.status}</td>

                        <td className="text-center">
                          <button
                            onClick={() => deleteData(value.id)}
                            className="btn btn-danger me-1"
                          >
                            Delete
                          </button>

                          <button className="btn btn-primary me-1">
                            Edit
                          </button>

                          <button
                            className="btn btn-success me-1"
                            onClick={() => statusChange(value.id)}
                          >
                            {value.status === "Unblock" ? "Block" : "Unblock"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Users Found
                      </td>
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

export default ManageCustomer;