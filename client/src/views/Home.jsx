import React from 'react'
import users from '../data/users.js'
import Input from '../components/Input.jsx'
import { Text, View, FlatList, TouchableNativeFeedback } from 'react-native'

const Home = ({ navigation }) => {
  const selectUser = (id) => {
    navigation.navigate('UserView', { id })
  }
  const [query, onChangeQuery] = React.useState('')
  const filterUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase()) || !query
  })

  return (
    <View>
      <Input value={query} onChange={onChangeQuery} />
      <FlatList
        data={filterUsers}
        renderItem={({ item }) =>
          <View key={item.id}>
            <TouchableNativeFeedback onPress={() => {
              selectUser(item.id)
            }}
            >
              <View className='pl-3, m-4'>
                <Text>{item.name}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>}
      />
    </View>
  )
}

export default Home
