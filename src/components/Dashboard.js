// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import PaymentModal from "./PaymentModal";
import emailjs from "emailjs-com";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [slots, setSlots] = useState([
    { id: 1, available: true, startTime: null, endTime: null, notified: false },
    { id: 2, available: true, startTime: null, endTime: null, notified: false },
    { id: 3, available: true, startTime: null, endTime: null, notified: false },
    { id: 4, available: true, startTime: null, endTime: null, notified: false },
    { id: 5, available: true, startTime: null, endTime: null, notified: false },
    { id: 6, available: true, startTime: null, endTime: null, notified: false },
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 30-minute email notification
  useEffect(() => {
    if (!user) return; // only send if user email exists

    slots.forEach((slot) => {
      if (!slot.available && slot.endTime && !slot.notified) {
        const remainingMin = (new Date(slot.endTime) - currentTime) / 60000;

        if (remainingMin <= 30 && remainingMin > 0) {
          // Send email to the logged-in user
          emailjs
            .send(
              "service_aliullah",
              "template_ezqjq7b", // your template ID
              {
                to_email: user, // logged-in user email
                slot_id: slot.id,
                remaining_time: Math.floor(remainingMin),
              },
              "5XfTZlvUzh8R2dR1V" // your public key
            )

            .then(
              () => console.log(`Email sent to ${user} for slot ${slot.id}`),
              (error) => console.error("Email error:", error)
            );

          // Mark as notified to avoid sending again
          setSlots((prevSlots) =>
            prevSlots.map((s) =>
              s.id === slot.id ? { ...s, notified: true } : s
            )
          );
        }
      }
    });
  }, [currentTime, slots, user]);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h2>Please login to access the Dashboard.</h2>
      </div>
    );
  }

  const handleBook = (slot) => {
    setSelectedSlot(slot);
    setShowBooking(true);
  };

  const handlePaymentSuccess = (slotId, startTime, endTime) => {
    setSlots((prevSlots) =>
      prevSlots.map((s) =>
        s.id === slotId
          ? { ...s, available: false, startTime, endTime, notified: false }
          : s
      )
    );
    setShowPayment(false);
    setSelectedSlot(null);
  };

  const formatTime = (time) =>
    time
      ? new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const getRemainingTime = (endTime) => {
    if (!endTime) return "-";
    const diff = new Date(endTime) - currentTime;
    if (diff <= 0) return "Expired";
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Parking Dashboard</h2>
        <p className="lead text-muted">
          Welcome, {user}! Choose your parking slot below.
        </p>
      </div>

      <div className="row">
        {slots.map((slot) => (
          <div className="col-md-4 mb-4" key={slot.id}>
            <div
              className={`card slot-card shadow ${
                slot.available ? "available-slot" : "unavailable-slot"
              }`}
            >
              <div className="card-body text-center">
                <h5 className="card-title">Slot {slot.id}</h5>
                <span
                  className={`badge ${
                    slot.available ? "bg-success" : "bg-danger"
                  } mb-3`}
                >
                  {slot.available ? "Available" : "Booked"}
                </span>
                <br />

                {!slot.available && (
                  <div className="mt-2">
                    <p className="mb-1">Start: {formatTime(slot.startTime)}</p>
                    <p className="mb-1">End: {formatTime(slot.endTime)}</p>
                    <p className="mb-1">
                      Remaining: {getRemainingTime(slot.endTime)}
                    </p>
                  </div>
                )}

                {slot.available && (
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => handleBook(slot)}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showBooking && selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          setShowBooking={setShowBooking}
          setShowPayment={setShowPayment}
          setSelectedSlot={setSelectedSlot}
        />
      )}

      {showPayment && selectedSlot && (
        <PaymentModal
          slot={selectedSlot}
          setShowPayment={setShowPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

export default Dashboard;
