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
import { Divider, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class QuestionChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickProceed = this.handleClickProceed.bind(this);
    this.state = {
      userInput: '',
      timeRemaining: 50000,
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
      },

      showCongrats: false,
      showTryAgain: false
    }
  }

  componentDidMount() {
    setInterval(() => {
      let count = this.state.timeRemaining - 1;
      this.setState({timeRemaining: count});
    },1000);
  }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase() === this.state.challenge.answer.toLowerCase()) {
      this.setState({showCongrats: true});
      Actions.congratsnext();
    } else {
      this.setState({showTryAgain: true});
      setTimeout(() => this.setState({showTryAgain: false}), 3000)
    }
  }

  handleClickSkip() {
    if(this.state.timeRemaining > 10) {
    this.setState({timeRemaining: this.state.timeRemaining - 10});
    } else {
      this.setState({timeRemaining: 0});
    }
  }

  handleClickProceed() {
    this.setState({showCongrats: false});
    Actions.congratspage();
  }

  render() {
    //timer runs out
    if(this.state.timeRemaining === 0) {
      Actions.failedpage();
    }
    return (
      //add image to background, fetch image from database preferred
      <View>
        <Image
          style={{
            flex: 1,
            position: 'absolute',
            width: '140%',
            height: '140%',
            justifyContent: 'center',
          }}
          source={{ uri: "https://afterwordsbooks.files.wordpress.com/2013/02/riddle.jpg" }}
        />
        <View style={styles.timer}><Text style={styles.bigFont}>{this.state.timeRemaining} Seconds</Text></View>
        <View style={styles.type}><Text style={styles.bigFont}>{this.state.type.toUpperCase()} :</Text></View>
        <View style={styles.title}><Text style={styles.bigFont}>{this.state.challenge.title}</Text></View>
        <View style={styles.question}><Text>{this.state.challenge.question}</Text></View>
        <View style={styles.form}>
          <FormLabel >Enter Answer Here:</FormLabel>
          <FormInput onChangeText={userInput => this.setState({userInput})}/>
        </View>
        {this.state.showTryAgain ? <View style={styles.tryAgain}><Text style={styles.tryAgainText}>Try Again</Text></View> : null}
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
    backgroundColor: '#F0FFFF',
  },
  type: {
    margin: 10,
    backgroundColor: '#F0FFFF',
  },
  title: {
    margin: 10,
    backgroundColor: '#F0FFFF',
  },
  question: {
    margin: 10,
    marginBottom: 30,
    backgroundColor: '#F0FFFF'
  },
  tryAgain: {
    backgroundColor: "#800000",
  },
  tryAgainText: {
    color: "#FFFFFF",
    fontSize: 30
  },
  form: {
    backgroundColor:'#F0FFFF'
  },
  bigFont: {
    fontSize: 30
  }
});

export default QuestionChallenge;