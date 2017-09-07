import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import homepageBackground from '../media/12-09-17-imavex-scavenger-hunt.jpg'

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View>
      <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../media/12-09-17-imavex-scavenger-hunt.jpg') } />
      </View>
      <View style={styles.containerMenu}>
      <Text style={styles.welcome}>
        GPScavenger
      </Text>
        <Text style={styles.text} onPress={() => Actions.joingame({listtype: 'join'})}>Join</Text>
        <Text style={styles.text} onPress={() => Actions.startnewgame({listtype: 'start'})}>Start New Game</Text>
        <Text style={styles.text} onPress={() => Actions.creategame()}>Create Game</Text>
        <Text style={styles.text} onPress={() => Actions.leaderboard()}>Leaderboard</Text>
        <Text style={styles.text} onPress={() => Actions.friends()}>Friends</Text>
      </View>
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
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  containerMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default HomePage;