import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center text-muted mb-5">
        Have questions or need support? Reach out to us and we'll get back to
        you.
      </p>

      <div className="row">
        {/* Contact Info */}
        <div className="col-md-5 mb-4">
          <div className="contact-info p-4 shadow-sm rounded bg-light">
            <h5>Contact Information</h5>
            <p>
              <strong>Address:</strong> Baridhara, Block J, Dhaka, Bangladesh
            </p>
            <p>
              <strong>Email:</strong> support@smartparking.com
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p>
              <strong>Hours:</strong> Mon - Fri, 9:00am - 6:00pm
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form
            className="contact-form p-4 shadow-sm rounded bg-white"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-3">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-3">
              <label>Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
