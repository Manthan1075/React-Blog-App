import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/authSlice'

const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    }
})

export default store