import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';
import FloatingButton from '../reusable/FloatingButton';
import TitledInput from '../reusable/TitledInput';
import config from '../../../config/config';

import { Container, Header, List, ListItem, Content, Separator, Form, Item, Input, Tab, Tabs } from 'native-base'

// import createGameBackground from '../../media/createGameBackground.png'

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField, challengesUpdated, submittedCreatedGame} from '../../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    createGameName: state.create.createGameName,
    createGameDescription: state.create.createGameDescription,
    createGameDuration: state.create.createGameDuration,
    createGameMaxPlayers: state.create.createGameMaxPlayers,
    createGameMode: state.create.createGameMode,
    createGameStartingLocation: state.create.createGameStartingLocation,
    createGameChallenges: state.create.createGameChallenges
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enteredField, challengesUpdated, submittedCreatedGame}, dispatch)
}

class CreateGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyState: '',
      createChallenges: [],
    }
    this.setStartingLocation = this.setStartingLocation.bind(this)
    this.checkValidGame = this.checkValidGame.bind(this)
    this.submitGame = this.submitGame.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dummyState: ''});
  }

  setStartingLocation(location) {
    this.props.enteredField('createGameStartingLocation', location)
  }



  checkValidGame() {
    if (!this.props.createGameName ||
      !this.props.createGameDescription ||
      !this.props.createGameDuration ||
      !this.props.createGameMaxPlayers) {
      Alert.alert(
        'Error',
        'Please fill out all fields!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')}]
      )
      return false
    } else if (!this.props.createGameStartingLocation) {
      Alert.alert(
        'Error',
        'Please set a starting location for this game!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')}]
      )
      return false
    }  else if (this.props.createGameChallenges.length < 1) {
      Alert.alert(
        'Error',
        'You must have at least one challenge!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')}]
      )
      return false
    } else {
      Alert.alert(
        '',
        'Game Submitted!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')}]
      )

      return true
    }
  }

  submitGame() {
    console.log('submitGame: props:', this.props)
    console.log(`${config.localhost}/api/game/addGame`)
    // POST game to insert to DB, then POST challenges
    fetch(`${config.localhost}/api/game/addGame`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.props.createGameName,
        userId: 1,
        duration: this.props.createGameDuration,
        maxPlayers: this.props.createGameMaxPlayers,
        private: false,
        rewardPoints: 0,
        startLocation: [this.props.createGameStartingLocation.latitude, this.props.createGameStartingLocation.longitude]
      })
    })
    .catch(error => console.log('error in posting game: ', error))
    .then( (response) => response.json())
    .then( (data) => {
      console.log(data, 'game posted')
      return data
    })

    // after posting game, we receive game data and can post questions, then challenges
    .then( (game) => {
      console.log('before posting questions: ', game)
      this.props.createGameChallenges.map(
      (challenge, index) => {

        let questionTypes = {
          GPSChallenge: 1,
          riddleQuestion: 2,
          logicQuestion: 3,
          cameraPrompt: 4,
          videoQuestion: 5,
          photoQuestion: 6,
        }
        let tempChallengeTypeId = questionTypes[challenge.ChallengeType]

        let questionTableRouting = {
          riddleQuestion: '/riddle/addRiddle',
          cameraPrompt: '/photo/addPhoto',
          photoQuestion: '/guessPhoto/addPhoto',
          videoQuestion: '/video/addVideo',
          GPSChallenge: null
        }

        let tempQuestionTablePath = questionTableRouting[challenge.ChallengeType]

        // build appropriately formatted object to POST to Questions Table
        if (tempQuestionTablePath) {
          console.log('question exists, posting question')
          let tempQuestionObject = {
            title: challenge.ChallengeTitle,
            question: challenge.ChallengeObjective,
            answer: challenge.ChallengeAnswer,
            difficulty: 'easy',
            default: false,
            imageURL: 'JL test imageURL',
            instruction: challenge.ChallengeObjective,
            link: 'JL testLink'
          }

          console.log('tempQuestionObject: ', tempQuestionObject)
          console.log('preparing to POST questions: ', challenge)
          // console.log('gameId: ', game.id)

          // console.log('posting question to path: ' + `${config.localhost}/api${tempQuestionTablePath}` )
          fetch(`${config.localhost}/api${tempQuestionTablePath}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempQuestionObject)
          })
  
          .catch(error => console.log('error in posting question: ', error))
          .then( (response) => response.json())
          .then( (data) => {
            console.log(data, 'question posted')
            return data
          })
          .catch(error => console.log('error in posting question: ', error))
          // post the challenge to the challenge table (if any)
          .then( (questionData) => {
  
            let tempChallengeObject = {
              name: challenge.ChallengeTitle,
              description: challenge.ChallengeDescription,
              gameId: game.id,
              sequence: index + 1,
              location: null,
              timeLimit: 9999,
              questionTypeId: tempChallengeTypeId,
              questionId: questionData.id
            }
            console.log('preparing to POST challenge: ', tempChallengeObject)
    
            fetch(`${config.localhost}/api/challenge/addChallenge`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(tempChallengeObject)
            })
            .catch(error => console.log('error in posting challenge: ', error))
            .then( (response) => response.json())
            .then( (data) => {
              console.log(data, 'challenge posted')
              return data
            })

          }) // end .then block for POST challenge


        } else {
          // no question type, GPS only
          
          let tempChallengeObject = {
            name: challenge.ChallengeTitle,
            description: challenge.ChallengeDescription,
            gameId: game.id,
            sequence: index + 1,
            location: [challenge.ChallengeLocation.latitude, challenge.ChallengeLocation.longitude],
            timeLimit: 9999,
            questionTypeId: 1,
            questionId: null
          }
          console.log('preparing to POST GPS specific challenge: ', tempChallengeObject)

          fetch(`${config.localhost}/api/challenge/addChallenge`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempChallengeObject)
          })
          .catch(error => console.log('error in posting challenge: ', error))
          .then( (response) => response.json())
          .then( (data) => {
            console.log(data, 'challenge posted')
            return data
          })

        }

      } // end callback function of .map 
    )}) // end .then block for POST question


  }

  render() {
    // console.log('rendering: this.state: ', this.state);
    return (
      <SideMenu menu={<HomePage/>}>
      <Container style={styles.container}>
        <Content>

        <View>
          <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../../media/createGameBackground.png') } />
        </View>

        <Header hasTabs />
        <Tabs initialPage={1}>
          <Tab heading="Info">

        <Form>
          <Item>
            <Text>Game Name: </Text>
            <Input placeholder="name placeholder"/>
          </Item>

          <Item>
            <Text>Game Description: </Text>
            <Input placeholder="description placeholder"/>
          </Item>

          <Item>
            <Text>Duration (Minutes): </Text>
            <Input placeholder="duration placeholder"/>
          </Item>

          <Item>
            <Text>Max Players: </Text>
            <Input placeholder="maxplaoyer placeholder"/>
          </Item>

          <Item>
            <Text>Starting Location: </Text>
            <Text>{this.props.createGameStartingLocation ? 'Latitude: ' + JSON.stringify(this.props.createGameStartingLocation.latitude.toFixed(2)) + ', Longitude: ' + JSON.stringify(this.props.createGameStartingLocation.longitude.toFixed(2)) : '(No Location Set)'}</Text>
          </Item>

          <Item>
            <Button onPress={() => {Actions.createMap({setting: 'createStartLoc'})}}
            title="Set Starting Location"
            color="#841584"/>

            <Button onPress={() => {this.props.enteredField('createGameStartingLocation', null)}}
            title="Clear Starting Location"
            color="#841584"/>
          </Item>

        </Form>

          </Tab>
          <Tab heading="Challenges">
            <Text>Challenges:</Text>
            {this.props.createGameChallenges.map((challenge, index) => {
              return (
                <Text key={index}>{'#' + JSON.stringify(index + 1) + ': ' + challenge.ChallengeTitle}</Text>
              )
            })}
          </Tab>
        </Tabs>



        <View style={styles.containerMenu}>
          <TitledInput
            label='Game Name'
            placeholder='Enter Here...'
            value={this.props.createGameName}
            onChangeText={(e) => {this.props.enteredField('createGameName', e)}}
          />
          <TitledInput
            label='Game Description'
            placeholder='Enter Here...'
            value={this.props.createGameDescription}
            onChangeText={(e) => {this.props.enteredField('createGameDescription', e)}}
          />
          <TitledInput
            label='Duration (Minutes)'
            placeholder='Enter Here...'
            value={this.props.createGameDuration}
            onChangeText={(e) => {
              if (isNaN(e)) {
                Alert.alert(
                  'Error',
                  'Game Duration must be a number!',
                  [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
                )
                this.props.enteredField('createGameDuration', '')
              } else {
                this.props.enteredField('createGameDuration', Math.ceil(e))
              }
            }}
          />
          <TitledInput
            label='Max Players'
            placeholder='Enter Here...'
            value={this.props.createGameMaxPlayers}
            onChangeText={(e) => {
              if (isNaN(e)) {
                Alert.alert(
                  'Error',
                  'Max Players must be a number!',
                  [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
                )
                this.props.enteredField('createGameMaxPlayers', '')
              } else {
                this.props.enteredField('createGameMaxPlayers', Math.ceil(e))
              }
            }}
          />


          <Text>{'Start Location: '}{this.props.createGameStartingLocation ? 'Latitude: ' + JSON.stringify(this.props.createGameStartingLocation.latitude.toFixed(2)) + ', Longitude: ' + JSON.stringify(this.props.createGameStartingLocation.longitude.toFixed(2)) : '(No Location Set)'}</Text>

          <Button onPress={() => {Actions.createMap({setting: 'createStartLoc'})}}
          title="Set Starting Location"
          color="#841584"/>

          <Button onPress={() => {this.props.enteredField('createGameStartingLocation', null)}}
          title="Clear Starting Location"
          color="#841584"/>


          {/* <FloatingButton/> */}
          {/* <CreateList style={{}} data={this.props.createGameChallenges}/> */}

          <Text>Challenges:</Text>
          {this.props.createGameChallenges.map((challenge, index) => {
            return (
              <Text key={index}>{'#' + JSON.stringify(index + 1) + ': ' + challenge.ChallengeTitle}</Text>
            )
          })}

          <Button onPress={() => {
            console.log('props: ', this.props)
          }}
          title="See Props"
          color="#841584"/>

          <Button onPress={() => {Actions.createChallenge()} }
          title="Add a Challenge"
          color="#841584"/>
         
          <Button onPress={() => {
            let canSubmit = this.checkValidGame();
            if (canSubmit) {
              this.submitGame();
            }
          }}
          title="Submit Game"
          color="#841584"/>

          </View>
        </Content>
        </Container>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97b8ef',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  containerMenu: {
    flex: 1,
    position: 'absolute',
  },
});

// export default CreateGame;

// Redux Style export default:
export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
