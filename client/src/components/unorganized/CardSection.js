import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
  return (
    <View style={style.containerStyle}>{props.children}</View>
  )
}

const style = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#F8F8F8',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
}

export default CardSection