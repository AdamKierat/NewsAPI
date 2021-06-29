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

export const fetchByCategory = createAsyncThunk('articles/fetchByCategory', async (category) => {
    return request({
        method: 'get',
        url: `top-headlines?category=${category}&apiKey=${API_KEY}`,
    })
})


const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [],
        itemsCopy: [],
        status: StatusTypes.IDLE,
        error: null
    },
    reducers: {
        filterArticles: (state, action) => {
            var today = new Date();

            if (state.itemsCopy.length === 0) {  // xD
                state.itemsCopy = state.items;
            }

            if (action.payload === 'today') {
                today = today.toDateString();
                state.items = state.items.filter(function (data) {
                    var markerDate = new Date(data.publishedAt).toDateString();

                    return (markerDate === today);
                });
            } else if (action.payload === 'week') {
                var firstWeekDay = new Date(today.setDate(today.getDate() - today.getDay() + 1)).setHours(0,0,0,0);
                var lastWeekDay = new Date(today.setDate(today.getDate() - today.getDay() + 7)).setHours(0,0,0,0);
                state.items = state.items.filter(function (data) {
                    var markerDate = new Date(data.publishedAt).setHours(0,0,0,0);

                    return (markerDate >= firstWeekDay && markerDate <= lastWeekDay);
                });
            } else if (action.payload === 'month') {
                var firstMonthDay = new Date(today.getFullYear(), today.getMonth(), 1).setHours(0,0,0,0);

                state.items = state.items.filter(function (data) {
                    var markerDate = new Date(data.publishedAt).setHours(0,0,0,0);

                    return (markerDate >= firstMonthDay);
                });
            }
        },
        clearFilter: (state, action) => {
            state.items = state.itemsCopy;
            state.itemsCopy = [];
        },
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
        },
        [fetchByKeyword.rejected]: (state, action) => {
            state.status = StatusTypes.FAILED
            state.error = action.payload
        },

        // by country
        [fetchByCountry.pending]: (state) => {
            state.status = StatusTypes.LOADING
        },
        [fetchByCountry.fulfilled]: (state, action) => {
            state.status = StatusTypes.SUCCEEDED
            state.items = action.payload.articles
        },
        [fetchByCountry.rejected]: (state, action) => {
            state.status = StatusTypes.FAILED
            state.error = action.payload
        },

        // by category
        [fetchByCategory.pending]: (state) => {
            state.status = StatusTypes.LOADING
        },
        [fetchByCategory.fulfilled]: (state, action) => {
            state.status = StatusTypes.SUCCEEDED
            state.items = action.payload.articles
        },
        [fetchByCategory.rejected]: (state, action) => {
            state.status = StatusTypes.FAILED
            state.error = action.payload
        },
    }
})

export const selectAll = state => state.articles.items
export const {filterArticles} = articlesSlice.actions;
export const {clearFilter} = articlesSlice.actions;
export default articlesSlice.reducer