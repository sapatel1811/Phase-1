import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordSetting from "./PasswordSetting";
import { State } from "country-state-city";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // for validation ke liye  8-jun.....
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    zip_code: "",
  });

  // for validation ke liye 8-jun
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
     case "fname":
  if (!value.trim()) {
    error = "First Name is required";
  } else if (!/^[A-Za-z ]+$/.test(value)) {
    error = "Only letters allowed";
  }
  break;

     case "lname":
  if (!value.trim()) {
    error = "Last Name is required";
  } else if (!/^[A-Za-z ]+$/.test(value)) {
    error = "Only letters allowed";
  }
  break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
        ) {
          error = "Enter valid email address";
        }
        break;

     case "phone":
  if (!value.trim()) {
    error = "Mobile Number is required";
  } else if (!/^[6-9]\d{9}$/.test(value)) {
    error = "Enter valid 10 digit Indian mobile number";
  }
  break;

      case "city":
  if (!value.trim()) {
    error = "City is required";
  } else if (!/^[A-Za-z ]+$/.test(value)) {
    error = "Only letters allowed";
  }
  break;

     case "zip_code":
  if (!value.trim()) {
    error = "Zip Code is required";
  } else if (!/^\d{5}$/.test(value)) {
    error = "Zip Code must be exactly 5 digits";
  }
  break;

      default:
        break;
    }

    return error;
  };

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

  // new added handle change 8-jun..
 const handleChange = (e) => {
  const { name } = e.target;
  let value = e.target.value;
  let error = "";

  if (name === "fname" || name === "lname" || name === "city") {
    if (/[^A-Za-z ]/.test(value)) {
      error = "Name can only contain letters, spaces, and standard punctuation.";
    }

    value = value.replace(/[^A-Za-z ]/g, "");
  }

  if (name === "phone") {
    if (/[^0-9]/.test(value)) {
      error = "Only numbers are allowed";
    }

    value = value.replace(/\D/g, "").slice(0, 10);
  }

  if (name === "zip_code") {
    if (/[^0-9]/.test(value)) {
      error = "Please enter a valid number-digit PIN code.";
    }

    value = value.replace(/\D/g, "").slice(0, 5);
  }

  setForm({
    ...form,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: error || validateField(name, value),
  });
};


  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

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

      toast.success("Profile Updated Successfully");
      setTimeout(() => {
      navigate("/dashboard");
      }, 3000);


    } catch (err) {
      toast.error("Update Failed");
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
                    <h4>Password Settings  </h4>

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
                        className={`form-control ${
                          errors.fname ? "is-invalid" : ""
                        }`}
                        placeholder="First Name"
                      />
                      <small className="text-danger">{errors.fname}</small>
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
                        className={`form-control ${
                          errors.lname ? "is-invalid" : ""
                        }`}
                        placeholder="Last Name"
                      />
                      <small className="text-danger">{errors.lname}</small>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label fw-semibold">Email</label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.email ? "is-invalid":""
                        }`}
                        placeholder="example@gmail.com"
                      />
                      <small className="text-danger">{errors.email}</small>
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
                        className={`form-control ${
                          errors.phone ? "is-invalid":""
                        }`}
                        placeholder="0806 123 7890"
                      />
                    
                    <small className="text-danger">{errors.phone}</small>
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
                         className={`form-control ${
                          errors.city ? "is-invalid":""
                        }`}
                        
                      />
                  <small className="text-danger">{errors.city}</small>
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
                        className={`form-control ${
                          errors.zip_code ? "is-invalid":""
                        }`}
                      />
                  <small className="text-danger">{errors.zip_code}</small>
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

                        <option>Hindi</option>
                        <option>English</option>
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
              {/* use for  */}
              <ToastContainer
                position="top-right"
                autoClose={2500}
                theme="colored"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetting;
