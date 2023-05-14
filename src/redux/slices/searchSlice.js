import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    visibility: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setVisibility(state, action) {
            state.visibility = action.payload;
        }
    }
});

export const { setVisibility } = searchSlice.actions;
export default searchSlice.reducer