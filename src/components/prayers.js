
import React, { Component } from 'react';
import { Form } from "./form";
import { Data } from "./data";

export class Pray extends Component {
    
    render = () => {
      let timings = this.props.prayer.prayersTime;
        return (
            <div>
                <Form onLoadData={this.props.onLoadPrayersTime} data={this.props.data} />
                <div className="data">
                  <ul>
                    {/*location && <div style={{ height: "50px", width: "100%" }}>{location.name} <strong>{location.countryCode}</strong></div>*/}
                    {
                      timings && 
                      <li>
                    <div className='data-infos text-center' style={{ width: "100%"}}>
                          <div className='left' >
                            <h5>{timings.currentTime}</h5>
                            <h5>Fajr: {timings.timings.Fajr} </h5>
                            <h5>Dhuhr: {timings.timings.Dhuhr}</h5>
                            <h5>Asr: {timings.timings.Asr}</h5>
                          </div>
                          <div className='right'>
                            <h5>Maghrib: {timings.timings.Maghrib}</h5>
                            <h5>Isha: {timings.timings.Isha}</h5>
                            <h5>Sunrise: {timings.timings.Sunrise}</h5>
                            <h5>Sunset: {timings.timings.Sunset}</h5>
                          </div>
                        </div>
                      </li>
                    }
                  </ul>
                </div>
            </div>
        )
    }

}