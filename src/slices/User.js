import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {},
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload === "Vous n'êtes pas connecté") {
                    state.value = {};
                }
            });
    },
});

export const loadUserInfo = createAsyncThunk(
    'user/load',
    async (thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/info');
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                return thunkAPI.rejectWithValue("Vous n'êtes pas connecté");
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = userSlice.actions;

export default userSlice.reducer