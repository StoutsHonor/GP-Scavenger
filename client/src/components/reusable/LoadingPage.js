import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native';


// // Redux Imports for binding stateToProps and dispatchToProps to the component
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import {clientLoadingUpdated} from '../../actions/index.js'

// // gives the component access to store through props
// const mapStateToProps = (state) => {
//   console.log('Create Game state: ', state)
//   return {
//     clientLoading: state.client.clientLoading,
//   }
// }

// // gives the component access to actions through props
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({clientLoadingUpdated}, dispatch)
// }



class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.spin = this.spin.bind(this)
    this.state = {
    };
  }

  componentDidMount() {
    // setTimeout(() => {this.setState({loading: false})}, 2000)
    this.spin()
  }
  
  spin() {
    console.log('spinValue: ', this.spinValue)
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.spin())
  }

  render() {

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return(
      <View style={styles.container}>
        <Animated.Image 
        style={{width: 280, height: 285, flex: 0, flexDirection: 'column', justifyContent: 'center', transform: [{rotate: spin}] }}
          source={{uri: 'http://i.imgur.com/qIaUrfj.png'}} />
        <Text style={{fontFamily: 'Roboto', fontSize: 40, color: '#f2f2f2', flex: 0, flexDirection: 'column', justifyContent: 'center'}}>Now Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8be8a',
  },
});

export default LoadingPage
// export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage)
