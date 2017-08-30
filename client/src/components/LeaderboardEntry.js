import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

class LeaderboardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.index + 1}</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.props.player.profilePicture}}
        />
        <Text>{this.props.player.username}</Text>
        <Text>{this.props.player.firstName + " " + this.props.player.lastName}</Text>
        <Text>{this.props.player.rewardPoints + " points"}</Text>
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