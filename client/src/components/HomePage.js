import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Home Page
      </Text>
      <Text onPress={() => Actions.startgame()}>Start Your Scavenger Adventure!</Text>
      <Text onPress={() => Actions.chat()}>Chat</Text>
      <Text onPress={() => Actions.leaderboard()}>Leaderboard</Text>
      <Text onPress={() => Actions.profile()}>Profile and Stats</Text>
      <Text onPress={() => Actions.preferences()}>Preferences</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6495ED',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default HomePage;