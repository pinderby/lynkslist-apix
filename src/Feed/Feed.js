import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import Post from './Post';
import axios from 'axios';
// TODO --DTM-- Remove when no longer used
import data from '../test_data.json';

function Feed() {
  const BASE_URL = 'http://localhost:4567';
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // Make a request for the news feed
    axios.get(`${BASE_URL}/api/feed`, {
      params: {
        'page[number]': page,
        'page[size]': pageSize
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
        setPostList([...postList, ...response.data.data]);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [page]);

  return (
    <div>
      <Navbar />
      <div className="feed-container container">
        <form className="form-inline feed-search">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div className="feed-content-container">
          {isLoading && <p>Loading news...</p>}

          {postList.map((post, i) => 
            <Post key={i} post={post} />
          )}
        </div>
        {postList.length !== 0 && (
          <button 
            className="btn btn-outline-success my-2 my-sm-0" 
            onClick={loadMorePosts}>
              Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default Feed;
