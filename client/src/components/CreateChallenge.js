import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import FloatingButton from './FloatingButton';
import TitledInput from './TitledInput';

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField, challengesUpdated, submittedCreatedGame} from '../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    createGameChallenges: state.create.createGameChallenges,
    createChallengeLocation: state.create.createChallengeLocation,
    createChallengeType: state.create.createChallengeType,
    createChallengeTitle: state.create.createChallengeTitle,
    createChallengeObjective: state.create.createChallengeObjective,
    createChallengeAnswer: state.create.createChallengeAnswer,
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enteredField, challengesUpdated}, dispatch)
}


class CreateChallenge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>

        <TitledInput
          label='Challenge Title'
          placeholder='Enter Here...'
          value={this.props.createChallengeTitle}
          onChangeText={(e) => {this.props.enteredField('createChallengeTitle', e)}}
        />

        <TitledInput
          label='Challenge Type'
          placeholder='Enter Here...'
          value={this.props.createChallengeType}
          onChangeText={(e) => {this.props.enteredField('createChallengeType', e)}}
        />

        <TitledInput
          label='Challenge Location'
          placeholder='Enter Here...'
          value={this.props.createChallengeLocation}
          onChangeText={(e) => {this.props.enteredField('createChallengeLocation', e)}}
        />

        <Button onPress={() => {Actions.createGPSchallenge()}}
         title="Set Location"
         color="#841584"/>

        <Button onPress={() => {console.log('clear location function placeholder')}}
        title="Clear Location"
        color="#841584"/>

        <TitledInput
          label='Challenge Objective'
          placeholder='Enter Here...'
          value={this.props.createChallengeObjective}
          onChangeText={(e) => {this.props.enteredField('createChallengeObjective', e)}}
        />
        <TitledInput
          label='Challenge Answer'
          placeholder='Enter Here...'
          value={this.props.createChallengeAnswer}
          onChangeText={(e) => {this.props.enteredField('createChallengeAnswer', e)}}
        />
        

        <Button onPress={() => {
          console.log('props: ', this.props)
        }}
        title="See Props"
        color="#841584"/>

        <Button onPress={() => {
          let temp = this.props.createGameChallenges
          temp.push({
            ChallengeLocation: this.props.createChallengeLocation,
            ChallengeType: this.props.createChallengeType,
            ChallengeTitle: this.props.createChallengeTitle,
            ChallengeObjective: this.props.createChallengeObjective,
            ChallengeAnswer: this.props.createChallengeAnswer
          })
          this.props.challengesUpdated(temp);
        }}
        title="Submit Challenge"
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
    backgroundColor: '#6ea1f4',
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateChallenge)
