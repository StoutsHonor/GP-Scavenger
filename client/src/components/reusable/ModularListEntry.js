import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
} from 'react-native';

export default class ModularList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }

  }



  componentWillReceiveProps(nextProps) {
    console.log('ModularListEntry: willreceiveProps, nextProps is: ', nextProps);
    let temp ={};
    for (let i = 0; i < nextProps.data.length; i++) {
      temp[i] = nextProps.data[i];
    }
    console.log('ModularListEntry: willreceiveProps, temp is: ', temp);
    this.setState({
      data: temp
    })
  }

  componentDidMount() {
    console.log('ModularListEntry: state mounted, state is: ', this.state)
  }




  render() {
    return (
      <View>
        <Text>Modular List Entry</Text>
        <Text>{JSON.stringify(this.props.listentry)}</Text>
        <Button
          onPress={() => {
            console.log('list entry!')
            this.props.buttonaction(this.props.listentry)
          }}
          title={this.props.buttontext}
        />

      </View>
    );
  }

}

