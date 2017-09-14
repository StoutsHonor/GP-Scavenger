import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import { ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';


class LeaderboardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  onUserEntryClick(user) {
    console.log(`LeaderBoardEntry - onUserEntryClick()`)
    Actions.userprofile({user})
  }

  render() {
    return (
      <ListItem avatar style={styles.entry} onPress={() => {this.onUserEntryClick(this.props.player)}}>
        <Left>
        <Text style={styles.rank}>{this.props.index + 1}</Text>
        </Left>
        <Body>
        <Thumbnail source={{uri: this.props.player.profilePicture}} />
        <Text style={styles.text}>{this.props.player.username}</Text>
        </Body>
        <Right>
        <Text style={styles.points}>{this.props.player.rewardPoints + " Points"}</Text>
        </Right>
      </ListItem>
    );
  }
}


const styles = StyleSheet.create({
  entry: {
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#000000',
    elevation: 2,
    width: 350
  },
  rank: {
    fontSize: 25
  },
  points: {
    fontSize: 30,
  }

})

export default LeaderboardEntry;