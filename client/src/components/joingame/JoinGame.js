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
import {getGameId} from '../../actions/index.js'

import ModularMap from '../reusable/ModularMap'
import ModularList from '../reusable/ModularList'
import config from '../../../config/config'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getGameId }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
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
      view: 'list'
    }

    this.modularListEntryButtonAction = this.modularListEntryButtonAction.bind(this)
  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 

    console.log(`JoinGame.js - componentWillMount()`)

    fetch(`${config.localhost}/api/game/getAllGames`)
      .then( (response) => response.json())
      .then( (data) => {
        console.log(data, 'just fetched')
        this.setState({games: data})

        // let gameStartLocations = games.map( (game) => {return {latitude: game.startLocation[0], longitude: game.startLocation[1]} })
        // this.setState({ gameStartMarkers: gameStartLocations}, () => {
        //   console.log(`this.state.gameStartMarkers is ${JSON.stringify(this.state.gameStartMarkers)}`)
        // })

      }) 
  }  
  


  modularListEntryButtonAction(gamedata) {
    console.log('JoinGame: modularListEntryButtonAction pressed')
    console.log('gamedata: ', gamedata)
    Actions.lobby({gamedata: gamedata})
    // update redux store CURRENT GAME with gamedata
    this.props.getGameId(gamedata.id);
  }

  render() {
    console.log(`JoinGame - render(): this.state.games ${JSON.stringify(this.state.games)}`);
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5F9EA0',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
      },
    });

    return (
      <ScrollView>
        <Button title="Toggle View"
        onPress={() => {
          if (this.state.view === 'map') {
          this.setState({view: 'list'})
          } else {
          this.setState({view: 'map'})
          } 
        }}/>
        {this.state.view === 'list' ? <ModularList viewmode={this.props.listtype} buttonaction={this.modularListEntryButtonAction} data={this.state.games}/> : null}

        {this.state.view === 'map' ? <ModularMap viewmode={this.props.listtype} data={this.state.games}/> : null}

      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);