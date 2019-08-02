import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from '../Shared/Navbar';

function Feed() {
  return (
    <div className="Feed">
      <Navbar />
      Feed
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  );
}

export default Feed;
