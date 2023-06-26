import React from 'react'
import api from '../api/api.js'
import View from '../components/View.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Text from '../components/Text.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = ({ navigation }) => {
  const [name, onChangeName] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [signUp, signingUp] = React.useState(false)

  React.useEffect(() => {
    async function getToken() {
      const userToken = await AsyncStorage.getItem('userToken')
      if (userToken) {
        navigation.push('Home')
      }
    }
    getToken()
  }, [])

  const logInAction = async () => {
    if (await validateUser(name, password)) {
      navigation.push('Home')
    }
  }

  const changeLogIn = () => {
    signingUp(!signUp)
  }
  const validateUser = async (name, password) => {
    name = 'juli'
    password = 'testpass'
    const deviceId = await AsyncStorage.getItem('deviceId')
    console.log(deviceId)
    try {
      if (signUp) {
        await api.post('/users/register', {
          name,
          password,
          deviceId
        })
      } else {
        await api.post('/users/login', {
          name,
          password,
          deviceId
        })
        console.log('logged in')
      }
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <View class='flex flex-1 justify-center items-center'>
      <View class='w-1/2'>
        <Input class='m-5' placeHolder='Username' value={name} onChange={onChangeName} />
        <Input placeHolder='Password' value={password} onChange={onChangePassword} type={'password'}/>
        {signUp && <Input placeHolder='Confirm Password' value={password} onChange={onChangePassword} type={'password'}/>}
        <View class="m-5 rounded-full justify-center text-center" onClick={changeLogIn}>
          <Text> {signUp ? 'SignIn' : 'SignUp'} </Text>
        </View>
        <Button class='mx-5 mt-2 h-16 rounded-xl p-4' text={signUp ? 'Register' : 'LogIn'} onClick={logInAction} />
      </View>
    </View>
  )
}

export default LogIn
