import { OrangeInput, OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';


const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const NameInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`



const EnterHeader = styled.h1`
  font-size: 32px;
`

// const HeaderImage = styled.div<HeaderImageProps>`
//   background-image: url(${props => props.src});
//   position: absolute;
//   top: -50px;
//   width: 100vw;
//   height: 250px;
//   padding-bottom: 200px;
// `

interface FriendNameInputPageProps {

}

export default function FriendNameInputPage({}: FriendNameInputPageProps): JSX.Element {
  return (
    <ContainerDiv>
      <OrangeNavbar/>
      <HeaderImage src='Dannys_bg.png'/>
      <NameInputDiv>
        <EnterHeader>
          Enter Your Name
        </EnterHeader>
        <OrangeInput/>
      </NameInputDiv>
    </ContainerDiv>
  )
}






