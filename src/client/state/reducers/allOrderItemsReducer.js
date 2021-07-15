import { createReducer, createAction } from '@reduxjs/toolkit'

export const addItemToOrders = createAction('Add_ItemToOrders');
export const addToPriceTotal = createAction('Add_ToPriceTotal');

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

});
