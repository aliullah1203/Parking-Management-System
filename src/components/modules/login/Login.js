import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import parImg from "../../assets/images/parking2.png";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      (email === "aliullah0301@gmail.com" ||
        email === "aliullah15555@gmail.com") &&
      password === "aliullah"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", email);
      setUser(email);
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${parImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-card shadow">
        <h2 className="text-center mb-3">Welcome Back</h2>
        <p className="text-center text-white mb-4">
          Sign in to access your dashboard
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="text-white">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>

        <p className="text-center text-white">
          Don't have an account?{" "}
          <Link to="/register" className="fw-bold text-white">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
