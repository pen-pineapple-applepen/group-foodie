import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Form, Image, Navbar } from 'react-bulma-components';
import { useHistory } from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css';

// interfaces
interface profileImageProps {
  src: string,
  size?: number,
}
interface orangeNavbarProps {
  needBackArrow?: boolean,
  onBackArrowClick?: () => void,
}
interface plusButtonProps {
  onClick?: () => void,
  size: number,
}
interface minusButtonProps {
  onClick?: () => void,
  size: number,
}
interface backArrowProps {
  onClick?: () => void,
}
interface HeaderImageProps {
  src: string,
}

// utility subcomponents to create larger components
const SizedImage = styled(Image)`
`
const OrangeNavbarContainer = styled(Navbar)`
  background-color: #FF6C36;
  height: 60px;
  border-radius: 0 0 22px 22px;
`
// const OrangeNavbarContainer = styled(Navbar)`
//   background-color: #FF6C36;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 60px;
//   border-radius: 0 0 22px 22px;
// `
const NavbarBrand = styled(Navbar.Brand)`
  display: flex;
  justify-content: center;
`
const NavbarItem = styled(Navbar.Item)`
  display: flex;
`
const NavbarBurger = styled(Navbar.Burger)`
  padding-left: 120px;
  color: white;
`
const BackArrowContainer = styled(Icon)`
  padding-right: 65px;
`
const GroupFoodieLogo = styled.p`
  &:hover {
    cursor: pointer;
  }
  color: white;
`
const PlusButtonContainer = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
  color: #FF6C36;
`
const MinusButtonContainer = styled(Icon)`
  &:hover {
    cursor: pointer;
  }
  color: #FF6C36;
`
const HeaderImageContainer = styled.div`
  width: 100%;
  padding-bottom: 150px;
`
const HeaderImageImg = styled.div<HeaderImageProps>`
  background-image: url(${props => props.src});
  position: absolute;
  top: -50px;
  width: 100vw;
  height: 250px;

`

/////////////////////////
/* exported components */
/////////////////////////

export const OrangeButton = styled(Button)`
  background-color: #FF6C36;
  border-radius: 30px;
  color: white;
  margin-top: 20px;
`
export const OrangeInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #FF6C36;
  &:focus {
    outline: none;
    border-bottom: 1px solid #2e6bbb
  }
`

/////////////////////////////////////
/* exported complete JSX components*/
/////////////////////////////////////

// navbar takes 2 props 'needBackArrow' that takes a boolean for if it should have a back arrow or not
// and 'onBackArrowclick' which takes a callback for when back arrow is clicked
export const OrangeNavbar: (props: orangeNavbarProps) => JSX.Element = ({ needBackArrow, onBackArrowClick }) => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  }
  return (
    <>
      {/* <OrangeNavbarContainer className="is-fixed-top">
        <NavbarBrand>
          <NavbarItem>
            {needBackArrow ? <BackArrow onClick={onBackArrowClick} /> : <BackArrowContainer />}
          </NavbarItem>
          <NavbarItem>
            <GroupFoodieLogo>
              Group Foodie
            </GroupFoodieLogo>
          </NavbarItem>
          <NavbarBurger className="is-size-2" />
        </NavbarBrand>
      </OrangeNavbarContainer> */}
      <OrangeNavbarContainer className="is-fixed-top" active={active}>
        <NavbarBrand>
          <NavbarItem>
            {needBackArrow ? <BackArrow onClick={onBackArrowClick} /> : <BackArrowContainer />}
          </NavbarItem>
          <NavbarItem>
            <GroupFoodieLogo>
              Group Foodie
            </GroupFoodieLogo>
          </NavbarItem>
          <NavbarBurger
            onClick={toggleMenu} />
        </NavbarBrand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item>Account</Navbar.Item>
            <Navbar.Item>Your Orders</Navbar.Item>
            <Navbar.Item>Log Out</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </OrangeNavbarContainer></>
  )
}

// header image takes one prop 'src'
export const HeaderImage: (props: HeaderImageProps) => JSX.Element = ({src}) => {
  return (
    <HeaderImageContainer>
      <HeaderImageImg src={src}/>
    </HeaderImageContainer>
  )
}

// profile image takes 2 props 'src' and '[size]'. If size is not provided, defaults to 64
export const ProfileImage: (props: profileImageProps) => JSX.Element = ({ src, size }) => {
  return (
    <SizedImage src={src} rounded={true} fullwidth={false} size={size || 64} />
  )
}

// BackArrow takes 1 prop 'onClick' and behaves the same way that a normal JSX element's 'onClick' would behave
export const BackArrow: (props: backArrowProps) => JSX.Element = ({ onClick }) => {
  return (
    <BackArrowContainer onClick={onClick}>
      <i className="fas fa-angle-left has-text-white-ter is-size-4" />
    </BackArrowContainer>
  )
}

// prop 'size' takes any number from 1 to 6, 1 being the largest.
export const PlusButton: (props: plusButtonProps) => JSX.Element = ({ onClick, size }) => {
  return (
    <PlusButtonContainer onClick={onClick}>
      <i className={`fas fa-plus-circle is-size-${size || 3}`} />
    </PlusButtonContainer>
  )
}

// prop 'size' takes any number from 1 to 6, 1 being the largest.
export const MinusButton: (props: minusButtonProps) => JSX.Element = ({ onClick, size }) => {
  return (
    <MinusButtonContainer onClick={onClick}>
      <i className={`fas fa-plus-circle is-size-${size || 3}`} />
    </MinusButtonContainer>
  )
}