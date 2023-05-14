import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizzas from './slices/pizzasSlice'
import search from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
    search,
  },
})