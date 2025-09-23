import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"; // optional custom styles

function Navbar({ user, setUser }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="fas fa-parking me-2"></i>Parking System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/features">
                Features
              </NavLink>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link btn btn-primary text-white ms-lg-3 px-3 py-1 rounded"
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger ms-lg-3 px-3 py-1 rounded"
                    onClick={() => setUser(null)}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
