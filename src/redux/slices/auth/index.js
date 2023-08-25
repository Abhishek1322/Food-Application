import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {},
    userSignUp: {},
    isLoggedIn: false,
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: ({
        userLogin: (state) => {
            state.loading = true
        },
        setUserLogin: (state, action) => {
            state.loading = false
            state.isLoggedIn = true
            state.userInfo = action.payload
        },
        logout: (state) => {
            state.loading = true
        },
        setLogout: (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userSignUp = {}
            state.isLoggedIn = false
        },
        onErrorStopLoad: (state) => {
            state.loading = false
        }
    }),
})

// Action creators are generated for each case reducer function
export const { userLogin, setUserLogin, userSignUp, setUserSignUp,logout, setLogout,onErrorStopLoad } = authSlice.actions

export default authSlice.reducer