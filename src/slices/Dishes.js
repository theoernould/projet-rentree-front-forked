import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        value: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDishes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDishes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDishes.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const loadDishes = createAsyncThunk(
    'dishes/load',
    async (query, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/dishes', { params: query });
            return response.data;
        } catch (error) {
            toaster.danger(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load, addDishes } = dishesSlice.actions;

export default dishesSlice.reducer