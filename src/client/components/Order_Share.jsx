import React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import DatePicker from "react-datepicker";

function OrderShare() {

  return (
    <div className='time_and_date_input'>
      <DatePicker />
    </div>
  )


}

export default OrderShare;