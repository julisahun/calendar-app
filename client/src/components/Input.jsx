import React from 'react'
import { TextInput } from 'react-native'

const Input = (props) => {
  const classes = [props.class || [], 'rounded-lg', 'border-2', 'p-3', 'm-2'].join(' ')
  const isPassword = props.type === 'password'
  return (
    <TextInput
      multiline={props.multipleLines}
      numberOfLines={props.multipleLines ? 10 : 1}
      className={classes}
      placeholder={props.placeHolder}
      value={props.value}
      onChangeText={props.onChange}
      secureTextEntry={isPassword}
    />
  )
}

export default Input
