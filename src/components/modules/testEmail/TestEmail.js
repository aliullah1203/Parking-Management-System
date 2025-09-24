// src/components/TestEmail.js
import React from "react";
import emailjs from "emailjs-com";

function TestEmail() {
  const sendTestEmail = () => {
    emailjs
      .send(
        "service_aliullah", // Your Service ID
        "template_ezqjq7b", // Your Template ID
        {
          to_email: "aliullah15555@gmail.com", // Recipient email
          slot_id: 1,
          remaining_time: 30,
        },
        "5XfTZlvUzh8R2dR1V" // Your EmailJS Public Key
      )
      .then(
        (result) => alert("Test email sent!"),
        (error) => alert("Error sending email: " + error.text)
      );
  };

  return (
    <div className="text-center mt-5">
      <button className="btn btn-success" onClick={sendTestEmail}>
        Send Test Email
      </button>
    </div>
  );
}

export default TestEmail;
