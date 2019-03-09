import React, {
  Component
} from 'react';
import location from './location.png';
import offlineImg from './offline.png';
import otherLocation from './other-location.png';
import {connect} from 'react-redux';
import Theme from './Components/Theme';
import Header from './Components/Header';
import Wrapper from './Components/Wrapper';
import WeatherInfo from './Components/WeatherInfo';
import CitiesInfo from './Components/CitiesInfo';
import ErrorMessage from './Components/ErrorMessage';
import Loader from './Components/Partials/Loader';
import swal from '@sweetalert/with-react';
import {
  addGeoLocation,
  changeErrorMessage,
  fetchWeatherDetails,
  fetchCityId,
  changeConnection,
  changeCityLoading,
  changeError
} from './Action/ActionCreator';

class App extends Component {

  success = (position) => {
    const {saveGeoLocation} = this.props;
    saveGeoLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  error = (error) => {
    const {saveErrorMessage} = this.props;
    saveErrorMessage({
      error: error.message
    });
  }

  getCityId = (event) => {
      let cityName = event.target.value;
      
      if(cityName !== ""){
        this.props.changeStatusCityLoading({
          status: true
        });

        this.props.changeStatusError({
          status: false
        });

        this.props.fetchCityId({
          cityName: cityName
        });
        
        event.target.value = "";
      }  
  }

  componentDidMount() {
    const {saveErrorMessage, errorMessage, isConnect, changeStatusConnection} = this.props;

    if(navigator.onLine){ 
      changeStatusConnection({
        status: true
      });
    } else{
      changeStatusConnection({
        status: false
      });
    }

    if(isConnect){
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.success, this.error,{timeout: 10000});
      } else {
        saveErrorMessage({
          error: "Geolocation is not supported by this browser"
        });
        return;
      }

      if(!errorMessage){
        setTimeout(() => {
          const {latitude, longitude} = this.props;
          this.props.fetchWeatherDetails({
              latitude:latitude,
              longitude:longitude
          });
        }, 3000);
      }

    }
    }

    

  render() {
    const {isLoading, errorMessage,error, isConnect} = this.props;
    let isError = error;
    return (
      <div className="container">
          <Theme />
          <div className = "row">
            {!isConnect && <div className = "col-md-6 col-sm-12 col-12 mx-auto text-center mt-3">
                <ErrorMessage class = "error-msg">
                  <img src = {offlineImg} alt = {offlineImg} />
                  The connection is disconnected
                </ErrorMessage>
              </div>
            }
            {isConnect && <React.Fragment>
              <div className = "col-md-6 col-sm-12 col-12">
                  <Header>
                    <img className = "location" src={location} alt="location"/>
                    Current Location
                  </Header>
                  <Wrapper>
                    {!isLoading && !errorMessage && <WeatherInfo />}
                    {isLoading && <Loader />} 
                    {errorMessage && <ErrorMessage class = "error-msg">{errorMessage.error}</ErrorMessage>}
                  </Wrapper>
              </div>

              <div className = "col-md-6 col-sm-12 col-12">
                  <Header>
                      <img className = "other-location" src={otherLocation} alt="location"/>
                      Other Locations
                  </Header> 
                <div className = "col-12 mt-3 city">
                    <div className = "col-12 form-group">
                        <input className = "form-control search animated zoomIn" onBlur = {this.getCityId} onKeyUp = {(event) => {
                            if(event.keyCode === 13){
                              event.preventDefault();
                              this.getCityId(event);
                            }
                        }} placeholder = "City Name..." />
                    </div>
                    {isError && swal({
                        title: "Ooops!!!",
                        text: "The name of the city is not correct",
                        icon: "error",
                        button: "OK",
                        className: "alert-modal"
                        }) && 
                        true
                    } 
                    <CitiesInfo />
                </div>
              </div>
            </React.Fragment>
            }                  
          </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
    return state;
}

const MapDispatchToProps = dispatch => {
    return {
        saveGeoLocation: payload => {
          dispatch(addGeoLocation(payload));
        },
        saveErrorMessage: payload => {
            dispatch(changeErrorMessage(payload));
        },
        fetchWeatherDetails: (payload) => {
            dispatch(fetchWeatherDetails(payload));
        },
        fetchCityId: (payload) => {
          dispatch(fetchCityId(payload));
        },
        changeStatusConnection: (payload) =>{
          dispatch(changeConnection(payload));
        },
        changeStatusCityLoading: (payload) => {
          dispatch(changeCityLoading(payload));
        },
        changeStatusError: (payload) => {
          dispatch(changeError(payload));
        }
    }
}

let connectedApp = connect(MapStateToProps,  MapDispatchToProps)(App);

export default connectedApp;