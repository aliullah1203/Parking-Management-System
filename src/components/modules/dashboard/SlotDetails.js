// src/components/dashboard/SlotDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SlotDetails.css";

export default function SlotDetails({ slots }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  // Find slot by string ID
  const slot = slots.find((s) => s.id === id);

  // Update current time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!slot) {
    return (
      <div className="container text-center mt-5">
        <h3>❌ Slot not found</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const formatTime = (t) =>
    t
      ? new Date(t).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const remainingTime = (end) => {
    if (!end) return "-";
    const diff = new Date(end) - time;
    if (diff <= 0) return "Expired";
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="slot-details-container">
      <div className="details-card shadow-lg">
        <h2 className="text-center mb-4 fw-bold">🅿️ Slot Details</h2>

        <div className="slot-info">
          <div className="info-row">
            <span>Slot ID:</span>
            <strong>{slot.id}</strong>
          </div>

          <div className="info-row">
            <span>Status:</span>
            <span
              className={`status-badge ${
                slot.available ? "available" : "booked"
              }`}
            >
              {slot.available ? "Available" : "Booked"}
            </span>
          </div>

          <div className="info-row">
            <span>Start Time:</span>
            <strong>{formatTime(slot.start)}</strong>
          </div>

          <div className="info-row">
            <span>End Time:</span>
            <strong>{formatTime(slot.end)}</strong>
          </div>

          <div className="info-row">
            <span>Remaining Time:</span>
            <strong>{slot.available ? "-" : remainingTime(slot.end)}</strong>
          </div>

          <div className="info-row">
            <span>Booked By:</span>
            <strong>{slot.email || "N/A"}</strong>
          </div>

          <div className="info-row">
            <span>Notified:</span>
            <strong className={slot.notified ? "text-success" : "text-danger"}>
              {slot.notified ? "✅ Yes" : "❌ No"}
            </strong>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2 fw-semibold"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
