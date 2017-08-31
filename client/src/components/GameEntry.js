import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class GameEntry extends Component {
  constructor(props) {
    super(props);
    this.convertToHours = this.convertToHours.bind(this);
    this.initGame = this.initGame.bind(this);
    this.state = {
      game: {},
      challenges: []
    }
  }

  componentDidMount() {
    return fetch(`http://192.168.56.1:3000/api/challenge/findChallengeByGameId/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({challenges: data});
    })
    .catch((err) => {
      console.error(err);
    });
  }

  convertToHours(minutes) {
    if(minutes === 60) {
      return `1 Hour`;
    }
    if(minutes > 60) {
      return Math.round((minutes/60) * 10) / 10 + ' Hours';
    }
    return minutes + ' Minutes';
  }

  initGame() {
    Actions.initgame();
  }

  render() {
    return (
      <View>
        <Card title={this.props.game.name}> 
          <View >
            <Text>Number of Challenges: {this.state.challenges.length}</Text>
            <Text>Max Players: {this.props.game.maxPlayers}</Text>
            <Text>Duration of Game: {this.convertToHours(this.props.game.duration)}</Text>
            <Button
              icon={{name: 'code'}}
              backgroundColor='#03A9F4'
              fontFamily='Lato'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Choose This Game' 
              onPress={this.initGame}
            />
          </View>
        </Card>
      </View>
    );
  }
}

export default GameEntry;