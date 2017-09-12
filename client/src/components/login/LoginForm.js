import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import firebase from 'firebase';
import TitledInput from '../reusable/TitledInput';
// import Spinner from './Spinner';
import { Container, Header, Content, Separator, Form, Item, Input, Icon } from 'native-base'
import config from '../../../config/config'


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
  }


  // method to bring auth
  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    console.log ('state:', this.state);

    // method to sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {

        console.log('sending fetch to get existing user')
        fetch(`${config.localhost}/api/user/findUser`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            profileDescription: null,
            DOB: null, // TODO: use real date when formatted correctly
            rewardPoints: 0
          })
        })
        .catch(error => console.log('error in finding user: ', error))
        // .then( (response) => {return response.json()})
        // .catch(error => console.log('error in response parse after finding user: ', error))
        .then( (data) => {
          console.log('data receieved after finding user: ', data)
          console.log('setting user in redux...')
          // this.props.setusermethod(); // TODO: call this on data retreived from DB.
          this.setState({ error: '', loading: false });
          this.props.setusermethod(firebase.auth().currentUser.providerData[0]);
        })



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
        console.log('sending post to save new user to database')
        fetch(`${config.localhost}/api/user/addUser`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            profileDescription: null,
            DOB: null, // TODO: use real date when formatted correctly
            rewardPoints: 0
          })
        })
        .catch(error => console.log('error in posting user: ', error))
        // .then( (response) => {return response.json()})
        // .catch(error => console.log('error in response parse after posting user: ', error))
        .then( (data) => {
          console.log('data receieved after posting user: ', data)
          console.log('setting user in redux...')
          // this.props.setusermethod(); // TODO: call this on data retreived from DB.
        })

      })
      .catch((e) => {
        console.log('error: ', e);
        console.log('Email in use: ', e.message === "The email address is already in use by another account.");
        if (e.message === "The email address is already in use by another account.") {
          this.setState({ error: "This email is already in use!", loading: false });
        } else {
          this.setState({ error: 'Account creation failed.', loading: false });
        }
      })
      // .then(() => {
      //   console.log('sending post to save new user to database')
      //   fetch(`${config.localhost}/api/user/addUser`, {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       firstName: this.state.firstName,
      //       lastName: this.state.lastName,
      //       username: this.state.username,
      //       email: this.state.email,
      //       profileDescription: null,
      //       DOB: this.state.DOB,
      //       rewardPoints: 0
      //     })
      //   })
      //   .catch(error => console.log('error in posting user: ', error))
      //   .then( (response) => {return response.json()})
      //   .catch(error => console.log('error in response parse after posting user: ', error))
      //   .then( (data) => {console.log('data receieved after posting user: ', data)})
      // });
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (<Text>Loading...</Text>);    
    } else if (this.state.signingUp) {
      return (<Button onPress={this.onSignUpPress.bind(this)} title="Submit"/>);
    }
    return (<Button onPress={this.onLoginPress.bind(this)} title="Submit"/>);
  }

  toggleFormType() {
    this.setState({
      signingUp: !this.state.signingUp,
      error: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      DOB: '',
      username: '',
    });
  }


  renderLoginOrSignupForm() {
    if (!this.state.signingUp) {
      return (
        <View>
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
        </View>
      );    
    } else {
      return (
        <Form style={styles.signupForm}>

          <Item>
          <Text style={styles.formTitleText}>  Create an Account  </Text>
          </Item>

          <Item>
          <Text style={styles.labelText}>First Name: </Text>
          <TextInput
            autoCorrect={false}
            placeholder=''
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            style={styles.inputText}
          />
          </Item>

          <Item>
          <Text style={styles.labelText}>Last Name: </Text>
          <TextInput
            autoCorrect={false}
            placeholder=''
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            style={styles.inputText}
          />
          </Item>

          <Item>
          <Text style={styles.labelText}>Email: </Text>
          <TextInput
            autoCorrect={false}
            placeholder='you@domain.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.inputText}
          />
          </Item>

          {/* <Item>
          <Text style={styles.labelText}>Date of Birth: </Text>
          <TextInput
            autoCorrect={false}
            placeholder='YYYY-MM-DD'
            value={this.state.DOB}
            onChangeText={DOB => this.setState({ DOB })}
            style={styles.inputText}
          />
          </Item> */}


          {/* <Item>
          <Text style={styles.labelText}>Create Username & Password </Text>
          </Item> */}

          <Item>
          <Text style={styles.labelText}>Set Username: </Text>
          <TextInput
            autoCorrect={false}
            placeholder=''
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            style={styles.inputText}
          />
          </Item>

          <Item>
          <Text style={styles.labelText}>Set Password: </Text>
          <TextInput
            autoCorrect={false}
            placeholder='*******'
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.inputText}
          />
          </Item>

        </Form>
      );
    }
  }

  renderLoginOrSignupButton() {
    if (!this.state.signingUp) {
      return (
        <View>
          <Text>New around here?</Text>
          <Button onPress={this.toggleFormType.bind(this)} title="Create an Account"/>
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
    },
    labelText: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    inputText: {
      marginTop: 3,
      fontSize: 18,
      color: 'black',
      flex: 1
    },
    signupForm: {
      flex: 1
    },
    formTitleText: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },

};

export default LoginForm;