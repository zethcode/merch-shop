import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        isOpen: false,
        isAdded: false,
        severity: null,
        message: null
    },
    reducers: {
        setAlert: (state, action) => {
            console.log("snack payload", {...state, ...action.payload})
            return {...action.payload}
        },
    }
});

export const { setAlert } = snackbarSlice.actions

export const selectIsOpen = state => state.snackbar.isOpen
export const selectProductIsAdded = state => state.snackbar.isAdded
export const selectSeverity = state => state.snackbar.severity
export const selectMessage = state => state.snackbar.message

export default snackbarSlice.reducer