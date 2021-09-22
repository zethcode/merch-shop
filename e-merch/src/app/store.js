import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import snackbarSlice from './snackbarSlice';
import loadingSlice from './loadingSlice';

export default configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        snackbar: snackbarSlice,
        loading: loadingSlice
    }
})