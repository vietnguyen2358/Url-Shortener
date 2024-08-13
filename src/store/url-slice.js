import { createSlice } from "@reduxjs/toolkit";

const initialState = { inputValue: '', shortenedLink: '', copied: false }

const urlSlice = createSlice({
    name: 'input',
    initialState,
    changed: false,
    reducers: {
        setInputValue: (state, action) => {
            state.inputValue = action.payload;
        },
        setShortenedLink: (state, action) => {
            state.shortenedLink = action.payload;
        },
        setCopied: (state, action) => {
            state.copied = action.payload;
        }
    }
})

export const { setInputValue, setShortenedLink, setCopied } = urlSlice.actions;

export default urlSlice.reducer;