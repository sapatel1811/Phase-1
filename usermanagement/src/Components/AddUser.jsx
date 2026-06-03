import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// for pre build state option
import { State } from "country-state-city";

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
};

function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(initialValue);

  // ORIGINAL USER DATA
  const [originalUser, setOriginalUser] = useState(initialValue);

  // for state function use
  const usStates = State.getStatesOfCountry("IN");

  const [selected, setSelected] = useState("");

  const [errors, setErrors] = useState({});

  const [registeredEmails, setRegisteredEmails] = useState([]);

  // CHECK FORM CHANGED OR NOT
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

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load user",
        });
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // validation function
  const validateField = (name, value) => {
    let error = "";

    const trimmedValue = value.trim();

    switch (name) {
      case "fname":
      case "lname":
      case "city": {
        if (!trimmedValue) {
          error = " The field is Required";
        } else if (trimmedValue.length < 2 || trimmedValue.length > 15) {
          error = "Must be between 2 and 15 characters.";
        } else if (!/^[A-Za-z ]+$/.test(trimmedValue)) {
          error = "Only letters and spaces allowed.";
        }

        break;
      }

      case "email":
        if (!trimmedValue) {
          error = " Email is Required";
        } else if (
          !/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(
            trimmedValue,
          )
        ) {
          error = "Please enter a valid email";
        } else if (
          registeredEmails.includes(trimmedValue.toLowerCase()) &&
          trimmedValue.toLowerCase() !== user.email.toLowerCase()
        ) {
          error = "Email already exists";
        }

        break;

      case "phone":
        if (!/^[0-9]{10}$/.test(value)) {
          error = "10 digit number required";
        }

        break;

      case "zip_code":
        if (!/^[0-9]{6}$/.test(value)) {
          error = "Zip Code is Required ";
        }

        break;

      case "dob":
        if (!value) {
          error = "Select The DOB";
        }
        break;

      case "state":
        if (!value) {
          error = "Select The State";
        }
        break;

      case "language":
      case "job_title":
        if (!value) {
          error = "Select The Option";
        }

        break;

      default:
        break;
    }

    return error;
  };

  // change handle for form fields
  const onChange = (e) => {
    const { name, value, files } = e.target;

    let fieldValue = value;

    // FILE
    if (files && files[0]) {
      fieldValue = URL.createObjectURL(files[0]);
    }

    setUser({
      ...user,
      [name]: fieldValue,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, fieldValue),
    });
  };

  // SUBMIT
  const submitData = async (e) => {
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
      // edit code
      if (id) {
        await axios.put(`http://192.168.1.117:3000/users/${id}`, user);

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "User Updated Successfully",
          confirmButtonColor: "#0d6efd",
        });
      } else {
        // add user code
        await axios.post("http://192.168.1.117:3000/users", user);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Added Successfully",
          confirmButtonColor: "#0d6efd",
        });
      }

      // reset form data after submit
      setUser(initialValue);

      navigate("/dashboard/all");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-header bg-black text-white">
          <h3 className="mb-0">{id ? "Edit User" : "Add User"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitData}>
            {/* FIRST + LAST */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">First Name</label>

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
                <label className="form-label fw-semibold">Last Name</label>

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
                <label className="form-label fw-semibold">Email</label>

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
                <label className="form-label fw-semibold">Phone</label>

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
                <label className="form-label fw-semibold">City</label>

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
                <label className="form-label fw-semibold">State</label>

                <select
                  className="form-select"
                  name="state"
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);

                    setUser({
                      ...user,
                      state: e.target.value,
                    });
                  }}
                >
                  <option value="">Select State</option>

                  {usStates.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>

                <small className="text-danger">{errors.state}</small>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Zip Code</label>

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
                <label className="form-label fw-semibold">DOB</label>

                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={user.dob}
                  onChange={onChange}
                />

                <small className="text-danger">{errors.dob}</small>
              </div>
            </div>

            {/* LANGUAGE + JOB */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Language</label>

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
                <label className="form-label fw-semibold">Job Title</label>

                <select
                  className="form-select"
                  name="job_title"
                  value={user.job_title}
                  onChange={onChange}
                >
                  <option value="">Select Job</option>

                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Manager</option>
                  <option>Finance & Accounting</option>
                  <option>Human Resources (HR)</option>
                  <option>Product Manager</option>
                </select>

                <small className="text-danger">{errors.job_title}</small>
              </div>
            </div>

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
                      if (e.target.files && e.target.files[0]) {
                        const imageUrl = URL.createObjectURL(e.target.files[0]);

                        setUser({
                          ...user,
                          profile: imageUrl,
                        });
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

            {/* BUTTONS */}
            <div className="d-flex gap-3">
              <button
                type="submit"
                disabled={id && !isChanged}
                className="btn w-50 text-white"
                style={{
                  backgroundColor: "#ff6600",
                  borderColor: "#ff6600",
                  opacity: id && !isChanged ? 0.6 : 1,
                  cursor: id && !isChanged ? "not-allowed" : "pointer",
                }}
              >
                {id ? "Update User" : "Add User"}
              </button>

              <button
                type="button"
                className="btn btn-secondary w-50"
                onClick={() => navigate("/dashboard/all")}
              >
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
