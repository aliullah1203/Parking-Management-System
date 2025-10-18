import React from "react";
import {
  FaCar,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaHourglassHalf,
  FaShower,
} from "react-icons/fa";
import "./Features.css";

function Features() {
  const keyFeatures = [
    {
      icon: <FaCar />,
      title: "Easy Slot Booking",
      desc: "Book your parking slot in just a few clicks.",
      gradient: "linear-gradient(135deg, #4080e0ff, #8b4eeeff)",
    },
    {
      icon: <FaClock />,
      title: "Smart Reminders",
      desc: "Get notified 30 minutes before your slot ends.",
      gradient: "linear-gradient(135deg, #4080e0ff, #8b4eeeff)",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      desc: "Pay safely with bKash, Rocket, or cards.",
      gradient: "linear-gradient(135deg, #4080e0ff, #8b4eeeff)",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Save Money",
      desc: "Affordable parking with no hidden charges.",
      gradient: "linear-gradient(135deg, #4080e0ff, #8b4eeeff)",
    },
    {
      icon: <FaHourglassHalf />,
      title: "Save Time",
      desc: "Find parking faster and avoid traffic jams.",
      gradient: "linear-gradient(135deg, #4080e0ff, #8b4eeeff)",
    },
    {
      icon: <FaShower />,
      title: "Car Wash",
      desc: "Premium services <br> Drive up, park, and add a car wash for extra convenience.",
      gradient: "linear-gradient(135deg, #442d11ff, #219b87ff)",
    },
  ];

  return (
    <div className="features-section py-5">
      <div className="container">
        {/* Key Features */}
        <h2 className="text-center text-gradient fw-bold mb-5">Features</h2>
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
      </div>
    </div>
  );
}

export default Features;
