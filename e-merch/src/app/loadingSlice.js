import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            return {...action.payload}
        }
    }
});

export const { setLoading } = loadingSlice.actions

export const selectLoadingStatus = state => state.loading.isLoading

export default loadingSlice.reducer
