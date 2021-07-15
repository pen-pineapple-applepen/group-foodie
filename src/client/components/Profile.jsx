import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import { Link, useHistory } from 'react-router-dom';

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameText = styled.span`
  margin-top: 50px;
  margin-bottom: 25px;
`;

const SpacedButton = styled(OrangeButton)`
  margin: 25px 0;
`;

const Profile = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  return (
    <ProfileDiv>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={useHistory().goBack} />
      <NameText>firstName lastName</NameText>
      <Link to="/history">
        <SpacedButton>View Orders</SpacedButton>
      </Link>
      <Link to="/friends">
        <SpacedButton>Friends</SpacedButton>
      </Link>
    </ProfileDiv>
  );
};

export default Profile;
