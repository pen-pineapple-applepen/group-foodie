import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import allActions from '/src/client/state/actions/allActions.js';

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
  const [userInfo, setUserInfo] = useState();
  const dispatch = useAppDispatch();

  const getUserData = async () => {
    try {
      // const userId = useAppSelector((state) => state.loginDetails.userId);
      const userId = 1;
      const res = await axios.get(`/api/users/${userId}`);
      // console.log(res.data);

      dispatch(allActions.setCurrentUser(res.data));

      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ProfileDiv>
      <OrangeNavbar needBackArrow={true} onBackArrowClick={useHistory().goBack} />
      {userInfo && <NameText>{`${userInfo.first_name} ${userInfo.last_name}`}</NameText>}
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
