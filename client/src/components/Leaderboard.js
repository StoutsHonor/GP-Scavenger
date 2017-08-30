import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import LeaderboardEntry from './LeaderboardEntry';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    return fetch(`http://192.168.56.1:3000/api/user/findAllUserPoints/`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({data: data});
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <View>
        {this.state.data.map( (player, key) => {
          return (
            <LeaderboardEntry player={player} key={key}/>
          )
        })}
      </View>
    );
  }
}

export default Leaderboard;