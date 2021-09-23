import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        isOpen: false,
        success: false,
        severity: null,
        message: null
    },
    reducers: {
        setAlert: (state, action) => {
            return {...action.payload}
        },
    }
});

export const { setAlert } = snackbarSlice.actions

export const selectIsOpen = state => state.snackbar.isOpen
export const selectSuccess = state => state.snackbar.success
export const selectSeverity = state => state.snackbar.severity
export const selectMessage = state => state.snackbar.message

export default snackbarSlice.reducer