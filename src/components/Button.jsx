import React from 'react'
import styles from '../styles/styles'
import { Pressable, Text } from 'react-native'

const Button = ({ primary, secondary, text, callback, ...props }) => {
  if (!secondary) primary = true
  const Styles = {
    backgroundColor: primary ? styles.primary : secondary ? styles.secondary : 'white',
    borderRadius: 5,
    padding: 7,
    ...(props.styles)
  }
  return (
    <Pressable style={{ ...Styles }} onPress={callback}>
      <Text>{text}</Text>
    </Pressable>
  )
}

export default Button
