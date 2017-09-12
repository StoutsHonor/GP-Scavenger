import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container } from 'native-base';
import { Actions } from 'react-native-router-flux';



class ModularListEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

  }



  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps')
    this.setState({
      data: nextProps
    })
  }

  onListEntryClick() {
    console.log(`ModularListEntryClick - onListEntryClick()`)
    if (this.props.listentryclick) {
      this.props.listentryclick(this.props.listentry)
    }
  }


  render() {
    return (
        <ListItem avatar onPress={() => {this.onListEntryClick()}} >
          <Left><Thumbnail source={{uri: 'https://incendia.net/wiki/images/2/23/Example_Texture1.png'}} /></Left>
          <Body>
            <Text>{this.props.listentry.room}</Text>
            <Text>{this.props.listentry.name}</Text>
            <Text note>Start: {this.props.listentry.startLocation}</Text>
            <Text note>Max Players: {this.props.listentry.maxPlayers}</Text>
          </Body>
          <Right>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View>
            <Button rounded primary onPress={() => {
                console.log('list entry!')
                this.props.buttonaction(this.props.listentry)}}><Text>{this.props.buttontext}</Text></Button>
              </View>
            </View>
          </Right>
        </ListItem>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
});

//          <Text>{JSON.stringify(this.props.listentry)}</Text>

export default ModularListEntry
