import { createReducer, createAction } from '@reduxjs/toolkit';

export const addEmail = createAction('Add_Email');
export const removeEmail = createAction('Remove_Email');
export const resetEmails = createAction('Reset_Emails');

const initialState = {
  emails: [],
};

export const emailFriendsRecucer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEmail, (state, action) => {
      state.emails.push(action.payload);
    })
    .addCase(removeEmail, (state, action) => {
      const newEmails = state.emails.filter((email) => {
        return email !== action.payload;
      });
      state.emails = newEmails;
    })
    .addCase(resetEmails, (state, action) => {
      state.emails = [];
    });
});
