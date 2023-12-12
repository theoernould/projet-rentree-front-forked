import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";
export const dietsSlice = createSlice({
    name: 'diets',
    initialState: {
        value: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDiets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDiets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDiets.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const loadDiets = createAsyncThunk(
    'diets/load',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/dishes/diets');
            return response.data;
        } catch (error) {
            toaster.danger(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = dietsSlice.actions;

export default dietsSlice.reducer