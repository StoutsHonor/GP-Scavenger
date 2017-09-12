import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGamePoints, getAllGameChallenges, geatAllUserGames, setCurrentChallengeIndex } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setGamePoints, getAllGameChallenges, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex,
    gameInfo: state.play.gameInfo,
    gamePoints: state.play.gamePoints
  }
}

class CongratsNext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFinal: false
    }
  }

  componentDidMount() {
    let earnedPoints = this.props.gamePoints + Math.ceil(this.props.gameInfo.rewardPoints/this.props.challenges.length);
    this.props.setGamePoints(earnedPoints);

    if(this.props.index === this.props.challenges.length - 1) {
      this.setState({displayFinal: true});
    } else {
      this.props.setCurrentChallengeIndex(this.props.index + 1);
    }
  }

  render() {
    let earnedPoints = Math.ceil(this.props.gameInfo.rewardPoints/this.props.challenges.length);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Congratulations! You Earned:
        </Text>
        <Text style={styles.points}>{earnedPoints || null}</Text>
        <Text style={styles.welcome}>Points from this Challenge.</Text>
        {this.state.displayFinal ? 
          <Text onPress={() => Actions.congratspage()}>Go to Finish</Text> : 
          <Text onPress={() => Actions.currentchallenge()}>Go To Your Next Task</Text>
        }
        <Text onPress={() => Actions.challengelist()}>Go To Your Challenge List</Text>
        <Text onPress={() => Actions.chat()}>Brag About It In Chat</Text>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(CongratsNext);