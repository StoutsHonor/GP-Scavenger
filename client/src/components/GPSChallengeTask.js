import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import Map from './Map'

class GPSChallengeTask extends Component {
  constructor(props) {
    super(props)
    this.onMapMarkerSubmit = this.onMapMarkerSubmit.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.state = {
      name: '',
      description: '',
      time_limit: '',
      markers: [],
      currentLocation: []
    }
  }

  componentWillMount() {
    console.log(`this is ${JSON.stringify(this.props.currentChallenge)}`)
    if (this.props.currentChallenge.location) {
      //console.log(`nextProps in GPSChallengeTask is ${JSON.stringify(this.props.currentChallenge)}`)
      
      this.setState({ markers: [{ latitude: this.props.currentChallenge.location[0], longitude: this.props.currentChallenge.location[1] }] })
    }
  }

  onMapMarkerSubmit(location) {
    //check if the current gps location matches the marker location
    console.log(`in GPSChallengeTask.js, onMapMarkerSubmit() - location is ${JSON.stringify(location)}`)
    this.checkLocation(location)
  }

  checkLocation(location) {
    //check if the 
    this.setState({currentLocation: location})
    console.log(`this.state.markers is ${JSON.stringify(this.state.markers)}`)
    console.log(`this.state.markers[0].latitude is typeof ${typeof this.state.markers[0].latitude} and location.latitude typeof is ${typeof location.latitude}}`)
    if (this.state.markers[0].latitude.toFixed(3) === location.latitude.toFixed(3) && this.state.markers[0].longitude.toFixed(3) === location.longitude.toFixed(3)) {
      console.log('YEAH RIGHT LOCATION')
    } else {
      console.log('WRONG LOCATION TRY AGAIN!!!')
    }
  }

  render() {
    console.log(`GPSChallengeTask this.state.markers: ${JSON.stringify(JSON.stringify(this.state.markers))}`)
    return(
      <View style={{padding:10}}>
        <Map onMarkerSubmit={this.onMapMarkerSubmit} markers={this.state.markers } />
        <Text>Title: {this.props.currentChallenge.name}</Text>
        <Text>Description: {this.props.currentChallenge.description}</Text>
        <Text>Description: {this.props.currentChallenge.location}</Text>
        <Text>Current Location is: {JSON.stringify(this.state.currentLocation)}</Text>
      </View>
    )
  }

}

export default GPSChallengeTask