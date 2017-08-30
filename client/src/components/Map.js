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
import MapCenterMarker from './MapCenterMarker';
import MapCurrentLocationButton from './MapCurrentLocationButton';
import {requestPermission} from 'react-native-android-permissions';
import MapStoreLocationButton from './MapStoreLocationButton';

const {width, height} = Dimensions.get('window');

class Map extends Component {
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
      markers: [
        {latitude: 37.78825, longitude: -122.4324},
        {latitude: 38.78825, longitude: -122.4324},
        {latitude: 39.78825, longitude: -122.4324},
        {latitude: 40.78825, longitude: -122.4324},
        {latitude: 41.78825, longitude: -122.4324}
      ],
      marker: {}
     }
  }

  componentWillMount() {
    let component = this;
    // navigator.geolocation.getCurrentPosition( (position) => {
    //   console.log(`Current position is latitude: ${position.coords.latitude} and longitude: ${position.coords.longitude}`)
    //   console.log(`position.coords is ${JSON.stringify(position.coords)}`)
    // })


    // this.setState({
    //   region: {
    //     latitude: latitude,
    //     longitude: longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    //   },
    //   a: {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude
    //   }

    // })
  }

  getCurrentLocation() {
    console.log(`Im in getCurrentLocation in the Map.js!!`)
    let component = this;
      navigator.geolocation.getCurrentPosition( (position) => {
        console.log(`Current position is latitude: ${position.coords.latitude} and longitude: ${position.coords.longitude}`)
        console.log(`position.coords is ${JSON.stringify(position.coords)}`)
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        })

      }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, {enableHighAccuracy: true, timeout:500})
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  storeMarker() {
    console.log(`im in storeMarker in Map.js now!`)
    this.setState({ marker: { latitude: this.state.region.latitude, longitude: this.state.region.longitude }}, () => {
      console.log(`this.state.marker is now ${JSON.stringify(this.state.marker)}`)
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
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      }
    });

    return(
      <View>
        <View style={styles.mapContainer}>
        <MapCenterMarker height={styles.mapContainer.height} width={styles.mapContainer.width}/>
        <MapView style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}

            draggableCursor={'crosshair'}

            region={this.state.region} 
            onRegionChange={this.onRegionChange}
        >

         {this.state.markers.map((loc, index) => {return(
         <MapView.Marker
         coordinate={loc}
         key={index}
         />
       )})}
        </MapView>
        <MapCurrentLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getCurrentLocation={this.getCurrentLocation}/>
        <MapStoreLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} storeMarker={this.storeMarker}/>
        </View>

        <View><Text>{JSON.stringify(this.state.region)}</Text></View>
      </View>
    )
  }
}

export default Map

