import { createReducer, createAction } from '@reduxjs/toolkit';

export const updateCurrentRestaurantName = createAction<string>('Update_RestaurantName');
export const updateCurrentRestaurantId = createAction<number>('Update_RestaurantId');

const initialState = {
  name: '',
  id: 0,
};

export const restaurantReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCurrentRestaurantName, (state, action) => {
      state.name = action.payload;
    })
    .addCase(updateCurrentRestaurantId, (state, action) => {
      state.id = action.payload;
    });
});
