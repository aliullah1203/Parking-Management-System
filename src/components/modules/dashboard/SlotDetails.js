import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SlotDetails.css"; // Import the specific CSS

export default function SlotDetails({ slots }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const slot = slots.find((s) => String(s.id) === id);
  const [remainingTime, setRemainingTime] = useState(null);

  // Calculate remaining time and update every second
  useEffect(() => {
    if (!slot || slot.available || !slot.end) {
      setRemainingTime(null);
      return;
    }

    const calculateRemaining = () => {
      const remainingMs = new Date(slot.end) - new Date();
      if (remainingMs <= 0) {
        setRemainingTime("Expired");
        return;
      }
      const totalSeconds = Math.floor(remainingMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setRemainingTime(`${minutes}m ${seconds}s`);
    };

    calculateRemaining();
    const interval = setInterval(calculateRemaining, 1000);

    return () => clearInterval(interval);
  }, [slot]);

  // Handle cases where the slot is not found or is available
  if (!slot) {
    return (
      <div className="slot-details-container p-5 text-center">
        <h2>Slot Not Found 😔</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  if (slot.available) {
    return (
      <div className="slot-details-container p-5 text-center">
        <h2>Slot {slot.id} is Available! 🥳</h2>
        <p>Bookings are only visible for booked slots.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Format times
  const startTimeStr = slot.start
    ? new Date(slot.start).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
  const endTimeStr = slot.end
    ? new Date(slot.end).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const contactNumberMasked = slot.contactNumber
    ? slot.contactNumber.replace(/(\d{3})\d{4}(\d{3})/, "$1XXXX$2")
    : "N/A";

  return (
    <div className="slot-details-container container my-5">
      <div className="card shadow-lg details-card">
        <div className="card-header bg-danger text-white text-center rounded-top-4">
          <h2 className="mb-0">
            Booking Details for Slot <span className="slot-id">{slot.id}</span>
          </h2>
        </div>
        <div className="card-body p-4">
          <h3 className="status-booked mb-4">Status: Booked</h3>

          <ul className="list-unstyled detail-list">
            <li>
              <strong>Start Time:</strong> {startTimeStr}
            </li>
            <li>
              <strong>End Time:</strong> {endTimeStr}
            </li>
            <li>
              <strong>Remaining Time:</strong>{" "}
              <span className="timer text-danger">
                {remainingTime || "Calculating..."}
              </span>
            </li>
            <hr />
            <li>
              <strong>Booked By (Email):</strong> {slot.email || "N/A"}
            </li>
            <li>
              <strong>Contact Number:</strong> {contactNumberMasked}
            </li>
            <li>
              <strong>Total Paid:</strong> ৳{slot.totalCost || "N/A"}
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
