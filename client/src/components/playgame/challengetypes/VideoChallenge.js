import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  WebView,
  Image,
  Modal,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { Divider, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import config from '../../../../config/config';
//import MediaPlayer from 'react-native-android-video-player';
// import timer from 'react-native-timer';

class VideoChallenge extends Component {
  constructor(props) {
   super(props);
   this.handleClickSubmit = this.handleClickSubmit.bind(this);
   this.handleClickProceed = this.handleClickProceed.bind(this);
   this.state = {
    type: 'Guess this video',
    data: {
      title: "Movie",
      question: "What is the name of this movie",
      link: "https://www.youtube.com/embed/S1i5coU-0_Q?start=22&end=34&showinfo=0&rel=0&autoplay=0&controls=0",
      answer: "back to the future",
      difficulty: "easy",
      default: true
    },
    showTryAgain: false,
    userInput: ''
   }
  }

  componentWillMount() { 
    fetch(`${config.localhost}/api/video/findVideo/?id=${this.props.challenge.questionId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data }); 
      })
    .catch(err => console.error(err))
    console.log(`VideoChallenge - componentWillMount()`)
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(`VideoChallenge - componentWillReceiveProps()`)
  //   this.setState({
  //     data: {
  //       title: nextProps.challenge.title,
  //       question: nextProps.challenge.question,
  //       link: nextProps.challenge.link,
  //       answer: nextProps.challenge.answer,
  //       difficulty: nextProps.challenge.difficulty,
  //       default: nextProps.challenge.default
  //     }
  //   })
  // }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase().includes(this.state.data.answer.toLowerCase()) === true) {
      this.props.challengeCompleted();
    } else {
      this.setState({showTryAgain: true});
      setTimeout(() => this.setState({showTryAgain: false}), 3000)
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
    

    return (
     
      <View style={styles.container}>
    
     <Text style={styles.bigFont}>{this.state.type}</Text>
     <Text style={styles.mediumFont}>{this.state.data.title}</Text>
     <Text style={styles.margin}>{this.state.data.question}</Text>
     <WebView
     source={{uri: this.state.data.link}}
     style={{marginTop: 20, width: Dimensions.get('window').width}}
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#32CD32',
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

});
export default VideoChallenge;