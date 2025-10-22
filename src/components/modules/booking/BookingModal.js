import React, { useState } from "react";

export default function BookingModal({
  slot,
  setShowBooking,
  setShowPayment,
  setSelectedSlot,
  userId,
  userEmail,
}) {
  const [duration, setDuration] = useState(60);
  const [error, setError] = useState("");

  const handleProceed = () => {
    if (duration < 30) {
      setError("Minimum booking duration is 30 minutes.");
      return;
    }
    const start = new Date();
    const end = new Date(start.getTime() + duration * 60000);

    setSelectedSlot({ ...slot, start, end, userId, email: userEmail });

    setShowBooking(false);
    setShowPayment(true);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5 className="modal-title">Book Slot #{slot.id}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowBooking(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                className="form-control"
                value={duration}
                min={30}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDuration(val);
                  if (val >= 30) setError("");
                }}
              />
              {error && <div className="text-danger mt-1">{error}</div>}
            </div>
            <p className="text-muted">
              Start Time: <strong>{new Date().toLocaleTimeString()}</strong>
            </p>
            <p className="text-muted">
              End Time:{" "}
              <strong>
                {new Date(Date.now() + duration * 60000).toLocaleTimeString()}
              </strong>
            </p>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowBooking(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleProceed}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
