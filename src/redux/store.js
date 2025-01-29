import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';

import contactsReducer from './contactsSlice';
import filterReducer from './filtersSlice';

const contactsConfig = {
  key: 'contactsKey',
  storage,
};

export const store = configureStore({
  reducer: {
    contactsData: persistReducer(contactsConfig, contactsReducer), // Persisted reducer
    filterValue: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
