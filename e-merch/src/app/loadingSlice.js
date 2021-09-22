import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            return {...state, isLoading: action.payload.isLoading}
        }
    }
});

export const { setLoading } = loadingSlice.actions

export const selectLoadingStatus = state => state.loading.isLoading //{return {...state}}

export default loadingSlice.reducer
