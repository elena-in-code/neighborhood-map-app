import React, { Component } from 'react';
//style
import './App.css';
//json
import * as locationsInfo from '../src/locationsInfo.json';
//components
import List from './components/List';
import Selector from './components/Selector';
import InfoDisplay from './components/InfoDisplay';

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
    this.handleLocationInformation = this.handleLocationInformation.bind(this);
    this.handleSelector = this.handleSelector.bind(this);
    this.handleSelectorAll = this.handleSelectorAll.bind(this);
  }

componentDidMount() {
  this.loadingMap();
}
//google API
loadingMap() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDF3Tz_J23Bb4xflymzOMsyf2NCtgrZCa8&callback=initMap";
  script.onerror = () => {
    window.alert("Something went wrong, sorry. Please refresh the page")
  }
  window.initMap = this.initMap;
  document.body.appendChild(script);
}; 
//Map & Markers & event on markers
initMap() {
  const madridCoord = {lat: 40.417036, lng: -3.703816};
  let map = new window.google.maps.Map(document.getElementById('map'), {
    center: madridCoord, 
    zoom: 13
  });
  this.setState({
    map
  });

  this.state.locations.map(location => {
    let marker = new window.google.maps.Marker({
      position: location.position,
      map: map,
      title: location.name,
      animation: window.google.maps.Animation.DROP
    });
    this.state.markers.push(marker);
    marker.addListener('click', () => {
      this.handleLocationInformation(location);
    })
  })
}
//Wikipedia API
wikipediaCall = (location) => {
  const locationURL = location.locationURL;
  fetch(`htps://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=600&exintro=1&explaintext=1&titles=${locationURL}&format=json&origin=*&formatversion=2`)
  .then( response => response.json())
  .then( data => {
    const getLocationContent = data.query.pages[0].extract;
    this.setState({
      locationsContent: getLocationContent
    })
  })
  .catch( error => {
    window.alert("Something went wrong, sorry. Please refresh the page")
  })  
}
//List functionality
handleLocationInformation(location) {
  this.wikipediaCall(location);
  let marker = this.state.markers.filter(marker => 
    marker.title === location.name
  )
  marker[0].setAnimation(window.google.maps.Animation.BOUNCE)
    setTimeout( () => marker[0].setAnimation(null), 
    1400)
}
//Selector functionality
filterInfo(location) {
  this.wikipediaCall(location)
  this.state.markers.map( marker => {
    marker.setMap(this.state.map)
    if (marker.title === location.name) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout( () => marker.setAnimation(null), 1400)
    } else {
      marker.setMap('')
    }
  })
}

handleSelector(event) {
  event.preventDefault();
  this.state.locations.map(location => {
    let currentPlace = document.getElementById(`${location.name}`)

    if (event.target.value === 'all') {
      this.handleSelectorAll();
    } else if (event.target.value === currentPlace.id) {
      currentPlace.style.display = 'block'
      this.filterInfo(location)
    } else {
      currentPlace.style.display = 'none'
    }
  })
}

handleSelectorAll() {
  let OptionLocations= document.querySelectorAll('.listItem');
  OptionLocations.forEach(OptionLocation => {
    OptionLocation.style.display = 'block';
  })
  this.state.markers.map( marker => {
    marker.setMap(this.state.map)
    marker.setAnimation(window.google.maps.Animation.DROP)
  })
  this.setState( { 
    locationsContent: '' 
  } )
}

render() {
    return (
      <div id="App">
        <div tabIndex="0" id="map" role="application"></div>
        <aside tbIndex="0" className="sidebar">
          <h3 tabIndex="0">Madrid Best Museums</h3>
          <label htmlFor="select">
            <select tabIndex="0" className="select" onChange={this.handleSelector}>
                <option value="all">
                  All
                </option>
            {this.state.locations.map(location => (
                <Selector
                location={location}
                />
              ))}
            </select>
          </label>

          <ul>
            {this.state.locations.map(location => (
              <List 
              location={location}
              onLocationClick={this.handleLocationInformation}
              />
            ))}
          </ul>
          <hr/>

          <InfoDisplay 
          locationsContent={this.state.locationsContent}/>

        </aside>
      </div>
    );
  }
}

export default App;