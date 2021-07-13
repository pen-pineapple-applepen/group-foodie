import React from 'react'
import { Navbar, Columns } from 'react-bulma-components';
import styled from "styled-components";
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../styles/shared';

const LandingPage = () => {
  const StyledButton = styled.button`
  background-color: #FF6C36;
  border-radius: 7px;
  font-size: 32px;
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


  return (
    <div>
      <OrangeNavbar needBackArrow={true}/>
      <StyledContainer>
          <StyledGreeting>
            Welcome, Bob Smith!
          </StyledGreeting>
          <StyledButton>
            Create Order
          </StyledButton>
      </StyledContainer>
    </div>
  )
}

export default LandingPage;
