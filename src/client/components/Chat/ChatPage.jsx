import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import styled from 'styled-components';
import ChatComments from './ChatComments.jsx';
import { OrangeButton, OrangeNavbar } from '/src/client/styles/shared.tsx';


const Container = styled.div`
  display: flex;
  background-image: url('../BG_Wood.png');
`;

const imgStyle = {
  height: "60px"
}

const orderDiv = () => {
  return(
    <div className="orderName">
      <div>
        <p>Current Order</p>
      </div>
      <div>
        <div>
        {/* <img className="restaurantImg" src={incomingGroupInfoFromLiveConfirmationPage.image}></img> */}
        <img className="restaurantImg" src={"../Dannys_bg.png"} style={imgStyle}></img>

        </div>
        <div>
          {/* <p>{incomingGroupInfoFromLiveConfirmationPage.restaurantName} Danny's</p>
          <p>{incomingGroupInfoFromLiveConfirmationPage.date} DD/MM/YYYY</p>
          <p>{incomingGroupInfoFromLiveConfirmationPage.numberOfUsers} People</p> */}
          <p>Danny's</p>
          <p>DD/MM/YYYY</p>
          <p>3 People</p>
        </div>

      </div>

    </div>
  )
};

const chatDiv = () => {
  return (
    <div>
      <ChatComments />
    </div>
  )
};

export default function ChatPage () {

  React.useEffect(() => {
    // waiting for further data loaded
    // setComments(getComments(comments));

  }, [])

  return (
    <Container className="chatPage-background" style={{height: "800px"}}>
      <div style={{margin: 'auto', marginTop: "5px"}}>
        < OrangeNavbar />
        <div style={{width: "250px", height: "400px"}}>
          {orderDiv()}
          <hr></hr>
          {chatDiv()}
        </div>
      </div>
    </Container>
  );
};