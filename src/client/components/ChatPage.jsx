import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  background-image: url('BG_Wood.png');
`;

const divStyle = {
  scrollBehaviour: 'smooth',
  overflowY: 'scroll',
  height: "200px"
};

const imgStyle = {
  height: "60px"
}


const displayMultiComments = () => {
  // comments from another components
  let comments = [];
  console.log("text here", comments);
  return(
    <div>
      {comments.map((index, comment) => {
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
    </div>
  );
};

async function getComments() {
  // use redux to get order id to get group_ud.
  // this is for getting all the user info in current order/group.
  // and after this, i could get all the respective comments to each user.

  return (
    <div>
      <form>
        <label>
         Bob Smith
        </label>
        <br></br>
        <label>
         Comments here. The food is delicious!
        </label>
        <br></br>
        <label>
          More comments are coming...
        </label>
      </form>
      <form>
        {/* {displayMultiComments(comments)} */}
      </form>
    </div>
  )
}


const postComment = () => {
  return (
    <div>
      <input type="text" placeholder="Comment here">
      </input>
      <br></br>
      <button>Post</button>
    </div>
  )
};


const orderDiv = () => {

  // const group_id = await useAppSelector('');

  // let incomingGroupInfoFromLiveConfirmationPage = {};
  // incomingGroupInfoFromLiveConfirmationPage.image = "tempData";
  // incomingGroupInfoFromLiveConfirmationPage.restaurantName = "Danny's";
  // incomingGroupInfoFromLiveConfirmationPage.date = 'DD/MM/YYYY';
  // incomingGroupInfoFromLiveConfirmationPage.numberOfUsers = 3;

  return(
    <div className="orderName">
      This is in orderDiv.
      <div>
        <p>Current Order</p>
      </div>
      <div>
        <div>
        {/* <img className="restaurantImg" src={incomingGroupInfoFromLiveConfirmationPage.image}></img> */}
        <img className="restaurantImg" src={"Dannys_bg.png"} style={imgStyle}></img>

        </div>
        <div>
          {/* <p>{incomingGroupInfoFromLiveConfirmationPage.restaurantName} Danny's</p>
          <p>{incomingGroupInfoFromLiveConfirmationPage.date} DD/MM/YYYY</p>
          <p>{incomingGroupInfoFromLiveConfirmationPage.numberOfUsers} People</p> */}
          <p>Danny's</p>
          <p>DD/MM/YYYY</p>
          <p>3 People</p>
        </div>

      </div>

    </div>
  )
};

const chatDiv = () => {
  return (
    <div>
      <div className="chatComments" style={divStyle}>
        This is in chat div.
        {/* {getComments()} */}
        <p>Bob</p>
        <p>I dont like it.</p>
        <p>Cat</p>
        <p>how about you rick?</p>
        <p>Rick</p>
        <p>Hmm, I need to think about it.</p>
        <p>Bob</p>
        <p>ok. Take your time</p>
        <p>Cat</p>
        <p>Maybe we can choose another one</p>
        <p>Rick</p>
        <p>Do we have any other choice?</p>
        <p>Morty</p>
        <p>Of course not</p>
      </div>
    </div>
  )
};


export default function ChatPage () {
  const [comments, setComments] = React.useState([{"name":"bob", "text":"Test1"},{"name":"cat", "text":"Test2"},{"name":"dog", "text":"Test3"}]);

  // React.useEffect(() => {
  //   // waiting for further data loaded
  //   // setComments(getComments(comments));

  // }, [comments])

  if (comments.length !== undefined) {
    return (
      <Container className="chatPage-background">
        <div style={{margin: 'auto'}}>
          {orderDiv()}
          <hr></hr>
          {chatDiv()}
          {/* {getComments(comments)} */}
          <hr></hr>
          {postComment()}
        </div>
      </Container>
    );
  } else {
    return (
      <div>

      </div>
    )
  }
};
