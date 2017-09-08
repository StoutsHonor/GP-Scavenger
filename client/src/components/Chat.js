import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

import config from '../../config/config'


// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {updatedTeams} from '../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    currentGameTeam1: state.play.currentGameTeam1,
    currentGameTeam2: state.play.currentGameTeam2
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updatedTeams}, dispatch)
}



//const USER_ID = '@userId';
const user = { _id: Math.round(Math.random() * 1000000) || -1 };

class Chat extends Component {
    constructor(props) {
      super(props);

      this.state = {
        messages: [],
        userId: null
      };
      //this.determineUser = this.determineUser.bind(this);
      this.onReceivedMessage = this.onReceivedMessage.bind(this);
      this.onSend = this.onSend.bind(this);
      this._storeMessages = this._storeMessages.bind(this);
      this.parseJSONData = this.parseJSONData.bind(this);
      this.roomName = 'room1';
      
      //this.determineUser();
    }

    componentDidMount() {
      this.socket = io(config.localhost);
      this.socket.emit('createRoom', 'room1');
      this.socket.on('message', this.onReceivedMessage);
      console.log('Component did mount entered');

    
      fetch(`${config.localhost}/api/chat/findChat/?roomName=${this.roomName}`)
      .then((response) => {
        return response.json();
       
      }).
      then((messages) => {
        this.parseJSONData(messages);
        this._storeMessages(messages.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
    }

    parseJSONData(array){
      for(let val of array) {
        val.user = {_id: val.user_id};
      }
    }
    
    onReceivedMessage(messages=[]) {
      console.log('Message was recieved', messages);
      this._storeMessages(messages);
    }

    onSend(messages=[]) {
      messages[0].roomName = this.roomName;
      messages[0].image = '';
      let obj = {};
      obj.method = 'post';
      obj.headers = {"Content-type": "application/json"};
      obj.body = JSON.stringify(messages[0]);
      console.log('In On send posting');
      fetch(`${config.localhost}/api/chat/addChat`, obj)
      .then((response) => {
        return response.json();     
      })
      .then((data) => {
        console.log('Data is ' ,  data);
        this.socket.emit('message', messages[0]);
        this._storeMessages(messages);
      })
      .catch((err) => {
        console.error(err);
      });


     
     
    }

    render() {
      
      return (
        
          <GiftedChat
              messages={this.state.messages}
              onSend={this.onSend}
              user={user}
          />
      );
    }

    _storeMessages(messages) {   
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages)
        };
      });
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat)
