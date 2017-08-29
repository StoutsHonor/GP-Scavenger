import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Start a New Game
      </Text>
      <Text onPress={() => Actions.mygames()}>My Games</Text>
      <Text onPress={() => Actions.creategame()}>Create a New Game</Text>
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

export default Profile;