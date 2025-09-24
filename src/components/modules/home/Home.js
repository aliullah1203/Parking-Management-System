import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import parImg from "../../assets/images/parking.png";

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
    </div>
  );
}

export default Home;
