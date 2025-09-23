import React from "react";

function PaymentModal({ slot, setShowPayment, onPaymentSuccess }) {
  const handlePay = () => {
    alert(`Payment successful for Slot ${slot.id}`);
    onPaymentSuccess(slot.id, slot.startTime, slot.endTime);
  };

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5 className="mb-3">Payment for Slot {slot.id}</h5>
          <p>Pay using bKash, Rocket, or Card</p>
          <button className="btn btn-success me-2" onClick={handlePay}>
            Pay Now
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowPayment(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
