import React, { Component } from 'react';
import '../styles/Form.css';

class AssessmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dueDate: '',
      errors: {},
      assessments: [], 
      successMessage: '',
      errorMessage: '',
      sortOption: 'All', 
      searchQuery: '' 
    };
  }

  validateForm = () => {
    const { title, description, dueDate } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!title) {
      formIsValid = false;
      errors.title = 'Title is required';
    }

    if (!description) {
      formIsValid = false;
      errors.description = 'Description is required';
    }

    if (!dueDate) {
      formIsValid = false;
      errors.dueDate = 'Due Date is required';
    }

    this.setState({ errors });
    return formIsValid;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSortChange = (event) => {
    this.setState({ sortOption: event.target.value });
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      const { title, description, dueDate } = this.state;

      try {
        const response = await fetch('http://localhost:5001/api/assessments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description, dueDate })
        });

        if (response.ok) {
          const data = await response.json();
          this.setState(prevState => ({
            title: '',
            description: '',
            dueDate: '',
            errors: {},
            assessments: [...prevState.assessments, data], 
            successMessage: 'Assessment created successfully!',
            errorMessage: ''
          }));
        } else {
          const errorData = await response.json();
          this.setState({
            errorMessage: errorData.message || 'Failed to create assessment'
          });
        }
      } catch (error) {
        this.setState({ errorMessage: 'An error occurred: ' + error.message });
      }
    }
  };

  handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/assessments/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.setState(prevState => ({
          assessments: prevState.assessments.filter(assessment => assessment.id !== id),
          successMessage: 'Assessment deleted successfully!',
          errorMessage: ''
        }));
      } else {
        const errorData = await response.json();
        this.setState({
          errorMessage: errorData.message || 'Failed to delete assessment'
        });
      }
    } catch (error) {
      this.setState({ errorMessage: 'An error occurred: ' + error.message });
    }
  };

  getFilteredAssessments = () => {
    const { assessments, sortOption, searchQuery } = this.state;

    let filtered = sortOption === 'All' ? assessments : assessments.filter(assessment => assessment.title === sortOption);

    if (searchQuery) {
      filtered = filtered.filter(assessment =>
        assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  render() {
    const { title, description, dueDate, errors, successMessage, errorMessage, sortOption, searchQuery } = this.state;
    const filteredAssessments = this.getFilteredAssessments();

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            Assessment Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={this.handleChange}
            />
            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
          </label>
          <button type="submit">Submit Assessment</button>
        </form>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="sort-container">
          <label>
            Sort by:
            <select value={sortOption} onChange={this.handleSortChange}>
              <option value="All">All</option>
              <option value="Coding Challenge">Coding Challenge</option>
              <option value="Project Submission">Project Submission</option>
              <option value="Project Quiz">Project Quiz</option>
              <option value="Protocol Assessment">Protocol Assessment</option>
            </select>
          </label>
          <label>
            Search:
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search assessments"
            />
          </label>
        </div>

        {filteredAssessments.length > 0 && (
          <div className="assessments-grid">
            {filteredAssessments.map((assessment) => (
              <div className="assessments-list-item" key={assessment.id}>
                <button
                  className="delete-button"
                  onClick={() => this.handleDelete(assessment.id)}
                >
                  Delete
                </button>
                <h4>{assessment.title}</h4>
                <p>{assessment.description}</p>
                <p><strong>Due Date:</strong> {new Date(assessment.dueDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AssessmentForm;
