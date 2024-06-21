import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch data asynchronously
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get('http://localhost:3000/api/inventory');
    return response.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        originalData: [],
        filteredData: [],
        status: 'idle',
        error: null,
        selectedMakes: [],
        selectedDurations: []
    },
    reducers: {
        setSelectedMakes: (state, action) => {
            state.selectedMakes = action.payload;
        },
        setSelectedDurations: (state, action) => {
            state.selectedDurations = action.payload;
        },
        applyFilters: (state) => {
            let filteredData = state.originalData;

            if (state.selectedMakes.length > 0) {
                filteredData = filteredData.filter(item => state.selectedMakes.includes(item.brand));
            }

            const now = new Date();
            if (state.selectedDurations.length > 0) {
                filteredData = filteredData.filter(item => {
                    const itemDate = new Date(item.timestamp);
                    return state.selectedDurations.some(duration => {
                        switch (duration) {
                            case 'Last month':
                                return itemDate > new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                            case 'This month':
                                return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
                            case 'Last 3 months':
                                return itemDate > new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                            case 'Last 6 months':
                                return itemDate > new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                            case 'This year':
                                return itemDate.getFullYear() === now.getFullYear();
                            case 'Last year':
                                return itemDate.getFullYear() === now.getFullYear() - 1;
                            default:
                                return false;
                        }
                    });
                });
            }

            state.filteredData = filteredData;
        },
        resetFilters: (state) => {
            state.selectedMakes = [];
            state.selectedDurations = [];
            state.filteredData = state.originalData;
        }
    },
    extraReducers: {
        [fetchData.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchData.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.originalData = action.payload || []; // Ensure it defaults to an empty array
            state.filteredData = action.payload || [];
        },
        [fetchData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

export const { setSelectedMakes, setSelectedDurations, applyFilters, resetFilters } = dataSlice.actions;

export default dataSlice.reducer;
