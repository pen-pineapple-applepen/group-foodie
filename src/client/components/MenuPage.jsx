import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { Button } from 'react-bulma-components';
import allActions from '../state/actions/allActions';
import styled from 'styled-components';
import MenuItemContainer from './MenuItemContainer.jsx';
import {OrangeButton} from '../styles/shared.tsx';
import { useHistory } from 'react-router-dom';

const MainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
  width: 50%;
`;

export default function MenuPage () {
  const currentItem = useAppSelector((state)=>state.currentMenuItem)
  const totalOrdersPrice = useAppSelector((state)=>state.allOrderItems.ordersTotal)
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [ menuList, setMenuList ] = React.useState([]);

  //axios call function for intial array of menu items and local storage
  async function getMenuList (restaurantid) {
    let localMenuData = localStorage.getItem(`MenuListData_${restaurantid}`);
    if (!localMenuData) {
      const data = await axios.get()
      localMenuData = data;
      localStorage.setItem('MenuListData', JSON.stringify(localMenuData))
    } else {
      localMenuData = JSON.parse(localMenuData);
    }
    setMenuList(localMenuData);
  }

  function clickHandler (entry) {
    //reroute
    console.log(entry.name)
    console.log(entry.price)
    dispatch(allActions.UpdateItemName(entry.name));
    dispatch(allActions.UpdateItemPrice(entry.price.toFixed(2)));
    dispatch(allActions.UpdateItemDescription(entry.description));
    dispatch(allActions.UpdateItemId(entry.id));
    history.push("/MenuItem");

  }

  //Resets Current Selected Item
  React.useEffect(()=>{
    //Menu Item
    dispatch(allActions.UpdateItemPrice(0));
    dispatch(allActions.resetItemQuantity());
    dispatch(allActions.UpdateItemDescription(''));
    //Order Item
    dispatch(allActions.UpdateItemId(0));
    dispatch(allActions.UpdateItemName(''));
    dispatch(allActions.UpdateItemId(0));
    dispatch(allActions.UpdateItemQuantity(0));
    dispatch(allActions.UpdateTotalPrice(0));
  },[])

  return(
    <MainConatiner>
      <img src={'Dannys_bg.png'}/>
      <h2>Dannys</h2>
      <div onClick={() => clickHandler({name:'BigTop', price: 5, description: 'BigTop Item Description', id:10})}>
        <MenuItemContainer  name={'Big Burger'} price={5}></MenuItemContainer>
      </div>
      <CheckoutButton>Checkout ${totalOrdersPrice.toFixed(2)}</CheckoutButton>
    </MainConatiner>
  )
}