import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import FloatingButton from './FloatingButton';

const CreateGame = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        This is the Create Game Page
      </Text>
      <FloatingButton style={{}}/>
      <CreateList style={{}}/>
      <Button onPress={() => {console.log('button pressed!')}}
        title="Submit"
        color="#841584"/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00008B',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default CreateGame;