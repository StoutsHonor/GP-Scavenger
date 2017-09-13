import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PlayedWithEntry from './PlayedWithEntry';
import {connect} from 'react-redux';
import { Header, Container, List, ListItem, Content, Separator } from 'native-base'



const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    userId: state.client.userIdentity,
  }
}


class PlayedWith extends Component {
  constructor(props){
    super(props);

    this.state = {
      PlayedWith: []
    }
  }

  componentDidMount() {

    fetch(`${config.localhost}/api/user/findUser/?email=${this.props.userId}`)
    .then((response) => {
      return response.json();  
    }).
    then((messages) => {
      console.log('messages is ', messages);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  render() {
    return (
      <Container style={styles.container}>
          <Content>
            <List>
          {/* {this.state.data.map( (player, index) => {
            return (
              <PlayedWithEntry/>
          )})} */}
            </List>
          </Content>
        </Container>
    )
  }
}

export default connect(mapStateToProps)(PlayedWith)