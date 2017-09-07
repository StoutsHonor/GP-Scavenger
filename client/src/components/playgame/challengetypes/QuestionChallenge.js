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
import config from '../../../../config/config';

class QuestionChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickProceed = this.handleClickProceed.bind(this);
    this.state = {
      userInput: '',
      timeRemaining: 500,
      showTryAgain: false,
      info: {},
      data: {}
    }
  }

  componentWillMount() {
    // setInterval(() => {
    //   let count = this.state.timeRemaining - 1;
    //   this.setState({timeRemaining: count});
    // },1000);

    fetch(`${config.localhost}/api/questionType/findQuestionType/?questionTypeId=${this.props.challenge.questionTypeId}`)
    .then(response => response.json())
    .then(data => this.setState({info: data}))
    .then(() => {
      let endPoint = `${config.localhost}/api/${this.state.info.type}/find${((this.state.info.type).charAt(0).toUpperCase() + this.state.info.type.slice(1))}/?id=${this.props.challenge.questionId}`;
      fetch(endPoint)
      .then(response => response.json())
      .then(data => this.setState({data: data}))
      .catch(err => console.error(err))
    }
    )
    .catch(err => console.error(err));

    
  }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase().includes(this.state.data.answer.toLowerCase()) === true) {
      this.props.challengeCompleted();
    } else {
      this.setState({showTryAgain: true});
      setTimeout(() => this.setState({showTryAgain: false}), 3000)
    }
  }

  handleClickSkip() {
    // if(this.state.timeRemaining > 10) {
    // this.setState({timeRemaining: this.state.timeRemaining - 10});
    // } else {
    //   this.setState({timeRemaining: 0});
    // }
    this.props.challengeSkipped();
  }

  handleClickProceed() {
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
        <View style={styles.timer}><Text style={styles.bigFont}>{Math.floor(this.state.timeRemaining/60)}:{this.state.timeRemaining%60}</Text></View>
        <View style={styles.type}><Text style={styles.bigFont}>{this.state.info.type ? this.state.info.type.toUpperCase() : ''} :</Text></View>
        <View style={styles.title}><Text style={styles.bigFont}>{this.state.data.title}</Text></View>
        <View style={styles.question}><Text>{this.state.data.question}</Text></View>
        <View style={styles.form}>
          <FormLabel>Enter Answer Here:</FormLabel>
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