import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []  // Sepetteki ürünler
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
        }
    }
});

export const { addToBasket, removeFromBasket, clearBasket, setBasket } = basketSlice.actions;
export default basketSlice.reducer;