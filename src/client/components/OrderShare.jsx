//
// NOTE I AM SWITCHING THIS TO REACT STYLED COMPONENTS AND REFACTORING THE HTML/CSS AFTER THIS PULL REQUEST
//

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { useHistory } from 'react-router-dom';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import { Button, Block, Modal } from 'react-bulma-components';
import {OrangeButton} from '../styles/shared.tsx';
import { OrangeNavbar } from '../styles/shared.tsx';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import OrderShareModal from "./OrderShareModal";
import axios from "axios";

const ColoredLine = () => (
  <hr
      style={{
          width: '60%',
          color: '#FF6C36',
          backgroundColor: '#FF6C36',
      }}
  />
);

const CenteredButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const CircleButton = styled(OrangeButton)`
  border-radius: 30px;
  margin-top 3px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LineCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Payment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

const OrderShare = () => {
  const [orderDate, setOrderDate] = useState(new Date());
  const currentUserOrders = useAppSelector(state => state.allOrderItems.orders);
  let [guestEmail, setGuestEmail] = useState('');
  let [guestEmails, setGuestEmails] = useState([]);
  const paymentsList = useAppSelector(state => state.currentPayments.paymentsList);
  const selectedPayment = useAppSelector(state => state.currentPayments.selectedPayment);
  const dispatch = useAppDispatch();
  let [openModal, setOpenModal] = useState();
  const userId = useAppSelector(state => state.loginDetails.userId);

  const history = useHistory();

  const isSelectedDateToday = new Date().getDate() === orderDate.getDate();
  let minTimeHour = new Date().getHours();
  if (!isSelectedDateToday) {
    minTimeHour = 0;
  }

  useEffect(() => {
    fetchPaymentData();
  }, []);
  // [] needs to be selectedPayment (test this)

  const fetchPaymentData = () => {
    axios.get('/api/payments/2')
    .then(response => {
      if (response.data.length !== 0) {
        let formattedCards = [];
        for (var i = 0; i < response.data.length; i++) {
          formattedCards.push({
            id: response.data[i].id,
            cardNumber: String(response.data[i].card_number).slice(-4),
            cardType: response.data[i].card_type
          })
        }
        dispatch(allActions.createPaymentsList(formattedCards));
        // dispatch(allActions.addSelectedPayment(formattedCards[0]));
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

  const handleModalClick = () => {
    <OrderShareModal />
  }

  async function happensWhenShareOrderClick() {
    const bodyParams = { due_date: orderDate.toISOString().slice(0, -5) }
    try {
      const groupId = await axios.post(`/api/groups`, bodyParams)
      let currentUserOrdersCopy = [];
      for (var i = 0; i < currentUserOrders.length; i++) {
        currentUserOrdersCopy.push({...currentUserOrders[i]})
      }
      const ordersTaggedWithGroupId = currentUserOrdersCopy.map(order => {
        order.group_id = groupId.id;
        order.date = groupId.due_date;
        return order;
      })
      for(let order of ordersTaggedWithGroupId) {
        axios.post(`/api/orders/${userId}/user`, order)
      }
      history.push('/Confirmation')
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <MainContainer>
      <OrangeNavbar />
      <div>
        Enter Date and Time:
      </div>
      <Line>
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
      </Line>
      <Line>
        <ColoredLine />
      </Line>
      <div>
        <div>
          Share Order with Friends:
        </div>
        <Line>
          ** An order link to share will also be given after you submit your payment information **
        </Line>
        <LineCenter>
          <input type="text" name='email:' placeholder='Enter email(s)' value={guestEmail} onChange={handleGuestEmailChange} />
          <CenteredButton>
            <CircleButton onClick={handleGuestEmailSubmit} />
          </CenteredButton>
        </LineCenter>
        <Line>
          <ColoredLine />
        </Line>
        <Line>
          <OrangeButton
            onClick={() => {
            setOpenModal('card');
            }}
          >
            {guestEmails.length === 1 ?
              guestEmails.length + ' Person Added' :
              guestEmails.length + ' People Added'}
          </OrangeButton>
          <OrderShareModal openModal={openModal} setOpenModal={setOpenModal} guestEmails={guestEmails} setGuestEmails={setGuestEmails}/>
        </Line>
      </div>
      <div>
        Payment Information:
      </div>
      <div>
        {Object.keys(selectedPayment).length !== 0 ?
          <Payment onClick={() => history.push('/PaymentOptions')}>
            <div>
              <span>
                ***{selectedPayment.cardNumber}
              </span>
              <span>
                {selectedPayment.cardType}
              </span>
            </div>
            <div>
              <img className='caret_right'
                src={"./caret_right.png"}
              />
            </div>
          </Payment> :
          <Payment>
            <div>
              Add Card
            </div>
            <img className='caret_right'
                src={"./caret_right.png"}
            />
          </Payment>
        }
      </div>
      <Line>
        <OrangeButton onClick={happensWhenShareOrderClick}>
          Share Order
        </OrangeButton>
      </Line>
    </ MainContainer>
  )
}

export default OrderShare;