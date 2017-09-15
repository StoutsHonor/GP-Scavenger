import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllGameChallenges,
  setGamePoints,
  updatedTeams
} from "../../actions/index.js";
import config from "../../../config/config";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getAllGameChallenges, setGamePoints, updatedTeams },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    index: state.play.currentChallengeIndex,
    challenges: state.play.allChallenges,
    gamePoints: state.play.gamePoints,
    currentGameTeam1: state.play.currentGameTeam1,
    currentGameTeam2: state.play.currentGameTeam2
  };
};

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onReceivedJoinedLobby = this.onReceivedJoinedLobby.bind(this);
    this.updateOtherPlayer = this.updateOtherPlayer.bind(this);
    this.getOtherUserName = this.getOtherUserName.bind(this);
    this.startGame = this.startGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.removePlayer = this.removePlayer.bind(this);

    this.roomName = this.props.gamedata.roomId;

    this.state = {
      messages: [],
      totalPlayer: 0,
      user: {
        _id: 1,
        name: this.props.userId
      },
      team1: [],
      team2: [],
      styles: {},
      showStart: false
    };
  }

  componentWillMount() {
    //make a call to the database for games
    //load the markers into
    //console.log(`im in Lobby.js componentWillMount`)
    console.log(`this.props.gameId is ${this.props.gameId}`)
    fetch(
      `${config.localhost}/api/challenge/findChallengeByGameId/?gameId=${this.props.gameId}`
    )
      .then(response => response.json())
      .then(data => {
        this.props.getAllGameChallenges(data.sort( (a,b) => {
          a = a.sequence;
          b = b.sequence;
          return a < b ? -1 : a > b ? 1 : 0;
        }));
        console.log(data, 'data fetched')
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({ styles });
  }

  componentDidMount() {
    this.socket = io(config.localhost);
    this.socket.emit("createRoom", this.props.gamedata.roomId);
    this.socket.on("joinLobby", this.onReceivedJoinedLobby);
    this.socket.on("message", this.onReceivedMessage);
    this.socket.on("updateOtherPlayer", this.updateOtherPlayer);
    this.socket.on("getOtherUserName", this.getOtherUserName);
    this.socket.on("startGame", this.startGame);
    this.socket.on("removePlayer", this.removePlayer);
  }

  onReceivedJoinedLobby() {
    if (this.state.totalPlayer > 8) return;
    this.state.totalPlayer++;
    let team;
    let teamName;

    if (this.state.totalPlayer === 1) {
      if (this.state.totalPlayer % 2 !== 0) {
        team = this.state.team1;
        team.push(this.props.userId);
        teamName = "team1";
      } else {
        team = this.state.team2;
        team.push(this.props.userId);
        teamName = "team2";
      }

      this.setState({
        [teamName]: team
      });
    }

    this.setState({
      totalPlayer: this.state.totalPlayer
    });

    let obj = {};
    obj.roomName = this.roomName;
    obj.totalPlayer = this.state.totalPlayer;
    obj.team1 = this.state.team1;
    obj.team2 = this.state.team2;
    obj.userId = this.props.userId;

    this.socket.emit("getOtherUserName", obj);
  }

  getOtherUserName(obj) {
    if (this.state.totalPlayer > obj.totalPlayer) {
      let team;
      let teamName;
      if (this.state.totalPlayer % 2 !== 0) {
        team = this.state.team1;
        team.push(obj.userId);
        teamName = "team1";
      } else {
        team = this.state.team2;
        team.push(obj.userId);
        teamName = "team2";
      }
      this.setState({
        [teamName]: team
      });

      let message = {};
      message.roomName = this.roomName;
      message.team1 = this.state.team1;
      message.team2 = this.state.team2;
      message.totalPlayer = this.state.totalPlayer;

      this.props.updatedTeams({
        team1: message.team1,
        team2: message.team2
      });

      this.socket.emit("updateOtherPlayer", message);
    }
  }

  updateOtherPlayer(message) {
    if (message.totalPlayer > this.state.totalPlayer) {
      console.log(
        "update other players tttttttttttttttttttt" + this.state.totalPlayer
      );
      if (this.state.totalPlayer === 1) {
        let id = message.totalPlayer % 2 === 0 ? 2 : 1;
        let user = {
          _id: id,
          name: this.props.userId
        };
        this.setState({
          user
        });
      }

      this.setState({
        team1: message.team1,
        team2: message.team2,
        totalPlayer: message.totalPlayer
      });

      this.props.updatedTeams({
        team1: message.team1,
        team2: message.team2
      });
    }

    if (this.state.totalPlayer >= 2) {
      this.setState({ showStart: true });
    }
  }

  onReceivedMessage(messages = []) {
    console.log("Message was recieved", messages);
    this._storeMessages(messages);
  }

  startGame() {
    //this.props.setGamePoints(this.props.gameInfo.rewardPoints);
    console.log(
      "Lobby: button pressed, props.gamedata is: ",
      this.props.gamedata
    );
    Actions.gameplay(this.props.gamedata);
  }

  leaveGame() {
    let message = {
      roomName: this.roomName,
      userId: this.props.userId
    };

    this.socket.emit("leaveGame", message);
  }

  removePlayer(message) {
    let length1 = this.state.team1.length,
        length2 = this.state.team2.length;
    let elem = '';
    let bool = true;

    for(let i = 0; i < length1; ++i) {
      if(message === this.state.team1[i]) {
        this.state.team1.splice(i, 1)
        this.setState({
          team1: this.state.team1
        });
        bool = false;
        break;
      }
    }

    if(bool) {
      for(let i = 0; i < length2; ++i) {
        if(message === this.state.team2[i]) {
          this.state.team2.splice(i, 1)
          this.setState({
            team2: this.state.team2
          });
          break;
        }
      }
    }

    length1 = this.state.team1.length,
    length2 = this.state.team2.length;

    this.state.totalPlayer--;

    if(length1 < length2) {
      elem = this.state.team2.pop();
      this.setState({
        team1:  [...this.state.team1, elem],
        team2:  this.state.team2,
      });
    } else if (length2 < length1) {
      elem = this.state.team1.pop();
      this.setState({
        team1:  this.state.team1,
        team2: [...this.state.team2, elem],
      });
    } 

    this.setState({
      totalPlayer: this.state.totalPlayer
    });

    this.props.updatedTeams({
      team1: this.state.team1,
      team2: this.state.team2
    });

   
   
    if (this.state.totalPlayer < 2) {
      this.setState({ showStart: false });
    }
    if(this.props.userId === message) {
      Actions.joingame({listtype: 'join'})
    }


  }

  onSend(messages = []) {
    messages[0].roomName = this.roomName;
    messages[0].image = "";
    this.socket.emit("message", messages[0]);
    this._storeMessages(messages);
  }

  render() {
    // console.log(this.props.gameId, 'gameId in lobby')
    // console.log(this.props.challenges, 'challenges in lobby')
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#5F9EA0"
    //   },
    //   welcome: {
    //     fontSize: 20,
    //     textAlign: "center",
    //     margin: 10,
    //     color: "#ffffff"
    //   }
    // });

    return (
      <View style={this.state.styles.container}>

        <View style={this.state.styles.divide}>
          {this.state.showStart ? (
            <View  style={this.state.styles.button}><Button
              onPress={() => {
                this.socket.emit("startGame", this.roomName, this.state.team1, this.state.team2);
              }}
              title="START GAME"
              color = "#2395F6"
              
            /></View>
          ) : (
            <View  style={this.state.styles.button}><Button
           
              title={"Need " + (2 - this.state.totalPlayer) + " More Players"}
              color = "#2395F6"
          
            /></View>
          )}
          <View style={this.state.styles.button}><Button

              onPress={() => {this.leaveGame()}}
              title="Leave Game"
              color = "#2395F6"
            /></View>
        </View>
        
        <Text style={this.state.styles.lobbytext}>Lobby: {this.props.gamedata.room}</Text>
        <Text>Created by: {this.props.gamedata.createdBy}</Text>
        <View style={this.state.styles.chat}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={this.state.user}
          />
        </View>
        <View style={this.state.styles.divide}>
          <View style={this.state.styles.playerL}>
            <Text style={this.state.styles.team}> Team 1 </Text>
            {this.state.team1.map((val, key) => {
              return (
                <Text style={this.state.styles.player} key={key}>    {val}</Text>
              );
            })}
          </View>
          <View style={this.state.styles.playerR}>
            <Text style={this.state.styles.team}> Team 2 </Text>
            {this.state.team2.map((val, key) => {
              return (
                <Text style={this.state.styles.player} key={key}>    {val}</Text>
              );
            })}
          </View>
        </View>
        {/* <View style={this.state.styles.divide}>
          {this.state.showStart ? (
            <Button
              style={this.state.styles.button}
              onPress={() => {
                this.socket.emit("startGame", this.roomName, this.state.team1, this.state.team2);
              }}
              title="START GAME"
            />
          ) : (
            <Button
              style={this.state.styles.button}
              title={"Need " + (2 - this.state.totalPlayer) + " More Players"}
            />
          )}
          <Button
              style={this.state.styles.button}
              onPress={() => {this.leaveGame()}}
              title="Leave Game"
            />
        </View> */}
      </View>
    );
  }

  _storeMessages(messages) {
    if (
      messages.text !== undefined &&
      messages.text.length >= 6 &&
      messages.text.substring(0, 5) === "@team" &&
      messages.user._id === this.state.user._id
    ) {
      messages.text = messages.text.substring(6);
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, messages)
        };
      });
    } else if (
      messages.text !== undefined &&
      messages.text.substring(0, 5) !== "@team"
    ) {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, messages)
        };
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EACFA4"
  },
  lobbytext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111111",
    marginTop: 7,
    textShadowRadius: 8,
    textShadowColor: 'grey'
  },
  divide: {
    flexDirection: "row"
  },
  chat: {
    width: Dimensions.get("window").width - 15,
    height: Dimensions.get("window").height / 2,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  playerL: {
    width: Dimensions.get("window").width / 2 - 15,
    height: Dimensions.get("window").height / 6,
    margin: 10,
    marginRight: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#000'
  },
  playerR: {
    width: Dimensions.get("window").width / 2 - 15,
    height: Dimensions.get("window").height / 6,
    margin: 10,
    marginLeft: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 15,
    borderWidth: 1,
    borderColor: '#000'
  },
  team: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000'
  },
  button: {
    margin: 7,
    marginBottom: 0,
    borderRadius: 10
  },
  player: {
    fontWeight: "bold",
    fontSize: 14,
    color: '#000'
  },
  divide: {
    flexDirection: "row",
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
