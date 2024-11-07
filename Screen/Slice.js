import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    favorites: [],
  },
  reducers: {
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    loadFavorites(state, action) {
      state.favorites = action.payload;
    },
  },
});

export const { setContacts, addFavorite, loadFavorites } = contactSlice.actions;
export default contactSlice.reducer;
