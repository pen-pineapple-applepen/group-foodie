import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
`;

const ProfilePic = styled.span`
  margin-right: 10px;
`;

const FriendsListItem = (props) => {
  const { friend } = props;

  return (
    <ListItem>
      <ProfilePic>fake image</ProfilePic>
      <span>{`${friend.first_name} ${friend.last_name}`}</span>
    </ListItem>
  );
};

export default FriendsListItem;
