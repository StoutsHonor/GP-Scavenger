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
import io from 'socket.io-client';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges, setCurrentChallengeIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    currentChallengeIndex: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints,
    currentGameTeam1: state.play.currentGameTeam1,
    currentGameTeam2: state.play.currentGameTeam2
  }
}

class CurrentChallenge extends Component {
  constructor(props) {
    super(props);
    this.challengeCompleted = this.challengeCompleted.bind(this);
    this.challengeSkipped = this.challengeSkipped.bind(this);
    this.getNextChallenge = this.getNextChallenge.bind(this);
    this.congratsPage = this.congratsPage.bind(this);
    this.congratsNext = this.congratsNext.bind(this);
    this.determinedTeam = this.determinedTeam.bind(this);
    this.loserPage = this.loserPage.bind(this);
    this.addPlayersToList = this.addPlayersToList.bind(this);
    this.parseTeam = this.parseTeam.bind(this);
    this.gameName = 'game' + this.props.gameId;
    this.team = null;
    

    this.state = {
      modalVisible: false,
      currentChallengeType: '',
      displayChallenge: null
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.socket = io(config.localhost);
    this.socket.emit('createRoom',  this.gameName);
    this.socket.on('congratsPage', this.congratsPage);
    this.socket.on('congratsNext', this.congratsNext);
    this.socket.on('loserPage', this.loserPage);
    this.determinedTeam();

    //this.addPlayersToList();
    if(this.props.challenges) {
      console.log(`this.props.challenges is ${JSON.stringify(this.props.challenges)}`)
      console.log(`this.props.currentChallengeIndex is ${JSON.stringify(this.props.currentChallengeIndex)}`)
      if (!this.props.currentChallengeIndex) {
        this.props.currentChallengeIndex = 0;
      }
      if(this.props.challenges[this.props.currentChallengeIndex].questionTypeId) {
        let currentChallengeType = this.props.challenges[this.props.currentChallengeIndex].questionTypeId;
        let val = currentChallengeType;
        console.log(`currentChallengeType is ${currentChallengeType}`)
        if(currentChallengeType === null || currentChallengeType === 1) {
          this.setState({ currentChallengeType: 'GPS' })
        } else if(currentChallengeType === 2 || currentChallengeType === 3) {
          this.setState({ currentChallengeType: 'riddle' })
        } else {
          this.setState({ currentChallengeType: val })
        }
      }
    }

    let obj = {
      gameName: this.gameName,
      team: this.team,
      index : this.props.currentChallengeIndex
    };
    this.socket.emit('changeOpponentShow', obj);


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.challenges.length > 0) {
      if (!nextProps.currentChallengeIndex) {
        nextProps.currentChallengeIndex = 0;
      }
      if (nextProps.challenges[nextProps.currentChallengeIndex].questionTypeId) {
        let currentChallengeType = nextProps.challenges[nextProps.currentChallengeIndex].questionTypeId;
        let val = currentChallengeType;
        if(currentChallengeType === null || currentChallengeType === 1) {
          this.setState({ currentChallengeType: 'GPS' })
        } else if(currentChallengeType === 2 || currentChallengeType === 3) {
          this.setState({ currentChallengeType: 'riddle' })
        } else {
          this.setState({ currentChallengeType: val })
        }
      }
    }
  }
  
  determinedTeam() {
    for(let val of this.props.currentGameTeam1) {
      if(val === this.props.userId) {
        this.team = 'team1';
        this.otherTeam = 'team2';
        return;
      }
    }
    this.team = 'team2';
    this.otherTeam = 'team1';
  }

  challengeCompleted() {
    let message = {};
    message.gameName = this.gameName;
    message.team = this.team;
    message.otherTeam = this.otherTeam;

    if (this.props.currentChallengeIndex+1 === this.props.challenges.length) {
      this.socket.emit('congratsPage', message);
      this.socket.emit('loserPage', message);
      
    } else {
      this.socket.emit('congratsNext', message);
    }
    //this.setModalVisible(true)
  }

  parseTeam() {
    let arr = this.props.currentGameTeam1.concat(this.props.currentGameTeam2);
    console.log('arr is ', arr);
    for(let i = 0; i < arr.length; ++i) {
      console.log('element is ' + i);
      console.log('i is ' + arr[i]);
      if(this.props.userId === arr[i]) {
        arr.splice(i, 1);
      }
    }

    return arr;
  }


  addPlayersToList(){
    let arr = this.parseTeam();
    let message = {
      RecentlyPlayedWith: arr,
      email: this.props.userId
    };

    let obj = {};
    obj.method = 'put';
    obj.headers = {"Content-type": "application/json"};
    obj.body = JSON.stringify(message);

    fetch(`${config.localhost}/api/user/updateRecentlyPlayedWithList`, obj)
    .then((response) => {
      return response;      
    })
    .then((data) => {
     
      console.log('Players successfully added to recently play with list');

    })
    .catch((err) => {
      console.error(err);
    }); 
  }

  congratsPage(team) {
    if(team === this.team) {
      Actions.congratspage();
    }
  }

  loserPage(team) {
    if (team.otherTeam === this.team) {
      Actions.failedpage();
    }
  }

  congratsNext(team) {
    if(team === this.team) {
     
      let obj = {
        gameName: this.gameName,
        team: this.team,
        index : this.props.currentChallengeIndex
      };
      this.socket.emit('changeOpponentShow', obj);
      Actions.congratsnext();
    }
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