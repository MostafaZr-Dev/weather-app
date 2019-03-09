import React from 'react';
import {connect} from 'react-redux';
import importAll from '../Utility/import';
import isNumberFloat from '../Utility/isNumberFloat';

const images = importAll(require.context("../../public/assets/img/", false, /.*\.png$/));

const WeatherInfo = ({items}) => {
    let error = false,weather,temp,tempMin, tempMax,city,country,hour;
    if("cod" in items && parseInt(items.cod) === 400){
        error = true;
    }else{
        error = false;
        weather = (items) ? items.weather[0].main : "";
        temp = (items) ? items.main.temp: "";
        tempMin = (items) ? items.main.temp_min: "";
        tempMax = (items) ? items.main.temp_max: "";
        city = (items) ? items.name: "";
        country = (items) ? items.sys.country: "";
        hour = new Date().getHours();
    }
    
    return (
        <React.Fragment>
            {!error && <React.Fragment><div className = "mx-auto img-weather">
                <img className="animated bounceIn" src={images[`${weather.toLowerCase()}.png`]} alt="" />
            </div> 
            <span className="min animated fadeIn">
                <strong>Min</strong><br />
                {`${tempMin}ºC`}
            </span>
            <span className="max animated fadeIn">
                <strong>Max</strong><br />
                {`${tempMax}ºC`}
            </span>
            <h2 className="mt-3 temp animated fadeIn">{`${(isNumberFloat(temp))? temp.toFixed(1) : temp}ºC`}</h2>
            <h2 className="mt-3 animated fadeIn">{weather.toUpperCase()}</h2>
            <div className="col names mt-5 pt-3 animated bounceIn">
                <span className="city animated fadeIn">{city}</span>
                <span className="country animated fadeIn">{country}</span>
            </div></React.Fragment>}
            {error && <div className = "error-msg">Try Again</div>}
        </React.Fragment>
    );
}
const MapStateToProps = (state) => {
    return {items: state.items}
}
let connectedWeatherInfo = connect(MapStateToProps)(WeatherInfo);

export default connectedWeatherInfo;