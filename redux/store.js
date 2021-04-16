import { configureStore } from '@reduxjs/toolkit'
import  articlesSlice  from "./features/articlesSlice";

export default configureStore({
    reducer: {
        articles: articlesReducer
    }
})
