//
// NOTE I AM SWITCHING THIS TO REACT STYLED COMPONENTS AND REFACTORING THE HTML/CSS AFTER THIS PULL REQUEST
//

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { useHistory } from 'react-router-dom';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import { Button, Block, Modal } from 'react-bulma-components';
import { OrangeButton, OrangeNavbar, ProfileImage } from '../styles/shared';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import OrderShareModal from "./OrderShareModal";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';

const MaxWidthDiv = styled.div`
  max-width: 375px;
`


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

const MainContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding-left: 10px;
  padding-right: 10px;
`;
const EnterDateTime = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
`
const PaymentInformationDiv = styled.div`
  padding-top: 15px;
`
const SmallText = styled.div`
  font-size: 10px;
  margin-bottom: 10px;
`

const OrderShare = () => {
  const [orderDate, setOrderDate] = useState(new Date());
  const currentUserOrders = useAppSelector(state => state.orderItems.orders);
  const selectedPaymentIndex = useAppSelector(state => state.currentPayments.selectedPaymentIndex);
  let [guestEmail, setGuestEmail] = useState('');
  let [guestEmails, setGuestEmails] = useState([]);
  const paymentsList = useAppSelector(state => state.currentPayments.paymentsList);
  const dispatch = useAppDispatch();
  let [openModal, setOpenModal] = useState();
  const userId = useAppSelector(state => state.currentUser.id);
  let [selectedPaymentId, makeSelectedPaymentId] = useState(0);
  const currentEmails = useAppSelector(state => state.currentEmails.emails);

  const history = useHistory();

  const isSelectedDateToday = new Date().getDate() === orderDate.getDate();
  let minTimeHour = new Date().getHours();
  if (!isSelectedDateToday) {
    minTimeHour = 0;
  }

  useEffect(() => {
    fetchPaymentData();
    setGuestEmails(currentEmails);
  }, []);
  // [] needs to be selectedPayment (test this)

  const fetchPaymentData = () => {
    axios.get(`/api/payments?user_id=${userId}`)
    .then(response => {
      if (response.data.length !== 0) {
        let formattedCards = [];
        for (var i = 0; i < response.data.length; i++) {
          formattedCards.push({
            id: response.data[i].id,
            cardNumber: String(response.data[i].card_number).slice(-4),
            cardType: response.data[i].card_type,
            selected: false
          })
        }
        formattedCards[selectedPaymentIndex].selected = true;
        dispatch(allActions.createPaymentsList(formattedCards));
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
    if(guestEmail && !(currentEmails.indexOf(guestEmail)>=0)) {
      dispatch(allActions.addEmail(guestEmail));
      setGuestEmail('');
    } else {
      return
    }
  }

  const handleModalClick = () => {
    <OrderShareModal />
  }

  async function happensWhenShareOrderClick() {
    const bodyParams = { due_date: orderDate.toISOString().slice(0, -5) }
    try {
      const groupId = await axios.post(`/api/groups`, bodyParams)
      dispatch(allActions.updateCurrentGroup(groupId.data[0].id))
      let currentUserOrdersCopy = [];
      for (var i = 0; i < currentUserOrders.length; i++) {
        currentUserOrdersCopy.push({...currentUserOrders[i]})
      }
      dispatch(allActions.updateCurrentGroup(groupId.data[0].id));
      const ordersTaggedWithGroupId = currentUserOrdersCopy.map(order => {
        order.user_id = userId;
        order.group_id = groupId.data[0].id;
        order.date = new Date().toISOString().slice(0, -5);
        return order;
      })
      for(let order of ordersTaggedWithGroupId) {
        axios.post(`/api/orders`, order)
      }
      dispatch(allActions.resetEmails())
      history.push('/Confirmation')
    } catch (err) {
      console.log('err', err)
    }
  }

  const pageVariants = {
    initial: {
      x: '100%',
      opacity: 0,
      // scaleY: 0
    },
    in: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: 'spring',
        ease: 'easeIn',
      }
    },
    out: {
      // x: '100%',
      opacity: 0,
      transition: {
        duration: 0.8,
        type: 'tween',
      }
    },
  }

  return (
    <MaxWidthDiv>
    <OrangeNavbar needBackArrow={true}/>
    <MainContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <EnterDateTime>
        Enter Date and Time:
      </EnterDateTime>
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
        <SmallText>
          ** An order link to share will also be given after you submit your payment information **
        </SmallText>
        <LineCenter>
          <input type="text" name='email:' placeholder='Enter email(s)' value={guestEmail} onChange={handleGuestEmailChange} />
          <CenteredButton>
            <CircleButton onClick={handleGuestEmailSubmit}>Add</CircleButton>
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
            {currentEmails.length === 1 ?
              currentEmails.length + ' Person Added' :
              currentEmails.length + ' People Added'}
          </OrangeButton>
          <OrderShareModal openModal={openModal} setOpenModal={setOpenModal} guestEmails={currentEmails}/>
        </Line>
      </div>
      <PaymentInformationDiv>
        Payment Information:
      </PaymentInformationDiv>
      <div>
        {paymentsList.length !== 0 ?
          <Payment onClick={() => history.push('/PaymentOptions')}>
            <div>
              <span>
                ***{paymentsList.filter(payment => (
                  payment.selected === true))[0].cardNumber}
              </span>
              <span>
                {'  '}
              </span>
              <span>
              {paymentsList.filter(payment => (
                  payment.selected === true))[0].cardType}
              </span>
            </div>
            <div>
              <img className='caret_right'
                src={"./caret_right.png"}
              />
            </div>
          </Payment> :
          <Payment onClick={() => history.push('/PaymentOptions')}>
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
        <OrangeButton onClick={paymentsList.length===0 ? ()=>{} : happensWhenShareOrderClick}>
          Share Order
        </OrangeButton>
      </Line>
    </ MainContainer>
    </MaxWidthDiv>
  )
}

export default OrderShare;