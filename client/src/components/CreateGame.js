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

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField, challengeAdded, submittedCreatedGame} from '../actions/index.js'

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
  return bindActionCreators({enteredField, challengeAdded, submittedCreatedGame}, dispatch)
}


class CreateGame extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Create a Game
        </Text>
        <FloatingButton/>
        <CreateList style={{}}/>
        <Button onPress={
          () => {this.props.challengeAdded('some challenge')}
        }
          title="Update Props"
          color="#841584"/>
          <Button onPress={() => {
            console.log('button pressed!')
            console.log('props: ', this.props)
          }}
          title="See Props"
          color="#841584"/>

        <Button onPress={() => {Actions.createGPSchallenge()} }
         title="Create only GPS challenge"
         color="#841584"/>

      </View>
    );
  }
}
// const CreateGame = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>
//         This is the Create Game Page
//       </Text>
//       <CreateList style={{}}/>
//       <Button onPress={() => {Actions.createGPSchallenge()} }
//         title="Create only GPS challenge"
//         color="#841584"/>
//       <Button onPress={() => {console.log('button pressed!')}}
//         title="Submit"
//         color="#841584"/>

//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00008B',
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
