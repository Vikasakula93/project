import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>My App</h1>
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Landing Page</Link></li> 
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/assessment-tasks">Assessment Tasks</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
