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
import config from '../../config/config';
import LoadingPage from '../components/reusable/LoadingPage';


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
  switchCamera: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: '#FFF',
    top: 10,
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
      camera: true,
      loading: true
    };
    this.acceptPicture = this.acceptPicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        console.log('Image path is ' , data);
        this.setState({ path: data.path })
      })
      .catch(err => console.error(err));
  }

  acceptPicture(image_url) {
    let imageObj = {}; 
    imageObj.image = image_url;
    imageObj.text = '';
    imageObj._id = Math.round(Math.random() * 1000000);
    imageObj.user = {_id: Math.round(Math.random() * 1000000)};
    imageObj.createdAt = new Date();
    imageObj.roomName = 'room1';

 
    let obj = {};
    obj.method = 'post';
    obj.headers = {"Content-type": "application/json"};
    obj.body = JSON.stringify(imageObj);

    fetch(`${config.localhost}/api/chat/addChat`, obj)
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
    this.setState({ path: null, loading: false });
  }

  uploadImage(){
    this.setState({loading: true}, () => {
      let file = this.state.path;
      let data = new FormData();
      let position = this.getPosition(file);
      let name = file.slice(position);
      console.log('file name is ' + file);
      data.append('file', {uri: file, type: 'image/jpg', name: name});
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      let xhr = new XMLHttpRequest();
      xhr.open('POST', CLOUDINARY_UPLOAD_URL);
      xhr.onload = (res) => {
        let res_parse = JSON.parse(res.target._response);
        console.log('Response is ', res_parse.secure_url);
        this.acceptPicture(res_parse.secure_url);
        this.props.accept();
      }
  
     xhr.send(data);
    })
  }

  getPosition(file) {
    let result = 0;
    for(let i = file.length - 1; i >= 0; --i) {
      if(file[i] === '_') return result;
      --result;
    }
  }

  switchCamera() {
    this.setState({
      camera: !this.state.camera
    });
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
        type={this.state.camera ? 'back' : 'front'}
      >
      <TouchableHighlight
        style={styles.switchCamera}
        onPress={this.switchCamera.bind(this)}
        underlayColor="rgba(255, 255, 255, 0.5)"
      >
      <View />
    </TouchableHighlight>
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

        {
          this.state.loading ? 
            <LoadingPage text={'Uploading...'}/>
            :
            (<View>
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
              onPress={this.uploadImage.bind(this)}
            >Accept
            </Text>
            </View>)
        }
      </View>
    );
  }
}




