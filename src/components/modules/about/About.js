import React from "react";
import {
  FaCar,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaConciergeBell,
  FaSoap,
} from "react-icons/fa";
import "./About.css";
import parImg from "../../assets/images/parking.png";

function About() {
  return (
    <div className="about-section py-5">
      <div className="container">
        {/* Hero Header */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold text-gradient">
            Smart Parking Management System
          </h2>
          <p className="lead text-muted mx-auto w-75">
            Our system brings innovation to parking by combining{" "}
            <strong>IoT, automation, and secure payments</strong>. It’s not just
            about finding a spot — it’s about{" "}
            <strong>
              saving time, reducing stress, and making city traffic smoother
            </strong>
            . With instant booking, smart alerts, and flexible payment options,
            parking has never been this easy.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaCar size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">Instant Slot Booking</h5>
              <p className="text-white">
                Quickly reserve a spot with just a few clicks. No more circling
                around or wasting fuel while searching.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaClock size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">Smart Time Alerts</h5>
              <p className="text-white">
                Get friendly reminders before your time expires. Extend easily
                and avoid last-minute rush or fines.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaShieldAlt size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">
                Secure & Fast Payments
              </h5>
              <p className="text-white">
                Pay instantly via bKash, Rocket, or card. Transactions are safe,
                encrypted, and fully trackable.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaMoneyBillWave size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">Save Money</h5>
              <p className="text-white">
                Get up to 70% savings compared to traditional on-site parking
                with smarter booking.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaConciergeBell size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">Concierge Options</h5>
              <p className="text-white">
                Take advantage of our Concierge services and have us help you
                out.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card feature-card shadow-lg p-5 h-100">
              <FaSoap size={50} className="mb-4 text-white" />
              <h5 className="fw-bold text-white mb-3">Car Wash</h5>
              <p className="text-white">Why not add a car wash?</p>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="text-center mt-5">
          <img
            src={parImg}
            alt="Parking Illustration"
            className="img-fluid rounded shadow-lg about-img"
            style={{
              maxWidth: "800px",
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
