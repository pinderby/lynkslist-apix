import React from 'react';
import moment from 'moment';
import Tag from './Tag';

function Post(props) {
  console.log("props: ", props); // TODO --DTM-- Remove
  const post = props.post

  let imageContainer = "", hasImg = false;
  if (post.visual) {
    // TODO --DTM-- update with imgurl
    hasImg = true;
    imageContainer = 
      <div className="img-container col-md-4">
        <a href={post.attributes.origin} >
          <img src={post.visual.url} className="card-img-top" alt="..." />
        </a>
      </div>;
  }
  
  return (
    <div className="post-card card mb-3">
      <div className="row no-gutters">
        {imageContainer}
        <div className={hasImg ? "col-md-8" : "col-md-12"}>
          <div className="card-body">
            <h5 className="card-title">
              <a href={post.attributes.origin}>{post.attributes.title}</a>
            </h5>
            <small class="text-muted">
              {/* TODO --DTM-- Update with origin data */}
              {/* <a href={post.origin.htmlUrl}>{post.origin.title}</a> */}
              {/* &nbsp;•&nbsp; */}
              Published&nbsp;{moment(post.attributes.published).fromNow()}
            </small>
            {/* TODO --DTM-- Update not to use dangerouslySetInnerHTML */}
            <p className="post-summary card-text" dangerouslySetInnerHTML={{__html: post.attributes.summary}}></p>
            <div className="tags-container">
              {/* TODO --DTM-- Update with tags */}
              {/* {props.post.keywords.map((tag, i) => 
                <Tag key={i} tag={tag} />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
