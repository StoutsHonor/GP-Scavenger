import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Map from './Map'
import JoinGameList from './JoinGameList'
import CreateList from './CreateList'

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.toggleMode = this.toggleMode.bind(this);

    this.state = {
      games: [],
      gameStartMarkers: [],
      showList: true
    }
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
  
  toggleMode() {
    console.log(`im in toggleMode`)
    this.setState({ showList: !this.state.showList })
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
        { this.state.showList === true ? <JoinGameList style={{}} /> : <Map markers={this.state.gameStartMarkers}/> }
      <View style={styles.container}>
      
        <Text style={styles.welcome}>
          Join a Game!!
        </Text>
      </View>
      <Button
          onPress={this.toggleMode}
          title="Toggle Mode"
          color="#841584"
          accessibilityLabel="Toggle Mode"
        />
      </View>
    );
  }
}

export default JoinGame;