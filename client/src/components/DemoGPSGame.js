import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges } from '../actions/index';
import { getAllUsersGames } from '../actions/index';
import GPSChallengeTask from './GPSChallengeTask';

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
      gameId: 3,
      challenges: [],
      currentChallengeIndex: 0,
      currentChallenge: null
    }
  }

  componentWillMount() {
    fetch(`http://10.0.2.2:3000/api/challenge/findChallengeByGameId/?gameId=${this.state.gameId}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({challenges: data, currentChallenge: data[0]}, () => {
        //console.log(`this.state.challenges is ${JSON.stringify(this.state.challenges)} and
        //this.state.currentchallenge is ${JSON.stringify(this.state.currentChallenge)}`)
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    let challenge = null
    //console.log(`this.state.currentChallenge in DemoGPSGame is ${JSON.stringify(this.state.currentChallenge)} `)
    if (this.state.currentChallenge !== null) {
      if (this.state.currentChallenge.location !== null && this.state.currentChallenge.questionTypeId === null) {
        challenge = (<GPSChallengeTask currentChallenge={this.state.currentChallenge}/>)
      } else if (this.state.currentChallenge.questionTypeId === 1) {
        challenge= (<Text>Riddles riddlessss</Text>)
      }
    }
    return (
        <View style={styles.container}>
          {challenge}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoGPSGame);