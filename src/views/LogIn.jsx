import React from 'react'
import { View } from 'react-native'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import styles from '../styles/styles.js'
const LogIn = ({ navigation }) => {
  const [name, onChangeName] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const logInAction = () => {
    if (validateUser(name, password)) {
      navigation.push('Home')
    }
  }
  return (
    <View style={{ ...styles.center, gap: 10 }}>
      <Input placeHolder='userName' value={name} onChange={onChangeName} />
      <Input placeHolder='Password' value={password} onChange={onChangePassword} />
      <Button text='LogIn' callback={logInAction} />
    </View>
  )
}

const validateUser = (name, password) => {
  return true
}

export default LogIn
