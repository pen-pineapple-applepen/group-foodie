import { createReducer, createAction } from '@reduxjs/toolkit'

export const addDate = createAction('Add_date');

let initialState= {
  orderDate: new Date()
};

export const dateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDate, (state, action) => {
      state.orderDate = action.payload
    })
});