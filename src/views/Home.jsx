import React from 'react'
import users from '../data/users.js'
import { Text, View, FlatList, TouchableNativeFeedback } from 'react-native'

const Home = ({ navigation }) => {
  const selectUser = (id) => {
    navigation.navigate('UserView', { id })
  }
  return (
    <FlatList
      data={users}
      renderItem={({ item }) =>
        <View key={item.id}>
          <TouchableNativeFeedback onPress={() => {
            selectUser(item.id)
          }}
          >
            <View className='m-5'>
              <Text>{item.name}</Text>
              <Text>{item.id}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>}
    />
  )
}

export default Home
