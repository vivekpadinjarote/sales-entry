import {configureStore} from '@reduxjs/toolkit'
import headerReducer from "../features/header/headerSlice"
import detailReducer from "../features/detail/detailSlice"
// import itemReducer from "../features/item/itemSlice"

export const store = configureStore({
    reducer:{
        header: headerReducer,
        detail: detailReducer,
        // itme: itemReducer,
    },
})