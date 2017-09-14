import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setGamePoints, getAllGameChallenges, geatAllUserGames, setCurrentChallengeIndex } from '../../actions/index';

import Confetti from 'react-native-confetti';

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

    if(this._confettiView) {
      this._confettiView.startConfetti();
   }
  }

  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }

  render() {
    let earnedPoints = Math.ceil(this.props.gameInfo.rewardPoints/this.props.challenges.length);
    return (
      <View style={styles.container}>
       
        <View style={styles.modal}>
        <Image style={{ flex: .90, resizeMode: 'contain', width: 100, padding: 0}} source={ require('../../media/star.png') } />
            
  
            <Text style={styles.welcome1}>Congratulations! </Text>
           
 
            <Text style={styles.welcome2}>
              You Earned:
            </Text>
            <Text style={styles.points}>{earnedPoints || null}</Text>
            <Text style={styles.welcome2}>Points from this Challenge.</Text>
            {this.state.displayFinal ? 
              <Text onPress={() => Actions.congratspage()}>Go to Finish</Text> : 
              <Text onPress={() => Actions.Challenge()}>Go To Your Next Task</Text>
            }
            <Text onPress={() => Actions.List()}>Go To Your Challenge List</Text>
            <Text onPress={() => Actions.Chat()}>Brag About It In Chat</Text>
        </View>     
      </View>
    );
  }
}
//backgroundColor: '#006400',
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9cfa3'
  },
  modal: {
    height: 350,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#5cb85c'
  },

  welcome1: {
    marginTop: 5,
    fontSize: 22,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  points: {
    fontSize: 40,
    textAlign: 'center',
    color: '#00008B'
  },
  welcome2: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CongratsNext);