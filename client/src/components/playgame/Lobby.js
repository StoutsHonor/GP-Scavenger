import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges } from '../../actions/index.js'
import config from '../../../config/config';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges
  }
}

const user = { _id: Math.round(Math.random() * 1000000) || -1 };

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.roomName = 'lobby1';
    this.state = {
      messages: [],
      team1: {
        _id: 1,
        name: 'Team 1'
      }
    };

  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 
    //console.log(`im in Lobby.js componentWillMount`)
    fetch(`${config.localhost}/api/challenge/findChallengeByGameId/?gameId=${this.props.gameId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(`Lobby.js - componentWillMount() - this is the data received ${JSON.stringify(data)}`);
      this.props.getAllGameChallenges(data);
    })
    .catch((err) => {
      console.error(err);
    });
  }  

  componentDidMount() {
    this.socket = io(config.localhost);
    this.socket.emit('createRoom', 'lobby1');
    this.socket.on('message', this.onReceivedMessage);
    // fetch(`${config.localhost}/api/challenge/findChallengeByGameId/?gameId=${this.props.gameId}`)
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data, 'this is the data received');
    //   this.props.getAllGameChallenges(data);
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  onReceivedMessage(messages=[]) {
    console.log('Message was recieved', messages);
    this._storeMessages(messages);
  }

  startGame() {
    //
    //console.log('Lobby: startGame pressed')
    // Actions.initGame({gamedata: gamedata}) // TODO: CREATE
  }

  onSend(messages=[]) {
    messages[0].roomName = this.roomName;
    messages[0].image = '';
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  render() {
    console.log(this.props.gameInfo, 'game info in Lobby')
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
        <Text style={styles.lobbyText}>Welcome to the Lobby</Text>
          <View style={styles.chat}>
            <GiftedChat  
              messages={this.state.messages}
              onSend={this.onSend}
              user={this.state.team1}
              />
          </View>
          <View style={styles.divide}>
            <View style={styles.playerL}>
              <Text style={styles.team}> Team 1 </Text>
              <Text>   Jen </Text>
              <Text>   Jeff </Text>
              <Text>   Kevin </Text>
              <Text>   Mike </Text>
            </View>
            <View style={styles.playerR}>
              <Text style={styles.team}> Team 2 </Text>
              <Text>   Erin </Text>
              <Text>   James </Text>
              <Text>   Tony </Text>
              <Text>   Mike </Text>
            </View>
          </View>

          <Button style={styles.button} onPress={() => {
          console.log('Lobby: button pressed, props.gamedata is: ', this.props.gamedata)
          Actions.gameplay(this.props.gamedata)
          }} 
          title='START GAME'  
        /> 
         
      </View>
      
    );
  }

  _storeMessages(messages) {   
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }
}





const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#5F9EA0'
     
  },
  lobbyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10
  },
  divide: {
    flexDirection: 'row',
    
  },
  chat: {
    width: Dimensions.get('window').width - 15,
    height: (Dimensions.get('window').height / 2),
    margin: 10,
    backgroundColor: '#ff372c',
  },
  playerL: {
    width: (Dimensions.get('window').width / 2) - 15,
    height: (Dimensions.get('window').height / 6),
    margin: 10,
    marginRight: 5,
    backgroundColor: '#5fffd7',
  },
  playerR: {
    width: (Dimensions.get('window').width / 2) - 15,
    height: (Dimensions.get('window').height / 6),
    margin: 10,
    marginLeft: 5,
    backgroundColor: '#5fffd7',
  },
  team: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

