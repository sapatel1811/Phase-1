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
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
// img select....

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

  const [imageSource, setImageSource] = useState("");
  // const [imageSource, setImageSource] = useState("url");
  // ORIGINAL data cahnge karne ke liye (edit par)

  const [originalUser, setOriginalUser] = useState(initialValue);

  // for state function use
  const usStates = State.getStatesOfCountry("IN");

  const stateOptions = usStates.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Tamil", label: "Tamil" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Sanskrit", label: "Sanskrit" },
  ];

  const joblist = [
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" },
    { value: "Finance & Accounting", label: "Finance & Accounting" },
    { value: "Human Resources (HR)", label: "Human Resources (HR)" },
    { value: "Product Manager", label: "Product Manager" },
  ];

  const options = [
    { value: "", label: "Select Image Source" },
    { value: "url", label: "Paste Image URL" },
    { value: "file", label: "Upload From Device" },
  ];

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
        // setSelected(res.data.state);
        if (res.data.profile) {
          if (res.data.profile.startsWith("data:")) {
            setImageSource("file");
          } else {
            setImageSource("url");
          }
        }
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
 console.log(newErrors);
    Object.keys(user).forEach((key) => {
      const error = validateField(key, user[key]);

      if (error) {
        newErrors[key] = error;
      }
    });
 console.log(newErrors);
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
    <div className="container-fluid py-2 px-2 px-sm-3">
      {/* Header */}
      <div className="mb-3">
        <h2 className="fw-bold mb-1">{id ? "Edit User" : "Add User"}</h2>

        <small className="text-muted">
          {id
            ? "Update user information and account details"
            : "Create a new user profile and assign details"}
        </small>
      </div>

      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "14px",
        }}
      >
        <div className="card-body p-3">
          <form onSubmit={handleSubmit}>
            {/* FIRST + LAST */}
            <div className="row g-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold">
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

              <div className="col-12 col-md-6 mb-3">
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
            <div className="row g-2">
              <div className="col-12 col-md-6 mb-3">
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

              <div className="col-12 col-md-6 mb-3">
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
            <div className="row g-2">
              <div className="col-12 col-md-6 mb-3">
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

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  State
                  <span className="text-danger">*</span>
                </label>
                <Select
                  options={stateOptions}
                  placeholder="Search or Select State"
                  value={
                    stateOptions.find(
                      (option) => option.value === user.state,
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    setUser({
                      ...user,
                      state: selectedOption?.value || "",
                    });

                    setErrors({
                      ...errors,
                      state: validateField(
                        "state",
                        selectedOption?.value || "",
                      ),
                    });
                  }}
                  isSearchable={true}
                />

                {/* <datalist id="stateList">
  {usStates.map((state) => (
    <option key={state.isoCode} value={state.name} />
  ))}
</datalist> */}

                <small className="text-danger">{errors.state}</small>
              </div>

              <div className="col-12 col-md-6 mb-3">
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

              <div className="col-12 col-md-6 mb-3">
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
                  // dateFormat="YYYY-MM-dd"
                  onChange={onChange}
                />

                <small className="text-danger">{errors.dob}</small>
              </div>
            </div>

            {/* LANGUAGE + JOB */}
            <div className="row g-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Language
                  <span className="text-danger">*</span>
                </label>

                <Select
                  options={languageOptions}
                  placeholder="Select Language"
                  value={
                    languageOptions.find(
                      (option) => option.value === user.language,
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    setUser({
                      ...user,
                      language: selectedOption?.value || "",
                    });

                    setErrors({
                      ...errors,
                      language: validateField(
                        "language",
                        selectedOption?.value || "",
                      ),
                    });
                  }}
                />

                <datalist id="languageList">
                  <option value="English" />
                  <option value="Hindi" />
                  <option value="Gujarati" />
                  <option value="Tamil" />
                  <option value="Punjabi" />
                  <option value="Sanskrit" />
                </datalist>

                <small className="text-danger">{errors.language}</small>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Job Title
                  <span className="text-danger">*</span>
                </label>

                {/* <input
  list="jobList"
  className="form-control"
  value={user.job_title}
  placeholder="Search or Select Job Title"
  onChange={(e) => {
    const value = e.target.value;

    setUser({
      ...user,
      job_title: value,
    });

    setErrors({
      ...errors,
      job_title: validateField("job_title", value),
    });
  }}
/> */}

                <Select
                  options={joblist}
                  placeholder="Select joblist"
                  value={
                    joblist.find((option) => option.value === user.job_title) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    setUser({
                      ...user,
                      job_title: selectedOption?.value || "",
                    });

                    setErrors({
                      ...errors,
                      job_title: validateField(
                        "job_title",
                        selectedOption?.value || "",
                      ),
                    });
                  }}
                />

                <datalist id="job_title">
                  <option value="Full Stack Developer" />
                  <option value="Designer" />
                  <option value="Manager" />
                  <option value="Finance & Accounting" />
                  <option value="Human Resources (HR)" />
                  <option value="Product Manager" />
                </datalist>

                <small className="text-danger">{errors.job_title}</small>
              </div>
            </div>

            {/* active */}
            {/* <div className="col-12 col-md-6 mb-3">
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

            {/* for imge.... */}
            <div
              className="mb-4 p-3 border rounded"
              style={{
                background: "#f8f9fa",
                marginTop: "20px",
              }}
            >
              <label className="form-label fw-semibold">Profile Image</label>

              <small className="d-block text-secondary mb-3">
                Select image source
              </small>

              {/* DROPDOWN */}
{/* <div className="row justify-content-start">
  <div className="col-12 col-sm-10 col-md-8 col-lg-6">
    <select
      className="form-select w-100"
      value={imageSource}
      onChange={(e) => {
        setImageSource(e.target.value);

        setUser((prev) => ({
          ...prev,
          profile: "",
        }));
      }}
    >
      <option value="">Select Image Source</option>
      <option value="url">Paste Image URL</option>
      <option value="file">Upload From Device</option>
    </select>
  </div>
</div> */}

              <Select
                options={options}
                value={options.find((opt) => opt.value === imageSource)}
                onChange={(selected) => {
                  setImageSource(selected.value);

                  setUser((prev) => ({
                    ...prev,
                    profile: "",
                  }));
                }}
                isSearchable={false}
              />

              {/* URL INPUT */}
              {imageSource === "url" && (
                <div className="row mt-3">
                  <div className="col-12 col-md-8 col-lg-6">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Paste Image URL"
                      value={
                        user.profile?.startsWith("data:")
                          ? ""
                          : user.profile || ""
                      }
                      onChange={(e) => {
                        setUser({
                          ...user,
                          profile: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              )}

              {/* FILE INPUT */}
              {imageSource === "file" && (
                <div className="row mt-3">
                  <div className="col-12 col-md-8 col-lg-6">
                    <input
                      type="file"
                      className="form-control w-100"
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
              )}

              {/* PREVIEW */}
              {user.profile && imageSource && (
                <div className="mt-3 text-center">
                  <img
                    src={user.profile}
                    alt="profile"
                    className="rounded-circle border shadow-sm"
                    style={{
                      width: "85px",
                      height: "85px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>

            {id && (
              <div
                className="mb-4 p-3 border rounded"
                style={{
                  background: "#f8f9fa",
                }}
              >
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
            <div className="d-flex flex-column flex-sm-row gap-2 mt-3">
              <button
                type="submit"
                disabled={id && !isChanged}
                className="btn btn-lg text-white"
                style={{
                  backgroundColor: "#ff6600",
                  borderColor: "#973e03",
                  opacity: id && !isChanged ? 0.6 : 1,
                  cursor: id && !isChanged ? "not-allowed" : "pointer",
                  minWidth: "150px",
                  height: "45px",
                }}
              >
                {id ? "Update User" : "Add User"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{
                  minWidth: "120px",
                  height: "45px",
                }}
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
