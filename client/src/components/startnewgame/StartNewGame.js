import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ModularMap from '../reusable/ModularMap'
import ModularList from '../reusable/ModularList'

class StartNewGame extends Component {
  constructor(props) {
    super(props);


    this.state = {
      games: [],
      gameStartMarkers: [],
      showList: true,
      view: 'list'
    }

    this.modularListEntryButtonAction = this.modularListEntryButtonAction.bind(this);
  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 
    console.log(`im in JoinGame.js componentWillMount`)
    fetch('http://10.0.2.2:3000/api/game/getAllGames')
      .then( (response) => {
        console.log(`im in joinGame.js componentWillMount()`)
        console.log(`response is ${JSON.stringify(response)}`)
        return response.json()
      })
      .then( (games) => {
        console.log(`and data is now ${JSON.stringify(games)}`)
        this.setState({games})

        let gameStartLocations = games.map( (game) => {return {latitude: game.startLocation[0], longitude: game.startLocation[1]} })
        this.setState({ gameStartMarkers: gameStartLocations}, () => {
          console.log(`this.state.gameStartMarkers is ${JSON.stringify(this.state.gameStartMarkers)}`)
        })

      }) 
  }  
  
  modularListEntryButtonAction(gamedata) {
    console.log('JoinGame: modularListEntryButtonAction pressed')
    console.log('gamedata: ', gamedata)
    Actions.lobby({gamedata: gamedata})
    // update redux store CURRENT GAME with gamedata

  }

  render() {
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
      <View>
        <Button title="Toggle View"
        onPress={() => {
          if (this.state.view === 'map') {
          this.setState({view: 'list'})
          } else {
          this.setState({view: 'map'})
          } 
        }}/>
        {this.state.view === 'list' ? <ModularList viewmode={this.props.listtype} buttonaction={this.modularListEntryButtonAction} data={this.state.games}/> : null}

        {this.state.view === 'map' ? <ModularMap entrytype={this.props.listtype} data={this.state.games}/> : null}

      </View>
    );
  }
}

export default StartNewGame;