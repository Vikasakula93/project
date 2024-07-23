import React, { Component } from 'react';
import '../styles/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div className="notfound-container">
        <h2 className="notfound-title">404 - Page Not Found</h2>
        <p className="notfound-description">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
        <a href="/" className="notfound-button">Go to Homepage</a>
      </div>
    );
  }
}

export default NotFound;
