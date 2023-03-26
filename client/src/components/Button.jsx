import React from 'react'
import styles from '../styles/styles'
import { Pressable, Text, View } from 'react-native'

const Button = ({ primary, secondary, text, onClick, ...props }) => {
  if (!secondary) primary = true
  const color = primary ? styles.primary : styles.secondary
  const classes = [props.class, 'items-center justify-center'].join(' ')
  const bgColor = props.custom ? {} : { backgroundColor: color }
  return (
    <Pressable className={classes} style={bgColor} onPress={onClick}>
      <View className="">
        <Text className=''>{text}</Text>
      </View>
    </Pressable>
  )
}

export default Button
