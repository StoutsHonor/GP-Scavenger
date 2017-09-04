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
// import timer from 'react-native-timer';

class CameraChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickProceed = this.handleClickProceed.bind(this);
    this.state = {
      type: 'Take A Picture',
      showCongrats: false,
      showTryAgain: false,
      challenge: {
        title: "Rule of Thirds",
        instruction: "Take a picture of 3 identical items",
        difficulty: "easy",
        default: true
      }

    }
  }

  handleClickProceed() {
    this.setState({showCongrats: false});
    Actions.congratspage();
  }

  render() {
    
    return (
      //add image to background, fetch image from database preferred
      <View style={styles.container}>
        <Text style={styles.bigFont}>{this.state.type}</Text>
        <Text style={styles.mediumFont}>{this.state.challenge.title}</Text>
        <Text style={styles.margin}>{this.state.challenge.instruction}</Text>
        <Text style={styles.margin}>{this.state.challenge.difficulty}</Text>
        <Text style={styles.camera} onPress={() => Actions.camera()}>camera</Text>
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
  margin: {
    top: 80
  }


});

export default CameraChallenge;