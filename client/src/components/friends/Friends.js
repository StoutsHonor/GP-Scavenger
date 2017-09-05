import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';

const Friends = () => {
  return (
    <SideMenu menu={<HomePage/>}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the Friends Page
        </Text>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F50',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Friends;