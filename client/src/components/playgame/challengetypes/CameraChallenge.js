import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import config from '../../../../config/config';
// import timer from 'react-native-timer';

class CameraChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.state = {
      type: 'Take A Picture',
      data: {},
      showTryAgain: false,
      userInput: ''
  
    }
  }

  componentWillMount() { 
    fetch(`${config.localhost}/api/photo/findPhoto/?id=${this.props.challenge.questionId}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ data }); 
    })
    .catch(err => console.error(err))
  }

  handleClickSubmit() {
    this.props.challengeCompleted();
  }

  handleClickProceed() {
    
    if(this.state.counter + 1 >= this.state.challenges.length) {
      this.setState({counter: 0});
    } else {
      this.setState({counter: this.state.counter + 1});
    }
  }

  render() {
    
    return (
      
      //add image to background, fetch image from database preferred
      <View>
        <Text style={styles.bigFont}>{this.state.type}</Text>
        <Text style={styles.mediumFont}>{this.state.data.title}</Text>
        <Text style={styles.margin}>{this.state.data.instruction}</Text>
        <Text style={styles.camera} onPress={() => {Actions.camera({ accept: this.handleClickSubmit })}}>camera</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    alignItems: 'center',
    backgroundColor: '#00ffff',
  },
  bigFont: {
    top: 20,
    fontSize: 30
  },
  mediumFont: {
    top: 60,
    fontSize: 20
  },
  camera: {
    top: 100,
    backgroundColor: '#F0FFFF'
  },
  button: {
    top: 120,
    backgroundColor: '#F0FFFF'
  },
  margin: {
    top: 80
  }


});

export default CameraChallenge;