import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  TouchableHighlight
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
    this.challengeCompleted = this.challengeCompleted.bind(this);
    this.getNextChallenge = this.getNextChallenge.bind(this);
    this.state = {
      gameId: 3,
      challenges: [],
      currentChallengeIndex: 0,
      currentChallenge: null,
      modalVisible: false
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

  challengeCompleted() {
    //render the next GPS coordinate
    this.setModalVisible(true)
  }

  getNextChallenge() {
    //increment the currentChallengeIndex
    this.setModalVisible(!this.state.modalVisible)
    let newIndex = this.state.currentChallengeIndex + 1
    this.setState({currentChallengeIndex: newIndex, currentChallenge: this.state.challenges[newIndex]})
  }

  setModalVisible(boo) {
    this.setState({modalVisible: boo})
  }

  render() {
    let challenge = null
    //console.log(`this.state.currentChallenge in DemoGPSGame is ${JSON.stringify(this.state.currentChallenge)} `)
    if (this.state.currentChallenge !== null) {
      if (this.state.currentChallenge.location !== null && this.state.currentChallenge.questionTypeId === null) {
        challenge = (<GPSChallengeTask currentChallenge={this.state.currentChallenge} challengeCompleted={this.challengeCompleted}/>)
      } else if (this.state.currentChallenge.questionTypeId === 1) {
        challenge= (<Text>Riddles riddlessss</Text>)
      }
    }
    return (
        <View style={styles.container}>
          {challenge}
          <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>CONGRATS YOU GOT TO THE CHECKPOINT!!!</Text>

            <TouchableHighlight onPress={() => {
              this.getNextChallenge(!this.state.modalVisible)
            }}>
              <Text>GET NEXT CHALLENGE</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
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