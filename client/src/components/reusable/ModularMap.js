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
import {requestPermission} from 'react-native-android-permissions';
import MapStoreLocationButton from './MapStoreLocationButton';
import currLocImage from '../../media/currentLocationMarker_35x35.png'

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
      currentLocation: {}
     }
  }

  componentWillMount() {
    console.log(`ModularMap - in componentWillMount()`)

    if (this.props.markers) {
      console.log(`ModularMap - componentWillMount()`)
      console.log(`this.props.markers is ${JSON.stringify(this.props.markers)}`)
      this.setState({markers: this.props.markers})
    }

    if (this.props.data) {
      const markers = this.props.data.map( (game) => {
        return { latitude: game.startLocation[0], longitude: game.startLocation[1]}
      })
      this.setState({markers}, () => {
        console.log(`ModularMap - componentWillReceiveProps - nextProps.games - this.state.markers is now ${JSON.stringify(this.state.markers)}`)
      })
    }

    this.getCurrentLocation()
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
      this.watchId = navigator.geolocation.watchPosition( (position) => {
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
      }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })
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
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      }
    });
    console.log(`In ModularMap.js - render() - this.state.markers is ${JSON.stringify(this.state.markers)}`)
    return(
      <View>
        <View style={styles.mapContainer}>
        <MapCenterMarker height={styles.mapContainer.height} width={styles.mapContainer.width}/>
        <MapView style={styles.map}
            draggableCursor={'crosshair'}
            region={this.state.region} 
            onRegionChange={this.onRegionChange}
        >
        {this.state.markers.map((loc, index) => {
          console.log(`ModularMap.js MapView Marker mapping - loc is ${JSON.stringify(loc)}`)
          return( <MapView.Marker coordinate={loc} key={index} />
         )})}

         <MapView.Marker
          coordinate={this.state.currentLocation}
          image={currLocImage}
         />

        </MapView>
        <MapCurrentLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getCurrentLocation={this.getCurrentLocation}/>
        <MapStoreLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} storeMarker={this.storeMarker}/>
        </View>

        <View><Text>{JSON.stringify(this.state.region)}</Text></View>
      </View>
    )
  }
}

export default ModularMap

