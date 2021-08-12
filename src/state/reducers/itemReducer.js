import { createReducer, createAction } from '@reduxjs/toolkit';

export const addItem = createAction('ADD_QUANTITY');
export const subtractItem = createAction('SUBTRACT_QUANTITY');
export const updateMenuItemPrice = createAction('UPDATE_MENU_ITEM_PRICE');
export const updateMenuItemDescription = createAction('UPDATE_MENU_ITEM_DESCRIPTION');
export const resetMenuItemQuantity = createAction('RESET_MENU_ITEM_QUANTITY');

const initialState = {
  count: 0,
  price: 0,
  description: '',
};

export const itemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addItem, (state, action) => {
      state.count += 1;
    })
    .addCase(subtractItem, (state, action) => {
      if (state.count !== 0) {
        state.count -= 1;
      }
    })
    .addCase(resetMenuItemQuantity, (state, action) => {
      state.count = 0;
    })
    .addCase(updateMenuItemPrice, (state, action) => {
      state.price = action.payload;
    })
    .addCase(updateMenuItemDescription, (state, action) => {
      state.description = action.payload;
    });
});
