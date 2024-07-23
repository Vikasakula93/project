import React, { Component } from 'react';
import '../styles/Contact.css';

class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">We’d love to hear from you! Please reach out to us using the contact information below.</p>
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Main Street, Hometown, India</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <p>(+91) 88-456-7890</p>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <p>contact@myapp.com</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
