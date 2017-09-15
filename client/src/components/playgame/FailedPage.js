import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex, getGameId, setGamePoints, getGameInfo } from '../../actions/index';
import config from '../../../config/config';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex, getGameId,setGamePoints, getGameInfo }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    email: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges,
    currentChallengeIndex: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints
  }
}

class FailedPage extends Component {

  componentDidMount() {
    let earnedPoints = this.props.gamePoints + Math.ceil(this.props.gameInfo.rewardPoints/this.props.challenges.length) - 250;
    this.props.setGamePoints(earnedPoints);
    
    fetch(`${config.localhost}/api/user/findUserPoints/?email=${this.props.email}`)
    .then(response => response.json())
    .then(data => this.setState({userPoints: data.rewardPoints}))
    .then(() => {
      fetch(`${config.localhost}/api/user/updateRewardPoints/`,
        {
          method: 'POST',
          headers: {"Content-type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({email: this.props.email,
          rewardPoints: this.props.gamePoints + this.state.userPoints})
        })
    })
    .catch(err => console.error(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
        <Image 
            style={{width: 250, height: 150, borderWidth: 1, borderColor: '#000'}}
            source={{uri: 'https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAswAAAAJDY3MGQxODUwLTExYjgtNDRlOS04NmJhLWMzNjNiZDk5ZjBiZQ.jpg'}}
     
        />
        <Text style={styles.welcome}>
          The other team won! 
          Aw well, try again.
        </Text>

        <Text style={styles.welcome}>At Least You Earned: </Text>
        <Text style={styles.points}>{this.props.gamePoints}</Text>
        <Text style={styles.welcome}>Points From This Game.</Text>
        <Text onPress={() => Actions.homepage({type:'reset'})}>Back to Home</Text>
        <Text onPress={() => Actions.leaderboard({type:'reset'})}>Leaderboard</Text>
        </View>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9cfa3',
  },
  modal: {
    height: 500,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#d75452'
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

export default connect(mapStateToProps, mapDispatchToProps)(FailedPage);
