import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import snackbarSlice from './snackbarSlice';
import loadingSlice from './loadingSlice';
import loadingComponentSlice from './loadingComponentSlice';
import productsSlice from './productsSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        snackbar: snackbarSlice,
        loading: loadingSlice,
        loadingComponent: loadingComponentSlice,
        products: productsSlice
    }
})