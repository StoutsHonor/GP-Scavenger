import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  Modal,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getGameId, getGameInfo} from '../../actions/index.js'
import ModularMap from '../reusable/ModularMap';
import ModularList from '../reusable/ModularList';
import config from '../../../config/config';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';
import LoadingPage from '../reusable/LoadingPage'
import io from "socket.io-client";

const window = Dimensions.get('window');

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

class StartNewGame extends Component {
  constructor(props) {
    super(props);


    this.state = {
      games: [],
      gameStartMarkers: [],
      showList: true,
      view: 'list',
      loading: true,
      inputLobbyNameModal: false,
      lobbyName: '',
      selectedGame: null
    }
    this.socket = io(config.localhost);
    this.modularListEntryButtonAction = this.modularListEntryButtonAction.bind(this);
    this.onStartNewGameListEntryClick = this.onStartNewGameListEntryClick.bind(this);
    this.onInputLobbyName = this.onInputLobbyName.bind(this);
  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into 

    console.log(`StartNewGame.js - componentWillMount()`)

    fetch(`${config.localhost}/api/game/getAllGames`)
      .then( (response) => response.json())
      .then( (data) => {
        console.log(data, 'just fetched')
        this.setState({games: data, loading: false})

        // let gameStartLocations = games.map( (game) => {return {latitude: game.startLocation[0], longitude: game.startLocation[1]} })
        // this.setState({ gameStartMarkers: gameStartLocations}, () => {
        //   console.log(`this.state.gameStartMarkers is ${JSON.stringify(this.state.gameStartMarkers)}`)
        // })

      }) 
  }  
  
  modularListEntryButtonAction(gamedata) {
    this.setState({ inputLobbyNameModal: true, selectedGame: gamedata })
    // console.log('StartNewGame: modularListEntryButtonAction pressed')
    // console.log('gamedata: ', gamedata)
    // Actions.lobby({gamedata: gamedata})
    // // update redux store CURRENT GAME with gamedata
    // this.props.getGameId(gamedata.id);
    // this.props.getGameInfo(gamedata);
  }

  onInputLobbyName() {
    const gamedata = Object.assign({room: this.state.lobbyName, createdBy: this.props.userId, roomId: "lobby-" + this.state.lobbyName + "-" + this.props.userId + '-' + Date.now() }, this.state.selectedGame)
    console.log(`StartNewGame - onInputLobbyName() - gamedata is ${JSON.stringify(gamedata)}`)
    this.socket.emit("startedANewRoom", gamedata);    
    Actions.lobby({ gamedata })
    this.props.getGameId(this.state.selectedGame.id);
    this.props.getGameInfo(gamedata);
    this.setState({inputLobbyNameModal: false});
    
  }

  onStartNewGameListEntryClick(game, distanceAway) {
    console.log(`StartNewGame - onJoinGameListEntryClick()`)
    Actions.gameprofile({game, typeOfAction: 'start game', buttonaction: this.modularListEntryButtonAction, distanceAway: distanceAway })

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
      <SideMenu menu={<HomePage/>}>

      {this.state.loading ? <LoadingPage/> : 
        <ScrollView>
          <Button title="Toggle View"
          onPress={() => {
            if (this.state.view === 'map') {
            this.setState({view: 'list'})
            } else {
            this.setState({view: 'map'})
            } 
          }}/>
          {this.state.view === 'list' ? <ModularList viewmode={this.props.listtype} buttonaction={this.modularListEntryButtonAction} data={this.state.games} listentryclick={this.onStartNewGameListEntryClick} /> : null}

          {this.state.view === 'map' ? <ModularMap viewmode={this.props.listtype} entrytype={this.props.listtype} data={this.state.games} buttonaction={this.modularListEntryButtonAction} hideMapSubmit={true}/> : null}

        </ScrollView>
      }
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.inputLobbyNameModal}
          onRequestClose={() => {this.setState({inputLobbyNameModal: false})}}
          presentationStyle={"overFullScreen"}
          >
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.4)'}}>
          <View style={{padding: 10, top: window.height*.40, width: window.width*.7, backgroundColor: '#FFF', borderRadius: 5, borderColor: '#000', borderStyle: 'solid', borderWidth: 1, elevation: 25}}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Lobby Name..."
            onChangeText={(lobbyName) => this.setState({lobbyName})}
          />
          <Button
            onPress={this.onInputLobbyName}
            title="OK"
            color="#841584"
          />
          </View>
          </View>
        </Modal>
      </View>

      </SideMenu>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5F9EA0',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(StartNewGame);