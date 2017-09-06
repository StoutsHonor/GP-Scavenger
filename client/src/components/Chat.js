import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

import config from '../../config/config'

//const USER_ID = '@userId';
const user = { _id: Math.round(Math.random() * 1000000) || -1 };

export default class Chat extends Component {
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


    // determineUser() {
    //   AsyncStorage.getItem(USER_ID)
    //     .then((userId) => {
    //       // If there isn't a stored userId, then fetch one from the server.
    //       if (!userId) {
    //         this.socket.emit('userJoined', null);
    //         this.socket.on('userJoined', (userId) => {
    //           AsyncStorage.setItem(USER_ID, userId);
    //           this.setState({ userId });
    //         });
    //       } else {
    //         this.socket.emit('userJoined', userId);
    //         this.setState({ userId });
    //       }
    //     })
    //     .catch((e) => alert(e));
    // }
  

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