import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import styled from 'styled-components';
import axios from 'axios';
import { OrangeButton, OrangeInput } from '/src/client/styles/shared.tsx';


const divStyle = {
  scrollBehaviour: 'smooth',
  overflowY: 'scroll',
  height: "400px"
};

const commentDivStyle = {
  border: "solid 1px",
  borderRadius: "5px",
  borderColor: "rgb(255, 94, 38)",
  padding: "4px",
  margin: "2px"
}


const displayMultiComments = (comments) => {
  return(
    <>
      {comments.map((comment, index) => {
        return (
          <div className="commentDiv" key={index} style={commentDivStyle}>
            <label type="name">
            User ID: {comment.user_id}
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
  const [comments, setComments] = React.useState([]);
  const [chat, setChat] = React.useState(['']);
  const [posted, setPosted] = React.useState(1);
  const currentGroupId = useAppSelector(state => state.currentGroup)
  const currentUserId = useAppSelector(state => state.loginDetails.userId)

  const handlePost = (userId, groupId, chat) => {
    // console.log('clicked')

    // Hard code here
    axios.post(`api/comments/${9}/create`, {
      text: chat,
      date: new Date(),
      group_id: 1
    })
      .then(res => {
        console.log('create successfully');
      })
      .then(res => {
        // getComments(groupId);
        setPosted(posted + 1);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getComments(group_id) {
    // use redux to get order id to get group_ud.
    // this is for getting all the user info in current order/group.
    // and after this, i could get all the respective comments to each user.
    // console.log('workd?');
    axios.get(`/api/comments/${group_id}/group`)
      .then(res => {
        setComments(res.data);
      })
  }

  React.useEffect(() => {
    // getComments(currentGroupId)
    getComments(1); // Hard code
  }, [posted]);


  return(
    <div className="chatComments" style={divStyle}>
      <form onSubmit={(e) => (e.preventDefault(), handlePost(currentUserId, currentGroupId ,chat))}>
        {displayMultiComments(comments)}
        <input type="text" placeholder="Comment here" onChange={e => {setChat(e.target.value)}}>
        </input>
        <br></br>
        <OrangeButton type="submit">Post</OrangeButton>
      </form>
    </div>
  )
};