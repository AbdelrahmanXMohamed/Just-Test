import { configureStore } from "@reduxjs/toolkit";
import cardReducer from '../feature/card/cardSlice';
export const store = configureStore({
    reducer: {
        card: cardReducer
    },
})