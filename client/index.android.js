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
import Button from './src/components/Button'
import Card from './src/components/Card'
import CardSection from './src/components/CardSection'
import { Router, Scene } from 'react-native-router-flux';

import Draw from './components/Draw';
import Friends from './components/Friends';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Nearby from './components/Nearby';
import Notifications from './components/Notifications';
import OtherUsers from './components/OtherUsers';
import Photos from './components/Photos';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ViewFinder from './components/ViewFinder';

export default class client extends Component {
  constructor() {
    super()
    this.dummyGet = this.dummyGet.bind(this)
    this.dummyPost = this.dummyPost.bind(this)
    this.state = {
      dummyData: ''
    }
  }


  componentWillMount() {
    console.log('index.android.js has loaded')
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
          <Scene key="settings"
            component={Settings}
            title="Settings"
          />

          <Scene key="viewfindermain" tabs={true}>
            <Scene
              key="viewfinder"
              component={ViewFinder}
              title="View Finder"
            />
            <Scene
              key="nearby"
              component={Nearby}
              title="Nearby"
            />
          </Scene>

          <Scene key="photos"
            component={Photos}
            title="Photos"
          />
          <Scene key="profilemain" tabs={true}>
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
              key="other users"
              component={OtherUsers}
              title="Other Users"
            />
          </Scene>

          <Scene
            key="draw"
            component={Draw}
            title="Draw"
          />
          <Scene
            key="notifications"
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
