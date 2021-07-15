import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import allActions from '../state/actions/allActions';
import { useHistory } from 'react-router-dom';
import RestaurantContainer from './RestaurantContainer.jsx';
import {OrangeInput} from '../styles/shared.tsx';


export default function RestaurantPage () {
  //make sure for clickhandle set restaurantid
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [ restaurantList, setRestaurantList ] = React.useState([]);
  const [ zipcode, setZipcode ] = React.useState(90045)

  //axios call function for intial array of restaurants and local storage
  async function getRestaurantList (zipcode) {
    let localrestaurantData = localStorage.getItem(`restaurantListData_${zipcode}`);
    if (!localrestaurantData) {
      const data = await axios.get(`/restaurants/${zipcode}`)
      localrestaurantData = data;
      localStorage.setItem(`restaurantListData_${zipcode}`, JSON.stringify(localrestaurantData))
    } else {
      localrestaurantData = JSON.parse(localrestaurantData);
    }
    setRestaurantList(localrestaurantData);
  }

  function clickHandler (entry) {
    dispatch(allActions.UpdateRestaurantId(entry.id))
    dispatch(allActions.updateCurrentRestaurantId(entry.id))
    dispatch(allActions.updateCurrentRestaurantName(entry.name))
    history.push("/Menu");
  }
  //Get List and Reset
  React.useEffect(()=>{
    //Get Restaurant List
    // getRestaurantList(zipcode)
    //Reset Restaurant states
    dispatch(allActions.UpdateRestaurantId(0))
    dispatch(allActions.updateCurrentRestaurantId(0))
    dispatch(allActions.updateCurrentRestaurantName(''))
    //Resets order states
    dispatch(allActions.resetAllOrders())

  },[])
  return (
    <div>
      <img src={'location_black_24dp.svg'}/>
      <OrangeInput placeholder="Playa Vista"/>
      <img src={'sort_black_24dp.svg'}/>
    <div onClick={() => clickHandler({name:'Dannys', cuisine: 'Fast Food', hours: '9-5PM', id:10})}>
        <RestaurantContainer  name={'Dannys'} cuisine={'Fast Food'} hours={'9-5PM'}></RestaurantContainer>
    </div>
    </div>
  )
}


