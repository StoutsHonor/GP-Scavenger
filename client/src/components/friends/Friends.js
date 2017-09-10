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

const Friends = () => {
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
        </View>

      </View>
    </SideMenu>
  );
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
  }


});

export default Friends;