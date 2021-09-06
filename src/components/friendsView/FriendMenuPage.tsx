import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import allActions from '../../state/actions/allActions';
import styled from 'styled-components';
import MenuItemContainer from '../Menu/MenuItemContainer';
import { OrangeButton, OrangeNavbar, HeaderImage } from '../../styles/shared';
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

const MenuList = styled.div`
  overflow-y: scroll;
  max-height: 400px;
  box-shadow: 4px 4px 8px rgb(0 0 0 / 10%);
`;

export default function FriendMenuPage() {
  const currentItem = useAppSelector((state) => state.orders.currentOrder);
  const totalOrdersPrice = useAppSelector((state) => state.orders.ordersTotal);
  const restaurantName = useAppSelector((state) => state.currentRestaurant.name);
  const currentUserId = useAppSelector((state) => state.currentUser.id);
  const friendsOrders = useAppSelector((state) => state.orders.allOrders);
  const currentGroupId = useAppSelector((state) => state.currentGroup);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const [menuList, setMenuList] = useState([]);

  //axios call function for intial array of menu items and local storage
  async function getMenuList(restaurantid: number) {
    let localMenuData = localStorage.getItem(`MenuListData_${restaurantid}`);
    if (!localMenuData) {
      const rawData = await axios.get(`/api/restaurants/${restaurantid}/menu`);
      localMenuData = rawData.data;
      localStorage.setItem(`MenuListData_${restaurantid}`, JSON.stringify(localMenuData));
    } else {
      localMenuData = JSON.parse(localMenuData);
    }
    setMenuList(localMenuData);
  }

  async function postOrdersToDB() {
    for (let order of friendsOrders) {
      const bodyParams = {
        user_id: currentUserId,
        food: order.food,
        quantity: order.quantity,
        price: order.price,
        date: '12/20/2020',
        food_id: order.food_id,
        group_id: currentGroupId,
        restaurant_id: order.restuarant_id,
        live: true,
      };
      try {
        await axios.post(`/api/orders`, bodyParams);
      } catch (err) {
        console.log('error posting friends orders: ', err);
      }
    }
  }

  function clickHandler(entry) {
    dispatch(allActions.updateItemName(entry.menu_item_name));
    dispatch(allActions.updateMenuItemPrice(entry.menu_item_pricing.toFixed(2)));
    dispatch(allActions.updateMenuItemDescription(entry.menu_item_description));
    dispatch(allActions.updateItemId(entry.menu_item_id));
    dispatch(allActions.setUserId(currentUserId));
    history.push('/MenuItem/Friends');
  }

  function handleCheckout() {
    history.push('/Friends/ConfirmationEnd');
    postOrdersToDB();
  }

  //Resets Current Selected Item
  useEffect(() => {
    //Menu Item
    dispatch(allActions.updateMenuItemPrice(0));
    dispatch(allActions.resetMenuItemQuantity());
    dispatch(allActions.updateMenuItemDescription(''));
    //Order Item
    dispatch(allActions.updateItemId(0));
    dispatch(allActions.updateItemName(''));
    dispatch(allActions.updateItemQuantity(0));
    dispatch(allActions.updateTotalPrice(0));
    //Get Menu List
    getMenuList(currentItem.restaurant_id);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.3,
        // type: 'tween',
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
        // type: 'tween',
      },
    },
  };

  return (
    <>
      <OrangeNavbar />
      <HeaderImage src={currentItem.restaurant_id === 1 ? '/Dannys_bg.png' : '/Bowl.png'} />
      <MainConatiner initial="initial" animate="in" exit="out" variants={pageVariants}>
        {/* <img src={'Dannys_bg.png'}/> */}
        <h2>{restaurantName}</h2>
        <MenuList>
          {menuList.map((entry) => {
            return (
              <div onClick={() => clickHandler(entry)} key={entry.menu_item_id}>
                <MenuItemContainer
                  name={entry.menu_item_name}
                  price={entry.menu_item_pricing}
                  category={entry.menu_category}
                />
              </div>
            );
          })}
        </MenuList>
        <CheckoutButton onClick={handleCheckout}>
          Checkout ${totalOrdersPrice.toFixed(2)}
        </CheckoutButton>
      </MainConatiner>
    </>
  );
}
