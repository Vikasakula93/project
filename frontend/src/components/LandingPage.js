import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <header className="landing-header">
          <h1>Welcome to Our Application</h1>
          <p>Your gateway to an amazing experience</p>
          <nav>
            <ul className="nav-links">
              <li><Link to="/home" className="nav-link">Home</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/assessment-tasks" className="nav-link">Assessment Tasks</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <section className="landing-content">
          <h2>Why Choose Us?</h2>
          <p>Our application provides you with the tools and resources you need to succeed.</p>
          <div className="cta">
            <Link to="/register" className="cta-button">Get Started</Link>
          </div>
        </section>
      </div>
    );
  }
}

export default LandingPage;
