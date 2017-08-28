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
  View
} from 'react-native';

import firebase from 'firebase';
import firebaseconfig from './config/firebaseconfig.js'

import Button from './src/components/Button'
import Card from './src/components/Card'
import CardSection from './src/components/CardSection'

import { Router, Scene } from 'react-native-router-flux';

import CreateGame from './components/CreateGame';
import Friends from './components/Friends';
import HomePage from './components/HomePage';
import JoinGame from './components/JoinGame';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import MyGames from './components/MyGames';
import Notifications from './components/Notifications';
import OtherUsers from './components/OtherUsers';
import Preferences from './components/Preferences';
import Profile from './components/Profile';
import StartGame from './components/StartGame';


export default class client extends Component {
  constructor() {
    super()
    this.dummyGet = this.dummyGet.bind(this)
    this.dummyPost = this.dummyPost.bind(this)
    this.state = {
      dummyData: '',
      user: ''
    }
  }


  componentWillMount() {
    console.log('index.android.js has loaded')

    firebase.initializeApp({
      apiKey: firebaseconfig.apiKey,
      authDomain: firebaseconfig.authDomain,
      databaseURL: firebaseconfig.databaseURL,
      projectId: firebaseconfig.projectId,
      storageBucket: firebaseconfig.storageBucket,
      messagingSenderId: firebaseconfig.messagingSenderId
    })
  }

  dummyGet() {
    console.log(`in dummyGet()`)
    fetch('http://10.0.2.2:3000/api/images/getImages')
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

    fetch('http://10.0.2.2:3000/api/images/postImages', {
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

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login"
            component={Login}
            title="Login Page"
            initial
          />

          <Scene key="homepage"
            component={HomePage}
            title="Home Page"
          />

          <Scene key="games" tabs={true}>
            <Scene key="startgame"
              component={StartGame}
              title="Start A Game"
            />
            <Scene key="joingame"
              component={JoinGame}
              title="Join a Game"
            />
            <Scene key="leaderboard"
              component={Leaderboard}
              title="Leaderboard"
            />
          </Scene>

          <Scene key="mygames"
            component={MyGames}
            title="My Games"
          />

          <Scene key="creategame"
            component={CreateGame}
            title="Create Game"
          />

          <Scene key="leaderboard"
            component={Leaderboard}
            title="Leaderboard"
          />

          <Scene key="profilestats" tabs={true}>
            <Scene
              key="profile"
              component={Profile}
              title="Profile"
            />
            <Scene
              key="friends"
              component={Friends}
              title="Friends"
            />
            <Scene
              key="otherusers"
              component={OtherUsers}
              title="Other Users"
            />
          </Scene>

          <Scene key="preferences"
            component={Preferences}
            title="Home Page"
          />

          <Scene key="notifications"
            component={Notifications}
            title="Notifications"
          />

        </Scene>
      </Router>
      // <Card>
      //   <CardSection>
      //     <Button onPress={this.dummyGet}>
      //       Test GET!
      //     </Button>
      //   </CardSection>

      //   <CardSection>
      //       <Text>GET response is: {JSON.stringify(this.state.dummyData)}</Text>
      //   </CardSection>

      //   <CardSection>
      //     <Button onPress={this.dummyPost}>
      //       Test POST!
      //     </Button>
      //   </CardSection>

      //   <CardSection>
      //       <Text>POST response is: {JSON.stringify(this.state.dummyData)}</Text>
      //   </CardSection>
      // </Card>
    );
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
