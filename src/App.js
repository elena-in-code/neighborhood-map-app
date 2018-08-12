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
      locations: locationsInfo,
    }
    this.initMap = this.initMap.bind(this);
  }

componentDidMount() {
  this.loadingMap();
  this.wikipediaCall();
}

initMap() {
  const madridCoord = {lat: 40.417036, lng: -3.703816};
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: madridCoord, 
    zoom: 13
  })
  let marker = new window.google.maps.Marker({
    position: madridCoord,
    map: map
  })
  this.state.locations.map(location => {
    new window.google.maps.Marker({
      position: location.position,
      map: map
    })
  })
}

loadingMap() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF3Tz_J23Bb4xflymzOMsyf2NCtgrZCa8&callback=initMap";

  window.initMap = this.initMap;
  document.body.appendChild(script);
};

wikipediaCall() {
  fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=600&exintro=1&explaintext=1&titles=Madrid&format=json&origin=*&formatversion=2')
  .then( response => response.json())
  .then( data => {
    //console.log('data', data)
    //console.log(data.query.pages[0].extract)
  })
  }

  render() {
    return (
      <div id="App">
        <div id="map" role="application"></div>
      </div>
    );
  }
}

export default App;