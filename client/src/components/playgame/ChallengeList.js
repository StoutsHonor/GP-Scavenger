import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  Button,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex } from '../../actions/index';
import ChallengeListEntry from './ChallengeListEntry';

const window = Dimensions.get('window');

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex,
    gamePoints: state.play.gamePoints
  }
}

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.showChallengeDetails = this.showChallengeDetails.bind(this);
    this.state = {
      showChallengeModal: false
    };
  }

  showChallengeDetails(index) {
    console.log('trying to show Modal')
    this.setState({showChallengeModal: true});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{this.props.gamePoints} Points Earned So Far</Text>
        {this.props.challenges ? this.props.challenges.map((challenge, i) => {
          return <ChallengeListEntry challenge={challenge} challengeIndex={i} index={this.props.index} key={i} showChallengeDetails={this.showChallengeDetails}/>
        }) : null}

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.showChallengeModal}
          presentationStyle={"overFullScreen"}
          >
          
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.4)'}}>
            <TouchableHighlight onPress={() => this.setState({showChallengeModal: false})}>
            <View style={{padding: 10, width: window.width*.7, backgroundColor: '#FFF', borderRadius: 5, borderColor: '#000', borderStyle: 'solid', borderWidth: 1, elevation: 25}}>
              <Text>Question Here</Text>
              <Text>Answer Here</Text>
            </View>
            </TouchableHighlight>
            </View>
          
        </Modal>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#87CEFA'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);