import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: () => {
            return {
                isAuthenticated: true
            }
        },
        logout: () => {
            return {
                isAuthenticated: false
            }
        }
    }
})

export default authSlice.reducer;
export const authActions = authSlice.actions;