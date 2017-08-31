import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight
} from 'react-native';
import Review from './Review';
import { Card } from 'react-native-elements';
import Stars from 'react-native-stars-rating';
import { Actions } from 'react-native-router-flux';
import { getAllGameChallenges } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    gameId: state.app.currentGame
  }
}

class GameEntry extends Component {
  constructor(props) {
    super(props);
    this.convertToHours = this.convertToHours.bind(this);
    this.initGame = this.initGame.bind(this);
    this.state = {
      challenges: [],
      averageRating: 0,
      renderStars: false,
      reviewIcon: false,
      reviews: [],
      showReview: false,
      gameId: this.props.game.id
    }
  }

  componentDidMount() {
    fetch(`http://10.0.2.2:3000/api/challenge/findChallengeByGameId/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({challenges: data});
    })
    .catch((err) => {
      console.error(err);
    });

    fetch(`http://10.0.2.2:3000/api/rating/findRating/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      let total = 0;
      data.forEach(obj => {
        total += obj.stars;
      })
      let rating = total/data.length;
      this.setState({averageRating: Math.round(rating)});
      this.setState({ renderStars: true });
    })
    .catch((err) => {
      console.error(err);
    });

    fetch(`http://192.168.56.1:3000/api/review/findReview/?gameId=${this.props.game.id}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({reviews: data});
      if(this.state.reviews.length > 0) {
        this.setState({reviewIcon: true});
      }
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
    //Actions.task();
    Actions.initgame();

    fetch(`http://10.0.2.2:3000/api/challenge/findChallengeByGameId/?gameId=${this.props.game.id}`)
      .then((response) => response.json())
      .then((challenges) => {
        console.log(`challenges is ${JSON.stringify(challenges)}`)
        getAllGameChallenges(challenges)
        console.log(`this is this.props.gameId: ${this.props.gameId}`)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View>
        <Card title={this.props.game.name}> 
          <View >
          {/* <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showReview}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={{marginTop: 22}}>
              <View>
                {this.state.reviews.map( (review, index) => {
                  <Review review={review} key={index}/>
                })}
                <TouchableHighlight onPress={() => {
                  this.setState({showReview: false});
                }}>
                  <Text>Back to Games</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal> */}

            <Text>Number of Challenges: {this.state.challenges.length}</Text>
            <Text>Max Players: {this.props.game.maxPlayers}</Text>
            <Text>Duration of Game: {this.convertToHours(this.props.game.duration)}</Text>
            {this.state.renderStars ? <Stars rate={this.state.averageRating} size={35}/> : null}
            {this.state.reviewIcon ? <Text onPress={() => {this.setState({showReview: true})}}>{this.state.reviews.length} Reviews</Text> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(GameEntry)