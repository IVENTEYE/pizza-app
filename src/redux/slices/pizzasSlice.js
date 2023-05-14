import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { category, sortBy, order, search, pageCount } = params;
    const { data } = await axios.get(`https://6358109bc26aac906f3ad42c.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
    return data;
});

const initialState = {
    items: [],
    status: 'loading' // loading | success | error
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    }, 
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
});


export const { setItems, } = pizzasSlice.actions;
export default pizzasSlice.reducer