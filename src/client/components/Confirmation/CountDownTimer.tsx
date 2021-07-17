import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ReactElement } from 'react'
import Countdown, { calcTimeDelta, formatTimeDelta } from 'react-countdown';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';


interface CountDownTimerProps {

}

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Timer = styled.span`
  color: #929191;
  padding-bottom: 8px;
`
const EditButton = styled.button`
  background: none;
	color: #5353db;
  font-size: 10px;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`

function CountDownTimer({}: CountDownTimerProps): ReactElement {
  const [ dueDate, setDueDate ] = useState('')
  const groupId = useAppSelector(state => state.currentGroup)

  const countdownRenderer = () => {
    const { days, hours, minutes, seconds, completed } = calcTimeDelta('2021-07-18T01:02:03') // needs to be updated with dynamic 'dueDate' state
      if (completed) {
        return <p>An order has been placed!</p>
      } else {
        return <Timer>{days} days {hours} hours {minutes} minutes {seconds} seconds </Timer>
      }
  }

  useEffect(async () => {
    const dueDate = await axios.get(`/api/groups/${groupId}`)
    setDueDate(dueDate);
  }, [])

  return (
    <TimerContainer>
      <Countdown
        date={Date.now() + 10000}
        renderer={countdownRenderer}
      />
      <EditButton>edit</EditButton>
    </TimerContainer>
  )
}

export default CountDownTimer