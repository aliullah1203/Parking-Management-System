import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import parImg from "../../assets/images/parking2.png";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Invalid email or password");
        return;
      }

      // ✅ Save JWT tokens in localStorage (for Dashboard.js)
      localStorage.setItem("token", data.access_token); // add this
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      // ✅ Save user info
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      // ✅ Update parent user state
      setUser(data.user);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
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
          Don’t have an account?{" "}
          <Link to="/register" className="fw-bold text-white">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
