import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation Function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*\.)[A-Za-z\d. ]{3,20}$/.test(value)
        ) {
          error =
            "Username must be 3-20 characters and contain at least one letter, one number, and one dot";
        }
        break;

      // email validation ...
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)
        ) {
          error = "Please enter a valid email";
        }
        break;

      // password validation..
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)) {
          error = "Min 6 chars with Uppercase, Lowercase & Number";
        }
        break;

// confirm password validation...
      case "confirmPassword":
        if (!value) {
          error = "Confirm Password is required";
        } else if (value !== form.password) {
          error = "Password and Confirm Password do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // Full Form Validation
  const validateForm = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (isLogin && (key === "username" || key === "confirmPassword")) {
        return;
      }

      const error = validateField(key, form[key]);

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const check = await axios.get(
        `http://192.168.1.117:3000/login?email=${form.email}`,
      );

      if (check.data.length > 0) {
        toast.error("User already exists with this email");
        return;
      }

      await axios.post("http://192.168.1.117:3000/login", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      toast.success("Account Created Successfully");

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setIsLogin(true);
    } catch (err) {
      toast.error("Server Error");
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await axios.get(
        `http://192.168.1.117:3000/login?email=${form.email}`,
      );

      const user = res.data[0];

      if (user && user.password === form.password) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        toast.success(`Welcome ${user.username}`);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  return (
    <>
      <div
        className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/035/121/756/small/background-of-bubbles-for-laundry-and-cleaning-concept-vector.jpg')",
          backgroundFilter: "blur(10px)",
          backgroundSize: "cover",
          // backgroundPosition: "center",
          // width: "100%",
          // height: "100vh",
          position: "relative",
        }}
      >
        <div className="row w-100 justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <p className="text-muted">
                  {isLogin ? "Login to continue" : "Create your account"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={isLogin ? handleLogin : handleSignup}>
                {!isLogin && (
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control form-control-lg"
                      placeholder="Enter Username"
                      value={form.username}
                      onChange={handleChange}
                    />

                    <small className="text-danger">{errors.username}</small>
                  </div>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <small className="text-danger">{errors.email}</small>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter Password"
                      value={form.password}
                      onChange={handleChange}
                      maxlength={16}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {/* {showPassword ? "Hide" : "Show"} */}
                      <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>

                  </div>

                  <small className="text-danger">{errors.password}</small>
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        maxlength={16}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {/* {showConfirmPassword ? "Hide" : "Show"} */}
                        <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>



                    </div>

                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold"
                >
                  {isLogin ? "Login" : "Signup"}
                </button>
              </form>

              {/* Switch */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </small>

                <br />

                <span
                  className="text-primary fw-bold"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setIsLogin(!isLogin);

                    setErrors({
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  {isLogin ? " Create Account" : " Login"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </>
  );
}

export default Login;
