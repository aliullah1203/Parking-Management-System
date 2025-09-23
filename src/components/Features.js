import React from "react";
import {
  FaCar,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaSmile,
} from "react-icons/fa";
import "./Features.css"; // make sure you create this file

function Features() {
  const featureList = [
    {
      icon: <FaCar />,
      title: "Easy Slot Booking",
      desc: "Book your parking slot in just a few clicks.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    {
      icon: <FaClock />,
      title: "Smart Reminders",
      desc: "Get notified 30 minutes before your slot ends.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "Pay safely with bKash, Rocket, or cards.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Save Money",
      desc: "Affordable parking with no hidden charges.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    {
      icon: <FaHourglassHalf />,
      title: "Save Time",
      desc: "Find parking faster and avoid traffic jams.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    {
      icon: <FaSmile />,
      title: "Stress-Free",
      desc: "No more parking headaches, just peace of mind.",
      gradient: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
  ];

  return (
    <div className="features-section py-5">
      <div className="container">
        <h2 className="text-center text-gradient fw-bold mb-5">Key Features</h2>
        <div className="features-container">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-card">
              <div
                className="icon-glow mb-4"
                style={{ background: feature.gradient }}
              >
                {React.cloneElement(feature.icon, { size: 32, color: "#fff" })}
              </div>
              <h5 className="fw-bold mb-3">{feature.title}</h5>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
