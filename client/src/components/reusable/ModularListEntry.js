import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';
import { ListItem, Left, Thumbnail, Text, Right, Button, Body, Separator, Container } from 'native-base';

export default class ModularList extends Component {
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

  componentDidMount() {
    //console.log('ModularListEntry: state mounted, state is: ', this.state)
  }




  render() {
    return (
        <ListItem avatar>
          <Left><Thumbnail source={{uri: 'https://incendia.net/wiki/images/2/23/Example_Texture1.png'}} /></Left>
          <Body>
            <Text>{this.props.listentry.name}</Text>
            <Text note>Start: {this.props.listentry.startLocation}</Text>
            <Text note>Max Players: {this.props.listentry.maxPlayers}</Text>
          </Body>
          <Right>
            <Button rounded primary onPress={() => {
                console.log('list entry!')
                this.props.buttonaction(this.props.listentry)}}><Text>{this.props.buttontext}</Text></Button>
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