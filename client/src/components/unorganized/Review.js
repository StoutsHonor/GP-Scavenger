import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import { Card } from 'react-native-elements';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    console.log(this.props.review,'review')
    return (
      <Card title={'username'}>
        <Text>this is a comment</Text>
        <Text>{this.props.review.comment}</Text>
      </Card>
    );
  }
}

export default Review;