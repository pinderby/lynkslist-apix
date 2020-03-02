import React, { useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import Post from './Post';
import axios from 'axios';
// TODO --DTM-- Remove when no longer used
import data from '../test_data.json';

function Feed() {
  const BASE_URL = 'http://localhost:4567';
  const pageSize = 10;
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  const searchPosts = () => {
    // Set isLoading to true to trigger loading state
    setIsLoading(true);

    // Clear postList for new search query
    setPostList([]);

    // Split search input up by spaces, trim and ignore multiple spaces
    let searchInputArray = searchInput.trim().split(/\s+/);

    // Define arrays for tags and search terms separately
    let tagsArray = new Array(), searchTermsArray =  new Array();

    // Iterate through search input array
    for(var i = 0; i < searchInputArray.length; i++) {
      
      // If element is a tag, push to tagsArray
      if (searchInputArray[i][0] == '#') {
        tagsArray.push(searchInputArray[i].substring(1));
      
      // If element is not a tag, push to searchTermsArray
      } else {
        searchTermsArray.push(searchInputArray[i]);
      }
    }

    // Join search terms into single string for query
    let searchTerms = searchTermsArray.join(" ");

    // Execute a search query for the news feed
    // If search is empty, query stock feed
    if (!searchTerms && tagsArray.length == 0) {
      loadInitialFeed();
    
    // If search is not empty execute search
    } else {
      axios.get(`${BASE_URL}/api/search`, {
        params: {
          's': searchTerms,
          'tags': tagsArray,
          'page[number]': page,
          'page[size]': pageSize
        }
      })
        .then(function (response) {
          // handle success
          console.log(response);
          
          // Update postList with new posts
          setPostList([...response.data.data]);
          
          // Set isLoading to false to clear loading state
          setIsLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
  };

  // Load stock feed only on initial load
  useEffect(() => {
    loadInitialFeed();
  }, []);

  // TODO --DTM-- handle case where this is a reload from a blank search (don't append results)
  // Alternatively, could just separately handle the pagination case
  const loadInitialFeed = () => {
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
  };

  return (
    <div>
      <Navbar />
      <div className="feed-container container">
        <form className="form-inline feed-search" onSubmit={handleSubmit}>
          <input 
            className="form-control mr-sm-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)} />
          <button 
            className="btn btn-outline-success my-2 my-sm-0" 
            onClick={searchPosts}
            type="submit">
              Search
          </button>
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
