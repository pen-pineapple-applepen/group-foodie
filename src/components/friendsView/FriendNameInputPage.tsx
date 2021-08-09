import { OrangeInput, OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { motion } from 'framer-motion';
import { updateCurrentRestaurantName } from '../../state/reducers/restaurantReducer';
import { User } from '../../state/reducers/currentUserReducer';

const ContainerDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const NameInputDiv = styled.div`
  position: relative;
  bottom: 80px;
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
  group_id: string,
  restaurant_id: string,
  restaurant_name: string,
}


export default function FriendNameInputPage({}: FriendNameInputPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const friendName = useAppSelector(state => state.friendName)
  const { group_id, restaurant_id, restaurant_name } = useParams<GroupIdParams>();
  const { addFriendName, UpdateRestaurantId, setGroupId, setCurrentUser, updateCurrentGroup, updateCurrentRestaurantName } = allActions;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    dispatch(addFriendName(text));
  }

  const handleClick = async () => {
    try {
      const userInfo: User = {
        id: 0,
        first_name: friendName,
        last_name: '',
        email: '',
        username: 'GUEST',
        password: '',
        guest: true,
        loggedIn: false,
      }
      const userIdData = await axios.post('/api/users', userInfo)
      const userId = userIdData.data[0]
      userInfo.id = userId;
      dispatch(setCurrentUser(userInfo));
    } catch (err) {
      console.log('error creating guest user ID', err);
    }
    history.push(`/Friends/Confirmation`)
  }

  useEffect(() => {
    dispatch(setGroupId(Number(group_id)));
    dispatch(updateCurrentGroup(Number(group_id)));
    dispatch(UpdateRestaurantId(Number(restaurant_id)));
    dispatch(updateCurrentRestaurantName(restaurant_name));

  }, [])

  const pageVariants = {
    initial: {
      opacity: 0,
      // scaleY: 0
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
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
    <>
    <OrangeNavbar hasBurger={false}/>
    <HeaderImage src ={Number(restaurant_id) === 1 ? '/Dannys_bg.png' : '/Bowl.png'}/>
    <ContainerDiv
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    >


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
    </>
  )
}






