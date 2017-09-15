import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';


class CreateMapStoreLocationButton extends Component {
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
        <TouchableOpacity>
          <Button onPress={() => {this.props.storeMarker()}}
            title="Submit"
            color="#5cb85c"
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default CreateMapStoreLocationButton;