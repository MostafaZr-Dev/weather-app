import React from 'react';
import {connect} from 'react-redux';
import CityBody from './CityBody';
import ErrorMessage from './ErrorMessage';

const CitiesInfo = ({cities}) => {
    let cityName = (cities.length) ? 
    <ul className = "text-center wrapper-search animated fadeIn">
      <CityBody />
    </ul>
    : 
    "";

    return (
        <div className="col-12 animated zoomIn">
            {cityName.length !== 0 && cityName}
            {cityName.length === 0 && <ErrorMessage class = "error-msg mb-5">
              Find a city and tap on it to add
            </ErrorMessage>}
        </div>
    );
}

const MapStateToProps = (state) => {
    return {cities: state.cities}
}

let connectedCitiesInfo = connect(MapStateToProps)(CitiesInfo);

export default connectedCitiesInfo;