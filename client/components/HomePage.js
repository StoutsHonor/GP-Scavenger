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
      <Text onPress={() => Actions.settings()}>Settings</Text>
      <Text onPress={() => Actions.viewfinder()}>View Finder</Text>
      <Text onPress={() => Actions.photos()}>Photos</Text>
      <Text onPress={() => Actions.profile()}>Profile</Text>
      <Text onPress={() => Actions.draw()}>Draw</Text>
      <Text onPress={() => Actions.notifications()}>Notifications</Text>
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