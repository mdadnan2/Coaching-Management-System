import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    islogin: false
}

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        entry: (state) => {
            state.islogin = true
        },
        logout: (state) => {
            state.islogin = false
        }
    },
})

export const { entry, logout } = LoginSlice.actions

export default LoginSlice.reducer