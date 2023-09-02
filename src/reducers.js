import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        removeUser: state => null
    }
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer