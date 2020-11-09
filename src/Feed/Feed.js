import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import Post from './Post';
import axios from 'axios';
import * as Constants from '../Constants';
// TODO --DTM-- Remove when no longer used
import data from '../test_data.json';

function Feed(props) {
  console.log("props: ", props); // TODO --DTM-- Remove
  const BASE_URL = 'http://localhost:4567';
  const pageSize = 10;
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bounceToSplash, setBounceToSplash] = useState(false);
  const [user, setUser] = useState({});
  const [selectedFeed, setSelectedFeed] = useState({});
  const [feedList, setFeedList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const loadMorePosts = () => {
    setPage(page + 1);
  };

  const searchPosts = (query) => {
    // Set isLoading to true to trigger loading state
    setIsLoading(true);

    // Clear postList for new search query
    setPostList([]);

    // Split search input up by spaces, trim and ignore multiple spaces
    let searchInputArray = query.trim().split(/\s+/);

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
    // If search is empty, query stock feed or feed from URL
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
    if (!localStorage.getItem('user_token') || 
        localStorage.getItem('user_token') === 'undefined') {
      
      // Bounce to Splash
      setBounceToSplash(true);

      // TODO --DTM-- Add in logic for if token is expired

    } else {

      // If authed, load feed
      // Check if feedId is in params
      // If yes, load that feed
      // If not, load inital feed
      if (props.match.params.hasOwnProperty('feedId')) {
        loadFeedbyId(props.match.params.feedId);
      } else {
        loadInitialFeed();
      }
    }
  }, [props]);

  // TODO --DTM-- handle case where this is a reload from a blank search (don't append results)
  // Alternatively, could just separately handle the pagination case
  const loadInitialFeed = () => {
    // Make a request for the news feed
    axios.get(`${BASE_URL}/api/front`, {
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

  const loadFeedbyId = (feedId) => {
    // Make a request for the selected feed
    // First get "me"
    getMe(feedId)
    // axios.get(`${BASE_URL}/me`, {
    //   headers: {
    //     authorization: localStorage.getItem('user_token')
    //   }
    // })
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     // setPostList([...postList, ...response.data.data]);
    //     // setIsLoading(false);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
  };

  const getMe = (feedId) => {
    // GET user
    axios.get(`${Constants.BASE_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('user_token')
      }
    })
    .then(function (response) {
      // handle success
      console.log(response);
      
      // Update user and feed list
      setUser(response.data.data.attributes);
      setFeedList(response.data.data.attributes.feeds);

      // If feedId exists, load that feed
      if (typeof(feedId) != "undefined") {
        response.data.data.attributes.feeds.forEach(feed => {
          console.log("feed: ", feed)
          if(feed.id == feedId) {
            selectFeed(feed);
          }
        });
      }

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  };

 const selectFeed = (feed) => {
    // Set selected feed and search input
    setSelectedFeed(feed);
    setSearchInput(feed.query);

    // Send search call
    searchPosts(feed.query);
 }

  if (bounceToSplash) {
    return <Redirect to={`/`} />;
  } else {
    return (
      <div>
        <Navbar />
        <Sidebar />
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
              onClick={() => searchPosts(searchInput)}
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
}

export default Feed;
