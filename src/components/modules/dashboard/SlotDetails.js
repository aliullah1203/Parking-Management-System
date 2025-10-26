import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SlotDetails.css";

export default function SlotDetails({ slots }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const slot = slots.find((s) => String(s.id) === id);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (!slot || slot.available || !slot.end) return;
    const update = () => {
      const ms = new Date(slot.end) - new Date();
      if (ms <= 0) return setRemainingTime("Expired");
      const mins = Math.floor(ms / 60000);
      const secs = Math.floor((ms % 60000) / 1000);
      setRemainingTime(`${mins}m ${secs}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [slot]);

  if (!slot)
    return (
      <div className="slot-details-container text-center p-5">
        <h2>Slot Not Found 😔</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>
    );

  if (slot.available)
    return (
      <div className="slot-details-container text-center p-5">
        <h2>Slot {slot.id} is Available! 🥳</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>
    );

  const formatTime = (t) =>
    t
      ? new Date(t).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  const maskContact = (n) =>
    n ? n.replace(/(\d{3})\d{4}(\d{3})/, "$1XXXX$2") : "N/A";

  return (
    <div className="slot-details-container container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-danger text-white text-center">
          <h2>Booking Details - Slot {slot.id}</h2>
        </div>
        <div className="card-body">
          <ul className="list-unstyled">
            <li>
              <strong>Status:</strong> Booked
            </li>
            <li>
              <strong>Start Time:</strong> {formatTime(slot.start)}
            </li>
            <li>
              <strong>End Time:</strong> {formatTime(slot.end)}
            </li>
            <li>
              <strong>Remaining Time:</strong>{" "}
              {remainingTime || "Calculating..."}
            </li>
            <hr />
            <li>
              <strong>Email:</strong> {slot.email || "N/A"}
            </li>
            <li>
              <strong>Contact:</strong> {maskContact(slot.contactNumber)}
            </li>
            <li>
              <strong>Total Paid:</strong> ৳{slot.totalCost}
            </li>
            <li>
              <strong>Payment Method:</strong> {slot.paymentMethod || "N/A"}
            </li>
            <li>
              <strong>Reminder Notified:</strong>{" "}
              {slot.notified ? "✅ Yes" : "❌ No"}
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
