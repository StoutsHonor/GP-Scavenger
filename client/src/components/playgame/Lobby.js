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
import { getAllGameChallenges, setGamePoints } from '../../actions/index.js'
import config from '../../../config/config';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setGamePoints }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges,
    gamePoints: state.play.gamePoints
  }
}



class Lobby extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onReceivedJoinedLobby =  this.onReceivedJoinedLobby.bind(this);

    this.roomName = 'lobby' + this.props.gameId;
  
    this.state = {
      messages: [],
      totalPlayer: 0,
      user: {},
      team1: [],
      team2: [],
      styles: {}
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

    this.setState({ styles });
  }  

  componentDidMount() {
    this.socket = io(config.localhost);
    let obj = {};
    obj.userId = this.state.totalPlayer + 1;
    obj.roomName = this.roomName;
    
    this.socket.emit('createRoom',  obj);
    this.socket.on('joinLobby', (this.onReceivedJoinedLobby));
    this.socket.on('message', this.onReceivedMessage);

  }

  onReceivedJoinedLobby(input_user) {
   
    if(this.state.totalPlayer > 8) return;
    this.state.totalPlayer++;
    let team; 
    let teamName;
    let user;
    if (this.state.totalPlayer % 2) {
      team = this.state.team1;
      team.push(this.state.totalPlayer + '');
      teamName = 'team1';
      user = {  
        _id: 1,
        name: '1'
      }
    } else {
      team = this.state.team2;
      team.push(this.state.totalPlayer + '');
      teamName = 'team2';
      user = {  
        _id: 2,
        name: '2'
      }
     
    }
    console.log('Team is ddddddddddddddddddddddddddd ', team);
    this.setState({ 
      [teamName]: team,
      totalPlayer: this.state.totalPlayer
    }, () => {
      this.setState({ user });
    });


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
    console.log(this.props.gamePoints, 'game points in Lobby')
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
<<<<<<< HEAD
      <View style={this.state.styles.container}>
        <Text style={this.state.styles.lobbytext}>Welcome to the Lobby</Text>
        <View style={this.state.styles.chat}>
            <GiftedChat  
              messages={this.state.messages}
              onSend={this.onSend}
              user={this.state.user}
              />
          </View>
          <View style={this.state.styles.divide}>
            <View style={this.state.styles.playerL}>
              <Text style={this.state.styles.team}> Team 1 </Text>
              {this.state.team1.map((val, key) => {
                return (<Text key={key}>   {val}</Text>)
              })}
            </View>
            <View style={this.state.styles.playerR}>
              <Text style={this.state.styles.team}> Team 2 </Text>
              {this.state.team2.map((val, key) => {
                return (<Text key={key}>   {val}</Text>)
              })}
            </View>
          </View>

          <Button style={this.state.styles.button} onPress={() => {
=======
      <View style={styles.container}>
        <Text>Welcome to Lobby</Text>
        {/* <Chat /> */}
        <Button onPress={() => {
          this.props.setGamePoints(2000);
>>>>>>> setting up game points reducer
          console.log('Lobby: button pressed, props.gamedata is: ', this.props.gamedata)
          {/* Actions.gameplay(this.props.gamedata) */}
          }} 
          title='START GAME'  
<<<<<<< HEAD
        /> 
         
=======
        />
        {/* <Button title='test' onPress={() => this.props.setGamePoints(2000)}/> */}
>>>>>>> setting up game points reducer
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
  lobbytext: {
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