import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex, getGameId } from '../../actions/index';


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex, getGameId }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    currentChallengeIndex: state.play.currentChallengeIndex
  }
}

class CongratsPage extends Component {

  componentDidMount() {
    this.props.getGameId(null)    
    this.props.getAllGameChallenges(null)
    this.props.setCurrentChallengeIndex(0)
  }

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.welcome}>
        Congratulations!  You Completed all Challenges!
      </Text>
      <Text onPress={() => Actions.homepage()}>Back to Home</Text>
      <Text onPress={() => Actions.mygames()}>Play Another</Text>
      <Text onPress={() => Actions.leaderboard()}>Leaderboard</Text>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CongratsPage);