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
import { bindActionCreators } from 'redux';
import { setOpponentIndex } from '../../actions/index';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setOpponentIndex }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    gameId: state.play.gameId,
    userId: state.client.userIdentity,
    opponentIndex: state.play.opponentIndex,
    borderWidth: 2.5
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
      this.setState({color: '#5cb85c'});
      this.setState({status: 'Completed'});
      this.setState({imageDisplay: 'http://diysolarpanelsv.com/images/check-mark-clipart-png-42.png'});
      this.setState({borderWidth: 1.5})
    }
    if(this.props.challengeIndex === this.props.index) {
      this.setState({displayInfo: true});
      this.setState({color: '#FFD700'});
      this.setState({status: 'Pending'});
      this.setState({imageDisplay: 'https://incendia.net/wiki/images/2/23/Example_Texture1.png'});
      this.setState({borderWidth: 1.5})
    }
    
    if(this.props.challengeIndex === this.props.opponentIndex) {
      this.setState({opponentShow: true});
    }
  }

  changeOpponentShow(message) {
    console.log('changeOpponentShow: message: ', message)
    for(let i = 0; i < message.team.length; ++i) {
      if(this.props.userId === message.team[i]) return;
    }

    if(this.props.challengeIndex === message.index) {
      this.setState({ opponentShow: true });
      this.props.setOpponentIndex(message.index);
    } else {
      this.setState({ opponentShow: false });
      this.props.setOpponentIndex(message.index);
    }
  }
  
  render() {    
    const styles = StyleSheet.create({
      description: {
        textAlign: 'center'
      },
      locked: {
        width: 30,
        height: 30,
        alignItems: 'center'
      },
      entry: {
        backgroundColor: this.state.color, 
        borderWidth: this.state.borderWidth,
        marginBottom: 15,
        padding: 7,
        borderRadius: 10,
        elevation: 10,
        borderColor: 'black',
      },
      challengeName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
      },
      status: {
        fontSize: 17,
      }
    });
    // <Thumbnail source={{uri: 'http://www.pngmart.com/files/1/Cross-Sword-PNG-Clipart.png'}}/>
    return (
      <ListItem avatar style={styles.entry} >
        <Left><Thumbnail source={{uri: this.state.imageDisplay}} /></Left>
        <Body>
          {this.state.displayInfo ? <Text style={styles.challengeName}>{this.props.challenge.name}</Text> : <Text> Locked</Text>}
          {this.state.displayInfo ? <Text note style={styles.status}>{this.state.status}</Text> : null}
        </Body>
        <Right>
          {this.state.opponentShow ? null : null}
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



export default connect(mapStateToProps, mapDispatchToProps)(ChallengeListEntry);