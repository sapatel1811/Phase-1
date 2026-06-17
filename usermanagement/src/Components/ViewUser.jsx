import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.1.117:3000/users/${id}`)
      .then((res) => setUser(res.data));
  }, [id]);

  if (!user) return <h2> ... </h2>;

  return (
    <>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <h2 className="fw-bold m-0">View User</h2>

        <button
          className="btn text-white px-4 shadow-sm align-self-start align-self-sm-center"
          style={{
            backgroundColor: "#ff6600",
            borderColor: "#973e03",
          }}
          onClick={() => navigate(-1)}
        >
          <i className="align-self-start align-self-sm-center"></i>
          Go Back
        </button>
      </div>

      <div className="card border rounded-3 p-4">
        <div className="row">
          {/* Left Side */}
          <div className="col-md-4 text-center ">
            <img
              src={user.profile || "https://placehold.co/150"}
              alt="profile"
              width="140"
              height="140"
              className="rounded-circle border mb-3"
              style={{ objectFit: "cover" }}
            />

            <h3 className="fw-bold">
              {user.fname} {user.lname}
            </h3>

            <span className="badge bg-primary px-3 py-2 mt-2">
              {user.job_title}
            </span>
          </div>

          {/* Right Side */}
          <div className="col-md-8 ps-md-4">
            <div className="row g-4">
              {/* Email */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-envelope-fill me-2"></i>Email
                </small>
                <div className="fw-semibold">{user.email}</div>
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-telephone-fill me-2"></i>Phone
                </small>
                <div className="fw-semibold">{user.phone}</div>
              </div>

              {/* City */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-geo-alt-fill me-2"></i>City
                </small>
                <div className="fw-semibold">{user.city}</div>
              </div>

              {/* State */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-map-fill me-2"></i>State
                </small>
                <div className="fw-semibold">{user.state}</div>
              </div>

              {/* Zip Code */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-mailbox me-2"></i>Zip Code
                </small>
                <div className="fw-semibold">{user.zip_code}</div>
              </div>

              {/* DOB */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-calendar-event me-2"></i>Date of Birth
                </small>
                <div className="fw-semibold">{user.dob}</div>
              </div>

              {/* Language */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-translate me-2"></i>Language
                </small>
                <div className="fw-semibold">{user.language}</div>
              </div>

              {/* Job Title */}
              <div className="col-md-6">
                <small className="text-muted">
                  <i className="bi bi-briefcase-fill me-2"></i>Job Title
                </small>
                <div className="fw-semibold">{user.job_title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
