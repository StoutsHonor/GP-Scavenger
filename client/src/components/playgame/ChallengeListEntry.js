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

class ChallengeListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      color: '#A9A9A9',
      opponentShow: false,
      flash: false
    }
  }
  
  componentDidMount() {
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
        <Card title={str} backgroundColor={this.state.color}> 
          {this.state.displayInfo ? 
            <View>
              <Text style={styles.description} >{this.props.challenge.name}</Text>
              <Button title="test" onPress={() => this.setState({opponentShow: ! this.state.opponentShow})}/>
            </View>
            :
            <Image
              style={styles.locked}
              source={{uri: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/matte-red-and-white-square-icons-business/122828-matte-red-and-white-square-icon-business-lock6-sc48.png'}}
            />}
          <View >
          {/* <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showReview}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
            <View style={{marginTop: 22}}>
              <View>
                {this.state.reviews.map( (review, index) => {
                  <Review review={review} key={index}/>
                })}
                <TouchableHighlight onPress={() => {
                  this.setState({showReview: false});
                }}>
                  <Text>Back to Games</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal> */}
          </View>
        </Card>
        <Text></Text>
        <Text></Text>
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

export default ChallengeListEntry;