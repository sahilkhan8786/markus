// ProgressContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context
const ParkProgressContext = createContext();

// Create a Provider component
export const ParkProgressProvider = ({ children }) => {
    const [clickedMarkers, setClickedMarkers] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const savedMarkers = JSON.parse(localStorage.getItem('clickedMarkers')) || [];
        const savedProgress = JSON.parse(localStorage.getItem('progress')) || 0;

        setClickedMarkers(savedMarkers);
        setProgress(savedProgress);
    }, []);

    useEffect(() => {
        localStorage.setItem('clickedMarkers', JSON.stringify(clickedMarkers));
        localStorage.setItem('progress', JSON.stringify(progress));
    }, [clickedMarkers, progress]);

    return (
        <ParkProgressContext.Provider value={{ clickedMarkers, setClickedMarkers, progress, setProgress }}>
            {children}
        </ParkProgressContext.Provider>
    );
};

// Custom hook for using context
export const useParkProgress = () => useContext(ParkProgressContext);
