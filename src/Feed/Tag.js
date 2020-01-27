import React from 'react';

function Tag(props) {
  // console.log("props: ", props); // TODO --DTM-- Remove
  return (
    <a href="#" className="tag-badge badge badge-pill badge-light">#{props.tag.name}</a>
  );
}

export default Tag;