import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    playGameId: state.play.playGameId,
    playGameName: state.play.playGameName,
    playGameDescription: state.play.playGameDescription,
    playGameDuration: state.play.playGameDuration,
    playGameMaxPlayers: state.play.playGameMaxPlayers,
    playPlayers: state.play.playPlayers,
    playGameStartingLocation: state.play.playGameStartingLocation,
    playGameChallenges: state.play.playGameChallenges
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  //return bindActionCreators({enteredField, challengeAdded, submittedCreatedGame}, dispatch)
}

class InitGame extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.welcome}>
        Game Initialized
        { /*
        this will initialize all the tasks in the game
        I need to grab the game information from the database and save it in the store
        when do we grab it? from the beginning of...
        */}
      </Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitGame);