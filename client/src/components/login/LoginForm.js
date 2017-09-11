import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import firebase from 'firebase';
import TitledInput from '../reusable/TitledInput';
// import Spinner from './Spinner';

class LoginForm extends Component {
  // state to send to auth
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      signingUp: false,
      firstName: '',
      lastName: '',
      DOB: '',
      username: '',
    };
    this.setState = this.setState.bind(this)
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
        // TODO: fetch user from DB
        this.props.setusermethod(); // TODO: call this on data retreived from DB.
      })
      .catch((e) => {
        console.log('error: ', e);
        this.setState({ error: 'Authentication failed.', loading: false });
      });
  }

  onSignUpPress() {
    if (!this.state.email) {
      Alert.alert(
        'Error',
        'Please enter a valid email address!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
      )
    } else if (this.state.password.length < 6) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters long!',
        [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
      )
    } else if (!this.state.firstName || !this.state.lastName) {
      Alert.alert(
      'Error',
      'Please fill out both first and last name!',
      [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
      )
    } else if (!this.state.username) {
      Alert.alert(
      'Error',
      'Please create a username!',
      [{text: 'Dismiss', onPress: () => console.log('OK Pressed!')},]
      )
    }

    // (this.state.DOB)

    else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ error: '', loading: false });
        console.log('setting state to created user:', this.state.email, this.state.password);
        // TODO: attempt insert to DB. handle duplicate usernames.
        this.props.setusermethod(); // TODO: call this on data retreived from DB.
      })
      .catch((e) => {
        console.log('error: ', e);
        this.setState({ error: 'Account creation failed.', loading: false });
      });
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (<Text>Loading...</Text>);    
    } else if (this.state.signingUp) {
      return (<Button onPress={this.onSignUpPress.bind(this)} title="Submit Sign Up"/>);
    }
    return (<Button onPress={this.onLoginPress.bind(this)} title="Submit Log In"/>);
  }

  toggleFormType() {
    this.setState({ signingUp: !this.state.signingUp, error: ''});
  }


  renderLoginOrSignupForm() {
    if (!this.state.signingUp) {
      return (
        <View>
          <TitledInput 
              label='Email Address                            '
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
        </View>
      );    
    } else {
      return (
        <View>
          <TitledInput 
              label='First Name                               '
              placeholder=''
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
          />
          <TitledInput 
              label='Last Name'
              placeholder=''
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
          />
          <TitledInput 
              label='Email Address                            '
              placeholder='you@domain.com'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
          />
          {/* <TitledInput 
              label='Date of Birth'
              placeholder='yyyy-mm-dd'
              value={this.state.DOB}
              onChangeText={DOB => this.setState({ DOB })}
          /> */}
          <TitledInput 
              label='Create a Username'
              placeholder=''
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
          />
          <TitledInput 
              label='Create a Password'
              autoCorrect={false}
              placeholder='*******'
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
          />
        </View>
      );
    }
  }

  renderLoginOrSignupButton() {
    if (!this.state.signingUp) {
      return (
        <View>
          <Text>New around here?</Text>
          <Button onPress={this.toggleFormType.bind(this)} title="Sign Up"/>
        </View>
      );    
    } else {
      return (
        <View>
          <Text>Have an account?</Text>
          <Button onPress={this.toggleFormType.bind(this)} title="Log In"/>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderLoginOrSignupForm()}
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
        <Text></Text>
        <Text></Text>
        {this.renderLoginOrSignupButton()}
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