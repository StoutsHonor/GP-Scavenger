import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Button, Content, Container } from 'native-base';

const {width, height} = Dimensions.get('window');

class MapStoreLocationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    const styles = StyleSheet.create({
      button: {
        borderRadius: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        paddingHorizontal: 45,
        height: 65,
        width: 270,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5cb85c'
      },
      buttonContainer: {
        position: 'absolute',
        zIndex: 999999999999,
        bottom: 20
      },
      text: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
      }
    })

    return(
        <Content style={styles.buttonContainer} >
          <Button primary onPress={this.props.storeMarker} style={styles.button}>
            <Text style={styles.text}>{this.props.storeMarkerText}</Text>
          </Button>
        </Content>
    )
  }
}

export default MapStoreLocationButton;