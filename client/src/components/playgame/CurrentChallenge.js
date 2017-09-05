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
// import CameraChallenge from './challengetypes/CameraChallenge';
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
    currentChallengeIndex: state.play.currentChallengeIndex
  }
}

class CurrentChallenge extends Component {
  constructor(props) {
    super(props);
    this.challengeCompleted = this.challengeCompleted.bind(this);
    this.getNextChallenge = this.getNextChallenge.bind(this);
    this.state = {
      modalVisible: false,
      currentChallengeType: '',
      displayChallenge: null
    }
  }

  componentWillMount() {
    console.log(`CurrentChallenge.js - componentWillMount() - this.props is`, this.props)

    let currentChallengeType = this.props.challenges[this.props.currentChallengeIndex].questionTypeId

    if(currentChallengeType === null) {
      console.log(`CurrentChallenge.js - componentWillMount() - currentChallengeType === null`)
      this.setState({ currentChallengeType: 'GPS' })
    } else if(currentChallengeType === 2 || currentChallengeType === 3) {
      console.log(`CurrentChallenge.js - componentWillMount() - currentChallengeType === 2 or 3`)
      this.setState({ currentChallengeType: 'riddle' })
    }

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
    console.log(`CurrentChallenge.js - componentWillReceiveProps() - nextProps is`, nextProps)
    
    if (nextProps.challenges) {
      let currentChallengeType = nextProps.challenges[nextProps.currentChallengeIndex].questionTypeId    
      if(currentChallengeType === null) {
        console.log(`CurrentChallenge.js - componentWillReceiveProps() - currentChallengeType === null`)
        this.setState({ currentChallengeType: 'GPS' })
      } else if(currentChallengeType === 2 || currentChallengeType === 3) {
        console.log(`CurrentChallenge.js - componentWillReceiveProps() - currentChallengeType === 2 or 3`)
        this.setState({ currentChallengeType: 'riddle' })
      }
    }
  }

  challengeCompleted() {
    if (this.props.currentChallengeIndex+1 === this.props.challenges.length) {
      Actions.congratspage()
    } else {
      Actions.congratsnext()
    }
    //this.setModalVisible(true)
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
        currentChallenge = (<GPSChallenge currentChallenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted}/>)
      } else if (this.state.currentChallengeType === 'riddle') {
        currentChallenge = (<QuestionChallenge challenge={this.props.challenges[this.props.currentChallengeIndex]} challengeCompleted={this.challengeCompleted}/>)
      }
    }


    return (
      <View>
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