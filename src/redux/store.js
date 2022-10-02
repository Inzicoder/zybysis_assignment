import { configureStore } from "@reduxjs/toolkit";
import filteredReducer from './filteredItemsSlice'


export default configureStore({
    reducer:{
        filteredItemsData:filteredReducer
    }
})