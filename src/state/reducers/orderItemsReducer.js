import { createReducer, createAction } from '@reduxjs/toolkit';

export const addItemToOrders = createAction('ADD_ITEM_TO_ORDERS');
export const addToPriceTotal = createAction('ADD_TO_PRICE_TOTAL');
export const resetAllOrders = createAction('RESET_ALL_ORDERS');
export const updateItemName = createAction('UPDATE_ITEM_NAME');
export const updateItemId = createAction('UPDATE_ITEM_ID');
export const updateItemQuantity = createAction('UPDATE_ITEM_QUANTITY');
export const updateTotalPrice = createAction('UPDATE_TOTAL_PRICE');
export const updateRestaurantId = createAction('UPDATE_RESTAURANT_ID');
export const setUserId = createAction('SET_USER_ID');
export const setGroupId = createAction('SET_GROUP_ID');

const initialState = {
  orders: [],
  ordersTotal: 0,
  currentOrder: {
    user_id: 0,
    food: '',
    quantity: 0,
    price: 0,
    date: '',
    food_id: 0,
    group_id: 0,
    restaurant_id: 0,
    live: true,
  },
};

export const orderItemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToOrders, (state, action) => {
      state.orders.push(action.payload);
    })
    .addCase(addToPriceTotal, (state, action) => {
      state.ordersTotal += action.payload;
    })
    .addCase(resetAllOrders, (state, action) => {
      state.orders = [];
      state.ordersTotal = 0;
    })
    .addCase(updateItemName, (state, action) => {
      state.currentOrder.food = action.payload;
    })
    .addCase(updateItemId, (state, action) => {
      state.currentOrder.food_id = action.payload;
    })
    .addCase(updateItemQuantity, (state, action) => {
      state.currentOrder.quantity = action.payload;
    })
    .addCase(updateTotalPrice, (state, action) => {
      state.currentOrder.price = action.payload;
    })
    .addCase(updateRestaurantId, (state, action) => {
      state.currentOrder.restaurant_id = action.payload;
    })
    .addCase(setUserId, (state, action) => {
      state.currentOrder.user_id = action.payload;
    })
    .addCase(setGroupId, (state, action) => {
      state.currentOrder.group_id = action.payload;
    });
});
