import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { Header, ListItem, Left, Center, Thumbnail, Text, Right, Button, Body, Separator, Container, Content, Card, CardItem, Icon } from 'native-base';

//const thumbnail = require('../../media/gamedetailimage.png')

export default class GameProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonText: 'Start Game'
    }

  }

  componentWillMount() {
    this.setState({buttonText: this.props.typeOfAction});
  }

  render() {
    console.log('button function',this.props.buttonaction)
    return (
      // <Container style={styles.body}>
      //   <Content>
      //     <Text style={styles.spec}>{this.props.game.name}</Text>
      //     <Image source={thumbnail} style={styles.thumbnail}/>
      //     <Text>Description: {this.props.game.description}</Text>
      //     <Text>Max Players: {this.props.game.maxPlayers}</Text>
      //     <Text>Reward Points: {this.props.game.rewardPoints}</Text>
      //     <Text>Start Location: {this.props.game.startLocation}</Text>
      //     <Button><Text>{this.state.buttonText}</Text></Button>
      //   </Content>
      // </Container>
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://res.cloudinary.com/dyrwrlv2h/image/upload/v1504828528/gamedetailimage_vvfmsq.png'}} />
                <Body>
                  <Text>{this.props.game.name}</Text>
                  <Text note>Game Duration: {this.props.game.duration}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'http://brainchase.com/public/uploads/Scavenger-Hunt.jpg'}} style={{height: 200, width: 345, flex: 1}}/>
                <Text>
                  {this.props.game.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="person" />
                  <Text>{' ' + this.props.game.maxPlayers + ' Max'}</Text>
                </Button>
              </Left>
                <Button transparent>
                  <Icon active name="flame" />
                  <Text>{this.props.game.rewardPoints + ' Points'}</Text>
                </Button>
              <Right>
                <Text>{this.props.game.startLocation}</Text>
              </Right>
            </CardItem>
              <Button success large full onPress={() => this.props.buttonaction(this.props.game)}><Text>{this.state.buttonText}</Text></Button>
          </Card>
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