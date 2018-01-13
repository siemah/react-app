import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import axios from "axios";
// import components
import { Form } from './components/form';
import { Data } from './components/data';
import { Pray } from './components/prayers';
import Header from './components/header';
import About from './components/about';

//import style
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prayer: {
        location: null,
        prayersTime: null
      },
      meteoState: {
        tempInfos: [], locationInfo:{}
      }, formState: {
        status: "Load"
      }
    };
    this.loadWeatherState = this.loadWeatherState.bind(this);
    this.onLoadPrayersTime = this.onLoadPrayersTime.bind(this);
  }

  onResponse = response => {
    const data = response.data;
    if (response.status === 200 && response.statusText === "OK") {
      let meteo = {
        tempInfos: data.list,
        locationInfo: {
          lon: data.city.coord.lon,
          lat: data.city.coord.lat,
          countryCode: data.city.country,
          idCity: data.city.id,
          name: data.city.name
        }
      };
      this.setState({
        meteoState: meteo,
        formState: {
          status: "load",
          action: 'http://api.openweathermap.org/data/2.5/forecast?units=Standard&appid=25b2e0ea31b7770653296673cd123d4a&q='
        }
      });
    }
  }

  onCatchError = err => console.log(err)

  loadDataFrom(location, url){

  }
  
  loadWeatherState(location, url) {
    this.setState({
      formState: {
        status: "loading.."
      }
    });
    axios
      .get('http://api.openweathermap.org/data/2.5/forecast?units=Standard&appid=25b2e0ea31b7770653296673cd123d4a&q=' + location)
      .then(response => {
        this.onResponse(response);
      })
      .catch(err => { console.log(err) });
  }

  onLoadPrayersTime = (location, url = '') => {
    this.setState({
      formState: {
        status: "loading.."
      }
    });
    axios
      .get('http://api.aladhan.com/addressInfo?address=' + location)
      .then(response => {
        if ( response.status === 200 && response.statusText === "OK" ){
          axios
            .get('http://api.aladhan.com/timings/'+Math.round(new Date().getTime() / 1000)+'?latitude=' + 
            response.data.data.latitude + 
            '&longitude=' + response.data.data.longitude + 
            '&timezonestring=' + response.data.data.timezone+'&method=4'
          ).then( res => {
            const data = res.data;
            if( data.code === 200 && data.status === "OK" )
              this.setState({
                prayer: {
                  location: location,
                  prayersTime: {
                    currentTime: data.data.date.readable,
                    timings: data.data.timings
                  }
                }, meteoState: {
                  tempInfos: [],
                  locationInfo: {}
                }, formState: {
                  status: "load"
                }
              });
          }).catch(e=> console.log(e))
        }

      })
      .catch(err => { console.log(err) });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div id="main">
            <Header />
            <Route exact path="/" component={About} />
            <Route path="/weather" render={() => {
              return (
                <div className="main">
                  <Form onLoadData={this.loadWeatherState} data={this.state.formState} />
                  <Data data={this.state.meteoState} location={this.state.locationInfo} />
                </div>
              );
             }} />
            <Route path="/pray" render={
              () => <Pray onLoadPrayersTime={this.onLoadPrayersTime} data={this.state.formState} prayer={this.state.prayer} />
             } />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
