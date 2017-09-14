import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MapView from 'react-native-maps';
import MapCenterMarker from '../MapCenterMarker';
import MapCurrentLocationButton from './MapCurrentLocationButton';
import MapStoreLocationButton from './MapStoreLocationButton';
import currLocImage from '../../media/currentLocationMarker_85x85.png'
import GameDetailCallout from '../reusable/GameDetailCallout';
import io from "socket.io-client";
import config from "../../../config/config";
import CustomCallout from './CustomCallout';
import MapMarkerLocationButton from './MapMarkerLocationButton';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const ZOOM_LEVEL = 6000
const LATITUDE_DELTA = 60 / ZOOM_LEVEL;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const propTypes = {
  children: PropTypes.node.isRequire,
  style: PropTypes.object
};

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameName: state.play.gameInfo.roomId,
    team1: state.play.currentGameTeam1,
    team2: state.play.currentGameTeam2
  }
}

class ModularMap extends Component {
  constructor(props){
    super(props)
    this.onRegionChange = this.onRegionChange.bind(this);
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.storeMarker = this.storeMarker.bind(this);
    this.socket = io(config.localhost);
    this.distanceAway = this.distanceAway.bind(this);
    this.getGPSChallengeMarkerLocation = this.getGPSChallengeMarkerLocation.bind(this);
    
    this.state = {
      region: {
        latitude: 33.9760019,
        longitude: -118.3930801,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      currentLocation: { latitude: 27.854191, longitude: -81.385146 },
      teamMemberMarkers: []
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
        //emit event here
        //test that the player was removed from ga
        if (component.props.currentChallenge) {
          console.log(`ModularMap - watchPosition() - if currentChallenge statement`)
          this.socket.emit("updatePlayerLocation", { gameName: this.props.gameName, userId: this.props.userId, latitude: position.coords.latitude, longitude: position.coords.longitude })
          const destLatitude = component.props.currentChallenge.location[0]
          const destLongitude = component.props.currentChallenge.location[1]
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${position.coords.latitude},${position.coords.longitude}&destination=${destLatitude},${destLongitude}&mode=walking&key=${config.maps}`          
          console.log(`url is ${url}`)
          fetch(url)
          .then(response => {
            console.log(`Google Maps response is ${JSON.stringify(response)}`)
            return response.json()})
          .then(data => {
            console.log(`Google Maps directions response is`)
            let distance = data.routes[0].legs[0].distance.text
            console.log(`distance is ${JSON.stringify(distance)}`)
            this.props.onUpdateDistanceFromCheckpoint(distance)
          })
          .catch((err) => {
            console.error(err);
          });
          
          
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 3 },
    );

    this.socket.on("updatePlayersLocation", (playersLocations) => {
      const index = component.props.team1.indexOf(component.props.userId)
      const playerMarkers = []
      console.log(`this.props.userId is ${this.props.userId} and index is ${index} and ${JSON.stringify(playersLocations)}`)
      console.log(`updatePlayersLocation - #1 ${JSON.stringify(component.props.team1)} - #2 ${JSON.stringify(component.props.team2)}`)
      if (index > -1) {
        component.props.team1.forEach( (member, i) => {
          if(member !== component.props.userId) {
            playerMarkers.push(playersLocations[member])
          }
        })
      } else {
        component.props.team2.forEach( (member, i) => {
          if(member !== component.props.userId) {
            playerMarkers.push(playersLocations[member])
          }
        })
      }

      component.setState({ teamMemberMarkers: playerMarkers }, () => {
        console.log(`ModularMap - componentDidMount() - updatePlayersLocation event`)
        console.log(`teamMemberMarkers is ${JSON.stringify(this.state.teamMembersMarkers)}`)
      })
      //if you're in team1, then set markers to only team 1
      //else set to team 2
      //get the markers for the team only
      //display the usernames in a callout bubble
    })
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

  getGPSChallengeMarkerLocation() {
    console.log(`this.state.markers is ${JSON.stringify(this.state.markers)}`)
    console.log(`this.state.markers[0] is ${JSON.stringify(this.state.markers[0])}`)
    this.setState({
      region: {
        latitude: this.state.markers[0].latitude,
        longitude: this.state.markers[0].longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
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
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
        if (component.props.currentChallenge) {
          console.log(`ModularMap - getCurrentLocation() - if currentChallenge statement`)
          this.socket.emit("updatePlayerLocation", { gameName: this.props.gameName, userId: this.props.userId, latitude: position.coords.latitude, longitude: position.coords.longitude })
          const destLatitude = component.props.currentChallenge.location[0]
          const destLongitude = component.props.currentChallenge.location[1]
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${position.coords.latitude},${position.coords.longitude}&destination=${destLatitude},${destLongitude}&mode=walking&key=${config.maps}`          
          console.log(`url is ${url}`)
          fetch(url)
          .then(response => {
            console.log(`Google Maps response is ${JSON.stringify(response)}`)
            return response.json()})
          .then(data => {
            console.log(`Google Maps directions response is`)
            let distance = data.routes[0].legs[0].distance.text
            console.log(`distance is ${JSON.stringify(distance)}`)
            this.props.onUpdateDistanceFromCheckpoint(distance)
          })
          .catch((err) => {
            console.error(err);
          });
        }
      }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, { enableHighAccuracy: true })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId)
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  distanceAway(marker, callback) {
    const destLatitude = this.props.currentChallenge.location[0]
    const destLongitude = this.props.currentChallenge.location[1]
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${position.coords.latitude},${position.coords.longitude}&destination=${destLatitude},${destLongitude}&mode=walking&key=${config.maps}`          
    console.log(`url is ${url}`)
    fetch(url)
    .then(response => {
      console.log(`Google Maps response is ${JSON.stringify(response)}`)
      return response.json()})
    .then(data => {
      console.log(`Google Maps directions response is`)
      let distance = data.routes[0].legs[0].distance.text
      console.log(`distance is ${JSON.stringify(distance)}`)
      callback(distance)
    })
    .catch((err) => {
      console.error(err);
    });
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
        height: height*.90,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      tooltip: {
        backgroundColor: '#FFE4AA',
      },
      tooltipText: {
        fontWeight: 'bold',
        fontSize: 15
      },
      container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
      },
      bubble: {
        width: 140,
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#4da2ab',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
      },
      amount: {
        flex: 1,
      },
      arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#4da2ab',
        alignSelf: 'center',
        marginTop: -32,
      },
      arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
      },
      customView: {
        width: 140,
        height: 100,
      },
      
    });
    console.log(`In ModularMap.js - render() - this.state.markers is ${JSON.stringify(this.state.markers)}`)
    console.log(`teamMemberMarkers is ${JSON.stringify(this.state.teamMemberMarkers)}`)
    console.log(`latitude and longitude delta are...${LATITUDE_DELTA} and ${LONGITUDE_DELTA}`)
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
              <MapView.Marker coordinate={loc} key={index} calloutOffset={{ x: -8, y: 28 }} calloutAnchor={{ x: 0.5, y: -0.4 }}>
                <MapView.Callout onPress={() => {Actions.gameprofile({game: this.props.data[index], typeOfAction: this.props.viewmode, buttonaction: this.props.buttonaction})}} tooltip style={styles.customView}>
                  <CustomCallout>
                        <Text style={{fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic', fontSize: 17, textAlign: 'center', color: '#FFF'}}>{this.props.data[index].name}....</Text>
                  </CustomCallout>
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
         
        <MapView.Marker coordinate={this.state.currentLocation} image={'http://res.cloudinary.com/dyrwrlv2h/image/upload/v1504828467/currentLocationMarker_85x85_pw5bpq.png'}>
         <MapView.Callout tooltip style={styles.customView}>
          <CustomCallout>
           <Text style={{fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic', fontSize: 17, textAlign: 'center', color: '#FFF'}}>You are here :)</Text>
          </CustomCallout>
         </MapView.Callout>
        </MapView.Marker>

         {this.state.teamMemberMarkers.length > 0 ? 
            (this.state.teamMemberMarkers.map( (playerLoc, index) => {
              console.log(`playerLoc is ${JSON.stringify(playerLoc)}`)
              return (
                <MapView.Marker coordinate={playerLoc} key={index} pinColor={'black'}>
                  <MapView.Callout>
                    <Text style={styles.tooltipText}>{playerLoc.userId}</Text>
                  </MapView.Callout>
                </MapView.Marker>
            )}))
            :
            null
         }

        </MapView>
        { this.props.currentChallenge ?
          <MapMarkerLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getGPSChallengeMarkerLocation={this.getGPSChallengeMarkerLocation}/>
          :
          null
        }
        <MapCurrentLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} getCurrentLocation={this.getCurrentLocation}/>
        
        { this.props.hideMapSubmit ?
          null
          : 
          <MapStoreLocationButton height={styles.mapContainer.height} width={styles.mapContainer.width} storeMarker={this.storeMarker} storeMarkerText={this.props.storeMarkerText} storeMarkerButtonError={this.props.storeMarkerButtonError}/>
        }
        
        </View>
      </View>
    )
  }
}


export default connect(mapStateToProps)(ModularMap);
