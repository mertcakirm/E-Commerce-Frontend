import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    refresh: false
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromBasket: (state, action) => {
            state.items = state.items.filter(item => item.productCode !== action.payload);
        },
        clearBasket: (state) => {
            state.items = [];
        },
        setBasket: (state, action) => {
            state.items = action.payload;
        },
        toggleRefresh: (state) => {
            state.refresh = !state.refresh;
        },
    }
});

export const { addToBasket, removeFromBasket, clearBasket, setBasket,toggleRefresh } = basketSlice.actions;
export default basketSlice.reducer;