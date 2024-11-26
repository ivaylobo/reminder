import popupReducer from "./add-popup-slice.ts";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {popupData: popupReducer}
});

export type RootState = ReturnType<typeof store.getState>;

export default store;