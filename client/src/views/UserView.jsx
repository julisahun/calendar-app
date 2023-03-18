import React from 'react'
import Calendar from '../components/Calendar.jsx'
import { View, Text } from 'react-native'

const UserView = ({ navigation, route }) => {
  const id = route.params.id
  return (
    <View>
      <Text>{`UserView ${id}`}</Text>
      <Calendar />
    </View>
  )
}

export default UserView
