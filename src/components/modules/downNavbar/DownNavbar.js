import React from "react";
import { Link } from "react-router-dom";
import "./DownNavbar.css";

function DownNavbar() {
  return (
    <footer className="down-navbar">
      <div className="container py-5">
        <div className="row">
          {/* Logo & Description */}
          <div className="col-md-4 mb-4">
            <h3 className="footer-logo">Smart Parking Management System</h3>
            <p className="footer-description">
              Efficiently manage parking slots, reserve your spot, and pay
              securely.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-2 mb-4">
            <h5 className="footer-heading">USEFUL LINKS</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-2 mb-4">
            <h5 className="footer-heading">COMPANY</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/faqs">FAQ's</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">SOCIAL</h5>
            <div className="footer-social d-flex gap-3 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="copyright">
          &copy; {new Date().getFullYear()} Smart Parking Management System. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default DownNavbar;
