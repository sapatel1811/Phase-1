import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




function ProfileEdit() {
  const navigate = useNavigate();


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
  });


  // profile img genretor ....
  const fileInputRef = useRef(null);
  const [originalData, setOriginalData] = useState(null);


  useEffect(() => {
    if (currentUser) {
      const data = {
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        profile: currentUser.profile || "",
      };


      setForm(data);
      setOriginalData(data);
    }
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // CHECK IF ANY CHANGE DONE
  const isChanged =
    originalData && JSON.stringify(form) !== JSON.stringify(originalData);


  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://192.168.1.117:3000/login/${currentUser.id}`,
        form,
      );


      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, ...form }),
      );


      Swal.fire("Success", "Profile Updated Successfully", "success");


      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Error", "Update Failed", "error");
    }
  };


  return (
    <div className="container py-1 pb-4">
     
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow border-3 rounded-6">
            {/* HEADER */}
            <div className="card-header bg-black text-white text-center">
              <h4 className="mb-0">Edit Profile</h4>
            </div>


            <div className="card-body p-4">
              {/* PROFILE IMAGE */}
              {/* <div className="text-center mb-3">
                <img
                  src={
                    form.profile ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="profile"
                  className="rounded-circle border"
                  width="100"
                  height="100"
                />
              </div> */}


              {/* PROFILE IMAGE URL */}
              {/* <div className="mb-3">
                <label className="form-label">Profile Image URL</label>
                <input
                  type="text"
                  name="profile"
                  className="form-control"
                  placeholder="Enter image URL"
                  value={form.profile}
                  onChange={handleChange}
                />
              </div> */}


              <div className="text-center mb-3">
                <img
                  src={
                    form.profile ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400";
                    e.currentTarget.onerror = null;
                  }}
                  alt=""
                  className="rounded-circle border shadow-sm object-fit-cover"
                  width="60"
                  height="60"
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => fileInputRef.current.click()}
                />


                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];


                    if (file) {
                      const reader = new FileReader();


                      reader.onloadend = () => {
                        setForm({
                          ...form,
                          profile: reader.result,
                        });
                      };


                      reader.readAsDataURL(file);
                    }
                  }}
                />


                <p className="text-muted mt-2 mb-0">
                  Click image to change profile photo
                </p>
              </div>


              {/* USERNAME */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>


              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>


              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  autoComplete="password"
                  onChange={handleChange}
                />
              </div>


              {/* BUTTONS */}
              <div className="d-flex gap-2">
                {/* UPDATE BUTTON (ONLY IF CHANGED) */}
                {isChanged && (
                  <button
                    className="btn btn-success w-100"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                )}


                <button
                  className="btn btn-secondary w-100"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProfileEdit;
