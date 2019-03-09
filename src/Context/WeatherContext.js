import React from 'react';

const WeatherContext = React.createContext({
    lantitude: null,
    longitude: null,
    items: null,
    errorMessage: ""
});

export default WeatherContext;