import React from 'react';
import { Link, useHistory } from 'react-router-dom'

function Testing4() {
  const history = useHistory();

  function handleHomeClick() {
    history.push("/home");
  }
  function handleTesting2() {
    history.push("/testing2");
  }
  return (
    <div>
      We are at testing 4!
      <div>
        <button onClick={handleHomeClick} >Go to Home 1</button>
        <button onClick={handleTesting2}>Go to Testing 2</button>
      </div>
    </div>
  )
}

export default Testing4;
