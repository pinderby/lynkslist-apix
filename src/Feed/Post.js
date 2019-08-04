import React from 'react';
import moment from 'moment';
import Tag from './Tag';

function Post(props) {
  console.log("props: ", props); // TODO --DTM-- Remove

  let imageContainer = "", hasImg = false;
  if (props.post.visual.url != "none") {
    hasImg = true;
    imageContainer = 
      <div className="img-container col-md-4">
        <a href={props.post.canonicalUrl} >
          <img src={props.post.visual.url} className="card-img-top" alt="..." />
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
              <a href={props.post.canonicalUrl}>{props.post.title}</a>
            </h5>
            <small class="text-muted">
              <a href={props.post.origin.htmlUrl}>{props.post.origin.title}</a>
              &nbsp;•&nbsp;
              Published&nbsp;{moment(props.post.crawled).fromNow()}
            </small>
            <p className="post-summary card-text">{props.post.summary.content}</p>
            <div className="tags-container">
              {props.post.keywords.map((tag, i) => 
                <Tag key={i} tag={tag} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
