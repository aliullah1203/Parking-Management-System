import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import bgImg from "../../assets/images/parking2.png";

function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        ...form,
        phone: form.contact, // map to backend field
      };
      delete payload.contact;

      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      setUser?.(data.user);
      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // 1️⃣ Call your backend to get Google OAuth URL
    window.location.href = "http://localhost:8080/api/oauth/google/login";
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div className="register-card shadow p-4">
        <h2 className="text-center text-white mb-3">Create Account</h2>
        <p className="text-center text-white mb-4">
          Register to book your parking slot
        </p>

        <form onSubmit={handleRegister} className="col-md-10 mx-auto">
          {/* Name */}
          <div className="mb-3">
            <label className="form-label text-white">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label text-white">Contact Number</label>
            <input
              type="tel"
              name="contact"
              className="form-control"
              value={form.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>
        </form>

        <button
          className="btn btn-danger w-100 mb-3"
          onClick={handleGoogleLogin}
        >
          Sign Up with Google
        </button>

        <p className="text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-white fw-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
