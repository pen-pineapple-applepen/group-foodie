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
`
const NavbarItem = styled(Navbar.Item)`
  display: flex;
`
const BackArrowContainer = styled(Icon)`
`

   /* exported components */

export const OrangeButton = styled(Button)`
  background-color: #FF6C36;
  border-radius: 30px;
  color: white;
`
// navbar takes one prop 'needBackArrow' that takes a boolean for if it should have a back arrow or not
export const OrangeNavbar: (props: orangeNavbarProps) => JSX.Element = ({needBackArrow}) => {
  return(
    <OrangeNavbarContainer className="is-fixed-top">
        <NavbarItem>
          {needBackArrow && <BackArrow/>}
        </NavbarItem>
        <NavbarItem>
          <p> Group Foodie</p>
        </NavbarItem>
      <Navbar.Burger/>
    </OrangeNavbarContainer>
  )
}

// profile image takes 2 props 'src' and '[size]'. If size is not provided, defaults to 64
export const ProfileImage: (props: profileImageProps) => JSX.Element = ({src, size}) => {
  return(
    <SizedImage src={src} rounded={true} fullwidth={false} size={size || 64}/>
  )
}

export const BackArrow = () => {
  return (
    <Image src="backArrow.png" alt="back-arrow" size={16}/>
  )
}
