import React from 'react'
import users from '../data/users.js'
import Input from '../components/Input.jsx'
import Text from '../components/Text.jsx'
import { FlatList, TouchableNativeFeedback, View } from 'react-native'

const Home = ({ navigation }) => {
  const selectUser = (user) => {
    navigation.navigate('UserView', user)
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
          <View key={item.id} className="mb-4">
            <TouchableNativeFeedback onPress={() => {
              selectUser(item)
            }}
            >
              <View className='p-6'>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>}
      />
    </View>
  )
}

export default Home
