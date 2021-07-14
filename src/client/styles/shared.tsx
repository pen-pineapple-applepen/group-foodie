import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Form, Image, Navbar } from 'react-bulma-components';
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

interface backArrowProps {
  onClick?: () => void,
}

// utility subcomponents to create larger components
const SizedImage = styled(Image)`
`
const OrangeNavbarContainer = styled(Navbar)`
  background-color: #FF6C36;
  display: flex;
  justify-content: center;
  align-items: center;
`
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
  color: white;
`


   /* exported components */

export const OrangeButton = styled(Button)`
  background-color: #FF6C36;
  border-radius: 30px;
  color: white;
  margin-top: 20px;
`
// navbar takes 2 props 'needBackArrow' that takes a boolean for if it should have a back arrow or not
// and 'onBackArrowclick' which takes a callback for when back arrow is clicked
export const OrangeNavbar: (props: orangeNavbarProps) => JSX.Element = ({needBackArrow, onBackArrowClick}) => {
  return(
    <OrangeNavbarContainer className="is-fixed-top">
      <NavbarBrand>
        <NavbarItem>
          {needBackArrow ? <BackArrow onClick={onBackArrowClick}/> : <BackArrowContainer/>}
        </NavbarItem>
        <NavbarItem>
          <GroupFoodieLogo>
            Group Foodie
          </GroupFoodieLogo>
        </NavbarItem>
      <NavbarBurger/>
      </NavbarBrand>
    </OrangeNavbarContainer>
  )
}

// profile image takes 2 props 'src' and '[size]'. If size is not provided, defaults to 64
export const ProfileImage: (props: profileImageProps) => JSX.Element = ({src, size}) => {
  return(
    <SizedImage src={src} rounded={true} fullwidth={false} size={size || 64}/>
  )
}

// BackArrow takes 1 prop 'onClick' and behaves the same way that a normal JSX element's 'onClick' would behave
export const BackArrow: (props: backArrowProps) => JSX.Element = ({onClick}) => {
  return (
    // <BackArrowContainer>
    //   <Image src="backArrow.png" alt="back-arrow" size={16} onClick={onClick}/>
    // </BackArrowContainer>
    <BackArrowContainer>
      <i className="fas fa-angle-left has-text-white-ter is-size-4"/>
    </BackArrowContainer>
  )
}
