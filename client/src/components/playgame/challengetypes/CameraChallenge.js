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
    this.handleClickProceed = this.handleClickProceed.bind(this);
    this.state = {
      type: 'Take A Picture',
      showCongrats: false,
      showTryAgain: false,
      counter: 0,
      challenges: [
        {
          "title": "Self Portrait",
          "instruction": "Take a majestic selfie",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Rule of Thirds",
          "instruction": "Take a picture of 3 identical items",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Black & White",
          "instruction": "Take a picture of something that is black & white",
          "difficulty": "hard",
          "default": true
        },
        {
          "title": "High Angle",
          "instruction": "Take a picture of the landscape while looking out of a building",
          "difficulty": "moderate",
          "default": true
        },
        {
          "title": "Green Thumb",
          "instruction": "Take a picture with 5 or more trees within the frame",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Water World",
          "instruction": "Take a picture of the only open ocean",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Cinema",
          "instruction": "Take a picture a movie theater",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Fountain",
          "instruction": "Take a picture of a water fountain",
          "difficulty": "easy",
          "default": true
        },
        {
          "title": "Best friends",
          "instruction": "Take a picture of a dog and a cat",
          "difficulty": "moderate",
          "default": true
        }
      ]

    }
  }

  handleClickProceed() {
    
    if(this.state.counter + 1 >= this.state.challenges.length) {
      this.setState({counter: 0});
    } else {
      this.setState({counter: this.state.counter + 1});
    }
  }

  render() {
    let index = this.state.counter;
    return (
      
      //add image to background, fetch image from database preferred
      <View style={styles.container}>
        <Text style={styles.bigFont}>{this.state.type}</Text>
        <Text style={styles.mediumFont}>{this.state.challenges[index].title}</Text>
        <Text style={styles.margin}>{this.state.challenges[index].instruction}</Text>
        <Text style={styles.margin}>{this.state.challenges[index].difficulty}</Text>
        <Text style={styles.camera} onPress={() => Actions.camera()}>camera</Text>
        <Text style={styles.button} onPress={() => this.handleClickProceed()}>next</Text>
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