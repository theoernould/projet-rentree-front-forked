import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {toaster} from "evergreen-ui";

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: [],
        detailledBasket: []
    },
    reducers: {
        addDishesToBasket: (state, action) => {
            const { dishId, quantity } = action.payload;
            const existingDishIndex = state.basket.findIndex(item => item.id === dishId);
            if (existingDishIndex !== -1) {
                state.basket = state.basket.map((item, index) =>
                    index === existingDishIndex ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                const newBasketItem = { id: dishId, quantity: quantity };
                state.basket = [...state.basket, newBasketItem];
            }
        },
        removeDishesFromBasket: (state, action) => {
            const { dishId, quantity } = action.payload;
            const existingDishIndex = state.basket.findIndex(item => item.id === dishId);

            if (existingDishIndex !== -1) {
                const updatedBasket = [...state.basket];
                if (quantity === 0) {
                    updatedBasket.splice(existingDishIndex, 1);
                    state.detailledBasket = state.detailledBasket.filter((item) => item.id !== dishId);
                } else {
                    updatedBasket[existingDishIndex].quantity -= quantity;
                    if (updatedBasket[existingDishIndex].quantity <= 0) {
                        updatedBasket.splice(existingDishIndex, 1);
                        state.detailledBasket = state.detailledBasket.filter((item) => item.id !== dishId);

                    }
                }
                state.basket = updatedBasket;
            }
        },
        clearBasket: (state) => {
            state.basket = [];
            state.detailledBasket = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDetailledBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDetailledBasket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detailledBasket = action.payload;
            })
            .addCase(loadDetailledBasket.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export const selectBasketSize = (state) => {
    return state.basket.basket.reduce((total, item) => total + item.quantity, 0);
}

export const getQuantities = (state) => {
    const quantities = {};
    state.basket.basket.forEach(item => {
        quantities[item.id] = item.quantity;
    });
    return quantities;
}

export const loadDetailledBasket = createAsyncThunk(
    'basket/load',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const axiosPromises = state.basket.basket.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/dishes/' + e.id );
                return response.data;
            } catch (error) {
                toaster.danger("erreur lors du chargement du panier");
                return null;
            }
        });

        try {
            return await Promise.all(axiosPromises);
        } catch (error) {
            toaster.danger("erreur lors du chargement du panier");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const selectTotalPrice = (state) => {
    if (state === undefined || state.basket === undefined || state.basket.basket === undefined || state.basket.basket.length === 0) {
        return 0;
    }
    return state.basket.detailledBasket.reduce((total, item) => total + item.price*state.basket.basket.find((element) => element.id === item.id)?.quantity, 0);
}

export const { addDishesToBasket, removeDishesFromBasket, load } = basketSlice.actions

export default basketSlice.reducer