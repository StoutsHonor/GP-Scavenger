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
import { Header, Container, List, ListItem, Content, Separator } from 'native-base';
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
        <Container>
          <Content>
            <List listNoteColor={'#59270a'}>
        {this.props.challenges ? this.props.challenges.map((challenge, i) => {
          return <ChallengeListEntry challenge={challenge} challengeIndex={i} index={this.props.index} key={i} showChallengeDetails={this.showChallengeDetails}/>
        }) : null}
            </List>
          </Content>
        </Container>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#e9cfa3'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);