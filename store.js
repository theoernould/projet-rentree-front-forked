import { configureStore } from '@reduxjs/toolkit'
import dishesReducer from './src/slices/Dishes'
import basketReducer from './src/slices/Basket'
import dishReducer from './src/slices/Dish'
import userReducer from './src/slices/User'
import ordersReducer from './src/slices/Orders'
import tagsReducer from './src/slices/Tags'
import dietsReducer from './src/slices/Diets'

export default configureStore({
    reducer: {
        dishes: dishesReducer,
        basket: basketReducer,
        dish: dishReducer,
        user : userReducer,
        orders: ordersReducer,
        tags: tagsReducer,
        diets: dietsReducer,
    }
})