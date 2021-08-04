import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styled from 'styled-components';
import ChatComments from './ChatComments.jsx';
import { OrangeButton, OrangeNavbar } from '../../styles/shared';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  background-image: url('../BG_Wood.png');
`;

const imgStyle = {
  height: "60px"
}

const chatDiv = () => {
  return (
    <div>
      <ChatComments />
    </div>
  )
};

export default function ChatPage () {
  const restaurant = useAppSelector(state => state.currentRestaurant);
  const [dueDate, setDueDate] = React.useState('');
  const currentGroupId = useAppSelector(state => state.currentGroup)


  React.useEffect(async () => {
    console.log('restaurantid', restaurant.restaurant_id)
    const dateData = await axios.get(`/api/groups/${currentGroupId}`)
    const date = dateData.data[0].due_date;
    const formatedDate = date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4);
    setDueDate(formatedDate);
  }, [])

  const orderDiv = () => {
    return(
      <div className="orderName">
        <div>
          <p>Current Order</p>
        </div>
        <div>
          <div>
          <img className="restaurantImg" src={restaurant.id === 1 ? '/Dannys_bg.png' : '/Bowl.png'} style={imgStyle}></img>
          </div>
          <div>
            <p>{restaurant.name}</p>
            <p>Date: {dueDate}</p>
            {/* <p>3 People</p> */}
          </div>
        </div>
      </div>
    )
  };

  return (
    <Container className="chatPage-background" style={{height: "800px"}}>
      <div style={{margin: 'auto', marginTop: "5px"}}>
        < OrangeNavbar needBackArrow={true}/>
        <div style={{width: "250px", height: "400px"}}>
          {orderDiv()}
          <hr></hr>
          {chatDiv()}
        </div>
      </div>
    </Container>
  );
};