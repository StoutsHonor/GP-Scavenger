import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container } from 'native-base';
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
      flash: false,
      status: 'locked',
      imageDisplay: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/matte-red-and-white-square-icons-business/122828-matte-red-and-white-square-icon-business-lock6-sc48.png'

    }
  }
  
  componentDidMount() {
    this.socket = io(config.localhost);
    this.socket.emit('createRoom',  this.gameName);
    this.socket.on('changeOpponentShow', this.changeOpponentShow);

    if(this.props.challengeIndex < this.props.index) {
      this.setState({displayInfo: true});
      this.setState({color: '#008000'});
      this.setState({status: 'Completed'});
      this.setState({imageDisplay: 'http://diysolarpanelsv.com/images/check-mark-clipart-png-42.png'});
    }
    if(this.props.challengeIndex === this.props.index) {
      this.setState({displayInfo: true});
      this.setState({color: '#FFD700'});
      this.setState({status: 'Pending'});
      this.setState({imageDisplay: 'https://incendia.net/wiki/images/2/23/Example_Texture1.png'});
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
      <ListItem avatar style={{backgroundColor: this.state.color}} >
        <Left><Thumbnail source={{uri: this.state.imageDisplay}} /></Left>
        <Body>
          {this.state.displayInfo ? <Text>{this.props.challenge.name}</Text> : <Text> Locked</Text>}
          {this.state.displayInfo ? <Text note>{this.state.status}</Text> : null}
        </Body>
        <Right>
          {this.state.opponentShow ? <Thumbnail source={{uri: 'http://www.pngmart.com/files/1/Cross-Sword-PNG-Clipart.png'}}/> : null}
        </Right>
      </ListItem>
      // <View style={{backgroundColor: backColor}}>
      //   <View>
      //     <Card title={str} backgroundColor={this.state.color}> 
      //       {this.state.displayInfo ? 
      //         <View>
      //           <Text style={styles.description} >{this.props.challenge.name}</Text>
      //         </View>
      //         :
      //         <Image
      //           style={styles.locked}
      //           source={{uri: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/matte-red-and-white-square-icons-business/122828-matte-red-and-white-square-icon-business-lock6-sc48.png'}}
      //         />}
      //     </Card>
      //   </View>
      // </View>
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