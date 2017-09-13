import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import config from "../../../config/config";

class ModularListEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(`Current position is latitude: ${position.coords.latitude} and longitude: ${position.coords.longitude}`)
      console.log(`position.coords is ${JSON.stringify(position.coords)}`)
      console.log(`ModularListEntry - this.props.data is ${JSON.stringify(this.props.listentry.startLocation)}`)

      const destLatitude = this.props.listentry.startLocation[0]
      const destLongitude = this.props.listentry.startLocation[1]
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${position.coords.latitude},${position.coords.longitude}&destination=${destLatitude},${destLongitude}&mode=walking&key=${config.maps}`          
      console.log(`url is ${url}`)
      fetch(url)
      .then(response => {
        console.log(`Google Maps response is ${JSON.stringify(response)}`)
        return response.json()})
      .then(data => {
        console.log(`Google Maps directions response is`)
        const distanceAway = data.routes[0].legs[0].distance.text + ' away'
        console.log(`distance is ${JSON.stringify(distanceAway)}`)
        this.setState({distanceAway})
      })
      .catch((err) => {
        console.error(err);
      });

    }, (error) => {console.log(`geolocation fail ${JSON.stringify(error)}`)}, { enableHighAccuracy: true })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps')
    this.setState({
      data: nextProps
    })
  }

  onListEntryClick() {
    console.log(`ModularListEntryClick - onListEntryClick()`)
    if (this.props.listentryclick) {
      this.props.listentryclick(this.props.listentry)
    }
  }


  render() {
    return (
        <ListItem avatar onPress={() => {this.onListEntryClick()}} >
          <Left><Thumbnail source={{uri: 'https://incendia.net/wiki/images/2/23/Example_Texture1.png'}} /></Left>
          <Body>
            <Text>{this.props.listentry.room}</Text>
            <Text>{this.props.listentry.name}</Text>
            <Text note>{this.state.distanceAway}</Text>
            <Text note>Max Players: {this.props.listentry.maxPlayers}</Text>
          </Body>
          <Right>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View>
            <Button rounded primary onPress={() => {
                console.log('list entry!')
                this.props.buttonaction(this.props.listentry)}}><Text>{this.props.buttontext}</Text></Button>
              </View>
            </View>
          </Right>
        </ListItem>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
});

//          <Text>{JSON.stringify(this.props.listentry)}</Text>

export default ModularListEntry
