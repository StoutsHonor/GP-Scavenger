import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Flatlist
} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class GameEntry extends Component {
  constructor(props) {
    super(props);
    this.convertToHours = this.convertToHours.bind(this);
    this.state = {
      game: {},
      challenges: []
    }
  }

  componentDidMount() {
    return fetch(`http://192.168.56.1:3000/api/challenge/findChallengeByGameId/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, 'data')
      this.setState({challenges: data});
    })
    .catch((error) => {
      console.error(error);
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

  render() {
    return (
      <View>
        <Card title={this.props.game.name}> 
          <View >
            <Text>Number of Challenges: {this.state.challenges.length}</Text>
            <Text>Max Players: {this.props.game.maxPlayers}</Text>
            <Text>Duration of Game: {this.convertToHours(this.props.game.duration)}</Text>
          </View>
        </Card>


        {/* <Text>
          this is one Game Entry
        </Text>
        <Text>Name: {this.props.game.name}</Text>
        <Text>Max Players: {this.props.game.maxPlayers}</Text>
        <Text>Duration of Game: {this.props.game.duration}</Text> */}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#191970',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color: '#ffffff',
//   },
// });

export default GameEntry;