import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ModularMap from '../../reusable/ModularMap';

const {width, height} = Dimensions.get('window');

class GPSChallengeTask extends Component {
  constructor(props) {
    super(props)
    this.onMapMarkerSubmit = this.onMapMarkerSubmit.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.showNotYetAtLocation = this.showNotYetAtLocation.bind(this);
    this.onUpdateDistanceFromCheckpoint = this.onUpdateDistanceFromCheckpoint.bind(this);
    this.state = {
      name: '',
      description: '',
      time_limit: '',
      markers: [],
      currentLocation: [],
      message: 'Not yet! Get a little closer...',
      fadeOutAnim: new Animated.Value(0),
      distanceAway: '999999 ft'
    }
  }

  componentWillMount() {
    console.log(`this is componentWillMount in GPSChallengeTask ${JSON.stringify(this.props.currentChallenge)}`)
      this.setState({ markers: [{ latitude: this.props.currentChallenge.location[0], longitude: this.props.currentChallenge.location[1] }] })
  }

  componentWillReceiveProps(nextProps) {
    console.log(`this is componentWillReceiveProps in GPSChallengeTask ${JSON.stringify(this.props.currentChallenge)}`)
      this.setState({ markers: [{ latitude: nextProps.currentChallenge.location[0], longitude: nextProps.currentChallenge.location[1] }] })
  }

  onMapMarkerSubmit(location) {
    //check if the current gps location matches the marker location
    console.log(`in GPSChallengeTask.js, onMapMarkerSubmit() - location is ${JSON.stringify(location)}`)
    this.checkLocation(location)
  }

  onUpdateDistanceFromCheckpoint(distanceAway) {
    console.log(`onUpdateDistanceFromCheckpoint`)
    this.setState({ distanceAway })
  }

  checkLocation(location) {
    //check if the 
    this.setState({currentLocation: location})
    console.log(`this.state.markers is ${JSON.stringify(this.state.markers)}`)
    console.log(`this.state.markers[0].latitude is typeof ${typeof this.state.markers[0].latitude} and location.latitude typeof is ${typeof location.latitude}}`)
    if (this.state.markers[0].latitude.toFixed(3) === location.latitude.toFixed(3) && this.state.markers[0].longitude.toFixed(3) === location.longitude.toFixed(3)) {
      console.log('YEAH RIGHT LOCATION')
      this.props.challengeCompleted()
    } else {
      console.log('WRONG LOCATION TRY AGAIN!!!')
      this.showNotYetAtLocation()
    }
  }

  showNotYetAtLocation() {
    console.log(`blaaaaaaaaah`)
    this.setState({ fadeOutAnim: new Animated.Value(1)}, () => {
      setTimeout( ()=> {
        Animated.timing(
          this.state.fadeOutAnim,
          {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
          }
        ).start(() => {
          this.setState({ fadeOutAnim: 0})
        });
      },750)

    })
  }

  render() {
    console.log(`GPSChallengeTask this.state.markers: ${JSON.stringify(JSON.stringify(this.state.markers))}`)
    console.log(`this.props.currentChallenge.location is ${this.props.currentChallenge.location}`)
    return(
      <View style={styles.container}>
        <ModularMap onMarkerSubmit={this.onMapMarkerSubmit} markers={this.state.markers} submitAction={'currentLocation'} currentChallenge={this.props.currentChallenge} storeMarkerText={`I'm here now!`} storeMarkerButtonError={`Not yet! Get a little closer...`} onUpdateDistanceFromCheckpoint={this.onUpdateDistanceFromCheckpoint}/>
        <View style={styles.challengeContainer}>
          <Text style={styles.challengeText}>Challenge: {this.props.currentChallenge.name}</Text>
          <Text style={styles.distanceAway}>Your distance away: {this.state.distanceAway}</Text>
        </View>
        <Animated.View style={{ opacity: this.state.fadeOutAnim, position: 'absolute', backgroundColor: 'white', flex: 1, alignSelf: 'center', bottom: 145 }}>
          <Text style={styles.messageText}>{this.state.message}</Text>
        </Animated.View>
        <View><Text>{this.state.message}</Text></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  challengeContainer: {
    flex: 1,
    width: width,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.5,
    elevation: 15,
    top: 5,
    opacity: 0.62
  },
  textContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  challengeText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
    color: 'black'
  },
  messageText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  distanceAway: {
    textAlign: 'center',
  }
})


export default GPSChallengeTask