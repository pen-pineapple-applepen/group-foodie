import { createReducer, createAction } from '@reduxjs/toolkit';

export const addItemToOrders = createAction<Order>('ADD_ITEM_TO_ORDERS');
export const addToPriceTotal = createAction<number>('ADD_TO_PRICE_TOTAL');
export const resetAllOrders = createAction('RESET_ALL_ORDERS');
export const updateItemName = createAction('UPDATE_ITEM_NAME');
export const updateItemId = createAction('UPDATE_ITEM_ID');
export const updateItemQuantity = createAction('UPDATE_ITEM_QUANTITY');
export const updateTotalPrice = createAction<number>('UPDATE_TOTAL_PRICE');
export const updateRestaurantId = createAction('UPDATE_RESTAURANT_ID');
export const setUserId = createAction('SET_USER_ID');
export const setGroupId = createAction('SET_GROUP_ID');

export interface Order {
  user_id: number;
  food: string;
  quantity: number;
  price: number;
  date: string;
  food_id: number;
  group_id: number;
  restaurant_id?: number;
  live?: boolean;
}

interface OrdersState {
  allOrders: Order[];
  ordersTotal: number;
  currentOrder: Order;
}
const initialState: OrdersState = {
  allOrders: [],
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

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToOrders, (state, action) => {
      state.allOrders.push(action.payload);
    })
    .addCase(addToPriceTotal, (state, action) => {
      state.ordersTotal += action.payload;
    })
    .addCase(resetAllOrders, (state, action) => {
      state.allOrders = [];
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
