import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PasswordSetting from "./PasswordSetting";
import { State } from "country-state-city";

function ProfileSetting() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const initialState = {
    username: "",
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
    city: "",
    state: "",
    zip_code: "",
    dob: "",
    language: "",
    job_title: "",
    gender: "",
    profile: "",
  };

  const [form, setForm] = useState(initialState);
  const [original, setOriginal] = useState(initialState);

  const usStates = State.getStatesOfCountry("IN");

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (currentUser) {
      const data = {
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        fname: currentUser.fname || "",
        lname: currentUser.lname || "",
        phone: currentUser.phone || "",
        city: currentUser.city || "",
        state: currentUser.state || "",
        zip_code: currentUser.zip_code || "",
        dob: currentUser.dob || "",
        language: currentUser.language || "",
        job_title: currentUser.job_title || "",
        gender: currentUser.gender || "",
        profile: currentUser.profile || "",
      };

      setForm(data);
      setOriginal(data);
    }
  }, []);

  const isChanged = JSON.stringify(form) !== JSON.stringify(original);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `http://192.168.1.117:3000/login/${currentUser.id}`,
        form,
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, ...form }),
      );

      Swal.fire("Success", "Profile Updated", "success");
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Error", "Update Failed", "error");
    }
  };

  const removeImage = () => {
    setForm({ ...form, profile: "" });
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* LEFT SIDEBAR */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="list-group list-group-flush">
              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "profile" ? "active" : ""
                }`}
                style={{
                  backgroundColor: activeTab === "profile" ? "#ff6600" : "",
                  borderColor: activeTab === "profile" ? "#ff6600" : "",
                  color: activeTab === "profile" ? "#fff" : "",
                }}
                onClick={() => setActiveTab("profile")}
              >
                Profile Settings
              </button>

              <button
                className={`list-group-item list-group-item-action ${
                  activeTab === "password" ? "active" : ""
                }`}
                style={{
                  backgroundColor: activeTab === "password" ? "#ff6600" : "",
                  borderColor: activeTab === "password" ? "#ff6600" : "",
                  color: activeTab === "password" ? "#fff" : "",
                }}
                onClick={() => setActiveTab("password")}
              >
                Password
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-md-9">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              {activeTab === "profile" && (
                <>
                  {/* <div>
                    <h4>Password Settings</h4>

                    <input
                      type="password"
                      placeholder="Current Password"
                      className="form-control mb-3"
                    />

                    <input
                      type="password"
                      placeholder="New Password"
                      className="form-control mb-3"
                    />

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control mb-3"
                    />

                    <button className="btn btn-primary">Update Password</button>
                  </div> */}

                  {/* PROFILE SECTION */}
                  <div className="d-flex align-items-center gap-4 mb-5 flex-wrap">
                    <div className="position-relative">
                      <img
                        src={
                          form.profile ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt=""
                        width="120"
                        height="120"
                        className="rounded-circle border"
                        style={{
                          objectFit: "cover",
                        }}
                      />

                      {/* <button
                        className="btn btn-primary rounded-circle position-absolute"
                        style={{
                          width: "40px",
                          height: "40px",
                          bottom: "0",
                          right: "0",
                        }}
                        onClick={() => fileRef.current.click()}
                      >
                        📷
                      </button> */}
                    </div>

                    <div>
                      <button
                        className="btn text-white me-2"
                        style={{
                          backgroundColor: "#ff6600",
                          borderColor: "#973e03",
                        }}
                        onClick={() => fileRef.current.click()}
                      >
                        Upload New
                      </button>

                      <button
                        className="btn btn-light border"
                        onClick={removeImage}
                      >
                        Delete Avatar
                      </button>
                    </div>

                    <input
                      type="file"
                      hidden
                      ref={fileRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file) {
                          setForm({
                            ...form,
                            profile: URL.createObjectURL(file),
                          });
                        }
                      }}
                    />
                  </div>

                  {/* FORM */}

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        First Name
                      </label>

                      <input
                        type="text"
                        name="fname"
                        value={form.fname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Email</label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="example@gmail.com"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        Mobile Number
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="0806 123 7890"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Gender</label>

                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select Gender</option>

                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        Job Title
                      </label>

                      <select
                        name="job_title"
                        value={form.job_title}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select Job</option>

                        <option>Developer</option>
                        <option>Designer</option>
                        <option>Manager</option>
                        <option>Finance & Accounting</option>
                        <option>Human Resources (HR)</option>
                        <option>Product Manager</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">City</label>

                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">State</label>

                      <select
                        className="form-select"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                      >
                        <option value="">Select State</option>

                        {usStates.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Zip Code</label>

                      <input
                        type="text"
                        name="zip_code"
                        value={form.zip_code}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">
                        Date Of Birth
                      </label>

                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Language</label>

                      <select
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select Language</option>

                        <option>English</option>
                        <option>Hindi</option>
                        <option>Gujarati</option>
                        <option>Tamil</option>
                        <option>Odia (formerly Oriya)</option>
                        <option>Sanskrit</option>
                        <option>Punjabi</option>
                      </select>
                    </div>
                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex gap-2 mt-3">
                    {isChanged && (
                      <button
                        className="btn w-10 text-white"
                        style={{
                          backgroundColor: "#ff6600",
                          borderColor: "#973e03",
                        }}
                        onClick={updateProfile}
                      >
                        Save Changes
                      </button>
                    )}

                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {/* PASSWORD TAB */}
              {activeTab === "password" && <PasswordSetting />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
