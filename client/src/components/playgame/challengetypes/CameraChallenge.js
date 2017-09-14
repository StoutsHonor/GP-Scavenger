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
      data: {},
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
      
     
      // <View style={styles.container}>
 
      //   <Text style={styles.mediumFont}>{this.state.data.title}</Text>
      //   <Text style={styles.smallFonts}>{this.state.data.instruction}</Text>
      //   <Button onPress={Actions.camera({ accept: this.handleClickSubmit })} title='Camera'/>
       
       
      //   

      // </View>

      <View style={styles.container}>
        
        <Text style={styles.name}>Photo Challenge</Text>
        <Text style={styles.mediumFont}>{this.state.data.title}</Text>
        <Text style={styles.margin}>{this.state.data.instruction}</Text>
        <TouchableHighlight onPress={() => {Actions.camera({ accept: this.handleClickSubmit })}}>
          <Image style={{ flex: .75, resizeMode: 'contain', width: 350, padding: 0}} source={ require('../../../media/camera-icon-hi.png') } />
        </TouchableHighlight>

      {/* <Text style={styles.camera} onPress={() => {Actions.camera({ accept: this.handleClickSubmit })}}>camera</Text> */}
      
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9cfa3',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  mediumFont: {
    fontSize: 25,
    color: '#000',
    
  },
  smallFont: {
    fontSize: 17,
    color: '#000'
  },
  margin: {
    fontSize: 18,
    color: '#000'
  }





});

export default CameraChallenge;