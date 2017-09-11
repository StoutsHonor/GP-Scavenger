import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const FailedPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        The other team won! 
        Aw well, try again.
      </Text>
      <Text onPress={() => Actions.homepage({type:'reset'})}>Back to Home</Text>
      <Text onPress={() => Actions.leaderboard({type:'reset'})}>Leaderboard</Text>
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

export default FailedPage;