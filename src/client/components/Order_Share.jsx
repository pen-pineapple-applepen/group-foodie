import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const OrderShare = () => {
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16))
  let [guestEmail, setGuestEmail] = useState('');
  let [guestEmails, setGuestEmails] = useState([]);
  let [paymentWindowOpen, setPaymentWindowOpen] = useState(false);

  const handleGuestEmailChange = (event) => {
    setGuestEmail(event.target.value);
  }

  const handleGuestEmailSubmit = (event) => {
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
        Enter Date/Time:
      </div>
      <div>
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        includeTimes={[
          setHours(setMinutes(new Date(), 0), 17)
        ]}
        includeDates={[new Date()]}
        placeholderText="This only includes today and tomorrow"
        />
        <ColoredLine />
      </div>
      <div>
        Share Order with Friends:
        <br />
        ** An order link to share will also be given after you submit your payment information **
        <br />
        <input type="text" name='email:' placeholder='Enter email(s)' value={guestEmail} onChange={handleGuestEmailChange} />
        <input type="button" value="Submit" onClick={handleGuestEmailSubmit} />
        <ColoredLine />
        <div>
          {guestEmails.length === 1 ?
            guestEmails.length + ' Person Added' :
            guestEmails.length + ' People Added'}
        </div>
      </div>
      <div>
        Payment Information:
      </div>
      <div>
        {userPaymentInfoFilled ?
          <div onClick={() => setPaymentWindowOpen(true)}>
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

export default OrderShare;

