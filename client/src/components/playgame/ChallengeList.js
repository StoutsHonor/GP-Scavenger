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
      <Container style={styles.container}>
        <View style={styles.points}>
          <Text style={styles.pointText}>Points: </Text>
          <Text style={styles.gamePoints}>{this.props.gamePoints}</Text>
        </View>

        <Content style={styles.content}>
          <List listNoteColor={'#59270a'}>
            {this.props.challenges ? this.props.challenges.map((challenge, i) => {
              return <ChallengeListEntry challenge={challenge} challengeIndex={i} index={this.props.index} key={i} showChallengeDetails={this.showChallengeDetails}/>
            }) : null}
          </List>
        </Content>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  points: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent:'center',
    top: 10
  },
  pointText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black'
  },
  gamePoints: {
    fontSize: 25,
    color: 'green'
  },
  content: {
    marginTop: -500,
    width: window.width*.96
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);