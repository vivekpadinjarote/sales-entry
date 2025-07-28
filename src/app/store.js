import {configureStore} from '@reduxjs/toolkit'
import headerReducer from "../features/header/headerSlice"
import detailReducer from "../features/detail/detailSlice"

export const store = configureStore({
    reducer:{
        header: headerReducer,
        detail: detailReducer,
    },
})