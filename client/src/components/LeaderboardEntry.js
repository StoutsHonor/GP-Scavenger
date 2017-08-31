import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

class LeaderboardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props.key, 'key in entry')
    return (
      <View>
        <Text>{this.props.key}</Text>
        <Text>{this.props.player.username}</Text>
        <Text>{this.props.player.firstName + ' ' + this.props.player.lastName}</Text>
        <Text>{this.props.player.rewardPoints}</Text>
      </View>
    );
  }
}

export default LeaderboardEntry;

{/* <List> */}
  {/* <ListItem
    key={key}
    title={player.username}
    subtitle={player.firstName + player.lastName}
  /> */}
{/* </List> */}