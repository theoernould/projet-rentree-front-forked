import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        value: {},
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrderInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrderInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadOrderInfo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload === "Vous n'êtes pas connecté") {
                    state.value = {};
                }
            });
    },
});

export const loadOrderInfo = createAsyncThunk(
    'order/load',
    async (id,thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                toaster.danger("Vous n'êtes pas connecté");
                return thunkAPI.rejectWithValue("Vous n'êtes pas connecté");
            }
            toaster.danger(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = orderSlice.actions;

export default orderSlice.reducer