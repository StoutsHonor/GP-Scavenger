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
import { Thumbnail } from 'native-base';



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

      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.name}>
          <Image style={styles.image1} source={{uri: 'https://i.redditmedia.com/lp3VESOLTRuOKCgKBIZZuW0jQiqNKOvwKoeT0dEbWH4.jpg?w=1000&s=acdf2acb7504abca49f9cbe55a0fd789'}} />
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
              <View style={styles.stats1}>
                <Text style={styles.digits}>33</Text>
                <Text style={styles.description}>Friends</Text>
              </View>
            </View>
            <View style={styles.friend}>
              <Button title={'Friends'}/>
            </View>
        </View>

      <Swiper style={styles.wrapper} height={240}
        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        paginationStyle={{
          bottom: -23, left: null, right: 10
        }} loop>
        <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
          <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.state.user}
          />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
          <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://i.redditmedia.com/lp3VESOLTRuOKCgKBIZZuW0jQiqNKOvwKoeT0dEbWH4.jpg?w=1000&s=acdf2acb7504abca49f9cbe55a0fd789'}} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
          <Image resizeMode='stretch' style={styles.image} source={{uri: 'http://i.imgur.com/yAEjSco.jpg'}} />
        </View>
        <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
          <Image resizeMode='stretch' style={styles.image} source={{uri: 'http://i.imgur.com/CKwLMLq.jpg'}} />
        </View>
      </Swiper>
    </View>
    );
  }
}
//   <View style={styles.body}>
//</View>
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#5F9EA0' 
  },
  profile: {
    height: 240,
    marginTop: 1,
    backgroundColor: "#ff372c"
  },
  name: {
    height: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  info: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  friend: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff372c"
  },
  image1: {
    height: 110,
    borderRadius: 55,
    width: 110,
    marginRight: 7
  },
  stats: {
    width: 100,
    height: 70,
    marginRight: 20,
    marginLeft: 10,
    paddingRight: 12,
    alignItems: "center",
    backgroundColor: "#ff372c",
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  stats1: {
    width: 100,
    height: 70,
    marginRight: 20,
    paddingRight: 8,
    alignItems: "center",
    backgroundColor: "#ff372c",
  },
  digits: {
    marginTop: 7,
    fontSize: 14
  },
  description: {
    fontSize: 16
  },
  container: {
    flex: 1
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {

    backgroundColor: '#92BBD9'
  }
});

export default connect(mapStateToProps)(Friends);
