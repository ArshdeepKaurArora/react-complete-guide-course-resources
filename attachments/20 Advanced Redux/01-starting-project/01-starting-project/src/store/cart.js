import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    toggleCart: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.totalAmount += newItem.price;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);
            state.totalQuantity--;
            state.totalAmount -= existingItem.price;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== itemId);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        toggleCart(state) {
            state.toggleCart = !state.toggleCart;
        }
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;