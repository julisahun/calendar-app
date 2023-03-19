import React from 'react'
import { View } from 'react-native'
import axios from 'axios'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'

const LogIn = ({ navigation }) => {
  const [name, onChangeName] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const logInAction = async () => {
    if (await validateUser(name, password)) {
      navigation.push('Home')
    }
  }
  return (
    <View className='flex flex-1 justify-center items-center'>
      <View className='w-1/2'>
        <Input class='m-5' placeHolder='userName' value={name} onChange={onChangeName} />
        <Input placeHolder='Password' value={password} onChange={onChangePassword} />
        <Button class='mx-5 mt-2' text='LogIn' callback={logInAction} />
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
    console.log(error)
  }
}

export default LogIn
