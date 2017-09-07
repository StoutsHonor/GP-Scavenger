import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex, getGameId } from '../../actions/index';
import config from '../../../config/config';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex, getGameId }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges,
    currentChallengeIndex: state.play.currentChallengeIndex
  }
}

class CongratsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPoints: 0
    };
  }

  componentDidMount() {
    this.props.getGameId(null)    
    this.props.getAllGameChallenges(null)
    this.props.setCurrentChallengeIndex(0)
    
    fetch(`${config.localhost}/api/user/findUserPoints/?userId=${1}`)
    .then(response => response.json())
    .then(data => this.setState({userPoints: data.rewardPoints}))
    .then(() => {
      fetch(`${config.localhost}/api/user/updateRewardPoints/`,
        {
          method: 'POST',
          headers: {"Content-type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({userId: 1,
          rewardPoints: this.props.gameInfo.rewardPoints + this.state.userPoints})
        })
    })
    .catch(err => console.error(err))
  }

  render() {
    console.log(this.props.gameInfo.rewardPoints + this.state.userPoints, 'points')
    return(
      <View style={styles.container}>
      <Text style={styles.welcome}>You Won! You Earned:</Text>
      <Text style={styles.points}>{this.props.gameInfo.rewardPoints}</Text>
      <Text style={styles.welcome}>Points From This Game!!!</Text>
      <Text onPress={() => Actions.homepage()}>Back to Home</Text>
      <Text onPress={() => Actions.joingame({listtype: 'join'})}>Play Another</Text>
      <Text onPress={() => Actions.leaderboard()}>Leaderboard</Text>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  points: {
    fontSize: 40,
    textAlign: 'center',
    color: '#00008B'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CongratsPage);