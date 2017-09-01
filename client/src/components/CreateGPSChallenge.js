import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateList from './CreateList';
import Map from './Map'

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {startLocationSet, challengeLocationSet} from '../actions/index.js'

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
  return bindActionCreators({startLocationSet, challengeLocationSet}, dispatch)
}

class CreateGPSChallenge extends Component {
  constructor(props) {
    super(props)
    this.onMapMarkerSubmit = this.onMapMarkerSubmit.bind(this);
    this.state = {
      name: '',
      description: '',
      time_limit: '',
      mapMarker: {}
    }
  }

  onMapMarkerSubmit(location) {
    this.setState({ mapMarker: location }, () => {
      console.log(`this.state.mapMarker is ${JSON.stringify(this.state.mapMarker)}`)
    })
    this.props.challengeLocationSet(location);
    Alert.alert(
      '',
      'Location Set!',
      [
        {text: 'Dismiss', onPress: () => console.log('OK Pressed!')},
      ]
    )
  }

  render() {
    return(
      <View style={{padding:10}}>

        <Map onMarkerSubmit={this.onMapMarkerSubmit} />

        <Button onPress={() => {console.log('button pressed!')}}
          title="Finished Challenge"
          color="#841584"/>
      </View>
    )
  }

}

// export default CreateGPSChallenge
export default connect(mapStateToProps, mapDispatchToProps)(CreateGPSChallenge)