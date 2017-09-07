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
      console.log('if is hitting')
      if( this.props.index === this.props.challenges.length - 1) {
        this.setState({displayFinal: true});
        let newPoints = this.props.gamePoints - Math.floor(this.props.gameInfo.rewardPoints / this.props.challenges.length);
        console.log(newPoints, 'points to subtract from')
        this.props.setGamePoints(newPoints);
        //this.props.setCurrentChallengeIndex(this.props.index + 1);
      } else {
        let newPoints = this.props.gamePoints - Math.floor(this.props.gameInfo.rewardPoints / this.props.challenges.length);
        console.log(newPoints, 'points to subtract from')
        this.props.setGamePoints(newPoints);
        this.props.setCurrentChallengeIndex(this.props.index + 1);
      }
    }
  }

  render() { 
    let lostPoints;
    if(this.props.challenges) {
      lostPoints = Math.floor(this.props.gameInfo.rewardPoints/this.props.challenges.length);
    }
    console.log(this.props.gamePoints, 'game points at failed')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You Did Not Complete this Challenge.  You Lost:
        </Text>
        <Text style={styles.points}>{lostPoints || null}</Text>
        <Text style={styles.welcome}>Points for Skipping.</Text>
        {this.state.displayFinal ? 
          <Text onPress={() => Actions.congratspage()}>Go to Finish</Text> : 
          <Text onPress={() => Actions.currentchallenge()}>Go To Your Next Task</Text>
        }
        <Text onPress={() => Actions.challengelist()}>Go To Your Challenge List</Text>
        <Text onPress={() => Actions.chat()}>Go To Chat</Text>
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