import React, { Component } from 'react';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <h2 className="home-title">Welcome to My App</h2>
        <p className="home-description">Your journey to explore our services starts here. Discover more about what we offer and how we can assist you.</p>
        <div className="home-buttons">
          <a href="/about" className="home-button">Learn More About Us</a>
          <a href="/contact" className="home-button">Get in Touch</a>
        </div>
      </div>
    );
  }
}

export default Home;
