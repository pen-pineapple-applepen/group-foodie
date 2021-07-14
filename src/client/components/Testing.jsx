import React from 'react';
import { Link } from 'react-router-dom'

function Testing() {

  return (
    <div>
      We are at testing 1!
      <div>
        <Link to={`/testing2`} className="button muted-button">
          Testing 2
        </Link>
        <Link to={`/testing4`} className="button muted-button">
          Testing 4
        </Link>
      </div>
    </div>
  )
}

export default Testing;
