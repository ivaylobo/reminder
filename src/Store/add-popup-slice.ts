import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PopupFormStateType, FormData} from "../Types/PopupFormStateType.ts";
import moment from "moment";

const localStorageData: FormData[] | [] = JSON.parse(window.localStorage.getItem('formData') || 'null') as FormData[] || [];


const initialState: PopupFormStateType = {
    isVisible: false,
    formData: localStorageData as FormData[],
    currentEntry: null
}

const popupDataSlice = createSlice({
    name: 'add-popup',
    initialState,
    reducers: {
        togglePopup: (state) => {
            state.isVisible = !state.isVisible;
        },
        addPopupData(state, action: PayloadAction<FormData>) {
            if (state.currentEntry) {
                state.formData.map((entry, index) => {
                    if(entry.id === state.currentEntry!.id) {
                        state.formData[index].name = action.payload.name;
                        state.formData[index].description = action.payload.description;
                        state.formData[index].date = action.payload.date;
                    }
                })
            }
            else{
                state.formData!.push(action.payload);
            }

            if (state.formData.length > 0) {
                state.formData = state.formData.sort((a, b) => {
                    const dateA = moment(a.date, 'YYYY-MM-DD').valueOf();
                    const dateB = moment(b.date, 'YYYY-MM-DD').valueOf();
                    return dateA - dateB;
                });
            }

            localStorage.setItem('formData', JSON.stringify(state.formData));
            state.currentEntry = null;

        },

        deletePopupData (state, action: PayloadAction<number>){
            state.formData = state.formData.filter((item) => item.id !== action.payload);
            state.currentEntry = null;
            localStorage.setItem('formData', JSON.stringify(state.formData));
        },


        setCurrentEntry(state, action: PayloadAction<number>) {
            state.currentEntry = state.formData.find(entry => entry.id === action.payload) || null;
        }
    }
});

export const popupActions = popupDataSlice.actions;

export default popupDataSlice.reducer;