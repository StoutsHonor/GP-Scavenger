import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Card } from 'react-native-elements';
import Stars from 'react-native-stars-rating';
import { Actions } from 'react-native-router-flux';


class GameEntry extends Component {
  constructor(props) {
    super(props);
    this.convertToHours = this.convertToHours.bind(this);
    this.calculateAverageRating = this.calculateAverageRating.bind(this);
    this.initGame = this.initGame.bind(this);
    this.state = {
      challenges: [],
      averageRating: 0
    }
  }

  componentDidMount() {
    fetch(`http://192.168.56.1:3000/api/challenge/findChallengeByGameId/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({challenges: data});
    })
    .catch((err) => {
      console.error(err);
    });

    fetch(`http://192.168.56.1:3000/api/rating/findRating/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then(({stars}) => {
      console.log(stars,'data')
      // let total;
      // data.forEach(obj => {
      //   total += obj.stars;
      // })
      // let rating = total/data.length;
      // console.log(rating,'this is the rating')
      // this.setState({averageRating: rating});
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

  calculateAverageRating(data) {
    let total;
    data.forEach(obj => {
      total += obj.stars;
    })
    console.log(total, 'accumulated stars')
    return total/data.length;
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
            <Stars rate={this.state.averageRating} size={35}/>
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