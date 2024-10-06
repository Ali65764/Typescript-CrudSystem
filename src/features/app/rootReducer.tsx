import { combineReducers } from "@reduxjs/toolkit";
import products from "../slices/productSlice"


const rootReducer = combineReducers({
    products,
})


export default rootReducer;