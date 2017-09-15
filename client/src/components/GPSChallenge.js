import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import CreateList from './CreateList';
import Map from './Map'

class GPSChallenge extends Component {
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
        <Text>Title: {this.state.name}</Text>
        <TextInput style={{height:40}}
          placeholder="Title of challenge!"
          onChangeText={ (name) => this.setState({name})} 
        />

        <Text>Description: {this.state.description}</Text>
        <TextInput style={{height:40}}
          placeholder="Description of challenge!"
          onChangeText={ (description) => this.setState({description})} 
        />

        <Map onMarkerSubmit={this.onMapMarkerSubmit} />

        <Button onPress={() => {console.log('button pressed!')}}
          title="Finished Challenge"
          color="#5cb85c"/>
      </View>
    )
  }

}

export default GPSChallenge