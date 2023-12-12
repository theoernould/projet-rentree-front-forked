import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const dishSlice = createSlice({
    name: 'dish',
    initialState: {
        value: {},
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDish.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDish.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const loadDish = createAsyncThunk(
    'dish/load',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/dishes/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = dishSlice.actions;

export default dishSlice.reducer