import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    filteredData: [],
    make: '',
    duration: '',
};

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
            state.filteredData = action.payload;
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload;
        },
        setMake: (state, action) => {
            state.make = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setData, setFilteredData, setMake, setDuration } = inventorySlice.actions;

// Selectors
export const selectData = (state) => state.inventory.data;
export const selectFilteredData = (state) => state.inventory.filteredData;
export const selectMake = (state) => state.inventory.make;
export const selectDuration = (state) => state.inventory.duration;

// Reducer
export default inventorySlice.reducer;
