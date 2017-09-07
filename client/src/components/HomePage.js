import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import homepageBackground from '../media/12-09-17-imavex-scavenger-hunt.jpg'

import LoginForm from './login/LoginForm'
import firebase from 'firebase'
import config from '../../config/config.js'


// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {userLoggedIn} from '../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('HomePage: Redux Store: ', state)
  return {
    userIdentity: state.client.userIdentity,
    userOwnedGames: state.client.userOwnedGames,
    userFriendList: state.client.userFriendList,
    userCurrentLocation: state.client.userCurrentLocation,
    userIsInGame: state.client.userIsInGame,
    userCurrentGame: state.client.userCurrentGame,
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({userLoggedIn}, dispatch)
}




class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dummyData: '',
      user: null
    }
    this.authSetUser = this.authSetUser.bind(this)
  }

  componentWillMount() {
  
    firebase.initializeApp({
      apiKey: config.firebase.apiKey,
      authDomain: config.firebase.authDomain,
      databaseURL: config.firebase.databaseURL,
      projectId: config.firebase.projectId,
      storageBucket: config.firebase.storageBucket,
      messagingSenderId: config.firebase.messagingSenderId
    })
  }

  authSetUser(){
    console.log('HomePage: setting user:', firebase.auth().currentUser)
    this.props.userLoggedIn(firebase.auth().currentUser.providerData[0])
    this.setState({user: firebase.auth().currentUser})
    
  }

  render () {
    console.log('HomePage: this.state.user:', this.state.user)
    return (
      <View style={styles.container}>
        {!this.state.user ? 
        
        <View style={styles.container}>
          <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../media/12-09-17-imavex-scavenger-hunt.jpg') } />
          <LoginForm user={this.state.user} setusermethod={this.authSetUser}/> 
        </View>
        
        :

        <View style={styles.container}>
          <View>
          <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../media/12-09-17-imavex-scavenger-hunt.jpg') } />
          </View>
          <View style={styles.containerMenu}>
          <Text style={styles.welcome}>
            GPScavenger
          </Text>
            <Text style={styles.text} onPress={() => Actions.joingame({listtype: 'join'})}>Join</Text>
            <Text style={styles.text} onPress={() => Actions.startnewgame({listtype: 'start'})}>Start New Game</Text>
            <Text style={styles.text} onPress={() => Actions.creategame()}>Create Game</Text>
            <Text style={styles.text} onPress={() => Actions.leaderboard()}>Leaderboard</Text>
            <Text style={styles.text} onPress={() => Actions.friends()}>Friends</Text>
          </View>
        </View>

        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6495ED',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  containerMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

// export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
