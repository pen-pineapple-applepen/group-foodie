import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import styled from 'styled-components';
import MenuItemContainer from './MenuItemContainer.jsx';
import {OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared.tsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const MainConatiner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckoutButton = styled(OrangeButton)`
  border-radius: 7px;
  width: 50%;
`;

const RestaurantName = styled.h2`
  font-family: Helvetica;
  font-size: 24px;
  text-align: center;
`;

export default function MenuPage () {
  const currentItem = useAppSelector((state)=>state.currentMenuItem)
  const totalOrdersPrice = useAppSelector((state)=>state.allOrderItems.ordersTotal)
  const restaurantName = useAppSelector((state)=>state.currentRestaurant.name)
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [ menuList, setMenuList ] = React.useState([]);
  //axios call function for intial array of menu items and local storage
  async function getMenuList (restaurantid) {
    let localMenuData = localStorage.getItem(`MenuListData_${restaurantid}`);
    if (!localMenuData) {
      const rawData = await axios.get(`/api/restaurants/${restaurantid}/menu`)
      localMenuData = rawData.data;
      localStorage.setItem(`MenuListData_${restaurantid}`, JSON.stringify(localMenuData))
    } else {
      localMenuData = JSON.parse(localMenuData);
    }
    setMenuList(localMenuData);
  }

  function clickHandler (entry) {
    dispatch(allActions.UpdateItemName(entry.menu_item_name));
    dispatch(allActions.UpdateItemPrice(entry.menu_item_pricing.toFixed(2)));
    dispatch(allActions.UpdateItemDescription(entry.menu_item_description));
    dispatch(allActions.UpdateItemId(entry.menu_item_id));
    history.push("/MenuItem");
  }

  function handleCheckout() {
    history.push('/ShareOrder');
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
    dispatch(allActions.UpdateItemQuantity(0));
    dispatch(allActions.UpdateTotalPrice(0));
    //Get Menu List
    getMenuList(currentItem.restaurant_id)
  },[])

  //animation stuff
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
        // type: 'tween',
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
        // type: 'tween',
      },
    },
  }

  return(
    <>
    <OrangeNavbar needBackArrow={true}/>
    <HeaderImage src ={currentItem.restaurant_id === 1 ? '/Dannys_bg.png' : '/Bowl.png'} />
    <MainConatiner
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <RestaurantName>{restaurantName}</RestaurantName>
      <div style={{overflow: "scroll", overflowY: "scroll", maxHeight: "400px", boxShadow: "4px 4px 8px rgb(0 0 0 / 10%)"}}>
      {menuList.map(entry=>{
        return(
      <div onClick={() => clickHandler(entry)} key={entry.menu_item_id}>
        <MenuItemContainer  name={entry.menu_item_name} price={entry.menu_item_pricing} category={entry.menu_category}/>
      </div>
        )
      })}
      </div>
      <CheckoutButton onClick={handleCheckout}>Checkout ${totalOrdersPrice.toFixed(2)}</CheckoutButton>
    </MainConatiner>
    </>
  )
}