import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // use show password ke liye
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // validation function
  const validate = () => {
    if (!form.username) {
      Swal.fire("Error", "Username required", "error");
      return false;
    }

    if (!form.email) {
      Swal.fire("Error", "Email required", "error");
      return false;
    }

    if (!form.password) {
      Swal.fire("Error", "Password required", "error");
      return false;
    }

    if (form.password.length < 4) {
      Swal.fire("Error", "Password must be 4+ chars", "error");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return false;
    }

    return true;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SIGNUP → DB.JSON
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const check = await axios.get(
        `http://192.168.1.117:3000/login?email=${form.email}`,
      );

      if (check.data.length > 0) {
        Swal.fire("Error", "User already exists", "error");
        return;
      }

      const newUser = {
        username: form.username,
        email: form.email,
        password: form.password,
      };

      await axios.post("http://192.168.1.117:3000/login", newUser);

      Swal.fire("Success", "Signup Successful", "success");

      setIsLogin(true);

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      Swal.fire("Error", "Server Error", "error");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://192.168.1.117:3000/login?email=${form.email}`,
      );

      const user = res.data[0];

      if (user && user.password === form.password) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        Swal.fire("Good job!", "Login Successful", "success");

        navigate("/dashboard");
      } else {
        Swal.fire("Error", "Invalid Credentials", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server Error", "error");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 p-4">
            {/* HEADER */}
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted small">
                {isLogin
                  ? "Login to continue your journey"
                  : "Signup to get started"}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={isLogin ? handleLogin : handleSignup}>
              {!isLogin && (
                <div className="mb-3">
                  <input
                    className="form-control form-control-lg rounded-3"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
              )}

              <div className="mb-3">
                <input
                  className="form-control form-control-lg rounded-3"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>

              <div className="mb-3">
                <div className="input-group">
                  <input
                    className="form-control form-control-lg rounded-start-3"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-end-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      className="form-control form-control-lg rounded-start-3"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-end-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <i
                        className={`bi ${
                          showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              )}

              <button className="btn btn-primary w-100 py-2 rounded-3 fw-semibold">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>

            {/* SWITCH */}
            <div className="text-center mt-3">
              <small className="text-muted">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </small>
              <br />

              <span
                className="text-primary fw-semibold"
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create Account" : "Login"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
