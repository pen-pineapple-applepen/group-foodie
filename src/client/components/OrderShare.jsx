import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bulma-components';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import axios from "axios";

const OrderShare = () => {
  const [orderDate, setOrderDate] = useState(new Date());
  let [guestEmail, setGuestEmail] = useState('');
  let [guestEmails, setGuestEmails] = useState([]);
  let [paymentData, setPaymentData] = useState([]);

  const isSelectedDateToday = new Date().getDate() === orderDate.getDate();
  let minTimeHour = new Date().getHours();
  if (!isSelectedDateToday) {
    minTimeHour = 0;
  }

  useEffect(() => {
    fetchPaymentData();
  }, []);
  // [] needs to be the userID that you get from the redux state

  const fetchPaymentData = () => {
    axios.get('/payments/2')
    .then(response => {
      if (response.data.length !== 0) {
        let formattedCards = [];
        for (var i = 0; i < response.data.length; i++) {
          formattedCards.push({
            id: response.data[i].id,
            card_number: String(response.data[i].card_number).slice(-4),
            card_type: response.data[i].card_type
          })
        }
        setPaymentData(formattedCards)
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleGuestEmailChange = (event) => {
    setGuestEmail(event.target.value);
  }

  const handleGuestEmailSubmit = () => {
    setGuestEmails([...guestEmails, guestEmail]);
    setGuestEmail('');
  }

  const Text = styled.span`
  margin-top: 50px;
  margin-bottom: 25px;
  `;
  const FriendsListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

  // NOT WORKING WITH STYLED COMPONENTS WILL HAVE TO LOOK INTO THIS
  // const ColoredLine = styled.hr`
  // width: '20%',
  // color: '#FF6C36'
  // backgroundColor: '#FF6C36'
  // `;

  const ColoredLine = () => (
    <hr
        style={{
            width: '20%',
            color: '#FF6C36',
            backgroundColor: '#FF6C36',
        }}
    />
  );

  return (
    <div className='order_share'>
      <div>
        Schedule Order Date and Time:
      </div>
      <div>
        <DatePicker
        selected={orderDate}
        onChange={(date) => setOrderDate(date)}
        showTimeSelect
        minDate={new Date()}
        maxDate={addDays(new Date(), 14)}
        minTime={new Date(new Date().setHours(minTimeHour, 0, 0, 0))}
        maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
        dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <ColoredLine />
      <div>
        Set timer for others to pick their order:

      </div>
      <div>
        Share Order with Friends:
        <br />
        ** An order link to share will also be given after you submit your payment information **
        <br />
        <input type="text" name='email:' placeholder='Enter email(s)' value={guestEmail} onChange={handleGuestEmailChange} />
        <input type="button" value="Submit" onClick={handleGuestEmailSubmit} />
        <div>
          {guestEmails.length === 1 ?
            guestEmails.length + ' Person Added' :
            guestEmails.length + ' People Added'}
        </div>
        <ColoredLine />
      </div>
      <div>
        Payment Information:
      </div>
      <div>
        {paymentData.length !== 0 ?
          <div>
            <span>
              ***{String(paymentData[0].card_number)}
            </span>
            <span>
              {paymentData[0].card_type}
            </span>
            <img className='caret_right'
              src={"./caret_right.png"}
            />
          </div> :
          <div>
            Add Card
          </div>
        }
      </div>
      <div>
        Share Order Button
      </div>
    </div>
  )
}

export default OrderShare;


