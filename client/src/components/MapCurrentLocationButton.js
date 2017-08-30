import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


class MapCurrentLocationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    const styles = StyleSheet.create({
      button: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#000000'

      },
      buttonContainer: {
        zIndex: 9999999,
        left: 165,
        bottom: 20
      }
    })

    return(
      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={this.props.getCurrentLocation}>
          <Image source={require('../media/getCurrentLocation_83x83.png')} style={styles.button} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default MapCurrentLocationButton;