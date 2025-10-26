import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./PaymentModal.css"; // Assuming this is present

const SERVICE_ID = "service_2qnaxle";
const TEMPLATE_ID = "template_odjrkda";
const PUBLIC_KEY = "ChF5CwUuY3qdC1YIb";

export default function PaymentModal({
  slot,
  setShowPayment,
  onPaymentSuccess,
}) {
  const [method, setMethod] = useState("");
  // Use data from slot if it exists, otherwise initialize empty
  const [contactNumber, setContactNumber] = useState(slot?.contactNumber || "");
  const [email, setEmail] = useState(slot?.email || "");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!slot || !slot.id) return null;

  const totalCost = slot.totalCost || 0;

  const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

  const sendOtpEmail = async (email, otp) => {
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000).toLocaleString();
    const templateParams = { to_email: email, otp, expiry_time: expiryTime };
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  };

  const handleSendOtp = async () => {
    if (!email.trim() || !method.trim() || !contactNumber.trim()) {
      return alert("Please fill all required fields.");
    }
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setLoading(true);

    try {
      await sendOtpEmail(email, otp);
      setOtpSent(true);
      alert(`✅ OTP sent to ${email}`);
    } catch (err) {
      console.error("❌ OTP send failed:", err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() === generatedOtp) {
      alert(`✅ Payment verified! Total Paid: ৳${totalCost}`);
      // 🚩 Updated call to onPaymentSuccess with all necessary data
      onPaymentSuccess(slot.id, email, contactNumber, totalCost, method);
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowPayment(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className className="modal-content rounded-4 shadow-lg">
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5 className="modal-title">Payment for Slot {slot.id}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowPayment(false)}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <p className="fw-semibold text-center mb-3">
              💰 Total Amount:{" "}
              <span className="text-success">৳{totalCost}</span>
            </p>

            {!otpSent ? (
              <>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Payment Method</label>
                <select
                  className="form-select mb-3"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Card">Card</option>
                </select>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder={
                    ["bKash", "Nagad", "Rocket"].includes(method)
                      ? "Enter Mobile Number"
                      : "Enter Card/ID Number"
                  }
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <button
                  className="btn btn-success w-100"
                  onClick={handleSendOtp}
                  disabled={loading || !method || !contactNumber || !email}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <p>
                  OTP sent to <strong>{email}</strong>. Enter it below:
                </p>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button
                  className="btn btn-success w-100"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP & Confirm Payment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
