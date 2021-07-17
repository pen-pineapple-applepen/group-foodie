import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import styled from 'styled-components';
import axios from 'axios';
import { OrangeButton } from '/src/client/styles/shared.tsx';

async function getComments(group_id) {
  // use redux to get order id to get group_ud.
  // this is for getting all the user info in current order/group.
  // and after this, i could get all the respective comments to each user.
  axios.get(`/api/comments/${group_id}/group`)
    .then(res => {
      setComments(res)
    })
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
            <label type="name">
            {comment.name}
            </label>
            <br></br>
            <label type="text">
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
  const [chat, setChat] = React.useState(['']);
  const user = []  // incoming redux user info.

  const handlePost = (user, chat) => {
    // console.log('clicked')
    axios.post(`api/comments/${user.user_id}/create`, {
      text: chat,
      date: new Date(),
      group_id: user.group_id
    })
      .then(res => {
        console.log('create successfully');
      })
      .then(res => {
        getComments(user.group_id);
      })
      .catch(err => {
        console.log(err);
      })
  }

  React.useEffect(() => {
    // setComments([])
    // getComments()
  }, [comments]);

  return(
    <div className="chatComments" style={divStyle}>
      <form onSubmit={(e) => (e.preventDefault(), handlePost(user, chat))}>
        {displayMultiComments(comments)}
        <input type="text" placeholder="Comment here" onChange={e => {setChat(e.target.value)}}>
        </input>
        <br></br>
        <OrangeButton type="submit">Post</OrangeButton>
      </form>
    </div>
  )
};