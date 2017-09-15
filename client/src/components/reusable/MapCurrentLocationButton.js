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
        borderColor: '#000000',
        borderWidth: 0.5
      },
      buttonContainer: {
        zIndex: 9999999,
        left: 165,
        bottom: 120
      }
    })

    return(
      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={this.props.getCurrentLocation}>
          <Image source={{uri: 'http://res.cloudinary.com/dyrwrlv2h/image/upload/v1505433617/getCurrentLocation_83x83_uqhkmn.png'}} style={styles.button} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default MapCurrentLocationButton;