import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex } from '../../actions/index';
import ChallengeListEntry from './ChallengeListEntry';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints
  }
}

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{this.props.gamePoints} Points Earned So Far</Text>
        {this.props.challenges ? this.props.challenges.map((challenge, i) => {
        return <ChallengeListEntry challenge={challenge} challengeIndex={i} index={this.props.index} key={i}/>
      }) : null}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#87CEFA'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);