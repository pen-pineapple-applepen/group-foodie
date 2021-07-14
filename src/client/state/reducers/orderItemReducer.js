import { createReducer, createAction } from '@reduxjs/toolkit'

export const UpdateItemName = createAction('Update_ItemName');
export const UpdateItemId = createAction('Update_ItemId');
export const UpdateItemQuantity = createAction('Update_ItemQuantity');
export const UpdateTotalPrice = createAction('Update_TotalPrice');
export const UpdateRestaurantId = createAction('Update_RestaurantId');

//Will need Username later?
const initialState= {
  itemName:'',
  itemId: 0,
  quantity: 0,
  price: 0,
  restaurantId: 0,
};

export const orderItemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UpdateItemName, (state, action) => {
      state.itemName = action.payload;
    })
    .addCase(UpdateItemId, (state, action) => {
      state.itemId = action.payload;
    })
    .addCase(UpdateItemQuantity, (state, action) => {
      state.quantity = action.payload;
    })
    .addCase(UpdateTotalPrice, (state, action) => {
      state.price = action.payload;
    })
    .addCase(UpdateRestaurantId, (state, action) => {
      state.restaurantId = action.payload;
    })

});
