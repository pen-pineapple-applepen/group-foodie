import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';

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

const ListItem = styled.li`
  display: flex;
`;

const ProfilePic = styled.span`
  margin-right: 10px;
`;

const FriendsList = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  return (
    <FriendsListDiv>
      <OrangeNavbar needBackArrow={true} />
      <Text>Your Friends</Text>
      <List>
        <ListItem>
          <ProfilePic>fake image</ProfilePic>
          <span>friend 1</span>
        </ListItem>
        <ListItem>
          <ProfilePic>fake image</ProfilePic>
          <span>friend 2</span>
        </ListItem>
        <ListItem>
          <ProfilePic>fake image</ProfilePic>
          <span>friend 3</span>
        </ListItem>
      </List>
    </FriendsListDiv>
  );
};

export default FriendsList;
