import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Modal,
  TouchableHighlight
} from 'react-native';
import { Divider, FormLabel, FormInput } from 'react-native-elements';
import {Container, Content, Card, CardItem, Item, Input, Header, Body} from 'native-base';
import { Actions } from 'react-native-router-flux';
import config from '../../../../config/config';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ set_challenge_details, submit_answers }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    challengeDetails: state.play.challengeDetails,
    submittedAnswers: state.play.submittedAnswers,
  }
}

class QuestionChallenge extends Component {
  constructor(props) {
    super(props);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickSkip = this.handleClickSkip.bind(this);
    this.state = {
      userInput: '',
      showTryAgain: false,
      info: {},
      data: {}
    }
  }

  componentWillMount() {
    fetch(`${config.localhost}/api/questionType/findQuestionType/?questionTypeId=${this.props.challenge.questionTypeId}`)
    .then(response => response.json())
    .then(data => this.setState({info: data}))
    .then(() => {
      let endPoint = `${config.localhost}/api/${this.state.info.type}/find${((this.state.info.type).charAt(0).toUpperCase() + this.state.info.type.slice(1))}/?id=${this.props.challenge.questionId}`;
      fetch(endPoint)
      .then(response => response.json())
      .then(data => {
        this.setState({data: data});
        this.props.setChallengeDetails(this.props.challengeDetails.concat(data))
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err));
  }

  handleClickSubmit() {
    if(this.state.userInput.toLowerCase().includes(this.state.data.answer.toLowerCase()) === true) {
      this.props.challengeCompleted();
    } else {
      this.setState({showTryAgain: true});
      setTimeout(() => this.setState({showTryAgain: false}), 3000)
    }
  }

  handleClickSkip() {
    this.props.challengeSkipped();
  }

  render() {
    return (
      
        <Container style={styles.container}>
          <Image
            style={{
              flex: 1,
              position: 'absolute',
              width: '140%',
              height: '140%',
              justifyContent: 'center',
            }}
            source={{ uri: "https://afterwordsbooks.files.wordpress.com/2013/02/riddle.jpg" }}
          />
          <Header><Text style={styles.type}>{this.state.info.type ? this.state.info.type.toUpperCase() : ''}</Text></Header>
          <Content>
            <Card>
              <CardItem header>
                <Text style={styles.title}>{this.state.data.title}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.question}>
                    {this.state.data.question}
                  </Text>
                </Body>
              </CardItem>
          </Card>
          </Content>
          <Content>
            <Item rounded>
              <Input
                style={styles.form} 
                onChangeText={userInput => this.setState({userInput})}
                placeholder='Enter Your Answer Here'
              />
            </Item>
          <Button
            onPress={this.handleClickSubmit}
            title="Submit"
            color="#32CD32"
          />
          <Button
            onPress={this.handleClickSkip}
            title="Give Up"
            color="#800000"
          />
          {this.state.showTryAgain ? <View style={styles.tryAgain}><Text style={styles.tryAgainText}>Try Again</Text></View> : null}
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4F4F',
  },
  type: {
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'cursive'
  },
  title: {
    margin: 10,
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: '#F0FFFF',
  },
  question: {
  },
  tryAgain: {
    alignItems: 'center',
    backgroundColor: "#800000"
  },
  tryAgainText: {
    color: "#FFFFFF",
    fontSize: 30
  },
  form: {
    color:'#F0FFFF',
    textAlign: 'center',
    marginBottom: 10
  },
  bigFont: {
    fontSize: 30
  }
});

export default QuestionChallenge;