import React from "react";
import {
  FaCar,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaSmile,
  FaWalking,
  FaConciergeBell,
  FaShower,
} from "react-icons/fa";
import "./Features.css";

function Features() {
  const keyFeatures = [
    {
      icon: <FaCar />,
      title: "Easy Slot Booking",
      desc: "Book your parking slot in just a few clicks.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      icon: <FaClock />,
      title: "Smart Reminders",
      desc: "Get notified 30 minutes before your slot ends.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "Pay safely with bKash, Rocket, or cards.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Save Money",
      desc: "Affordable parking with no hidden charges.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      icon: <FaHourglassHalf />,
      title: "Save Time",
      desc: "Find parking faster and avoid traffic jams.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
    {
      icon: <FaSmile />,
      title: "Stress-Free",
      desc: "No more parking headaches, just peace of mind.",
      gradient: "linear-gradient(135deg, #0d6efd, #6610f2)",
    },
  ];

  const premiumServices = [
    {
      icon: <FaWalking />,
      title: "Close & Handy",
      desc: "Park at the terminal – just a short walk to your gate.",
      gradient: "linear-gradient(135deg, #ff6b6b, #f94d6a)",
    },
    {
      icon: <FaConciergeBell />,
      title: "Concierge Options",
      desc: "Take advantage of our Concierge services for extra help.",
      gradient: "linear-gradient(135deg, #ff9a9e, #f6416c)",
    },
    {
      icon: <FaShower />,
      title: "Car Wash",
      desc: "Drive up, park, and add a car wash for extra convenience.",
      gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    },
  ];

  return (
    <div className="features-section py-5">
      <div className="container">
        {/* Key Features */}
        <h2 className="text-center text-gradient fw-bold mb-5">Key Features</h2>
        <div className="features-container">
          {keyFeatures.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ background: feature.gradient }}
            >
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

        {/* Premium Services */}
        <h2 className="text-center text-gradient fw-bold my-5">
          Premium Services
        </h2>
        <div className="features-container">
          {premiumServices.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ background: feature.gradient }}
            >
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
