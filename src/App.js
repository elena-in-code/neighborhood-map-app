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
  //this.wikipediaCall();
  console.log(this.state.locationsContent);
}

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
    //console.log(location);
    //console.log('MARKER',marker);
    marker.addListener('click', () => {
      this.wikipediaCall(location)
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

wikipediaCall = (location) => {
  //console.log(location.locationURL);
  const locationURL = location.locationURL;
  fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=600&exintro=1&explaintext=1&titles=${locationURL}&format=json&origin=*&formatversion=2`)
  .then( response => response.json())
  .then( data => {
    const getLocationContent = data.query.pages[0].extract;
    this.setState({
      locationsContent: getLocationContent
    })
    console.log(this.state.locationsContent);
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