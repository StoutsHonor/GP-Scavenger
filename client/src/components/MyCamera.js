import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux'; 
// import acceptImage from '../actions';
const CLOUDINARY_UPLOAD_PRESET = 'xdbilvan';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dnlk126yf/upload';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  accept: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});

export default class MyCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
    };
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log('Image path is ' , data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  acceptPicture() {
    let imageObj = {};
    // imageObj.image = this.uploadImage(this.state.path);
    imageObj.image = this.state.path;

    imageObj.text = '';
    imageObj._id = Math.round(Math.random() * 1000000);
    imageObj.user = {_id: Math.round(Math.random() * 1000000)};
    imageObj.createdAt = new Date();
    imageObj.roomName = 'room1';

 
    let obj = {};
    obj.method = 'post';
    obj.headers = {"Content-type": "application/json"};
    obj.body = JSON.stringify(imageObj);

    fetch(`http://192.168.56.1:3000/api/chat/addChat`, obj)
    .then((response) => {
      //return response.json();
     return;
    })
    .then((data) => {
      console.log('Image successfully added');
    })
    .catch((err) => {
      console.error(err);
    });
    this.setState({ path: null });
  }

  uploadImage(file){
    console.log('');
   
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.disk}
      >
        <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </Camera>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel
        </Text>
        <Text
          style={styles.accept}
          onPress={this.acceptPicture.bind(this)}
        >Accept
        </Text>
      </View>
    );
  }
}




