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

class MapCenterMarker extends Component {

  render() {
    const styles = StyleSheet.create({
      markerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      marker: {
        width: 20,
        height: 34,
        zIndex: 999999999999999999
      }
    })

    return(
      <View style={styles.markerStyle}> 
        <Image source={{uri: 'https://maps.gstatic.com/mapfiles/markers2/marker.png'}} style={styles.marker} />
      </View>
    )
  }
}


export default MapCenterMarker;