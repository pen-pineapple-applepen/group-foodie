import { createReducer, createAction } from '@reduxjs/toolkit'

export const addItemToOrders = createAction('Add_ItemToOrders');
export const addToPriceTotal = createAction('Add_ToPriceTotal');
export const resetAllOrders = createAction('Reset_AllOrders');

const initialState= {
  orders:[],
  ordersTotal: 0,
};

export const allOrderItemsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItemToOrders, (state, action) => {
      state.orders.push(action.payload)
    })
    .addCase(addToPriceTotal, (state, action) => {
      state.ordersTotal += action.payload;
    })
    .addCase(resetAllOrders, (state, action) => {
      state.orders = [];
      state.ordersTotal = 0;
    })

});
