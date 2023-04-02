import React from 'react'
import axios from 'axios'
import View from '../components/View.jsx'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = ({ navigation }) => {
  const [name, onChangeName] = React.useState('')
  const [password, onChangePassword] = React.useState('')
  const [deviceId, onChangeDeviceId] = React.useState('')

  const logInAction = async () => {
    if (await validateUser(name, password)) {
      navigation.push('Home')
    }
  }

  return (
    <View class='flex flex-1 justify-center items-center'>
      <View class='w-1/2'>
        <Input multiline value={deviceId}></Input>
        <Input class='m-5' placeHolder='Username' value={name} onChange={onChangeName} />
        <Input placeHolder='Password' value={password} onChange={onChangePassword} type={'password'}/>
        <Button class='mx-5 mt-2 h-16 rounded-xl p-4' text='LogIn' onClick={logInAction} />
      </View>
    </View>
  )
}

const validateUser = async (name, password) => {
  try {
    await axios.post('http://192.168.1.88:3000/users/login', {
      name,
      password
    })
    return true
  } catch (error) {
    return true
  }
}

export default LogIn
