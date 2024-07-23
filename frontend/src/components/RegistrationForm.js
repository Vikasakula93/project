import React, { Component } from 'react';
import '../styles/Form.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      errorMessage: '' 
    };
  }

  validateForm = () => {
    const { username, email, password } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      errors.username = 'Username is required';
    }

    if (!email) {
      formIsValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors.email = 'Email is invalid';
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
        const { username, email, password } = this.state;

        try {
            const response = await fetch('http://localhost:5001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                this.setState({ username: '', email: '', password: '', errors: {} });
            } else {
                const errorData = await response.json();
                this.setState({ errorMessage: errorData.message || 'Registration failed' });
            }
        } catch (error) {
            this.setState({ errorMessage: 'An error occurred: ' + error.message });
        }
    }
};




  render() {
    const { username, email, password, errors, errorMessage } = this.state;

    return (
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
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={`form-input ${errors.email ? 'error-input' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
        <button type="submit">Register</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    );
  }
}

export default RegistrationForm;
