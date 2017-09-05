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
// import timer from 'react-native-timer';

class VideoChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.handleClickProceed = this.handleClickProceed.bind(this);
    this.state = {
      type: 'Guess this Picture',
      showCongrats: false,
      showTryAgain: false,
      counter: 0,
      timeRemaining: 30,
      challenges: [
        {
          title: "Pokemon",
          description: "What is this grasstype pokemon's name",
          link: "http://i974.photobucket.com/albums/ae229/dlh1231/bulbasaur.png",
          answer: "bulbasaur",
          difficulty: "easy",
          default: true
        },
        {
          title: "Pokemon",
          description: "What is this firetype pokemon's name",
          link: "https://i.ytimg.com/vi/rO1VsuWBLsg/hqdefault.jpg",
          answer: "charmander",
          difficulty: "easy",
          default: true
        },
        {
          title: "Pokemon",
          description: "What is this water-type pokemon's name",
          link: "https://i.ytimg.com/vi/GzxCAzp0hpU/hqdefault.jpg",
          answer: "squirtle",
          difficulty: "easy",
          default: true
        },
        {
          title: "Pokemon",
          description: "What is this electric-type pokemon's name",
          link: "http://90kids.com/pokemon/images/guesspokemon.jpg",
          answer: "pikachu",
          difficulty: "easy",
          default: true
        }
        
      ]

    }
  }

  componentDidMount() {
    setInterval(() => {
      let count = this.state.timeRemaining - 1;
      this.setState({timeRemaining: count});
    },1000);
  }

  handleClickSkip() {
    if(this.state.timeRemaining > 10) {
    this.setState({timeRemaining: this.state.timeRemaining - 10});
    } else {
      this.setState({timeRemaining: 0});
    }
  }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase() === this.state.challenges[this.state.counter].answer.toLowerCase()) {
      this.setState({showCongrats: true});
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
    let index = this.state.counter;

    // if(this.state.timeRemaining === 0) {
    //   Actions.failedpage();
    // }
    return (
      
      //add image to background, fetch image from database preferred
      <View style={styles.container}>
         <WebView
            source={{uri: 'https://github.com/facebook/react-native'}}
            style={{marginTop: 20, backgroundColor: '#ff0000'}}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


});

export default VideoChallenge;