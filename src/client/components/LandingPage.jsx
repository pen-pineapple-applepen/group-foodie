import React from 'react'
import { Navbar, Columns } from 'react-bulma-components';
import styled from "styled-components";

const LandingPage = () => {
  const StyledButton = styled.button`
  background-color: #FF6C36;
  border-radius: 7px;
  font-size: 32px;
  top: 70%;

`;
  const StyledGreeting = styled.p`
  font-size: 32px;
  top: 40%;
`;
  const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


  return (
    <div>
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item href="#">
              <Navbar.Link >First</Navbar.Link>
              <Navbar.Dropdown>
                <Navbar.Item href="#">Subitem 1</Navbar.Item>
                <Navbar.Item href="#">Subitem 2</Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item href="#">After divider</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
            <Navbar.Item href="#">Second</Navbar.Item>
          </Navbar.Container>
          <Navbar.Container align="end">
            <Navbar.Item href="#">At the end</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
      <StyledContainer>
        <div>
          <StyledGreeting>
            Welcome, Bob Smith!
          </StyledGreeting>
        </div>
        <div>
          <StyledButton>
            Create Order
          </StyledButton>
        </div>
      </StyledContainer>
    </div>
  )
}

export default LandingPage;
