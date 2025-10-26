import React, { useState, useEffect } from "react";
import BookingModal from "../booking/BookingModal";
import PaymentModal from "../payment/PaymentModal";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import LocalStorageBackup from "../../utils/LocalStorageBackup";

const SERVICE_ID = "service_2qnaxle";
const TEMPLATE_ID = "template_kefhnlb";
const PUBLIC_KEY = "ChF5CwUuY3qdC1YIb";

export default function Dashboard({ user, setUser, slots, setSlots }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  // 🕒 Live clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ⏰ Auto-reset expired slots + Send reminder emails
  useEffect(() => {
    const updatedSlots = slots.map((slot) => {
      // Reset expired slots
      if (!slot.available && slot.end && new Date(slot.end) <= time) {
        return {
          ...slot,
          available: true,
          start: null,
          end: null,
          email: null,
          contactNumber: null,
          totalCost: null,
          paymentMethod: null,
          notified: false,
        };
      }

      // Send 30-min reminder email
      if (!slot.available && !slot.notified && slot.end) {
        const remaining = (new Date(slot.end) - time) / 60000;
        if (remaining > 0 && remaining <= 30) {
          emailjs
            .send(
              SERVICE_ID,
              TEMPLATE_ID,
              {
                to_email: slot.email,
                slot_id: slot.id,
                remaining_time: Math.floor(remaining),
              },
              PUBLIC_KEY
            )
            .then(() => console.log(`✅ Reminder sent for slot ${slot.id}`))
            .catch((e) => console.error("❌ Email failed:", e));
          return { ...slot, notified: true };
        }
      }

      return slot;
    });

    if (JSON.stringify(updatedSlots) !== JSON.stringify(slots)) {
      setSlots(updatedSlots);
    }
  }, [time, slots, setSlots]);

  // 📅 Book slot handler
  const handleBook = (slot) => {
    setSelectedSlot(slot);
    setShowBooking(true);
  };

  // 💰 Payment success update
  const handlePaymentSuccess = (
    id,
    email,
    contactNumber,
    totalCost,
    paymentMethod
  ) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              available: false,
              start: selectedSlot.start,
              end: selectedSlot.end,
              email,
              contactNumber,
              totalCost,
              paymentMethod,
              notified: false,
            }
          : s
      )
    );
    setShowPayment(false);
    navigate(`/slot/${id}`);
  };

  // 🧮 Slot summary
  const availableSlots = slots.filter((s) => s.available).map((s) => s.id);
  const bookedSlots = slots.filter((s) => !s.available).map((s) => s.id);

  return (
    <div className="dashboard-container">
      {/* 🏁 Header */}
      <header className="dashboard-header text-center mb-5">
        <h1>🚗 Parking Management Dashboard</h1>
        <p className="subtitle">
          Welcome, <strong>{user?.name || user?.email || "Guest"}</strong> 👋
        </p>
        <p className="time-display">{time.toLocaleTimeString()}</p>
      </header>

      {/* 📊 Parking Slot Summary */}
      <section className="status-summary mb-5">
        <h3 className="section-title">📊 Parking Slot Summary</h3>
        <div className="summary-table shadow-sm">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Slots</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="status-dot white"></span> Available (White)
                </td>
                <td>{availableSlots.join(", ") || "None"}</td>
                <td>{availableSlots.length}</td>
              </tr>
              <tr>
                <td>
                  <span className="status-dot red"></span> Booked (Red)
                </td>
                <td>{bookedSlots.join(", ") || "None"}</td>
                <td>{bookedSlots.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🅿️ Slot Grid */}
      <section className="slot-grid">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`slot-card ${slot.available ? "available" : "booked"}`}
          >
            <h4>Slot {slot.id}</h4>
            <p className={`status-label ${slot.available ? "green" : "red"}`}>
              {slot.available ? "Available" : "Booked"}
            </p>

            {slot.available ? (
              <button className="btn book-btn" onClick={() => handleBook(slot)}>
                Book Now
              </button>
            ) : (
              <button
                className="btn details-btn"
                onClick={() => navigate(`/slot/${slot.id}`)}
              >
                View Details
              </button>
            )}
          </div>
        ))}
      </section>

      {/* 🪟 Booking Modal */}
      {showBooking && (
        <BookingModal
          slot={selectedSlot}
          setShowBooking={setShowBooking}
          setShowPayment={setShowPayment}
          setSelectedSlot={setSelectedSlot}
          userId={user?.id}
          userEmail={user?.email}
        />
      )}

      {/* 💳 Payment Modal */}
      {showPayment && (
        <PaymentModal
          slot={selectedSlot}
          setShowPayment={setShowPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* 🗂 Backup/Restore Feature */}
      <LocalStorageBackup />
    </div>
  );
}
