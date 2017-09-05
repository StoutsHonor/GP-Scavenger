import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import LeaderboardEntry from './LeaderboardEntry';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import config from '../../../config/config';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    return fetch(`${config.localhost}/api/user/findAllUserPoints/`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({data: data.sort( (a,b) => {
				a = a.rewardPoints;
				b = b.rewardPoints;
				return a > b ? -1 : a < b ? 1 : 0;
			})});
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <SideMenu menu={<HomePage/>}>
        <ScrollView>
          <Text>Hello Leaderboard</Text>
          {this.state.data.map( (player, index) => {
            return (
              <LeaderboardEntry player={player} key={index} index={index}/>
            )
          })}
        </ScrollView>
      </SideMenu>
    );
  }
}

export default Leaderboard;