import React from 'react';

function Post(props) {
  console.log("props: ", props); // TODO --DTM-- Remove
  // TODO --DTM-- Rewrite to be horizontal: https://getbootstrap.com/docs/4.3/components/card/#horizontal
  return (
    <div className="post-card card mb-3">
      <a href={props.post.post_source_url} ><img src={props.post.post_image_url} className="post-card-img card-img-top" alt="..." /></a>
      <div className="card-body">
        <h5 className="card-title">
          <a href={props.post.post_source_url}>{props.post.post_title}</a>
        </h5>
        <div className="post-card-publisher">
          <p className="card-text">
            <img src={props.post.publisher_icon_url} className="publisher-icon-img card-img-top" alt="..." />
            <small class="text-muted"><a href={props.post.publisher_url}>{props.post.publisher}</a></small>
          </p>
        </div>
        <p className="card-text">
          {props.post.post_snippet}
        </p>
        <p className="card-text">
        </p>
      </div>
      <div className="card-footer">
        <small className="text-muted float-left">{props.post.posted_at}</small>
        <small className="text-muted float-right">{props.post.post_reactions} Reactions • {props.post.post_comments} Comments • {props.post.post_shares} Shares</small>
      </div>
    </div>
  );
}

export default Post;
