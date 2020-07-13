import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../assets/lynkslist_horizontal_logo.png';

class Login extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    };
  }

  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  handleSubmit(event) {
    // Prevent default behavior
    event.preventDefault();
    event.stopPropagation();

    // Log in
    this.props.login(this.state.name, this.state.email);
    // this.props.login(this.state.username, this.state.password);
  }
  
  render() {
    return(
      <div className="login-container">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Lynkslist</h2>
        <Form className="splash-form" onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId="name">
              <Form.Label>Name - FOR TESTING</Form.Label>
              <Form.Control 
                required
                type="name" 
                placeholder="Enter Name"
                value={this.state.name} 
                onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="email">
              <Form.Label>Email - FOR TESTING</Form.Label>
              <Form.Control 
                required
                type="email" 
                placeholder="Enter Email"
                value={this.state.email} 
                onChange={this.handleInputChange} />
          </Form.Group>
          {/* <Form.Group controlId="username">
            <Form.Label>Username - NOT USED</Form.Label>
            <Form.Control 
              type="username" 
              placeholder="Enter Username"
              value={this.state.username} 
              onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password - NOT USED</Form.Label>
            <Form.Control 
              placeholder="Password"
              name="password" 
              type="password" 
              value={this.state.password} 
              onChange={this.handleInputChange} />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          <p>Or click here to <a className="App-link" href="#" onClick={this.props.changeForm}>sign up</a>.</p>
        </Form>
      </div>
    )
  }
}

export default Login;