import { createContext, useState, useEffect, useReducer } from "react";

export const ProductContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const updatedItems = [...state.items]

        if (existingItemIndex !== -1) {
            const updatedItem = {...updatedItems[existingItemIndex], count: updatedItems[existingItemIndex].count + 1}
            updatedItems[existingItemIndex] = updatedItem
        } else {
            const newItem = {...action.item, count: 1}
            updatedItems.push(newItem)
        }

        return {
            items: updatedItems
        }
    }

    if (action.type === "REMOVE_ITEM") {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id)

        const updatedItems = [...state.items]

        if (existingItemIndex !== -1) {
            const updatedItem = {...updatedItems[existingItemIndex], count: updatedItems[existingItemIndex].count - 1}
            updatedItems[existingItemIndex] = updatedItem

            if (updatedItem.count === 0) {
                updatedItems.splice(existingItemIndex, 1)
            }
        }
        return {items: updatedItems}
    }

    if (action.type === "CLEAR_CART") {
        return {items: []}
    }

    // Default case for unknown actions
    return state;
}

export function ProductProvider({children}) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    function addToCart(item) {
        dispatchCartAction({type: "ADD_ITEM", item})
    }

    function removeFromCart(id) {
        dispatchCartAction({type: "REMOVE_ITEM", id})
    }

    function clearCart() {
        dispatchCartAction({type: "CLEAR_CART"})
    }

    const cartContext = {
        items: cart.items,
        addItem: addToCart,
        removeItem: removeFromCart,
        clearCart: clearCart
    }

    return (
        <ProductContext.Provider value={cartContext}>
            {children}
        </ProductContext.Provider>
    )
}