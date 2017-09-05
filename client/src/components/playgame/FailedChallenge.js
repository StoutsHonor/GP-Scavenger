import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const FailedChallenge = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        You Did Not Complete this Challenge.
      </Text>
      <Text onPress={() => Actions.currentchallenge()}>Go To Your Next Task</Text>
      <Text onPress={() => Actions.challengelist()}>Go To Your Challenge List</Text>
      <Text onPress={() => Actions.chat()}>Go To Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC143C',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default FailedChallenge;