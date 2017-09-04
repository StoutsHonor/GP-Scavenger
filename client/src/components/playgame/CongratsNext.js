import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, geatAllUserGames, setCurrentChallengeIndex } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex
  }
}

const CongratsNext = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Congratulations!  You Have Completed this Challenge!
      </Text>
      <Text onPress={() => Actions.currentchallenge()}>Go to Your Next Task</Text>
      <Text onPress={() => Actions.challengelist()}>Go to Your List</Text>
      <Text onPress={() => Actions.chat()}>Brag About It!</Text>
    </View>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(CongratsNext);