import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ReactElement } from 'react'
import Countdown, { calcTimeDelta, formatTimeDelta } from 'react-countdown';
import axios, { AxiosResponse } from 'axios';


interface CountDownTimerProps {

}

function CountDownTimer({}: CountDownTimerProps): ReactElement {
  const [ dueDate, setDueDate ] = useState('')
  const groupId = useAppSelector(state => state.currentGroup)

  const countdownRenderer = () => {
    const { days, hours, minutes, seconds, completed } = calcTimeDelta('2021-07-18T01:02:03') // needs to be updated with dynamic 'dueDate' state
      if (completed) {
        return <p>An order has been placed!</p>
      } else {
        return <span>{days} days {hours} hours {minutes} minutes {seconds} seconds </span>
      }
  }

  useEffect(async () => {
    const dueDate = await axios.get(`/api/groups/${groupId}`)
    setDueDate(dueDate);
  }, [])

  return (
    <div>
      <Countdown
        date={Date.now() + 10000}
        renderer={countdownRenderer}
      />
    </div>
  )
}

export default CountDownTimer