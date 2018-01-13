import React, { Component } from 'react';

export class Data extends Component {

  fromKelvinToCelecius(temp) {
    return Math.round(parseFloat(temp) - 273.15);
  }

  render () {
    const data = this.props.data;
    const location = data.locationInfo;
    console.log(location)
    return (
      <div className="data">
        <ul>
          {/*location && <div style={{ height: "50px", width: "100%" }}>{location.name} <strong>{location.countryCode}</strong></div>*/}
          {
            data.tempInfos && data.tempInfos.map( state => {
              let iconInfos = state.weather[0];
              return (
                <li key={state.dt}>
                  <div className="img-thumbnail">
                    <img src={'http://openweathermap.org/img/w/'+iconInfos.icon+'.png'} alt={iconInfos.description} />
                    <h5><small>{state.weather.map(e => e.description)}</small></h5>
                  </div>
                  <div className='data-infos'>
                    <div className='left'>
                      <h5><small>{state.dt_txt}</small></h5>
                      <h5>Temp: {Math.round(parseFloat(state.main.temp) - 273.15)}°C</h5>
                      <h5>Max: {Math.round(parseFloat(state.main.temp_max) - 273.15)}°C</h5>
                      <h5>{'Min:'+ Math.round(parseFloat(state.main.temp_min) - 273.15)}°C</h5>
                    </div>
                    <div className='right'>
                      <h5>pressure: {state.main.pressure}</h5>
                      <h5>humidity: {state.main.humidity}%</h5>
                      <h5>wind: {Math.round(parseFloat(state.wind.speed) * 3.6 ) + " km/s, " + Math.round(state.wind.deg)}</h5>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

}
