import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import GameEntry from './GameEntry';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAllUsersGames} from '../actions/index.js'

const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    games: state.play.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getAllUsersGames}, dispatch)
}



class MyGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      games: []
    }
  }

  componentDidMount() {
    fetch('http://10.0.2.2:3000/api/game/findGameByUserId/?userId=1')
    .then((response) => response.json())
    .then((responseJson) => {
      //this.setState({games: responseJson});
      console.log(`getAllUsersGames is ${JSON.stringify(getAllUsersGames)}`)
      getAllUsersGames(responseJson)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    console.log(`this.props.games is ${JSON.stringify(this.props.games)}`)
    return (
      <ScrollView>
        {this.props.games.map((game, key) => {
          return (
            <GameEntry game={game} key={key}/>
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191970',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(MyGames)