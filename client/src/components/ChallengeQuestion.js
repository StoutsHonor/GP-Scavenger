import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { Divider, FormLabel, FormInput } from 'react-native-elements';
import CountdownClock from 'react-native-countdown-clock';

class ChallengeQuestion extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.state = {
      userInput: '',
      timeRemaining: 100,
      challenges: [{
        "name": "Riddle #1",
        "description": "This is the first riddle",
        "gameId": 2,
        "sequence": 1,
        "location": [37.783692, -122.408967],
        "timeLimit": 30,
        "questionTypeId": 1,
        "questionId": 2
      },
      {
        "name": "Riddle #2",
        "description": "This is the second riddle",
        "gameId": 2,
        "sequence": 2,
        "location": [37.783692, -122.408967],
        "timeLimit": 30,
        "questionTypeId": 1,
        "questionId": 3
      },
      {
        "name": "Riddle #3",
        "description": "This is the third riddle",
        "gameId": 2,
        "sequence": 3,
        "location":[37.783692, -122.408967],
        "timeLimit": 30,
        "questionTypeId": 1,
        "questionId": 4
      }],
      type: "riddle",
      challenge: {
        "title":"The Ditch",
        "question": "Anyone can dig a ditch, but it takes a real man to... finish the sentence",
        "answer": "call it home",
        "difficulty": "hard",
        "default": true
      }
    }
  }

  componentDidMount() {

  }

  handleClickSubmit() {
    if(this.state.userInput === this.state.challenge.answer) {
      console.log('congratulations');
    } else {
      console.log('try again');
    }
  }

  handleClickSkip() {
    console.log('skip clicked')
  }

  render() {
    return (
      //add image to background, fetch image from database preferred
      <View style={styles.container}>
        <View style={styles.timer}><Text>{this.state.timeRemaining}</Text></View>
        <View style={styles.type}><Text>{this.state.type.toUpperCase()}</Text></View>
        <View style={styles.question}><Text>{this.state.challenge.question}</Text></View>
        <FormLabel>Enter Answer Here:</FormLabel>
        <FormInput onChangeText={userInput => this.setState({userInput})}/>
        <Button
          onPress={this.handleClickSubmit}
          title="Submit"
          color="#32CD32"
        />
        <Button
          onPress={this.handleClickSkip}
          title="Give Up"
          color="#800000"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
  },
  timer: {
    margin: 10,
    backgroundColor: '#F0FFFF'
  },
  type: {
    margin: 10,
    backgroundColor: '#F0FFFF'
  },
  question: {
    margin: 10,
    marginBottom: 30,
    backgroundColor: '#F0FFFF'
  }
});

export default ChallengeQuestion;