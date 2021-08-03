import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import allActions from '../state/actions/allActions';

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
  const userInfo = useAppSelector((state) => state.currentUser);

  return (
    <ProfileDiv>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={useHistory().goBack} />
      <NameText>{`${userInfo.first_name} ${userInfo.last_name}`}</NameText>
      <Link to="/friends">
        <SpacedButton>Friends</SpacedButton>
      </Link>
      <SpacedButton>Payments</SpacedButton>
      <SpacedButton>Login & security</SpacedButton>
    </ProfileDiv>
  );
};

export default Profile;
