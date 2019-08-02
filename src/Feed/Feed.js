import React from 'react';
import Navbar from '../Shared/Navbar';
import Post from './Post';
import data from '../test_data.json';

function Feed() {
  return (
    <div>
      <Navbar />
      <div className="feed-container container">
        <form className="form-inline feed-search">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div className="feed-content-container">
          {data.posts.map((post, i) => 
            <Post key={i} post={post} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
