import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SomeMap from './SomeMap'

const JoinGame = () => {
  return (
    <View>
      <SomeMap/>
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is the Join Game Page
      </Text>
    </View>
    </View>
  );
}

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

export default JoinGame;