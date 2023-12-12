import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";

export const tagsSlice = createSlice({
    name: 'tags',
    initialState: {
        value: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadTags.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const loadTags = createAsyncThunk(
    'tags/load',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/dishes/tags');
            return response.data;
        } catch (error) {
            toaster.warning(error.response.data);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = tagsSlice.actions;

export default tagsSlice.reducer