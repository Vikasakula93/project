import React, { Component } from 'react';
import '../styles/Form.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      errorMessage: '' 
    };
  }

  validateForm = () => {
    const { username, password } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      errors.username = 'Username is required';
    }

    if (!password) {
      formIsValid = false;
      errors.password = 'Password is required';
    }

    this.setState({ errors });
    return formIsValid;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { username, password } = this.state;
  
      try {
        const response = await fetch('http://localhost:5001/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: username, password }) 
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          console.log('Login successful:', data);
        } else {
          const errorData = await response.json();
          this.setState({ errorMessage: errorData.message || 'Login failed' });
        }
      } catch (error) {
        this.setState({ errorMessage: 'An error occurred: ' + error.message });
      }
    }
  };
  

  

  render() {
    const { username, password, errors, errorMessage } = this.state;

    return (
      <div className="login-form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              className={`form-input ${errors.username ? 'error-input' : ''}`}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className={`form-input ${errors.password ? 'error-input' : ''}`}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </label>
          <button type="submit" className="submit-button">Login</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
