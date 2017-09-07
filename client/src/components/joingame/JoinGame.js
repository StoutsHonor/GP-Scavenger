import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getGameId, getGameInfo} from '../../actions/index.js';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';

import ModularMap from '../reusable/ModularMap'
import ModularList from '../reusable/ModularList'
import config from '../../../config/config'
import { Container, Content } from 'native-base';
import LoadingPage from '../reusable/LoadingPage'


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getGameId, getGameInfo }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges
  }
}

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      gameStartMarkers: [],
      showList: true,
      view: 'list',
      loading: true
    }

    this.modularListEntryButtonAction = this.modularListEntryButtonAction.bind(this)
    this.onJoinGameListEntryClick = this.onJoinGameListEntryClick.bind(this)
  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 

    //console.log(`JoinGame.js - componentWillMount()`)

    fetch(`${config.localhost}/api/game/getAllGames`)
      .then( (response) => response.json())
      .then( (data) => {
        //console.log(data, 'just fetched')
        this.setState({games: data, loading: false})

        // let gameStartLocations = games.map( (game) => {return {latitude: game.startLocation[0], longitude: game.startLocation[1]} })
        // this.setState({ gameStartMarkers: gameStartLocations}, () => {
        //   console.log(`this.state.gameStartMarkers is ${JSON.stringify(this.state.gameStartMarkers)}`)
        // })

      }) 

      // this.setState({games: [{
      //   "name": "WALKING GPS TEST",
      //   "userId": 1,
      //   "duration": 120,
      //   "private": false,
      //   "maxPlayers": 4,
      //   "rewardPoints": 3900,
      //   "startLocation": [33.976025, -118.391093]
      // }]}, () => { console.log(`seeded walking GPS test in JoinGame.js`)})

  }  
  


  modularListEntryButtonAction(gamedata) {
    //console.log('JoinGame: modularListEntryButtonAction pressed')
    //console.log('gamedata: ', gamedata)
    Actions.lobby({gamedata: gamedata})
    // update redux store CURRENT GAME with gamedata
    this.props.getGameId(gamedata.id);
    this.props.getGameInfo(gamedata);
  }

  onJoinGameListEntryClick(game) {
    console.log(`JoinGame - onJoinGameListEntryClick()`)
    Actions.gameprofile({game, typeOfAction: 'join game', buttonaction: this.modularListEntryButtonAction})
  }

  render() {
    //console.log(`JoinGame - render(): this.state.games ${JSON.stringify(this.state.games)}`);
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#5F9EA0',
      },
      content: {
        
      }
    });

    return (
      <SideMenu menu={<HomePage/>}>
      {this.state.loading ? <LoadingPage/> :
        <Container style={styles.container}>
          <Content style={styles.content}>
          <Button title="Toggle View"
          onPress={() => {
            if (this.state.view === 'map') {
            this.setState({view: 'list'})
            } else {
            this.setState({view: 'map'})
            } 
          }}/>
          {this.state.view === 'map' ? <ModularMap viewmode={this.props.listtype} data={this.state.games}  /> : null}
          {this.state.view === 'list' ? <ModularList viewmode={this.props.listtype} buttonaction={this.modularListEntryButtonAction} data={this.state.games} listentryclick={this.onJoinGameListEntryClick}/> : null}
          </Content>
        </Container>
      }
      </SideMenu>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);