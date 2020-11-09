import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Splash from './Splash/Splash';
import Feed from './Feed/Feed';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Splash} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/feed/:feedId" component={Feed} />
      </div>
    </Router>
  );
}

export default App;
