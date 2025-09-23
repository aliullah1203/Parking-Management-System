import React, { useState } from "react";

function BookingModal({
  slot,
  setShowBooking,
  setShowPayment,
  setSelectedSlot,
}) {
  const [duration, setDuration] = useState(60);

  const handleProceed = () => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Save times to selectedSlot for PaymentModal
    setSelectedSlot({ ...slot, startTime, endTime });

    setShowBooking(false);
    setShowPayment(true);
  };

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5 className="mb-3">Booking Slot {slot.id}</h5>
          <label className="form-label">Duration (minutes)</label>
          <input
            type="number"
            className="form-control mb-3"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={30}
          />
          <button className="btn btn-primary me-2" onClick={handleProceed}>
            Proceed to Payment
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowBooking(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
