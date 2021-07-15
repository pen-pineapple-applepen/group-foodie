import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantContainer from './RestaurantContainer.jsx';
import { OrangeInput } from '../styles/shared.tsx';
import { Modal, Button, Form } from 'react-bulma-components';
import axios from 'axios';

const Background = styled.div`
  background-color:white;
  height: 100%;
`;

const ModalContentMain = styled(Modal.Content)`
  width: 70%;
  height: 100%;
`;

const UnderlineOrage = styled.h3`
border-bottom: 1px solid #FF6C36;
`;

const OrangeCheckBox = styled(Form.Checkbox)`
  background-color: #FF6C36;
`;

export default function RestaurantPage() {
  //make sure for clickhandle set restaurantid
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [restaurantList, setRestaurantList] = React.useState([]);
  const [zipcode, setZipcode] = React.useState(90045)
  const [openModal, setOpenModal] =React.useState(false)

  //axios call function for intial array of restaurants and local storage
  async function getRestaurantList(zipcode) {
    let localrestaurantData = localStorage.getItem(`restaurantListData_${zipcode}`);
    if (!localrestaurantData) {
      const rawData = await axios.get(`/restaurants/${zipcode}`)
      localrestaurantData = rawData.data;
      localStorage.setItem(`restaurantListData_${zipcode}`, JSON.stringify(localrestaurantData))
    } else {
      localrestaurantData = JSON.parse(localrestaurantData);
    }
    setRestaurantList(localrestaurantData);
  }

  function clickHandler(entry) {
    dispatch(allActions.UpdateRestaurantId(entry.id))
    dispatch(allActions.updateCurrentRestaurantId(entry.id))
    dispatch(allActions.updateCurrentRestaurantName(entry.name))
    history.push("/Menu");
  }
  //Get List and Reset
  React.useEffect(() => {
    //Get Restaurant List
    getRestaurantList(zipcode)
    //Reset Restaurant states
    dispatch(allActions.UpdateRestaurantId(0))
    dispatch(allActions.updateCurrentRestaurantId(0))
    dispatch(allActions.updateCurrentRestaurantName(''))
    //Resets order states
    dispatch(allActions.resetAllOrders())
  }, [])
  return (
    <div>
      <img src={'location_black_24dp.svg'} />
      <OrangeInput placeholder="Playa Vista" />
      <img src={'sort_black_24dp.svg'} onClick={()=> setOpenModal(true)}/>
      <div onClick={() => clickHandler({ name: 'Dannys', cuisine: 'Fast Food', hours: '9-5PM', id: 10 })}>
        <RestaurantContainer name={'Dannys'} cuisine={'Fast Food'} hours={'9-5PM'}></RestaurantContainer>
      </div>
      <div>
         <Modal show={openModal} onClose={()=>setOpenModal(false)}>
         <ModalContentMain>
              <Background>
                <h2>Filters</h2>
                <UnderlineOrage>Distance</UnderlineOrage>
                  <Form.Field>
                    <Form.Control>
                      <OrangeCheckBox>5 Miles</OrangeCheckBox>
                    </Form.Control>
                  </Form.Field>
                <UnderlineOrage>Cuisines</UnderlineOrage>
                TESTERER
              </Background>
         </ModalContentMain>
         </Modal>
      </div>
    </div>
  )
}


