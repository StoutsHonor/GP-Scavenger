import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Chat from '../Chat'

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    }

  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 
    console.log(`im in Lobby.js componentWillMount`)

  }  


  startGame() {
    //
    console.log('Lobby: startGame pressed')
    // Actions.initGame({gamedata: gamedata}) // TODO: CREATE
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5F9EA0',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
      },
    });

    return (
      <View style={styles.container}>
        <Text>Welcome to Lobby</Text>
        <Chat />
        <Button onPress={() => {console.log('Lobby: button pressed, props.gamedata is: ', this.props.gamedata)}} 
          title='START GAME'  
        />
      </View>
    );
  }
}

export default Lobby;

