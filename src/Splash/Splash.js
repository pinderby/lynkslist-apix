import React, { Component } from 'react';
import graphql from "babel-plugin-relay/macro";
import { Redirect } from 'react-router-dom';
import { QueryRenderer, fetchQuery, commitMutation } from "react-relay";
import RelayEnvironment from "../RelayEnvironment.js";
import Login from './Login.js';
import Signup from './Signup.js';
// import logo from '../logo.svg';

class Splash extends Component {
  constructor(props) {
    super(props);

    console.log('user_token: ', localStorage.getItem('user_token')); // TODO --DM-- Remove
    console.log('username: ', localStorage.getItem('username')); // TODO --DM-- Remove

    // Check if user token is already stored
    let token = '', goToFeed = false, user = {};
    if (localStorage.getItem('user_token') && 
        localStorage.getItem('user_token') !== 'undefined' && 
        localStorage.getItem('username') && 
        localStorage.getItem('username') !== 'undefined') {
      
      // Go to feed
      goToFeed = true;
      user = { username: localStorage.getItem('username') };
    }
    
    // Bind methods
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    // this.logout = this.logout.bind(this); // TODO --DTM-- Implement log out

    this.state = {
      user: user,
      goToFeed: goToFeed,
      isLoggingIn: true,
      token: token,
      errors: {}
    };
  }

  // Switch form
  changeForm(isLoggingIn) {
    // isLoggingIn: true = show login form, false = show signup form
    this.setState({
      isLoggingIn: isLoggingIn, 
      errors: {}
    });
  }

  // Log user in
  login(username, password) {
    console.log(username, password); // TODO --DTM-- Remove

    const query = graphql`
      query SplashQuery($username: String!, $password: String!) {
        user(username: $username) {
          id
          username
          fname
          lname
          token(password: $password)
          email
          preferences
          repos {
            id
          }
          repos {
            id
            name
          }
        }
      }
  `;

  const variables = {
    username: username,
    password: password
  };

  fetchQuery(RelayEnvironment, query, variables)
    .then(data => {
      // Save token and username
      localStorage.setItem('user_token', data.user.token);
      localStorage.setItem('username', data.user.username);

      // Go to feed
      this.setState({
        user: data.user,
        goToFeed: true
      });

    });
  }

  // Sign up new user
  signup(firstname, lastname, username, email, password) {
    const variables = {
      input: {
        attributes: {
          username: username,
          fname: firstname,
          lname: lastname,
          email: email
        },
        password: password
      },
      password: password
    };
    
    const mutation = graphql`
      mutation SplashMutation(
        $input: CreateUserInput!,
        $password: String!
      ) {
        createUser(input: $input) {
          user {
            id
            username
            fname
            lname
            email
            token(password: $password)
          }
          errors
        }
      }
    `;

    commitMutation(
      RelayEnvironment,
      {
        mutation,
        variables,
        onCompleted: (response, errors) => {
          console.log("Response: ", response); // TODO --DTM-- Remove

          // Save token and username
          localStorage.setItem('user_token', response.user.token);
          localStorage.setItem('username', response.user.username);

          // TODO --DTM-- Go to feed
          // Go to feed
          this.setState({
            user: response.user,
            goToFeed: true
          });
        },
        onError: err => console.error(err),
      },
    );
  }
  
  render() {
    if (this.state.goToFeed === true) {
      return <Redirect to={`/feed`} />
    }

    return (
      <header className="App-header">
        <div className="splash">
          <div className="splash-header-container">
            <div className="splash-header">
              {/* { !(_.isEmpty(this.state.errors)) && 
                <div className="errors-alert alert alert-danger" role="alert">
                  {this.renderErrors()}
                </div>
              }
              {form} */}
            </div>
          </div>
        </div>
        {this.state.isLoggingIn ? (
          <Login login={this.login} changeForm={() => this.changeForm(false)} />
        ) : (
          <Signup signup={this.signup} changeForm={() => this.changeForm(true)} />
        )}
      </header>
    )
  }

}

export default Splash;