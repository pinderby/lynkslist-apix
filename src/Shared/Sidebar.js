import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as Constants from '../Constants';

function Sidebar() {
  const [modalShow, setModalShow] = React.useState(false);
  const [user, setUser] = useState({});
  const [feedList, setFeedList] = useState([]);

  // Load user and populate feeds
  useEffect(() => {
    if (!localStorage.getItem('user_token') || 
        localStorage.getItem('user_token') === 'undefined') {

      // TODO --DTM-- Add in logic for if token is expired or absent

    } else {

      // If authed, get user and populate feeds
      getMe();
    }
  }, []);

  // TODO --DTM-- handle case where this is a reload from a blank search (don't append results)
  // Alternatively, could just separately handle the pagination case
  const getMe = () => {
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
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  };

  // Submit new feed to server
  const createFeed = (feedName, feedSearch) => {
    
    // Send API call to create feed
    if (localStorage.getItem('user_token')) {
      axios.post(`${Constants.BASE_URL}/feed`, 
        {
            'name': feedName,
            'query': feedSearch
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('user_token')
          }
        }
      )
      .then(function (response) {
        // handle success
        console.log(response);
        
        // Update feedList with new feed
        getMe()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }
  }

    // Destroy a feed on the server
    const destroyFeed = (feedId) => {

      // Logs TODO --DTM-- clean up
      console.log("destroyFeed:", feedId);
      
      // Send API call to destroy feed
      if (localStorage.getItem('user_token')) {
        axios.delete(`${Constants.BASE_URL}/feed/${feedId}`, 
          {
            headers: {
              'Authorization': localStorage.getItem('user_token')
            }
          }
        )
        .then(function (response) {
          // handle success
          console.log(response);
          
          // Update feedList with new feed
          getMe()
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      }
    }

  // TODO --DTM-- Add links (popular, trending...)
  return (
    <div className="sidebar-wrapper">
      {/* <!-- Sidebar --> */}
      <CreateFeedModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        createFeed={(feedName, feedSearch) => createFeed(feedName, feedSearch)}
      />
      <nav id="sidebar">
          <div className="sidebar-header">
              <div className="sidebar-header-title">My Feeds</div>
              <button 
                className="btn btn-primary my-2 my-sm-0"
                onClick={() => setModalShow(true)}
                >
                  +
              </button>
          </div>

          <ul className="list-unstyled components">
              {feedList.map((feed, i) => 
                <li className="sidebar-feed-li" key={i}>
                    <Link to={"/feed/"+feed.id}>{feed.name}</Link>
                    <Button
                      className="sidebar-delete-feed-btn"
                      variant="danger"
                      size="sm"
                      onClick={() => destroyFeed(feed.id)}>
                        x
                    </Button>
                </li>
              )}
          </ul>

      </nav>
      {/* <!-- Page Content --> */}
      <div id="content">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">

                  <button type="button" id="sidebarCollapse" className="btn btn-info">
                      <i className="fas fa-align-left"></i>
                      <span>Toggle Sidebar</span>
                  </button>
              </div>
          </nav>
      </div>
    </div>
  );
}

function CreateFeedModal({ onHide, createFeed, ...props }) {
  const [feedName, setFeedName] = React.useState("");
  const [feedSearch, setFeedSearch] = React.useState("");

  // TODO --DTM-- move this up to Sidebar()
  const submitFeed = (e) => {
    e.preventDefault();

    // Logs TODO --DTM-- clean up
    console.log("CreateFeedModal submitFeed:", feedName, ", ", feedSearch);

    // Submit new feed
    createFeed(feedName, feedSearch);

    // Clear input fields
    setFeedName("");
    setFeedSearch("");

    // Close modal
    onHide();
  }

  console.log("CreateFeedModal props:", props);
  return (
    <Modal
      {...props}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a Feed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="splash-form">
          <Form.Group controlId="feed_name">
              <Form.Label>Feed Name - FOR TESTING</Form.Label>
              <Form.Control 
                required
                type="feed_name" 
                placeholder="Enter Feed Name"
                value={feedName}
                onChange={e => setFeedName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="feed_search">
              <Form.Label>Feed Search - FOR TESTING</Form.Label>
              <Form.Control 
                required
                type="feed_search" 
                placeholder="Enter Search"
                value={feedSearch}
                onChange={e => setFeedSearch(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={e => submitFeed(e)}>
            Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Sidebar;
