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
import ModularMap from '../reusable/ModularMap'
import ModularList from '../reusable/ModularList'

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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dummyState: ''});
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
        {/* <TitledInput
          label='Game Duration'
          placeholder='Enter Here...'
          value={this.props.createGameDuration}
          onChangeText={(e) => {this.props.enteredField('createGameDuration', e)}}
        />
        <TitledInput
          label='Game MaxPlayers'
          placeholder='Enter Here...'
          value={this.props.createGameMaxPlayers}
          onChangeText={(e) => {this.props.enteredField('createGameMaxPlayers', e)}}
        />
        <TitledInput
          label='Game Mode'
          placeholder='Enter Here...'
          value={this.props.createGameMode}
          onChangeText={(e) => {this.props.enteredField('createGameMode', e)}}
        />
        <TitledInput
          label='Game StartingLocation'
          placeholder='Enter Here...'
          value={this.props.createGameStartingLocation}
          onChangeText={(e) => {this.props.enteredField('createGameStartingLocation', e)}}
        /> */}

        {/* <FloatingButton/> */}
        {/* <CreateList style={{}} data={this.props.createGameChallenges}/> */}

        {/* {this.props.createGameChallenges.map((challenge, index) => {
          return (
            <Text key={index}>{'#' + JSON.stringify(index + 1) + ': ' + challenge.ChallengeTitle}</Text>
          )
        })} */}

        <View>
        <Button title="Toggle View"
        onPress={() => {
          if (this.state.view === 'map') {
          this.setState({view: 'list'})
          } else {
          this.setState({view: 'map'})
          } 
        }}/>
        {this.state.view === 'list' ? <ModularList viewmode={this.props.listtype} buttonaction={this.modularListEntryButtonAction} games={this.state.games}/> : null}

        {this.state.view === 'map' ? <ModularMap viewmode={this.props.listtype} games={this.state.games}/> : null}

      </View>

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
