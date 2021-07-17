import { createReducer, createAction } from '@reduxjs/toolkit'

export const UpdateItemName = createAction('Update_ItemName');
export const UpdateItemId = createAction('Update_ItemId');
export const UpdateItemQuantity = createAction('Update_ItemQuantity');
export const UpdateTotalPrice = createAction('Update_TotalPrice');
export const UpdateRestaurantId = createAction('Update_RestaurantId');
export const setUserId = createAction('Set_UserId');
export const setGroupId = createAction('Set_GroupId')

//Will need Username later?
const initialState= {
  user_id: 0,
  food:'',
  quantity: 0,
  price: 0,
  date: '',
  food_id: 0,
  group_id: 0,
  restaurant_id: 0,
  live: true,
};

export const orderItemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UpdateItemName, (state, action) => {
      state.food = action.payload;
    })
    .addCase(UpdateItemId, (state, action) => {
      state.food_id = action.payload;
    })
    .addCase(UpdateItemQuantity, (state, action) => {
      state.quantity = action.payload;
    })
    .addCase(UpdateTotalPrice, (state, action) => {
      state.price = action.payload;
    })
    .addCase(UpdateRestaurantId, (state, action) => {
      state.restaurant_id = action.payload;
    })
    .addCase(setUserId, (state, action) => {
      state.user_id = action.payload;
    })
    .addCase(setGroupId, (state, action) => {
      state.group_id = action.payload;
    })

});
