import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusTypes } from '../lib/constants'
import request from '../services/request'




export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
    return request({
        method: 'get',
        url: 'Projects',
    })
})


const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [],
        status: statusTypes.IDLE,
        error: null
    },
    extraReducers: {
        [fetchProjects.pending]: (state) => {
            state.status = statusTypes.LOADING
        },
        [fetchProjects.fulfilled]: (state, action) => {
            state.status = statusTypes.SUCCEEDED
            state.items = action.payload.projectList
        },
        [fetchProjects.rejected]: (state, action) => {
            state.status = statusTypes.FAILED
            state.error = action.payload
        },
    }
})

export const selectAll = state => state.articles.items
export default articlesSlice.reducer