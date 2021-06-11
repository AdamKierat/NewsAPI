import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {StatusTypes} from '../../lib/constants'
import request from '../../services/request'
import {API_KEY} from '@env'


export const fetchByKeyword = createAsyncThunk('articles/fetchByKeyword', async (keyword) => {
    return request({
        method: 'get',
        url: `everything?q=${keyword}&apiKey=${API_KEY}`,
    })
})

export const fetchByCountry = createAsyncThunk('articles/fetchByCountry', async (country) => {
    return request({
        method: 'get',
        url: `top-headlines?country=${country}&apiKey=${API_KEY}`,
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
        // by keyword
        [fetchByKeyword.pending]: (state) => {
            state.status = StatusTypes.LOADING
            console.info('API ZAPYTANIE TRWA:')
        },
        [fetchByKeyword.fulfilled]: (state, action) => {
            state.status = StatusTypes.SUCCEEDED
            state.items = action.payload.articles
            console.info(action.payload.articles[0])
        },
        [fetchByKeyword.rejected]: (state, action) => {
            state.status = StatusTypes.FAILED
            state.error = action.payload
        },

        // by country
        [fetchByCountry.pending]: (state) => {
            state.status = StatusTypes.LOADING
            console.info('API ZAPYTANIE TRWA:')
        },
        [fetchByCountry.fulfilled]: (state, action) => {
            state.status = StatusTypes.SUCCEEDED
            state.items = action.payload.articles
            console.info(action.payload.articles[0])
        },
        [fetchByCountry.rejected]: (state, action) => {
            state.status = StatusTypes.FAILED
            state.error = action.payload
        },
    }
})

export const selectAll = state => state.articles.items
export default articlesSlice.reducer