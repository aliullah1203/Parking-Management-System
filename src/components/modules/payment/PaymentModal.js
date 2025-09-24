import React, { useState } from "react";

function PaymentModal({ slot, setShowPayment, onPaymentSuccess }) {
  const [step, setStep] = useState("select"); // select -> details -> confirm
  const [method, setMethod] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleProceed = () => {
    if (!inputValue) return alert("Please enter required information");
    setStep("confirm");
  };

  const handlePay = () => {
    alert(
      `Payment successful for Slot ${slot.id} via ${method} (${inputValue})`
    );
    onPaymentSuccess(slot.id, slot.startTime, slot.endTime, method, inputValue);
    setShowPayment(false);
  };

  const renderInputField = () => {
    if (method === "bKash" || method === "Rocket" || method === "Nagad") {
      return (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Mobile Number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    } else {
      // Card or Banking
      return (
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter ID/Card Number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    }
  };

  const renderContent = () => {
    switch (step) {
      case "select":
        return (
          <div className="d-flex flex-column gap-3">
            {["bKash", "Rocket", "Nagad", "Card"].map((pay) => (
              <button
                key={pay}
                className={`btn ${
                  pay === "Card"
                    ? "btn-outline-dark"
                    : pay === "bKash"
                    ? "btn-outline-success"
                    : "btn-outline-primary"
                } d-flex justify-content-between align-items-center`}
                onClick={() => {
                  setMethod(pay);
                  setInputValue("");
                  setStep("details");
                }}
              >
                {pay}
              </button>
            ))}
          </div>
        );

      case "details":
        return (
          <div>
            <p>
              Enter your{" "}
              {method === "Card" ? "ID/Card Number" : "Mobile Number"}:
            </p>
            {renderInputField()}
            <button className="btn btn-success me-2" onClick={handleProceed}>
              Proceed
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setStep("select")}
            >
              Back
            </button>
          </div>
        );

      case "confirm":
        return (
          <div>
            <p>
              Confirm payment for <strong>Slot #{slot.id}</strong> via{" "}
              <strong>{method}</strong> ({inputValue})
            </p>
            <button className="btn btn-success me-2" onClick={handlePay}>
              Confirm Payment
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setStep("details")}
            >
              Back
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4 p-3">
          {/* Header */}
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5 className="modal-title">
              {step === "select" && `Payment for Slot #${slot.id}`}
              {step === "details" &&
                `Enter ${
                  method === "Card" ? "ID/Card Number" : "Mobile Number"
                }`}
              {step === "confirm" && "Confirm Payment"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowPayment(false)}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
