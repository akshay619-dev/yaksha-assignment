import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMakes, setSelectedDurations, applyFilters, resetFilters } from '../app/store/dataSliceX';

const MultiFilter = () => {
    const dispatch = useDispatch();
    const { originalData, selectedMakes, selectedDurations } = useSelector(state => state.data);

    const [makes, setMakes] = useState([]);
    const durations = ['Last month', 'This month', 'Last 3 months', 'Last 6 months', 'This year', 'Last year'];

    useEffect(() => {
        const uniqueMakes = [...new Set(originalData.map(item => item.brand))];
        setMakes(uniqueMakes);
    }, [originalData]);

    const handleMakeChange = (make) => {
        const newSelectedMakes = selectedMakes.includes(make)
            ? selectedMakes.filter(m => m !== make)
            : [...selectedMakes, make];
        dispatch(setSelectedMakes(newSelectedMakes));
    };

    const handleDurationChange = (duration) => {
        const newSelectedDurations = selectedDurations.includes(duration)
            ? selectedDurations.filter(d => d !== duration)
            : [...selectedDurations, duration];
        dispatch(setSelectedDurations(newSelectedDurations));
    };

    const handleApplyFilters = () => {
        dispatch(applyFilters());
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div>
            <h2>Filters</h2>
            <div>
                <h3>Vehicle Makes</h3>
                {makes.map(make => (
                    <label key={make}>
                        <input
                            type="checkbox"
                            checked={selectedMakes.includes(make)}
                            onChange={() => handleMakeChange(make)}
                        />
                        {make}
                    </label>
                ))}
            </div>
            <div>
                <h3>Duration</h3>
                {durations.map(duration => (
                    <label key={duration}>
                        <input
                            type="checkbox"
                            checked={selectedDurations.includes(duration)}
                            onChange={() => handleDurationChange(duration)}
                        />
                        {duration}
                    </label>
                ))}
            </div>
            <button onClick={handleApplyFilters}>Apply Filters</button>
            <button onClick={handleResetFilters}>Reset All Filters</button>
        </div>
    );
};

export default MultiFilter;
