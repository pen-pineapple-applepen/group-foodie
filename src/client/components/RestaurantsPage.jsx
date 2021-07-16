import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantContainer from './RestaurantContainer.jsx';
import { OrangeInput, OrangeButton } from '../styles/shared.tsx';
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

`;

export default function RestaurantPage() {
  const userId = useAppSelector((state)=>state.loginDetails.userId)
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [restaurantList, setRestaurantList] = React.useState([]);
  const [sortedRestaurantList, setSortedRestaurantList] = React.useState([]);
  const [cuisines, setCuisines] = React.useState({});
  const [zipcode, setZipcode] = React.useState(90045)
  const [openModal, setOpenModal] = React.useState(false)

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
    setSortedRestaurantList(localrestaurantData);
  }

  function clickHandler(entry) {
    dispatch(allActions.setUsertId(userId))
    dispatch(allActions.UpdateRestaurantId(entry.restaurant_id))
    dispatch(allActions.updateCurrentRestaurantId(entry.restaurant_id))
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

  function filterHandler(e) {
    setOpenModal(false)
    let newList = [];
    newList = restaurantList.filter(entry=>entry.cuisines.some(r=>Object.keys(cuisines).indexOf(r) >=0))
    setSortedRestaurantList(newList);
    setCuisines({});
  }

  function handleChange(e) {
    if (e.target.checked) {
      setCuisines(prevCuisines => ({
        ...prevCuisines,
        [e.target.value]: e.target.checked
      }))
    } else {
      const copyObj = cuisines
      delete copyObj[e.target.value];
      setCuisines(copyObj);
    }
  }

  return (
    <div>
      <img src={'location_black_24dp.svg'} />
      <OrangeInput placeholder="Playa Vista" />
      <img src={'sort_black_24dp.svg'} onClick={() => setOpenModal(true)} />
      {sortedRestaurantList.map(entry => {
        return (
          <div onClick={() => clickHandler(entry)} key={entry.restaurant_id} >
            <RestaurantContainer name={entry.name} cuisine={entry.cuisines[0]} hours={entry.hours}></RestaurantContainer>
          </div>
        )
      })}
      <div>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <ModalContentMain>
            <Background>
              <h2>Filters</h2>
              <UnderlineOrage>Distance</UnderlineOrage>
              <Form.Field>
                <Form.Control>
                  <OrangeCheckBox defaultChecked>5 Miles</OrangeCheckBox>
                </Form.Control>
              </Form.Field>
              <UnderlineOrage>Cuisines</UnderlineOrage>
              <Form.Field >
                <Form.Control >
                  <OrangeCheckBox value={'American'} onChange={handleChange}>American</OrangeCheckBox>
                  <OrangeCheckBox value={'Asian'} onChange={handleChange}>Asian</OrangeCheckBox>
                  <OrangeCheckBox>Greek</OrangeCheckBox>
                  <OrangeCheckBox>Italian</OrangeCheckBox>
                  <OrangeCheckBox>Romanian</OrangeCheckBox>
                  <OrangeCheckBox>Fusion</OrangeCheckBox>
                  <OrangeButton onClick={filterHandler} >Apply</OrangeButton>
                </Form.Control>
              </Form.Field>
            </Background>
          </ModalContentMain>
        </Modal>
      </div>
    </div>
  )
}


