import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActionButton from 'react-native-action-button';

export default class FloatingButton extends Component {

  render() {
    return (
      <View style={styles.container}>
        {/* Rest of the app comes ABOVE the action button component !*/}

        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => console.log("notes tapped!")}>
          {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {console.log("notification tapped!")}}>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {console.log("all task tapped!")}}>
          </ActionButton.Item> */}
        </ActionButton>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 90,
    position: 'absolute',
    bottom: 1,
    right: 1,
    zIndex: 99,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
