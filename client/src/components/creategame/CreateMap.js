import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import {requestPermission} from 'react-native-android-permissions';
import CreateMapCenterMarker from './CreateMapCenterMarker';
import CreateMapCurrentLocationButton from './CreateMapCurrentLocationButton';
import CreateMapStoreLocationButton from './CreateMapStoreLocationButton';


// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField} from '../../actions/index.js'


// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    createGameStartingLocation: state.create.createGameStartingLocation,
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enteredField}, dispatch)
}

const {width, height} = Dimensions.get('window');

class CreateMap extends Component {
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
    console.log('component willmount: props:', this.props);
    this.getCurrentLocation()

  }

  componentWillReceiveProps(nextProps) {
    console.log('willreceive: nextprop:', nextProps)
  }

  getCurrentLocation() {
    console.log(`Im in getCurrentLocation in the Map.js!!`)
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
      }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, {enableHighAccuracy: true, timeout:500})
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  storeMarker() {
    console.log('props: ', this.props)
    this.props.enteredField('createGameStartingLocation', this.state.region)
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

    return(
      <View>

        <View style={styles.mapContainer}>
        <CreateMapCenterMarker height={styles.mapContainer.height} width={styles.mapContainer.width}/>
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
        />)})}

        </MapView>
        <CreateMapCurrentLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getCurrentLocation={this.getCurrentLocation}/>
        <CreateMapStoreLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} storeMarker={this.storeMarker}/>
        </View>

        <View><Text>{JSON.stringify(this.state.region)}</Text></View>
        <Button
          title='see props'
          onPress={() => console.log('props:', this.props)}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMap)

