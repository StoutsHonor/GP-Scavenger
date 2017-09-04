import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  TouchableHighlight,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, geatAllUserGames, setCurrentChallengeIndex } from '../../actions/index';
import GPSChallenge from './challengetypes/GPSChallenge';
import QuestionChallenge from './challengetypes/QuestionChallenge';
// import CameraChallenge from './challengetypes/CameraChallenge';
import config from '../../../config/config'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex
  }
}

class CurrentChallenge extends Component {
  constructor(props) {
    super(props);
    this.challengeCompleted = this.challengeCompleted.bind(this);
    this.getNextChallenge = this.getNextChallenge.bind(this);
    this.state = {
      gameId: 3,
      challenges: [],
      currentChallengeIndex: 0,
      currentChallenge: null,
      modalVisible: false,
      displayChallenge: null
    }
  }

  componentWillMount() {
    // fetch(`${config.localhost}/api/challenge/findChallengeByGameId/?gameId=${this.state.gameId}`)
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({challenges: data, currentChallenge: data[0]}, () => {
    //     //console.log(`this.state.challenges is ${JSON.stringify(this.state.challenges)} and
    //     //this.state.currentchallenge is ${JSON.stringify(this.state.currentChallenge)}`)
    //   });
    // })
    // .catch((err) => {
    //   console.error(err);
    // });
  }

  componentDidMount() {
    let typeId = this.props.challenges.questionTypeId
    if(typeId === 1) {
      this.setState({displayChallenge:<GPSChallenge/>})
    } else if(typeId === 2 || typeId === 3) {
      this.setState({displayChallenge:<QuestionChallenge/>})
    }
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
    console.log(this.props.index, 'index at challenge')
    return (
      <View>
        <QuestionChallenge/>
      </View>
        // <View style={styles.container}>
        //   <Button title="Render Challenges" onPress={() =>{this.props.setCurrentChallengeIndex(this.props.index + 1)}}/>
        //   <Text>Hello Current Challenge</Text>
        //   {challenge}
        //   <Modal
        //   animationType={"slide"}
        //   transparent={false}
        //   visible={this.state.modalVisible}
        //   onRequestClose={() => {alert("Modal has been closed.")}}
        //   >
        //  <View style={{marginTop: 22}}>
        //   <View>
        //     <Text>CONGRATS YOU GOT TO THE CHECKPOINT!!!</Text>

        //     <TouchableHighlight onPress={() => {
        //       this.getNextChallenge(!this.state.modalVisible)
        //     }}>
        //       <Text>GET NEXT CHALLENGE</Text>
        //     </TouchableHighlight>

        //   </View>
        //  </View>
        // </Modal>
        // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentChallenge);