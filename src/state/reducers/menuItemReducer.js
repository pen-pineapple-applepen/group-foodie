import { createReducer, createAction } from '@reduxjs/toolkit'

export const addItem = createAction('ADD_Quantity');
export const subtractItem = createAction('Subtract_Quantity');
export const UpdateItemPrice = createAction('Update_ItemPrice');
export const UpdateItemDescription = createAction('Update_ItemDescription')
export const resetItemQuantity = createAction('Reset_Quantity');

const initialState= {
  count: 0,
  price: 0,
  description:'',
};

export const menuItemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItem, (state, action) => {
      state.count += 1
    })
    .addCase(subtractItem, (state,action) => {
      if(state.count===0) {
        return
      } else {
        state.count -= 1;
      }
    })
    .addCase(resetItemQuantity, (state, action) => {
      state.count = 0
    })
    .addCase(UpdateItemPrice, (state, action) => {
      state.price = action.payload
    })
    .addCase(UpdateItemDescription, (state, action) => {
      state.description = action.payload
    })
});
