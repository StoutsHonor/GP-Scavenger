import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
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
  console.log('HomePage mapStateToProps: Redux Store: ', state)
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
    }
    this.authSetUser = this.authSetUser.bind(this)
  }

  componentWillMount() {
    console.log('HomePage willMount')
  }

  authSetUser(){
    console.log('HomePage: setting user:', firebase.auth().currentUser)
    this.props.userLoggedIn(firebase.auth().currentUser.providerData[0])
    
  }

  render () {
    return (
      <View style={styles.container}>
        {!this.props.userIdentity ? 
        
        <View style={styles.container}>
          <View>
          <Image style={{ flex:1, resizeMode: 'cover' }} source={ require('../media/12-09-17-imavex-scavenger-hunt.jpg') } />
          </View>
          <View style={styles.containerMenu}>
          <LoginForm user={this.state.user} setusermethod={this.authSetUser}/>
          </View>
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

            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'public', color: "#211b07"}} title='Join Game' 
              onPress={() => Actions.joingame({listtype: 'join'})}/>
            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'casino', color: "#211b07"}} title='Start New Game' 
              onPress={() => Actions.startnewgame({listtype: 'start'})}/>
            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'build', color: "#211b07"}} title='Create Game' 
              onPress={() => Actions.creategame()}/>
            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'poll', color: "#211b07"}} title=' Leaderboard' 
              onPress={() => Actions.leaderboard()}/>
            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'group', color: "#211b07"}} title='Friends' 
              onPress={() => Actions.friends()}/>
            <Button buttonStyle={styles.buttons} color="#211b07" fontWeight="bolder" fontSize={30} fontFamily="cursive" iconRight icon={{name: 'settings power', color: "#211b07"}} title=' Log Out' 
              onPress={() => {
              this.props.userLoggedIn({payload: {uid: null}})
              firebase.auth().signOut()
              console.log('userloggedOut')
              }} />
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
    fontSize: 40,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#6d5809',
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
  buttons: {
    backgroundColor: 'transparent',

  }
});

// export default HomePage;
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
