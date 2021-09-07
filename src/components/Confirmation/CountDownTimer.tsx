import * as React from 'react';
import { useState, useEffect } from 'react';
import { ReactElement } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Countdown, { calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { useAppSelector } from '../../state/hooks';


const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.span`
  color: #929191;
  padding-bottom: 8px;
`;
const EditButton = styled.button`
  background: none;
  color: #5353db;
  font-size: 10px;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

function CountDownTimer(): ReactElement {
  const [dueDate, setDueDate] = useState('');
  const [dateIsSet, setDateIsSet] = useState(false);
  const groupId = useAppSelector((state) => state.currentGroup);
  const isLoggedIn = useAppSelector((state) => state.currentUser.loggedIn);

  const countdownRenderer = () => {
    const { days, hours, minutes, seconds, completed } = calcTimeDelta(dueDate); // needs to be updated with dynamic 'dueDate' state

    if (completed) {
      return <p>An order has been placed!</p>;
    }
    return (
      <Timer>
        {days} days {hours} hours {minutes} minutes {seconds} seconds{' '}
      </Timer>
    );
  };

  useEffect(async () => {
    const dateData = await axios.get(`/api/groups/${groupId}`);
    const date = dateData.data[0].due_date;
    setDueDate(`${date}Z`);
    setDateIsSet(true);
  }, []);

  return (
    <TimerContainer>
      {dateIsSet && <Countdown date={dueDate} renderer={countdownRenderer} />}
      {isLoggedIn && <EditButton>edit</EditButton>}
    </TimerContainer>
  );
}

export default CountDownTimer;
