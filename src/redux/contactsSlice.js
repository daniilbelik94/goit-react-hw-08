import { createSlice } from '@reduxjs/toolkit';
import listcontacts from '../listcontacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: listcontacts },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter((contact) => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
