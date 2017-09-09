import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Picker,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';
import CreateList from './CreateList';
import FloatingButton from '../reusable/FloatingButton';
import TitledInput from '../reusable/TitledInput';
import { Container, Header, List, ListItem, Content, Separator, Form, Item, Input, Tab, Tabs, Icon } from 'native-base'

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField, challengesUpdated, submittedCreatedGame, challengeLocationSet} from '../../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    createGameChallenges: state.create.createGameChallenges,
    createChallengeLocation: state.create.createChallengeLocation,
    createChallengeType: state.create.createChallengeType,
    createChallengeTitle: state.create.createChallengeTitle,
    createChallengeDescription: state.create.createChallengeDescription,
    createChallengeObjective: state.create.createChallengeObjective,
    createChallengeAnswer: state.create.createChallengeAnswer,
    createChallengeTimeLimit: state.create.createTimeLimit,
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enteredField, challengesUpdated, challengeLocationSet}, dispatch)
}


class CreateChallenge extends Component {
  constructor(props) {
    super(props)

    this.onSubmitChallenge = this.onSubmitChallenge.bind(this)
  }

  onSubmitChallenge() {
      if (!this.props.createChallengeTitle) {
        Alert.alert(
          'Error',
          'Please enter a title for the challenge!',
          [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
        )
      } else if (!this.props.createChallengeDescription) {
        Alert.alert(
          'Error',
          'Please enter a challenge description!',
          [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
        )
      } else if (!this.props.createChallengeType) {
        Alert.alert(
          'Error',
          'Please select a challenge type!',
          [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
        )
      } else {
        let temp = this.props.createGameChallenges
        temp.push({
          ChallengeLocation: this.props.createChallengeLocation,
          ChallengeType: this.props.createChallengeType,
          ChallengeTitle: this.props.createChallengeTitle,
          ChallengeObjective: this.props.createChallengeObjective,
          ChallengeAnswer: this.props.createChallengeAnswer,
          ChallengeDescription: this.props.createChallengeDescription
        })
        this.props.challengesUpdated(temp);


        Alert.alert(
          '',
          'Challenge Submitted!',
          [
            {text: 'Dismiss', onPress: () => console.log('OK Pressed!')},
          ]
        )
      }
    }

  render() {
    return (
    <SideMenu menu={<HomePage/>}>
      <Container style={styles.container}>
        <Content>

          <View>
            <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../../media/createGameBackground2.png') } />
          </View>

          <Form style={styles.containerMenu}>
            <Item>
              <Text style={styles.labelText}>Challenge Title: </Text>
              <Input placeholder="Enter Here.." value={this.props.createChallengeTitle} onChangeText={(e) => {this.props.enteredField('createChallengeTitle', e)}} style={styles.inputText}/>
            </Item>

            <Item>
              <Text style={styles.labelText}>Challenge Description: </Text>
              <Input placeholder="Enter Here.." value={this.props.createChallengeDescription} onChangeText={(e) => {this.props.enteredField('createChallengeDescription', e)}} style={styles.inputText}/>
            </Item>

            <Item>
              <Text>Challenge Type:</Text>
              <Picker prompt='Select a Challenge Type' selectedValue={this.props.createChallengeType} onValueChange={(itemValue, itemIndex) => {this.props.enteredField('createChallengeType', itemValue)}} style={{height: 40, width: 175}} >
                <Picker.Item label='Select..' value={null} />
                <Picker.Item label='GPS Challenge' value='GPSChallenge' />
                <Picker.Item label='Riddle Question' value='riddleQuestion' />
                <Picker.Item label='Logic Puzzle' value='logicQuestion' />
                <Picker.Item label='Identify Photo' value='photoQuestion' />
                <Picker.Item label='Idenfity Video' value='videoQuestion' />
                <Picker.Item label='Take Photo/Video' value='cameraPrompt' />
              </Picker>
            </Item>
            

            <Item>
            {
              (this.props.createChallengeType === 'GPSChallenge') ?

              <View>
              <Text>{'Location: '}{this.props.createChallengeLocation ? 'Latitude: ' + JSON.stringify(this.props.createChallengeLocation.latitude.toFixed(2)) + ', Longitude: ' + JSON.stringify(this.props.createChallengeLocation.longitude.toFixed(2)) : '(No Location Set)'}</Text>

              <Button onPress={() => {Actions.createMap({setting: 'createChallengeLoc'})}}
              title="Set Location"
              color="#841584"/>

              <Button onPress={() => {this.props.challengeLocationSet(null)}}
              title="Clear Location"
              color="#841584"/>
              </View>

              : null
            }
            </Item>

            <Item>
            {
              (this.props.createChallengeType === 'GPSChallenge' || this.props.createChallengeType === null) ? null : 
              <TitledInput
                label='Challenge Question / Objective / Prompt'
                placeholder='Enter Here...'
                value={this.props.createChallengeObjective}
                onChangeText={(e) => {this.props.enteredField('createChallengeObjective', e)}}
              />
            }
            </Item>

            <Item>
            {
              (this.props.createChallengeType === 'cameraPrompt' || this.props.createChallengeType === 'GPSChallenge' || this.props.createChallengeType === null) ? null : 

              <TitledInput
                label='Challenge Answer'
                placeholder='Enter Here...'
                value={this.props.createChallengeAnswer}
                onChangeText={(e) => {this.props.enteredField('createChallengeAnswer', e)}}
              />
            }
            </Item>



            <Item>
            <Button onPress={() => {
              console.log('props: ', this.props)
            }}
            title="See Props"
            color="#841584"/>

            <Button onPress={() => {this.onSubmitChallenge()}}
              title="Submit Challenge"
              color="#841584"/>
            </Item>




          </Form>




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
    backgroundColor: '#6ea1f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  labelText: {
    fontSize: 20,
    color: '#fff5ea',
    fontWeight: 'bold',
  },
  inputText: {
    marginTop: 3,
    fontSize: 18,
    color: '#fff5ea',
  },
  listItemText: {
    fontSize: 18,
    color: '#fff5ea',
  },
  containerMenu: {
    flex: 1,
    position: 'absolute',
  },
});

// export default CreateGame;

// Redux Style export default:
export default connect(mapStateToProps, mapDispatchToProps)(CreateChallenge)
