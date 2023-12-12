import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";
import {basketSlice} from "./Basket";


export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        value: [],
        orderDetails: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadOrders.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(loadDetailledOrders.pending, (state) => {
                    state.status = 'loading';
            })
            .addCase(loadDetailledOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetails = action.payload;
            })
            .addCase(loadDetailledOrders.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

export const loadOrders = createAsyncThunk(
    'orders/load',
    async ({ sortType = 'DATE', sortOrder = 'DESC' }, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders?sortBy=${sortType}&sortOrder=${sortOrder}`);
            return response.data;
        } catch (error) {
            toaster.danger("Il y a eu une erreur dans le chargement des commandes");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loadDetailledOrders = createAsyncThunk(
    'orders/loadDetailled',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const axiosPromises = state.orders.value.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/' + e.id );
                return response.data;
            } catch (error) {
                toaster.danger("Une commande n'a pas pu être chargé");
                return null;
            }
        });

        try {
            return await Promise.all(axiosPromises);
        } catch (error) {
            toaster.danger(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addOrder = createAsyncThunk(
    'orders/add',
    async ({ addressInput, basket }, thunkAPI) => {
        if (addressInput === null || addressInput === undefined || addressInput === '') {
            toaster.warning('Veuillez renseigner une adresse');
            return thunkAPI.rejectWithValue("L'adresse est vide");
        }
        const d = {
            orderContent: {},
            address: addressInput
        };

        basket.forEach(e => {
            if(e.quantity>0){
                d.orderContent[e.id]=e.quantity;
            }
        });

        try {
            await axios.post('http://localhost:8080/api/orders', d);
            toaster.success('Votre commande a bien été envoyée');
            thunkAPI.dispatch(basketSlice.actions.clearBasket());
            return true;
        } catch (error) {
            toaster.warning('Une erreur est survenue');
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const { load } = ordersSlice.actions;

export default ordersSlice.reducer