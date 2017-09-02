import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const StartGame = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Start a New Game
      </Text>
      <Text onPress={() => Actions.demoGPSGame()}>Test Game GPS</Text>
      <Text onPress={() => Actions.challengequestion()}>Test Game Question</Text>
      <Text onPress={() => Actions.mygames()}>Choose From My Games</Text>
      <Text onPress={() => Actions.joingame()}>Join An Existing Game</Text>
      <Text onPress={() => Actions.homepage()}>Homepage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B4513',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default StartGame;