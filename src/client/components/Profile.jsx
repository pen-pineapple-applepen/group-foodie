import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = (props) => {
  // create state for user in redux store
  // user has a name?, email, password, username, guest status

  return (
    <ProfileDiv>
      <Button>View Orders</Button>
      <Button>Friends</Button>
    </ProfileDiv>
  );
};

export default Profile;
