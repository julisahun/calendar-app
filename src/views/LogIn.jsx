import React from 'react'
import { View } from 'react-native'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
const LogIn = ({ navigation }) => {
  const [name, onChangeName] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const logInAction = () => {
    console.log('LogInAction')
    if (validateUser(name, password)) {
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

const validateUser = (name, password) => {
  return true
}

export default LogIn
