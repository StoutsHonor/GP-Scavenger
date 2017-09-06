import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';
import Chat from '../Chat'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges } from '../../actions/index.js'
import config from '../../../config/config';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges
  }
}

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


  startGame() {
    //
    //console.log('Lobby: startGame pressed')
    // Actions.initGame({gamedata: gamedata}) // TODO: CREATE
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.lobbyText}>Welcome to the Lobby</Text>
          <View style={styles.chat}>
            <Text> chat</Text>
          </View>
          <View style={styles.divide}>
            <View style={styles.playerL}>
              <Text > team 1 </Text>
            </View>
            <View style={styles.playerR}>
              <Text > team 2 </Text>
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
  button: {
    marginTop: 15
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

