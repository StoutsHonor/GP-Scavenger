import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Header, ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container, Content } from 'native-base';

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.body}>
          <Image source={{uri: this.props.user.profilePicture}} style={styles.image}/>
          <Text style={styles.spec} >{this.props.user.username}</Text>
          <Text>User: {this.props.user.firstName} {this.props.user.lastName}</Text>
          <Text>Description</Text>
          <Text>{this.props.user.profileDescription}</Text>
          <Text>Ranking: {this.props.user.rewardPoints}</Text>
          <Text>Friends: {this.props.user.friends} :(</Text>
        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    marginTop: 30
  },
  image: {
    width: 200,
    height: 200
  },
  spec: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf:'center'
  }
});