import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./PaymentModal.css";

const SERVICE_ID = "service_2qnaxle";
const TEMPLATE_ID = "template_odjrkda";
const PUBLIC_KEY = "ChF5CwUuY3qdC1YIb";

export default function PaymentModal({
  slot,
  setShowPayment,
  onPaymentSuccess,
}) {
  const [method, setMethod] = useState(slot?.paymentMethod || "");
  const [contactNumber, setContactNumber] = useState(slot?.contactNumber || "");
  const [email, setEmail] = useState(slot?.email || "");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!slot) return null;

  const totalCost = slot.totalCost || 0;

  const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

  const sendOtpEmail = (email, otp) => {
    const expiry = new Date(Date.now() + 15 * 60 * 1000).toLocaleString();
    return emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { to_email: email, otp, expiry_time: expiry },
      PUBLIC_KEY
    );
  };

  const handleSendOtp = async () => {
    if (!email || !method || !contactNumber) return alert("Fill all fields.");
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setLoading(true);
    try {
      await sendOtpEmail(email, otp);
      setOtpSent(true);
      alert(`✅ OTP sent to ${email}`);
    } catch {
      alert("❌ OTP sending failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      alert(`✅ Payment Confirmed! Total Paid: ৳${totalCost}`);
      onPaymentSuccess({
        ...slot,
        contactNumber,
        paymentMethod: method,
        email,
      });
    } else {
      alert("❌ Invalid OTP.");
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowPayment(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content rounded-4 shadow-lg">
          <div className="modal-header bg-primary text-white rounded-top-4">
            <h5>Payment for Slot {slot.id}</h5>
            <button
              className="btn-close btn-close-white"
              onClick={() => setShowPayment(false)}
            />
          </div>
          <div className="modal-body">
            <p className="text-center mb-3">💰 Total: ৳{totalCost}</p>

            {!otpSent ? (
              <>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Payment Method</label>
                <select
                  className="form-select mb-2"
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
                  className="form-control mb-2"
                  placeholder={
                    ["bKash", "Nagad", "Rocket"].includes(method)
                      ? "Mobile Number"
                      : "Card/ID Number"
                  }
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
                <button
                  className="btn btn-success w-100"
                  onClick={handleSendOtp}
                  disabled={loading || !email || !method || !contactNumber}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <p>
                  OTP sent to <strong>{email}</strong>. Enter below:
                </p>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button
                  className="btn btn-success w-100"
                  onClick={handleVerifyOtp}
                >
                  Verify & Confirm Payment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
