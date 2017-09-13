import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableHighlight,
  Button
} from 'react-native';
import { Card } from 'react-native-elements';
import config from '../../../config/config';
import io from 'socket.io-client';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    gameId: state.play.gameId,
    userId: state.client.userIdentity,
  }
}


class ChallengeListEntry extends Component {
  constructor(props) {
    super(props);

    this.gameName = 'game' + this.props.gameId;
    this.changeOpponentShow = this.changeOpponentShow.bind(this);

    this.state = {
      displayInfo: false,
      color: '#A9A9A9',
      opponentShow: false,
      flash: false
    }
  }
  
  componentDidMount() {
    this.socket = io(config.localhost);
    this.socket.emit('createRoom',  this.gameName);
    this.socket.on('changeOpponentShow', this.changeOpponentShow);

    if(this.props.challengeIndex < this.props.index) {
      this.setState({displayInfo: true});
      this.setState({color: '#008000'})
    }
    if(this.props.challengeIndex === this.props.index) {
      this.setState({displayInfo: true});
      this.setState({color: '#FFD700'})
    }
    setTimeout(() => this.setState({flash: !this.state.flash}), 1000)
  }

  changeOpponentShow(message) {
    for(let i = 0; i < message.team.length; ++i) {
      if(this.props.userId === message.team[i]) return;
    }

    if(this.props.challengeIndex === message.index) {
      this.setState({ opponentShow: true });
    } else {
      this.setState({ opponentShow: false });
    }
  }
  
  render() {
    console.log(this.state.opponentShow, 'opponent show')
    let str = (this.props.challengeIndex + 1) + '';
    let backColor = '#87CEFA';
    if(this.state.opponentShow) {
      str = 'Opponent Team Is On This Challenge';
      setTimeout(() => this.setState({flash: !this.state.flash}), 1000);
      this.state.flash ? backColor = "#87CEFA" : backColor = "#DC143C";
    } else {
      let backColor = '#87CEFA';
    }
    
    return (
      <View style={{backgroundColor: backColor}}>
        <TouchableHighlight onPress={() => this.props.showChallengeDetails(this.props.challengeIndex)}>
          <View>
            <Card title={str} backgroundColor={this.state.color}> 
              {this.state.displayInfo ? 
                <View>
                  <Text style={styles.description} >{this.props.challenge.name}</Text>
                </View>
                :
                <Image
                  style={styles.locked}
                  source={{uri: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/matte-red-and-white-square-icons-business/122828-matte-red-and-white-square-icon-business-lock6-sc48.png'}}
                />}
            </Card>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  description: {
    textAlign: 'center'
  },
  locked: {
    width: 30,
    height: 30,
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(ChallengeListEntry);