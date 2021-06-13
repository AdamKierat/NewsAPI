import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: {
        isDark: false,
    },
    reducers: {
        switchMode: (state) => {
            state.isDark = !state.isDark
        },

    },
})

export const { switchMode } = darkModeSlice.actions

export default darkModeSlice.reducer