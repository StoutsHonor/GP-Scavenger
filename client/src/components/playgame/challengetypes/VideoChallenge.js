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
   this.handleClickProceed = this.handleClickProceed.bind(this);
   this.state = {
    type: 'Guess this video',
    showCongrats: false,
    showTryAgain: false,
    counter: 0,
    challenges: [
      {
        title: "Movie",
        description: "What is the name of this movie",
        link: "https://www.youtube.com/embed/SLD9xzJ4oeU?start=33&end=46&showinfo=0&rel=0&autoplay=0&controls=0",
        answer: "the avenger",
        difficulty: "easy",
        default: true
      },
      {
        title: "Movie",
        description: "What is the name of this movie",
        link: "https://www.youtube.com/embed/S1i5coU-0_Q?start=22&end=34&showinfo=0&rel=0&autoplay=0&controls=0",
        answer: "back to the future",
        difficulty: "easy",
        default: true
      }
    ]
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

    return (

      <View style={styles.container}>
      <Modal
       animationType={"slide"}
       transparent={false}
       visible={this.state.showCongrats}
       onRequestClose={() => {alert("Modal has been closed.")}}
       >
       <View style={{marginTop: 22}}>
         <View>
           <Text>Congratulations! You Solved this Challenge!</Text>
           <Button onPress={this.handleClickProceed} title="Click Here for the Next Challenge" color="#1E90FF"/>
         </View>
       </View>
     </Modal>
     <Text style={styles.bigFont}>{this.state.type}</Text>
     <Text style={styles.mediumFont}>{this.state.challenges[index].title}</Text>
     <Text style={styles.margin}>{this.state.challenges[index].description}</Text>
     <Text style={styles.margin}>{this.state.challenges[index].difficulty}</Text>
     <WebView
     source={{uri: this.state.challenges[index].link}}
     style={{marginTop: 20, width: Dimensions.get('window').width}}
/>
     <View style={styles.form}>
       <FormLabel >Enter Answer Here:</FormLabel>
       <FormInput onChangeText={userInput => this.setState({userInput})}/>
     </View>
     <Button
       onPress={this.handleClickSubmit}
       title="Submit"
       color="#32CD32"
     />
     <Text onPress={() => this.handleClickProceed()}>next</Text>
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