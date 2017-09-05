import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import FloatingButton from '../reusable/FloatingButton';
import TitledInput from '../reusable/TitledInput';

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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dummyState: ''});
  }

  setStartingLocation(location) {
    this.props.enteredField('createGameStartingLocation', location)
  }

  render() {
    console.log('rendering: this.state: ', this.state);
    return (
      <View style={styles.container}>
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
                'Game Duration must be a number',
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
                'Max Players must be a number',
                [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
              )
              this.props.enteredField('createGameMaxPlayers', '')
            } else {
              this.props.enteredField('createGameMaxPlayers', Math.ceil(e))
            }
          }}
        />
        {/* <TitledInput
          label='Game Mode'
          placeholder='Enter Here...'
          value={this.props.createGameMode}
          onChangeText={(e) => {this.props.enteredField('createGameMode', e)}}
        /> */}
        {/* <TitledInput
          label='Starting Location'
          placeholder='Enter Here...'
          value={this.props.createGameStartingLocation}
          onChangeText={(e) => {this.props.enteredField('createGameStartingLocation', e)}}
        /> */}



        <Text>{'Start Location: '}{this.props.createChallengeLocation ? 'Latitude: ' + JSON.stringify(this.props.createChallengeLocation.latitude.toFixed(2)) + ', Longitude: ' + JSON.stringify(this.props.createChallengeLocation.longitude.toFixed(2)) : '(No Location Set)'}</Text>

        <Button onPress={() => {Actions.createGPSchallenge({submitmethod: this.setStartingLocation})}}
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
          console.log('button pressed!')
          console.log('props: ', this.props)
        }}
        title="See Props"
        color="#841584"/>

        <Button onPress={() => {Actions.createChallenge()} }
         title="Add a Challenge"
         color="#841584"/>
        
        <Button onPress={() => {
          console.log('submit game pressed')
          Alert.alert(
            '',
            'Game Submitted!',
            [
              {text: 'Dismiss', onPress: () => console.log('OK Pressed!')},
            ]
          )} 
        }
        title="Submit Game"
        color="#841584"/>


      </View>
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
});

// export default CreateGame;

// Redux Style export default:
export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
