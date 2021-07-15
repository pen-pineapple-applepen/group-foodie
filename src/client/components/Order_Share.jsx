import React, { useState } from 'react';
import { Button } from 'react-bulma-components';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const OrderShare = () => {
  const [orderDate, setOrderDate] = useState(new Date())
  let [guestEmail, setGuestEmail] = useState('');
  let [guestEmails, setGuestEmails] = useState([]);

  const isSelectedDateToday = new Date().getDate() === orderDate.getDate();
  let minTimeHour = new Date().getHours();
  if (!isSelectedDateToday) {
    minTimeHour = 0;
  }


  const handleGuestEmailChange = (event) => {
    setGuestEmail(event.target.value);
  }

  const handleGuestEmailSubmit = () => {
    setGuestEmails([...guestEmails, guestEmail]);
    setGuestEmail('');
  }

  // NEED TO ADD CARD TYPE ON SCHEMA
  let userPaymentInfoFilled = {
    id: 1,
    name: 'Scott',
    card_number: 30234932128484,
    exp_date: '0493',
    cvv: 332,
    zip_code: 92660,
    user_id: 1,
    card_type: 'Visa'
  }
  let userPaymentInfoEmpty = {}



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
        {userPaymentInfoFilled ?
          <div>
            <span>
              ***{String(userPaymentInfoFilled.card_number).slice(-4)}
            </span>
            <span>
              {userPaymentInfoFilled.card_type}
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

// var timeDisplay = (currentTime) => {
//   times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
//   var currentTimes = times.filter(element => (
//     element > currentTime
//   ))
//   return currentTimes.map((element) => (
//     String(element) + ':00'
//   ))
// }

export default OrderShare;


