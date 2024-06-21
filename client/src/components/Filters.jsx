import React from 'react';
import { useDispatch } from 'react-redux';
import { setMake, setDuration } from '../app/store/dataSlice';

const Filters = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <label>
                Vehicle Make:
                <input type="text" onChange={(e) => dispatch(setMake(e.target.value))} />
            </label>
            <label>
                Duration:
                <select onChange={(e) => dispatch(setDuration(e.target.value))}>
                    <option value="">Select Duration</option>
                    <option value="last month">Last Month</option>
                    <option value="this month">This Month</option>
                    <option value="last 3 months">Last 3 Months</option>
                    <option value="last 6 months">Last 6 Months</option>
                    <option value="this year">This Year</option>
                    <option value="last year">Last Year</option>
                </select>
            </label>
        </div>
    );
};

export default Filters;
