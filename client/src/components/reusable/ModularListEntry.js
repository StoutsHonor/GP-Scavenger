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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
});
