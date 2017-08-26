/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from './src/components/Button'
import Card from './src/components/Card'
import CardSection from './src/components/CardSection'

export default class client extends Component {
  constructor() {
    super()
    this.dummyGet = this.dummyGet.bind(this)
    this.dummyPost = this.dummyPost.bind(this)
    this.state = {
      dummyData: ''
    }
  }


  componentWillMount() {
    console.log('index.android.js has loaded')
  }

  dummyGet() {
    console.log(`in dummyGet()`)
    fetch('http://10.0.2.2:3000/api/images/getImages')
      .then( (response) => {
        console.log('whoooosh') 
        console.log(`${JSON.stringify(response)}`)
        let app = this
        this.setState({ dummyData: response }, () => { console.log(`state is now ${JSON.stringify(this.state)}`)})
      })
  }

  dummyPost() {
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.dummyGet}>
            Test GET!
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
