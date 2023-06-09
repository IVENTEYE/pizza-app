import { createSlice } from "@reduxjs/toolkit"; 


const initialState = {
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: "популярности", sortProperty: 'rating'
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setActiveSort(state, action) {
            state.sort = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.pageCount = Number(action.payload.pageCount);
            state.sort = action.payload.sort;
        }
    }
});

export const { setCategoryId, setActiveSort, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;