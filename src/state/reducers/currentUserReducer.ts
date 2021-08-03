import { createReducer, createAction } from '@reduxjs/toolkit';

export const setCurrentUser = createAction<User>('SET_CURRENT_USER');
export const logIn = createAction('LOG_IN');
export const logOut = createAction('LOG_OUT');

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  guest: boolean;
  loggedIn: boolean;
}

const initialState: User = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  guest: false,
  loggedIn: false,
};

export const currentUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentUser, (state, action) => {
      const {payload} = action;
      return payload;
    })
    .addCase(logIn, (state, action) => {
      state.loggedIn = true;
    })
    .addCase(logOut, (state, action) => {
      state.loggedIn = false;
    })
});
