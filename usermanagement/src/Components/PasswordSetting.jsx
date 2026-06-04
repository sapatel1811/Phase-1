import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PasswordSetting() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //password validation function
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "currentPassword":
        if (!value.trim()) {
          error = "Current password is required";
        }
        break;

      case "newPassword":
        if (!value) {
          error = "Please enter your password";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value)) {
          error =
            "Password must contain at least 6 characters, including uppercase, lowercase, and a number";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== passwords.newPassword) {
          error = "Passwords do not match. Please try again.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  //validation code ..
  const validate = () => {
    let newErrors = {};

    if (!passwords.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwords.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(
        passwords.newPassword,
      )
    ) {
      newErrors.newPassword =
        "Must contain uppercase, lowercase, number and special character";
    }

    if (!passwords.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Confirm password does not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //   const handleChange = (e) => {
  //     setPasswords({
  //       ...passwords,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  // validation change handle function...
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedPasswords = {
      ...passwords,
      [name]: value,
    };

    setPasswords(updatedPasswords);

    let newErrors = {
      ...errors,
      [name]: validateField(name, value),
    };

    if (name === "newPassword" || name === "confirmPassword") {
      if (
        updatedPasswords.confirmPassword &&
        updatedPasswords.confirmPassword !== updatedPasswords.newPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match. Please try again.";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    setErrors(newErrors);
  };

  const updatePassword = async () => {
    if (!validate()) return;

    if (passwords.currentPassword !== currentUser.password) {
      toast.error("Current password is incorrect");
      return;
    }

    try {
      const updatedUser = {
        ...currentUser,
        password: passwords.newPassword,
      };

      await axios.put(
        `http://192.168.1.117:3000/login/${currentUser.id}`,
        updatedUser,
      );

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      toast.success("Password updated successfully");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword();
        }}
      >
        <div className="mb-3">
          <label>Current Password</label>

          <div className="input-group">
            <input
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              className={`form-control ${
                errors.currentPassword ? "is-invalid" : ""
              }`}
              value={passwords.currentPassword}
              onChange={handleChange}
              maxLength={16}
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  current: !showPassword.current,
                })
              }
            >
              <i
                className={`bi ${
                  showPassword.current ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>

          <small className="text-danger">{errors.currentPassword}</small>
        </div>

        <div className="mb-3">
          <label>New Password</label>

          <div className="input-group">
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              className={`form-control ${
                errors.newPassword ? "is-invalid" : ""
              }`}
              value={passwords.newPassword}
              onChange={handleChange}
              maxLength={16}
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  new: !showPassword.new,
                })
              }
            >
              <i
                className={`bi ${showPassword.new ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>

          <small className="text-danger">{errors.newPassword}</small>
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>

          <div className="input-group">
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              value={passwords.confirmPassword}
              onChange={handleChange}
              maxLength={16}
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowPassword({
                  ...showPassword,
                  confirm: !showPassword.confirm,
                })
              }
            >
              <i
                className={`bi ${
                  showPassword.confirm ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>

          <small className="text-danger">{errors.confirmPassword}</small>
        </div>

        <button
          type="submit"
          className="btn me-2 text-white"
          style={{
            backgroundColor: "#ff6600",
            borderColor: "#973e03",
          }}
        >
          Update Password
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </>
  );
}

export default PasswordSetting;
