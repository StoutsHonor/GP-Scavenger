import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
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
    gameInfo: state.play.gameInfo,
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
        <Text>Welcome to Lobby</Text>
        {/* <Chat /> */}
        <Button onPress={() => {
          console.log('Lobby: button pressed, props.gamedata is: ', this.props.gamedata)
          Actions.gameplay(this.props.gamedata)
          }} 
          title='START GAME'  
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

