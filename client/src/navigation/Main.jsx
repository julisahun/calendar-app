import React from 'react'
import LogIn from '../views/LogIn.jsx'
import Home from '../views/Home.jsx'
import UserView from '../views/UserView.jsx'
import Camera from '../views/Camera.jsx'
import ItemDetails from '../views/ItemDetails.jsx'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='LogIn' component={LogIn} />
        <Stack.Screen name='UserView' component={UserView} />
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen name='ItemDetails' component={ItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
