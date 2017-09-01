import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
  } from 'react-native';
  import Camera from 'react-native-camera';

export default class MyCamera extends Component {
  constructor(props) {
      super(props);

      this.takePicture = this.takePicture.bind(this);
  }

  
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }


  render() {
    return (
        <View style={styles.container}>
          <Camera
              ref={(cam) => {
              this.camera = cam;
              }}
              style={styles.preview}
              aspect={'fill'}>
              <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
          </Camera>
        </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});