import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {
            userId: null,
            email: null
        }
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails.userId = action.payload.userId
            state.userDetails.email = action.payload.email
            console.log("ang action", action)
        },
        setUserLogout: state => {
            state.userDetails.userId = null
            state.userDetails.email = null
        }
    }
});

export const { setUserDetails, setUserLogout } = userSlice.actions

export const selectUserDetails = state => state.user.userDetails

export default userSlice.reducer