import { OrangeInput, OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'

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
  padding-bottom: 80px;
`
const EnterHeader = styled.h1`
  font-size: 32px;
  padding-bottom: 30px;
`

const SizedOrangedInput = styled(OrangeInput)`
  font-size: 24px;
  text-align: center;
`

const PositionedOrangeButton = styled(OrangeButton)`
  position: absolute;
  bottom: 30px;
`
interface FriendNameInputPageProps {

}

interface GroupIdParams {
  group_id: string
}

export default function FriendNameInputPage({}: FriendNameInputPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { group_id } = useParams<GroupIdParams>();
  const { updateCurrentGroup } = allActions;

  const { addFriendName } = allActions;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    dispatch(addFriendName(text));
  }

  const handleClick = () => {
    history.push(`/Menu`)
  }

  useEffect(() => {
    dispatch(updateCurrentGroup(Number(group_id)));
  }, [])

  return (
    <ContainerDiv>

      <OrangeNavbar/>
      <HeaderImage src='/Dannys_bg.png'/>

      <NameInputDiv>
        <EnterHeader>
          Enter Your Name
        </EnterHeader>
        <SizedOrangedInput type="text"  onChange={e => handleChange(e)}/>
      </NameInputDiv>

      <PositionedOrangeButton onClick={handleClick}>
        Confirm
      </PositionedOrangeButton>

    </ContainerDiv>
  )
}






