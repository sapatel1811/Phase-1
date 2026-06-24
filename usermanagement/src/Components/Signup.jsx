import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast,} from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    signupPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (name, value, formData) => {
    switch (name) {
      case "username":
        if (!value) return "Username is required";
        if (value.length < 3) return "Min 3 characters required";
        return "";

      case "email":
        if (!value) return "Email adress is required";
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
          return "Please Enter a valid email (example@gmail.com)    ";
        return "";

      case "signupPassword":
        if (!value) return "Password is required";
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value))
          return "Use uppercase, lowercase, number & symbol";
        return "";

      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value !== formData.signupPassword) return "Passwords do not match";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value, updated),
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validate(key, form[key], form);
      if (err) newErrors[key] = err;
    });

    // js me kisi object ki sari key ko arry ke form me return karta hy 
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const check = await axios.get(
        `http://192.168.1.117:3000/login?email=${form.email}`
      );

      if (check.data.length > 0) {
        toast.error("User already exists");
        return;
      }

      await axios.post("http://192.168.1.117:3000/login", {
        username: form.username,
        email: form.email,
        password: form.signupPassword,
      });

      toast.success("Signup successful");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error("Server error");
    }


  };

  return (
    <div
      className="container-fluid px-3 d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/035/121/756/small/background-of-bubbles-for-laundry-and-cleaning-concept-vector.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
maxWidth: "420px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h3 className="text-center fw-bold text-primary mb-4">
          Create Account
        </h3>

        <form onSubmit={handleSignup}>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Username<span className="text-danger">*</span>
            </label>
            <input
              name="username"
              className="form-control"
              placeholder="Enter username"
              autoComplete="username"
              onChange={handleChange}
            />
            <small className="text-danger">{errors.username}</small>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email<span className="text-danger">*</span>
            </label>
            <input
              name="email"
              className="form-control"
              placeholder="Enter email"
              autoComplete="username"
              onChange={handleChange}
            />
            <small className="text-danger">{errors.email}</small>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password<span className="text-danger">*</span>
            </label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="signupPassword"
                className="form-control"
                placeholder="Enter password"
                autoComplete="new-password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <small className="text-danger">{errors.signupPassword}</small>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Confirm Password<span className="text-danger">*</span>
            </label>

            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                autoComplete="confirm-password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <small className="text-danger">{errors.confirmPassword}</small>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-100 fw-bold py-2">
            Signup
          </button>
        </form>

        <p className="text-center mt-3">
          Already have account?{" "}
          <span
            className="text-primary fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

         {/* <ToastContainer position="top-right" autoClose={2500} theme="colored" /> */}
      </div>
    </div>
  );
}

export default Signup;