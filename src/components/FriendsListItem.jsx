import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Dot = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #FF6C36;
  margin-right: 10px;
`;

const FriendsListItem = (props) => {
  const { friend } = props;

  return (
    <ListItem>
      <Dot />
      <span>{`${friend.first_name} ${friend.last_name}`}</span>
    </ListItem>
  );
};

export default FriendsListItem;
