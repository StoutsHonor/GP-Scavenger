import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';
import Swiper from 'react-native-swiper';
import config from "../../../config/config";
import { connect } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";



const mapStateToProps = state => {
  return {
    userId: state.client.userIdentity,
    gameId: state.play.gameId,
    gameInfo: state.play.gameInfo,
    challenges: state.play.allChallenges,
    gamePoints: state.play.gamePoints,
    currentGameTeam1: state.play.currentGameTeam1,
    currentGameTeam2: state.play.currentGameTeam2
  };
};

class Friends extends Component {
  constructor(props) {
    super(props);

    this.onSend = this.onSend.bind(this);

    this.state = {
      messages: [],
      user: {
        _id: 1,
        name: this.props.userId
      }
    }
  }

  onSend() {

  }

  render() {
    return (
      <SideMenu menu={<HomePage/>}>
        <View style={styles.container}>
          <View style={styles.profile}>

            <View style={styles.name}>
              <View style={styles.image}>
              </View>
              <View>
                <Text style={styles.description}>John Doe</Text>
                <Text style={styles.digits}>Software Engineer Trainee at Hack Reactor</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.stats}>
                <Text style={styles.digits}>45</Text>
                <Text style={styles.description}>Game</Text>
                <Text style={styles.description}>Played</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.digits}>25</Text>
                <Text style={styles.description}>Game</Text>
                <Text style={styles.description}>Won</Text>
              </View>
              <View style={styles.stats}>
                <Text style={styles.digits}>33</Text>
                <Text style={styles.description}>Friends</Text>
              </View>
            </View>
            <View style={styles.friend}>
              <Button title={'Friends'}/>
            </View>
          </View>
          <View style={styles.body}>
          <Swiper style={styles.wrapper} >
            <View style={styles.slide1}>
              
            </View>
            <View style={styles.slide2}>
              
            </View>
            <View style={styles.slide3}>
              <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={this.state.user}
              />
            </View>
          </Swiper>
          </View>

        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#5F9EA0' 
  },
  profile: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    marginTop: 1,
    backgroundColor: "#ff372c"
  },
  body: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    marginTop: 1,
    backgroundColor: "#4848ff"
  },
  name: {
    flex: 0.333333,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  info: {
    flex: 0.333333,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  friend: {
    flex: 0.333333,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5,
    backgroundColor: "#43e811"
  },
  stats: {
    width: 75,
    height: 75,
    marginRight: 20,
    paddingRight: 8,
    alignItems: "center",
    backgroundColor: "#ff372c",
    borderRightColor: 'white',
    borderRightWidth: 1,

  },
  digits: {
    marginTop: 7,
    fontSize: 14
  },
  description: {
    fontSize: 16
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    width: Dimensions.get("window").width - 15,
    height: Dimensions.get("window").height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
});

export default connect(mapStateToProps)(Friends);
