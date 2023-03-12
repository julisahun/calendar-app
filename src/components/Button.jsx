import React from 'react'
import styles from '../styles/styles'
import { Pressable, Text } from 'react-native'

const Button = ({ primary, secondary, text, callback, ...props }) => {
  if (!secondary) primary = true
  const color = primary ? styles.primary : styles.secondary
  const classes = [props.class || '', 'rounded-xl', 'p-4'].join(' ')
  return (
    <Pressable className={classes} style={{ backgroundColor: color }} onPress={callback}>
      <Text className='text-center'>{text}</Text>
    </Pressable>
  )
}

export default Button
