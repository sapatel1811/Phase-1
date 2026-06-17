import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";;


function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    loginPassword: "",
  });

  const [errors, setErrors] = useState({});

const [loginError, setLoginError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);





const validateEmail = (value) => {
  if (!value.trim()) return "Email required";
  return "";
};

const validatePassword = (value) => {
  if (!value.trim()) {
    return "Password required";
  }
  return "";
};


  

  const fetchUser = async (email) => {
    try {
      const res = await axios.get(
        `http://192.168.1.117:3000/login?email=${email}`
      );
      setUserData(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);

    if (name === "email") {
      const err = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: err }));

      if (!err) fetchUser(value);
    }

    if (name === "loginPassword") {
      let err = validatePassword(value);

    
      setErrors((prev) => ({ ...prev, loginPassword: err }));
    }
  };
//=====================================


  const handleLogin = async (e) => {
  e.preventDefault();

  const newErrors = {};

const emailErr = validateEmail(form.email);
const passErr = validatePassword(form.loginPassword);

if (emailErr) {
  newErrors.email = emailErr;
}

if (passErr) {
  newErrors.loginPassword = passErr;
}

setErrors(newErrors);

// Dono blank
if (emailErr && passErr) {
  toast.error("Please fill all required fields");
  return;
}

// Sirf email blank
if (emailErr) {
  toast.error("Email is required");
  return;
}

// Sirf password blank
if (passErr) {
  toast.error("Password is required");
  return;
}
  // Wrong credentials
  if (!userData || form.loginPassword !== userData.password) {
    setErrors({
      loginPassword: "",
    });

    toast.error("Invalid Email or Password");

    setLoginError("Invalid Email or Password");
    return;
  }
setLoginError("");

  // Success
  toast.success("Login successful");

  localStorage.setItem("currentUser", JSON.stringify(userData));

  setTimeout(() => {
    navigate("/dashboard");
  }, 1500);
};

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/035/121/756/small/background-of-bubbles-for-laundry-and-cleaning-concept-vector.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{
          width: "420px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center fw-bold text-primary mb-4">
          Welcome Back
        </h3>


        {loginError && (
  <div className="alert alert-danger py-2 text-center">
    {loginError}
  </div>
)}

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email<span className="text-danger">*</span>
            </label>
            <input
              name="email"
              autoComplete="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <small className="text-danger">{errors.email}</small>
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password<span className="text-danger">*</span>
            </label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="loginPassword"
                autoComplete="current-password"
                className="form-control"
                value={form.loginPassword}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <small className="text-danger">{errors.loginPassword}</small>
          </div>

          {/* BUTTON */}
          <button className="btn btn-primary w-100 fw-bold py-2">
            Login
          </button>
        </form>

        {/* SWITCH */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

  
      </div>
      
    </div>



  );
}

export default Login;