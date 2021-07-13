import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import DatePicker from "react-datepicker";
import format from 'date-fns/format';

function OrderShare() {
  const [startDate, setStartDate] = useState(new Date());

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
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        includeDates={[new Date(), new Date() ]}
        placeholderText="This only includes today and tomorrow"
        />
        <ColoredLine />
      </div>
      <div>
        Copy Link:
      </div>
    </div>
  )


}

export default OrderShare;