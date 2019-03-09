import { 
    ADD_GEOLOCATION, 
    CHANGE_ERROR, 
    ADD_ITEMS, 
    CHANGE_ERROR_MESSAGE, 
    CHANGE_CITIES, 
    DELETE_CITY,
    CHANGE_CONNECTION,
    CHANGE_CITY_LOADING
} 
from '../Constants/Constants';

const addGeoLocation = (payload) => {
    return {
        type: ADD_GEOLOCATION,
        payload: payload
    }
}

const changeErrorMessage = (payload) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        payload: payload
    }
}

const fetchWeatherDetails = (payload) => {
    return dispatch => {
        fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${payload.latitude}&lon=${payload.longitude}&units=metric&appid=77ecdef2774b68532b3d0361cc5c769e`)
            .then(response => response.json())
            .then(result => {
                return dispatch({
                    type: ADD_ITEMS,
                    payload: result
                });
            })
            .catch(error => {
                return dispatch({
                    type: CHANGE_ERROR
                })
            });
    }
}

const fetchCityId = (payload) => {
    return dispatch => {
        fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${payload.cityName}&units=metric&appid=77ecdef2774b68532b3d0361cc5c769e`)
            .then(response => response.json())
            .then(result => {
                return dispatch({
                    type: CHANGE_CITIES,
                    payload: result
                });
            })
            .catch(error => {
                return dispatch({
                    type: CHANGE_ERROR
                })
            });
    }
}

const deleteCity = (payload) => {
    return {
        type: DELETE_CITY,
        payload: payload
    }
}

const changeConnection = (payload) => {
    return {
        type: CHANGE_CONNECTION,
        payload: payload
    }
}

const changeCityLoading = (payload) => {
    return {
        type: CHANGE_CITY_LOADING,
        payload: payload
    }
}

const changeError = (payload) => {
    return {
        type: CHANGE_ERROR,
        payload: payload
    }
}

export {
    addGeoLocation,
    changeErrorMessage,
    fetchWeatherDetails,
    fetchCityId,
    deleteCity,
    changeConnection,
    changeCityLoading,
    changeError
};