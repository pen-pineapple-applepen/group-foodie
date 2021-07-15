import * as React from 'react';
import { useState, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import styled from 'styled-components';
import axios from 'axios';


const Container = styled.div`
  display: flex;
`;

const getOrder = () => {
  const group_id = useAppSelector();
}

const orderDiv = () => {
  return (
    <div>
      <div>
        This is in orderDiv.

      </div>
    </div>
  )
};

const chatDiv = () => {
  return (
    <div>
      <div>
        This is in chat div.
      </div>
    </div>
  )
};

const getComments = () => {
  // axios.get('/endpoint');
  // using a map to iterate all users and comments

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

export default function ChatPage () {
  const [comments, setComments] = useState(['']);

  useEffect(() => {
    // waiting for further data loaded
  }, [comments])

  return (
    <Container>
      <div>
        {orderDiv()}
        <hr></hr>
        {chatDiv()}
        {getComments()}
        <hr></hr>
        {postComment()}
      </div>
    </Container>
  );
};