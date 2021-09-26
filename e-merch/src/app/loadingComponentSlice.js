import { createSlice } from '@reduxjs/toolkit'

const loadingComponentSlice = createSlice({
    name: 'loadingComponent',
    initialState: {
        isLoading: false,
        component: null,
        message: null
    },
    reducers: {
        setLoadingComponent: (state, action) => {
            state.isLoading = action.payload.isLoading
            state.component = action.payload.component
            state.message = action.payload.message
        }
    }
});

export const { setLoadingComponent } = loadingComponentSlice.actions

export const selectLoadingComponentStatus = state => state.loadingComponent.isLoading
export const selectComponentMessage = state => state.loadingComponent.message
export const selectComponent = state => state.loadingComponent.component

export default loadingComponentSlice.reducer
