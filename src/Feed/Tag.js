import React from 'react';

function Tag(props) {
  return (
    <a href="#" class="tag-badge badge badge-pill badge-light">#{props.tag}</a>
  );
}

export default Tag;