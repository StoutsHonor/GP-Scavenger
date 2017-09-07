import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Header, ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container, Content } from 'native-base';

const thumbnail = require('../../media/gamedetailimage.png')

export default class GameProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render() {
    return (
      <Container style={styles.body}>
        <Content>
          <Text style={styles.spec}>{this.props.game.name}</Text>
          <Image source={thumbnail} style={styles.thumbnail}/>
          <Text>Description: {this.props.game.description}</Text>
          <Text>Max Players: {this.props.game.maxPlayers}</Text>
          <Text>Reward Points: {this.props.game.rewardPoints}</Text>
          <Text>Start Location: {this.props.game.startLocation}</Text>
        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnail: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  spec: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});