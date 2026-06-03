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
    <div className="container " style={{ maxWidth: "700px" }}>
      {/* Back Button */}
      <div
        className="max-auto mb-3"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <button
          className="btn btn-outline-secondary btn-sm px-2 shadow-sm "
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>

      {/* Main Card */}
      <div
        className="card shadow-sm border-0 mx-auto"
        style={{ maxWidth: "900px" }}
      >
        <div className="p-4">
          <div className="d-flex align-items-center gap-4 flex-wrap">
            {/* User Image */}
            {/* <img
          src={user.
           || "https://via.placeholder.com/100"}
          alt="profile"
          className="rounded-circle border" 
          width="100"
          height="100"
          style={{ objectFit: "cover" }}
        /> */}

            {/* Bio */}
            <div className="pt-3">
              {/* fw-semibold => fornt-wight (bootstarp provide boldness of text) */}
              {/* <h6 className="fw-semibold">   
          Profile Bio
        </h6>

        <p className="text-muted mb-0">
          {user.profile || "No bio available"}
        </p> */}

              {/* PROFILE */}
              <td>
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt="profile"
                    width="100"
                    height="100"
                    className="rounded-circle border object-fit-cover"
                  />
                ) : (
                  <img
                    src="https://placehold.co/600x400"
                    alt="profile"
                    width="40"
                    height="40"
                    className="rounded-circle border object-fit-cover"
                  />
                )}
              </td>
            </div>

            {/* Basic Info */}
            <div>
              <h3 className="mb-1">
                {user.fname} {user.lname}
              </h3>

              <p className="mb-1 text-dark">{user.job_title || "User"}</p>

              <small>ID: {user.id}</small>
            </div>
          </div>
        </div>

        {/* Bottom Details Section */}
        <div className="card-body p-4">
          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold text-capitalize">Name</span>

            <span>
              {user.fname} {user.lname}
            </span>
          </div>

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">Email</span>

            <span>{user.email}</span>
          </div>

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">Phone</span>

            <span>{user.phone}</span>
          </div>

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">City</span>

            <span>{user.city}</span>
          </div>

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">State</span>

            <span>{user.state}</span>
          </div>

          {/* Row */}
          {/* <div className="d-flex justify-content-between border-bottom py-2">
        <span className="fw-semibold">
          Country
        </span>

        <span>
          {user.country}
        </span>
      </div> */}

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">Language</span>

            <span>{user.language}</span>
          </div>

          {/* Row */}
          <div className="d-flex justify-content-between border-bottom py-2">
            <span className="fw-semibold">Date of Birth</span>

            <span>{user.dob}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
