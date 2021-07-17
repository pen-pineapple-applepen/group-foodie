import React, { useState, useEffect } from 'react';
import { Navbar, Columns } from 'react-bulma-components';
import styled from "styled-components";
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../../styles/shared';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'

const StyledButton = styled(OrangeButton)`
top: 70%;
position: absolute;
`;
const StyledGreeting = styled.p`
font-size: 32px;
top: 40%;
position: absolute;
`;
const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;


const LandingPage = () => {
  const history = useHistory()

  const handleCreateOrder = () => {
    history.push('/Restaurants')
  }

  const goBack = () => {
    history.goBack()
  }

  const userInfo = useSelector((state) => state.currentUser);

  return (
    <div className="login-signup-background">
      <OrangeNavbar needBackArrow={true} onBackArrowClick={goBack} />
      <StyledContainer>
        <StyledGreeting>
          Welcome, {userInfo.first_name} {userInfo.last_name}!
        </StyledGreeting>
        <StyledButton onClick={handleCreateOrder}>
          Create Order
        </StyledButton>
      </StyledContainer>
    </div>
  )
}

export default LandingPage;