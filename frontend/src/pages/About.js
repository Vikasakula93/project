import React, { Component } from 'react';
import '../styles/About.css';

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Welcome to our About page! We are dedicated to providing the best services to our clients. Our team of experts is committed to delivering top-notch solutions tailored to your needs. 
        </p>
        <div className="about-content">
          <div className="about-section">
            <h3 className="section-title">Our Mission</h3>
            <p className="section-text">
              Our mission is to drive innovation and offer exceptional service to our customers. We strive to exceed expectations and deliver outstanding results through our expertise and dedication.
            </p>
          </div>
          <div className="about-section">
            <h3 className="section-title">Our Values</h3>
            <ul className="values-list">
              <li>Integrity</li>
              <li>Excellence</li>
              <li>Customer Focus</li>
              <li>Innovation</li>
            </ul>
          </div>
        </div>
        <a href="/" className="about-button">Back to Home</a>
      </div>
    );
  }
}

export default About;
