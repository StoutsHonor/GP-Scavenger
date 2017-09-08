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
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    currentGameTeam1: state.play.currentGameTeam1,
    currentGameTeam2: state.play.currentGameTeam2
  }
}
// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updatedTeams}, dispatch)
}


class Chat extends Component {
    constructor(props) {
      super(props);
      this.roomName = 'chat' + this.props.gameId;
      this.onReceivedMessage = this.onReceivedMessage.bind(this);
      this.onSend = this.onSend.bind(this);
      this._storeMessages = this._storeMessages.bind(this);
      this.parseJSONData = this.parseJSONData.bind(this);
      this.determinedTeam = this.determinedTeam.bind(this);
      this.parseUser = this.parseUser.bind(this);
      this.team = null;
      this.user = null;

      this.state = {
        messages: []
      };
    }

    componentWillMount() {
      this.parseUser();
    }

    componentDidMount() {
      this.socket = io(config.localhost);
      this.socket.emit('createRoom', this.roomName);
      this.socket.on('message', this.onReceivedMessage);

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

      this.determinedTeam();
      
    }

    determinedTeam() {
      for(let val of this.props.currentGameTeam1) {
        if(val === this.props.userId) {
          this.team = 'team1';
          return;
        }
      }
      this.team = 'team2';
    }

    parseUser() {
      let pos = this.props.userId.indexOf('@');
      let name = this.props.userId.substring(0, pos);
      this.user = { 
        _id: (Math.round(Math.random() * 1000000) || -1),
        name: name
      };
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
      messages[0].team = this.team;
      let obj = {};
      obj.method = 'post';
      obj.headers = {"Content-type": "application/json"};
      obj.body = JSON.stringify(messages[0]);

      fetch(`${config.localhost}/api/chat/addChat`, obj)
      .then((response) => {
        return response;      
      })
      .then((data) => {
        console.log('Response is ddddddddd ', messages[0]);
        console.log('Response is aaaaaaaaaaaaa ', messages);
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
              user={this.user}
          />
      );
    }

    _storeMessages(messages) {   
      if(messages.text !== undefined && messages.text.length >= 6 && messages.text.substring(0,5) === '@team' && messages.team === this.team) {
        messages.text = messages.text.substring(6);
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages)
          };
        });
      } else if(messages.text !== undefined && messages.text.substring(0,5) !== '@team') {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages)
          };
        });
      }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat)
