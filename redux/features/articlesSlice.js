import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StatusTypes } from '../../lib/constants'
import request from '../../services/request'
import { API_KEY } from '@env'



export const fetchArticlesByKeyword = createAsyncThunk('articles/fetchByKeyword', async (keyword) => {
    return request({
        method: 'get',
        url: `everything/everything?q="${keyword}"&apiKey=${API_KEY}`,
    })
})


const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [],
        status: StatusTypes.IDLE,
        error: null
    },
    extraReducers: {
        [fetchByKeyword.pending]: (state) => {
            state.status = statusTypes.LOADING
        },
        [fetchByKeyword.fulfilled]: (state, action) => {
            state.status = statusTypes.SUCCEEDED
            console.log(`API ZWROCILO: ${action.payload}`)
            state.items = action.payload
        },
        [fetchByKeyword.rejected]: (state, action) => {
            state.status = statusTypes.FAILED
            state.error = action.payload
        },
    }
})

export const selectAll = state => state.articles.items
export default articlesSlice.reducer