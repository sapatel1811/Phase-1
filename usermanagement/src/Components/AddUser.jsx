import React, { useEffect, useState } from "react";
//useeffect : api call and side effect dur karne ke liye
//usestate : state manage karne ke liye

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
//usenavigate : redirect karne ke liye
//useparms : url se id lene ke liye

import axios from "axios";
// axios: api call karane ke liye

// for pre build state option
import { State } from "country-state-city";
import "react-toastify/dist/ReactToastify.css";

// initial value : form reset karne ke liye and state initialize karne ke liye ,
// form ke sare fields ka initial value ek object me store kar liya hai ,
// taki form reset karne me asani ho aur state initialize karne me bhi asani ho .
const initialValue = {
  id: "",
  fname: "",
  lname: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip_code: "",
  dob: "",
  country: "",
  language: "",
  job_title: "",
  profile: "",
  status: "active",
};

// Field names mapping for validation error messages
const fieldNames = {
  fname: "First Name",
  lname: "Last Name",
  city: "City",
  email: "Email",
  phone: "Phone",
  zip_code: "ZIP Code",
  dob: "Date of Birth",
  state: "State",
  language: "Language",
  job_title: "Job Title",
  status: "Status",
};

function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  //form ka sara data store karne ke liye state bnaya hy..
  //user = current value , setuser = function update karne ke liye ,
  // initialvalue = user state ka initial value , jo ki ek object hai jisme form ke sare fields ka initial value store hai .
  const [user, setUser] = useState(initialValue);

  // ORIGINAL data cahnge karne ke liye (edit par)
  const [originalUser, setOriginalUser] = useState(initialValue);

  // for state function use
  const usStates = State.getStatesOfCountry("IN");
  const [selected, setSelected] = useState("");
  const [errors, setErrors] = useState({});
  const [registeredEmails, setRegisteredEmails] = useState([]);

  // check karna ki user data or orignal data same hy ya
  const isChanged = JSON.stringify(user) !== JSON.stringify(originalUser);

  // single user data load for edit ke liye
  useEffect(() => {
    // fetch all users to build registered emails list
    const fetchAll = async () => {
      try {
        const resp = await axios.get("http://192.168.1.117:3000/users");
        const emails = resp.data.map((u) => (u.email || "").toLowerCase());
        setRegisteredEmails(emails);
      } catch (err) {
        console.log("Failed to fetch users for email check", err);
      }
    };

    fetchAll();
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://192.168.1.117:3000/users/${id}`);
        setUser(res.data);
        // SAVE ORIGINAL DATA
        setOriginalUser(res.data);
        setSelected(res.data.state);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load user");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // validation function
  const validateField = (name, value) => {
    let error = "";

    const trimmedValue = value ? value.toString().trim() : "";

    switch (name) {
      case "fname":
      case "lname":
      case "city":
        if (!trimmedValue) {
          error = `${fieldNames[name]} is required.`;
        } else if (trimmedValue.length < 2 || trimmedValue.length > 15) {
          error = `${fieldNames[name]} must be between 2 and 15 characters.`;
        } else if (!/^[A-Za-z ]+$/.test(trimmedValue)) {
          error = `${fieldNames[name]} can only contain letters and spaces.`;
        }
        break;

      case "email":
        if (!trimmedValue) {
          error = " Email address is Required";
        } else if (
          !/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(
            trimmedValue,
          )
        ) {
          error = "Please enter a valid email address.";
        } else if (
          registeredEmails.includes(trimmedValue.toLowerCase()) &&
          trimmedValue.toLowerCase() !== user.email.toLowerCase()
        ) {
          error = "This email address is already registered.";
        }

        break;







      case "phone":
        if (!value) {
          error = "Phone number is required.";
        } else if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;

      case "zip_code":
        if (!value) {
          error = "Zip code is required.";
        } else if (!/^[0-9]{6}$/.test(value)) {
          error = "Zip code must be exactly 6 digits.";
        }
        break;

      case "dob":
        if (!value) {
          error = "Please select your date of birth.";
        } else if (value >= new Date().toISOString().split("T")[0]) {
          error = "DOB must be select a past date.";
        }
        break;

      case "state":
        if (!value) {
          error = "Please select a state.";
        }
        break;

      // language  +  job tittle
      case "language":
        if (!value) {
          error = "Please select a language.";
        }
        break;

      case "job_title":
        if (!value) {
          error = "Please select a job title.";
        }
        break;

      default:
        break;

      // extra
      case "status":
        if (!value) {
          error = "Please select status.";
        }
        break;
    }

    return error;
  };

  // change handle for form fields
  const onChange = (e) => {
    const { name, value, files } = e.target;

    let fieldValue = value;

    // FILE  of validation
    if (files && files[0]) {
      fieldValue = URL.createObjectURL(files[0]);
    }
    // other fild validation ke liye
    setUser({
      ...user, // spred oprator =  current value copy karta hy taki baki filds ka data lose na ho .
      [name]: fieldValue,
    });

    //validation ke liye error state update karne ke liye
    setErrors({
      ...errors,
      [name]: validateField(name, fieldValue),
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]);

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      if (id) {
        await axios.put(`http://192.168.1.117:3000/users/${id}`, user);

        toast.success("User Updated Successfully");
      } else {
        await axios.post("http://192.168.1.117:3000/users", user);

        toast.success("User Added Successfully");
      }

      setUser(initialValue);

      // setTimeout(() => {
      navigate("/dashboard/all");
      // }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container py-1 pb-4">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
        <h2 className="fw-bold m-0">{id ? "Edit User" : "Add User"}</h2>
      </div>

      <div className="card shadow ">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* FIRST + LAST */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold ">
                  First Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  value={user.fname}
                  onChange={onChange}
                  placeholder="Enter First Name"
                  maxLength={15}
                />
                <small className="text-danger">{errors.fname}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Last Name
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  value={user.lname}
                  onChange={onChange}
                  placeholder="Enter Last Name"
                  maxLength={15}
                />

                <small className="text-danger">{errors.lname}</small>
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Email
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  placeholder="Enter Email"
                />

                <small className="text-danger">{errors.email}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Phone
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setUser({
                      ...user,
                      phone: value,
                    });

                    setErrors({
                      ...errors,
                      phone: validateField("phone", value),
                    });
                  }}
                  placeholder="Enter Phone Number"
                  maxLength={10}
                />

                <small className="text-danger">{errors.phone}</small>
              </div>
            </div>

            {/* CITY STATE ZIP + DOB */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  City
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={user.city}
                  onChange={onChange}
                  placeholder="Enter City"
                  maxLength={15}
                />

                <small className="text-danger">{errors.city}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  State
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="state"
                  value={selected}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelected(value);

                    setUser({
                      ...user,
                      state: value,
                    });

                    setErrors({
                      ...errors,
                      state: validateField("state", value),
                    });
                  }}
                >
                  <option value="">Select State</option>
                  ``
                  {usStates.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <small className="text-danger">{errors.state}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Zip Code
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="zip_code"
                  value={user.zip_code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setUser({
                      ...user,
                      zip_code: value,
                    });

                    setErrors({
                      ...errors,
                      zip_code: validateField("zip_code", value),
                    });
                  }}
                  placeholder="Enter Zip Code"
                  maxLength={6}
                />

                <small className="text-danger">{errors.zip_code}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  DOB
                  <span className="text-danger">*</span>
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={user.dob}
                  max={new Date().toISOString().split("T")[0]}
                  dateFormat="YYYY-MM-dd"
                  onChange={onChange}
                />

                <small className="text-danger">{errors.dob}</small>
              </div>
            </div>

            {/* LANGUAGE + JOB */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Language
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="language"
                  value={user.language}
                  onChange={onChange}
                >
                  <option value="">Select Language</option>

                  <option>English</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                  <option>Tamil</option>
                  <option>Odia (formerly Oriya)</option>
                  <option>Tamil</option>
                  <option>Sanskrit</option>
                  <option>Punjabi</option>
                </select>

                <small className="text-danger">{errors.language}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Job Title
                  <span className="text-danger">*</span>
                </label>

                <select
                  className="form-select"
                  name="job_title"
                  value={user.job_title}
                  onChange={onChange}
                >
                  <option value="">Select Job</option>

                  <option>Full Stack Developer</option>
                  <option>Designer</option>
                  <option>Manager</option>
                  <option>Finance & Accounting</option>
                  <option>Human Resources (HR)</option>
                  <option>Product Manager</option>
                </select>

                <small className="text-danger">{errors.job_title}</small>
              </div>
            </div>

            {/* active */}
            {/* <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">
          Status
         </label>


         <select
           className="form-select"
           name="status"
           value={user.status}
          onChange={onChange}
          >
          <option value="active">Active</option>
         <option value="inactive">Inactive</option>
         </select>
</div> */}

            {/* PROFILE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Profile Image</label>

              <div className="row">
                {/* URL INPUT */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="profile"
                    placeholder="Paste Image URL"
                    value={user.profile.startsWith("blob:") ? "" : user.profile}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        profile: e.target.value,
                      });
                    }}
                  />
                </div>

                {/* FILE INPUT */}
                <div className="col-md-6">
                  <input
                    type="file"
                    className="form-control"
                    name="profile"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if (file) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                          setUser((prev) => ({
                            ...prev,
                            profile: reader.result,
                          }));
                        };

                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* IMAGE PREVIEW */}
              {user.profile && (
                <img
                  src={user.profile}
                  alt="profile"
                  width="120"
                  className="mt-3 rounded border"
                />
              )}
            </div>

            {id && (
              <div className="mb-4">
                <label className="form-label fw-semibold d-block">
                  User Status
                </label>

                <div
                  onClick={() =>
                    setUser({
                      ...user,
                      status: user.status === "active" ? "inactive" : "active",
                    })
                  }
                  style={{
                    width: "55px",
                    height: "28px",
                    borderRadius: "20px",
                    background:
                      user.status === "active" ? "#22c55e" : "#dc3545",
                    position: "relative",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#fff",
                      position: "absolute",
                      top: "2px",
                      left: user.status === "active" ? "29px" : "2px",
                      transition: "0.3s",
                    }}
                  />
                </div>

                <small
                  className={`fw-bold ${
                    user.status === "active" ? "text-success" : "text-danger"
                  }`}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </small>
              </div>
            )}

            {/* BUTTONS */}
            <div className="d-flex gap-3">
              <button
                type="submit"
                disabled={id && !isChanged}
                className="btn w-70 text-white"
                style={{
                  backgroundColor: "#ff6600",
                  borderColor: "#973e03",
                  opacity: id && !isChanged ? 0.6 : 1,
                  cursor: id && !isChanged ? "not-allowed" : "pointer",
                }}
              >
                {/* <i className={`bi ${ id ? "bi-pencil-square" : "bi-person-plus-fill"  } me-2`}></i> */}
                {id ? "Update User" : "Add User"}
              </button>

              <button
                type="button"
                className="btn w-70 btn-secondary "
                onClick={() => navigate("/dashboard/all")}
              >
                <i className="bi bi-x-circle-fill me-2"></i>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
