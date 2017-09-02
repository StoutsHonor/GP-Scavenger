import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import Row from './CreateListRow';
import FloatingButton from '../reusable/FloatingButton'

const window = Dimensions.get('window');


const data = {
  0: {
    image: 'https://placekitten.com/200/240',
    text: 'Chloe',
  },
  1: {
    image: 'https://placekitten.com/200/201',
    text: 'Jasper',
  },
  2: {
    image: 'https://placekitten.com/200/202',
    text: 'Pepper',
  },
  3: {
    image: 'https://placekitten.com/200/203',
    text: 'Oscar',
  },
};

export default class CreateList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.buttonOnClick = this.buttonOnClick.bind(this);
  }


  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }

  componentWillReceiveProps(nextProps) {
    console.log('createlist willreceiveProps, nextProps is: ', nextProps);
    let temp ={};
    for (let i = 0; i < nextProps.data.length; i++) {
      temp[i] = nextProps.data[i];
    }
    console.log('create list willreceiveProps, temp is: ', temp);
    this.setState({
      data: temp
    })
  }

  componentDidMount() {
    console.log('create list state mounted, state is: ', this.state)
  }


  buttonOnClick() {
    console.log('create list state: ', this.state)
    console.log('create list props: ', this.props)
  }


  render() {
    return (
      <View style={styles.container}>
        <FloatingButton handleClick={this.buttonOnClick}/>
        <Text style={styles.title} onPress={() => {console.log(this.state); console.log(this.props);}}>Challenges:</Text>
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.state.data}
          renderRow={this._renderRow} />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 10,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});
