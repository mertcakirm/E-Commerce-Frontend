import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: []  // Favori ürünler
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(item => item.productCode !== action.payload);
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload;
        }
    }
});

export const { addFavorite, removeFavorite, setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;