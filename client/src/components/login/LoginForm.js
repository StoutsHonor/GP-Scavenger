import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TitledInput from '../reusable/TitledInput';
// import Spinner from './Spinner';

class LoginForm extends Component {
  // state to send to auth
  constructor(props){
    super(props)
    this.state = { email: '', password: '', error: '', loading: false };
    
  }


  // method to bring auth
  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    console.log ('state:', this.state);

    // method to sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '', loading: false }); 
        this.props.setusermethod();
      })
      .catch(() => {
        console.log('Login was not successful, let\'s create a new account');
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ error: '', loading: false });
            console.log('setting state to created user:', email, password);
            this.props.setusermethod();
          })
          .catch((e) => {
            console.log('error: ', e);
            this.setState({ error: 'Authentication failed.', loading: false });
          });
      });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (<Text style={styles.loadingTextStyle}>Loading...</Text>);    
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }
  render() {
    return (
      <View style={styles.container}>
        <TitledInput 
            label='Email Address                      '
            placeholder='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
        />
        <TitledInput 
            label='Password'
            autoCorrect={false}
            placeholder='*******'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
      </View>
    );
  }
}
const styles = {
    errorTextStyle: {
      color: '#E64A19',
      alignSelf: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    loadingTextStyle: {
      color: '#E64A19',
      alignSelf: '#000000',
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    container: {
      padding: 10,
      paddingHorizontal: 10,
      backgroundColor: '#FFFFFF',
      opacity: .7,
      borderRadius: 5
    }
};

export default LoginForm;