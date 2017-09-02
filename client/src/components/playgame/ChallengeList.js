import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges } from '../../actions/index';
import { getAllUsersGames } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    //gameId: state.app.currentGame,
    //challenges: state.play.allChallenges
  }
}

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 3,
    }
  }


  render() {
    return (
        <View style={styles.container}>
          <Text>Hello Challenge List</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808000'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);