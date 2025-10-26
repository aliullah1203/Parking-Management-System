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
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const handleCalculateCost = (selectedDuration, selectedStart) => {
    const now = new Date();
    // Default start time to now if not selected or if the selected time is in the past
    let start = new Date(now.getTime() + 60000); // Default to 1 minute from now
    if (selectedStart) {
      const selected = new Date(selectedStart);
      // Only use selected time if it's in the future
      if (selected > now) {
        start = selected;
      } else if (
        new Date(selectedStart).toDateString() === now.toDateString()
      ) {
        // Allow booking for today if time is passed, but start it now
        start = now;
      }
    }

    // Ensure duration is a valid number
    const finalDuration = Math.max(0, selectedDuration || 0);

    // Calculate pre-book minutes from now to the actual start time
    const extraMinutes = Math.max(0, Math.floor((start - now) / 60000));

    const baseCost = finalDuration * 5;
    const extraCost = extraMinutes * 1;
    const total = baseCost + extraCost;

    setTotalCost(total);
    return { start, baseCost, extraCost, total };
  };

  // Initial calculation on component load
  React.useEffect(() => {
    handleCalculateCost(duration, startTime);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProceed = () => {
    if (duration < 30) {
      setError("Minimum booking duration is 30 minutes.");
      return;
    }

    const { start, total } = handleCalculateCost(duration, startTime);
    const end = new Date(start.getTime() + duration * 60000);

    setSelectedSlot({
      ...slot,
      start,
      end,
      userId,
      email: userEmail,
      totalCost: total,
      available: false,
      // Initialize new fields for PaymentModal
      contactNumber: null,
      paymentMethod: null,
    });

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
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={duration}
                min={30}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDuration(val);
                  if (val >= 30) setError("");
                  handleCalculateCost(val, startTime);
                }}
              />
              {error && <div className="text-danger mt-1">{error}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Choose Start Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  handleCalculateCost(duration, e.target.value);
                }}
              />
            </div>

            <div className="border p-3 rounded bg-light">
              <p className="mb-1">
                <strong>Cost per minute:</strong> 5 Taka
              </p>
              <p className="mb-1">
                <strong>Extra per minute (pre-book fee):</strong> 1 Taka
              </p>
              <p className="mb-1">
                <strong>Total Cost:</strong> {totalCost} Taka
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowBooking(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleProceed}
              disabled={error}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
