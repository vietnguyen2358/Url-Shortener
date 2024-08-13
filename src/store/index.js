import { configureStore } from "@reduxjs/toolkit";
import urlSlice from "./url-slice";

const store = configureStore({
    reducer: {
        url: urlSlice
    }
})

export default store;