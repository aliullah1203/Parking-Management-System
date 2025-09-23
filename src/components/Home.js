import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // optional for extra custom styles
import parImg from "./assets/parking.png";

function Home() {
  return (
    <div className="home-hero">
      {/* Hero Section */}
      <div className="container text-center text-white d-flex flex-column justify-content-center align-items-center hero-content">
        <h1 className="display-4 fw-bold mb-3">Smart Parking Management</h1>
        <p className="lead mb-4">
          Reserve parking slots, manage time efficiently, and pay securely.
        </p>
        <div>
          <Link to="/register" className="btn btn-primary btn-lg me-2">
            Get Started
          </Link>
          <Link to="/features" className="btn btn-outline-light btn-lg">
            Learn More
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="container mt-5 text-center">
        <img
          src={parImg}
          alt="Parking Illustration"
          className="img-fluid rounded shadow-lg"
          style={{
            maxWidth: "800px",
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Info Cards Section */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow h-100">
              <i className="fas fa-car fa-3x mb-3 text-primary"></i>
              <h5>Easy Slot Booking</h5>
              <p>Book your parking slot in seconds without waiting in line.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow h-100">
              <i className="fas fa-clock fa-3x mb-3 text-primary"></i>
              <h5>Time Management</h5>
              <p>
                Get reminders 30 minutes before your slot expires to extend
                time.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow h-100">
              <i className="fas fa-wallet fa-3x mb-3 text-primary"></i>
              <h5>Secure Payments</h5>
              <p>
                Pay conveniently via bKash, Rocket, or Card with full security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
