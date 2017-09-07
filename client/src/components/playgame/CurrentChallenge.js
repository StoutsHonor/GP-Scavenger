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
import { getAllGameChallenges, getAllUserGames, setCurrentChallengeIndex } from '../../actions/index';
import GPSChallenge from './challengetypes/GPSChallenge';
import QuestionChallenge from './challengetypes/QuestionChallenge';
import CameraChallenge from './challengetypes/CameraChallenge';
import GuessPhotoChallenge from './challengetypes/GuessPhotoChallenge';
import VideoChallenge from './challengetypes/VideoChallenge';
import config from '../../../config/config';
import CongratsNext from './CongratsNext';
import CongratsPage from './CongratsPage';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    currentChallengeIndex: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints
  }
}

class CurrentChallenge extends Component {
  constructor(props) {
    super(props);
    this.challengeCompleted = this.challengeCompleted.bind(this);
    this.challengeSkipped = this.challengeSkipped.bind(this);
    this.getNextChallenge = this.getNextChallenge.bind(this);
    this.state = {
      modalVisible: false,
      currentChallengeType: '',
      displayChallenge: null
    }
  }

  componentWillMount() {
    if(this.props.challenges) {
      if(this.props.challenges[this.props.currentChallengeIndex].questionTypeId) {
        let currentChallengeType = this.props.challenges[this.props.currentChallengeIndex].questionTypeId;
        let val = currentChallengeType;
        if(currentChallengeType === null) {
          this.setState({ currentChallengeType: 'GPS' })
        } else if(currentChallengeType === 2 || currentChallengeType === 3) {
          this.setState({ currentChallengeType: 'riddle' })
        } else {
          this.setState({ currentChallengeType: val })
        }
      }
    }
    
    // else if (currentChallengeType === 4) {
    //   console.log(`CurrentChallenge.js - componentWillMount() - currentChallengeType === 4`)
    //   this.setState({ currentChallengeType: 'riddle' })
    // } else if (currentChallengeType === 5) {
    //   console.log(`CurrentChallenge.js - componentWillMount() - currentChallengeType === 5`)
    //   this.setState({ currentChallengeType: 'riddle' })
    // } else if (currentChallengeType === 6) {
    //   console.log(`CurrentChallenge.js - componentWillMount() - currentChallengeType === 6`)
    //   this.setState({ currentChallengeType: 'riddle' })
    // }

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

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challenges) {
      if (nextProps.challenges[nextProps.currentChallengeIndex].questionTypeId) {
        let currentChallengeType = nextProps.challenges[nextProps.currentChallengeIndex].questionTypeId;
        let val = currentChallengeType;
        if(currentChallengeType === null) {
          this.setState({ currentChallengeType: 'GPS' })
        } else if(currentChallengeType === 2 || currentChallengeType === 3) {
          this.setState({ currentChallengeType: 'riddle' })
        } else {
          this.setState({ currentChallengeType: val })
        }
      }
    }
  }

  challengeCompleted() {
    if (this.props.currentChallengeIndex+1 === this.props.challenges.length) {
      Actions.congratspage();
    } else {
      Actions.congratsnext();
    }
    //this.setModalVisible(true)
  }

  challengeSkipped() {
    Actions.failedchallenge();
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
    let currentChallenge = null
    if (this.props.challenges) {
      if (this.state.currentChallengeType === 'GPS') {
        currentChallenge = (<GPSChallenge currentChallenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted} challengeSkipped={this.challengeSkipped}/>)
      } else if (this.state.currentChallengeType === 'riddle') {
        currentChallenge = (<QuestionChallenge challenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted} challengeSkipped={this.challengeSkipped}/>)
      } else if (this.state.currentChallengeType === 4) {
        currentChallenge = (<CameraChallenge challenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted} challengeSkipped={this.challengeSkipped}/>) 
      } else if (this.state.currentChallengeType === 5) {
        currentChallenge = (<VideoChallenge challenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted} challengeSkipped={this.challengeSkipped}/>)
      } else if (this.state.currentChallengeType === 6) {
        currentChallenge = (<GuessPhotoChallenge challenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted} challengeSkipped={this.challengeSkipped}/>)
      }
    }

    return (
      <View  style={styles.container}>
        {currentChallenge}
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
        // <View style={styles.container}>
        //   <Button title="Render Challenges" onPress={() =>{this.props.setCurrentChallengeIndex(this.props.index + 1)}}/>
        //   <Text>Hello Current Challenge</Text>
        //   {challenge}

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