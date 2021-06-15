import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "./features/articlesSlice";
import darkModeReducer from "./features/darkModeSlice";

export default configureStore({
    reducer: {
        articles: articlesReducer,
        darkMode: darkModeReducer
    }
})
