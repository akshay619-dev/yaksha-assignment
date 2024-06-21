import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

// Async thunk to fetch data
export const fetchData = createAsyncThunk('data/fetchData', async () => {
    const response = await axios.get('http://localhost:3000/api/inventory');
    return response.data;
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        filteredData: [],
        make: '',
        duration: '',
        status: 'idle',
        error: null
    },
    reducers: {
        setMake(state, action) {
            state.make = action.payload;
            state.filteredData = filterData(state);
        },
        setDuration(state, action) {
            state.duration = action.payload;
            state.filteredData = filterData(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.filteredData = filterData(state);
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

const filterData = (state) => {
    let filtered = state.data;

    if (state.make) {
        filtered = filtered.filter(car => car.brand.toLowerCase() === state.make.toLowerCase());
    }

    if (state.duration) {
        const now = moment();
        let startDate;
        switch (state.duration.toLowerCase()) {
            case 'last month':
                startDate = moment().subtract(1, 'months').startOf('month');
                break;
            case 'this month':
                startDate = moment().startOf('month');
                break;
            case 'last 3 months':
                startDate = moment().subtract(3, 'months').startOf('month');
                break;
            case 'last 6 months':
                startDate = moment().subtract(6, 'months').startOf('month');
                break;
            case 'this year':
                startDate = moment().startOf('year');
                break;
            case 'last year':
                startDate = moment().subtract(1, 'years').startOf('year');
                break;
            default:
                startDate = moment(0);
        }
        filtered = filtered.filter(car => moment(car.timestamp).isAfter(startDate));
    }

    return filtered;
};

export const { setMake, setDuration } = dataSlice.actions;

export default dataSlice.reducer;
