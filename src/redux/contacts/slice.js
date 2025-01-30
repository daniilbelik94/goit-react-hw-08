import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectContacts } from './selectors';
import { selectFilter } from '../filters/selectors';
import {
  apiAddContacts,
  apiDeleteContacts,
  apiGetContacts,
} from './operations';
import { apiLogOutUser } from '../auth/operations';

const INITIAL_STATE = {
  contacts: [], 
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiGetContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //
      .addCase(apiAddContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddContacts.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(apiAddContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //
      .addCase(apiDeleteContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteContacts.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = null; // Исправлено с false на null
      })
      .addCase(apiDeleteContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //
      .addCase(apiLogOutUser.fulfilled, (state) => {
        state.contacts = []; 
      }),
});


export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return Array.isArray(contacts)
      ? contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            contact.number.includes(filter)
        )
      : [];
  }
);

export const contactsReducer = contactsSlice.reducer;
