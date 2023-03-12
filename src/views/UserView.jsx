import React from 'react'
import { View, Text } from 'react-native'

const UserView = ({ navigation, route }) => {
  const id = route.params.id
  return (
    <View>
      <Text>{`UserView ${id}`}</Text>
    </View>
  )
}

export default UserView
