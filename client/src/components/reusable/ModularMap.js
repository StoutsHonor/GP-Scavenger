import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import MapCenterMarker from '../MapCenterMarker';
import MapCurrentLocationButton from './MapCurrentLocationButton';
import MapStoreLocationButton from './MapStoreLocationButton';
import currLocImage from '../../media/currentLocationMarker_85x85.png'
import GameDetailCallout from '../reusable/GameDetailCallout';
import SpeechBubble from 'react-native-speech-bubble';

const {width, height} = Dimensions.get('window');

class ModularMap extends Component {
  constructor(props){
    super(props)
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.storeMarker = this.storeMarker.bind(this);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [],
      currentLocation: { latitude: 27.854191, longitude: -81.385146 }
     }
  }

  componentWillMount() {
    console.log(`ModularMap - in componentWillMount()`)

    if (this.props.markers) { //markers indicate GPSChallenge
      console.log(`ModularMap - componentWillMount()`)
      console.log(`this.props.markers is ${JSON.stringify(this.props.markers)}`)
      this.setState({markers: this.props.markers})
    }

    if (this.props.data) { //data indicate JoinGame and StartANewGame
      const markers = this.props.data.map( (game) => {
        return { latitude: game.startLocation[0], longitude: game.startLocation[1]}
      })
      this.setState({markers}, () => {
        console.log(`ModularMap - componentWillReceiveProps - nextProps.games - this.state.markers is now ${JSON.stringify(this.state.markers)}`)
      })
    }

    this.getCurrentLocation()

  }

  componentDidMount() {

    let component = this
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(`ModularMap - componentDidMount - position is`, position)
        component.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }


  componentWillReceiveProps(nextProps) {
    console.log(`ModularMap - in componentWillReceiveProps()`)
    if (nextProps.markers) {
      this.setState({markers: nextProps.markers}, () => {
        console.log(`ModularMap - componentWillReceiveProps() - this.state.markers is ${JSON.stringify(this.state.markers)}`)
      })
    }

    if (nextProps.data) {
      const markers = nextProps.data.map( (game) => {
        return { latitude: game.startLocation[0], longitude: game.startLocation[1]}
      })
      this.setState({markers}, () => {
        console.log(`ModularMap - componentWillReceiveProps - nextProps.games - this.state.markers is now ${JSON.stringify(this.state.markers)}`)
      })
    }

  }

  getCurrentLocation() {
    console.log(`Im in getCurrentLocation in ModularMap.js!!`)
    let component = this;
      navigator.geolocation.getCurrentPosition( (position) => {
        console.log(`Current position is latitude: ${position.coords.latitude} and longitude: ${position.coords.longitude}`)
        console.log(`position.coords is ${JSON.stringify(position.coords)}`)
        component.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, { enableHighAccuracy: true })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  storeMarker() {
    console.log(`im in storeMarker in ModularMap.js now!`)
    this.setState({ marker: { latitude: this.state.region.latitude, longitude: this.state.region.longitude }}, () => {
      console.log(`this.state.marker is now ${JSON.stringify(this.state.marker)}`)
      if (this.props.onMarkerSubmit && this.props.submitAction === 'currentLocation') {
        console.log(`ModularMap - storeMarker() - in submitAction === 'currentLocation' `)
        this.props.onMarkerSubmit(this.state.currentLocation)
      } else if (this.props.onMarkerSubmit) {
        this.props.onMarkerSubmit(this.state.region)
      }
    })
  }

  render() {

    const styles = StyleSheet.create({
      mapContainer: {
        height: height*.85,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      tooltip: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 4,
        borderColor: '#000',
        width: 150
      },
      tooltipText: {
        fontWeight: 'bold',
        fontSize: 15
      }
    });
    console.log(`In ModularMap.js - render() - this.state.markers is ${JSON.stringify(this.state.markers)}`)
    return(
      <View>
        <View style={styles.mapContainer}>
        
        <MapView style={styles.map}
            region={this.state.region} 
            onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((loc, index) => {
          console.log(`ModularMap.js MapView Marker mapping - loc is ${JSON.stringify(loc)}`)
          if (this.props.data) {
            return (
              <MapView.Marker coordinate={loc} key={index}>
                <MapView.Callout onPress={() => {Actions.gameprofile({game: this.props.data[index], typeOfAction: this.props.viewmode})}} tooltip={true} style={styles.tooltip}>
                  <Text style={styles.tooltipText}>{this.props.data[index].name}</Text>
                  <Text style={styles.tooltipText}>{this.props.data[index].description}</Text>
                </MapView.Callout>
              </MapView.Marker>)
          } else {
            return(
              <MapView.Marker coordinate={loc} key={index} tooltip={true} style={styles.tooltip}>
                <MapView.Callout>
                  <Text style={styles.tooltipText}>{this.props.currentChallenge.name}</Text>
                  <Text style={styles.tooltipText}>{this.props.currentChallenge.description}</Text>
                </MapView.Callout>
              </MapView.Marker>)
          }
         })}
         {!!this.props.crosshair ? <MapCenterMarker height={styles.mapContainer.height} width={styles.mapContainer.width}/> : null }
         <MapView.Marker coordinate={this.state.currentLocation} image={'http://res.cloudinary.com/dyrwrlv2h/image/upload/v1504828467/currentLocationMarker_85x85_pw5bpq.png'} />
        </MapView>
        <MapCurrentLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getCurrentLocation={this.getCurrentLocation}/>
        <MapStoreLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} storeMarker={this.storeMarker}/>
        </View>

        <View><Text>Current Location: {JSON.stringify(this.state.currentLocation)}</Text></View>
      </View>
    )
  }
}


export default ModularMap

