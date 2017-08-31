import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges } from '../actions/index';
import { getAllUsersGames } from '../action/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    //gameId: state.app.currentGame,
    //challenges: state.play.allChallenges
  }
}

class DemoGPSGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 3
    }
  }

  componentWillMount() {
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
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
        GPS Challenge or Question Challenge Components go hereWheee
      </Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoGPSGame);