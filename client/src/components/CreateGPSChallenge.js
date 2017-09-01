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

class CreateGPSChallenge extends Component {
  constructor(props) {
    super(props)
    this.onMapMarkerSubmit = this.onMapMarkerSubmit.bind(this);
    this.state = {
      name: '',
      description: '',
      time_limit: '',
      mapMarker: {}
    }
  }

  onMapMarkerSubmit(location) {
    this.setState({ mapMarker: location }, () => {
      console.log(`this.state.mapMarker is ${JSON.stringify(this.state.mapMarker)}`)
    })

  }

  render() {
    return(
      <View style={{padding:10}}>

        <Map onMarkerSubmit={this.onMapMarkerSubmit} />

        <Button onPress={() => {console.log('button pressed!')}}
          title="Finished Challenge"
          color="#841584"/>
      </View>
    )
  }

}

export default CreateGPSChallenge