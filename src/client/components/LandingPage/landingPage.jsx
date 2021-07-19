import React, { useState, useEffect } from 'react';
import { Navbar, Columns } from 'react-bulma-components';
import styled from "styled-components";
import { BackArrow, ProfileImage, OrangeButton, OrangeNavbar } from '../../styles/shared';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`

const StyledButton = styled(OrangeButton)`
  margin-top: 120px;
`;
const AnimatedContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledGreeting = styled.p`
font-size: 32px;

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

  //animation stuff
  const pageVariants = {
    initial: {
      opacity: 0,
      // scaleY: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeIn',
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.1,
        type: 'tween',
      }
    },
  }

  return (
    <PageContainer>
      <OrangeNavbar needBackArrow={false}/>
      <AnimatedContainer className="login-signup-background"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <StyledContainer>
          <StyledGreeting>
            Welcome, {userInfo.first_name} {userInfo.last_name}!
          </StyledGreeting>
          <StyledButton onClick={handleCreateOrder}>
            Create Order
          </StyledButton>
        </StyledContainer>

      </AnimatedContainer>
    </PageContainer>
  )
}

export default LandingPage;