import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


class MapMarkerLocationButton extends Component {
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
        bottom: 55
      }
    })

    return(
      <View style={styles.buttonContainer} >
        <TouchableOpacity onPress={this.props.getGPSChallengeMarkerLocation}>
          <Image source={{uri: 'http://res.cloudinary.com/dyrwrlv2h/image/upload/v1505355421/target_button_50x50_s6qoiy.png'}} style={styles.button} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default MapMarkerLocationButton;