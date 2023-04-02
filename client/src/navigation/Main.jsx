import React from 'react'
import LogIn from '../views/LogIn.jsx'
import Home from '../views/Home.jsx'
import UserView from '../views/UserView.jsx'
import Camera from '../views/Camera.jsx'
import ItemDetails from '../views/ItemDetails.jsx'
import api from '../api/api.js'
import axios from 'axios'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()
const Main = () => {
  AsyncStorage.getItem('token').then(async token => {
    try {
      await api.post('/users/validate', {
        token
      })
      // const user = await api.post('/users/validate', {
      //   token
      // })
      // console.log(user)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='LogIn' component={LogIn} />
        <Stack.Screen name='UserView' component={UserView} />
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen options={{ headerShown: false }} name='ItemDetails' component={ItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
