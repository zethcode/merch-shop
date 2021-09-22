import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        setCart: (state, action) => {
            return {...state, cart: [...action.payload]}
        },
        addToCart: (state, action) => {
            return {...state, cart: [...state.cart, action.payload]}
        },
        updateCartItemQuantity: (state, action) => {
            console.log("ang payload", action)
            const cart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity
                }
                return cart
            })
            return {...state, cart: [...cart]}
        },
        removeFromCart: (state, action) => {
            const cart = state.cart.filter(item => item.id !== action.payload.id)
            return {...state, cart: [...cart]}
        },
        emptyCart: (state) => {
            return {...state, cart: []}
        }
    }
});

export const { setCart, addToCart, updateCartItemQuantity, removeFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer