import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { Divider, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import config from '../../../../config/config';
// import timer from 'react-native-timer';

class GuessPhotoChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.state = {
      type: 'Guess this Picture',
      data: {},
      showTryAgain: false,
      userInput: ''
    }
  }

  componentWillMount() { 
    fetch(`${config.localhost}/api/guessPhoto/findPhoto/?id=${this.props.challenge.questionId}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ data }); 
    })
    .catch(err => console.error(err))
  }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase().includes(this.state.data.answer.toLowerCase()) === true) {
      this.props.challengeCompleted();
    } else {
      this.setState({showTryAgain: true});
      setTimeout(() => this.setState({showTryAgain: false}), 3000)
    }
  }

  handleClickProceed() {
    Actions.congratspage();
  }



  render() {
  
    
    return (
      //add image to background, fetch image from database preferred
      <View >
        <Text style={styles.bigFont}>{this.state.type}</Text>
        <Text style={styles.mediumFont}>{this.state.data.title}</Text>
        <Text style={styles.margin}>{this.state.data.question}</Text>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: 250
          }}
          source={{uri: this.state.data.imageURL}}
        />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#46cc16',
  },
  bigFont: {
    top: 10,
    fontSize: 25
  },
  mediumFont: {
    top: 15,
    fontSize: 20
  },
  button: {
    top: 120,
    backgroundColor: '#F0FFFF'
  },
  margin: {
    top: 20
  },
  form: {
    backgroundColor:'#F0FFFF'
  },
  tryAgain: {
    backgroundColor: "#800000",
  },
});

export default GuessPhotoChallenge;