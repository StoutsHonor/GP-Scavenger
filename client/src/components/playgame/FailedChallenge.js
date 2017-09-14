import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentChallengeIndex, setGamePoints } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setGamePoints, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints
  }
}

class FailedChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFinal: false
    }
  }

  componentDidMount() {
    if(this.props.challenges) {
      if( this.props.index === this.props.challenges.length - 1) {
        this.setState({displayFinal: true});
      } else {
        this.props.setCurrentChallengeIndex(this.props.index + 1);
      }
    }
  }

  render() { 
    let lostPoints;
    if(this.props.challenges) {
      lostPoints = Math.floor(this.props.gameInfo.rewardPoints/this.props.challenges.length);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You Did Not Complete this Challenge.
        </Text>
        {this.state.displayFinal ? 
          <Text onPress={() => Actions.congratspage()}>Go to Finish</Text> : 
          <Text onPress={() => Actions.Challenge()}>Go To Your Next Task</Text>
        }
        <Text onPress={() => Actions.List()}>Go To Your Challenge List</Text>
        <Text onPress={() => Actions.Chat()}>Go To Chat</Text>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC143C',
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

export default connect(mapStateToProps, mapDispatchToProps)(FailedChallenge);