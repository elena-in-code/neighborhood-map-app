import React, { Component } from 'react';
//style
import './App.css';
//json
import * as locationsInfo from '../src/locationsInfo.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      map : '',
      markers: [],
      locations: locationsInfo,
      locationsContent: ''
    }
    this.initMap = this.initMap.bind(this);
  }

componentDidMount() {
  this.loadingMap();
}

loadingMap() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF3Tz_J23Bb4xflymzOMsyf2NCtgrZCa8&callback=initMap";
  window.initMap = this.initMap;
  document.body.appendChild(script);
}; 

initMap() {
  const madridCoord = {lat: 40.417036, lng: -3.703816};
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: madridCoord, 
    zoom: 13
  })
  this.setState({
    map
  })
  this.state.locations.map(location => {
    let marker = new window.google.maps.Marker({
      position: location.position,
      map: map,
      animation: window.google.maps.Animation.DROP
    });
    this.state.markers.push(marker);
    marker.addListener('click', () => {
      this.wikipediaCall(location)
    })
  })
}

wikipediaCall = (location) => {
  const locationURL = location.locationURL;
  fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=600&exintro=1&explaintext=1&titles=${locationURL}&format=json&origin=*&formatversion=2`)
  .then( response => response.json())
  .then( data => {
    const getLocationContent = data.query.pages[0].extract;
    this.setState({
      locationsContent: getLocationContent
    })
  })  
}


render() {
    return (
      <div id="App">
        <div id="map" role="application"></div>
        <section className="sidebar">

          <select className="">
              <option>
                All
              </option>
          {this.state.locations.map(location => (
              <option>
                {location.title}
              </option>
            ))}
            
          </select>

          <ul>
            {this.state.locations.map(location => (
              <li>
                {location.title}
              </li>
            ))}
          </ul>

          <div id="content" onclick={this.initMap}>
            {/*title??name*/}
            <p>{this.state.locationsContent}</p>
          </div>

        </section>
      </div>
    );
  }
}

export default App;