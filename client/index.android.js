/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';


// Redux Imports for Initialization (Create Store)
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import allReducers from './src/reducers/index.js';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);



// import firebase from 'firebase'
// import LoginForm from './src/components/login/LoginForm'

import config from './config/config.js'


// import Button from './src/components/Button'
// import Card from './src/components/Card'
// import CardSection from './src/components/CardSection'

import { Router, Scene } from 'react-native-router-flux';

// import MyCamera from './src/components/MyCamera';
// import ChallengeList from './src/components/ChallengeList';
// import ChallengeQuestion from './src/components/ChallengeQuestion';
import Chat from './src/components/Chat';
// import CongratsPage from './src/components/CongratsPage';
// import GameLog from './src/components/GameLog';
// import FailedPage from './src/components/FailedPage';
// import GPSChallenge from './src/components/GPSChallenge';



// import MyGames from './src/components/MyGames';
// import Notifications from './src/components/Notifications';
// import OtherUsers from './src/components/OtherUsers';
// import Preferences from './src/components/Preferences';
// import Profile from './src/components/Profile';
// import StartGame from './src/components/StartGame';
// import Task from './src/components/Task';
// import DemoGPSGame from './src/components/DemoGPSGame';



// refactoring:

import CurrentChallenge from './src/components/playgame/CurrentChallenge'
import ChallengeList from './src/components/playgame/ChallengeList'

import HomePage from './src/components/HomePage';
import Leaderboard from './src/components/leaderboard/Leaderboard';
import StartNewGame from './src/components/startnewgame/StartNewGame'
import Friends from './src/components/friends/Friends';
import CreateGame from './src/components/creategame/CreateGame';
import CreateChallenge from './src/components/creategame/CreateChallenge';
import CreateGPSChallenge from './src/components/creategame/CreateGPSChallenge';
import Login from './src/components/login/Login';

import JoinGame from './src/components/joingame/JoinGame';
import Lobby from './src/components/playgame/Lobby';

import TitledInput from './src/components/reusable/TitledInput'
import ModularList from './src/components/reusable/ModularList'
import ModularMap from './src/components/reusable/ModularMap'

export default class client extends Component {
  constructor() {
    super()
    this.dummyGet = this.dummyGet.bind(this)
    this.dummyPost = this.dummyPost.bind(this)
    this.state = {
      dummyData: '',
      user: null
    }
    
    console.disableYellowBox = true;
    this.authSetUser = this.authSetUser.bind(this)
  }


  componentWillMount() {
    console.log('index.android.js has loaded')

    // firebase.initializeApp({
    //   apiKey: config.firebase.apiKey,
    //   authDomain: config.firebase.authDomain,
    //   databaseURL: config.firebase.databaseURL,
    //   projectId: config.firebase.projectId,
    //   storageBucket: config.firebase.storageBucket,
    //   messagingSenderId: config.firebase.messagingSenderId
    // })
  }

  dummyGet() {
    console.log(`in dummyGet()`)
    fetch(`${config.localhost}/api/images/getImages`)
      .then( (response) => {
        console.log('whoooosh') 
        console.log(`${JSON.stringify(response)}`)
        let app = this
        this.setState({ dummyData: response }, () => { console.log(`state is now ${JSON.stringify(this.state)}`)})
      })
  }

  dummyPost() {
    console.log(`in dummyPost()`)

    var formData = new FormData()
    formData.append('jenFirstParm', 'blahvalue1')
    formData.append('jenSecondParam', 'blahvalue2')

    fetch(`${config.localhost}/api/images/postImages`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "jenFirstParm": 'blahvalue1',
        "jensecondParam": 'blahvalue2'
      })
    })
      .then( (response) => {
        console.log('whoooosh') 
        console.log(`${JSON.stringify(response)}`)
        let app = this
        this.setState({ dummyData: response }, () => { console.log(`state is now ${JSON.stringify(this.state)}`)})
      })
  }

  authSetUser(){
    this.setState({user: firebase.auth().currentUser})
    .then(console.log('Current user: ', this.state.user))
    
  }

  render() {

    // if (!this.state.user) {
    //   return (
    //     <LoginForm user={this.state.user} setusermethod={this.authSetUser}/>
    //   )
    // } else {

    return (
      <Provider store={createStoreWithMiddleware(allReducers)}>
        <Router>
          <Scene key="root">

            <Scene key="homepage"
              component={HomePage}
              title="Home Page"
              initial
            />



            <Scene key="joingame"
              component={JoinGame}
              title="Join Game"
            />

            <Scene key="startnewgame"
              component={StartNewGame}
              title="Start New Game"
            />

            <Scene key="lobby"
              component={Lobby}
              title="Game Lobby"
            />

            <Scene key="gameplay" tabs={true}
              hideNavBar={true}
            >
              <Scene key="Current Challenge"
                component={CurrentChallenge}
                title="Current"
                hideNavBar={true}
              />
              <Scene key="All Challenges"
                component={ChallengeList}
                title="All"
                hideNavBar={true}
              />
              <Scene key="Chat"
                component={Chat}
                title="Chat"
                hideNavBar={true}
              />
            </Scene>


            <Scene key="creategame"
              component={CreateGame}
              title="Create a Game"
            />

            <Scene key="leaderboard"
              component={Leaderboard}
              title="Leaderboard"
            />

            <Scene
                key="friends"
                component={Friends}
                title="Friends"
              />
              

              <Scene key="chat"
                component={Chat}
                title="Chat"
              />


            {/* <Scene key="preferences"
              component={Preferences}
              title="Home Page"
            /> */}

            {/* <Scene key="notifications"
              component={Notifications}
              title="Notifications"
            /> */}

            <Scene key="createChallenge"
              component={CreateChallenge}
              title="Create a Challenge"
            />

            <Scene key="createGPSchallenge"
            component={CreateGPSChallenge}
            title="Create GPS challenge"
            />


            {/* <Scene key="congratspage"
            component={CongratsPage}
            title="COMPLETED!!!"
            /> */}

            {/* <Scene key="failedpage"
              component={FailedPage}
              title="FAILED!!!"
              renderBackButton={()=>(null)}
            /> */}

          </Scene>
        </Router>
      </Provider>
    );
  // } // end of firebase
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
