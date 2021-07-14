import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const nameText = styled.span`

`;

const Profile = (props) => {
  // create state for user in redux store
  // user has a name?, email, password, username, guest status
  // user has
    // firstName
    // lastName
    // email
    // username
    // guest status
    // friends array
    // orders array

  // order objects in the array should have
    // food name
    // quantity
    // price
    // date
  const currentUser = useAppSelector((state) => state.currentUser);

  return (
    <ProfileDiv>
      <OrangeNavbar needBackArrow={true}/>
      <nameText>firstName lastName</nameText>
      <OrangeButton>View Orders</OrangeButton>
      <OrangeButton>Friends</OrangeButton>
    </ProfileDiv>
  );
};

export default Profile;
