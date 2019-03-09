import React from 'react';
import { connect } from 'react-redux';
import importAll from '../Utility/import';
import location from '../../src/location.png';
import { deleteCity } from '../Action/ActionCreator';
import Loader from './Partials/Loader';
import isNumberFloat from '../Utility/isNumberFloat';
const images = importAll(require.context("../../public/assets/img/", false, /.*\.png$/));

const CityBody = ({ cities, removeCityFromStore, error, isCityLoading }) => {
    let cityBody;

    const removeCity = (event) => {
        event.stopPropagation();
        let index = event.currentTarget.id;  
        let parent = event.target.parentElement;
        parent.classList.replace("bounceIn", "bounceOut");
        setTimeout(() => {
            removeCityFromStore({
                index: index
            });
        }, 1000);    
    }

    cityBody = cities.map((city, index) => {
        return (
            <li id = {city.name} className="col-md-3 col-4 list-city animated bounceIn" key={city.name + index}>
                <i id={index} className="close-button" onClick={removeCity}>X</i>
                <span>
                    <img className="location" src={location} alt={"location"} />
                    {city.sys.country}
                    <br />
                    {city.name}
                </span>
                <span>
                    <img className="animated bounceIn location" src={images[`${city.weather[0].main.toLowerCase()}.png`]} alt="" />
                    {(isNumberFloat(city.main.temp)) ? city.main.temp.toFixed(1) : city.main.temp}ºC 
                    <br />
                    {city.weather[0].main}
                </span>
                <span style = {{fontSize:"15px"}}>
                min_      
                {(isNumberFloat(city.main.temp_min)? city.main.temp_min.toFixed(1) : city.main.temp_min )}ºC
                <br />
                max_ 
                {(isNumberFloat(city.main.temp_max)? city.main.temp_max.toFixed(1) : city.main.temp_max )}ºC 
                </span>
            </li>
        );
    });

    return (
        <React.Fragment>
            
            {!isCityLoading && cityBody}
            {isCityLoading && <Loader />}
        </React.Fragment>
    );
}

const MapStateToProps = (state) => {
    return { cities: state.cities, isCityLoading: state.isCityLoading }
}

const MapDispatchToProps = (dispatch) => {
    return {
        removeCityFromStore: (payload) => {
            dispatch(deleteCity(payload));
        }
    }
}


let connectedCityBody = connect(MapStateToProps, MapDispatchToProps)(CityBody);

export default React.memo(connectedCityBody);
