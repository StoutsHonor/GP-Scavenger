import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Flatlist
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class GameEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {}
    }
  }

  render() {
    return (
      <View>
        <Text>
          this is one Game Entry
        </Text>
        <Text>Name: {this.props.game.name}</Text>
        <Text>Max Players: {this.props.game.maxPlayers}</Text>
        <Text>Duration of Game: {this.props.game.duration}</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#191970',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color: '#ffffff',
//   },
// });

export default GameEntry;