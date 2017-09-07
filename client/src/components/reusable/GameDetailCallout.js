import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Header, ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container, Content } from 'native-base';


export default class GameDetailCallout extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render() {
    return (
      <Container>
        <Content>
          <Text>{this.props.game.name}</Text>
          <Text>{this.props.game.description}</Text>
        </Content>
      </Container>
    )
  }

}