



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const redirect = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {

    const getData = async () => {
      try {
        const userId = localStorage.getItem('u_id');

        if (!userId) {
          console.log("User ID not found");
          return;
        }

        const res = await axios.get(`http://localhost:3000/user/${userId}`);
        console.log(res.data);
        setUser(res.data);

      } catch (error) {
        console.log("API Error:", error);
      }
    };

    getData();

  }, []);

  return (
    <div>

      {/* Header */}
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb">
                <a href="#">Home</a> / My Profile
              </span>
              <h3>My Profile</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="section best-deal">
        <div className="container">
          <h1 className="mt-3 mb-3">My Account</h1>

          <div className="row">
            <div className="col-lg-6">
              <div className="info-table">
                <ul>
                  <li>ID <span>{user.id || "N/A"}</span></li>
                  <li>Name <span>{user.name || "N/A"}</span></li>
                  <li>Email <span>{user.email || "N/A"}</span></li>
                  <li>Mobile <span>{user.mobile || "N/A"}</span></li>
                  <li>Password <span>{user.password || "N/A"}</span></li>

                  <li>
                  <button className="btn btn-primary"
                      onClick={() => redirect(`/edit_profile/${user.id}`)}
                    >
                      EDIT
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                alt="profile"   
                style={{ width: "100%", maxHeight: "300px" }}
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default UserProfile;