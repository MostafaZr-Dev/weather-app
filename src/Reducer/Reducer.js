import {
    ADD_GEOLOCATION,
    ADD_ITEMS,
    CHANGE_ERROR,
    CHANGE_ERROR_MESSAGE,
    CHANGE_CITIES,
    DELETE_CITY,
    CHANGE_CONNECTION,
    CHANGE_CITY_LOADING
} from '../Constants/Constants';

let initState = {
    latitude: null,
    longitude: null,
    items: null,
    isLoading: true,
    isCityLoading: false,
    error: false,
    errorMessage: null,
    isConnect: true,
    cities: []
}

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_GEOLOCATION:
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
            }

        case ADD_ITEMS:
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }

        case CHANGE_ERROR:
            return {
                ...state,
                error: action.payload.status
            }
        case CHANGE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: { ...action.payload },
                isLoading: false
            }

        case CHANGE_CONNECTION:
            return {
                ...state,
                isConnect: action.payload.status,
            }

        case CHANGE_CITIES:
            if (parseInt(action.payload.cod) === 404) {
                return {
                    ...state,
                    error: true,
                    isCityLoading:false
                };
            } else {
                return {
                    ...state,
                    error: false,
                    cities: [
                        ...state.cities,
                        { ...action.payload }
                    ],
                    isCityLoading: false      
                }
            }
        case DELETE_CITY:
            let newCities = state.cities.filter((item, index) => {
                return index !== parseInt(action.payload.index)
            });
            return {
                ...state,
                cities: newCities,
                isCityLoading: false,
                error: false
            }
        case CHANGE_CITY_LOADING:
            return {
                ...state,
                isCityLoading: action.payload.status,   
            }
        default:
            return state;
    }
}

export default Reducer;