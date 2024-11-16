import React, { createContext, useState } from 'react';

// Create the context
export const WebDataContext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(false);
    return (
        <WebDataContext.Provider value={{ data, setData,loading,setloading }}>
            {children}
        </WebDataContext.Provider>
    );
}

export default DataContext;
