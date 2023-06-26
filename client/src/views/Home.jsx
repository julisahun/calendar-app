import React from 'react'
import Input from '../components/Input.jsx'
import Text from '../components/Text.jsx'
import api from '../api/api.js'
import { FlatList, TouchableNativeFeedback, View } from 'react-native'

const Home = ({ navigation }) => {
  const selectUser = (user) => {
    navigation.navigate('UserView', user)
  }
  const [users, setUsers] = React.useState([])
  React.useEffect(() => {
    api.get('/users').then((res) => {
      setUsers(res.data)
    })
  }, [])
  const [query, onChangeQuery] = React.useState('')
  const filterUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase()) || !query
  })

  return (
    <View>
      <Input value={filterUsers} onChange={onChangeQuery} />
      <FlatList
        data={users}
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
