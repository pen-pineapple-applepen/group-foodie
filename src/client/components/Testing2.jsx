import React from 'react';
import { Link, useHistory } from 'react-router-dom'

function Testing2() {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <div>
      We are at testing 2!
      <div>
        <Link to={`/testing1`} className="button muted-button">
          Testing 1
        </Link>
        <Link to={`/testing4`} className="button muted-button">
          Testing 4
        </Link>
      </div>
      <button type="button" onClick={goBack}>
        Go back
      </button>
    </div>
  )
}

export default Testing2;
