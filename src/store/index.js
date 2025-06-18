import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './basketSlice';
import favoriteReducer from './favoriteSlice';

export const store = configureStore({
    reducer: {
        basket: basketReducer,
        favorite: favoriteReducer,
    }
});