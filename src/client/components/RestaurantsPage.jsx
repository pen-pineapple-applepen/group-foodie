import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantContainer from './RestaurantContainer.jsx';
import { OrangeInput, OrangeButton, OrangeNavbar } from '../styles/shared.tsx';
import { Modal, Button, Form } from 'react-bulma-components';
import axios from 'axios';
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";

const Background = styled.div`
  background-color:white;
  height: 100%;
`;

const ModalContentMain = styled(Modal.Content)`
  width: 70%;
  height: 100%;
`;

const UnderlineOrage = styled.div`
border-bottom: 1px solid #FF6C36;
width: 50%;
font-weight: bold;
`;

const UnderlineOrageThick = styled.div`
border-bottom: 2px solid #FF6C36;
width: 50%;
margin: 5px;
margin-left: auto;
margin-right: auto;
`;

const SearchAndFilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`;

export default function RestaurantPage() {
  const userId = useAppSelector((state) => state.loginDetails.userId)
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
      const rawData = await axios.get(`/api/restaurants/${zipcode}`)
      localrestaurantData = rawData.data;
      localStorage.setItem(`restaurantListData_${zipcode}`, JSON.stringify(localrestaurantData))
    } else {
      localrestaurantData = JSON.parse(localrestaurantData);
    }
    setRestaurantList(localrestaurantData);
    setSortedRestaurantList(localrestaurantData);
  }

  function clickHandler(entry) {
    dispatch(allActions.setUserId(userId))
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
    newList = restaurantList.filter(entry => entry.cuisines.some(r => Object.keys(cuisines).indexOf(r) >= 0))
    setSortedRestaurantList(newList);
    setCuisines({});
  }
  //keeps in check the checked values and creates object for filterHandler to use

  function handleChange(checked) {
    if (checked) {
      setCuisines(prevCuisines => ({
        ...prevCuisines,
        [event.target.innerText]: checked
      }))
    } else {
      const copyObj = cuisines
      delete copyObj[event.target.innerText];
      setCuisines(copyObj);
    }
  }

  return (
    <div>
      <OrangeNavbar needBackArrow={true}/>
      <SearchAndFilterDiv>
        <img src={'location_black_24dp.svg'} />
        <OrangeInput placeholder="Playa Vista" />
        <img src={'sort_black_24dp.svg'} onClick={() => setOpenModal(true)} />
      </SearchAndFilterDiv>
      {sortedRestaurantList.map(entry => {
        return (
          <div onClick={() => clickHandler(entry)} key={entry.restaurant_id} >
            <RestaurantContainer name={entry.name} cuisine={entry.cuisines[0]} hours={entry.hours}></RestaurantContainer>
            <UnderlineOrageThick />
          </div>
        )
      })}
      <div>
        <Modal show={openModal} showClose={false} onClose={() => setOpenModal(false)}>
          <Modal.Card>
            <Modal.Card.Header>
              <Modal.Card.Title>Filters</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
              <UnderlineOrage>Distance</UnderlineOrage>
              <Form.Field>
                <Form.Control>
                  <Checkbox
                    containerStyle={{ margin: 10 }}
                    borderColor="#FF6C36"
                    icon={
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          backgroundColor: "#FF6C36",
                          alignSelf: "center",
                        }}
                      ><Icon.FiCheck color="white" size={20} /></div>
                    }
                    checked={true}
                    borderRadius={10}
                    style={{ overflow: "hidden" }}
                    size={20}
                    label="5 Miles"></Checkbox>
                </Form.Control>
              </Form.Field>
              <UnderlineOrage>Cuisines</UnderlineOrage>
              <Checkbox
                containerStyle={{ margin: 10 }}
                borderColor="#FF6C36"
                icon={
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      backgroundColor: "#FF6C36",
                      alignSelf: "center",
                    }}
                  >
                    <Icon.FiCheck color="white" size={20} />
                  </div>
                }
                borderRadius={10}
                style={{ overflow: "hidden" }}
                size={20}
                label="Asian" name="Asian" onChange={handleChange}></Checkbox>
              <Checkbox
                containerStyle={{ margin: 10 }}
                borderColor="#FF6C36"
                icon={
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      backgroundColor: "#FF6C36",
                      alignSelf: "center",
                    }}
                  ><Icon.FiCheck color="white" size={20} /></div>
                }
                borderRadius={10}
                style={{ overflow: "hidden" }}
                size={20}
                label="American" onChange={handleChange}></Checkbox>
              <Checkbox
                containerStyle={{ margin: 10 }}
                borderColor="#FF6C36"
                icon={
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      backgroundColor: "#FF6C36",
                      alignSelf: "center",
                    }}
                  ><Icon.FiCheck color="white" size={20} /></div>
                }
                borderRadius={10}
                style={{ overflow: "hidden" }}
                size={20}
                label="Italian" onChange={handleChange}></Checkbox>
            </Modal.Card.Body>
            <Modal.Card.Footer renderAs={Button.Group} align="right">
              <OrangeButton onClick={filterHandler} >Apply</OrangeButton>
            </Modal.Card.Footer>
          </Modal.Card>
        </Modal>
      </div>
    </div>
  )
}


