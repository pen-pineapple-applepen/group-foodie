import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import styled from 'styled-components';
import axios from 'axios';

async function getComments() {
  // use redux to get order id to get group_ud.
  // this is for getting all the user info in current order/group.
  // and after this, i could get all the respective comments to each user.

}

const divStyle = {
  scrollBehaviour: 'smooth',
  overflowY: 'scroll',
  height: "200px"
};

const displayMultiComments = (comments) => {
  // comments from another components
  console.log("text here", comments);
  return(
    <>
      {comments.map((comment, index) => {
        return (
          <div key={index}>
            <label>
            {comment.name}
            </label>
            <br></br>
            <label>
            {comment.text}
            </label>
          </div>
        )
      })}
    </>
  );
};

export default function ChatComments (props) {
  const [comments, setComments] = React.useState([{"name":"Bob Smith", "text":"Test1"},{"name":"Cat Walker", "text":"Test2"},{"name":"Doge Coin", "text":"Test3"}]);

  React.useEffect(() => {
    // setComments([])
  }, [comments]);

  return(
    <div className="chatComments" style={divStyle}>
      <form>
        {displayMultiComments(comments)}
      </form>
    </div>
  )
};