import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import GameEntry from './GameEntry';

class MyGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      games: []
    }
  }

  componentDidMount() {
    return fetch('http://192.168.56.1:3000/api/game/findGameByUserId/?userId=1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({games: responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        </Text>
        <View>
        {this.state.games.map((game, key) => {
          return (
            <GameEntry game={game} key={key}/>
          )
        })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191970',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});


export default MyGames;