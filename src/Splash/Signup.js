import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Signup extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      validated: false,
      passwordInvalid: false,
      errors: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    const form = event.currentTarget;

    // Validate password
    let invalid = this.validatePassword();

    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();
  
    if (!invalid) {
      // Change validated to true to show validations
      this.setState({ validated: true });

      // Sign up for new user account
      this.props.signup(
        this.state.firstname,
        this.state.lastname,
        this.state.username,
        this.state.email,
        this.state.password
      );
    }
  }

  validatePassword() {
    let invalid = false, error = ""

    // Return false if passwords don't match
    if (this.state.password !== this.state.confirmPassword) {
      invalid = true
      error = "Passwords must match."
    }

    // Return false if password isn't at least 8 characters
    if (this.state.password.length < 8) {
      invalid = true
      error = "Password must be at least 8 characters."
    }

    // Update state
    this.setState({
      passwordInvalid: invalid,
      errors: {
        confirmPassword: error
      }
    });

    return invalid;
  }
  
  render() {
    const { validated } = this.state;
    return(
      <Form className="splash-form" 
            validated={validated} 
            onSubmit={e => this.handleSubmit(e)}>
        <Form.Group controlId="firstname">
          <Form.Label>First Name:</Form.Label>
          <Form.Control 
            required
            type="firstname" 
            placeholder="First Name"
            value={this.state.firstname} 
            onChange={this.handleInputChange} />
          <Form.Control.Feedback type="invalid">
            First name is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control 
            required
            type="lastname" 
            placeholder="Last Name"
            value={this.state.lastname} 
            onChange={this.handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Last name is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            required
            type="email" 
            placeholder="Email"
            value={this.state.email} 
            onChange={this.handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Email is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            required
            type="username" 
            placeholder="Username"
            value={this.state.username} 
            onChange={this.handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Username is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            required
            type="password" 
            placeholder="Password"
            value={this.state.password} 
            onChange={this.handleInputChange} />
          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            required
            type="password" 
            placeholder="Confirm Password"
            value={this.state.confirmPassword} 
            onChange={this.handleInputChange}
            isInvalid={this.state.passwordInvalid} />
          <Form.Control.Feedback type="invalid">
            {this.state.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
        <br />
        <p>Already have an account? Click here to <a className="App-link" href="#" onClick={this.props.changeForm}>log in</a>.</p>
      </Form>
    )
  }
}

export default Signup;