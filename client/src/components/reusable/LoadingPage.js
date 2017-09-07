import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image
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
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {this.setState({loading: false})}, 2000)
  }

  render() {
    return(
      <View style={styles.container}>
        {this.state.loading ? <View>
        <Image style={{width: 280, height: 285, flex: 0, flexDirection: 'column', justifyContent: 'center'}}
          source={{uri: '../../media/scavengerLogo.png'}} />
        <Text style={{fontSize: 40, color: '#f2f2f2', flex: 0, flexDirection: 'column', justifyContent: 'center'}}>Now Loading...</Text>
        </View> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006400',
  },
});

export default LoadingPage
// export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage)
