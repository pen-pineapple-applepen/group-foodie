import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import { useHistory } from 'react-router-dom';
import FriendsListItem from './FriendsListItem';
import axios from 'axios';

const FriendsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  margin-top: 50px;
  margin-bottom: 25px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const FriendsList = (props) => {
  const userInfo = useAppSelector((state) => state.currentUser);
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const res = await axios.get(`/users/${userInfo.id}/friends`);
    setFriends(res.data);
  };

  useEffect(() => {
    getFriends();
  }, [userInfo]);

  return (
    <FriendsListDiv>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={useHistory().goBack} />
      <Text>Your Friends</Text>
      <List>
        {friends.map((friend) => <FriendsListItem friend={friend} key={friend.id} />)}
      </List>
    </FriendsListDiv>
  );
};

export default FriendsList;
