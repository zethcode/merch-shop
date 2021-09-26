import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        updateCartItemQuantity: (state, action) => {
            console.log("ang payload", state.cart, action)
            state.cart.map((item) => {
                if(item.id === action.payload.id) {
                    item.quantity = action.payload.quantity
                }
                return item
            })
        },
        removeFromCart: (state, action) => {
            const cart = state.cart.filter(item => item.id !== action.payload.id)
            state.cart = [...cart]
        },
        emptyCart: (state) => {
            state.cart = []
        }
    }
});

export const { setCart, addToCart, updateCartItemQuantity, removeFromCart, emptyCart } = cartSlice.actions

export const selectCart = state => state.cart.cart
export const selectCartCount = state => state.cart.cart.length


export default cartSlice.reducer